const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, MessageFlags } = require('discord.js');
const giveaways = require('../features/giveaways');
const { findChannel } = require('../guild');

const idOption = (o) => o.setName('mensaje').setDescription('ID o enlace del mensaje del sorteo').setRequired(true);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sorteo')
    .setDescription('Crear y gestionar sorteos')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((s) => s.setName('crear').setDescription('Crea un sorteo nuevo')
      .addStringOption((o) => o.setName('premio').setDescription('Qué se sortea').setRequired(true).setMaxLength(200))
      .addStringOption((o) => o.setName('duracion').setDescription('Ej.: 30m, 2h, 1d12h, 1w').setRequired(true))
      .addIntegerOption((o) => o.setName('ganadores').setDescription('Cuántos ganadores (por defecto 1)').setMinValue(1).setMaxValue(20))
      .addStringOption((o) => o.setName('descripcion').setDescription('Detalles del premio').setMaxLength(1000))
      .addIntegerOption((o) => o.setName('nivel_minimo').setDescription('Nivel mínimo para participar').setMinValue(1).setMaxValue(200))
      .addRoleOption((o) => o.setName('rol_requerido').setDescription('Rol necesario para participar'))
      .addChannelOption((o) => o.setName('canal').setDescription('Dónde publicarlo (por defecto #sorteos)').addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)))
    .addSubcommand((s) => s.setName('terminar').setDescription('Termina un sorteo ya').addStringOption(idOption))
    .addSubcommand((s) => s.setName('repetir').setDescription('Saca nuevos ganadores de un sorteo terminado')
      .addStringOption(idOption)
      .addIntegerOption((o) => o.setName('ganadores').setDescription('Cuántos nuevos (por defecto 1)').setMinValue(1).setMaxValue(20)))
    .addSubcommand((s) => s.setName('lista').setDescription('Sorteos en curso')),
  async execute(i) {
    const sub = i.options.getSubcommand();
    const eph = (content) => i.reply({ content, flags: MessageFlags.Ephemeral });

    if (sub === 'crear') {
      const duracionMs = giveaways.parseDuration(i.options.getString('duracion'));
      if (!duracionMs) return eph('Duración no válida. Usa por ejemplo `30m`, `2h`, `1d12h` o `1w` (máximo 60 días).');
      const channel = i.options.getChannel('canal') || findChannel(i.guild, 'sorteos') || i.channel;
      const msg = await giveaways.create(channel, {
        premio: i.options.getString('premio'),
        duracionMs,
        numGanadores: i.options.getInteger('ganadores') || 1,
        creador: i.user.id,
        descripcion: i.options.getString('descripcion'),
        nivelMinimo: i.options.getInteger('nivel_minimo'),
        rolRequerido: i.options.getRole('rol_requerido')?.id,
      });
      return eph(`🎉 Sorteo creado: ${msg.url}`);
    }

    if (sub === 'lista') {
      const active = Object.entries(giveaways.all()).filter(([, g]) => !g.terminado);
      if (!active.length) return eph('No hay sorteos en curso.');
      return eph(active.map(([id, g]) => `• **${g.premio}** — ${g.participantes.length} participantes — termina <t:${Math.floor(g.terminaEn / 1000)}:R> — https://discord.com/channels/${i.guildId}/${g.channelId}/${id}`).join('\n'));
    }

    const id = giveaways.resolveId(i.options.getString('mensaje'));
    const g = id && giveaways.all()[id];
    if (!g) return eph('No encuentro ese sorteo. Copia el enlace del mensaje del sorteo (clic derecho → Copiar enlace del mensaje).');

    if (sub === 'terminar') {
      if (g.terminado) return eph('Ese sorteo ya había terminado. Usa `/sorteo repetir` para sacar otro ganador.');
      await i.deferReply({ flags: MessageFlags.Ephemeral });
      await giveaways.end(i.client, id);
      return i.editReply('Sorteo terminado. ✅');
    }

    if (!g.terminado) return eph('Ese sorteo todavía no ha terminado.');
    await i.deferReply({ flags: MessageFlags.Ephemeral });
    const nuevos = await giveaways.reroll(i.client, id, i.options.getInteger('ganadores') || 1);
    return i.editReply(nuevos.length ? `Nuevos ganadores: ${nuevos.map((u) => `<@${u}>`).join(', ')}` : 'No quedan participantes que no hayan ganado ya.');
  },
};
