// Resumen diario de OFERTAS de juegos de PC (Steam, GOG, Epic, Humble,
// Fanatical) con buen descuento y buenas valoraciones, vía CheapShark.
// Los precios de CheapShark vienen en dólares (USD).
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const state = require('../state');
const { getJson } = require('../http');
const { sendAlert } = require('../guild');
const { localNow } = require('../time');

const STORES = { 1: 'Steam', 7: 'GOG', 11: 'Humble', 15: 'Fanatical', 25: 'Epic' };
const NO_REPETIR_DIAS = 7;

async function loadDeals(recent = {}) {
  const o = config.ofertas;
  const params = new URLSearchParams({
    storeID: Object.keys(STORES).join(','),
    upperPrice: String(o.precioMaxUSD),
    steamRating: String(o.valoracionSteamMin),
    onSale: '1',
    sortBy: 'Deal Rating',
    pageSize: '60',
  });
  const deals = await getJson(`https://www.cheapshark.com/api/1.0/deals?${params}`);
  const byGame = new Map();
  for (const d of deals) {
    if (Number(d.savings) < o.descuentoMin || recent[d.gameID]) continue;
    const prev = byGame.get(d.gameID);
    if (!prev || Number(d.salePrice) < Number(prev.salePrice)) byGame.set(d.gameID, d);
  }
  return [...byGame.values()].slice(0, o.maxPorDia);
}

function message(deals) {
  const usd = (n) => `$${Number(n).toFixed(2)}`;
  const lines = deals.map((d) => `**[${d.title}](https://www.cheapshark.com/redirect?dealID=${d.dealID})**\n`
    + `~~${usd(d.normalPrice)}~~ → **${usd(d.salePrice)}** (−${Math.round(d.savings)}%) · ${STORES[d.storeID] || 'Tienda'}`
    + (d.steamRatingPercent && d.steamRatingPercent !== '0' ? ` · 👍 ${d.steamRatingPercent}% en Steam` : ''));
  const embed = new EmbedBuilder()
    .setColor(0xf1c40f)
    .setTitle('💸 Ofertas del día')
    .setDescription(lines.join('\n\n'))
    .setThumbnail(deals[0]?.thumb || null)
    .setFooter({ text: 'Precios en USD vía CheapShark · pueden variar en tu región' })
    .setTimestamp();
  return { embeds: [embed] };
}

module.exports = {
  name: 'ofertas',
  enabled: () => Boolean(config.ofertas.activo),
  intervalMin: () => 15,
  localNow,
  loadDeals,
  async check(client) {
    const s = state.section('ofertas', { lastDate: null, recent: {} });
    const now = localNow();
    if (s.lastDate === now.date || now.hour < config.ofertas.hora) return;

    const cutoff = Date.now() - NO_REPETIR_DIAS * 86400e3;
    for (const [id, ts] of Object.entries(s.recent)) if (ts < cutoff) delete s.recent[id];

    const deals = await loadDeals(s.recent);
    s.lastDate = now.date; // aunque no haya ofertas, no lo reintentamos hasta mañana
    if (deals.length && await sendAlert(client, 'ofertas', 'ofertas', message(deals))) {
      deals.forEach((d) => { s.recent[d.gameID] = Date.now(); });
    }
    state.save();
  },
  async test(client) {
    const deals = await loadDeals();
    if (!deals.length) return 'No hay ofertas que cumplan los filtros ahora mismo.';
    await sendAlert(client, 'ofertas', 'ofertas', message(deals), { prueba: true });
  },
};
