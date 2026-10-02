// Junta todos los comandos de esta carpeta (cada archivo exporta uno o una lista).
const fs = require('fs');

const commands = new Map();
for (const file of fs.readdirSync(__dirname).filter((f) => f.endsWith('.js') && f !== 'index.js').sort()) {
  const mod = require(`./${file}`);
  for (const cmd of Array.isArray(mod) ? mod : [mod]) commands.set(cmd.data.name, cmd);
}

module.exports = commands;
