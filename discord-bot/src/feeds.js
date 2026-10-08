// Lector de feeds RSS 2.0 y Atom (YouTube, rss.app, RSSHub...) que devuelve
// siempre la misma forma de objeto, sea cual sea el formato de origen.
const { XMLParser } = require('fast-xml-parser');
const { getText } = require('./http');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) => ['item', 'entry', 'link', 'media:content', 'media:thumbnail', 'enclosure'].includes(name),
});

const text = (v) => {
  if (v == null) return '';
  if (typeof v === 'object') return String(v['#text'] ?? '');
  return String(v);
};

const stripHtml = (html) => text(html)
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .trim();

function firstImage(entry) {
  const group = entry['media:group'] || {};
  const candidates = [
    ...(group['media:thumbnail'] || []),
    ...(entry['media:thumbnail'] || []),
    ...(entry['media:content'] || []),
    ...(entry.enclosure || []).filter((e) => String(e['@_type'] || '').startsWith('image')),
  ];
  const withUrl = candidates.find((c) => c && c['@_url']);
  if (withUrl) return withUrl['@_url'];
  const html = text(entry.description) || text(entry['content:encoded']) || text(entry.content);
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function atomLink(entry) {
  const links = entry.link || [];
  const alt = links.find((l) => !l['@_rel'] || l['@_rel'] === 'alternate') || links[0];
  return alt ? alt['@_href'] || text(alt) : '';
}

/** Convierte el XML de un feed en una lista de entradas, de la más nueva a la más antigua. */
function parseFeed(xml) {
  const doc = parser.parse(xml);
  let items = [];
  if (doc.feed) {
    items = (doc.feed.entry || []).map((e) => ({
      id: text(e['yt:videoId']) || text(e.id) || atomLink(e),
      title: text(e.title),
      link: atomLink(e),
      published: text(e.published) || text(e.updated),
      author: text(e.author?.name),
      description: stripHtml(e['media:group']?.['media:description'] ?? e.summary ?? e.content),
      image: firstImage(e),
    }));
  } else if (doc.rss?.channel) {
    items = (doc.rss.channel.item || []).map((e) => {
      const link = text(e.link?.[0] ?? e.link);
      return {
        id: text(e.guid) || link,
        title: text(e.title),
        link,
        published: text(e.pubDate) || text(e['dc:date']),
        author: text(e['dc:creator']) || text(e.author),
        description: stripHtml(e.description ?? e['content:encoded']),
        image: firstImage(e),
      };
    });
  } else {
    throw new Error('El contenido no parece un feed RSS ni Atom');
  }
  return items
    .filter((i) => i.id)
    .sort((a, b) => (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0));
}

async function fetchFeed(url) {
  return parseFeed(await getText(url));
}

module.exports = { parseFeed, fetchFeed, stripHtml };
