// Punto de entrada del bot de Discord de CHARKUMA.
const { Client, GatewayIntentBits, Events, ActivityType } = require('discord.js');
const config = require('./config');
const log = require('./log');
const events = require('./events');
const alerts = require('./alerts');

for (const key of ['discordToken', 'guildId']) {
  if (!config.secrets[key]) {
    log.error(`Falta ${key === 'discordToken' ? 'DISCORD_TOKEN' : 'GUILD_ID'} en el .env (mira .env.example).`);
    process.exit(1);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // intent privilegiado: actívalo en el Developer Portal (para las bienvenidas)
  ],
});

events.register(client);

client.once(Events.ClientReady, async (c) => {
  log.info(`Conectado como ${c.user.tag}.`);
  const guild = await c.guilds.fetch(config.secrets.guildId).catch(() => null);
  if (!guild) {
    log.error('El bot no está en el servidor de GUILD_ID. Invítalo primero (ver README).');
    return;
  }
  await guild.channels.fetch();
  await guild.roles.fetch();
  c.user.setActivity(`a ${config.creador}`, { type: ActivityType.Watching });
  alerts.start(c);
});

process.on('unhandledRejection', (err) => log.error('Promesa sin gestionar:', err));

client.login(config.secrets.discordToken);
