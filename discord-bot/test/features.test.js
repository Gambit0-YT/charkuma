// Pruebas sin red de niveles, sorteos, cumpleaños, Retro 365, RCON,
// contadores, meme de la semana y estrenos de YouTube.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const net = require('net');
const path = require('path');

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'charkuma-bot-'));
process.env.GUILD_ID = 'g1';
process.env.YOUTUBE_API_KEY = 'key';

const { Collection, ChannelType } = require('discord.js');
const state = require('../src/state');

// --- Discord falso ---------------------------------------------------------
const sent = [];
function fakeChannel(id, name, type = ChannelType.GuildText) {
  const ch = {
    id, name, type, members: new Collection(),
    messages: { fetch: async (mid) => sent.find((m) => m.id === mid) },
    send: async (payload) => {
      const msg = {
        id: `9000000000000000${String(sent.length).padStart(2, '0')}`, channelId: id, channel: ch, guild,
        ...payload,
        embeds: (payload.embeds || []).map((e) => (e.toJSON ? e.toJSON() : e)),
        components: (payload.components || []).map((c) => (c.toJSON ? c.toJSON() : c)),
      };
      msg.url = `https://discord.com/channels/g1/${id}/${msg.id}`;
      msg.edit = async (p) => { msg.edited = { ...p, embeds: (p.embeds || []).map((e) => e.toJSON()), components: (p.components || []).map((c) => c.toJSON()) }; };
      msg.reply = async (p) => ch.send(p);
      sent.push(msg);
      return msg;
    },
    toString: () => `<#${id}>`,
  };
  return ch;
}
const roles = new Collection();
const members = new Collection();
function addRole(id, name, position = 1) {
  const role = { id, name, position, toString: () => `<@&${id}>` };
  Object.defineProperty(role, 'members', { get: () => members.filter((m) => m.roles.cache.has(id)) });
  roles.set(id, role);
  return role;
}
function addMember(id, name) {
  const cache = new Collection();
  const m = {
    id, displayName: name, user: { id, bot: false, username: name },
    roles: { cache, add: async (r) => { cache.set(r.id, r); }, remove: async (r) => { cache.delete(r.id); } },
    toString: () => `<@${id}>`,
  };
  members.set(id, m);
  return m;
}
const channels = new Collection([
  ['niv', fakeChannel('niv', '🆙・niveles')],
  ['sor', fakeChannel('sor', 'sorteos')],
  ['gen', fakeChannel('gen', 'general')],
  ['mem', fakeChannel('mem', 'memes')],
  ['yt', fakeChannel('yt', 'youtube')],
]);
const guild = {
  id: 'g1', channels: { cache: channels }, roles: { cache: roles },
  members: { cache: members, fetch: async (id) => (id ? members.get(id) || Promise.reject(new Error('no')) : members) },
  voiceStates: { cache: new Collection() }, afkChannelId: 'afk',
};
for (const ch of channels.values()) ch.guild = guild;
const client = { guilds: { cache: new Collection([['g1', guild]]) } };
const roleIds = { nivel5: addRole('rl5', '🥉 Activo'), nivel10: addRole('rl10', '🥈 Habitual'), cumple: addRole('rcu', '🎂 Cumpleañero'), sorteos: addRole('rso', '🎉 Sorteos'), meme: addRole('rme', '🏆 Rey del meme') };
const ana = addMember('111111111111111111', 'Ana');
const beto = addMember('222222222222222222', 'Beto');
const carla = addMember('333333333333333333', 'Carla');
for (const m of members.values()) m.guild = guild;

let routes = {};
global.fetch = async (url) => {
  const key = Object.keys(routes).find((k) => String(url).includes(k));
  if (!key) throw new Error(`fetch inesperado: ${url}`);
  const body = typeof routes[key] === 'function' ? routes[key](url) : routes[key];
  return { ok: true, status: 200, json: async () => body, text: async () => body };
};

// --- Niveles ---------------------------------------------------------------
const levels = require('../src/features/levels');

test('niveles: curva de XP', () => {
  assert.deepStrictEqual(levels.levelInfo(0), { level: 0, current: 0, needed: 100 });
  assert.deepStrictEqual(levels.levelInfo(255), { level: 2, current: 0, needed: 220 });
});

