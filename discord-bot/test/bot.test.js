// Pruebas sin red: se simulan las APIs (fetch) y un servidor de Discord falso.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'charkuma-bot-'));
process.env.GUILD_ID = 'g1';
process.env.TWITCH_CLIENT_ID = 'id';
process.env.TWITCH_CLIENT_SECRET = 'secret';
process.env.TWITTER_FEED_URL = 'https://rss.app/feeds/x.xml';
process.env.MINECRAFT_SERVER = 'play.ejemplo.com';

const { Collection, ChannelType } = require('discord.js');
const { parseFeed } = require('../src/feeds');
const { tweetEmbedLink, isRetweet } = require('../src/alerts/social');
const { normalize } = require('../src/guild');

// --- Discord falso ---------------------------------------------------------
const sent = [];
function fakeChannel(id, name) {
  return {
    id, name, type: ChannelType.GuildText,
    messages: { fetch: async (mid) => sent.find((m) => m.id === mid) },
    send: async (payload) => {
      const msg = { id: `m${sent.length + 1}`, channelId: id, ...payload, embeds: (payload.embeds || []).map((e) => e.toJSON ? e.toJSON() : e) };
      msg.edit = async (p) => { msg.edited = p; };
      sent.push(msg);
      return msg;
    },
    toString: () => `<#${id}>`,
  };
}
const channels = new Collection([
  ['c1', fakeChannel('c1', '📺・youtube')],
  ['c2', fakeChannel('c2', 'twitch')], // alias de "directos"
  ['c3', fakeChannel('c3', 'tweets')],
  ['c4', fakeChannel('c4', 'juegos-gratis')],
  ['c5', fakeChannel('c5', 'estado-servidor')],
]);
const roles = new Collection([['r1', { id: 'r1', name: '🔴 Directos', toString: () => '<@&r1>' }]]);
const guild = { id: 'g1', channels: { cache: channels }, roles: { cache: roles } };
const client = { guilds: { cache: new Collection([['g1', guild]]) } };

// --- fetch simulado --------------------------------------------------------
let routes = {};
global.fetch = async (url) => {
  const key = Object.keys(routes).find((k) => String(url).includes(k));
  if (!key) throw new Error(`fetch inesperado: ${url}`);
  const body = typeof routes[key] === 'function' ? routes[key](url) : routes[key];
  return { ok: true, status: 200, json: async () => body, text: async () => body };
};

const YT_XML = `<?xml version="1.0"?><feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
<entry><id>yt:video:AAA</id><yt:videoId>AAA</yt:videoId><title>Vídeo viejo</title><link rel="alternate" href="https://www.youtube.com/watch?v=AAA"/><author><name>mrChakurma</name></author><published>2020-01-01T10:00:00+00:00</published>
<media:group><media:thumbnail url="https://i.ytimg.com/AAA.jpg" width="480" height="360"/><media:description>desc</media:description></media:group></entry>
</feed>`;
const ytWith = (extra) => YT_XML.replace('<entry>', `${extra}<entry>`);

test('normalize compara nombres sin emojis ni tildes', () => {
  assert.strictEqual(normalize('🎁・Juegos-Gratís'), 'juegosgratis');
});

test('parseFeed lee Atom de YouTube', () => {
  const [item] = parseFeed(YT_XML);
  assert.strictEqual(item.id, 'AAA');
  assert.strictEqual(item.link, 'https://www.youtube.com/watch?v=AAA');
  assert.strictEqual(item.author, 'mrChakurma');
  assert.strictEqual(item.image, 'https://i.ytimg.com/AAA.jpg');
});

