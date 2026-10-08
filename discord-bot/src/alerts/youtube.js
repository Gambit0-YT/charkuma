// Vídeos nuevos de YouTube vía el feed RSS público del canal (sin API key).
//
// Con YOUTUBE_API_KEY (opcional) además distingue estrenos y directos
// programados: avisa al programarse con cuenta atrás, y otra vez cuando
// empiezan de verdad.
const config = require('../config');
const state = require('../state');
const { fetchFeed } = require('../feeds');
const { getJson } = require('../http');
const { sendAlert } = require('../guild');
const { publishNew } = require('./common');

const feedUrl = () => `https://www.youtube.com/feeds/videos.xml?channel_id=${config.youtube.channelId}`;

/** Datos de emisión de un vídeo según la API ("upcoming" | "live" | "none"). */
async function videoInfo(id) {
  const key = config.secrets.youtubeApiKey;
  if (!key) return null;
  const res = await getJson(`https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${id}&key=${encodeURIComponent(key)}`);
  const v = res.items?.[0];
  if (!v) return null;
  return {
    status: v.snippet.liveBroadcastContent,
    scheduled: v.liveStreamingDetails?.scheduledStartTime || null,
  };
}

const ts = (iso, style = 'R') => `<t:${Math.floor(Date.parse(iso) / 1000)}:${style}>`;

function message(item, info) {
  const who = item.author || config.creador;
  if (info?.status === 'upcoming' && info.scheduled) {
    return { content: `📅 **${who}** ha programado un estreno: **${item.title}**\nEmpieza ${ts(info.scheduled)} (${ts(info.scheduled, 'f')})\n${item.link}` };
  }
  if (info?.status === 'live') {
    return { content: `🔴 ¡**${who}** está en directo en YouTube! **${item.title}**\n${item.link}` };
  }
  // Mandamos el enlace tal cual: Discord lo convierte en reproductor.
  return { content: `¡**${who}** ha subido vídeo nuevo! 🎬\n**${item.title}**\n${item.link}` };
}

/** Revisa los estrenos pendientes y avisa cuando empiezan. */
async function checkPremieres(client) {
  const pending = state.section('estrenos');
  for (const [id, p] of Object.entries(pending)) {
    if (Date.now() < Date.parse(p.scheduled) - 2 * 60e3) continue; // aún no toca
    const info = await videoInfo(id);
    if (info?.status === 'upcoming' && info.scheduled && info.scheduled !== p.scheduled) {
      p.scheduled = info.scheduled; // lo han retrasado
    } else if (info?.status === 'upcoming' && Date.now() - Date.parse(p.scheduled) < 3 * 3600e3) {
      continue; // a punto de empezar: seguimos esperando (máx. 3 h de retraso)
    } else {
      // "live" = está emitiéndose; "none" poco después de la hora = estreno
      // cortito que ya acabó entre dos comprobaciones. Si no, se descarta.
      const justEnded = info?.status === 'none' && Date.now() - Date.parse(p.scheduled) < 30 * 60e3;
      if (info?.status === 'live' || justEnded) {
        await sendAlert(client, 'youtube', 'youtube', { content: `🔴 ¡Empieza ya! **${p.title}**\n${p.link}` });
      }
      delete pending[id];
    }
    state.save();
  }
}

module.exports = {
  name: 'youtube',
  enabled: () => Boolean(config.youtube.channelId),
  intervalMin: () => config.youtube.intervaloMin,
  async check(client) {
    const items = await fetchFeed(feedUrl());
    await publishNew('youtube', items, async (item) => {
      const info = await videoInfo(item.id).catch(() => null);
      const msg = await sendAlert(client, 'youtube', 'youtube', message(item, info));
      if (msg && info?.status === 'upcoming' && info.scheduled) {
        state.section('estrenos')[item.id] = { title: item.title, link: item.link, scheduled: info.scheduled };
        state.save();
      }
      return msg;
    });
    if (config.secrets.youtubeApiKey) await checkPremieres(client);
  },
  async test(client) {
    const [item] = await fetchFeed(feedUrl());
    if (!item) return 'El feed de YouTube está vacío.';
    await sendAlert(client, 'youtube', 'youtube', message(item, await videoInfo(item.id).catch(() => null)), { prueba: true });
  },
};
