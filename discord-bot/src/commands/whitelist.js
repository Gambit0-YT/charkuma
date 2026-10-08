// /whitelist — cada miembro se añade solo a la whitelist del servidor de
// Minecraft (un nombre por persona; si lo cambia, se quita el anterior).
const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const config = require('../config');
const state = require('../state');
const rcon = require('../features/rcon');
const levels = require('../features/levels');
const { logToStaff } = require('../guild');

// Java: 3-16 letras, números o _. Bedrock vía Floodgate: empieza por "." y admite espacios.
const VALID = /^(\.[A-Za-z0-9_ ]{1,16}|[A-Za-z0-9_]{3,16})$/;
const names = () => state.section('whitelist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Whitelist del servidor de Minecraft')
    .addSubcommand((s) => s.setName('unirme').setDescription('Añade tu nombre de Minecraft a la whitelist')
      .addStringOption((o) => o.setName('nombre').setDescription('Tu nombre exacto en Minecraft').setRequired(true).setMaxLength(17)))
    .addSubcommand((s) => s.setName('ver').setDescription('Qué nombre tienes registrado'))
    .addSubcommand((s) => s.setName('quitar').setDescription('(Staff) Quita a alguien de la whitelist')
      .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true))),
  async execute(i) {
    const eph = (content) => ({ content, flags: MessageFlags.Ephemeral });
    if (!rcon.enabled()) return i.reply(eph('La whitelist automática no está configurada (falta RCON en el `.env`).'));
    const sub = i.options.getSubcommand();

    if (sub === 'ver') {
      const name = names()[i.user.id];
      return i.reply(eph(name ? `Tienes registrado **${name}**.` : 'No tienes ningún nombre registrado. Usa `/whitelist unirme`.'));
    }

    if (sub === 'quitar') {
      if (!i.memberPermissions.has(PermissionFlagsBits.ManageGuild)) return i.reply(eph('Solo el staff puede quitar a otros.'));
      const user = i.options.getUser('usuario');
      const name = names()[user.id];
      if (!name) return i.reply(eph('Esa persona no tiene nombre registrado.'));
      await i.deferReply({ flags: MessageFlags.Ephemeral });
      const res = await rcon.send(`whitelist remove ${name}`).catch((err) => `❌ ${err.message}`);
      delete names()[user.id];
      state.save();
      await logToStaff(i.guild, `⛏️ ${i.user} quitó a ${user} (**${name}**) de la whitelist.`);
      return i.editReply(`Servidor: ${res}`);
    }

    const name = i.options.getString('nombre').trim();
    if (!VALID.test(name)) return i.reply(eph('Ese nombre no es válido en Minecraft (3-16 letras, números o _).'));
    const min = config.whitelist.nivelMinimo;
    if (min && levels.levelOf(i.user.id) < min) return i.reply(eph(`Necesitas nivel **${min}** para entrar en la whitelist. Mira tu nivel con \`/nivel\`.`));
    const taken = Object.entries(names()).find(([uid, n]) => uid !== i.user.id && n.toLowerCase() === name.toLowerCase());
    if (taken) return i.reply(eph('Ese nombre ya lo ha registrado otra persona. Si es tuyo, habla con el staff.'));

    await i.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const old = names()[i.user.id];
      if (old && old.toLowerCase() !== name.toLowerCase()) await rcon.send(`whitelist remove ${old}`);
      const res = await rcon.send(`whitelist add ${name}`);
      names()[i.user.id] = name;
      state.save();
      await logToStaff(i.guild, `⛏️ ${i.user} se añadió a la whitelist como **${name}**${old && old !== name ? ` (antes **${old}**)` : ''}.`);
      await i.editReply(`✅ ¡Listo, **${name}**! Ya puedes entrar al servidor${config.minecraftServer ? `: \`${config.minecraftServer}\`` : ''}.\n> ${res || 'OK'}`);
    } catch (err) {
      await i.editReply(`❌ ${err.message}. Inténtalo más tarde o avisa al staff.`);
    }
  },
};
