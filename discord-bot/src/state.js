// Estado persistente del bot en un JSON: qué vídeos/posts ya se avisaron,
// qué canal está asignado a cada tipo de alerta, IDs de mensajes que se
// editan (estado de Minecraft, directo en curso)...
//
// Importante: si el hosting borra el disco al reiniciar, el bot NO repite
// avisos antiguos, porque cada vigilante "siembra" lo que ya existe en su
// primera pasada sin publicar nada (ver alerts/*.js).
const fs = require('fs');
const path = require('path');
const config = require('./config');
const log = require('./log');

const FILE = path.join(config.dataDir, 'state.json');

let data = {};
try {
  data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
} catch (err) {
  if (err.code !== 'ENOENT') log.warn('No se pudo leer el estado, empiezo de cero:', err.message);
}

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      fs.mkdirSync(config.dataDir, { recursive: true });
      const tmp = `${FILE}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
      fs.renameSync(tmp, FILE);
    } catch (err) {
      log.error('No se pudo guardar el estado:', err.message);
    }
  }, 500);
}

/** Devuelve (creándola si no existe) la sección `name` del estado. */
function section(name, defaults = {}) {
  if (!data[name]) data[name] = { ...defaults };
  return data[name];
}

/**
 * Lista de IDs ya vistos, con tope para que el archivo no crezca sin fin.
 * `seeded` indica si ya se hizo la primera pasada (siembra).
 */
function seenList(name, max = 200) {
  const s = section(`seen:${name}`, { seeded: false, ids: [] });
  return {
    get seeded() { return s.seeded; },
    has: (id) => s.ids.includes(String(id)),
    add(id) {
      s.ids.push(String(id));
      if (s.ids.length > max) s.ids.splice(0, s.ids.length - max);
      save();
    },
    markSeeded() { s.seeded = true; save(); },
  };
}

module.exports = { section, seenList, save };
