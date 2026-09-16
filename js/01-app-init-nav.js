    // ══════════ 01-app-init-nav.js ══════════
    // Configuración inicial (YouTube/RAWG), estado de /loop, navegación principal (menú, hamburguesa, barra inferior móvil, panel lateral de gestión, guion fijado en la cabecera), campana de notificaciones y widgets de la barra lateral.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    // ──────────────────────────────────────────────────────────
    // CONFIGURACIÓN DEL WIDGET LATERAL (vídeos de YouTube + noticias).
    // Declarado aquí arriba a propósito: si se entra por un enlace directo
    // del tipo #view=..., showView() se ejecuta muy pronto y necesita que
    // esto ya exista (si no, error "before initialization").
    //
    // Cómo activar los vídeos de YouTube:
    // 1) Ve a https://console.cloud.google.com/ → crea un proyecto (o usa uno).
    // 2) "APIs y servicios" → "Biblioteca" → busca "YouTube Data API v3" → Activar.
    // 3) "Credenciales" → "Crear credenciales" → "Clave de API". Cópiala.
    //    (Recomendado: restringe esa clave a "YouTube Data API v3".)
    // 4) Tu Channel ID (empieza por "UC...") lo encuentras entrando en tu
    //    cuenta de YouTube y visitando: https://www.youtube.com/account_advanced
    // 5) Pega ambos valores aquí abajo, entre las comillas.
    // ──────────────────────────────────────────────────────────
    const YT_API_KEY = "AIzaSyDwJpcqg6PymrQU-lki7DSTjKARK5LsKaw";
    const YT_CHANNEL_ID = "UCMxeCf-_CpgmmIiyHCwMeYw"; // mrChakurma

    // ──────────────────────────────────────────────────────────
    // INDICADOR DE TRABAJO AUTÓNOMO ("/loop"): a propósito NO vive en
    // localStorage — la web es estática y no tiene conexión en directo
    // con la sesión de Claude Code, así que un indicador basado en
    // localStorage solo sería exacto en el navegador donde se escribió,
    // no en cualquier dispositivo. En vez de eso, esta bandera se
    // enciende/apaga aquí, en el propio código, a mano, cada vez que
    // empieza/termina una sesión de /loop — se ve igual entres por
    // donde entres, con el único coste de tardar lo que tarde el
    // siguiente despliegue (normalmente 30-60s) en reflejarse.
    // ──────────────────────────────────────────────────────────
    const AUTONOMOUS_LOOP_ACTIVE = false;

    // ──────────────────────────────────────────────────────────
    // CARÁTULAS REALES DE JUEGOS (Retro 365) vía RAWG — API gratuita de
    // videojuegos. Pide una clave gratis en https://rawg.io/apidocs
    // (cuenta gratuita, clave al momento) y pégala aquí. Sin clave, se
    // queda con el emoji de siempre — no rompe nada.
    // Aviso honesto: son carátulas normales (con fondo), no iconos
    // recortados sin fondo — eso no lo da ninguna API, hay que subirlo
    // a mano juego por juego si algún día se quiere ese acabado.
    // ──────────────────────────────────────────────────────────
    const RAWG_API_KEY = "a35db550f2a44ebc9bea975187eed683";
    const GAME_COVER_CACHE_KEY = 'charkuma_game_covers';
    function loadGameCoverCache(){
      try { return JSON.parse(localStorage.getItem(GAME_COVER_CACHE_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveGameCoverCache(cache){
      try { localStorage.setItem(GAME_COVER_CACHE_KEY, JSON.stringify(cache)); }
      catch (e) { /* seguimos sin guardar */ }
    }
    async function fetchGameCoverUrl(name){
      const cache = loadGameCoverCache();
      if (name in cache) return cache[name]; // ya buscado antes, incluso si fue "no hay" (null)
      if (!RAWG_API_KEY || RAWG_API_KEY.indexOf('PON_AQUI') === 0) return null;
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(name)}&page_size=1`).then(r => r.json());
        const url = (res.results && res.results[0] && res.results[0].background_image) || null;
        cache[name] = url;
        saveGameCoverCache(cache);
        return url;
      } catch (e) { return null; }
    }
    // Busca los .day-thumb[data-game] recién pintados en un contenedor y
    // les pone la carátula real en cuanto llega, sin bloquear el pintado
    // inicial (que sigue mostrando el emoji mientras tanto). Cacheado en
    // localStorage, así que solo tarda la primera vez que se ve cada juego.
    function hydrateGameThumbs(container){
      if (!container) return;
      container.querySelectorAll('.day-thumb[data-game]').forEach(async el => {
        const name = el.dataset.game;
        const url = await fetchGameCoverUrl(name);
        if (url) el.innerHTML = `<img src="${url}" alt="Carátula de ${escapeAttr(name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
      });
    }

    // Fuente de noticias geek/cómics para el lateral de Rincón del Friki.
    // Zona Negativa: sitio español dedicado a cómics y cultura geek, con RSS público.
    // Puedes cambiarla por cualquier otro feed RSS que prefieras.
    const GEEK_NEWS_FEED = "https://www.zonanegativa.com/feed/";

    // ──────────────────────────────────────────────────────────
    // RADAR DE ESTRENOS (sección "Cultura pop que se viene" del inicio)
    // ──────────────────────────────────────────────────────────
    // TMDB (The Movie Database) tiene una API gratuita para estrenos
    // reales. Pide una clave gratis en https://www.themoviedb.org/settings/api
    // (cuenta gratuita, clave al momento) y pégala aquí para activar la
    // lista "en vivo". Sin clave, esa lista se queda con un aviso.
    const TMDB_API_KEY = "ffd59a3595d13f85fe24905c124ef6c0";
    // Géneros TMDB que de verdad encajan con "cultura friki": Ciencia
    // ficción (878), Fantasía (14), Animación (16 — cubre bien el anime).
    // Probado en vivo el 2026-09-06: Acción (28) y Aventura (12) solos
    // colaban demasiada película genérica sin nada que ver con el canal
    // (dramas de acción, thrillers militares...), así que se quitaron.
    const TMDB_GEEK_GENRES_DEFAULT = [878, 14, 16];
    const TMDB_GENRE_PREFS_KEY = 'charkuma_tmdb_genre_prefs';
    function loadTMDBGenrePrefs(){
      try {
        const saved = JSON.parse(localStorage.getItem(TMDB_GENRE_PREFS_KEY));
        return Array.isArray(saved) && saved.length ? saved : TMDB_GEEK_GENRES_DEFAULT;
      } catch (e) { return TMDB_GEEK_GENRES_DEFAULT; }
    }
    function saveTMDBGenrePrefs(){
      const checked = [...document.querySelectorAll('#tmdbGenreChecks input:checked')].map(i => Number(i.value));
      try {
        // Nunca guardamos "ninguno marcado" — eso dejaría el radar vacío
        // sin más aviso que una lista en blanco. Si desmarcan todo,
        // volvemos a los de por defecto.
        localStorage.setItem(TMDB_GENRE_PREFS_KEY, JSON.stringify(checked.length ? checked : TMDB_GEEK_GENRES_DEFAULT));
      } catch (e) { /* seguimos sin guardar */ }
      if (checked.length === 0) syncTMDBGenreCheckboxes();
      loadLivePremieres();
    }
    function syncTMDBGenreCheckboxes(){
      const prefs = loadTMDBGenrePrefs();
      document.querySelectorAll('#tmdbGenreChecks input').forEach(input => {
        input.checked = prefs.includes(Number(input.value));
      });
    }
    syncTMDBGenreCheckboxes();

    // Lista a mano para dos casos que TMDB no cubre bien: "bombazos"
    // fuera de la temática de superhéroes que sí merece la pena comentar
    // (aunque sea excepcionalmente), y películas que ya has visto y
    // quieres criticar/recomendar en vídeo. status: "estreno" | "visto".
    // Añade aquí las tuyas — imdbUrl es opcional pero recomendado.
    const customPremieres = [
      {
        title: "Barbie", status: "estreno", emoji: "💗",
        note: "Fuera de la temática habitual, pero fue un bombazo total — del tipo que merece comentario aunque no sea de superhéroes.",
        imdbUrl: "https://www.imdb.com/title/tt1517268/"
      },
      {
        title: "Oppenheimer", status: "estreno", emoji: "💥",
        note: "Mismo caso que Barbie: estreno enorme fuera de tema, pero con el impacto cultural suficiente como para hacer vídeo.",
        imdbUrl: "https://www.imdb.com/title/tt15398776/"
      },
      {
        title: "Torrente", status: "visto", emoji: "🚔",
        note: "Ya vista — no me ha gustado, pero justo por eso da para un vídeo de crítica con gancho.",
        imdbUrl: "https://www.imdb.com/title/tt0163187/"
      }
      // { title:"...", status:"estreno|visto", emoji:"🎬",
      //   note:"...", imdbUrl:"https://www.imdb.com/title/..." },
    ];

    // Enlace a tu carpeta de Google Drive para clips/recursos de edición
    // (botón "📁 Recursos" en Redes Sociales). Esta web no tiene
    // almacenamiento propio — solo enlaza a donde ya subas tú los
    // archivos. Pega el enlace de una carpeta compartida ("cualquiera
    // con el enlace puede ver") y listo.
    const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1TCTkOhxaUCFELOApuRAlOTb2cjksEEcD?usp=drive_link";

    // Estado del widget lateral
    let currentSidebarMode = 'videos'; // 'videos' | 'news'
    let cachedVideosHTML = null;
    let cachedNewsHTML = null;
    let latestVideosRaw = []; // últimos vídeos de YouTube ya cargados, para checkRetro365AutoPublish
    let cachedPremiereMovies = []; // últimos estrenos de TMDB ya cargados, para avisar en la campana

    // Marca cuándo ya se estableció el estado base del historial del
    // navegador (ver showView más abajo), para que el botón "atrás"
    // —incluido el botón lateral del ratón— funcione correctamente.
    let historyInitialized = false;

    // ──────────────────────────────────────────────────────────
    // TEMA OSCURO/CLARO — el <script> del <head> ya aplicó el guardado
    // (si lo hay) antes de pintar; esto solo gestiona el botón y guarda
    // el cambio para la próxima visita.
    // ──────────────────────────────────────────────────────────
    function currentTheme(){
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'light' || attr === 'dark') return attr;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    function updateThemeButtonIcon(){
      const btn = document.getElementById('navThemeBtn');
      if (btn) btn.textContent = currentTheme() === 'light' ? '☀️' : '🌙';
    }
    function toggleTheme(){
      const next = currentTheme() === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('charkuma_theme', next); } catch(e) { /* seguimos sin guardar */ }
      updateThemeButtonIcon();
      if (typeof pushUIPrefsState === 'function') pushUIPrefsState();
    }
    updateThemeButtonIcon();

    // ──────────────────────────────────────────────────────────
    // Modo alto contraste (backlog #59): aparte del tema claro/oscuro,
    // un modo que refuerza bordes, texto y foco para quien lo necesite
    // más legible. Se guarda como preferencia propia, compatible con
    // cualquiera de los dos temas.
    // ──────────────────────────────────────────────────────────
    const HIGH_CONTRAST_KEY = 'charkuma_high_contrast';
    function setHighContrast(on){
      document.documentElement.classList.toggle('high-contrast', on);
      try { localStorage.setItem(HIGH_CONTRAST_KEY, on ? '1' : '0'); } catch (e) {}
      if (typeof pushUIPrefsState === 'function') pushUIPrefsState();
    }
    (function initHighContrast(){
      let on = false;
      try { on = localStorage.getItem(HIGH_CONTRAST_KEY) === '1'; } catch (e) {}
      document.documentElement.classList.toggle('high-contrast', on);
      const toggle = document.getElementById('highContrastToggle');
      if (toggle) toggle.checked = on;
    })();

    // ──────────────────────────────────────────────────────────
    // Backlog #63 — color de acento personalizable: --orange es la
    // única variable de acento que usa toda la web (botones, chips,
    // gradientes, foco...), así que cambiarla en :root la propaga sola
    // a todo sin tocar cada sitio uno a uno. --orange2 (la variante más
    // clara para gradientes) se deriva automáticamente aclarando el
    // mismo color, para que siga viéndose coherente sea cual sea el
    // tono elegido.
    // ──────────────────────────────────────────────────────────
    const ACCENT_COLOR_KEY = 'charkuma_accent_color';
    const DEFAULT_ACCENT_COLOR = '#ff7a18';
    function lightenHex(hex, amount){
      const n = parseInt(hex.slice(1), 16);
      const mix = (channel) => Math.round(channel + (255 - channel) * amount);
      const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
      return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }
    function applyAccentColor(hex){
      document.documentElement.style.setProperty('--orange', hex);
      document.documentElement.style.setProperty('--orange2', lightenHex(hex, 0.25));
    }
    function setAccentColor(hex){
      if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
      applyAccentColor(hex);
      try { localStorage.setItem(ACCENT_COLOR_KEY, hex); } catch (e) {}
      if (typeof pushUIPrefsState === 'function') pushUIPrefsState();
    }
    function resetAccentColor(){
      setAccentColor(DEFAULT_ACCENT_COLOR);
      const input = document.getElementById('accentColorInput');
      if (input) input.value = DEFAULT_ACCENT_COLOR;
    }
    (function initAccentColor(){
      let saved = DEFAULT_ACCENT_COLOR;
      try { saved = localStorage.getItem(ACCENT_COLOR_KEY) || DEFAULT_ACCENT_COLOR; } catch (e) {}
      applyAccentColor(saved);
      const input = document.getElementById('accentColorInput');
      if (input) input.value = saved;
    })();

    // ──────────────────────────────────────────────────────────
    // Panel de ajustes de la cabecera (⚙️): tema, modo presentación,
    // exportar/importar datos guardados en este navegador.
    // ──────────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────────
    // Botón 📌 de la cabecera: oculta/muestra las dos columnas
    // laterales a la vez (por defecto fijas/visibles, como hasta
    // ahora). Preferencia guardada — "alternable" y persistente, tal
    // como se pidió.
    // ──────────────────────────────────────────────────────────
    // El mismo interruptor 📌 controla dos cosas a la vez: oculta/muestra
    // las columnas laterales Y fija/suelta la cabecera (nav-pinned). Desde
    // 2026-09-07, a petición del usuario, el estado POR DEFECTO es
    // "normal" = columnas visibles + cabecera SIEMPRE fija (visible todo
    // el rato, como antes de tocar nada). Activarlo pasa al "modo
    // compacto" = columnas ocultas + cabecera oculta sola, que aparece al
    // acercar el ratón arriba (ver initAutoHideNav más abajo) — para
    // quien alguna vez quiera ese aspecto más minimalista. Vivía como
    // icono aparte en la barra de arriba; mudado a un checkbox dentro de
    // Ajustes el 11 sep (backlog "web sobrecargada").
    const SIDEBARS_HIDDEN_KEY = 'charkuma_sidebars_hidden';
    function updateSidebarsToggleIcon(){
      const checkbox = document.getElementById('sidebarsHiddenToggle');
      if (!checkbox) return;
      checkbox.checked = document.body.classList.contains('sidebars-hidden');
    }
    function toggleSidebarsVisibility(){
      const hidden = document.body.classList.toggle('sidebars-hidden');
      document.body.classList.toggle('nav-pinned', !hidden);
      try { localStorage.setItem(SIDEBARS_HIDDEN_KEY, hidden ? '1' : '0'); } catch (e) {}
      updateSidebarsToggleIcon();
      if (!hidden) { const nav = document.querySelector('.nav'); if (nav) nav.classList.add('nav-visible'); }
      if (typeof pushUIPrefsState === 'function') pushUIPrefsState();
    }
    (function initSidebarsVisibility(){
      let hidden = false;
      try { hidden = localStorage.getItem(SIDEBARS_HIDDEN_KEY) === '1'; } catch (e) {}
      document.body.classList.toggle('sidebars-hidden', hidden);
      document.body.classList.toggle('nav-pinned', !hidden);
      updateSidebarsToggleIcon();
    })();

    // ──────────────────────────────────────────────────────────
    // Cuenta atrás al reinicio del canal (mejora #5 del backlog): fecha
    // confirmada por el usuario 2026-09-07 — 9 de noviembre es el día de
    // preparación interna, el estreno real es el 10. Contamos hasta el
    // estreno, que es el hito que importa de cara a quien visita la web.
    // ──────────────────────────────────────────────────────────
    (function initChannelResetCountdown(){
      const el = document.getElementById('channelResetCountdown');
      if (!el) return;
      const target = new Date('2026-11-10T00:00:00');
      const now = new Date();
      const daysLeft = Math.ceil((target - now) / (24 * 60 * 60 * 1000));
      if (daysLeft > 0) {
        el.hidden = false;
        el.textContent = `🚀 ${daysLeft} día${daysLeft === 1 ? '' : 's'} para el reinicio del canal — estreno el 10 de noviembre`;
      } else if (daysLeft === 0) {
        el.hidden = false;
        el.classList.add('is-today');
        el.textContent = `🎉 ¡Hoy es el estreno del reinicio del canal!`;
      } // pasada la fecha, se queda oculto — no tiene sentido seguir contando hacia atrás
    })();

    // ──────────────────────────────────────────────────────────
    // Cabecera oculta por defecto, visible al acercar el ratón arriba del
    // todo (o mientras tenga el foco por teclado, o mientras un panel suyo
    // -ajustes/notificaciones- esté abierto). Si está "fijada" (nav-pinned,
    // ver arriba) no se toca nada: se queda siempre visible. Solo aplica en
    // pantallas de escritorio — en móvil la cabecera sigue fija como antes
    // (el hover no existe en táctil).
    // ──────────────────────────────────────────────────────────
    (function initAutoHideNav(){
      const nav = document.querySelector('.nav');
      if (!nav) return;
      if (!window.matchMedia('(min-width:761px)').matches) return;

      const REVEAL_ZONE = 64;
      const HIDE_MARGIN = 140;
      const HIDE_DELAY = 600;
      let hideTimer = null;

      function isPinned(){ return document.body.classList.contains('nav-pinned'); }
      function anyNavPanelOpen(){
        const settings = document.getElementById('settingsPanel');
        const notif = document.getElementById('notifPanel');
        return (settings && !settings.hidden) || (notif && !notif.hidden);
      }
      function showNav(){
        nav.classList.add('nav-visible');
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      }
      function scheduleHide(){
        if (isPinned() || anyNavPanelOpen()) return;
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => nav.classList.remove('nav-visible'), HIDE_DELAY);
      }

      document.addEventListener('mousemove', (e) => {
        if (isPinned()) return;
        if (e.clientY <= REVEAL_ZONE) showNav();
        else if (e.clientY > HIDE_MARGIN) scheduleHide();
      });
      nav.addEventListener('focusin', showNav);
      nav.addEventListener('focusout', () => {
        if (!nav.contains(document.activeElement)) scheduleHide();
      });

      // Primer vistazo al cargar la página, luego se oculta sola como siempre.
      showNav();
      scheduleHide();
    })();

    function toggleSettingsPanel(){
      const panel = document.getElementById('settingsPanel');
      if (!panel) return;
      panel.hidden = !panel.hidden;
      if (!panel.hidden && typeof renderAchievements === 'function') renderAchievements();
      if (!panel.hidden && typeof renderAiCreditLog === 'function') renderAiCreditLog();
      if (!panel.hidden && typeof renderRecentViewsList === 'function') renderRecentViewsList();
    }

    // Backlog #307 — el panel de Ajustes se cerraba solo con la X. Ahora
    // también se cierra solo: al tocar fuera de él (clic en cualquier sitio
    // que no sea el propio panel ni el botón ⚙️ que lo abre) y al cambiar
    // de vista (ver showView más abajo).
    document.addEventListener('click', (e) => {
      const panel = document.getElementById('settingsPanel');
      if (!panel || panel.hidden) return;
      const toggleBtn = document.getElementById('navSettingsBtn');
      if (panel.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) return;
      panel.hidden = true;
    });

    // Backlog #169 — créditos IA gastados: gasto REAL, registrado a mano
    // por Claude cada vez que gasta créditos de verdad (mismo criterio
    // que las constantes VIDIQ_* — foto de un hecho real, no un
    // contador en vivo). Empieza el 9 sept 2026.
    const AI_CREDIT_LOG = [
      // Backlog #255 — auditoría 12 sep: faltaba este primer gasto real
      // (el propio progreso del backlog lo menciona: "3 imágenes
      // generadas con Gamma = 210 créditos, 400→190" el mismo día, antes
      // del segundo gasto de 140 que sí estaba registrado). Añadido para
      // que el registro cuadre con lo que de verdad se gastó.
      { date: '2026-09-08', service: 'Gamma', amount: 210, reason: 'Ilustración de escena real (bosque nevado de Canadá) para rf-marvels-wolverine-game, tras 2 intentos previos rechazados/inservibles (copyright de personaje, luego un dibujo genérico irreconocible) — saldo pasó de 400 a 190 créditos.' },
      { date: '2026-09-08', service: 'Gamma', amount: 140, reason: 'Ilustraciones de escena para los 2 guiones que se quedaron sin ninguna foto real disponible (rf-opinion-superheroes-sucios, rf-curiosidades-spiderman) — saldo pasó de 190 a 50 créditos.' }
    ];
    function renderAiCreditLog(){
      const el = document.getElementById('aiCreditLogList');
      if (!el) return;
      if (!AI_CREDIT_LOG.length) { el.innerHTML = '<p class="yt-empty">Sin gasto registrado todavía.</p>'; return; }
      const total = AI_CREDIT_LOG.reduce((sum, e) => sum + e.amount, 0);
      el.innerHTML = `<p class="yt-empty" style="margin:0 0 8px">${total} créditos gastados en total desde que se registra.</p>` +
        AI_CREDIT_LOG.slice().reverse().map(e => `
          <div class="note" style="margin:0 0 8px">
            <strong>${escapeAttr(e.date)} · ${escapeAttr(e.service)} · ${e.amount} créditos</strong>
            <p style="margin:4px 0 0">${escapeAttr(e.reason)}</p>
          </div>`).join('');
    }

    // Backlog #89 — menú hamburguesa en móvil: por debajo de 900px los
    // enlaces de la cabecera se ocultaban del todo sin ningún sustituto.
    function toggleMobileMenu(force){
      const links = document.getElementById('navLinks');
      const btn = document.getElementById('navHamburgerBtn');
      if (!links || !btn) return;
      const open = typeof force === 'boolean' ? force : !links.classList.contains('mobile-open');
      links.classList.toggle('mobile-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? '✕' : '☰';
    }
    function closeMobileMenu(){ toggleMobileMenu(false); }
    // Cerrar al pulsar fuera — un clic en cualquier enlace ya lo cierra
    // él mismo (closeMobileMenu en su onclick); Escape se gestiona en el
    // atajo de teclado global de más abajo, junto al resto de paneles.
    document.addEventListener('click', (e) => {
      const links = document.getElementById('navLinks');
      const btn = document.getElementById('navHamburgerBtn');
      // Backlog #278 — el botón "Menú" de la barra inferior también abre
      // este mismo desplegable; sin esta excepción, el propio clic que lo
      // ABRE llegaría hasta aquí (misma fase de burbujeo) y lo cerraría
      // de inmediato, porque ese botón no está dentro de `links` ni de
      // `btn` (los dos únicos que ya se excluían).
      const bottomNavBtn = document.getElementById('bottomNavMenuBtn');
      if (!links || !links.classList.contains('mobile-open')) return;
      if (links.contains(e.target) || (btn && btn.contains(e.target)) || (bottomNavBtn && bottomNavBtn.contains(e.target))) return;
      closeMobileMenu();
    });

    // ──────────────────────────────────────────────────────────
    // NOTIFICACIONES PUSH REALES (backlog #94), vía Firebase Cloud
    // Messaging — pedido explícito de Iván 2026-09-07. Distinto de la
    // campana de abajo, que solo avisa dentro de la propia pestaña: esto
    // manda un aviso real del sistema operativo aunque la web esté
    // cerrada, usando el mismo proyecto Firestore ya conectado.
    //
    // FCM_VAPID_KEY sigue siendo un placeholder a propósito: la clave
    // pública real solo se genera desde la consola de Firebase
    // (Configuración del proyecto → Cloud Messaging → Configuración web
    // → "Generar par de claves"), un botón que solo el dueño del
    // proyecto puede pulsar — Claude no tiene forma de generarla por su
    // cuenta. Hasta que Iván la pegue aquí, el botón de Ajustes avisa
    // honestamente de que falta ese paso, nunca finge que ya funciona.
    //
    // Enviar un push real no necesita ningún backend/Cloud Function
    // propio: cada token que este botón guarda en Firestore
    // (`pushSubscribers/<token>`) queda disponible para mandarle un
    // aviso a mano desde Firebase Console → Cloud Messaging → "Nueva
    // notificación" — sin código de servidor ni facturación de por medio.
    // Clave VAPID real generada 9 sep vía `npx web-push generate-vapid-keys`
    // (par de claves ECDSA estándar del protocolo Web Push — no hace falta
    // que la genere el propio Firebase, cualquier par válido sirve). Clave
    // privada correspondiente guardada solo en la memoria de Claude, nunca
    // en el código público.
    const FCM_VAPID_KEY = 'BLmG67rMtvon_HOqVj7-TOALHJVDLddR_SumwhS-1TrpdY2Y0k9FebmTA2tm4WYwdx3aVw18nVPeRAVex6q6UOE';
    // Backlog #304 — Iván pidió "ambas": conceder el permiso real de
    // notificaciones NUNCA puede hacerse sin que la persona lo confirme
    // en el diálogo propio del navegador (ninguna web puede saltárselo,
    // ni Claude tiene forma de programarlo). Lo más parecido a "activado
    // desde el primer segundo" que sí es honesto: destacarlo bien fuerte
    // la primera vez que entra al Panel, un aviso único que se oculta
    // solo en cuanto lo activa o lo descarta (nunca vuelve a insistir).
    const PUSH_INVITE_DISMISSED_KEY = 'charkuma_push_invite_dismissed';
    function dismissPushInvite(){
      try { localStorage.setItem(PUSH_INVITE_DISMISSED_KEY, '1'); } catch (e) {}
      const el = document.getElementById('hubPushInvite');
      if (el) el.hidden = true;
    }
    function renderPushInviteBanner(){
      const el = document.getElementById('hubPushInvite');
      if (!el) return;
      let dismissed = false, alreadyEnabled = false;
      try { dismissed = localStorage.getItem(PUSH_INVITE_DISMISSED_KEY) === '1'; } catch (e) {}
      try { alreadyEnabled = localStorage.getItem('charkuma_push_enabled') === '1'; } catch (e) {}
      const canAsk = ('Notification' in window) && Notification.permission === 'default';
      el.hidden = dismissed || alreadyEnabled || !canAsk;
    }
    async function enablePushNotifications(){
      const statusEl = document.getElementById('pushNotifStatus');
      const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };
      if (FCM_VAPID_KEY === 'PENDIENTE_CLAVE_VAPID') {
        setStatus('⚠️ Falta la clave VAPID de Firebase — pídesela a Claude en cuanto la generes en la consola.');
        return;
      }
      if (!('Notification' in window)) {
        setStatus('❌ Este navegador no soporta notificaciones.');
        return;
      }
      if (!window.firebaseMessaging || !window.firebaseMessagingFns) {
        setStatus('❌ Firebase Messaging no está disponible en este navegador/contexto.');
        return;
      }
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          setStatus('🚫 Permiso denegado — actívalo desde los ajustes del navegador si cambias de opinión.');
          return;
        }
        setStatus('⏳ Activando...');
        // Backlog #305 — Iván reportó "no llegan": getToken() se llamaba
        // sin decirle a Firebase qué Service Worker usar, así que podía
        // acabar registrando/usando uno propio distinto del sw.js real
        // (el que sí tiene el onBackgroundMessage de más abajo). Esperamos
        // aquí a que el registro de sw.js esté listo y se lo pasamos
        // explícito — si por lo que sea no está disponible, seguimos sin
        // él como antes (mismo comportamiento previo, nunca peor).
        let swRegistration;
        try { swRegistration = await navigator.serviceWorker.ready; } catch (_) {}
        const tokenOptions = { vapidKey: FCM_VAPID_KEY };
        if (swRegistration) tokenOptions.serviceWorkerRegistration = swRegistration;
        const token = await window.firebaseMessagingFns.getToken(window.firebaseMessaging, tokenOptions);
        if (!token) {
          setStatus('❌ No se pudo obtener el token — reintenta en un momento.');
          return;
        }
        if (window.firestoreDB && window.firestoreFns) {
          await window.firestoreFns.setDoc(
            window.firestoreFns.doc(window.firestoreDB, 'pushSubscribers', token),
            { token, createdAt: new Date().toISOString(), userAgent: navigator.userAgent }
          );
        }
        localStorage.setItem('charkuma_push_enabled', '1');
        try { localStorage.setItem(PUSH_INVITE_DISMISSED_KEY, '1'); } catch (e2) {} // #304: ya activadas, no insistir más
        setStatus('✅ Notificaciones activadas en este dispositivo.');
      } catch (e) {
        setStatus('❌ Error activando notificaciones: ' + e.message);
      }
    }
    // Aviso en primer plano: con la pestaña abierta, onBackgroundMessage
    // (en sw.js) nunca se dispara — este es el que sí se activa entonces.
    if (window.firebaseMessaging && window.firebaseMessagingFns) {
      window.firebaseMessagingFns.onMessage(window.firebaseMessaging, (payload) => {
        if (Notification.permission === 'granted') {
          const title = (payload.notification && payload.notification.title) || 'CHARKUMA';
          const body = (payload.notification && payload.notification.body) || '';
          new Notification(title, { body });
        }
      });
    }
    (function initPushNotifStatus(){
      const statusEl = document.getElementById('pushNotifStatus');
      if (!statusEl) return;
      if (FCM_VAPID_KEY === 'PENDIENTE_CLAVE_VAPID') {
        statusEl.textContent = '⚠️ Pendiente de configurar (falta la clave VAPID real).';
      } else if (localStorage.getItem('charkuma_push_enabled') === '1' && Notification.permission === 'granted') {
        statusEl.textContent = '✅ Activadas en este dispositivo.';
      }
    })();

    // ──────────────────────────────────────────────────────────
    // CAMPANA DE NOTIFICACIONES: mini resumen de recordatorios,
    // calculado a partir de los datos reales que ya lleva la web
    // (estados de contenido, planificación de Retro 365...). De momento
    // solo es un desplegable rápido — más adelante será una bandeja de
    // entrada propia con historial (ver nota en memoria del proyecto).
    // ──────────────────────────────────────────────────────────
    // Backlog #108 — silenciar tipos concretos: cada notificación lleva
    // un `type` estable; el usuario elige en Ajustes qué tipos no
    // quiere ver, y se filtran aquí mismo, antes de construir nada.
    const NOTIF_MUTED_KEY = 'charkuma_notif_muted_types';
    const NOTIF_TYPE_LABELS = {
      progress: '🎬 Contenido en producción',
      review: '⏳ Pendientes de revisión',
      premiere: '🎬 Estrenos próximos',
      retro365: '🎮 Retro 365',
      stale: '⚠️ Elementos estancados',
      weekly: '📊 Resumen semanal',
      trend: '📈 Tendencia VidIQ'
    };
    function loadMutedNotifTypes(){ try { return JSON.parse(localStorage.getItem(NOTIF_MUTED_KEY)) || []; } catch (e) { return []; } }
    function saveMutedNotifTypes(arr){ try { localStorage.setItem(NOTIF_MUTED_KEY, JSON.stringify(arr)); } catch (e) {} }
    function toggleNotifTypeMuted(type, muted){
      const muted_ = new Set(loadMutedNotifTypes());
      if (muted) muted_.add(type); else muted_.delete(type);
      saveMutedNotifTypes([...muted_]);
      renderNotifications();
      if (document.getElementById('view-notif-inbox')?.classList.contains('active')) renderNotifInbox();
    }
    (function initNotifMuteChecks(){
      const container = document.getElementById('notifMuteChecks');
      if (!container) return;
      const muted = new Set(loadMutedNotifTypes());
      container.innerHTML = Object.entries(NOTIF_TYPE_LABELS).map(([type, label]) => `
        <label><input type="checkbox" value="${type}" ${muted.has(type) ? '' : 'checked'} onchange="toggleNotifTypeMuted('${type}', !this.checked)"> ${label}</label>
      `).join('');
    })();

    // Backlog #105 — reutiliza exactamente la misma detección que el
    // aviso de Control Maestro (#26): un mismo hallazgo, dos sitios.
    function findStaleContent(){
      const history = loadContentHistory();
      const now = Date.now();
      return buildSiteIndex().filter(item => {
        if (!CONTENT_STAGE_ORDER.includes(item.status)) return false;
        const entries = history[item.view];
        if (!entries || !entries.length) return false;
        const lastTs = Math.max(...entries.map(e => e.ts));
        return (now - lastTs) > STALE_STAGE_DAYS * 86400000;
      });
    }

    // Backlog #107 — resumen semanal automático: se genera solo una vez
    // por semana natural (guarda qué semana tocó por última vez, no
    // regenera en cada apertura de la campana) con datos reales del
    // historial de #19 — nunca inventa actividad que no haya pasado.
    const WEEKLY_SUMMARY_LAST_KEY = 'charkuma_weekly_summary_last_week';
    function isoWeekKey(d){
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const day = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - day);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
      return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
    }
    function buildWeeklySummaryNotif(){
      const thisWeek = isoWeekKey(new Date());
      const weekAgo = Date.now() - 7 * 86400000;
      const history = loadContentHistory();
      let approved = 0, published = 0, advanced = 0;
      Object.values(history).forEach(entries => {
        entries.forEach(e => {
          if (e.ts < weekAgo) return;
          if (e.text === '✅ Aprobado') approved++;
          else if (e.text === '📤 Marcado como publicado') published++;
          else if (e.text.startsWith('▶️ Fase') || e.text.includes('Fase:')) advanced++;
        });
      });
      if (!approved && !published && !advanced) return null; // semana real sin actividad: no se inventa un resumen vacío
      let lastWeek = null;
      try { lastWeek = localStorage.getItem(WEEKLY_SUMMARY_LAST_KEY); } catch (e) {}
      if (lastWeek === thisWeek) return null; // ya se generó esta semana
      try { localStorage.setItem(WEEKLY_SUMMARY_LAST_KEY, thisWeek); } catch (e) {}
      return {
        id: `weekly-summary-${thisWeek}`,
        type: 'weekly',
        title: `📊 Resumen de la semana`,
        detail: `${approved} aprobado(s), ${advanced} avance(s) de fase, ${published} publicado(s).`,
        view: 'master-control'
      };
    }

    function buildNotifications(){
      const notifs = [];
      const index = buildSiteIndex();
      const muted = new Set(loadMutedNotifTypes());
      const push = (n) => { if (!muted.has(n.type)) notifs.push(n); };

      // Backlog #283 — si el aviso viene de UN solo elemento, el clic
      // lleva directo a ESE guion/proyecto (no a la lista genérica). Con
      // varios, "exacto" no tiene un único destino posible, así que se
      // mantiene la lista filtrable de siempre.
      const inProgress = index.filter(i => CONTENT_STAGE_ORDER.includes(i.status));
      if (inProgress.length) {
        push({
          id: 'in-progress', type: 'progress',
          title: `🎬 ${inProgress.length} contenido${inProgress.length === 1 ? '' : 's'} en proceso ahora mismo`,
          detail: inProgress.slice(0, 3).map(i => i.title).join(' · '),
          view: inProgress.length === 1 ? inProgress[0].view : 'master-control'
        });
      }

      const waiting = index.filter(i => i.status === 'aprobado');
      if (waiting.length) {
        push({
          id: 'waiting-guion', type: 'progress',
          title: `✅ ${waiting.length} aprobado${waiting.length === 1 ? '' : 's'} esperando a que empieces el guion`,
          detail: waiting.slice(0, 3).map(i => i.title).join(' · '),
          view: waiting.length === 1 ? waiting[0].view : 'master-control'
        });
      }

      const pending = index.filter(i => i.status === 'pendiente');
      if (pending.length) {
        push({
          id: 'pending-review', type: 'review',
          title: `⏳ ${pending.length} contenidos pendientes de revisión`,
          detail: 'Repásalos en el calendario o el control secreto maestro.',
          view: pending.length === 1 ? pending[0].view : 'calendario'
        });
      }

      // Backlog #105
      const stale = findStaleContent();
      if (stale.length) {
        push({
          id: 'stale-content', type: 'stale',
          title: `⚠️ ${stale.length} elemento${stale.length === 1 ? '' : 's'} sin avanzar de fase hace más de ${STALE_STAGE_DAYS} días`,
          detail: stale.slice(0, 3).map(i => i.title).join(' · '),
          view: stale.length === 1 ? stale[0].view : 'master-control'
        });
      }

      // cachedPremiereMovies lo rellena loadLivePremieres() cuando responde
      // TMDB — puede estar vacío todavía en el primer pintado de la
      // campana si esa petición no ha terminado (se corrige solo en
      // cuanto se vuelve a abrir el panel).
      const soonPremieres = (cachedPremiereMovies || []).filter(m => {
        if (!m.date) return false;
        const days = Math.ceil((new Date(m.date) - new Date()) / 86400000);
        return days >= 0 && days <= 7;
      });
      if (soonPremieres.length) {
        push({
          id: 'premiere-soon', type: 'premiere',
          title: `🎬 ${soonPremieres.length} estreno${soonPremieres.length === 1 ? '' : 's'} en menos de una semana`,
          detail: soonPremieres.map(m => m.title).join(' · '),
          view: 'home'
        });
      }

      const msPerDay = 86400000;
      const daysToRetro = Math.ceil((RETRO365_START_DATE - new Date()) / msPerDay);
      if (daysToRetro > 0) {
        push({
          id: 'retro-countdown', type: 'retro365',
          title: `📅 Quedan ${daysToRetro} día${daysToRetro === 1 ? '' : 's'} para retomar Retro 365`,
          detail: 'Arranca el 10 de noviembre de 2026.',
          view: 'calendario'
        });
      } else {
        const plannedLeft = Object.keys(plannedGames).length;
        if (plannedLeft) {
          push({
            id: 'retro-in-progress', type: 'retro365',
            title: `🎮 Retro 365 ya en marcha`,
            detail: `${plannedLeft} día(s) decidido(s) todavía sin grabar.`,
            view: 'calendario'
          });
        }
      }

      // Backlog #107
      const weekly = buildWeeklySummaryNotif();
      if (weekly) push(weekly);

      // Backlog #256 — aviso si el diario de construcción lleva
      // demasiadas sesiones sin ponerse al día.
      if (typeof DEVLOG_LAST_UPDATE !== 'undefined') {
        const devlogDays = Math.floor((new Date() - DEVLOG_LAST_UPDATE) / 86400000);
        if (devlogDays >= DEVLOG_STALE_DAYS) {
          push({
            id: 'devlog-stale', type: 'stale',
            title: `📓 El diario de construcción lleva ${devlogDays} días sin actualizarse`,
            detail: 'Puede que haya sesiones de trabajo real todavía sin recoger ahí.',
            view: 'home'
          });
        }
      }

      return notifs;
    }

    // Backlog #104 — bandeja con historial real y leído/no leído
    // persistente: hasta ahora la campana solo calculaba "lo que es
    // verdad ahora mismo", sin memoria — al arreglar algo, la
    // notificación desaparecía sin dejar rastro. Ahora cada notificación
    // tiene un id estable; la primera vez que aparece se guarda con su
    // fecha real (firstSeenTs) y se marca activa; si deja de cumplirse
    // la condición, se queda en el historial marcada como inactiva (no
    // se borra) — así la bandeja completa es un historial de verdad, no
    // solo el estado actual. Tope de 200 para no crecer sin límite.
    const NOTIF_HISTORY_KEY = 'charkuma_notif_history';
    const NOTIF_READ_KEY = 'charkuma_notif_read';
    function loadNotifHistory(){ try { return JSON.parse(localStorage.getItem(NOTIF_HISTORY_KEY)) || []; } catch (e) { return []; } }
    function saveNotifHistory(arr){ try { localStorage.setItem(NOTIF_HISTORY_KEY, JSON.stringify(arr)); } catch (e) {} }
    function loadNotifRead(){ try { return JSON.parse(localStorage.getItem(NOTIF_READ_KEY)) || []; } catch (e) { return []; } }
    function saveNotifRead(arr){ try { localStorage.setItem(NOTIF_READ_KEY, JSON.stringify(arr)); } catch (e) {} }
    function markNotifRead(id){
      const read = new Set(loadNotifRead());
      read.add(id);
      saveNotifRead([...read]);
    }
    function syncNotifHistory(current){
      const history = loadNotifHistory();
      const hadHistoryBefore = history.length > 0; // primera visita real = sin historial todavía: poblarlo no es "nuevo", es el punto de partida
      const byId = {};
      history.forEach(h => { byId[h.id] = h; });
      const nowIds = new Set();
      let sawNewId = false;
      current.forEach(n => {
        nowIds.add(n.id);
        if (byId[n.id]) Object.assign(byId[n.id], { title: n.title, detail: n.detail, view: n.view, active: true });
        else { byId[n.id] = { id: n.id, type: n.type, title: n.title, detail: n.detail, view: n.view, firstSeenTs: Date.now(), active: true }; sawNewId = true; }
      });
      Object.values(byId).forEach(h => { if (!nowIds.has(h.id)) h.active = false; });
      const merged = Object.values(byId).sort((a, b) => b.firstSeenTs - a.firstSeenTs).slice(0, 200);
      saveNotifHistory(merged);
      // Backlog #304 — un único "ding" por esta llamada aunque hayan
      // aparecido varias notificaciones nuevas a la vez (nunca una ráfaga).
      if (hadHistoryBefore && sawNewId) playNotifDing();
      return merged;
    }

    function renderNotifications(){
      const list = document.getElementById('notifList');
      const dot = document.getElementById('notifDot');
      if (!list || !dot) return;
      const notifs = buildNotifications();
      syncNotifHistory(notifs);
      const read = new Set(loadNotifRead());
      dot.hidden = notifs.every(n => read.has(n.id));
      list.innerHTML = notifs.length
        ? notifs.map(n => `
            <div class="notif-item${read.has(n.id) ? '' : ' is-unread'}" onclick="markNotifRead('${n.id}');${n.view ? `showView('${n.view}');` : ''}toggleNotifPanel(false)">
              <strong>${n.title}</strong>
              ${n.detail || ''}
            </div>`).join('')
        : `<p class="yt-empty">Todo al día — nada pendiente ahora mismo 🎉</p>`;
    }

    // Doble clic en la campana (o el botón "📬 Abrir bandeja completa"
    // del desplegable): página completa con historial real — backlog #104.
    function openNotifInbox(){
      toggleNotifPanel(false);
      showView('notif-inbox');
    }
    function markAllNotifsRead(){
      const ids = loadNotifHistory().map(n => n.id);
      saveNotifRead([...new Set([...loadNotifRead(), ...ids])]);
      renderNotifInbox();
      renderNotifications();
    }
    function renderNotifInbox(){
      const list = document.getElementById('notifInboxList');
      if (!list) return;
      const current = buildNotifications();
      const history = syncNotifHistory(current);
      const read = new Set(loadNotifRead());
      list.innerHTML = history.length
        ? history.map(n => `
            <div class="geek-card${read.has(n.id) ? '' : ' is-unread'}"${n.active && n.view ? ` style="cursor:pointer" onclick="markNotifRead('${n.id}');showView('${n.view}')"` : ' onclick="markNotifRead(\'' + n.id + '\');renderNotifInbox()"'}>
              <div class="geek-thumb">${n.active ? '🔔' : '✅'}</div>
              <div class="geek-info">
                <div class="geek-badges">
                  <span class="type-chip chip-neutral">${NOTIF_TYPE_LABELS[n.type] || n.type}</span>
                  ${n.active ? '' : '<span class="type-chip chip-green">Resuelto</span>'}
                </div>
                <h4>${n.title}</h4>
                ${n.detail ? `<p>${n.detail}</p>` : ''}
                <p class="yt-empty" style="margin:4px 0 0">Primera vez: ${new Date(n.firstSeenTs).toLocaleDateString('es-ES', {day:'numeric', month:'short', year:'numeric'})}</p>
              </div>
            </div>`).join('')
        : `<p class="yt-empty">Todavía no hay ninguna notificación registrada.</p>`;
    }

    // Backlog #48 — aviso de datos distintos entre pestañas: casi todo
    // el estado ya se sincroniza solo en tiempo real vía Firestore (esa
    // pestaña se actualiza sola, sin hacer falta recargar — avisar ahí
    // sería ruido, no ayuda). Lo que queda son preferencias puramente
    // locales por navegador (no por dispositivo/cuenta): modo compacto
    // de Control Maestro, Retro CRT, sonido 8-bit, silenciar tipos de
    // notificación y leído/no leído de notificaciones. Si cambian desde
    // OTRA pestaña de este mismo navegador, el evento `storage` lo nota
    // y avisa aquí — nunca se dispara por un cambio hecho en la propia
    // pestaña actual (así es como funciona `storage` de por sí).
    // Construido dentro del listener (no arriba, a nivel de script) a
    // propósito: MC_COMPACT_KEY se declara más abajo en el archivo, y un
    // evento `storage` real solo puede llegar mucho después de que todo
    // el script haya terminado de ejecutarse — para entonces ya existen
    // todas estas constantes, así que evaluarlas aquí dentro es seguro.
    window.addEventListener('storage', (e) => {
      const watchKeys = [MC_COMPACT_KEY, CRT_MODE_KEY, EIGHT_BIT_SOUND_KEY, NOTIF_MUTED_KEY, NOTIF_READ_KEY];
      if (!watchKeys.includes(e.key)) return;
      const banner = document.getElementById('crossTabBanner');
      if (banner) banner.hidden = false;
    });

    function toggleNotifPanel(force){
      const panel = document.getElementById('notifPanel');
      if (!panel) return;
      const willShow = typeof force === 'boolean' ? force : panel.hidden;
      panel.hidden = !willShow;
      if (willShow) renderNotifications();
    }
    // OJO: la llamada inicial a renderNotifications() (para que el
    // puntito rojo salga bien desde la primera carga) va al final del
    // todo del script, no aquí — usa RETRO365_START_DATE/plannedGames/
    // buildSiteIndex, que son const declaradas más abajo (TDZ).

    // Cierre automático de la campana: al mover el ratón fuera del botón
    // o del propio panel se cierra solo (con un pequeño margen para poder
    // cruzar de uno a otro sin que se cierre a medio camino). Clic fuera
    // como respaldo para quien no usa ratón (táctil).
    (function initNotifAutoClose(){
      const wrap = document.getElementById('notifWrap');
      if (!wrap) return;
      let closeTimer = null;
      wrap.addEventListener('mouseleave', () => {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => toggleNotifPanel(false), 350);
      });
      wrap.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      document.addEventListener('click', (e) => {
        const panel = document.getElementById('notifPanel');
        if (panel && !panel.hidden && !wrap.contains(e.target)) toggleNotifPanel(false);
      });
    })();

    const PRESENTATION_MODE_KEY = 'charkuma_presentation_mode';
    function setPresentationMode(on){
      document.body.classList.toggle('presentation-mode', on);
      try { localStorage.setItem(PRESENTATION_MODE_KEY, on ? '1' : '0'); } catch(e) { /* seguimos sin guardar */ }
    }
    (function initPresentationMode(){
      let saved = false;
      try { saved = localStorage.getItem(PRESENTATION_MODE_KEY) === '1'; } catch(e) { /* por defecto desactivado */ }
      document.body.classList.toggle('presentation-mode', saved);
      const checkbox = document.getElementById('presentationModeToggle');
      if (checkbox) checkbox.checked = saved;
    })();

    // Exportar/importar: TODO lo que la web guarda en este navegador
    // (notas, banco de ideas, revisiones, progreso de la ruleta...) en
    // un único archivo .json, para no perderlo si cambias de navegador,
    // borras el caché o quieres pasarlo a otro dispositivo.
    const EXPORTABLE_KEY_PREFIX = 'charkuma_';
    function exportSiteData(){
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf(EXPORTABLE_KEY_PREFIX) === 0) data[key] = localStorage.getItem(key);
      }
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `charkuma-datos-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    function importSiteData(file){
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const data = parsed && parsed.data ? parsed.data : parsed;
          if (!data || typeof data !== 'object') throw new Error('Formato no válido');
          Object.keys(data).forEach(key => {
            if (key.indexOf(EXPORTABLE_KEY_PREFIX) === 0) localStorage.setItem(key, data[key]);
          });
          alert('Datos importados. La página se va a recargar para aplicarlos.');
          location.reload();
        } catch (err) {
          alert('No se ha podido leer ese archivo como copia de seguridad de CHARKUMA.');
        }
      };
      reader.readAsText(file);
    }

    // ──────────────────────────────────────────────────────────
    // Backlog Fase 2 #159: si una <img> del sitio no llega a cargar
    // (carátula de RAWG caída, foto de Wikimedia movida/borrada,
    // ilustración de context-img/ con la ruta mal escrita...) que se
    // oculte sola en vez de enseñar el icono roto feo del navegador.
    // Un solo listener global con "capture" (el evento "error" de un
    // <img> no burbujea) en vez de tocar cada <img> del sitio a mano —
    // así cubre también las que se generan dinámicamente más adelante.
    // Se marca con una clase por si alguna vista quiere darle un estilo
    // de "hueco vacío" distinto en vez de ocultarlo del todo.
    // ──────────────────────────────────────────────────────────
    document.addEventListener('error', (e) => {
      const img = e.target;
      if (!img || img.tagName !== 'IMG' || img.dataset.brokenHandled) return;
      img.dataset.brokenHandled = '1';
      img.hidden = true;
      img.classList.add('img-broken');
    }, true);

    // ──────────────────────────────────────────────────────────
    // Atajos de teclado: "/" o Ctrl/Cmd+K abren el buscador, "p" salta a
    // Proyectos, "Esc" cierra buscador/ajustes o vuelve al inicio si ya
    // estás en una vista.
    // ──────────────────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);
      // Backlog #271 — Ctrl/Cmd+K es el atajo estándar de "buscador
      // global" en la mayoría de apps (Notion, Linear...); funciona
      // aunque estés escribiendo en otro campo, igual que en esas apps.
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        openSearchView();
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        openSearchView();
      } else if (e.key === 'p' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Backlog #267 — atajo directo a Proyectos desde cualquier pantalla.
        e.preventDefault();
        showView('mis-proyectos');
      } else if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('mobile-open')) { closeMobileMenu(); return; }
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel && !settingsPanel.hidden) { settingsPanel.hidden = true; return; }
        const notifPanel = document.getElementById('notifPanel');
        if (notifPanel && !notifPanel.hidden) { toggleNotifPanel(false); return; }
        if (document.getElementById('view-buscar') && document.getElementById('view-buscar').classList.contains('active')) {
          goHome('inicio');
        }
      } else if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.getAttribute && e.target.getAttribute('role') === 'button') {
        // Accesibilidad: los "role=button" a mano (como los emojis
        // secretos) también se activan con teclado, no solo con clic.
        e.preventDefault();
        e.target.click();
      }
    });

    // Backlog #274 (9 sep) — botón "volver arriba", solo visible tras
    // bajar un poco de scroll. `requestAnimationFrame` como throttle
    // barato (evita recalcular en cada evento de scroll bruto).
    (function initBackToTop(){
      const btn = document.getElementById('backToTopBtn');
      if (!btn) return;
      let ticking = false;
      function update(){
        btn.hidden = window.scrollY < 500;
        ticking = false;
      }
      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }, {passive:true});
    })();

    // Backlog #263/#264 — mismo umbral y throttle que "volver arriba"
    // (arriba). Se oculta también si ya estás en una de las 3 vistas de
    // destino, para no ofrecer un atajo a donde ya estás. `updateQuickAccessBar()`
    // se llama también desde showView() más abajo, porque cambiar de vista
    // no siempre dispara scroll (resetScroll:false).
    const QUICK_ACCESS_TARGETS = ['mis-proyectos', 'guiones-bandeja', 'hub-secreto'];
    function updateQuickAccessBar(){
      const bar = document.getElementById('quickAccessBar');
      if (!bar) return;
      const active = document.querySelector('.app-view.active');
      const onTarget = active && QUICK_ACCESS_TARGETS.includes(active.id.replace('view-', ''));
      bar.hidden = window.scrollY < 500 || !!onTarget;
    }
    (function initQuickAccessBar(){
      if (!document.getElementById('quickAccessBar')) return;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(updateQuickAccessBar); ticking = true; }
      }, {passive:true});
    })();

    // Backlog #282 — contador junto a "Proyectos" en el menú. Cuenta las
    // tarjetas reales del grid (no la placeholder "Próximamente", que no
    // es un proyecto) para que se actualice sola si algún día cambia el
    // número, en vez de dejar un número fijo a mano.
    (function initProyectosNavCounter(){
      const link = document.getElementById('navProyectosLink');
      const grid = document.getElementById('projectsGrid');
      if (!link || !grid) return;
      const count = grid.querySelectorAll('.project:not(.project-soon)').length;
      if (count > 0) link.textContent = `Proyectos (${count})`;
    })();

    // Backlog #134 — easter egg nostálgico: código Konami de toda la
    // vida (↑↑↓↓←→←→BA). No hace nada más que un guiño — ni desbloquea
    // contenido real ni cambia ningún estado guardado.
    const KONAMI_SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiProgress = 0;
    document.addEventListener('keydown', (e) => {
      const expected = KONAMI_SEQUENCE[konamiProgress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiProgress = (key === expected) ? konamiProgress + 1 : (key === KONAMI_SEQUENCE[0] ? 1 : 0);
      if (konamiProgress === KONAMI_SEQUENCE.length) {
        konamiProgress = 0;
        const toast = document.getElementById('konamiToast');
        if (!toast) return;
        toast.hidden = false;
        // Reinicia la animación CSS aunque se dispare dos veces seguidas.
        toast.style.animation = 'none';
        void toast.offsetWidth;
        toast.style.animation = '';
        clearTimeout(window.__konamiTimer);
        window.__konamiTimer = setTimeout(() => { toast.hidden = true; }, 4000);
      }
    });

    // ──────────────────────────────────────────────────────────
    // SONIDO DE RULETA — generado con Web Audio API (sin archivos
    // externos): una serie de "tics" que se van espaciando, como una
    // ruleta real perdiendo velocidad. Se reutiliza en todas las
    // ruletas de la web.
    // ──────────────────────────────────────────────────────────
    let sharedAudioCtx = null;
    function getAudioCtx(){
      if (!sharedAudioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        sharedAudioCtx = new AudioCtx();
      }
      if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
      return sharedAudioCtx;
    }

    // Backlog #137/#138 — modo Retro CRT (visual) y sonidos 8-bit al
    // navegar (audio): dos preferencias puramente estéticas, separadas
    // a propósito (a quien le guste lo visual no tiene por qué querer
    // sonido, y viceversa). Preferencia simple por navegador.
    const CRT_MODE_KEY = 'charkuma_crt_mode';
    const EIGHT_BIT_SOUND_KEY = 'charkuma_eight_bit_sound';
    function setCrtMode(on){
      document.body.classList.toggle('crt-mode', on);
      try { localStorage.setItem(CRT_MODE_KEY, on ? '1' : '0'); } catch (e) {}
    }
    function setEightBitSounds(on){
      try { localStorage.setItem(EIGHT_BIT_SOUND_KEY, on ? '1' : '0'); } catch (e) {}
    }

    // Backlog #304 — a diferencia de CRT/8-bit (puramente estéticos,
    // apagados por defecto), este sonido es parte del propio sistema de
    // avisos: Iván pidió que lo que se pueda activar por defecto (sin
    // pasar por el permiso del navegador) empiece encendido. Ausencia de
    // la clave = activado (nunca escrita todavía = primera visita).
    const NOTIF_SOUND_KEY = 'charkuma_notif_sound';
    function isNotifSoundOn(){
      try { return localStorage.getItem(NOTIF_SOUND_KEY) !== '0'; } catch (e) { return true; }
    }
    function setNotifSound(on){
      try { localStorage.setItem(NOTIF_SOUND_KEY, on ? '1' : '0'); } catch (e) {}
    }
    function playNotifDing(){
      if (!isNotifSoundOn()) return;
      const ctx = getAudioCtx();
      if (!ctx) return; // sin soporte de audio: seguimos sin sonido, sin romper nada
      const t = ctx.currentTime;
      [660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.09);
        gain.gain.setValueAtTime(0.001, t + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.08, t + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.32);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t + i * 0.09);
        osc.stop(t + i * 0.09 + 0.35);
      });
    }
    function playNavBlip(){
      let on = false;
      try { on = localStorage.getItem(EIGHT_BIT_SOUND_KEY) === '1'; } catch (e) {}
      if (!on) return;
      const ctx = getAudioCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.06);
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    }
    (function initCrtAndSoundPrefs(){
      let crtOn = false, soundOn = false;
      try { crtOn = localStorage.getItem(CRT_MODE_KEY) === '1'; } catch (e) {}
      try { soundOn = localStorage.getItem(EIGHT_BIT_SOUND_KEY) === '1'; } catch (e) {}
      document.body.classList.toggle('crt-mode', crtOn);
      const crtCheckbox = document.getElementById('crtModeToggle');
      if (crtCheckbox) crtCheckbox.checked = crtOn;
      const soundCheckbox = document.getElementById('eightBitSoundToggle');
      if (soundCheckbox) soundCheckbox.checked = soundOn;
      const notifSoundCheckbox = document.getElementById('notifSoundToggle');
      if (notifSoundCheckbox) notifSoundCheckbox.checked = isNotifSoundOn();
    })();

    function playRouletteSound(durationMs){
      const ctx = getAudioCtx();
      if (!ctx) return; // navegador sin soporte de audio: seguimos sin sonido, sin romper nada

      durationMs = durationMs || 900;
      let elapsed = 0;
      let interval = 55; // ms entre "tics", empieza rápido

      function tick(){
        if (elapsed >= durationMs) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(950, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);

        interval *= 1.09; // se va espaciando, como al frenar
        elapsed += interval;
        setTimeout(tick, interval);
      }
      tick();
    }

    // ──────────────────────────────────────────────────────────
    // NAVEGACIÓN INTERNA (SPA): cambia de "página" sin recargar,
    // manteniendo siempre la cabecera fija arriba.
    //
    // Además, cada cambio de vista queda registrado en el historial del
    // navegador (history.pushState). Así, el botón "atrás" del navegador
    // —incluido el botón lateral/4º botón del ratón, o el gesto de atrás
    // en móvil— te devuelve al apartado en el que estabas antes, en vez
    // de mandarte siempre al inicio de la página.
    // ──────────────────────────────────────────────────────────
    // Backlog #140 — mini-juego escondido: memoria de parejas, sin
    // premio real ni dato guardado — solo un rato tonto, accesible
    // únicamente desde el toast del código Konami (#134).
    const MEMORY_EMOJIS = ['🕹️','👾','🏆','💎','⭐','🎮'];
    let memoryState = { cards: [], flipped: [], matched: [], moves: 0, lock: false };
    function startMemoryGame(){
      const pairs = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
      for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
      }
      memoryState = { cards: pairs, flipped: [], matched: [], moves: 0, lock: false };
      renderMemoryGame();
    }
    function renderMemoryGame(){
      const grid = document.getElementById('memoryGrid');
      if (!grid) return;
      grid.innerHTML = memoryState.cards.map((emoji, i) => {
        const shown = memoryState.flipped.includes(i) || memoryState.matched.includes(i);
        const isMatched = memoryState.matched.includes(i);
        return `<button type="button" class="memory-card${shown ? ' flipped' : ''}${isMatched ? ' matched' : ''}" onclick="flipMemoryCard(${i})" aria-label="${shown ? 'Carta: ' + emoji : 'Carta boca abajo'}">${shown ? emoji : '❓'}</button>`;
      }).join('');
      const movesEl = document.getElementById('memoryMoves');
      if (movesEl) movesEl.textContent = `Movimientos: ${memoryState.moves}`;
      const won = memoryState.matched.length === memoryState.cards.length && memoryState.cards.length > 0;
      const winEl = document.getElementById('memoryWinMessage');
      if (winEl) {
        winEl.hidden = !won;
        if (won) winEl.textContent = `🎉 ¡Completado en ${memoryState.moves} movimientos!`;
      }
    }
    function flipMemoryCard(i){
      if (memoryState.lock || memoryState.flipped.includes(i) || memoryState.matched.includes(i)) return;
      memoryState.flipped.push(i);
      if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        const [a, b] = memoryState.flipped;
        if (memoryState.cards[a] === memoryState.cards[b]) {
          memoryState.matched.push(a, b);
          memoryState.flipped = [];
        } else {
          memoryState.lock = true;
          setTimeout(() => { memoryState.flipped = []; memoryState.lock = false; renderMemoryGame(); }, 700);
        }
      }
      renderMemoryGame();
    }

    // Backlog #273 (9 sep) — resaltar en el menú principal la sección
    // en la que estás, para saber "dónde estoy" de un vistazo. Solo
    // marca coincidencia EXACTA con uno de los destinos reales del
    // menú (`data-nav-section` en index.html, 3 desde el #313 del 14
    // sep — "Games" y "Panel" dejaron de ser enlaces de texto ahí) — a propósito no intenta
    // adivinar la sección "padre" de cada guion/subvista individual
    // (Rincón del Friki, un día de Retro 365...), porque acertar mal
    // sería peor que no resaltar nada. Cubre el caso más común: entrar
    // directo desde el menú a una de las 5 vistas de primer nivel.
    function updateNavActiveState(id){
      const links = document.querySelectorAll('#navLinks a[data-nav-section]');
      links.forEach(a => a.classList.toggle('nav-active', a.dataset.navSection === id));
    }

    // Backlog #278 — mismo criterio que updateNavActiveState(), para la
    // barra de navegación inferior (solo móvil). "menu" nunca se resalta:
    // no navega a ninguna vista, solo abre el desplegable ya existente.
    function updateBottomNavActive(id){
      const buttons = document.querySelectorAll('#bottomNavBar .bottom-nav-btn[data-bottom-nav]');
      buttons.forEach(btn => {
        const target = btn.dataset.bottomNav;
        btn.classList.toggle('bottom-nav-active', target !== 'menu' && target === id);
      });
    }

    // Backlog #290 — panel lateral fijo y colapsable de "modo gestión":
    // solo estas vistas cuentan como gestión (nunca las páginas públicas
    // de contenido — Rincón del Friki, Redes Sociales, guiones sueltos...).
    const MANAGEMENT_VIEWS = new Set(['hub-secreto', 'master-control', 'guiones-bandeja', 'calendario', 'notif-inbox', 'idea-swipe']);
    const MGMT_SIDEBAR_COLLAPSED_KEY = 'charkuma_mgmt_sidebar_collapsed';
    function toggleManagementSidebar(){
      const el = document.getElementById('managementSidebar');
      const btn = document.getElementById('managementSidebarToggle');
      if (!el) return;
      const collapsed = !el.classList.contains('collapsed');
      el.classList.toggle('collapsed', collapsed);
      if (btn) btn.textContent = collapsed ? '»' : '«';
      try { localStorage.setItem(MGMT_SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0'); } catch (e) {}
    }
    function updateManagementSidebar(activeViewId){
      const el = document.getElementById('managementSidebar');
      if (!el) return;
      const show = MANAGEMENT_VIEWS.has(activeViewId);
      el.classList.toggle('active', show);
      if (!show) return;
      let collapsed = false;
      try { collapsed = localStorage.getItem(MGMT_SIDEBAR_COLLAPSED_KEY) === '1'; } catch (e) {}
      el.classList.toggle('collapsed', collapsed);
      const btn = document.getElementById('managementSidebarToggle');
      if (btn) btn.textContent = collapsed ? '»' : '«';
      el.querySelectorAll('.management-sidebar-link[data-mgmt-link]').forEach(link => {
        link.classList.toggle('mgmt-link-active', link.dataset.mgmtLink === activeViewId);
      });
    }

    // Backlog #291 — recuerda por dónde ibas al salir de una vista y lo
    // restaura si vuelves a entrar (en memoria, no localStorage — dura lo
    // que dura la pestaña, como el scroll restoration nativo del navegador,
    // no hace falta que sobreviva a un cierre real).
    const viewScrollPositions = {};
    function showView(id, opts){
      opts = opts || {};
      playNavBlip(); // Backlog #138 — no-op si el usuario no lo ha activado
      // Backlog #307 — cambiar de vista también cierra el panel de Ajustes
      // si estaba abierto (antes se quedaba abierto flotando encima).
      const settingsPanelForClose = document.getElementById('settingsPanel');
      if (settingsPanelForClose && !settingsPanelForClose.hidden) settingsPanelForClose.hidden = true;
      if (id === 'mini-juego') startMemoryGame();
      // Backlog #291 — guarda dónde estabas ANTES de cambiar de vista.
      const prevActive = document.querySelector('.app-view.active');
      if (prevActive) viewScrollPositions[prevActive.id.replace('view-', '')] = window.scrollY;
      document.querySelectorAll('.app-view').forEach(v => {
        v.classList.remove('active');
        v.classList.remove('view-visible');
      });
      const target = document.getElementById('view-' + id);
      if (target) {
        target.classList.add('active');
        // Doble rAF: deja que el navegador pinte el estado inicial
        // (opacity:0) antes de animar hacia opacity:1 — si añadimos
        // "view-visible" en el mismo tick, no hay nada que transicionar.
        requestAnimationFrame(() => requestAnimationFrame(() => target.classList.add('view-visible')));
      }
      // Backlog #291 — si ya habías estado en esta vista, vuelve a esa
      // posición en vez de al principio (salvo que quien llame a
      // showView pida explícitamente resetScroll:false, como goHome, que
      // hace su propio scroll a un ancla).
      if (opts.resetScroll !== false) window.scrollTo({top: viewScrollPositions[id] || 0});
      updateNavActiveState(id);
      // Backlog #278 — mismo criterio que updateNavActiveState(), pero
      // para la barra de navegación inferior (solo móvil). "menu" nunca
      // se resalta: no navega a ninguna vista, solo abre el desplegable
      // ya existente (toggleMobileMenu()).
      if (typeof updateBottomNavActive === 'function') updateBottomNavActive(id);
      // Backlog #290 — panel lateral de "modo gestión": se muestra/oculta
      // solo, según si la vista activa cuenta como gestión.
      if (typeof updateManagementSidebar === 'function') updateManagementSidebar(id);
      updateSidebar(id);
      updateViewChrome(id, target);
      // Backlog #292 — try/catch defensivo por el mismo motivo que el
      // resto de funciones que dependen de buildSiteIndex()/CONTENT_STAGE_ORDER
      // más abajo: en una carga en frío por hash puede ejecutarse antes
      // de que esos arrays existan todavía.
      try { if (typeof updatePinnedGuion === 'function') updatePinnedGuion(id); } catch (e) { /* ver comentario arriba */ }
      // Backlog #83 — anuncia el cambio de vista a lectores de pantalla
      // (document.title ya lo calcula updateViewChrome, así que no hay
      // que duplicar esa lógica). Pequeño retraso para que el lector no
      // se coma el anuncio si llega justo con el resto del repintado.
      const announcer = document.getElementById('viewAnnouncer');
      if (announcer) setTimeout(() => { announcer.textContent = document.title; }, 120);
      // Igual que en updateViewChrome: en una carga en frío por hash
      // (#view=...) estas funciones pueden ejecutarse antes de que los
      // "const" que usan (arrays de contenido, bancos de ideas...) estén
      // inicializados. Try/catch defensivo — si falla aquí, se repinta
      // bien en la siguiente navegación normal dentro de la web.
      if (id === 'calendario' && typeof renderCalendarView === 'function') {
        try { renderCalendarView(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'hub-secreto' && typeof renderMasterHub === 'function') {
        try { renderMasterHub(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'master-control' && typeof renderMasterControlList === 'function') {
        try { renderMasterControlList(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'guiones-bandeja' && typeof renderGuionesBandeja === 'function') {
        try { renderGuionesBandeja(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'idea-swipe' && typeof renderIdeaSwipeStage === 'function') {
        try { renderIdeaSwipeStage(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'detras-camaras' && typeof renderDetrasCamarasIdeas === 'function') {
        try { renderDetrasCamarasIdeas(); } catch (e) { /* ver comentario arriba */ }
      }
      // Game Match retirado 9 sep (ver vista view-helquid-game-match) —
      // ya no hace falta refrescar su mazo al entrar.
      if (id === 'notif-inbox' && typeof renderNotifInbox === 'function') {
        try { renderNotifInbox(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'gaming-library' && typeof renderSteamGames === 'function') {
        try { renderSteamGames(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'tech-setup' && typeof renderTechSetup === 'function') {
        try { renderTechSetup(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'ct-generador-voz' && typeof populateVozGuionSelect === 'function') {
        try { populateVozGuionSelect(); } catch (e) { /* ver comentario arriba */ }
      }
      if (id === 'detras-camaras' && typeof renderPhotoCreditsPage === 'function') {
        try { renderPhotoCreditsPage(); } catch (e) { /* ver comentario arriba */ }
      }
      // Backlog #262 — guarda esta vista como "la última real visitada"
      // (para el widget de la home), y si estamos ENTRANDO en la home,
      // pinta el widget con lo que se guardó la vez anterior.
      try { recordLastView(id); } catch (e) { /* ver comentario arriba */ }
      if (id === 'home' && typeof renderContinueWidget === 'function') {
        try { renderContinueWidget(); } catch (e) { /* ver comentario arriba */ }
      }
      // Backlog #263/#264 — la barra de accesos directos también depende
      // de en qué vista estás, no solo del scroll.
      if (typeof updateQuickAccessBar === 'function') {
        try { updateQuickAccessBar(); } catch (e) { /* ver comentario arriba */ }
      }

      // No tocar el historial cuando venimos de un popstate (el navegador
      // ya está gestionando esa entrada) ni antes de fijar el estado base.
      if (!opts.fromPopState && historyInitialized) {
        if (!history.state || history.state.view !== id) {
          history.pushState({view:id}, '', '#view=' + id);
        }
      }
    }

    // Migas de pan + botón "compartir enlace" + título de pestaña,
    // generados leyendo el propio contenido de la vista (kicker + h2).
    // Así no hace falta tocar a mano cada página de detalle para
    // añadirlos: funciona para todas, actuales y futuras.
    function updateViewChrome(id, target){
      if (!target) return;
      const pageHead = target.querySelector('.page-head .container');
      if (!pageHead) { document.title = 'CHARKUMA — Gaming, cultura geek y creatividad'; return; }

      const kickerEl = pageHead.querySelector('.section-kicker');
      const titleEl = pageHead.querySelector('.section-title');
      const kickerText = (kickerEl && kickerEl.childNodes[0]) ? kickerEl.childNodes[0].textContent.trim() : '';
      const rawTitle = titleEl ? titleEl.textContent.trim() : '';
      // Quita el primer "token" del título SOLO si es un emoji/símbolo
      // decorativo (sin ninguna letra) — si el título empieza por una
      // palabra normal (p. ej. "REDES SOCIALES", sin emoji), se deja tal cual.
      const firstTokenMatch = rawTitle.match(/^(\S+)\s+(.*)$/);
      const titleText = (firstTokenMatch && !/\p{L}/u.test(firstTokenMatch[1]))
        ? firstTokenMatch[2].trim()
        : rawTitle;

      document.title = titleText ? `${titleText} · CHARKUMA` : 'CHARKUMA — Gaming, cultura geek y creatividad';

      let crumb = pageHead.querySelector('.breadcrumb-bar');
      if (id === 'home') {
        if (crumb) crumb.remove();
        return;
      }
      if (!crumb) {
        crumb = document.createElement('div');
        crumb.className = 'breadcrumb-bar';
        const backLink = pageHead.querySelector('.back');
        if (backLink) backLink.insertAdjacentElement('afterend', crumb);
        else pageHead.insertBefore(crumb, pageHead.firstChild);
      }
      const parts = [`<a onclick="goHome('inicio')">🏠 Inicio</a>`];
      if (kickerText) parts.push(`<span class="sep">›</span><span>${kickerText}</span>`);
      if (titleText) parts.push(`<span class="sep">›</span><span>${titleText}</span>`);
      const pageUrl = location.origin + location.pathname + '#view=' + id;
      const tweetText = titleText ? `${titleText} — vía @mrchakurma` : 'CHARKUMA';
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(pageUrl)}`;
      crumb.innerHTML = parts.join(' ') +
        `<button type="button" class="share-view-btn" onclick="shareCurrentView('${id}', this)">🔗 Copiar enlace</button>` +
        `<a class="share-view-btn" href="${tweetUrl}" target="_blank" rel="noopener">🐦 Compartir</a>`;

      // Backlog #295 — aviso solo la primera vez que se entra a una vista
      // "de gestión" real (no todas las 46 vistas del sitio de golpe —
      // solo unas pocas donde de verdad hace falta explicar algo que no
      // es obvio a simple vista). Try/catch por el mismo motivo TDZ que
      // el resto de esta función.
      try { if (typeof maybeShowFirstTimeHint === 'function') maybeShowFirstTimeHint(id, pageHead); } catch (e) { /* ver comentario arriba */ }

      // /loop V4 (15 sep): el panel grande de Aprobar/Fase/Publicar/
      // Descartar vivía aquí, en la propia página pública del contenido
      // — cualquier visitante (no solo Iván) podía verlo y pulsarlo. Se
      // movió entero a Control Maestro (reviewControlsHTML se sigue
      // usando tal cual, solo que ahora lo pinta
      // openMasterControlManagePanel() dentro de #masterControlProjectsList).
      // Aquí ya no queda ningún control real — solo, si el contenido
      // sigue vivo (no descartado) y no es una herramienta sin ciclo de
      // revisión, un enlace directo para saltar a gestionarlo en el
      // Panel sin tener que buscarlo a mano.
      const controls = pageHead.querySelector('.review-controls');
      if (controls) controls.remove();
      let item = null;
      try { item = findContentItemByView(id); } catch (e) { item = null; }
      const manageLink = pageHead.querySelector('.manage-in-panel-link');
      if (manageLink) manageLink.remove();
      if (item && !item.isTool) {
        crumb.insertAdjacentHTML('afterend',
          `<div class="manage-in-panel-link" style="margin:10px 0">
             <button type="button" class="btn btn-secondary" onclick="sessionStorage.setItem('mcExpandRid','${id}'); showView('master-control')">
               ⚙️ Gestionar en el Panel
             </button>
           </div>`);
      }
      try { injectBeatDurationEstimate(target); } catch (e) { /* ver comentario arriba sobre TDZ */ }
    }

    // Botón "compartir": copia un enlace directo a la vista actual
    // (#view=id) al portapapeles.
    function shareCurrentView(id, btnEl){
      const url = location.origin + location.pathname + '#view=' + id;
      const original = btnEl.textContent;
      const flash = (label) => { btnEl.textContent = label; setTimeout(() => { btnEl.textContent = original; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => flash('✅ Enlace copiado')).catch(() => flash('No se pudo copiar'));
      } else {
        flash('No se pudo copiar');
      }
    }

    // Backlog #262 — "Continuar donde lo dejaste": guarda la última vista
    // REAL (no el propio inicio, no el buscador — ninguno de los dos es
    // "un sitio" al que volver) y su título ya calculado por
    // updateViewChrome, para no tener que repetir la lógica de kicker/título.
    // Backlog #265 — ampliado para guardar hasta 5 (no solo la última), y
    // así poder listar "Tus últimas vistas" en Ajustes sin tocar la lógica
    // de #262 (que solo usa la primera del array).
    const LAST_VIEW_KEY = 'charkuma_lastRealView';
    const LAST_VIEW_EXCLUDED = new Set(['home', 'buscar']);
    const LAST_VIEWS_MAX = 5;
    function getRecentViews(){
      try {
        const raw = JSON.parse(localStorage.getItem(LAST_VIEW_KEY) || '[]');
        // Compatibilidad con el formato viejo de #262 (un objeto suelto,
        // no un array) — si aparece, se trata como un array de 1.
        return Array.isArray(raw) ? raw : (raw && raw.id ? [raw] : []);
      } catch (e) { return []; }
    }
    function recordLastView(id){
      if (LAST_VIEW_EXCLUDED.has(id)) return;
      const label = document.title.replace(/\s*·\s*CHARKUMA$/, '').trim();
      if (!label) return;
      const recent = getRecentViews().filter(v => v.id !== id);
      recent.unshift({id, label});
      try { localStorage.setItem(LAST_VIEW_KEY, JSON.stringify(recent.slice(0, LAST_VIEWS_MAX))); } catch (e) { /* localStorage no disponible */ }
      // Backlog #293 — sincroniza entre dispositivos, mismo patrón que
      // ideaBanks/uiPrefs (documento propio, ver pushBrowsingState más abajo).
      if (typeof pushBrowsingState === 'function') pushBrowsingState();
    }
    function renderContinueWidget(){
      const section = document.getElementById('continueWhereLeftOff');
      if (!section) return;
      // Si la vista guardada ya no existe (contenido retirado desde
      // entonces), no mostramos un enlace roto.
      const saved = getRecentViews()[0];
      if (!saved || !saved.id || !document.getElementById('view-' + saved.id)) { section.hidden = true; return; }
      document.getElementById('continueWhereLeftOffLabel').textContent = saved.label;
      const link = document.getElementById('continueWhereLeftOffLink');
      link.onclick = () => showView(saved.id);
      section.hidden = false;
    }
    // Backlog #265 — "Tus últimas 5 vistas", dentro de Ajustes (no un
    // icono nuevo en la barra — el 11 sep ya se quitaron 2 iconos de ahí
    // por sobrecarga, así que esto vive como una fila más del panel que
    // ya existe, en vez de reabrir ese problema).
    function renderRecentViewsList(){
      const el = document.getElementById('recentViewsList');
      if (!el) return;
      const recent = getRecentViews().filter(v => v.id && document.getElementById('view-' + v.id));
      el.innerHTML = recent.length
        ? recent.map(v => `<a href="javascript:void(0)" class="recent-view-chip" onclick="toggleSettingsPanel(); showView('${v.id}')">${escapeAttr(v.label)}</a>`).join('')
        : `<p class="yt-empty" style="margin:0">Todavía no has visitado ninguna vista esta sesión.</p>`;
    }

    function goHome(anchorId){
      showView('home', {resetScroll:false});
      requestAnimationFrame(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({behavior:'smooth'});
      });
    }

    function goToIdentity(){
      showView('home', {resetScroll:false});
      document.getElementById('sobre-mi').classList.add('unlocked');
      requestAnimationFrame(() => {
        document.getElementById('sobre-mi').scrollIntoView({behavior:'smooth'});
      });
    }

    // Easter egg: clic en el 🎮 de "RETRO 365" → lista secreta de los 365 días
    function openSecretList(){
      showView('retro-secret');
    }

    // Easter egg: clic en el 🦸 de "RINCÓN DEL FRIKI" → banco secreto de 50 ideas
    function openRinconSecretList(){
      showView('rf-secret');
    }

    // Mismo patrón de easter egg, repetido en el resto de secciones tal
    // como se planeó cuando se hizo el de Rincón del Friki.
    function openHelquidSecretList(){ showView('helquid-secret'); }
    function openLabSecretList(){ showView('lab-secret'); }
    function openIaSecretList(){ showView('ia-secret'); }
    function openCreatorSecretList(){ showView('creator-secret'); }
    function openHechoSecretList(){ showView('hecho-secret'); }

    // Permite enlazar directamente a una vista con #view=nombre (por si
    // alguna vez compartes un enlace a una sección concreta). De paso,
    // fija la entrada base del historial (home, o la vista del enlace)
    // ANTES de que ningún clic pueda pushear nada — así el primer "atrás"
    // siempre tiene a dónde volver dentro de la web.
    const cameFromHash = (function initFromHash(){
      const match = location.hash.match(/view=([\w-]+)/);
      const initialView = match ? match[1] : 'home';
      history.replaceState({view: initialView}, '', location.pathname + location.search + (match ? '#view=' + initialView : ''));
      historyInitialized = true;
      // Siempre pasamos por showView (incluso para "home" sin hash): así
      // se añade la clase "view-visible" que dispara la animación de
      // entrada, las migas de pan y el título de la pestaña — si no, la
      // vista de inicio se queda con opacity:0 (invisible) en la primera
      // carga, porque nunca se ha llamado a showView() para ella.
      showView(initialView, {resetScroll:false});
      return !!match;
    })();

    // Botón "atrás"/"adelante" del navegador (o el botón lateral del
    // ratón, que dispara el mismo evento): vuelve a la vista guardada en
    // el historial en vez de dejar la web en el estado en que ya estaba.
    window.addEventListener('popstate', (e) => {
      const id = (e.state && e.state.view) || 'home';
      showView(id, {resetScroll:false, fromPopState:true});
    });

    // ──────────────────────────────────────────────────────────
    // Animaciones de aparición al hacer scroll
    // ──────────────────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, {threshold:.12});
    reveals.forEach(el => observer.observe(el));

    // ──────────────────────────────────────────────────────────
    // Ruleta / Modo Random: ya no es un generador de frases al azar con
    // una tirada al día — ahora, cada vez que se tira (sin límite), lleva
    // directo al proyecto EN CURSO más avanzado (el que esté en la fase
    // más cercana a publicarse; si no hay ninguno en fase, al aprobado
    // más antiguo esperando a empezar guion).
    // ──────────────────────────────────────────────────────────
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    const spinBtn = document.getElementById('spinBtn');
    let rotation = 0;

    // De más avanzado a menos avanzado: última fase primero, aprobado al
    // final. Calculado DENTRO de la función (no aquí arriba) a propósito:
    // CONTENT_STAGE_ORDER es un const declarado más abajo en el archivo —
    // evaluarlo aquí, en la carga inicial del script, rompería toda la
    // web con el mismo tipo de crash por TDZ que ya se arregló varias
    // veces esta sesión. Dentro de la función es seguro porque solo se
    // llama al pulsar el botón, con el script ya cargado del todo.
    function findMostAdvancedProject(){
      const spinPriorityOrder = [...CONTENT_STAGE_ORDER].reverse().concat('aprobado');
      const all = buildMasterControlIndex().filter(i => i.kind === 'Proyecto' && i.view && !i.external);
      for (const status of spinPriorityOrder) {
        const matches = all.filter(i => i.status === status);
        if (matches.length) {
          matches.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
          return matches[0];
        }
      }
      return null;
    }

    spinBtn.addEventListener('click', () => {
      spinBtn.disabled = true;
      result.textContent = "🦎 CHARKUMA está decidiendo...";
      rotation += 900 + Math.floor(Math.random() * 720);
      wheel.style.transform = `rotate(${rotation}deg)`;
      playRouletteSound(2600);

      setTimeout(() => {
        spinBtn.disabled = false;
        const target = findMostAdvancedProject();
        if (!target) {
          result.textContent = "No tienes ningún proyecto en curso ahora mismo — aprueba alguna idea en el Control Maestro.";
          return;
        }
        result.textContent = `➡️ ${target.title}`;
        setTimeout(() => showView(target.view), 700);
      }, 2600);
    });

    // ──────────────────────────────────────────────────────────
    // RETRO 365 — base de datos pública (lo ya publicado)
    // Clave = número de día (1 a 365). Solo hace falta añadir
    // los días que ya tienen vídeo publicado; el resto se
    // rellena solo como "bloqueado".
    // ──────────────────────────────────────────────────────────
    // Se rellena con cada día en cuanto Iván programa o publica su vídeo
    // de verdad en YouTube (no basta con tenerlo en Oculto/privado en
    // Studio, porque el enlace no funcionaría para quien visite la web).
    const completedGames = {
      // 4: { name:"...", summary:"...", difficulty:"...", emoji:"...", duration:"m:ss",
      //   platform:"tiktok|youtube", dateAdded:"AAAA-MM-DD", steamUrl:"...", videoUrl:"..." },
    };

    // Base de datos SECRETA (solo tuya): juegos ya decididos para días
    // futuros pero que aún no tienen vídeo grabado. No se muestran en la
    // lista pública — solo en la "chuleta secreta" del 🎮 easter egg.