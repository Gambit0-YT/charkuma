// Tareas periódicas (cada X minutos) y diarias/semanales (a una hora local),
// sin solaparse y sin que el fallo de una afecte a las demás.
const log = require('./log');
const state = require('./state');
const { localNow } = require('./time');

function every(name, minutes, fn) {
  let running = false;
  let failures = 0;
  const run = async () => {
    if (running) return;
    running = true;
    try {
      await fn();
      failures = 0;
    } catch (err) {
      failures++;
      // No llenamos el log si una API está caída un rato.
      if (failures === 1 || failures % 10 === 0) log.warn(`${name} (fallo #${failures}):`, err.message);
    } finally {
      running = false;
    }
  };
  const ms = Math.max(0.1, Number(minutes) || 5) * 60e3;
  setTimeout(run, 5000 + Math.random() * 10000); // arranque escalonado
  setInterval(run, ms);
  return run;
}

/**
 * Ejecuta `fn` una vez al día a partir de la hora `hour` (hora local). Con
 * `weekday` (0 = domingo) solo ese día de la semana. Si el bot estaba
 * apagado a esa hora, lo hace en cuanto arranque (ese mismo día).
 */
function daily(name, hour, fn, { weekday = null } = {}) {
  return every(name, 5, async () => {
    const now = localNow();
    if (weekday != null && now.weekday !== weekday) return;
    if (now.hour < hour) return;
    const done = state.section('diarias');
    if (done[name] === now.date) return;
    await fn(now);
    done[name] = now.date;
    state.save();
  });
}

module.exports = { every, daily };
