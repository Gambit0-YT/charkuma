// Tickets de soporte: botón "Abrir ticket" → canal privado entre la persona
// y el staff (rol 🛡️ Staff + administradores). Se cierra con un botón.
const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const config = require('../config');
const state = require('../state');
const { CATEGORIES } = require('../layout');
const { findChannel, findRole, normalize, logToStaff } = require('../guild');

const all = () => state.section('tickets', { contador: 0, abiertos: {} });

function panel() {
  return {
    embeds: [new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle('🎫 ¿Necesitas ayuda?')
      .setDescription('Pulsa el botón para abrir un **ticket privado** con el staff: dudas, problemas, reportar a alguien, colaboraciones…')],
    components: [new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket:abrir').setEmoji('🎫').setLabel('Abrir ticket').setStyle(ButtonStyle.Primary),
    )],
  };
}

async function postPanel(guild, channel = findChannel(guild, 'tickets')) {
  if (!channel) return null;
  return channel.send(panel());
}

async function getCategory(guild) {
  return guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && normalize(c.name) === normalize(CATEGORIES.tickets))
    || guild.channels.create({ name: CATEGORIES.tickets, type: ChannelType.GuildCategory });
}

async function open(interaction) {
  const { guild, user } = interaction;
  const t = all();
  const existing = Object.entries(t.abiertos).find(([chId, tk]) => tk.userId === user.id && guild.channels.cache.has(chId));
  if (existing) return interaction.reply({ content: `Ya tienes un ticket abierto: <#${existing[0]}>`, flags: MessageFlags.Ephemeral });

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  t.contador++;
  const numero = String(t.contador).padStart(4, '0');
  const staff = findRole(guild, 'staff');
  const allow = [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks];
  const overwrites = [
    { id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
    { id: user.id, allow },
    { id: guild.members.me.id, allow: [...allow, PermissionFlagsBits.ManageChannels] },
  ];
  if (staff) overwrites.push({ id: staff.id, allow });
  const channel = await guild.channels.create({
    name: `ticket-${numero}-${normalize(user.username).slice(0, 20) || 'usuario'}`,
    type: ChannelType.GuildText,
    parent: await getCategory(guild),
    permissionOverwrites: overwrites,
    reason: `Ticket de ${user.tag}`,
  });
  t.abiertos[channel.id] = { userId: user.id, numero, abierto: Date.now() };
  state.save();

  const ping = staff && config.tickets.mencionarStaff ? ` ${staff}` : '';
  await channel.send({
    content: `${user}${ping}`,
    embeds: [new EmbedBuilder().setColor(0x5865f2).setTitle(`🎫 Ticket #${numero}`)
      .setDescription('Cuéntanos qué necesitas con todo el detalle que puedas. El staff te responderá aquí lo antes posible.')],
    components: [new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket:cerrar').setEmoji('🔒').setLabel('Cerrar ticket').setStyle(ButtonStyle.Danger),
    )],
    allowedMentions: { users: [user.id], roles: ping ? [staff.id] : [] },
  });
  await logToStaff(guild, `🎫 ${user} abrió el ticket #${numero} (${channel}).`);
  await interaction.editReply(`Ticket abierto: ${channel}`);
}

async function askClose(interaction) {
  await interaction.reply({
    content: '¿Seguro que quieres cerrar el ticket? El canal se borrará.',
    components: [new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('ticket:confirmar').setLabel('Sí, cerrar').setStyle(ButtonStyle.Danger),
    )],
    flags: MessageFlags.Ephemeral,
  });
}

async function close(interaction) {
  const t = all();
  const tk = t.abiertos[interaction.channelId];
  if (!tk) return interaction.reply({ content: 'Esto no es un ticket abierto.', flags: MessageFlags.Ephemeral });
  delete t.abiertos[interaction.channelId];
  state.save();
  await interaction.reply({ content: `🔒 Ticket cerrado por ${interaction.user}. Este canal se borrará en 5 segundos.` });
  const mins = Math.round((Date.now() - tk.abierto) / 60000);
  await logToStaff(interaction.guild, `🔒 ${interaction.user} cerró el ticket #${tk.numero} de <@${tk.userId}> (abierto ${mins} min).`, 0x99aab5);
  const { channel } = interaction;
  setTimeout(() => channel.delete('Ticket cerrado').catch(() => {}), 5000);
}

async function button(interaction, action) {
  if (action === 'abrir') return open(interaction);
  if (action === 'cerrar') return askClose(interaction);
  if (action === 'confirmar') return close(interaction);
}

module.exports = { postPanel, button, all };
