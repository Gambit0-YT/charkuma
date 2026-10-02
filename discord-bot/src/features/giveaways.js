// Sorteos con botón "Participar". Se guardan en el estado, así que si el bot
// se reinicia, los sorteos en curso siguen y terminan a su hora.
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const { randomInt } = require('crypto');
const state = require('../state');
const log = require('../log');
const levels = require('./levels');
const { getGuild, findRole, logToStaff } = require('../guild');

const UNITS = { s: 1e3, m: 60e3, h: 3600e3, d: 86400e3, w: 604800e3 };
const MAX_MS = 60 * 86400e3;

/** "1d12h", "30m", "2 d", "1w" → milisegundos (null si no es válido). */
function parseDuration(text) {
  const clean = String(text).toLowerCase().replace(/\s+/g, '');
  if (!/^(\d+[smhdw])+$/.test(clean)) return null;
  let ms = 0;
  for (const [, n, u] of clean.matchAll(/(\d+)([smhdw])/g)) ms += Number(n) * UNITS[u];
  return ms > 0 && ms <= MAX_MS ? ms : null;
}

/** Elige `n` ganadores distintos al azar (criptográficamente), excluyendo `exclude`. */
function pickWinners(participants, n, exclude = []) {
  const pool = participants.filter((id) => !exclude.includes(id));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

const all = () => state.section('sorteos');
const ts = (ms, style = 'R') => `<t:${Math.floor(ms / 1000)}:${style}>`;

/** Acepta un ID de mensaje o un enlace a él. */
function resolveId(input) {
  const ids = String(input).match(/\d{17,20}/g);
  return ids ? ids[ids.length - 1] : null;
}

function embed(g) {
  const lines = [];
  if (g.descripcion) lines.push(g.descripcion, '');
  if (g.terminado) {
    lines.push(g.ganadores.length ? `🏆 **Ganador${g.ganadores.length > 1 ? 'es' : ''}:** ${g.ganadores.map((id) => `<@${id}>`).join(', ')}` : '😢 Nadie participó.');
    lines.push(`Terminó ${ts(g.terminaEn)}`);
  } else {
    lines.push(`⏰ Termina ${ts(g.terminaEn)} (${ts(g.terminaEn, 'f')})`);
    lines.push(`🏆 **${g.numGanadores}** ganador${g.numGanadores > 1 ? 'es' : ''}`);
  }
  const req = [];
  if (g.nivelMinimo) req.push(`nivel ${g.nivelMinimo} o más`);
  if (g.rolRequerido) req.push(`tener el rol <@&${g.rolRequerido}>`);
  if (req.length) lines.push(`📋 Requisitos: ${req.join(' y ')}`);
  lines.push(`🎙️ Organiza: <@${g.creador}>`);
  return new EmbedBuilder()
    .setColor(g.terminado ? 0x4f545c : 0xeb459e)
    .setTitle(`🎉 ${g.terminado ? 'SORTEO TERMINADO' : 'SORTEO'}: ${g.premio}`)
    .setDescription(lines.join('\n'))
    .setFooter({ text: `${g.participantes.length} participante${g.participantes.length === 1 ? '' : 's'}` });
}

function buttons(g) {
  return [new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('sorteo')
      .setEmoji('🎉')
      .setLabel(g.terminado ? 'Terminado' : `Participar (${g.participantes.length})`)
      .setStyle(g.terminado ? ButtonStyle.Secondary : ButtonStyle.Primary)
      .setDisabled(Boolean(g.terminado)),
  )];
}

const view = (g) => ({ embeds: [embed(g)], components: buttons(g), allowedMentions: { parse: [] } });

async function create(channel, { premio, duracionMs, numGanadores, creador, descripcion, nivelMinimo, rolRequerido }) {
  const g = {
    channelId: channel.id, premio, descripcion: descripcion || '', numGanadores, creador,
    nivelMinimo: nivelMinimo || 0, rolRequerido: rolRequerido || null,
    terminaEn: Date.now() + duracionMs, participantes: [], ganadores: [], terminado: false,
  };
  const ping = findRole(channel.guild, 'sorteos');
  const msg = await channel.send({ ...view(g), content: ping ? `${ping} ¡Nuevo sorteo!` : undefined, allowedMentions: { roles: ping ? [ping.id] : [] } });
  all()[msg.id] = g;
  state.save();
  return msg;
}

