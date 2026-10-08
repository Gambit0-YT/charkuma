// Arranca las tareas periódicas de las funciones del servidor.
const config = require('../config');
const log = require('../log');
const { every, daily } = require('../scheduler');
const { getGuild, findChannel, sendAlert } = require('../guild');
const levels = require('./levels');
const giveaways = require('./giveaways');
const birthdays = require('./birthdays');
const counters = require('./counters');
const memeOfWeek = require('./memeOfWeek');
const retro = require('./retro365');

function start(client) {
  const withGuild = (fn) => async (...args) => {
    const guild = await getGuild(client);
    if (guild) await fn(guild, ...args);
  };

  if (config.niveles.activo) every('XP de voz', 1, withGuild(levels.voiceTick));
  every('Sorteos', 0.25, () => giveaways.tick(client));
  daily('Cumpleaños', config.cumples.hora, withGuild(birthdays.celebrate));
  every('Contadores', config.contadores.intervaloMin, withGuild(counters.update));

  if (config.memeSemana.activo) {
    daily('Meme de la semana', config.memeSemana.hora, withGuild(memeOfWeek.run), { weekday: config.memeSemana.diaSemana });
  }

  if (config.retro365.activo) {
    daily('Retro 365', config.retro365.hora, async () => {
      const day = retro.todayNumber();
      if (day < 1 || day > 365) return;
      const game = (await retro.loadGames())[day];
      if (!game) return log.info(`Retro 365: el día ${day} no tiene juego decidido.`);
      const guild = await getGuild(client);
      if (!guild || !findChannel(guild, 'retro365')) return;
      await sendAlert(client, 'retro365', 'retro365', { content: `🕹️ ¡Nuevo día de **Retro 365**! Hoy toca…`, embeds: [retro.embed(day, game)] });
    });
  }
  log.info('Funciones del servidor en marcha (niveles, sorteos, cumpleaños, contadores, meme de la semana, Retro 365).');
}

module.exports = { start };
