const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const tickets = require('../features/tickets');
const { findChannel } = require('../guild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panel-tickets')
    .setDescription('Publica el botón para abrir tickets de soporte')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((o) => o.setName('canal').setDescription('Dónde (por defecto, #soporte)').addChannelTypes(ChannelType.GuildText)),
  async execute(i) {
    const channel = i.options.getChannel('canal') || findChannel(i.guild, 'tickets') || i.channel;
    await tickets.postPanel(i.guild, channel);
    await i.reply({ content: `Panel de tickets publicado en ${channel}.`, flags: MessageFlags.Ephemeral });
  },
};