async function fetchMessage(client, id) {
  const g = all()[id];
  const guild = await getGuild(client);
  const channel = guild?.channels.cache.get(g.channelId);
  return channel ? channel.messages.fetch(id).catch(() => null) : null;
}

/** Termina un sorteo y anuncia a los ganadores. */
async function end(client, id) {
  const g = all()[id];
  if (!g || g.terminado) return null;
  g.ganadores = pickWinners(g.participantes, g.numGanadores);
  g.terminado = true;
  state.save();
  const msg = await fetchMessage(client, id);
  if (!msg) {
    log.warn(`El mensaje del sorteo ${id} ya no existe; lo doy por terminado.`);
    return g;
  }
  await msg.edit(view(g));
  const text = g.ganadores.length
    ? `🎉 ¡Felicidades ${g.ganadores.map((u) => `<@${u}>`).join(', ')}! Habéis ganado **${g.premio}**. Hablad con <@${g.creador}> para reclamarlo.`
    : `😢 El sorteo de **${g.premio}** terminó sin participantes.`;
  await msg.reply({ content: text, allowedMentions: { users: [...g.ganadores, g.creador] } });
  await logToStaff(msg.guild, `🎉 Sorteo **${g.premio}** terminado (${g.participantes.length} participantes). Ganadores: ${g.ganadores.map((u) => `<@${u}>`).join(', ') || 'ninguno'}.`);
  return g;
}

/** Saca nuevos ganadores de un sorteo terminado (sin repetir los anteriores). */
async function reroll(client, id, n = 1) {
  const g = all()[id];
  if (!g?.terminado) return null;
  const nuevos = pickWinners(g.participantes, n, g.ganadores);
  if (!nuevos.length) return [];
  g.ganadores.push(...nuevos);
  state.save();
  const msg = await fetchMessage(client, id);
  if (msg) {
    await msg.edit(view(g));
    await msg.reply({ content: `🔁 Nuevo sorteo: ¡felicidades ${nuevos.map((u) => `<@${u}>`).join(', ')}! Ganáis **${g.premio}**.`, allowedMentions: { users: nuevos } });
  }
  return nuevos;
}

/** Cada pocos segundos: termina los sorteos que han llegado a su hora. */
async function tick(client) {
  for (const [id, g] of Object.entries(all())) {
    if (!g.terminado && Date.now() >= g.terminaEn) await end(client, id);
  }
  // Limpieza: borra sorteos terminados hace más de 30 días.
  for (const [id, g] of Object.entries(all())) {
    if (g.terminado && Date.now() - g.terminaEn > 30 * 86400e3) delete all()[id];
  }
}

/** Botón "Participar": apunta o desapunta. */
async function button(interaction) {
  const g = all()[interaction.message.id];
  const reply = (content) => interaction.reply({ content, flags: MessageFlags.Ephemeral });
  if (!g || g.terminado) return reply('Este sorteo ya ha terminado.');
  const uid = interaction.user.id;
  const idx = g.participantes.indexOf(uid);
  if (idx >= 0) {
    g.participantes.splice(idx, 1);
    state.save();
    await reply('Ya no participas en el sorteo.');
  } else {
    if (g.rolRequerido && !interaction.member.roles.cache.has(g.rolRequerido)) return reply(`Necesitas el rol <@&${g.rolRequerido}> para participar.`);
    if (g.nivelMinimo && levels.levelOf(uid) < g.nivelMinimo) return reply(`Necesitas nivel **${g.nivelMinimo}** para participar (tienes el ${levels.levelOf(uid)}). Mira \`/nivel\`.`);
    g.participantes.push(uid);
    state.save();
    await reply(`¡Estás dentro! 🍀 Pulsa otra vez si quieres salirte. Termina ${ts(g.terminaEn)}.`);
  }
  await interaction.message.edit(view(g)).catch(() => {});
}

module.exports = { parseDuration, pickWinners, resolveId, create, end, reroll, tick, button, all };
