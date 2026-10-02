// Comandos para todo el mundo: redes, sugerencias, juegos gratis, Minecraft, ayuda.
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const config = require('../config');
const { findChannel } = require('../guild');
const { truncate } = require('../alerts/common');

module.exports = [
  {
    data: new SlashCommandBuilder().setName('redes').setDescription('Todas las redes del canal'),
    async execute(i) {
      const lines = Object.entries(config.redes).filter(([, url]) => url).map(([name, url]) => `**${name}:** ${url}`);
      const embed = new EmbedBuilder().setColor(0x5865f2).setTitle(`📢 Redes de ${config.creador}`).setDescription(lines.join('\n'));
      await i.reply({ embeds: [embed] });
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('sugerencia')
      .setDescription('Envía una idea para el canal o el servidor')
      .addStringOption((o) => o.setName('idea').setDescription('Tu sugerencia').setRequired(true).setMaxLength(1000)),
    async execute(i) {
      const channel = findChannel(i.guild, 'sugerencias');
      if (!channel) return i.reply({ content: 'Todavía no hay canal de sugerencias.', flags: MessageFlags.Ephemeral });
      const embed = new EmbedBuilder()
        .setColor(0xfee75c)
        .setAuthor({ name: i.member.displayName, iconURL: i.user.displayAvatarURL() })
        .setDescription(i.options.getString('idea'))
        .setFooter({ text: 'Vota con ✅ o ❌' })
        .setTimestamp();
      const msg = await channel.send({ embeds: [embed] });
      await msg.react('✅');
      await msg.react('❌');
      await msg.startThread({ name: `Debate: ${truncate(i.options.getString('idea'), 80)}` }).catch(() => {});
      await i.reply({ content: `¡Gracias! Tu sugerencia está en ${channel}.`, flags: MessageFlags.Ephemeral });
    },
  },
  {
    data: new SlashCommandBuilder().setName('juegos-gratis').setDescription('Juegos que están gratis ahora mismo'),
    async execute(i) {
      await i.deferReply();
      const { loadGiveaways } = require('../alerts/freeGames');
      try {
        const list = (await loadGiveaways()).slice(0, 10);
        if (!list.length) return i.editReply('Ahora mismo no hay juegos gratis. 😢');
        const lines = list.map((g) => `🎁 **[${g.title.replace(/\s*Giveaway$/i, '')}](${g.open_giveaway_url})** · ${g.platforms}`);
        await i.editReply({ embeds: [new EmbedBuilder().setColor(0x2ecc71).setTitle('Juegos gratis ahora mismo').setDescription(lines.join('\n'))] });
      } catch (err) {
        await i.editReply(`No he podido consultarlo: ${err.message}`);
      }
    },
  },
  {
    data: new SlashCommandBuilder().setName('minecraft').setDescription('Estado del servidor de Minecraft'),
    async execute(i) {
      if (!config.minecraftServer) return i.reply({ content: 'Aún no hay servidor de Minecraft configurado.', flags: MessageFlags.Ephemeral });
      await i.deferReply();
      const { fetchStatus, statusEmbed } = require('../alerts/minecraft');
      try {
        await i.editReply({ embeds: [statusEmbed(await fetchStatus())] });
      } catch (err) {
        await i.editReply(`No he podido consultarlo: ${err.message}`);
      }
    },
  },
  {
    data: new SlashCommandBuilder().setName('ayuda').setDescription('Qué puedo hacer'),
    async execute(i) {
      const embed = new EmbedBuilder().setColor(0x5865f2).setTitle('🤖 Comandos').setDescription([
        '**Para todos**',
        '`/redes` · `/sugerencia` · `/juegos-gratis` · `/minecraft` · `/retro365`',
        '`/nivel` · `/ranking` · `/cumple` · `/whitelist`',
        '',
        '**Moderación**',
        '`/limpiar` · `/aislar` · `/expulsar` · `/banear`',
        '',
        '**Admin**',
        '`/setup` · `/canal` · `/panel-roles` · `/panel-tickets` · `/sorteo` · `/xp` · `/probar-alerta`',
      ].join('\n'));
      await i.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },
  },
];
