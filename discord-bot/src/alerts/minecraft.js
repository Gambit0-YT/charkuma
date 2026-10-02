// Estado del servidor de Minecraft: un mensaje fijo en #estado-servidor que
// se actualiza solo (online/offline, jugadores conectados, versión).
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const state = require('../state');
const log = require('../log');
const { getJson } = require('../http');
const { getGuild, findChannel, sendAlert } = require('../guild');

async function fetchStatus() {
  const base = config.minecraft.edicion === 'bedrock' ? 'https://api.mcsrvstat.us/bedrock/3/' : 'https://api.mcsrvstat.us/3/';
  return getJson(base + encodeURIComponent(config.minecraftServer));
}

function statusEmbed(st) {
  const embed = new EmbedBuilder()
    .setTitle('⛏️ Servidor de Minecraft')
    .addFields({ name: 'Dirección', value: `\`${config.minecraftServer}\``, inline: true })
    .setFooter({ text: 'Se actualiza automáticamente' })
    .setTimestamp();
  if (!st.online) {
    return embed.setColor(0xe74c3c).setDescription('🔴 **Cerrado** ahora mismo.');
  }
  const players = st.players?.list?.map((p) => p.name || p).slice(0, 20) || [];
  embed
    .setColor(0x2ecc71)
    .setDescription(`🟢 **Abierto**${st.motd?.clean?.length ? `\n> ${st.motd.clean.join('\n> ')}` : ''}`)
    .addFields(
      { name: 'Jugadores', value: `${st.players?.online ?? 0}/${st.players?.max ?? '?'}`, inline: true },
      { name: 'Versión', value: String(st.version || '—').slice(0, 100), inline: true },
    );
  if (players.length) embed.addFields({ name: 'Conectados', value: players.map((p) => `\`${p}\``).join(' ') });
  return embed;
}

module.exports = {
  name: 'minecraft',
  enabled: () => Boolean(config.minecraftServer),
  intervalMin: () => config.minecraft.intervaloMin,
  fetchStatus,
  statusEmbed,
  async check(client) {
    const s = state.section('minecraft', {});
    const st = await fetchStatus();
    const guild = await getGuild(client);
    const channel = guild && findChannel(guild, 'minecraftEstado');
    if (channel) {
      const payload = { embeds: [statusEmbed(st)] };
      let msg = null;
      if (s.messageId && s.channelId === channel.id) msg = await channel.messages.fetch(s.messageId).catch(() => null);
      if (msg) await msg.edit(payload);
      else {
        msg = await channel.send(payload).catch((err) => log.warn('Minecraft:', err.message));
        if (msg) Object.assign(s, { messageId: msg.id, channelId: channel.id });
      }
    }
    if (config.minecraft.avisarAlAbrir && st.online && s.lastOnline === false) {
      await sendAlert(client, 'minecraftEstado', 'minecraft', { content: `¡El servidor de Minecraft está **abierto**! ⛏️ \`${config.minecraftServer}\`` });
    }
    s.lastOnline = Boolean(st.online);
    state.save();
  },
  async test(client) {
    const st = await fetchStatus();
    await sendAlert(client, 'minecraftEstado', 'minecraft', { embeds: [statusEmbed(st)] }, { prueba: true });
  },
};
