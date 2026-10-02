// Estructura del servidor que el bot necesita. `/setup` crea lo que falte
// (sin borrar ni mover nada de lo que ya tienes) y los canales que ya
// existan con un nombre parecido se reutilizan.
//
// readonly: los miembros pueden leer pero no escribir (solo el bot y staff).
// hilos:    (con readonly) sí pueden escribir en los hilos que abra el bot.
// privado:  solo lo ve el staff (y el bot).

const CATEGORIES = {
  info: '📌 INFORMACIÓN',
  comunidad: '💬 COMUNIDAD',
  redes: '📢 REDES DEL CANAL',
  juegos: '🎁 JUEGOS GRATIS',
  minecraft: '⛏️ MINECRAFT',
  staff: '🛡️ STAFF',
};

// key → definición. `aliases` son otros nombres con los que se reconoce un
// canal que ya tengas creado (se comparan sin emojis, tildes ni guiones).
const CHANNELS = {
  bienvenida: { name: '👋・bienvenida', category: 'info', readonly: true, aliases: ['welcome', 'bienvenidas'] },
  roles: { name: '🔔・roles', category: 'info', readonly: true, aliases: ['autoroles', 'avisos'] },
  sugerencias: { name: '💡・sugerencias', category: 'comunidad', readonly: true, hilos: true, aliases: ['ideas'] },
  youtube: { name: '📺・youtube', category: 'redes', readonly: true, aliases: ['videos', 'videosnuevos'] },
  directos: { name: '🔴・directos', category: 'redes', readonly: true, aliases: ['twitch', 'endirecto', 'stream'] },
  tiktok: { name: '🎵・tiktok', category: 'redes', readonly: true, aliases: [] },
  instagram: { name: '📸・instagram', category: 'redes', readonly: true, aliases: ['insta'] },
  twitter: { name: '🐦・twitter', category: 'redes', readonly: true, aliases: ['x', 'tweets', 'tuits'] },
  juegosGratis: { name: '🎁・juegos-gratis', category: 'juegos', readonly: true, aliases: ['freegames', 'gratis'] },
  ofertas: { name: '💸・ofertas', category: 'juegos', readonly: true, aliases: ['deals', 'chollos'] },
  minecraftEstado: { name: '🟢・estado-servidor', category: 'minecraft', readonly: true, aliases: ['estado', 'estadominecraft', 'minecraftestado'] },
  logs: { name: '📋・registro', category: 'staff', privado: true, aliases: ['logs', 'modlogs'] },
};

// Roles de avisos: cada miembro elige en #roles qué avisos quiere recibir,
// y las alertas solo mencionan a quien se haya apuntado (nada de @everyone).
const ROLES = {
  miembro: { name: 'Miembro', color: 0x95a5a6, avisos: false },
  youtube: { name: '🔔 Vídeos', color: 0xff0000, avisos: true, descripcion: 'Vídeos nuevos de YouTube' },
  directos: { name: '🔴 Directos', color: 0x9146ff, avisos: true, descripcion: 'Cuando empiezo directo en Twitch' },
  tiktok: { name: '🎵 TikTok', color: 0x25f4ee, avisos: true, descripcion: 'TikToks nuevos' },
  instagram: { name: '📸 Instagram', color: 0xe1306c, avisos: true, descripcion: 'Posts de Instagram' },
  twitter: { name: '🐦 Twitter', color: 0x1da1f2, avisos: true, descripcion: 'Tweets' },
  juegosGratis: { name: '🎁 Juegos gratis', color: 0x2ecc71, avisos: true, descripcion: 'Juegos que se ponen gratis' },
  ofertas: { name: '💸 Ofertas', color: 0xf1c40f, avisos: true, descripcion: 'Resumen diario de ofertas' },
  minecraft: { name: '⛏️ Minecraft', color: 0x62a83c, avisos: true, descripcion: 'Novedades del servidor de Minecraft' },
};

module.exports = { CATEGORIES, CHANNELS, ROLES };
