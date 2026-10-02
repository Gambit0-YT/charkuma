const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const config = require('../config');
const retro = require('../features/retro365');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('retro365')
    .setDescription('El juego de Retro 365 de hoy (o de un día ya desvelado)')
    .addIntegerOption((o) => o.setName('dia').setDescription('Número de día (1-365)').setMinValue(1).setMaxValue(365)),
  async execute(i) {
    const today = retro.todayNumber();
    if (today < 1) {
      const start = Math.floor(Date.parse(`${config.retro365.inicio}T00:00:00`) / 1000);
      return i.reply(`🕹️ Retro 365 empieza <t:${start}:D> (<t:${start}:R>). ¡Cada día, un juego retro! Más en ${config.retro365.urlWeb}`);
    }
    const day = i.options.getInteger('dia') || Math.min(today, 365);
    if (day > today) return i.reply({ content: '🔒 Ese día todavía no se ha desvelado. ¡Paciencia!', flags: MessageFlags.Ephemeral });
    await i.deferReply();
    try {
      const game = (await retro.loadGames())[day];
      if (!game) return i.editReply(`El día ${day} aún no tiene juego decidido. 👀`);
      await i.editReply({ embeds: [retro.embed(day, game)] });
    } catch (err) {
      await i.editReply(`No he podido leer los datos de la web: ${err.message}`);
    }
  },
};
