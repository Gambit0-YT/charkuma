// Juegos que se ponen GRATIS (Epic, Steam, GOG, consolas...) vía la API
// pública de GamerPower. Sin API key.
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const { getJson } = require('../http');
const { sendAlert } = require('../guild');
const { publishNew, truncate } = require('./common');

const API = 'https://www.gamerpower.com/api/giveaways?type=game&sort-by=date';

function matchesPlatforms(giveaway) {
  const wanted = (config.juegosGratis.plataformas || []).map((p) => p.toLowerCase());
  if (!wanted.length) return true;
  const platforms = String(giveaway.platforms || '').toLowerCase().split(',').map((p) => p.trim());
  return platforms.some((p) => wanted.includes(p));
}

/** "2025-10-09 23:59:00" (hora UTC de GamerPower) → timestamp de Discord. */
function endsAt(endDate) {
  const t = Date.parse(`${String(endDate).replace(' ', 'T')}Z`);
  return Number.isFinite(t) ? `<t:${Math.floor(t / 1000)}:R>` : null;
}

async function loadGiveaways() {
  const list = await getJson(API);
  if (!Array.isArray(list)) return []; // la API devuelve un objeto cuando no hay resultados
  return list
    .filter((g) => g.status === 'Active' && matchesPlatforms(g))
    .map((g) => ({ ...g, id: String(g.id), published: g.published_date && `${g.published_date.replace(' ', 'T')}Z` }));
}

function message(g) {
  const title = g.title.replace(/\s*\((PC|Steam|Epic Games|GOG)[^)]*\)\s*Giveaway$/i, '').replace(/\s*Giveaway$/i, '');
  const embed = new EmbedBuilder()
    .setColor(0x2ecc71)
    .setTitle(`🎁 ${title}`)
    .setURL(g.open_giveaway_url || g.gamerpower_url)
    .setDescription(truncate(g.description, 350))
    .addFields(
      { name: 'Plataforma', value: g.platforms || '—', inline: true },
      { name: 'Precio', value: g.worth && g.worth !== 'N/A' ? `~~${g.worth}~~ → **GRATIS**` : '**GRATIS**', inline: true },
    )
    .setImage(g.image || g.thumbnail || null)
    .setFooter({ text: 'Vía GamerPower' });
  const end = g.end_date && g.end_date !== 'N/A' && endsAt(g.end_date);
  if (end) embed.addFields({ name: 'Termina', value: end, inline: true });
  return { content: '¡Juego **gratis** para quedártelo! 🎉', embeds: [embed] };
}

module.exports = {
  name: 'juegosGratis',
  enabled: () => true,
  intervalMin: () => config.juegosGratis.intervaloMin,
  loadGiveaways,
  message,
  async check(client) {
    // Algunos sorteos se publican con fecha antigua y se activan después,
    // así que aquí el filtro de antigüedad es más amplio.
    await publishNew('juegosGratis', await loadGiveaways(), (g) => sendAlert(client, 'juegosGratis', 'juegosGratis', message(g)), { maxAgeHours: 24 * 14 });
  },
  async test(client) {
    const [g] = await loadGiveaways();
    if (!g) return 'Ahora mismo no hay juegos gratis activos.';
    await sendAlert(client, 'juegosGratis', 'juegosGratis', message(g), { prueba: true });
  },
};
