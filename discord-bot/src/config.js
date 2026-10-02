// Carga la configuración pública (config.json) y los secretos (.env).
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const config = require('../config.json');

const env = (name) => (process.env[name] || '').trim();

module.exports = {
  ...config,
  secrets: {
    discordToken: env('DISCORD_TOKEN'),
    clientId: env('DISCORD_CLIENT_ID'),
    guildId: env('GUILD_ID'),
    twitchClientId: env('TWITCH_CLIENT_ID'),
    twitchClientSecret: env('TWITCH_CLIENT_SECRET'),
  },
  feeds: {
    tiktok: env('TIKTOK_FEED_URL'),
    instagram: env('INSTAGRAM_FEED_URL'),
    twitter: env('TWITTER_FEED_URL'),
  },
  minecraftServer: env('MINECRAFT_SERVER'),
  dataDir: env('DATA_DIR') || path.join(__dirname, '..', 'data'),
};
