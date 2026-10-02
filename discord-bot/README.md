# Bot de Discord de CHARKUMA

Un único bot que hace dos cosas:

1. **Alertas automáticas** en su canal correspondiente:
   | Alerta | Fuente | ¿Necesita claves? |
   |---|---|---|
   | 📺 Vídeos nuevos de YouTube | Feed RSS oficial del canal | No |
   | 🔴 Directos en Twitch (y edita el aviso cuando acaba, con la duración) | API de Twitch | Sí, gratis |
   | 🎵 TikTok · 📸 Instagram · 🐦 X/Twitter | Feed RSS (rss.app o similar) | Una URL por red |
   | 🎁 Juegos que se ponen gratis (Epic, Steam, GOG, consolas…) | GamerPower | No |
   | 💸 Resumen diario de ofertas (Steam, GOG, Epic, Humble, Fanatical) | CheapShark | No |
   | ⛏️ Estado del servidor de Minecraft (mensaje fijo que se actualiza solo) | mcsrvstat.us | No |

   Las alertas **no usan @everyone**: cada miembro elige en `#roles` (con botones) de qué quiere recibir menciones.

2. **Gestión del servidor**: bienvenidas con rol automático, panel de roles de avisos, moderación (`/limpiar`, `/aislar`, `/expulsar`, `/banear`) con registro para el staff, `/sugerencia` con votación e hilo de debate, `/redes`, `/juegos-gratis`, `/minecraft` y `/ayuda`.

> Si arranca con contenido antiguo, el bot **no** lo publica: en la primera pasada solo "memoriza" lo que ya existe y a partir de ahí avisa de lo nuevo.

---

## 1. Crear el bot en Discord

1. Entra en <https://discord.com/developers/applications> → **New Application** → ponle nombre (p. ej. *CHARKUMA Bot*).
2. En **General Information** copia el **Application ID** → será `DISCORD_CLIENT_ID`.
3. En **Bot**:
   - **Reset Token** → copia el token → será `DISCORD_TOKEN` (no se lo enseñes a nadie).
   - Activa **Server Members Intent** (lo necesitan las bienvenidas).
4. Invita el bot a tu servidor con este enlace (cambia `TU_APPLICATION_ID`):
   ```
   https://discord.com/oauth2/authorize?client_id=TU_APPLICATION_ID&scope=bot+applications.commands&permissions=1409017834582
   ```
   Le da solo los permisos que usa: ver/gestionar canales y roles, enviar mensajes, enlaces, archivos, reacciones e hilos, gestionar mensajes, y aislar/expulsar/banear.
5. En Discord: **Ajustes de usuario → Avanzado → Modo desarrollador**. Luego clic derecho en tu servidor → **Copiar ID del servidor** → será `GUILD_ID`.

## 2. Twitch (avisos de directo)

1. <https://dev.twitch.tv/console/apps> → **Register Your Application**.
2. OAuth Redirect URL: `http://localhost` · Categoría: *Chat Bot* · Tipo de cliente: *Confidential*.
3. Copia el **Client ID** y genera un **Client Secret** → `TWITCH_CLIENT_ID` y `TWITCH_CLIENT_SECRET`.

El usuario vigilado (`kiddcolors`) está en `config.json`.

## 3. TikTok, Instagram y X/Twitter

Estas tres redes no ofrecen una API gratuita para leer tus propias publicaciones (la de X cuesta ~200 $/mes). La forma práctica es convertir cada perfil en un **feed RSS**:

1. Entra en <https://rss.app> (tiene un plan gratuito) y crea un feed pegando la URL de tu perfil:
   - `https://www.tiktok.com/@kiddcolors`
   - `https://www.instagram.com/kiddcolors`
   - `https://x.com/TU_USUARIO`
2. Copia la URL del feed **en formato RSS/XML** de cada uno → `TIKTOK_FEED_URL`, `INSTAGRAM_FEED_URL`, `TWITTER_FEED_URL`.

