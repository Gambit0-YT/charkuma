// Eventos de Discord: comandos, botones, bienvenidas y despedidas.
const { EmbedBuilder, Events, MessageFlags } = require('discord.js');
const config = require('./config');
const log = require('./log');
const commands = require('./commands');
const { findChannel, findRole, logToStaff } = require('./guild');

function register(client) {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.guildId !== config.secrets.guildId) return;
    try {
      if (interaction.isChatInputCommand()) {
        const cmd = commands.get(interaction.commandName);
        if (cmd) await cmd.execute(interaction);
      } else if (interaction.isButton() && interaction.customId.startsWith('rol:')) {
        await commands.get('panel-roles').button(interaction, interaction.customId.slice(4));
      }
    } catch (err) {
      log.error(`Error en la interacción ${interaction.commandName || interaction.customId}:`, err);
      const reply = { content: 'Algo ha fallado. 😵 Inténtalo de nuevo en un momento.', flags: MessageFlags.Ephemeral };
      if (interaction.deferred || interaction.replied) await interaction.followUp(reply).catch(() => {});
      else await interaction.reply(reply).catch(() => {});
    }
  });

  client.on(Events.GuildMemberAdd, async (member) => {
    if (member.guild.id !== config.secrets.guildId) return;
    const { guild } = member;
    if (config.bienvenida.darRolMiembro && !member.user.bot) {
      const role = findRole(guild, 'miembro');
      if (role) await member.roles.add(role).catch((err) => log.warn('No pude dar el rol Miembro:', err.message));
    }
    const channel = findChannel(guild, 'bienvenida');
    if (channel) {
      const roles = findChannel(guild, 'roles');
      const embed = new EmbedBuilder()
        .setColor(0x57f287)
        .setTitle(`¡Bienvenid@ a ${guild.name}! 👋`)
        .setDescription([
          `Hola ${member}, eres el miembro **#${guild.memberCount}**.`,
          roles ? `Pásate por ${roles} para elegir de qué quieres recibir avisos.` : null,
          'Usa `/redes` para ver todas las redes del canal.',
        ].filter(Boolean).join('\n'))
        .setThumbnail(member.user.displayAvatarURL({ size: 256 }));
      await channel.send({ content: `${member}`, embeds: [embed], allowedMentions: { users: [member.id] } }).catch(() => {});
    }
    await logToStaff(guild, `📥 ${member} (${member.user.tag}) ha entrado. Cuenta creada <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>.`, 0x57f287);
  });

  client.on(Events.GuildMemberRemove, async (member) => {
    if (member.guild.id !== config.secrets.guildId) return;
    await logToStaff(member.guild, `📤 ${member.user.tag} ha salido del servidor.`, 0x99aab5);
  });
}

module.exports = { register };
