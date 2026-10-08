# Bot de Discord de CHARKUMA

Un único bot que hace todo esto:

## Alertas automáticas

| Alerta | Fuente | ¿Necesita claves? |
|---|---|---|
| 📺 Vídeos nuevos de YouTube | Feed RSS oficial del canal | No |
| 📅 Estrenos y directos programados de YouTube (aviso con cuenta atrás + aviso al empezar) | YouTube Data API | Sí, gratis (opcional) |
| 🔴 Directos en Twitch (y edita el aviso cuando acaba, con la duración) | API de Twitch | Sí, gratis |
| 🎬 Clips nuevos de Twitch en `#mejores-momentos` | API de Twitch | Las mismas |
| 🎵 TikTok · 📸 Instagram · 🐦 X/Twitter | Feed RSS (rss.app o similar) | Una URL por red |
| 🕹️ Retro 365: el juego de cada día (respeta que no se desvele antes de su fecha) | Tu propia web | No |
| 🎁 Juegos que se ponen gratis (Epic, Steam, GOG, consolas…) | GamerPower | No |
| 💸 Resumen diario de ofertas (Steam, GOG, Epic, Humble, Fanatical) | CheapShark | No |
| ⛏️ Estado del servidor de Minecraft (mensaje fijo que se actualiza solo) | mcsrvstat.us | No |

Las alertas **no usan @everyone**: cada miembro elige en `#roles` (con botones) de qué quiere recibir menciones.

> Si arranca con contenido antiguo, el bot **no** lo publica: en la primera pasada solo "memoriza" lo que ya existe y a partir de ahí avisa de lo nuevo.

## Comunidad

- **Niveles por actividad**: XP por escribir (15-25 por mensaje, como mucho uno por minuto para que el spam no cuente) y por estar en voz con más gente (10/min; no cuenta si estás solo, ensordecido o en AFK). Subidas anunciadas en `#niveles` y roles de recompensa: 🥉 Activo (nivel 5), 🥈 Habitual (10), 🥇 Veterano (20) y 💎 Leyenda (35). Comandos `/nivel` y `/ranking`.
- **Sorteos**: `/sorteo crear premio:… duracion:2d` publica un sorteo con botón **Participar**. Puede exigir nivel mínimo o un rol, termina solo a su hora (aunque el bot se reinicie) y `/sorteo repetir` saca otro ganador si alguien no reclama el premio.
- **Cumpleaños**: `/cumple poner`. Ese día se felicita en `#general` y la persona lleva el rol 🎂 Cumpleañero. `/cumple proximos` muestra los siguientes.
- **Meme de la semana**: cada domingo a las 20:00, el meme con más reacciones de los últimos 7 días se reenvía destacado y su autor lleva el rol 🏆 Rey del meme durante una semana.
- **Contadores** en `📊 ESTADÍSTICAS`: miembros, suscriptores de YouTube (con la clave de YouTube) y seguidores de Twitch.
- **Whitelist de Minecraft**: `/whitelist unirme nombre:Steve` añade a cada uno al servidor por RCON (un nombre por persona; se puede exigir un nivel mínimo).
- **Tickets de soporte**: botón "Abrir ticket" → canal privado entre la persona y el staff.
- **Más**: bienvenidas con rol automático, `/sugerencia` con votación e hilo de debate, `/redes`, `/juegos-gratis`, `/minecraft`, `/retro365` y `/ayuda`.

## Moderación

`/limpiar`, `/aislar`, `/expulsar` y `/banear`. Todo (entradas, salidas, sanciones, tickets, sorteos, cambios de XP, whitelist) queda en el canal privado `#registro`.

---

## 1. Crear el bot en Discord

1. Entra en <https://discord.com/developers/applications> → **New Application** → ponle nombre (p. ej. *CHARKUMA Bot*).
2. En **General Information** copia el **Application ID** → será `DISCORD_CLIENT_ID`.
3. En **Bot**:
   - **Reset Token** → copia el token → será `DISCORD_TOKEN` (no se lo enseñes a nadie).
   - Activa **Server Members Intent** (lo necesitan las bienvenidas, los cumpleaños y los contadores).
