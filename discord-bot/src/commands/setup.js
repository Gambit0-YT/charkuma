// /setup — crea lo que le falte al servidor para que el bot funcione:
// roles de avisos, categorías y canales. Nunca borra ni mueve nada.
// Sin `aplicar:true` solo enseña lo que haría.
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const { CATEGORIES, CHANNELS, ROLES } = require('../layout');
const { findChannel, findRole, normalize } = require('../guild');
const state = require('../state');
const { postPanel } = require('./roles');

const READONLY_DENY = [
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.SendMessagesInThreads,
  PermissionFlagsBits.CreatePublicThreads,
  PermissionFlagsBits.CreatePrivateThreads,
];
const BOT_ALLOW = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.AddReactions,
];

function plan(guild) {
  const roles = Object.keys(ROLES).filter((k) => !findRole(guild, k));
  const channels = Object.keys(CHANNELS).filter((k) => !findChannel(guild, k));
  const categories = [...new Set(channels.map((k) => CHANNELS[k].category))]
    .filter((c) => !guild.channels.cache.some((ch) => ch.type === ChannelType.GuildCategory && normalize(ch.name) === normalize(CATEGORIES[c])));
  return { roles, channels, categories };
}

function describe({ roles, channels, categories }) {
  if (!roles.length && !channels.length) return '✅ El servidor ya tiene todo lo necesario.';
  const lines = [];
  if (roles.length) lines.push(`**Roles (${roles.length}):** ${roles.map((k) => ROLES[k].name).join(', ')}`);
  if (categories.length) lines.push(`**Categorías (${categories.length}):** ${categories.map((c) => CATEGORIES[c]).join(', ')}`);
  if (channels.length) lines.push(`**Canales (${channels.length}):** ${channels.map((k) => `#${CHANNELS[k].name}`).join(', ')}`);
  return lines.join('\n');
}

async function getOrCreateCategory(guild, key) {
  const name = CATEGORIES[key];
  return guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && normalize(c.name) === normalize(name))
    || guild.channels.create({ name, type: ChannelType.GuildCategory });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Crea los roles y canales que falten para el bot (no borra nada)')
    .addBooleanOption((o) => o.setName('aplicar').setDescription('true = crearlo de verdad; si no, solo muestra lo que haría'))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { guild } = interaction;
    const todo = plan(guild);
    if (!interaction.options.getBoolean('aplicar')) {
      const hint = todo.roles.length || todo.channels.length ? '\n\nPara crearlo: `/setup aplicar:true`. Si ya tienes un canal para algo, asígnalo antes con `/canal asignar`.' : '';
      return interaction.reply({ content: `**Esto es lo que crearía:**\n${describe(todo)}${hint}`, flags: MessageFlags.Ephemeral });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const assignedRoles = state.section('roles');
    for (const key of todo.roles) {
      const def = ROLES[key];
      const role = await guild.roles.create({ name: def.name, color: def.color, mentionable: def.avisos, permissions: [], reason: '/setup del bot' });
      assignedRoles[key] = role.id;
    }

    const assignedChannels = state.section('channels');
    const me = guild.members.me;
    for (const key of todo.channels) {
      const def = CHANNELS[key];
      const parent = await getOrCreateCategory(guild, def.category);
      const overwrites = [{ id: me.id, allow: BOT_ALLOW }];
      if (def.readonly) {
        const deny = def.hilos ? READONLY_DENY.filter((p) => p !== PermissionFlagsBits.SendMessagesInThreads) : READONLY_DENY;
        overwrites.push({ id: guild.roles.everyone.id, deny });
      }
      if (def.privado) overwrites.push({ id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] });
      const ch = await guild.channels.create({ name: def.name, type: ChannelType.GuildText, parent, permissionOverwrites: overwrites, reason: '/setup del bot' });
      assignedChannels[key] = ch.id;
    }
    state.save();

    let extra = '';
    if (!state.section('rolesPanel').messageId && await postPanel(guild)) extra += '\n• Panel de avisos publicado en #roles.';

    const highest = me.roles.highest;
    const below = Object.keys(ROLES).map((k) => findRole(guild, k)).filter((r) => r && r.position >= highest.position);
    if (below.length) extra += `\n⚠️ Sube el rol **${highest.name}** por encima de los roles de avisos (Ajustes del servidor → Roles), o no podré darlos.`;

    await interaction.editReply(`**Hecho.** Creado:\n${describe(todo)}${extra}`);
  },
};
