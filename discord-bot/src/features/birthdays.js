// Cumpleaños: cada uno guarda su fecha con /cumple y ese día el bot lo
// felicita en #general y le da el rol 🎂 Cumpleañero (se quita al día siguiente).
const state = require('../state');
const log = require('../log');
const { findChannel, findRole } = require('../guild');

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const all = () => state.section('cumples');
const isValid = (dia, mes) => mes >= 1 && mes <= 12 && dia >= 1 && dia <= DAYS_IN_MONTH[mes - 1];
const format = ({ dia, mes }) => `${dia} de ${MONTHS[mes - 1]}`;
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** ¿Es hoy su cumple? (los del 29 de febrero lo celebran el 28 en años no bisiestos). */
function isToday({ dia, mes }, now) {
  if (dia === now.day && mes === now.month) return true;
  return dia === 29 && mes === 2 && !isLeap(now.year) && now.month === 2 && now.day === 28;
}

/** Días que faltan hasta el próximo cumple (0 = hoy). */
function daysUntil({ dia, mes }, now) {
  const today = Date.UTC(now.year, now.month - 1, now.day);
  let next = Date.UTC(now.year, mes - 1, dia);
  if (next < today) next = Date.UTC(now.year + 1, mes - 1, dia);
  return Math.round((next - today) / 86400e3);
}

function upcoming(now, limit = 10) {
  return Object.entries(all())
    .map(([id, b]) => ({ id, ...b, faltan: daysUntil(b, now) }))
    .sort((a, b) => a.faltan - b.faltan)
    .slice(0, limit);
}

/** Tarea diaria: quita el rol de ayer y felicita a los de hoy. */
async function celebrate(guild, now) {
  await guild.members.fetch().catch(() => {}); // para que role.members esté completo
  const role = findRole(guild, 'cumple');
  const todays = Object.entries(all()).filter(([, b]) => isToday(b, now)).map(([id]) => id);
  if (role) {
    for (const member of role.members.values()) {
      if (!todays.includes(member.id)) await member.roles.remove(role).catch(() => {});
    }
  }
  if (!todays.length) return [];
  const members = [];
  for (const id of todays) {
    const member = await guild.members.fetch(id).catch(() => null);
    if (!member) continue; // ya no está en el servidor
    members.push(member);
    if (role) await member.roles.add(role).catch((err) => log.warn('Rol de cumpleaños:', err.message));
  }
  const channel = findChannel(guild, 'general');
  if (channel && members.length) {
    await channel.send({
      content: `🎂🎉 ¡Hoy es el cumpleaños de ${members.join(', ')}! ¡Felicidades! 🥳🎈`,
      allowedMentions: { users: members.map((m) => m.id) },
    });
  }
  return members;
}

module.exports = { all, isValid, format, isToday, daysUntil, upcoming, celebrate, MONTHS };
