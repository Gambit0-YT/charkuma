// Utilidades para encontrar canales/roles del servidor y publicar alertas.
const { ChannelType, EmbedBuilder } = require('discord.js');
const config = require('./config');
const state = require('./state');
const log = require('./log');
const { CHANNELS, ROLES } = require('./layout');

/** "📺・YouTube-Vídeos" → "youtubevideos" (para comparar nombres). */
function normalize(name) {
  return String(name)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

const TEXT_TYPES = [ChannelType.GuildText, ChannelType.GuildAnnouncement];

async function getGuild(client) {
  return client.guilds.cache.get(config.secrets.guildId)
    || client.guilds.fetch(config.secrets.guildId).catch(() => null);
}

/** Busca el canal de texto asignado a `key` (por ID guardado o por nombre). */
function findChannel(guild, key) {
  const assigned = state.section('channels');
  const def = CHANNELS[key];
  if (assigned[key]) {
    const ch = guild.channels.cache.get(assigned[key]);
    if (ch) return ch;
  }
  if (!def) return null;
  const wanted = new Set([def.name, key, ...def.aliases].map(normalize));
  const ch = guild.channels.cache.find((c) => TEXT_TYPES.includes(c.type) && wanted.has(normalize(c.name)));
  if (ch) {
    assigned[key] = ch.id;
    state.save();
  }
  return ch || null;
}

/** Busca el rol `key` (por ID guardado o por nombre). */
function findRole(guild, key) {
  const assigned = state.section('roles');
  const def = ROLES[key];
  if (assigned[key]) {
    const role = guild.roles.cache.get(assigned[key]);
    if (role) return role;
  }
  if (!def) return null;
  const role = guild.roles.cache.find((r) => normalize(r.name) === normalize(def.name));
  if (role) {
    assigned[key] = role.id;
    state.save();
  }
  return role || null;
}

/**
 * Publica una alerta en el canal `channelKey`, mencionando el rol de avisos
 * `roleKey` si existe. `payload` es lo que acepta channel.send().
 * Con `prueba: true` no menciona a nadie y marca el mensaje como prueba.
 */
async function sendAlert(client, channelKey, roleKey, payload, { prueba = false } = {}) {
  const guild = await getGuild(client);
  if (!guild) {
    log.warn('No encuentro el servidor (revisa GUILD_ID).');
    return null;
  }
  const channel = findChannel(guild, channelKey);
  if (!channel) {
    log.warn(`No hay canal para "${channelKey}". Usa /setup o /canal asignar.`);
    return null;
  }
  const role = roleKey ? findRole(guild, roleKey) : null;
  const prefix = prueba ? '🧪 **[PRUEBA]**' : role ? `${role}` : '';
  const content = [prefix, payload.content].filter(Boolean).join(' ');
  try {
    return await channel.send({
      ...payload,
      content: content || undefined,
      allowedMentions: { roles: !prueba && role ? [role.id] : [] },
    });
  } catch (err) {
    log.error(`No pude publicar en #${channel.name}:`, err.message);
    return null;
  }
}

/** Deja constancia de algo en el canal de registro del staff. */
async function logToStaff(guild, description, color = 0x5865f2) {
  const channel = findChannel(guild, 'logs');
  if (!channel) return;
  const embed = new EmbedBuilder().setColor(color).setDescription(description).setTimestamp();
  await channel.send({ embeds: [embed], allowedMentions: { parse: [] } }).catch(() => {});
}

module.exports = { normalize, getGuild, findChannel, findRole, sendAlert, logToStaff, TEXT_TYPES };