4. Invita el bot a tu servidor con este enlace (cambia `TU_APPLICATION_ID`):
   ```
   https://discord.com/oauth2/authorize?client_id=TU_APPLICATION_ID&scope=bot+applications.commands&permissions=1477738359894
   ```
   Le da solo los permisos que usa: ver/gestionar canales y roles, enviar mensajes, enlaces, archivos, reacciones e hilos, gestionar mensajes, conectar a voz (para bloquear los contadores) y aislar/expulsar/banear.
5. En Discord: **Ajustes de usuario → Avanzado → Modo desarrollador**. Luego clic derecho en tu servidor → **Copiar ID del servidor** → será `GUILD_ID`.

## 2. Twitch (avisos de directo)

1. <https://dev.twitch.tv/console/apps> → **Register Your Application**.
2. OAuth Redirect URL: `http://localhost` · Categoría: *Chat Bot* · Tipo de cliente: *Confidential*.
3. Copia el **Client ID** y genera un **Client Secret** → `TWITCH_CLIENT_ID` y `TWITCH_CLIENT_SECRET`.

El usuario vigilado (`kiddcolors`) está en `config.json`.

## 3. YouTube Data API (opcional)

Sin clave, los vídeos nuevos se avisan igual (por RSS). Con clave, además:
- los **estrenos y directos programados** se anuncian con cuenta atrás, y otra vez cuando empiezan;
- aparece el **contador de suscriptores**.

Cómo sacarla (gratis): <https://console.cloud.google.com> → crea un proyecto → **APIs y servicios → Biblioteca** → habilita *YouTube Data API v3* → **Credenciales → Crear credenciales → Clave de API** → `YOUTUBE_API_KEY`. El bot usa una parte mínima de la cuota diaria gratuita.

## 4. TikTok, Instagram y X/Twitter

Estas tres redes no ofrecen una API gratuita para leer tus propias publicaciones (la de X cuesta ~200 $/mes). La forma práctica es convertir cada perfil en un **feed RSS**:

1. Entra en <https://rss.app> (tiene un plan gratuito) y crea un feed pegando la URL de tu perfil:
   - `https://www.tiktok.com/@kiddcolors`
   - `https://www.instagram.com/kiddcolors`
   - `https://x.com/TU_USUARIO`
2. Copia la URL del feed **en formato RSS/XML** de cada uno → `TIKTOK_FEED_URL`, `INSTAGRAM_FEED_URL`, `TWITTER_FEED_URL`.

Cualquier otro servicio que dé un feed RSS sirve igual (RSSHub propio, FetchRSS…). Si una URL se deja vacía, esa alerta queda desactivada sin afectar al resto.

- Los **tweets** se publican con un enlace `fxtwitter.com`, que en Discord muestra el tweet completo (texto, fotos y vídeo). Los retweets se ignoran (`"incluirRetweets": false` en `config.json`).
- Los feeds de terceros para Instagram/TikTok a veces fallan durante un rato cuando esas redes cambian algo. El bot lo aguanta: reintenta solo y no repite avisos.

## 5. Minecraft

Pon la dirección del servidor en `MINECRAFT_SERVER` (p. ej. `play.miservidor.com` o `1.2.3.4:25565`). Si es Bedrock, cambia `"edicion": "bedrock"` en `config.json`. Con `"avisarAlAbrir": true` también menciona al rol ⛏️ Minecraft cuando el servidor pasa de cerrado a abierto.

**Whitelist automática (`/whitelist`)** — necesita RCON (solo servidores Java):
1. En `server.properties` del servidor: `enable-rcon=true`, `rcon.password=UNA_CONTRASEÑA_LARGA`, `rcon.port=25575`, y `white-list=true`.
2. Si tu hosting de Minecraft tiene cortafuegos, abre el puerto 25575 **solo** para la IP donde corre el bot.
3. En el `.env`: `MINECRAFT_RCON_PASSWORD` (y `MINECRAFT_RCON_HOST`/`MINECRAFT_RCON_PORT` si no son la misma dirección y el puerto 25575).

Con `"whitelist": { "nivelMinimo": 5 }` en `config.json` solo podrán entrar quienes tengan nivel 5 en Discord (por defecto, cualquiera).

## 6. Ponerlo en marcha

