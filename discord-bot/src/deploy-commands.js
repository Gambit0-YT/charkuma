// Registra los comandos de barra (/) en tu servidor. Ejecuta
// `npm run registrar-comandos` cada vez que añadas o cambies un comando.
const { REST, Routes } = require('discord.js');
const config = require('./config');
const commands = require('./commands');

(async () => {
  const { discordToken, clientId, guildId } = config.secrets;
  if (!discordToken || !clientId || !guildId) {
    console.error('Faltan DISCORD_TOKEN, DISCORD_CLIENT_ID o GUILD_ID en el .env.');
    process.exit(1);
  }
  const body = [...commands.values()].map((c) => c.data.toJSON());
  const rest = new REST().setToken(discordToken);
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
  console.log(`✅ ${body.length} comandos registrados: ${body.map((c) => `/${c.name}`).join(' ')}`);
})().catch((err) => {
  console.error('❌ No se pudieron registrar los comandos:', err.message);
  process.exit(1);
});
