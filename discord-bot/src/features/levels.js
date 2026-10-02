// Niveles por actividad: XP por escribir (con espera anti-spam) y por estar
// en canales de voz con más gente. Al subir de nivel se anuncia y se dan
// los roles de recompensa (layout.js → REWARD_ROLES).
const { randomInt } = require('crypto');
const config = require('../config');
const state = require('../state');
const log = require('../log');
const { REWARD_ROLES } = require('../layout');
const { findChannel, findRole, normalize } = require('../guild');

/** XP necesaria para pasar del nivel `l` al `l + 1` (misma curva que MEE6). */
const xpForNext = (l) => 5 * l * l + 50 * l + 100;

function levelInfo(xp) {
  let level = 0;
  let rest = xp;
  while (rest >= xpForNext(level)) {
    rest -= xpForNext(level);
    level++;
  }
  return { level, current: rest, needed: xpForNext(level) };
}

const users = () => state.section('xp');

function getUser(id) {
  const all = users();
  if (!all[id]) all[id] = { xp: 0, mensajes: 0, minutosVoz: 0 };
  return all[id];
}

const levelOf = (id) => levelInfo(users()[id]?.xp || 0).level;

function ranking() {
  return Object.entries(users()).sort(([, a], [, b]) => b.xp - a.xp);
}

const position = (id) => ranking().findIndex(([uid]) => uid === id) + 1;

/** Pone/quita los roles de recompensa según el nivel. Devuelve el rol nuevo más alto conseguido. */
async function syncRewardRoles(member, level) {
  const reached = REWARD_ROLES.filter((r) => r.nivel <= level);
  const keep = new Set((config.niveles.soloRolMasAlto ? reached.slice(-1) : reached).map((r) => r.key));
  let gained = null;
  for (const r of REWARD_ROLES) {
    const role = findRole(member.guild, r.key);
    if (!role) continue;
    const has = member.roles.cache.has(role.id);
    try {
      if (keep.has(r.key) && !has) {
        await member.roles.add(role);
        gained = role;
      } else if (!keep.has(r.key) && has) {
        await member.roles.remove(role);
      }
    } catch (err) {
      log.warn(`No pude cambiar el rol ${role.name}:`, err.message);
    }
  }
  return gained;
}

/** Suma (o resta) XP. Anuncia la subida en #niveles (o en `channel`). */
async function addXp(member, amount, { channel = null, announce = true } = {}) {
  const u = getUser(member.id);
  const before = levelInfo(u.xp).level;
  u.xp = Math.max(0, u.xp + amount);
  state.save();
  const after = levelInfo(u.xp).level;
  if (after === before) return after;
  const gained = await syncRewardRoles(member, after);
  if (after > before && announce) {
    const target = findChannel(member.guild, 'niveles') || channel;
    const who = config.niveles.mencionarAlSubir ? `${member}` : `**${member.displayName}**`;
    const extra = gained ? ` y consigue el rol **${gained.name}** 🏅` : '';
    await target?.send({
      content: `🆙 ¡${who} ha subido a **nivel ${after}**${extra}!`,
      allowedMentions: { users: config.niveles.mencionarAlSubir ? [member.id] : [] },
    }).catch(() => {});
  }
  return after;
}

const lastMessage = new Map(); // userId → timestamp (anti-spam, solo en memoria)

async function onMessage(message) {
  if (!config.niveles.activo || !message.inGuild() || message.author.bot || message.system || message.webhookId) return;
  if (message.guildId !== config.secrets.guildId || !message.member) return;
  const ignored = (config.niveles.canalesSinXp || []).map(normalize);
  if (ignored.includes(normalize(message.channel.name))) return;

  const now = Date.now();
  if (now - (lastMessage.get(message.author.id) || 0) < config.niveles.esperaSegundos * 1000) return;
  lastMessage.set(message.author.id, now);

  getUser(message.author.id).mensajes++;
  const { xpMensajeMin: min, xpMensajeMax: max } = config.niveles;
  await addXp(message.member, randomInt(min, max + 1), { channel: message.channel });
}

/** Cada minuto: XP a quien esté en voz con al menos otra persona (sin ensordecer, fuera de AFK). */
async function voiceTick(guild) {
  if (!config.niveles.activo || !config.niveles.xpVozPorMinuto) return;
  for (const vs of guild.voiceStates.cache.values()) {
    const { member, channel } = vs;
    if (!member || member.user.bot || !channel || channel.id === guild.afkChannelId) continue;
    if (vs.selfDeaf || vs.serverDeaf) continue;
    const humans = channel.members.filter((m) => !m.user.bot).size;
    if (humans < 2) continue;
    getUser(member.id).minutosVoz++;
    await addXp(member, config.niveles.xpVozPorMinuto);
  }
}

module.exports = { xpForNext, levelInfo, getUser, levelOf, ranking, position, addXp, syncRewardRoles, onMessage, voiceTick, lastMessage };
