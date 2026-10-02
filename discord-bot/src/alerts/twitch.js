// Avisos de directo en Twitch (API Helix). Cuando el directo termina, el
// mensaje del aviso se edita para indicar que acabó y cuánto duró.
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const state = require('../state');
const log = require('../log');
const { getJson, request } = require('../http');
const { sendAlert, getGuild, findChannel } = require('../guild');

let token = null;
let tokenExpires = 0;

async function getToken() {
  if (token && Date.now() < tokenExpires - 60e3) return token;
  const { twitchClientId, twitchClientSecret } = config.secrets;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(twitchClientId)}`
    + `&client_secret=${encodeURIComponent(twitchClientSecret)}&grant_type=client_credentials`;
  const res = await (await request(url, { method: 'POST' })).json();
  token = res.access_token;
  tokenExpires = Date.now() + res.expires_in * 1000;
  return token;
}

async function helix(path) {
  const headers = { 'Client-ID': config.secrets.twitchClientId, Authorization: `Bearer ${await getToken()}` };
  try {
    return await getJson(`https://api.twitch.tv/helix/${path}`, { headers });
  } catch (err) {
    if (String(err.message).includes('401')) token = null; // token caducado: se renueva en la próxima pasada
    throw err;
  }
}

function duration(fromIso) {
  const mins = Math.max(0, Math.round((Date.now() - Date.parse(fromIso)) / 60000));
  const h = Math.floor(mins / 60);
  return h ? `${h} h ${mins % 60} min` : `${mins} min`;
}

async function buildLive(stream) {
  const login = config.twitch.usuario;
  const { data: [user] = [] } = await helix(`users?login=${encodeURIComponent(login)}`);
  const thumb = stream.thumbnail_url.replace('{width}', '1280').replace('{height}', '720');
  const embed = new EmbedBuilder()
    .setColor(0x9146ff)
    .setAuthor({ name: user?.display_name || login, iconURL: user?.profile_image_url, url: `https://www.twitch.tv/${login}` })
    .setTitle(stream.title || 'En directo')
    .setURL(`https://www.twitch.tv/${login}`)
    .addFields({ name: 'Jugando a', value: stream.game_name || '—', inline: true })
    .setImage(`${thumb}?t=${Date.now()}`) // evita la miniatura cacheada de un directo anterior
    .setTimestamp(new Date(stream.started_at));
  return {
    content: `¡**${user?.display_name || login}** está en directo! 🔴\nhttps://www.twitch.tv/${login}`,
    embeds: [embed],
  };
}

module.exports = {
  name: 'twitch',
  enabled: () => Boolean(config.twitch.usuario && config.secrets.twitchClientId && config.secrets.twitchClientSecret),
  intervalMin: () => config.twitch.intervaloMin,
  async check(client) {
    const s = state.section('twitch', {});
    const { data: [stream] = [] } = await helix(`streams?user_login=${encodeURIComponent(config.twitch.usuario)}`);

    if (stream) {
      s.offlineChecks = 0;
      if (s.streamId === stream.id) return;
      const msg = await sendAlert(client, 'directos', 'directos', await buildLive(stream));
      Object.assign(s, { streamId: stream.id, startedAt: stream.started_at, title: stream.title, messageId: msg?.id, channelId: msg?.channelId, ended: false });
      state.save();
      return;
    }

    // Twitch a veces "parpadea": exigimos 2 comprobaciones seguidas offline.
    if (!s.streamId || s.ended) return;
    s.offlineChecks = (s.offlineChecks || 0) + 1;
    if (s.offlineChecks < 2) return state.save();
    s.ended = true;
    state.save();
    if (!s.messageId) return;
    try {
      const guild = await getGuild(client);
      const channel = guild.channels.cache.get(s.channelId) || findChannel(guild, 'directos');
      const msg = await channel.messages.fetch(s.messageId);
      const embed = EmbedBuilder.from(msg.embeds[0])
        .setColor(0x4f545c)
        .setFooter({ text: `Directo terminado · duró ${duration(s.startedAt)}` });
      await msg.edit({
        content: `El directo de **${config.twitch.usuario}** ha terminado. ¡Gracias a todos los que estuvisteis! 💜`,
        embeds: [embed],
        allowedMentions: { parse: [] },
      });
    } catch (err) {
      log.warn('No pude editar el aviso del directo terminado:', err.message);
    }
  },
  async test(client) {
    const fake = {
      title: 'Directo de prueba', game_name: 'Minecraft', started_at: new Date().toISOString(),
      thumbnail_url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${config.twitch.usuario}-{width}x{height}.jpg`,
    };
    await sendAlert(client, 'directos', 'directos', await buildLive(fake), { prueba: true });
  },
};