Cualquier otro servicio que dé un feed RSS sirve igual (RSSHub propio, FetchRSS…). Si una URL se deja vacía, esa alerta queda desactivada sin afectar al resto.

- Los **tweets** se publican con un enlace `fxtwitter.com`, que en Discord muestra el tweet completo (texto, fotos y vídeo). Los retweets se ignoran (`"incluirRetweets": false` en `config.json`).
- Los feeds de terceros para Instagram/TikTok a veces fallan durante un rato cuando esas redes cambian algo. El bot lo aguanta: reintenta solo y no repite avisos.

## 4. Minecraft

Pon la dirección del servidor en `MINECRAFT_SERVER` (p. ej. `play.miservidor.com` o `1.2.3.4:25565`). Si es Bedrock, cambia `"edicion": "bedrock"` en `config.json`. Con `"avisarAlAbrir": true` también menciona al rol ⛏️ Minecraft cuando el servidor pasa de cerrado a abierto.

## 5. Ponerlo en marcha

Necesitas Node.js 18.17 o superior.

```bash
cd discord-bot
cp .env.example .env      # y rellénalo
npm install
npm run registrar-comandos   # una vez (y cada vez que cambien los comandos)
npm start
```

Después, en tu servidor de Discord:

1. Si ya tienes canales para algo (p. ej. tu canal de juegos gratis), asígnalos: `/canal asignar tipo:Juegos gratis canal:#tu-canal`. El bot también reconoce nombres parecidos (`juegos-gratis`, `youtube`, `twitch`, `logs`…).
2. `/setup` → te enseña qué crearía (roles de avisos, canales que falten). **No borra ni mueve nada.**
3. `/setup aplicar:true` → lo crea y publica el panel de avisos en `#roles`.
4. **Ajustes del servidor → Roles**: arrastra el rol del bot **por encima** de los roles de avisos (si no, no puede darlos).
5. `/probar-alerta` con cada tipo para comprobar que todo llega a su canal (sin mencionar a nadie).
6. `/canal ver` muestra qué canal usa el bot para cada cosa.

## 6. Tenerlo encendido 24/7

El bot tiene que estar funcionando siempre para avisar. Opciones:

| Opción | Coste | Notas |
|---|---|---|
| **Railway** / **Render** (servicio "worker") | ~5 $/mes | Lo más cómodo: conectas este repo, carpeta raíz `discord-bot`, pones las variables del `.env` en su panel y añades un volumen montado en `/data`. |
| **Oracle Cloud Free Tier** (VM) | Gratis | Más técnico: una VM Linux con `npm start` bajo `pm2` o el `Dockerfile`. |
| Un PC o Raspberry Pi en casa | Luz | Solo funciona mientras esté encendido. |

Con Docker: `docker build -t charkuma-bot . && docker run -d --env-file .env -v charkuma-data:/data --restart unless-stopped charkuma-bot`.

## 7. Música

No está incluida a propósito: reproducir YouTube desde un bot propio va contra sus condiciones y se rompe a menudo. Para tu canal de música lo recomendable es añadir un bot de música ya hecho y mantenido (p. ej. **Jockie Music**) junto a este.

## 8. Personalizar

Todo lo ajustable sin tocar código está en `config.json`: redes que muestra `/redes`, intervalos de comprobación, plataformas de juegos gratis, filtros de ofertas (precio máximo, % de descuento, valoración mínima en Steam, hora del resumen diario) y zona horaria. Los nombres de canales y roles que crea `/setup` están en `src/layout.js`.

## Desarrollo

```bash
npm test   # pruebas sin red (APIs y Discord simulados)
```

Estructura: `src/alerts/` (un vigilante por fuente), `src/commands/` (comandos /), `src/events.js` (bienvenidas, botones), `src/layout.js` (canales y roles), `src/state.js` (estado en `data/state.json`).
