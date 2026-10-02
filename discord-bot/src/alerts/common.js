const state = require('../state');

const MAX_POR_PASADA = 5;

/**
 * Publica solo las entradas nuevas de `items` (ordenadas de nueva a vieja).
 * - Primera pasada (siembra): marca todo como visto sin publicar, para no
 *   inundar el canal con contenido antiguo al arrancar el bot.
 * - Ignora lo publicado hace más de `maxAgeHours`.
 * - Si publicar falla, no lo marca como visto y lo reintenta la próxima vez.
 */
async function publishNew(seenName, items, post, { maxAgeHours = 72 } = {}) {
  const seen = state.seenList(seenName);
  if (!seen.seeded) {
    items.forEach((i) => seen.add(i.id));
    seen.markSeeded();
    return 0;
  }
  const fresh = items
    .filter((i) => !seen.has(i.id))
    .reverse() // de la más antigua a la más nueva, para publicar en orden
    .slice(-MAX_POR_PASADA);
  let count = 0;
  for (const item of fresh) {
    const published = Date.parse(item.published);
    if (published && Date.now() - published > maxAgeHours * 3600e3) {
      seen.add(item.id);
      continue;
    }
    if (await post(item)) {
      seen.add(item.id);
      count++;
    }
  }
  return count;
}

const truncate = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s || '');

module.exports = { publishNew, truncate };