test('parseFeed lee RSS 2.0 (rss.app) con imagen en la descripción', () => {
  const xml = `<rss version="2.0"><channel><title>x</title>
    <item><title>Hola</title><link>https://x.com/kiddcolors/status/1</link><guid>1</guid><pubDate>Mon, 01 Sep 2026 10:00:00 GMT</pubDate><description><![CDATA[<p>Hola <img src="https://img/1.jpg"></p>]]></description></item>
    <item><title>Nuevo</title><link>https://x.com/kiddcolors/status/2</link><guid isPermaLink="false">2</guid><pubDate>Tue, 02 Sep 2026 10:00:00 GMT</pubDate><description>Texto &amp; más</description></item>
  </channel></rss>`;
  const items = parseFeed(xml);
  assert.deepStrictEqual(items.map((i) => i.id), ['2', '1']); // más nuevo primero
  assert.strictEqual(items[1].image, 'https://img/1.jpg');
  assert.strictEqual(items[0].description, 'Texto & más');
});

test('tweets: enlace fxtwitter y detección de retweets', () => {
  assert.strictEqual(tweetEmbedLink('https://x.com/kiddcolors/status/123?s=20'), 'https://fxtwitter.com/kiddcolors/status/123');
  assert.strictEqual(tweetEmbedLink('https://twitter.com/a/status/9'), 'https://fxtwitter.com/a/status/9');
  assert.ok(isRetweet({ title: 'RT @alguien: hola', description: '' }));
  assert.ok(!isRetweet({ title: 'Mi tweet', description: '' }));
});

test('YouTube: siembra sin publicar, luego avisa solo de lo nuevo y reciente', async () => {
  const yt = require('../src/alerts/youtube');
  routes = { 'youtube.com/feeds': YT_XML };
  await yt.check(client);
  assert.strictEqual(sent.length, 0, 'la primera pasada no publica');

  const now = new Date().toISOString();
  routes = { 'youtube.com/feeds': ytWith(`<entry><id>yt:video:BBB</id><yt:videoId>BBB</yt:videoId><title>Nuevo vídeo</title><link rel="alternate" href="https://www.youtube.com/watch?v=BBB"/><author><name>mrChakurma</name></author><published>${now}</published></entry>`) };
  await yt.check(client);
  assert.strictEqual(sent.length, 1);
  assert.strictEqual(sent[0].channelId, 'c1');
  assert.match(sent[0].content, /watch\?v=BBB/);

  await yt.check(client);
  assert.strictEqual(sent.length, 1, 'no repite');
});

test('Twitch: avisa al empezar (mencionando el rol), una sola vez, y edita al terminar', async () => {
  const tw = require('../src/alerts/twitch');
  let live = true;
  routes = {
    'oauth2/token': { access_token: 'tok', expires_in: 3600 },
    'helix/streams': () => ({ data: live ? [{ id: 's1', title: 'Jugando', game_name: 'Minecraft', started_at: new Date(Date.now() - 3 * 3600e3).toISOString(), thumbnail_url: 'https://t/{width}x{height}.jpg' }] : [] }),
    'helix/users': { data: [{ display_name: 'KiddColors', profile_image_url: 'https://p.png' }] },
  };
  const before = sent.length;
  await tw.check(client);
  await tw.check(client);
  assert.strictEqual(sent.length, before + 1, 'un solo aviso por directo');
  const msg = sent.at(-1);
  assert.strictEqual(msg.channelId, 'c2');
  assert.match(msg.content, /^<@&r1>/);
  assert.deepStrictEqual(msg.allowedMentions.roles, ['r1']);
  assert.match(msg.embeds[0].image.url, /1280x720/);

  live = false;
  await tw.check(client);
  assert.ok(!msg.edited, 'una sola comprobación offline no basta');
  await tw.check(client);
  assert.match(msg.edited.content, /ha terminado/);
  assert.match(msg.edited.embeds[0].toJSON().footer.text, /duró 3 h/);
});

test('X/Twitter: publica tweets nuevos con fxtwitter y salta retweets', async () => {
  const { twitter } = require('../src/alerts/social');
  const feed = (items) => `<rss><channel>${items.map(([id, title]) => `<item><title>${title}</title><link>https://x.com/kiddcolors/status/${id}</link><guid>${id}</guid><pubDate>${new Date().toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
  routes = { 'rss.app': feed([['1', 'viejo']]) };
  await twitter.check(client);
  const before = sent.length;
  routes = { 'rss.app': feed([['3', 'RT @otro: algo'], ['2', 'nuevo'], ['1', 'viejo']]) };
  await twitter.check(client);
  assert.strictEqual(sent.length, before + 1);
  assert.match(sent.at(-1).content, /fxtwitter\.com\/kiddcolors\/status\/2/);
});

