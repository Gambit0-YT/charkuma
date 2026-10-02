// /canal — asigna un canal que YA tienes a un tipo de alerta, para que el
// bot lo use en lugar de crear uno nuevo.
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const { CHANNELS } = require('../layout');
const { findChannel } = require('../guild');
const state = require('../state');

const LABELS = {
  bienvenida: 'Bienvenidas', roles: 'Panel de avisos', sugerencias: 'Sugerencias',
  youtube: 'Vídeos de YouTube', directos: 'Directos de Twitch', tiktok: 'TikTok', instagram: 'Instagram', twitter: 'X / Twitter',
  juegosGratis: 'Juegos gratis', ofertas: 'Ofertas', minecraftEstado: 'Estado de Minecraft', logs: 'Registro del staff',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('canal')
    .setDescription('Configura qué canal usa el bot para cada cosa')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((s) => s.setName('asignar').setDescription('Usa un canal existente para un tipo de alerta')
      .addStringOption((o) => o.setName('tipo').setDescription('¿Para qué?').setRequired(true)
        .addChoices(...Object.keys(CHANNELS).map((k) => ({ name: LABELS[k] || k, value: k }))))
      .addChannelOption((o) => o.setName('canal').setDescription('Canal de texto').setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)))
    .addSubcommand((s) => s.setName('ver').setDescription('Muestra qué canal usa el bot para cada cosa')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'asignar') {
      const key = interaction.options.getString('tipo');
      const channel = interaction.options.getChannel('canal');
      state.section('channels')[key] = channel.id;
      state.save();
      return interaction.reply({ content: `✅ **${LABELS[key]}** → ${channel}`, flags: MessageFlags.Ephemeral });
    }
    const lines = Object.keys(CHANNELS).map((k) => {
      const ch = findChannel(interaction.guild, k);
      return `**${LABELS[k]}:** ${ch ? `${ch}` : '❌ sin asignar'}`;
    });
    return interaction.reply({ content: lines.join('\n'), flags: MessageFlags.Ephemeral });
  },
};
