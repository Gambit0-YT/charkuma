// Vídeos nuevos de YouTube vía el feed RSS público del canal (sin API key).
const config = require('../config');
const { fetchFeed } = require('../feeds');
const { sendAlert } = require('../guild');
const { publishNew } = require('./common');

const feedUrl = () => `https://www.youtube.com/feeds/videos.xml?channel_id=${config.youtube.channelId}`;

function message(item) {
  // Mandamos el enlace tal cual: Discord lo convierte en reproductor.
  return { content: `¡**${item.author || config.creador}** ha subido vídeo nuevo! 🎬\n**${item.title}**\n${item.link}` };
}

module.exports = {
  name: 'youtube',
  enabled: () => Boolean(config.youtube.channelId),
  intervalMin: () => config.youtube.intervaloMin,
  async check(client) {
    const items = await fetchFeed(feedUrl());
    await publishNew('youtube', items, (item) => sendAlert(client, 'youtube', 'youtube', message(item)));
  },
  async test(client) {
    const [item] = await fetchFeed(feedUrl());
    if (!item) return 'El feed de YouTube está vacío.';
    await sendAlert(client, 'youtube', 'youtube', message(item), { prueba: true });
  },
};