test('niveles: XP por mensaje con espera anti-spam y anuncio en #niveles', async () => {
  const msg = (member) => ({
    inGuild: () => true, author: member.user, member, system: false, webhookId: null, guildId: 'g1', channel: channels.get('gen'),
  });
  await levels.onMessage(msg(ana));
  const xp1 = levels.getUser(ana.id).xp;
  assert.ok(xp1 >= 15 && xp1 <= 25);
  await levels.onMessage(msg(ana));
  assert.strictEqual(levels.getUser(ana.id).xp, xp1, 'el segundo mensaje dentro de 60 s no da XP');
  assert.strictEqual(levels.getUser(ana.id).mensajes, 1);

  levels.lastMessage.delete(ana.id);
  levels.getUser(ana.id).xp = 99;
  await levels.onMessage(msg(ana));
  const up = sent.at(-1);
  assert.strictEqual(up.channelId, 'niv');
  assert.match(up.content, /nivel 1/);
  assert.deepStrictEqual(up.allowedMentions.users, [ana.id]);
});

test('niveles: roles de recompensa (solo el más alto)', async () => {
  levels.getUser(beto.id).xp = 0;
  await levels.addXp(beto, 1150); // 100+155+220+295+380 = nivel 5 justo
  assert.strictEqual(levels.levelOf(beto.id), 5);
  assert.ok(beto.roles.cache.has('rl5'));
  assert.match(sent.at(-1).content, /consigue el rol \*\*🥉 Activo\*\*/);
  await levels.addXp(beto, 5000); // nivel 10+
  assert.ok(beto.roles.cache.has('rl10'));
  assert.ok(!beto.roles.cache.has('rl5'), 'quita la recompensa anterior');
  await levels.addXp(beto, -100000);
  assert.strictEqual(levels.getUser(beto.id).xp, 0);
  assert.ok(!beto.roles.cache.has('rl10'), 'al bajar de nivel pierde el rol');
});

test('niveles: XP de voz solo acompañado y sin ensordecer', async () => {
  const vc = fakeChannel('vc', 'Charla', ChannelType.GuildVoice);
  vc.members.set(ana.id, ana).set(carla.id, carla);
  guild.voiceStates.cache.set(ana.id, { member: ana, channel: vc, selfDeaf: false });
  guild.voiceStates.cache.set(carla.id, { member: carla, channel: vc, selfDeaf: true });
  const before = { ana: levels.getUser(ana.id).xp, carla: levels.getUser(carla.id).xp };
  await levels.voiceTick(guild);
  assert.strictEqual(levels.getUser(ana.id).xp, before.ana + 10);
  assert.strictEqual(levels.getUser(carla.id).xp, before.carla, 'ensordecido no gana XP');
  vc.members.delete(carla.id);
  await levels.voiceTick(guild);
  assert.strictEqual(levels.getUser(ana.id).xp, before.ana + 10, 'sola en el canal no gana XP');
  guild.voiceStates.cache.clear();
});

// --- Sorteos ---------------------------------------------------------------
const giveaways = require('../src/features/giveaways');

test('sorteos: duraciones y ganadores distintos', () => {
  assert.strictEqual(giveaways.parseDuration('1d12h'), 36 * 3600e3);
  assert.strictEqual(giveaways.parseDuration('2 h'), 2 * 3600e3);
  assert.strictEqual(giveaways.parseDuration('mañana'), null);
  const w = giveaways.pickWinners(['a', 'b', 'c', 'd'], 3, ['a']);
  assert.strictEqual(new Set(w).size, 3);
  assert.ok(!w.includes('a'));
});

test('sorteos: participar, requisito de nivel, final automático y repetir', async () => {
  const msg = await giveaways.create(channels.get('sor'), { premio: 'Minecraft', duracionMs: 60e3, numGanadores: 1, creador: ana.id, nivelMinimo: 1 });
  assert.match(msg.content, /<@&rso>/);
  assert.strictEqual(msg.components[0].components[0].label, 'Participar (0)');

  const click = (member) => {
    const replies = [];
    return { replies, i: { message: msg, user: member.user, member, reply: async (r) => replies.push(r.content) } };
  };
  levels.getUser(carla.id).xp = 0;
  const c = click(carla);
  await giveaways.button(c.i);
  assert.match(c.replies[0], /Necesitas nivel \*\*1\*\*/);

  levels.getUser(beto.id).xp = 500;
  levels.getUser(ana.id).xp = 500;
  for (const m of [beto, ana]) await giveaways.button(click(m).i);
  assert.strictEqual(msg.edited.components[0].components[0].label, 'Participar (2)');
  const salir = click(ana);
  await giveaways.button(salir.i);
  assert.match(salir.replies[0], /Ya no participas/);
  await giveaways.button(click(ana).i);

  await giveaways.tick(client);
  assert.ok(!giveaways.all()[msg.id].terminado, 'aún no es la hora');
  giveaways.all()[msg.id].terminaEn = Date.now() - 1;
  await giveaways.tick(client);
  const g = giveaways.all()[msg.id];
  assert.ok(g.terminado);
  assert.strictEqual(g.ganadores.length, 1);
  assert.match(sent.at(-1).content, /Felicidades/);
  assert.ok(msg.edited.components[0].components[0].disabled);

  const first = g.ganadores[0];
  const nuevos = await giveaways.reroll(client, msg.id, 1);
  assert.strictEqual(nuevos.length, 1);
  assert.notStrictEqual(nuevos[0], first);
  assert.deepStrictEqual(await giveaways.reroll(client, msg.id, 1), [], 'no quedan participantes');
});

