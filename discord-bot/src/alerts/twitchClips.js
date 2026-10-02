// Clips nuevos del canal de Twitch → #mejores-momentos (sin mencionar a nadie:
// pueden ser muchos). Discord muestra el clip reproducible en el chat.
const config = require('../config');
const { sendAlert } = require('../guild');
const { publishNew } = require('./common');
const twitch = require('./twitch');

async function loadClips() {
  const id = await twitch.getBroadcasterId();
  const since = new Date(Date.now() - 7 * 86400e3).toISOString();
  const { data = [] } = await twitch.helix(`clips?broadcaster_id=${id}&started_at=${since}&first=50`);
  return data
    .map((c) => ({ ...c, published: c.created_at }))
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

const message = (c) => ({ content: `🎬 **${c.title}** — clip de ${c.creator_name}\n${c.url}` });

module.exports = {
  name: 'clips',
  enabled: () => twitch.enabled(),
  intervalMin: () => config.clips.intervaloMin,
  loadClips,
  async check(client) {
    await publishNew('clips', await loadClips(), (c) => sendAlert(client, 'clips', null, message(c)), { maxAgeHours: 24 * 7 });
  },
  async test(client) {
    const [c] = await loadClips();
    if (!c) return 'No hay clips de los últimos 7 días.';
    await sendAlert(client, 'clips', null, message(c), { prueba: true });
  },
};
