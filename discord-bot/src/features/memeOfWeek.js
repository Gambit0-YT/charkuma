// Meme de la semana: cada domingo, el mensaje de #memes con más reacciones
// de los últimos 7 días se reenvía destacado y su autor recibe el rol
// 🏆 Rey del meme durante una semana.
const { EmbedBuilder } = require('discord.js');
const state = require('../state');
const log = require('../log');
const { findChannel, findRole } = require('../guild');

const WEEK = 7 * 86400e3;

/** Mensajes de los últimos 7 días (máx. 1000), sin los de bots. */
async function recentMessages(channel) {
  const out = [];
  let before;
  for (let page = 0; page < 10; page++) {
    const batch = await channel.messages.fetch({ limit: 100, before });
    if (!batch.size) break;
    for (const m of batch.values()) if (Date.now() - m.createdTimestamp <= WEEK && !m.author.bot) out.push(m);
    const oldest = batch.last();
    if (Date.now() - oldest.createdTimestamp > WEEK) break;
    before = oldest.id;
  }
  return out;
}

/** Total de reacciones del mensaje (todas las de todos los emojis). */
function score(message) {
  let total = 0;
  for (const r of message.reactions.cache.values()) total += r.count;
  return total;
}

async function run(guild) {
  const channel = findChannel(guild, 'memes');
  if (!channel) return log.warn('Meme de la semana: no hay canal de memes (usa /canal asignar).');
  const messages = await recentMessages(channel);
  const best = messages.map((m) => ({ m, s: score(m) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s)[0];
  if (!best) return null;

  const role = findRole(guild, 'memeSemana');
  if (role) {
    await guild.members.fetch().catch(() => {});
    for (const member of role.members.values()) await member.roles.remove(role).catch(() => {});
    const winner = await guild.members.fetch(best.m.author.id).catch(() => null);
    if (winner) await winner.roles.add(role).catch(() => {});
  }
  const embed = new EmbedBuilder()
    .setColor(0xffa500)
    .setTitle('🏆 Meme de la semana')
    .setDescription(`¡Enhorabuena ${best.m.author}! Tu meme ha arrasado con **${best.s}** reacciones.${role ? `\nTe llevas el rol **${role.name}** hasta el próximo domingo. 👑` : ''}\n[Ver el original](${best.m.url})`);
  await channel.send({ embeds: [embed], allowedMentions: { users: [best.m.author.id] } });
  await best.m.forward(channel).catch((err) => log.warn('No pude reenviar el meme:', err.message));
  state.section('memeSemana').ultimo = { messageId: best.m.id, userId: best.m.author.id, reacciones: best.s };
  state.save();
  return best;
}

module.exports = { run, score };
