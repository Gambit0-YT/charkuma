// Cliente RCON mínimo (protocolo de Source/Minecraft) para mandar comandos
// al servidor de Minecraft, p. ej. "whitelist add Steve".
const net = require('net');
const config = require('../config');

const TYPE_AUTH = 3;
const TYPE_COMMAND = 2;
const TYPE_AUTH_RESPONSE = 2;

function packet(id, type, body) {
  const payload = Buffer.from(body, 'utf8');
  const buf = Buffer.alloc(14 + payload.length);
  buf.writeInt32LE(10 + payload.length, 0);
  buf.writeInt32LE(id, 4);
  buf.writeInt32LE(type, 8);
  payload.copy(buf, 12);
  return buf; // los 2 últimos bytes ya son 0 (terminadores)
}

/** Ejecuta un comando y devuelve la respuesta del servidor (texto). */
function send(command, { host = config.rcon.host, port = config.rcon.port, password = config.rcon.password, timeoutMs = 8000 } = {}) {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port });
    let buffer = Buffer.alloc(0);
    let authed = false;
    const finish = (err, value) => {
      socket.destroy();
      clearTimeout(timer);
      if (err) reject(err); else resolve(value);
    };
    const timer = setTimeout(() => finish(new Error('El servidor de Minecraft no responde (RCON)')), timeoutMs);

    socket.on('connect', () => socket.write(packet(1, TYPE_AUTH, password)));
    socket.on('error', (err) => finish(new Error(`No se pudo conectar por RCON: ${err.message}`)));
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      while (buffer.length >= 4) {
        const len = buffer.readInt32LE(0);
        if (buffer.length < len + 4) return;
        const id = buffer.readInt32LE(4);
        const type = buffer.readInt32LE(8);
        const body = buffer.toString('utf8', 12, len + 2);
        buffer = buffer.subarray(len + 4);
        if (!authed) {
          if (type !== TYPE_AUTH_RESPONSE) continue; // algunos servidores mandan antes un paquete vacío
          if (id === -1) return finish(new Error('Contraseña RCON incorrecta'));
          authed = true;
          socket.write(packet(2, TYPE_COMMAND, command));
        } else if (id === 2) {
          return finish(null, body.replace(/§./g, '').trim()); // quita los códigos de color
        }
      }
    });
  });
}

module.exports = { send, packet, enabled: () => Boolean(config.rcon.password && config.rcon.host) };
