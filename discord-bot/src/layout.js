// Estructura del servidor que el bot necesita. `/setup` crea lo que falte
// (sin borrar ni mover nada de lo que ya tienes) y los canales que ya
// existan con un nombre parecido se reutilizan.
//
// readonly: los miembros pueden leer pero no escribir (solo el bot y staff).
// hilos:    (con readonly) sí pueden escribir en los hilos que abra el bot.
// privado:  solo lo ve el staff (y el bot).
// crear:    false = /setup no lo crea; si no lo encuentra, pide asignarlo con
//           /canal asignar (son canales que ya tienes).

const CATEGORIES = {
  info: '📌 INFORMACIÓN',
  comunidad: '💬 COMUNIDAD',
  redes: '📢 REDES DEL CANAL',
  juegos: '🎁 JUEGOS GRATIS',
  minecraft: '⛏️ MINECRAFT',
  estadisticas: '📊 ESTADÍSTICAS',
  tickets: '🎫 TICKETS',
  staff: '🛡️ STAFF',
};

// key → definición. `aliases` son otros nombres con los que se reconoce un
// canal que ya tengas creado (se comparan sin emojis, tildes ni guiones).
const CHANNELS = {
  bienvenida: { name: '👋・bienvenida', category: 'info', readonly: true, aliases: ['welcome', 'bienvenidas'] },
  roles: { name: '🔔・roles', category: 'info', readonly: true, aliases: ['autoroles', 'avisos'] },
  general: { name: '💬・general', category: 'comunidad', crear: false, aliases: ['chat', 'chatgeneral', 'charla'] },
  memes: { name: '😂・memes', category: 'comunidad', crear: false, aliases: ['meme'] },
  sugerencias: { name: '💡・sugerencias', category: 'comunidad', readonly: true, hilos: true, aliases: ['ideas'] },
  niveles: { name: '🆙・niveles', category: 'comunidad', readonly: true, aliases: ['level', 'levels', 'nivel', 'subidas'] },
  sorteos: { name: '🎉・sorteos', category: 'comunidad', readonly: true, aliases: ['giveaways', 'sorteo'] },
  youtube: { name: '📺・youtube', category: 'redes', readonly: true, aliases: ['videos', 'videosnuevos'] },
  directos: { name: '🔴・directos', category: 'redes', readonly: true, aliases: ['twitch', 'endirecto', 'stream'] },
  clips: { name: '🎬・mejores-momentos', category: 'redes', readonly: true, aliases: ['clips', 'momentos'] },
  tiktok: { name: '🎵・tiktok', category: 'redes', readonly: true, aliases: [] },
  instagram: { name: '📸・instagram', category: 'redes', readonly: true, aliases: ['insta'] },
  twitter: { name: '🐦・twitter', category: 'redes', readonly: true, aliases: ['x', 'tweets', 'tuits'] },
  retro365: { name: '🕹️・retro-365', category: 'redes', readonly: true, aliases: ['retro'] },
  juegosGratis: { name: '🎁・juegos-gratis', category: 'juegos', readonly: true, aliases: ['freegames', 'gratis'] },
  ofertas: { name: '💸・ofertas', category: 'juegos', readonly: true, aliases: ['deals', 'chollos'] },
  minecraftEstado: { name: '🟢・estado-servidor', category: 'minecraft', readonly: true, aliases: ['estado', 'estadominecraft', 'minecraftestado'] },
  tickets: { name: '🎫・soporte', category: 'tickets', readonly: true, aliases: ['ayuda', 'abrirticket'] },
  logs: { name: '📋・registro', category: 'staff', privado: true, aliases: ['logs', 'modlogs'] },
};

// Canales de voz "contador" (no se puede entrar; el nombre muestra la cifra).
const COUNTERS = {
  miembros: { label: '👥 Miembros' },
  suscriptores: { label: '▶️ Suscriptores' },
  seguidores: { label: '💜 Seguidores Twitch' },
};

// avisos: true → aparece en el panel de #roles para que cada miembro elija
// qué menciones quiere (las alertas nunca usan @everyone).
// nivel: N → rol de recompensa que se gana al llegar al nivel N.
const ROLES = {
  miembro: { name: 'Miembro', color: 0x95a5a6 },
  staff: { name: '🛡️ Staff', color: 0x3498db, hoist: true },
  youtube: { name: '🔔 Vídeos', color: 0xff0000, avisos: true, descripcion: 'Vídeos nuevos y estrenos de YouTube' },
  directos: { name: '🔴 Directos', color: 0x9146ff, avisos: true, descripcion: 'Cuando empiezo directo en Twitch' },
  tiktok: { name: '🎵 TikTok', color: 0x25f4ee, avisos: true, descripcion: 'TikToks nuevos' },
  instagram: { name: '📸 Instagram', color: 0xe1306c, avisos: true, descripcion: 'Posts de Instagram' },
  twitter: { name: '🐦 Twitter', color: 0x1da1f2, avisos: true, descripcion: 'Tweets' },
  retro365: { name: '🕹️ Retro 365', color: 0xff7a18, avisos: true, descripcion: 'El juego retro de cada día' },
  juegosGratis: { name: '🎁 Juegos gratis', color: 0x2ecc71, avisos: true, descripcion: 'Juegos que se ponen gratis' },
  ofertas: { name: '💸 Ofertas', color: 0xf1c40f, avisos: true, descripcion: 'Resumen diario de ofertas' },
  sorteos: { name: '🎉 Sorteos', color: 0xeb459e, avisos: true, descripcion: 'Sorteos nuevos' },
  minecraft: { name: '⛏️ Minecraft', color: 0x62a83c, avisos: true, descripcion: 'Novedades del servidor de Minecraft' },
  nivel5: { name: '🥉 Activo', color: 0xcd7f32, nivel: 5, hoist: true },
  nivel10: { name: '🥈 Habitual', color: 0xc0c0c0, nivel: 10, hoist: true },
  nivel20: { name: '🥇 Veterano', color: 0xffd700, nivel: 20, hoist: true },
  nivel35: { name: '💎 Leyenda', color: 0x00e5ff, nivel: 35, hoist: true },
  cumple: { name: '🎂 Cumpleañero', color: 0xff69b4, hoist: true },
  memeSemana: { name: '🏆 Rey del meme', color: 0xffa500 },
};

const REWARD_ROLES = Object.entries(ROLES)
  .filter(([, r]) => r.nivel)
  .sort(([, a], [, b]) => a.nivel - b.nivel)
  .map(([key, r]) => ({ key, ...r }));

module.exports = { CATEGORIES, CHANNELS, COUNTERS, ROLES, REWARD_ROLES };