// --- Cumpleaños ------------------------------------------------------------
const birthdays = require('../src/features/birthdays');

test('cumpleaños: validación, 29 de febrero y días que faltan', () => {
  assert.ok(birthdays.isValid(29, 2));
  assert.ok(!birthdays.isValid(31, 4));
  assert.ok(birthdays.isToday({ dia: 29, mes: 2 }, { year: 2027, month: 2, day: 28 }));
  assert.ok(!birthdays.isToday({ dia: 29, mes: 2 }, { year: 2028, month: 2, day: 28 }));
  assert.strictEqual(birthdays.daysUntil({ dia: 3, mes: 10 }, { year: 2026, month: 10, day: 2 }), 1);
  assert.strictEqual(birthdays.daysUntil({ dia: 1, mes: 10 }, { year: 2026, month: 10, day: 2 }), 364);
});

test('cumpleaños: felicita en #general, da el rol y lo quita al día siguiente', async () => {
  birthdays.all()[carla.id] = { dia: 2, mes: 10 };
  await birthdays.celebrate(guild, { year: 2026, month: 10, day: 2 });
  assert.strictEqual(sent.at(-1).channelId, 'gen');
  assert.match(sent.at(-1).content, /cumpleaños de <@333333333333333333>/);
  assert.ok(carla.roles.cache.has('rcu'));
  await birthdays.celebrate(guild, { year: 2026, month: 10, day: 3 });
  assert.ok(!carla.roles.cache.has('rcu'));
});

// --- Retro 365 -------------------------------------------------------------
const retro = require('../src/features/retro365');

test('Retro 365: lee los datos de la web sin ejecutarlos', () => {
  const js = `    const plannedGames = {
      1: {
        name: "Half-Life",
        summary: "Un \\"clásico\\" total.",
        difficulty: "dificil",
        emoji: "🧪",
        steamUrl: "https://store.steampowered.com/app/70/",
        script: \`
          <p>name: "trampa dentro del guion"</p>
        \`
      },
      2: {
        name: "Doom",
        summary: "Rip and tear.",
        difficulty: "media",
        emoji: "👹",
        steamUrl: "",
        script: \`\`
      },
    };`;
  const g = retro.parseGames(js);
  assert.deepStrictEqual(Object.keys(g), ['1', '2']);
  assert.strictEqual(g[1].summary, 'Un "clásico" total.');
  assert.strictEqual(g[1].name, 'Half-Life');
  const e = retro.embed(1, g[1]).toJSON();
  assert.strictEqual(e.title, '🧪 Retro 365 · Día 1: Half-Life');
  assert.strictEqual(e.fields[0].value, '🔴 Difícil');
  assert.strictEqual(retro.todayNumber({ date: '2027-01-01' }), 1);
  assert.strictEqual(retro.todayNumber({ date: '2026-12-31' }), 0);
  assert.strictEqual(retro.todayNumber({ date: '2027-12-31' }), 365);
});

// --- RCON ------------------------------------------------------------------
const rcon = require('../src/features/rcon');

function fakeMinecraft(password) {
  const received = [];
  const server = net.createServer((sock) => {
    let buf = Buffer.alloc(0);
    sock.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      while (buf.length >= 4 && buf.length >= buf.readInt32LE(0) + 4) {
        const len = buf.readInt32LE(0);
        const id = buf.readInt32LE(4);
        const type = buf.readInt32LE(8);
        const body = buf.toString('utf8', 12, len + 2);
        buf = buf.subarray(len + 4);
        if (type === 3) {
          sock.write(rcon.packet(id, 0, '')); // paquete vacío previo, como algunos servidores
          sock.write(rcon.packet(body === password ? id : -1, 2, ''));
        } else {
          received.push(body);
          sock.write(rcon.packet(id, 0, `§aAdded ${body.split(' ').pop()} to the whitelist`));
        }
      }
    });
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r({ server, port: server.address().port, received })));
}

