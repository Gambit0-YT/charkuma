const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, MessageFlags } = require('discord.js');
const levels = require('../features/levels');
const state = require('../state');
const { logToStaff } = require('../guild');
const { REWARD_ROLES } = require('../layout');

function bar(current, needed, size = 12) {
  const filled = Math.round((current / needed) * size);
  return '▰'.repeat(filled) + '▱'.repeat(size - filled);
}

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName('nivel')
      .setDescription('Tu nivel y XP (o los de otra persona)')
      .addUserOption((o) => o.setName('usuario').setDescription('De quién')),
    async execute(i) {
      const user = i.options.getUser('usuario') || i.user;
      const member = i.options.getMember('usuario') || (user.id === i.user.id ? i.member : null);
      const u = levels.getUser(user.id);
      const info = levels.levelInfo(u.xp);
      const next = REWARD_ROLES.find((r) => r.nivel > info.level);
      const embed = new EmbedBuilder()
        .setColor(member?.displayColor || 0x5865f2)
        .setAuthor({ name: member?.displayName || user.username, iconURL: user.displayAvatarURL() })
        .setTitle(`Nivel ${info.level}`)
        .setDescription(`${bar(info.current, info.needed)}\n**${info.current}** / ${info.needed} XP para el nivel ${info.level + 1}`)
        .addFields(
          { name: 'Puesto', value: u.xp ? `#${levels.position(user.id)}` : '—', inline: true },
          { name: 'XP total', value: String(u.xp), inline: true },
          { name: 'Mensajes', value: String(u.mensajes), inline: true },
          { name: 'Minutos en voz', value: String(u.minutosVoz), inline: true },
        );
      if (next) embed.setFooter({ text: `Próxima recompensa: ${next.name} (nivel ${next.nivel})` });
      await i.reply({ embeds: [embed] });
    },
  },
  {
    data: new SlashCommandBuilder().setName('ranking').setDescription('Top 10 de actividad del servidor'),
    async execute(i) {
      const top = levels.ranking().filter(([, u]) => u.xp > 0).slice(0, 10);
      if (!top.length) return i.reply('Todavía nadie tiene XP. ¡A escribir! 💬');
      const medals = ['🥇', '🥈', '🥉'];
      const lines = top.map(([id, u], n) => `${medals[n] || `**${n + 1}.**`} <@${id}> — nivel **${levels.levelInfo(u.xp).level}** · ${u.xp} XP`);
      const mine = levels.position(i.user.id);
      const embed = new EmbedBuilder()
        .setColor(0xffd700)
        .setTitle(`🏆 Ranking de ${i.guild.name}`)
        .setDescription(lines.join('\n'))
        .setFooter({ text: mine ? `Tú estás en el puesto #${mine}` : 'Aún no tienes XP' });
      await i.reply({ embeds: [embed], allowedMentions: { parse: [] } });
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('xp')
      .setDescription('Administrar la XP de un miembro')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .addSubcommand((s) => s.setName('dar').setDescription('Da (o quita, con número negativo) XP')
        .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true))
        .addIntegerOption((o) => o.setName('cantidad').setDescription('XP (negativo para quitar)').setRequired(true)))
      .addSubcommand((s) => s.setName('reiniciar').setDescription('Pone la XP de alguien a cero')
        .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true))),
    async execute(i) {
      const member = i.options.getMember('usuario');
      if (!member) return i.reply({ content: 'Ese usuario no está en el servidor.', flags: MessageFlags.Ephemeral });
      if (i.options.getSubcommand() === 'reiniciar') {
        const u = levels.getUser(member.id);
        Object.assign(u, { xp: 0, mensajes: 0, minutosVoz: 0 });
        state.save();
        await levels.syncRewardRoles(member, 0);
        await logToStaff(i.guild, `♻️ ${i.user} reinició la XP de ${member}.`);
        return i.reply({ content: `XP de ${member} reiniciada.`, flags: MessageFlags.Ephemeral });
      }
      const amount = i.options.getInteger('cantidad');
      const level = await levels.addXp(member, amount, { channel: i.channel });
      await logToStaff(i.guild, `✨ ${i.user} dio ${amount} XP a ${member} (ahora nivel ${level}).`);
      await i.reply({ content: `${amount >= 0 ? '+' : ''}${amount} XP para ${member}. Ahora es nivel **${level}**.`, flags: MessageFlags.Ephemeral });
    },
  },
];
