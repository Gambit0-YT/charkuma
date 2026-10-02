// Retro 365 en Discord: cada día, a la hora configurada, publica el juego de
// ese día leyendo los datos de la propia web (js/02-data-retro365-games.js).
// Respeta lo mismo que la web: un día NO se desvela antes de su fecha.
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const { getText } = require('../http');
const { localNow, daysBetween } = require('../time');

const FIELD = (name) => new RegExp(`^\\s{8}${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'm');
const unescape = (s) => JSON.parse(`"${s}"`);

/** Extrae { día: { name, summary, emoji, steamUrl, difficulty } } del JS de la web (sin ejecutarlo). */
function parseGames(js) {
  const games = {};
  const parts = js.split(/^\s{6}(\d+):\s*\{/m);
  for (let i = 1; i < parts.length; i += 2) {
    const chunk = parts[i + 1];
    const get = (f) => { const m = chunk.match(FIELD(f)); return m ? unescape(m[1]) : ''; };
    const name = get('name');
    if (name) games[Number(parts[i])] = { name, summary: get('summary'), emoji: get('emoji'), steamUrl: get('steamUrl'), difficulty: get('difficulty') };
  }
  return games;
}

let cache = null;
let cachedAt = 0;
async function loadGames() {
  if (cache && Date.now() - cachedAt < 6 * 3600e3) return cache;
  cache = parseGames(await getText(config.retro365.urlDatos));
  cachedAt = Date.now();
  return cache;
}

/** Número del día de hoy en Retro 365 (1 = día de inicio; ≤0 = aún no ha empezado). */
const todayNumber = (now = localNow()) => daysBetween(config.retro365.inicio, now.date) + 1;

const DIFFICULTY = { facil: '🟢 Fácil', media: '🟡 Media', dificil: '🔴 Difícil' };

function embed(day, game) {
  const e = new EmbedBuilder()
    .setColor(0xff7a18)
    .setTitle(`${game.emoji || '🕹️'} Retro 365 · Día ${day}: ${game.name}`)
    .setURL(config.retro365.urlWeb)
    .setDescription(game.summary || null);
  if (game.difficulty) e.addFields({ name: 'Dificultad', value: DIFFICULTY[game.difficulty] || game.difficulty, inline: true });
  if (game.steamUrl) e.addFields({ name: 'Dónde jugarlo', value: `[Steam](${game.steamUrl})`, inline: true });
  return e.setFooter({ text: `Día ${day} de 365` });
}

module.exports = { parseGames, loadGames, todayNumber, embed };
