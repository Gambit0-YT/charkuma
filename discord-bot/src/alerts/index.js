// Planificador: ejecuta cada vigilante cada X minutos, sin solaparse y sin
// que el fallo de uno afecte a los demás.
const log = require('../log');
const social = require('./social');

const WATCHERS = {
  youtube: require('./youtube'),
  directos: require('./twitch'),
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
    let running = false;
    let failures = 0;
    const run = async () => {
      if (running) return;
      running = true;
      try {
        await w.check(client);
        failures = 0;
      } catch (err) {
        failures++;
        // No llenamos el log si una API está caída un rato.
        if (failures === 1 || failures % 10 === 0) log.warn(`Alertas de ${key} (fallo #${failures}):`, err.message);
      } finally {
        running = false;
      }
    };
    const minutes = Math.max(1, Number(w.intervalMin()) || 5);
    setTimeout(run, 5000 + Math.random() * 10000); // arranque escalonado
    setInterval(run, minutes * 60e3);
    log.info(`Alertas de ${key}: cada ${minutes} min.`);
  }
}

module.exports = { WATCHERS, start };
