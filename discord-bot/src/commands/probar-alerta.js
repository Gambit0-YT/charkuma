// /probar-alerta — publica la última publicación real de una fuente (sin
// mencionar a nadie) para comprobar que todo está bien conectado.
const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('probar-alerta')
    .setDescription('Envía una alerta de prueba (sin mencionar a nadie)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((o) => o.setName('tipo').setDescription('Qué alerta probar').setRequired(true).addChoices(
      { name: 'YouTube', value: 'youtube' },
      { name: 'Directo de Twitch', value: 'directos' },
      { name: 'TikTok', value: 'tiktok' },
      { name: 'Instagram', value: 'instagram' },
      { name: 'X / Twitter', value: 'twitter' },
      { name: 'Juegos gratis', value: 'juegosGratis' },
      { name: 'Ofertas', value: 'ofertas' },
      { name: 'Minecraft', value: 'minecraft' },
    )),
  async execute(interaction) {
    const { WATCHERS } = require('../alerts'); // carga diferida: evita dependencias circulares
    const w = WATCHERS[interaction.options.getString('tipo')];
    if (!w.enabled()) return interaction.reply({ content: 'Esa alerta no está configurada todavía (revisa el `.env`, ver README).', flags: MessageFlags.Ephemeral });
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const problem = await w.test(interaction.client);
      await interaction.editReply(problem || '✅ Enviada. Si no la ves, revisa `/canal ver`.');
    } catch (err) {
      await interaction.editReply(`❌ Falló: ${err.message}`);
    }
  },
};
