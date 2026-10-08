// Arranca los vigilantes de alertas, cada uno a su intervalo.
const log = require('../log');
const { every } = require('../scheduler');
const social = require('./social');

const WATCHERS = {
  youtube: require('./youtube'),
  directos: require('./twitch'),
  clips: require('./twitchClips'),
  tiktok: social.tiktok,
  instagram: social.instagram,
  twitter: social.twitter,
  juegosGratis: require('./freeGames'),
  ofertas: require('./deals'),
  minecraft: require('./minecraft'),
};

function start(client) {
  for (const [key, w] of Object.entries(WATCHERS)) {
    if (!w.enabled()) {
      log.info(`Alertas de ${key}: desactivadas (falta configuración).`);
      continue;
    }
    const minutes = Math.max(1, Number(w.intervalMin()) || 5);
    every(`Alertas de ${key}`, minutes, () => w.check(client));
    log.info(`Alertas de ${key}: cada ${minutes} min.`);
  }
}

module.exports = { WATCHERS, start };
