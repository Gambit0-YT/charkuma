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
    youtubeApiKey: env('YOUTUBE_API_KEY'),
  },
  feeds: {
    tiktok: env('TIKTOK_FEED_URL'),
    instagram: env('INSTAGRAM_FEED_URL'),
    twitter: env('TWITTER_FEED_URL'),
  },
  minecraftServer: env('MINECRAFT_SERVER'),
  rcon: {
    host: env('MINECRAFT_RCON_HOST') || env('MINECRAFT_SERVER').replace(/:\d+$/, ''),
    port: Number(env('MINECRAFT_RCON_PORT')) || 25575,
    password: env('MINECRAFT_RCON_PASSWORD'),
  },
  dataDir: env('DATA_DIR') || path.join(__dirname, '..', 'data'),
};
