// Canales de voz "contador" en 📊 ESTADÍSTICAS: miembros, suscriptores de
// YouTube y seguidores de Twitch. Discord solo deja renombrar un canal 2
// veces cada 10 min, así que se actualiza cada 10 min y solo si cambia.
const { ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('../config');
const state = require('../state');
const { COUNTERS, CATEGORIES } = require('../layout');
const { getJson } = require('../http');
const { normalize } = require('../guild');
const twitch = require('../alerts/twitch');

/** 1234 → "1234"; 15300 → "15,3 mil"; 2100000 → "2,1 M". */
function formatCount(n) {
  if (n < 10000) return String(n);
  return new Intl.NumberFormat('es-ES', { notation: 'compact', maximumFractionDigits: 1 }).format(n).replace(/\s/g, ' ');
}

const SOURCES = {
  miembros: {
    enabled: () => true,
    async value(guild) {
      await guild.members.fetch().catch(() => {});
      return guild.members.cache.filter((m) => !m.user.bot).size || guild.memberCount;
    },
  },
  suscriptores: {
    enabled: () => Boolean(config.secrets.youtubeApiKey && config.youtube.channelId),
    async value() {
      const res = await getJson(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${config.youtube.channelId}&key=${encodeURIComponent(config.secrets.youtubeApiKey)}`);
      return Number(res.items?.[0]?.statistics?.subscriberCount);
    },
  },
  seguidores: {
    enabled: () => twitch.enabled(),
    async value() {
      const res = await twitch.helix(`channels/followers?broadcaster_id=${await twitch.getBroadcasterId()}`);
      return Number(res.total);
    },
  },
};

const enabledKeys = () => Object.keys(COUNTERS).filter((k) => SOURCES[k].enabled());
const ids = () => state.section('contadores');
const channelName = (key, n) => `${COUNTERS[key].label}: ${n == null ? '…' : formatCount(n)}`;

/** Crea los contadores que falten (lo llama /setup). Devuelve las claves creadas. */
async function ensure(guild) {
  const missing = enabledKeys().filter((k) => !guild.channels.cache.has(ids()[k]));
  if (!missing.length) return [];
  const parent = guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && normalize(c.name) === normalize(CATEGORIES.estadisticas))
    || await guild.channels.create({ name: CATEGORIES.estadisticas, type: ChannelType.GuildCategory, position: 0 });
  for (const key of missing) {
    const ch = await guild.channels.create({
      name: channelName(key, null),
      type: ChannelType.GuildVoice,
      parent,
      permissionOverwrites: [
        { id: guild.roles.everyone.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.Connect] },
        { id: guild.members.me.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels] },
      ],
      reason: 'Contador del bot',
    });
    ids()[key] = ch.id;
  }
  state.save();
  return missing;
}

async function update(guild) {
  for (const key of enabledKeys()) {
    const channel = guild.channels.cache.get(ids()[key]);
    if (!channel) continue;
    const n = await SOURCES[key].value(guild);
    if (!Number.isFinite(n)) continue;
    const name = channelName(key, n);
    if (channel.name !== name) await channel.setName(name, 'Contador del bot');
  }
}

module.exports = { formatCount, ensure, update, enabledKeys, missing: (guild) => enabledKeys().filter((k) => !guild.channels.cache.has(ids()[k])) };
