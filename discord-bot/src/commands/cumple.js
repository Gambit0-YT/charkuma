const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const birthdays = require('../features/birthdays');
const state = require('../state');
const { localNow } = require('../time');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cumple')
    .setDescription('Cumpleaños del servidor')
    .addSubcommand((s) => s.setName('poner').setDescription('Guarda tu cumpleaños (solo día y mes)')
      .addIntegerOption((o) => o.setName('dia').setDescription('Día').setRequired(true).setMinValue(1).setMaxValue(31))
      .addIntegerOption((o) => o.setName('mes').setDescription('Mes').setRequired(true)
        .addChoices(...birthdays.MONTHS.map((m, n) => ({ name: m, value: n + 1 })))))
    .addSubcommand((s) => s.setName('quitar').setDescription('Borra tu cumpleaños'))
    .addSubcommand((s) => s.setName('proximos').setDescription('Los próximos cumpleaños')),
  async execute(i) {
    const sub = i.options.getSubcommand();
    if (sub === 'poner') {
      const dia = i.options.getInteger('dia');
      const mes = i.options.getInteger('mes');
      if (!birthdays.isValid(dia, mes)) return i.reply({ content: 'Esa fecha no existe. 🤔', flags: MessageFlags.Ephemeral });
      birthdays.all()[i.user.id] = { dia, mes };
      state.save();
      return i.reply({ content: `🎂 ¡Apuntado! Te felicitaremos el **${birthdays.format({ dia, mes })}**.`, flags: MessageFlags.Ephemeral });
    }
    if (sub === 'quitar') {
      delete birthdays.all()[i.user.id];
      state.save();
      return i.reply({ content: 'Cumpleaños borrado.', flags: MessageFlags.Ephemeral });
    }
    const list = birthdays.upcoming(localNow());
    if (!list.length) return i.reply('Nadie ha guardado su cumpleaños todavía. ¡Usa `/cumple poner`!');
    const lines = list.map((b) => `🎂 <@${b.id}> — ${birthdays.format(b)} ${b.faltan === 0 ? '**¡HOY!**' : `(en ${b.faltan} día${b.faltan === 1 ? '' : 's'})`}`);
    await i.reply({ embeds: [new EmbedBuilder().setColor(0xff69b4).setTitle('Próximos cumpleaños').setDescription(lines.join('\n'))], allowedMentions: { parse: [] } });
  },
};
