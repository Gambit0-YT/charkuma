// Backlog #73 — reconstruye app.js a partir de los módulos fuente en
// js/*.js, en este orden exacto (el orden importa: algunos archivos usan
// `const`/`let` de archivos anteriores, y esas declaraciones no se
// "adelantan" como sí hacen las funciones — cambiar el orden puede romper
// el sitio con un ReferenceError real).
//
// A PARTIR DE AHORA, EDITAR AQUÍ: los archivos de verdad que se tocan son
// los de js/*.js, nunca app.js directamente — app.js pasa a ser un
// archivo GENERADO (como ya lo era app.min.js respecto a app.js). Flujo
// real de despliegue, sin cambios respecto a como era antes de este
// split, solo con un paso nuevo al principio:
//   1) node build.js              (js/*.js  ->  app.js)
//   2) npx terser app.js --compress --mangle -o app.min.js
//   3) probar, commit, push
//
// Ver [[charkuma-how-it-works]] para el detalle completo de por qué se
// dividió así y qué contiene cada archivo.
const fs = require('fs');

const FILES = [
  'js/01-app-init-nav.js',
  'js/02-data-retro365-games.js',
  'js/03-retro365-home-widgets.js',
  'js/04-data-geekcontent-review.js',
  'js/05-drive-recording-mode.js',
  'js/06-data-idea-banks-content.js',
  'js/07-master-control-activity.js',
  'js/08-stats-search-sync-main.js',
];

const parts = FILES.map(f => fs.readFileSync(f, 'utf8'));
const combined = parts.join('\n');

fs.writeFileSync('app.js', combined, 'utf8');
console.log(`app.js reconstruido a partir de ${FILES.length} archivos (${combined.split('\n').length} líneas).`);
