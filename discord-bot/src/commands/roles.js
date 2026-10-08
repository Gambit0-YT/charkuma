// Panel con botones para que cada miembro elija qué avisos quiere recibir.
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const { ROLES } = require('../layout');
const { findRole, findChannel } = require('../guild');
const state = require('../state');

const AVISOS = Object.entries(ROLES).filter(([, r]) => r.avisos);

function panel() {
  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle('🔔 Elige tus avisos')
    .setDescription([
      'Pulsa un botón para **apuntarte o desapuntarte**. Solo recibirás menciones de lo que elijas.',
      '',
      ...AVISOS.map(([, r]) => `**${r.name}** — ${r.descripcion}`),
    ].join('\n'));
  const buttons = AVISOS.map(([key, r]) => new ButtonBuilder().setCustomId(`rol:${key}`).setLabel(r.name).setStyle(ButtonStyle.Secondary));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 5) rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
  return { embeds: [embed], components: rows };
}

/** Publica el panel en #roles (o en `channel`) y recuerda dónde está. */
async function postPanel(guild, channel = findChannel(guild, 'roles')) {
  if (!channel) return null;
  const msg = await channel.send(panel());
  Object.assign(state.section('rolesPanel'), { channelId: channel.id, messageId: msg.id });
  state.save();
  return msg;
}

module.exports = {
  postPanel,
  data: new SlashCommandBuilder()
    .setName('panel-roles')
    .setDescription('Publica el panel de botones para elegir avisos')
    .addChannelOption((o) => o.setName('canal').setDescription('Dónde publicarlo (por defecto, #roles)'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const channel = interaction.options.getChannel('canal') || findChannel(interaction.guild, 'roles') || interaction.channel;
    await postPanel(interaction.guild, channel);
    await interaction.reply({ content: `Panel publicado en ${channel}.`, flags: MessageFlags.Ephemeral });
  },
  async button(interaction, key) {
    const role = findRole(interaction.guild, key);
    if (!role) return interaction.reply({ content: 'Ese rol aún no existe. Un admin tiene que ejecutar `/setup`.', flags: MessageFlags.Ephemeral });
    const member = interaction.member;
    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        await interaction.reply({ content: `Ya no recibirás avisos de **${role.name}**.`, flags: MessageFlags.Ephemeral });
      } else {
        await member.roles.add(role);
        await interaction.reply({ content: `¡Listo! Recibirás avisos de **${role.name}**. 🔔`, flags: MessageFlags.Ephemeral });
      }
    } catch {
      await interaction.reply({ content: 'No tengo permiso para darte ese rol. Avisa a un admin (el rol del bot debe estar por encima de los de avisos).', flags: MessageFlags.Ephemeral });
    }
  },
};