test('RCON: autentica, manda el comando y limpia los colores', async () => {
  const { server, port, received } = await fakeMinecraft('secreto');
  try {
    const res = await rcon.send('whitelist add Steve', { host: '127.0.0.1', port, password: 'secreto' });
    assert.strictEqual(res, 'Added Steve to the whitelist');
    assert.deepStrictEqual(received, ['whitelist add Steve']);
    await assert.rejects(rcon.send('list', { host: '127.0.0.1', port, password: 'mala' }), /Contraseña RCON incorrecta/);
  } finally {
    server.close();
  }
});

// --- Contadores y meme de la semana ------------------------------------------
test('contadores: formato de cifras', () => {
  const { formatCount } = require('../src/features/counters');
  assert.strictEqual(formatCount(1234), '1234');
  assert.strictEqual(formatCount(15300), '15,3 mil');
  assert.strictEqual(formatCount(2100000), '2,1 M');
});

test('meme de la semana: elige el de más reacciones, lo reenvía y da el rol', async () => {
  const memeOfWeek = require('../src/features/memeOfWeek');
  const now = Date.now();
  const forwarded = [];
  const meme = (id, author, count, ageDays) => ({
    id, author: author.user, createdTimestamp: now - ageDays * 86400e3, url: `https://m/${id}`,
    reactions: { cache: new Collection([['😂', { count }]]) },
    forward: async (ch) => forwarded.push([id, ch.id]),
  });
  author(ana); author(beto);
  function author(m) { m.user.toString = () => `<@${m.id}>`; }
  const list = [meme('3', ana, 4, 1), meme('2', beto, 9, 2), meme('1', ana, 50, 9)];
  channels.get('mem').messages.fetch = async ({ before }) => new Collection(before ? [] : list.map((m) => [m.id, m]));
  beto.roles.cache.delete('rme');
  ana.roles.cache.set('rme', roles.get('rme')); // ganadora de la semana pasada
  const best = await memeOfWeek.run(guild);
  assert.strictEqual(best.m.id, '2', 'el de 50 tiene más de 7 días');
  assert.deepStrictEqual(forwarded, [['2', 'mem']]);
  assert.ok(beto.roles.cache.has('rme'));
  assert.ok(!ana.roles.cache.has('rme'));
  assert.match(sent.at(-1).embeds[0].description, /\*\*9\*\* reacciones/);
});

// --- Estrenos de YouTube -------------------------------------------------------
test('YouTube: estreno programado → aviso con cuenta atrás y otro al empezar', async () => {
  const yt = require('../src/alerts/youtube');
  const entry = (id, title) => `<entry><id>yt:video:${id}</id><yt:videoId>${id}</yt:videoId><title>${title}</title><link rel="alternate" href="https://www.youtube.com/watch?v=${id}"/><author><name>mrChakurma</name></author><published>${new Date().toISOString()}</published></entry>`;
  const feed = (...entries) => `<feed xmlns="http://www.w3.org/2005/Atom">${entries.join('')}</feed>`;
  const scheduled = new Date(Date.now() + 3600e3).toISOString();
  let status = 'upcoming';
  routes = {
    'youtube.com/feeds': feed(entry('OLD', 'Viejo')),
    'youtube/v3/videos': () => ({ items: [{ snippet: { liveBroadcastContent: status }, liveStreamingDetails: { scheduledStartTime: scheduled } }] }),
  };
  await yt.check(client); // siembra
  routes['youtube.com/feeds'] = feed(entry('PRE', 'Gran estreno'), entry('OLD', 'Viejo'));
  await yt.check(client);
  assert.match(sent.at(-1).content, /programado un estreno: \*\*Gran estreno\*\*/);
  assert.match(sent.at(-1).content, /<t:\d+:R>/);
  const count = sent.length;

  await yt.check(client);
  assert.strictEqual(sent.length, count, 'no avisa antes de la hora');
  state.section('estrenos').PRE.scheduled = new Date(Date.now() - 60e3).toISOString();
  status = 'live';
  await yt.check(client);
  assert.match(sent.at(-1).content, /Empieza ya! \*\*Gran estreno\*\*/);
  assert.ok(!state.section('estrenos').PRE);
});
