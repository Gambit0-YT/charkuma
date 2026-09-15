// ══════════ scripts/generate-retro365-audio.js ══════════
// Automatización de voz en off para los guiones de Retro 365 (Shorts),
// pedida por Iván 16 sep 2026 — "vamos a automatizar el audio de los
// guiones del reto 365". IA elegida tras comparar con él: Edge TTS
// (paquete npm `msedge-tts`), gratis y sin límite de caracteres —
// ElevenLabs se descartó porque su plan gratis (10.000 caracteres/mes)
// tardaría casi 4 meses en cubrir los 37 días ya escritos (37.678
// caracteres de narración real).
//
// Qué hace: lee js/02-data-retro365-games.js, extrae la narración real
// (líneas "🎙️ Off:") de cada día con guion ya escrito, y genera un
// .mp3 por día con Edge TTS en la carpeta de salida.
//
// Uso:
//   npm install msedge-tts --no-save   (si no está ya instalado)
//   node scripts/generate-retro365-audio.js [carpeta-salida]
//
// La carpeta de salida (por defecto `retro365-audio/`) NO se commitea
// — son archivos de audio generados, no código fuente. Ver .gitignore.
const fs = require('fs');
const path = require('path');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

const VOICE = 'es-ES-AlvaroNeural'; // voz española neutra masculina — cambiar aquí si Iván prefiere otra
const SRC_FILE = path.join(__dirname, '..', 'js', '02-data-retro365-games.js');
const OUT_DIR = path.resolve(process.argv[2] || path.join(__dirname, '..', 'retro365-audio'));

function extractDays(src) {
  const days = [];
  const re = /(\d+):\s*\{\s*name:\s*"([^"]+)"[\s\S]*?script:\s*`([\s\S]*?)`\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const [, dayNum, name, script] = m;
    const offs = [...script.matchAll(/<strong>🎙️ Off:<\/strong>\s*"([^"]+)"/g)].map(x => x[1]);
    const text = offs.join(' ').replace(/\s+/g, ' ').trim();
    if (text) days.push({ day: Number(dayNum), name, text });
  }
  return days.sort((a, b) => a.day - b.day);
}

async function main() {
  const src = fs.readFileSync(SRC_FILE, 'utf8');
  const days = extractDays(src);
  console.log(`Encontrados ${days.length} días con guion real.`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0, failed = [];
  for (const { day, name, text } of days) {
    const fileName = `dia-${String(day).padStart(3, '0')}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    const outPath = path.join(OUT_DIR, `${fileName}.mp3`);
    if (fs.existsSync(outPath)) { console.log(`⏭  Día ${day} (${name}) ya existe, se salta.`); ok++; continue; }
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioFilePath } = await tts.toFile(OUT_DIR, text);
      fs.renameSync(audioFilePath, outPath);
      console.log(`✅ Día ${day} (${name}) — ${text.length} caracteres → ${path.basename(outPath)}`);
      ok++;
    } catch (e) {
      console.error(`❌ Día ${day} (${name}) falló: ${e.message}`);
      failed.push(day);
    }
  }

  console.log(`\nTerminado: ${ok}/${days.length} generados en ${OUT_DIR}`);
  if (failed.length) console.log(`Fallaron los días: ${failed.join(', ')}`);
}

main();
