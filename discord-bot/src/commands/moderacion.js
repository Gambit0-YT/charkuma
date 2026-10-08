// Comandos básicos de moderación. Todo queda en el canal de registro.
const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { logToStaff } = require('../guild');

const reason = (i) => i.options.getString('motivo') || 'Sin motivo';
const fail = (i, err) => i.reply({ content: `❌ No he podido: ${err.message}`, flags: MessageFlags.Ephemeral });

const notHere = (i) => i.reply({ content: 'Ese usuario no está en el servidor.', flags: MessageFlags.Ephemeral });

const withTarget = (b) => b
  .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true))
  .addStringOption((o) => o.setName('motivo').setDescription('Motivo (queda en el registro)'));

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName('limpiar')
      .setDescription('Borra los últimos mensajes del canal')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addIntegerOption((o) => o.setName('cantidad').setDescription('Cuántos (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
      .addUserOption((o) => o.setName('usuario').setDescription('Solo los de este usuario')),
    async execute(i) {
      const n = i.options.getInteger('cantidad');
      const user = i.options.getUser('usuario');
      try {
        let msgs = await i.channel.messages.fetch({ limit: 100 });
        if (user) msgs = msgs.filter((m) => m.author.id === user.id);
        const deleted = await i.channel.bulkDelete([...msgs.values()].slice(0, n), true); // true = ignora los de más de 14 días
        await i.reply({ content: `🧹 Borrados ${deleted.size} mensajes.`, flags: MessageFlags.Ephemeral });
        await logToStaff(i.guild, `🧹 ${i.user} borró ${deleted.size} mensajes en ${i.channel}${user ? ` de ${user}` : ''}.`);
      } catch (err) { await fail(i, err); }
    },
  },
  {
    data: withTarget(new SlashCommandBuilder()
      .setName('aislar')
      .setDescription('Silencia temporalmente a un usuario (timeout)')
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers))
      .addIntegerOption((o) => o.setName('minutos').setDescription('Duración (por defecto 10)').setMinValue(1).setMaxValue(40320)),
    async execute(i) {
      const member = i.options.getMember('usuario');
      const mins = i.options.getInteger('minutos') || 10;
      if (!member) return notHere(i);
      try {
        await member.timeout(mins * 60e3, reason(i));
        await i.reply({ content: `🔇 ${member} aislado ${mins} min.`, flags: MessageFlags.Ephemeral });
        await logToStaff(i.guild, `🔇 ${i.user} aisló a ${member} ${mins} min. Motivo: ${reason(i)}`, 0xe67e22);
      } catch (err) { await fail(i, err); }
    },
  },
  {
    data: withTarget(new SlashCommandBuilder()
      .setName('expulsar')
      .setDescription('Expulsa a un usuario del servidor')
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)),
    async execute(i) {
      const member = i.options.getMember('usuario');
      if (!member) return notHere(i);
      try {
        await member.kick(reason(i));
        await i.reply({ content: `👢 ${member.user.tag} expulsado.`, flags: MessageFlags.Ephemeral });
        await logToStaff(i.guild, `👢 ${i.user} expulsó a ${member.user.tag}. Motivo: ${reason(i)}`, 0xe74c3c);
      } catch (err) { await fail(i, err); }
    },
  },
  {
    data: withTarget(new SlashCommandBuilder()
      .setName('banear')
      .setDescription('Banea a un usuario del servidor')
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)),
    async execute(i) {
      const user = i.options.getUser('usuario');
      try {
        await i.guild.members.ban(user, { reason: reason(i) });
        await i.reply({ content: `🔨 ${user.tag} baneado.`, flags: MessageFlags.Ephemeral });
        await logToStaff(i.guild, `🔨 ${i.user} baneó a ${user.tag}. Motivo: ${reason(i)}`, 0xc0392b);
      } catch (err) { await fail(i, err); }
    },
  },
];