test('Juegos gratis: filtra por plataforma y formatea el aviso', async () => {
  const fg = require('../src/alerts/freeGames');
  const g = (id, platforms, extra = {}) => ({ id, title: `Juego ${id} (Epic Games) Giveaway`, worth: '$19.99', platforms, status: 'Active', description: 'Un juego', image: 'https://img', open_giveaway_url: `https://gp/${id}`, published_date: '2026-10-01 10:00:00', end_date: '2026-10-09 23:59:00', ...extra });
  routes = { gamerpower: [g(1, 'PC, Epic Games Store')] };
  await fg.check(client); // siembra
  const before = sent.length;
  routes = { gamerpower: [g(3, 'Android'), g(2, 'PC, Steam', { published_date: new Date().toISOString().slice(0, 19).replace('T', ' ') }), g(1, 'PC, Epic Games Store')] };
  await fg.check(client);
  assert.strictEqual(sent.length, before + 1, 'Android no está en la lista de plataformas');
  const embed = sent.at(-1).embeds[0];
  assert.strictEqual(embed.title, '🎁 Juego 2');
  assert.match(embed.fields.find((f) => f.name === 'Precio').value, /~~\$19\.99~~ → \*\*GRATIS\*\*/);
  assert.match(embed.fields.find((f) => f.name === 'Termina').value, /^<t:\d+:R>$/);
});

test('Ofertas: descarta poco descuento, deja la más barata por juego', async () => {
  const deals = require('../src/alerts/deals');
  routes = { cheapshark: [
    { gameID: 'a', title: 'A', salePrice: '4.99', normalPrice: '19.99', savings: '75.0', storeID: '1', dealID: 'd1' },
    { gameID: 'a', title: 'A', salePrice: '3.99', normalPrice: '19.99', savings: '80.0', storeID: '25', dealID: 'd2' },
    { gameID: 'b', title: 'B', salePrice: '9.99', normalPrice: '14.99', savings: '33.4', storeID: '1', dealID: 'd3' },
  ] };
  const list = await deals.loadDeals();
  assert.deepStrictEqual(list.map((d) => d.dealID), ['d2']);
  assert.match(deals.localNow(new Date('2026-07-01T20:30:00Z')).date, /^2026-07-01$/);
  assert.strictEqual(deals.localNow(new Date('2026-07-01T20:30:00Z')).hour, 22); // Madrid en verano = UTC+2
});

test('Minecraft: crea el mensaje de estado y luego lo edita', async () => {
  const mc = require('../src/alerts/minecraft');
  let online = false;
  routes = { mcsrvstat: () => (online ? { online: true, players: { online: 2, max: 20, list: [{ name: 'Steve' }, { name: 'Alex' }] }, version: '1.21', motd: { clean: ['Hola'] } } : { online: false }) };
  const before = sent.length;
  await mc.check(client);
  assert.strictEqual(sent.length, before + 1);
  const msg = sent.at(-1);
  assert.match(msg.embeds[0].description, /Cerrado/);
  online = true;
  await mc.check(client);
  assert.strictEqual(sent.length, before + 1, 'edita en vez de publicar otro');
  const edited = msg.edited.embeds[0].toJSON();
  assert.match(edited.description, /Abierto/);
  assert.strictEqual(edited.fields.find((f) => f.name === 'Conectados').value, '`Steve` `Alex`');
});

test('el estado se guarda en disco', async () => {
  await new Promise((r) => setTimeout(r, 700));
  const saved = JSON.parse(fs.readFileSync(path.join(process.env.DATA_DIR, 'state.json'), 'utf8'));
  assert.ok(saved['seen:youtube'].ids.includes('BBB'));
  assert.strictEqual(saved.channels.directos, 'c2');
});