Necesitas Node.js 18.17 o superior.

```bash
cd discord-bot
cp .env.example .env      # y rellénalo
npm install
npm run registrar-comandos   # una vez (y cada vez que cambien los comandos)
npm start
```

Después, en tu servidor de Discord:

1. Asigna los canales que ya tienes: tu chat general y tu canal de memes (`/canal asignar tipo:Chat general canal:#tu-general`, igual con *Memes*), y cualquier otro que ya exista, como el de juegos gratis. El bot también reconoce nombres parecidos (`general`, `memes`, `juegos-gratis`, `youtube`, `twitch`, `logs`…).
2. `/setup` → te enseña qué crearía (roles, canales y contadores que falten). **No borra ni mueve nada.**
3. `/setup aplicar:true` → lo crea y publica el panel de avisos en `#roles` y el de tickets en `#soporte`.
4. **Ajustes del servidor → Roles**: arrastra el rol del bot **por encima** de todos los roles que crea (si no, no puede darlos). Dale el rol **🛡️ Staff** a tus moderadores.
5. `/probar-alerta` con cada tipo para comprobar que todo llega a su canal (sin mencionar a nadie).
6. `/canal ver` muestra qué canal usa el bot para cada cosa.

## 7. Tenerlo encendido 24/7

El bot tiene que estar funcionando siempre para avisar. Opciones:

| Opción | Coste | Notas |
|---|---|---|
| **Railway** / **Render** (servicio "worker") | ~5 $/mes | Lo más cómodo: conectas este repo, carpeta raíz `discord-bot`, pones las variables del `.env` en su panel y añades un volumen montado en `/data`. |
| **Oracle Cloud Free Tier** (VM) | Gratis | Más técnico: una VM Linux con `npm start` bajo `pm2` o el `Dockerfile`. |
| Un PC o Raspberry Pi en casa | Luz | Solo funciona mientras esté encendido. |

Con Docker: `docker build -t charkuma-bot . && docker run -d --env-file .env -v charkuma-data:/data --restart unless-stopped charkuma-bot`.

## 8. Música

No está incluida a propósito: reproducir YouTube desde un bot propio va contra sus condiciones y se rompe a menudo. Para tu canal de música lo recomendable es añadir un bot de música ya hecho y mantenido (p. ej. **Jockie Music**) junto a este.

## 9. Personalizar

Todo lo ajustable sin tocar código está en `config.json`:

| Sección | Qué cambia |
|---|---|
| `redes` | Lo que muestra `/redes` |
| `youtube`, `twitch`, `clips`, `social` | Cada cuánto se comprueba cada red; `incluirRetweets` |
| `juegosGratis`, `ofertas` | Plataformas, precio máximo, % de descuento, valoración mínima, hora del resumen |
| `niveles` | XP por mensaje y por minuto de voz, espera anti-spam, si se menciona al subir, canales sin XP (`canalesSinXp`), si se quedan todos los roles de recompensa o solo el más alto |
| `cumples` | Hora de la felicitación |
| `memeSemana` | Día (0 = domingo) y hora |
| `retro365` | Fecha de inicio, hora del post diario y de dónde se leen los datos |
| `whitelist` | Nivel mínimo para `/whitelist` |
| `tickets` | Si se menciona al staff al abrir un ticket |
| `zonaHoraria` | Para todas las horas anteriores |

Los nombres de canales y roles (y los niveles de las recompensas) están en `src/layout.js`.

## Desarrollo

```bash
npm test   # pruebas sin red (APIs y Discord simulados)
```

Estructura: `src/alerts/` (un vigilante por fuente), `src/features/` (niveles, sorteos, cumpleaños, tickets, contadores, meme de la semana, Retro 365, RCON), `src/commands/` (comandos /), `src/events.js` (mensajes, botones, bienvenidas), `src/scheduler.js` (tareas periódicas y diarias), `src/layout.js` (canales y roles), `src/state.js` (estado en `data/state.json`: XP, sorteos, cumpleaños…).

> ⚠️ El estado guarda la XP, los sorteos y los cumpleaños. En Railway/Render monta un **volumen persistente** en `/data` (o donde apunte `DATA_DIR`), o se perderán al redesplegar.
