// TikTok, Instagram y X/Twitter no tienen una API gratuita para leer tus
// publicaciones, así que se leen a través de un feed RSS que generas en un
// servicio como rss.app (ver README). Un vigilante por red.
const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const { fetchFeed } = require('../feeds');
const { sendAlert } = require('../guild');
const { publishNew, truncate } = require('./common');

/**
 * Los enlaces de x.com no se previsualizan bien en Discord; fxtwitter.com
 * sí muestra el tweet completo (texto, fotos y vídeo) dentro del chat.
 */
function tweetEmbedLink(link) {
  const m = String(link).match(/(?:twitter\.com|x\.com|nitter\.[^/]+)\/([^/]+)\/status(?:es)?\/(\d+)/i);
  return m ? `https://fxtwitter.com/${m[1]}/status/${m[2]}` : link;
}

const isRetweet = (item) => /^RT\s+(by\s+)?@/i.test(item.title) || /^RT\b/.test(item.description);

const NETWORKS = {
  tiktok: {
    role: 'tiktok',
    message: (item) => ({ content: `¡TikTok nuevo! 🎵\n${item.link}` }),
  },
  instagram: {
    role: 'instagram',
    message: (item) => {
      const embed = new EmbedBuilder()
        .setColor(0xe1306c)
        .setAuthor({ name: 'Instagram', url: config.redes.Instagram || undefined })
        .setTitle('Nueva publicación en Instagram')
        .setURL(item.link)
        .setDescription(truncate(item.description || item.title, 400) || null)
        .setTimestamp(Date.parse(item.published) ? new Date(item.published) : new Date());
      if (item.image) embed.setImage(item.image);
      return { content: `¡Nueva foto en Instagram! 📸\n<${item.link}>`, embeds: [embed] };
    },
  },
  twitter: {
    role: 'twitter',
    filter: (item) => config.social.incluirRetweets || !isRetweet(item),
    message: (item) => ({ content: `¡Nuevo tweet! 🐦\n${tweetEmbedLink(item.link)}` }),
  },
};

function watcher(network) {
  const def = NETWORKS[network];
  const load = async () => (await fetchFeed(config.feeds[network])).filter(def.filter || (() => true));
  return {
    name: network,
    enabled: () => Boolean(config.feeds[network]),
    intervalMin: () => config.social.intervaloMin,
    async check(client) {
      await publishNew(network, await load(), (item) => sendAlert(client, network, def.role, def.message(item)));
    },
    async test(client) {
      const [item] = await load();
      if (!item) return `El feed de ${network} está vacío.`;
      await sendAlert(client, network, def.role, def.message(item), { prueba: true });
    },
  };
}

module.exports = {
  tiktok: watcher('tiktok'),
  instagram: watcher('instagram'),
  twitter: watcher('twitter'),
  tweetEmbedLink,
  isRetweet,
};
