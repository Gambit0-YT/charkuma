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

    // Fuente de noticias geek/cómics para el lateral de Rincón del Friki.
    // Zona Negativa: sitio español dedicado a cómics y cultura geek, con RSS público.
    // Puedes cambiarla por cualquier otro feed RSS que prefieras.
    const GEEK_NEWS_FEED = "https://www.zonanegativa.com/feed/";

    // Estado del widget lateral
    let currentSidebarMode = 'videos'; // 'videos' | 'news'
    let cachedVideosHTML = null;
    let cachedNewsHTML = null;

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
    }
    updateThemeButtonIcon();

    // ──────────────────────────────────────────────────────────
    // Panel de ajustes de la cabecera (⚙️): tema, modo presentación,
    // exportar/importar datos guardados en este navegador.
    // ──────────────────────────────────────────────────────────
    function toggleSettingsPanel(){
      const panel = document.getElementById('settingsPanel');
      if (!panel) return;
      panel.hidden = !panel.hidden;
    }

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
    // Atajos de teclado: "/" abre el buscador, "Esc" cierra
    // buscador/ajustes o vuelve al inicio si ya estás en una vista.
    // ──────────────────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);
      if (e.key === '/' && !typing) {
        e.preventDefault();
        openSearchView();
      } else if (e.key === 'Escape') {
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel && !settingsPanel.hidden) { settingsPanel.hidden = true; return; }
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
    function showView(id, opts){
      opts = opts || {};
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
      if (opts.resetScroll !== false) window.scrollTo({top:0});
      updateSidebar(id);
      updateViewChrome(id, target);
      if (id === 'calendario' && typeof renderCalendarView === 'function') renderCalendarView();

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
      crumb.innerHTML = parts.join(' ') +
        `<button type="button" class="share-view-btn" onclick="shareCurrentView('${id}', this)">🔗 Copiar enlace</button>`;
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
    // Ruleta / Modo Random
    // ──────────────────────────────────────────────────────────
    const options = [
      "🎮 Juega a un clásico que tengas pendiente.",
      "🦸 Ponte una película o serie de superhéroes.",
      "📺 Graba una idea para Rincón del Friki.",
      "🧪 Empieza ese proyecto raro que llevas días pensando.",
      "🎨 Diseña algo para CHARKUMA.",
      "🕹️ Busca una joya retro que nunca hayas probado.",
      "🤖 Haz un experimento creativo con IA.",
      "🧶 Diseña un rug que jamás compraría una persona normal."
    ];

    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');
    const spinBtn = document.getElementById('spinBtn');
    let rotation = 0;

    // Solo una tirada al día por visitante (localStorage, por navegador).
    const RANDOM_SPIN_KEY = 'charkuma_random_last_spin';

    function todayKey(){
      return new Date().toISOString().slice(0, 10); // AAAA-MM-DD
    }

    function checkDailySpinUsed(){
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(RANDOM_SPIN_KEY)); } catch (e) { /* ignorar */ }
      if (saved && saved.date === todayKey()) {
        spinBtn.disabled = true;
        spinBtn.textContent = '✅ Ya has tirado hoy';
        result.textContent = `${saved.pick}  —  Vuelve mañana para otra tirada.`;
        return true;
      }
      return false;
    }

    function markDailySpinUsed(pick){
      try { localStorage.setItem(RANDOM_SPIN_KEY, JSON.stringify({date: todayKey(), pick})); }
      catch (e) { /* localStorage no disponible: no pasa nada, simplemente no se recordará */ }
    }

    checkDailySpinUsed();

    spinBtn.addEventListener('click', () => {
      spinBtn.disabled = true;
      result.textContent = "🦎 CHARKUMA está decidiendo...";
      rotation += 900 + Math.floor(Math.random() * 720);
      wheel.style.transform = `rotate(${rotation}deg)`;
      playRouletteSound(2600);

      setTimeout(() => {
        const pick = options[Math.floor(Math.random() * options.length)];
        result.textContent = pick;
        markDailySpinUsed(pick);
        checkDailySpinUsed(); // bloquea el botón y cambia el texto ya con la tirada guardada
      }, 2600);
    });

    // ──────────────────────────────────────────────────────────
    // RETRO 365 — base de datos pública (lo ya publicado)
    // Clave = número de día (1 a 365). Solo hace falta añadir
    // los días que ya tienen vídeo publicado; el resto se
    // rellena solo como "bloqueado".
    // ──────────────────────────────────────────────────────────
    const completedGames = {
      1: {
        name: "Celeste",
        summary: "Plataformas de precisión sobre subir una montaña... y superarse a uno mismo por el camino.",
        difficulty: "dificil", // facil | media | dificil | muydificil
        emoji: "🏔️",
        duration: "1:24", // duración del vídeo, formato m:ss
        platform: "tiktok", // tiktok | youtube — dónde vive el vídeo
        dateAdded: "2026-08-15", // fecha real en que se publicó este día (para ordenar Proyectos)
        steamUrl: "https://store.steampowered.com/app/504230/Celeste/",
        videoUrl: "#" // sustituye por el enlace real de tu vídeo
      },
      2: {
        name: "Stardew Valley",
        summary: "Granja, pesca, minas y vida de pueblo. El juego perfecto para desconectar sin darte cuenta de las horas.",
        difficulty: "facil",
        emoji: "🌾",
        duration: "1:47",
        platform: "tiktok",
        dateAdded: "2026-08-16",
        steamUrl: "https://store.steampowered.com/app/413150/Stardew_Valley/",
        videoUrl: "#"
      },
      3: {
        name: "Hollow Knight",
        summary: "Metroidvania oscuro y precioso en el reino de los insectos. Explorar da tanto miedo como ganas de seguir.",
        difficulty: "media",
        emoji: "🕷️",
        duration: "1:52",
        platform: "tiktok",
        dateAdded: "2026-08-17",
        steamUrl: "https://store.steampowered.com/app/367520/Hollow_Knight/",
        videoUrl: "#"
      }
      // 4: { name:"...", summary:"...", difficulty:"...", emoji:"...", duration:"m:ss",
      //   platform:"tiktok|youtube", dateAdded:"AAAA-MM-DD", steamUrl:"...", videoUrl:"..." },
    };

    // Base de datos SECRETA (solo tuya): juegos ya decididos para días
    // futuros pero que aún no tienen vídeo grabado. No se muestran en la
    // lista pública — solo en la "chuleta secreta" del 🎮 easter egg.
    const plannedGames = {
      4: {
        name: "Hades",
        summary: "Roguelike de mazmorras del inframundo: ritmo endiablado y una historia que se cuenta muriendo una y otra vez.",
        difficulty: "dificil",
        emoji: "🔥",
        steamUrl: "https://store.steampowered.com/app/1145360/Hades/"
      },
      5: {
        name: "Unpacking",
        summary: "Desempaquetas cajas de mudanza y, sin una sola palabra, cuentas una vida entera.",
        difficulty: "facil",
        emoji: "📦",
        steamUrl: "https://store.steampowered.com/app/1135690/Unpacking/"
      }
      // 6: { name: "...", summary: "...", difficulty: "...", emoji: "...", steamUrl: "..." },
    };

    const DIFF_LABELS = {
      facil: "🟢 Fácil",
      media: "🟡 Media",
      dificil: "🔴 Difícil",
      muydificil: "🟣 Muy difícil"
    };

    const PLATFORM_LABELS = { tiktok: "🎵 TikTok", youtube: "▶️ YouTube" };

    // Días por mes de un año no bisiesto (365 días)
    const MONTHS = [
      ["Enero",31],["Febrero",28],["Marzo",31],["Abril",30],["Mayo",31],["Junio",30],
      ["Julio",31],["Agosto",31],["Septiembre",30],["Octubre",31],["Noviembre",30],["Diciembre",31]
    ];

    const totalDays = 365;
    const unlockedDays = Object.keys(completedGames).map(Number);
    const lastUnlocked = unlockedDays.length ? Math.max(...unlockedDays) : 0;
    const nextDay = lastUnlocked + 1;

    function dayCardHTML(day){
      const game = completedGames[day];

      if (game) {
        return `
          <div class="day-card unlocked">
            <div class="day-thumb">${game.emoji || "🎮"}</div>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · 🔓 DESBLOQUEADO</div>
              <h4><a href="${game.steamUrl}" target="_blank" rel="noopener">${game.name} ↗</a></h4>
              <p>${game.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${game.difficulty}">${DIFF_LABELS[game.difficulty] || game.difficulty}</span>
                ${game.duration ? `<span class="diff-chip chip-neutral">⏱️ ${game.duration}</span>` : ''}
                ${game.platform ? `<span class="diff-chip chip-neutral">${PLATFORM_LABELS[game.platform] || game.platform}</span>` : ''}
                <a class="video-link" href="${game.videoUrl}" target="_blank" rel="noopener">▶ Ver vídeo</a>
              </div>
            </div>
          </div>`;
      }

      const isNext = day === nextDay;
      return `
        <div class="day-card locked${isNext ? " next" : ""}">
          <div class="day-thumb">${isNext ? "🟠" : "🔒"}</div>
          <div class="day-info">
            <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · ${isNext ? "🟠 PRÓXIMO" : "🔒 BLOQUEADO"}</div>
            <h4 class="locked-title">${isNext ? "El siguiente en publicarse" : "Todavía sin anunciar"}</h4>
            <p class="lock-note">Se desbloqueará en cuanto suba el vídeo de este día.</p>
          </div>
        </div>`;
    }

    function renderPublic(){
      const container = document.getElementById('monthsContainer');
      let day = 1;
      let html = "";

      MONTHS.forEach(([name, daysInMonth], i) => {
        const start = day;
        const end = day + daysInMonth - 1;
        let monthUnlocked = 0;
        let cards = "";
        for (let d = start; d <= end; d++){
          if (completedGames[d]) monthUnlocked++;
          cards += dayCardHTML(d);
        }
        const openAttr = (nextDay >= start && nextDay <= end) || i === 0 ? " open" : "";
        html += `
          <details class="month"${openAttr}>
            <summary>
              <span>${name}</span>
              <span class="count">${monthUnlocked} / ${daysInMonth} desbloqueados</span>
            </summary>
            <div class="month-body">${cards}</div>
          </details>`;
        day = end + 1;
      });

      container.innerHTML = html;

      const pct = Math.round((unlockedDays.length / totalDays) * 100);
      document.getElementById('progressFill').style.width = pct + "%";
      document.getElementById('progressLabel').textContent =
        `${unlockedDays.length} / ${totalDays} días desbloqueados (${pct}%)`;
    }

    // ──────────────────────────────────────────────────────────
    // Bancos secretos de ideas: "hecha" (✅ verde, en el cuadrado del
    // emoticono) y "descartar" (oscurece la tarjeta), con contador de
    // descartadas, lista desplegable de descartadas y casilla para
    // ocultarlas. Guardado en localStorage por banco (data-idea-id =
    // tipo + índice, o "day-N" en el caso de Retro 365) para poder
    // reutilizar este mismo patrón en bancos de ideas de otras secciones.
    // Declarado aquí (antes de secretDayCardHTML/renderSecret) porque
    // esos ya lo usan al arrancar la página.
    // ──────────────────────────────────────────────────────────
    const IDEA_BANKS_KEY = 'charkuma_idea_banks';
    const HIDE_DISCARDED_KEY = 'charkuma_idea_hide_discarded';

    function loadIdeaBanks(){
      try { return JSON.parse(localStorage.getItem(IDEA_BANKS_KEY)) || {}; }
      catch(e){ return {}; }
    }
    function saveIdeaBanks(banks){
      try { localStorage.setItem(IDEA_BANKS_KEY, JSON.stringify(banks)); }
      catch(e){ /* localStorage no disponible: seguimos sin persistir */ }
    }
    function setIdeaState(bank, id, patch){
      const banks = loadIdeaBanks();
      if (!banks[bank]) banks[bank] = {};
      banks[bank][id] = Object.assign({}, banks[bank][id], patch);
      saveIdeaBanks(banks);
    }

    function loadHideDiscardedPrefs(){
      try { return JSON.parse(localStorage.getItem(HIDE_DISCARDED_KEY)) || {}; }
      catch(e){ return {}; }
    }
    function saveHideDiscardedPrefs(prefs){
      try { localStorage.setItem(HIDE_DISCARDED_KEY, JSON.stringify(prefs)); }
      catch(e){ /* localStorage no disponible: seguimos sin persistir */ }
    }
    function getHideDiscardedPref(bank){
      return !!loadHideDiscardedPrefs()[bank];
    }
    // Llamado directamente desde la casilla "Ocultar descartadas": solo
    // toca una clase CSS, no hace falta volver a pintar toda la lista.
    function setHideDiscardedPref(bank, containerId, checked){
      const prefs = loadHideDiscardedPrefs();
      prefs[bank] = checked;
      saveHideDiscardedPrefs(prefs);
      const container = document.getElementById(containerId);
      if (container) container.classList.toggle('hide-discarded', checked);
    }

    // Fila de la lista desplegable de "descartadas" (con su propio botón
    // para restaurar sin tener que buscar la tarjeta original).
    function discardedListHTML(bank, items){
      if (!items.length) return `<p class="yt-empty" style="margin:0">Nada descartado todavía.</p>`;
      return items.map(it => `
        <div class="discarded-row">
          <span>${it.label}</span>
          <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${bank}','${it.id}')">↩️ Restaurar</button>
        </div>`).join('');
    }

    const IDEA_BANK_RENDERERS = {};

    function toggleIdeaDone(bank, id){
      const state = (loadIdeaBanks()[bank] || {})[id] || {};
      setIdeaState(bank, id, {done: !state.done});
      if (IDEA_BANK_RENDERERS[bank]) IDEA_BANK_RENDERERS[bank]();
    }
    function toggleIdeaDiscard(bank, id){
      const state = (loadIdeaBanks()[bank] || {})[id] || {};
      setIdeaState(bank, id, {discarded: !state.discarded});
      if (IDEA_BANK_RENDERERS[bank]) IDEA_BANK_RENDERERS[bank]();
    }

    // Renderer genérico para un banco secreto "de tipo simple" (sin
    // etiqueta de universo, solo agrupado por tipo) — se usa en los
    // bancos de ideas de HELQUIDGAMES, Charkuma Lab, IA & Experimentos,
    // Creator Tools y Hecho a Mano, para no repetir la misma función
    // cinco veces. cfg = { bank, ideasByType, typeLabels, containerId,
    // summaryId, discardCounterId, discardedCountId, discardedListId,
    // hideCheckboxId }.
    function renderTypedIdeaBank(cfg){
      const container = document.getElementById(cfg.containerId);
      if (!container) return;
      const bankState = loadIdeaBanks()[cfg.bank] || {};

      const openTypes = new Set(
        [...container.querySelectorAll('details.month')].filter(d => d.open).map(d => d.dataset.type)
      );

      const discardedItems = [];
      let html = "";
      Object.keys(cfg.ideasByType).forEach(type => {
        const ideas = cfg.ideasByType[type];
        const emoji = (cfg.typeLabels[type] || '💡').split(' ')[0];
        const rows = ideas.map((idea, i) => {
          const id = `${type}-${i}`;
          const s = bankState[id] || {};
          if (s.discarded) discardedItems.push({id, label: idea});
          return `
          <div class="idea-card${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${cfg.bank}','${id}')"
              title="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}">${s.done ? '✅' : emoji}</button>
            <div class="idea-body">
              <div class="template-head" style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                <span class="type-chip type-${type}">${cfg.typeLabels[type]}</span>
                <span class="count">#${i + 1}</span>
              </div>
              <p style="margin:6px 0 0">${idea}</p>
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${cfg.bank}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`;
        }).join('');
        html += `
          <details class="month" data-type="${type}"${openTypes.has(type) ? ' open' : ''}>
            <summary>
              <span>${cfg.typeLabels[type]}</span>
              <span class="count">${ideas.length} ideas</span>
            </summary>
            <div class="month-body">${rows}</div>
          </details>`;
      });
      container.innerHTML = html;
      container.classList.toggle('hide-discarded', getHideDiscardedPref(cfg.bank));

      const counterEl = document.getElementById(cfg.discardCounterId);
      if (counterEl) counterEl.textContent = `🗑️ ${discardedItems.length} descartada${discardedItems.length === 1 ? '' : 's'}`;
      const discardedCountEl = document.getElementById(cfg.discardedCountId);
      if (discardedCountEl) discardedCountEl.textContent = discardedItems.length;
      const discardedListEl = document.getElementById(cfg.discardedListId);
      if (discardedListEl) discardedListEl.innerHTML = discardedListHTML(cfg.bank, discardedItems);
      const hideCheckbox = document.getElementById(cfg.hideCheckboxId);
      if (hideCheckbox) hideCheckbox.checked = getHideDiscardedPref(cfg.bank);
    }

    // ──────────────────────────────────────────────────────────
    // RETRO 365 — vista secreta (easter egg 🎮)
    // ──────────────────────────────────────────────────────────
    const RETRO_PLANNED_BANK = 'retro365planned';

    // Para los días PUBLICADOS y SIN DECIDIR, el markup no cambia. Para
    // los días DECIDIDOS (📝, aún sin grabar) el cuadrado del emoji hace
    // de botón "confirmar" (✅ verde) y se añade "Descartar" — son juegos
    // ya elegidos que todavía puedes cambiar de opinión sobre ellos.
    function secretDayCardHTML(day, plannedBankState){
      const published = completedGames[day];
      const planned = plannedGames[day];

      if (published) {
        return { html: `
          <div class="day-card unlocked">
            <div class="day-thumb">${published.emoji || "🎮"}</div>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · ✅ PUBLICADO</div>
              <h4><a href="${published.steamUrl}" target="_blank" rel="noopener">${published.name} ↗</a></h4>
              <p>${published.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${published.difficulty}">${DIFF_LABELS[published.difficulty] || published.difficulty}</span>
                ${published.duration ? `<span class="diff-chip chip-neutral">⏱️ ${published.duration}</span>` : ''}
                ${published.platform ? `<span class="diff-chip chip-neutral">${PLATFORM_LABELS[published.platform] || published.platform}</span>` : ''}
                <a class="video-link" href="${published.videoUrl}" target="_blank" rel="noopener">▶ Ver vídeo</a>
              </div>
            </div>
          </div>` };
      }

      if (planned) {
        const id = `day-${day}`;
        const s = (plannedBankState && plannedBankState[id]) || {};
        return {
          html: `
          <div class="day-card planned${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="day-thumb idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${RETRO_PLANNED_BANK}','${id}')"
              title="${s.done ? 'Quitar confirmación' : 'Confirmar que sigues queriendo este juego para este día'}">${s.done ? '✅' : (planned.emoji || "📝")}</button>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · 📝 DECIDIDO (sin grabar)</div>
              <h4><a href="${planned.steamUrl}" target="_blank" rel="noopener">${planned.name} ↗</a></h4>
              <p>${planned.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${planned.difficulty}">${DIFF_LABELS[planned.difficulty] || planned.difficulty}</span>
              </div>
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${RETRO_PLANNED_BANK}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`,
          discarded: !!s.discarded,
          id,
          label: `Día ${String(day).padStart(3,"0")} · ${planned.name}`
        };
      }

      return { html: `<div class="undecided-row">DÍA ${String(day).padStart(3,"0")} · ❔ aún sin decidir</div>` };
    }

    function renderSecret(){
      const container = document.getElementById('secretMonthsContainer');
      const plannedBankState = loadIdeaBanks()[RETRO_PLANNED_BANK] || {};
      let day = 1;
      let html = "";
      let publishedCount = 0, plannedCount = 0;
      const discardedItems = [];

      MONTHS.forEach(([name, daysInMonth]) => {
        const start = day;
        const end = day + daysInMonth - 1;
        let cards = "";
        for (let d = start; d <= end; d++){
          if (completedGames[d]) publishedCount++;
          else if (plannedGames[d]) plannedCount++;
          const card = secretDayCardHTML(d, plannedBankState);
          cards += card.html;
          if (card.discarded) discardedItems.push({id: card.id, label: card.label});
        }
        html += `
          <details class="month">
            <summary>
              <span>${name}</span>
              <span class="count">Días ${start}–${end}</span>
            </summary>
            <div class="month-body">${cards}</div>
          </details>`;
        day = end + 1;
      });

      container.innerHTML = html;
      container.classList.toggle('hide-discarded', getHideDiscardedPref(RETRO_PLANNED_BANK));

      document.getElementById('secretSummary').textContent =
        `✅ ${publishedCount} publicados · 📝 ${plannedCount} decididos sin grabar · ❔ ${totalDays - publishedCount - plannedCount} por decidir`;

      const counterEl = document.getElementById('retroDiscardCounter');
      if (counterEl) counterEl.textContent = `🗑️ ${discardedItems.length} juego${discardedItems.length === 1 ? '' : 's'} descartado${discardedItems.length === 1 ? '' : 's'}`;
      const discardedCountEl = document.getElementById('retroDiscardedCount');
      if (discardedCountEl) discardedCountEl.textContent = discardedItems.length;
      const discardedListEl = document.getElementById('retroDiscardedListBody');
      if (discardedListEl) discardedListEl.innerHTML = discardedListHTML(RETRO_PLANNED_BANK, discardedItems);
      const hideCheckbox = document.getElementById('retroHideDiscarded');
      if (hideCheckbox) hideCheckbox.checked = getHideDiscardedPref(RETRO_PLANNED_BANK);
    }
    IDEA_BANK_RENDERERS[RETRO_PLANNED_BANK] = renderSecret;

    renderPublic();
    renderSecret();

    // ──────────────────────────────────────────────────────────
    // BUSCADOR / FILTRO + "ÚLTIMOS SUBIDOS" (orden inverso: el
    // vídeo más reciente primero, el primero que subiste al final)
    // ──────────────────────────────────────────────────────────
    function renderRecent(){
      const query = document.getElementById('gameSearch').value.trim().toLowerCase();
      const diff = document.getElementById('diffFilter').value;

      const days = Object.keys(completedGames)
        .map(Number)
        .sort((a, b) => b - a) // más reciente (día más alto) primero
        .filter(day => {
          const game = completedGames[day];
          if (diff && game.difficulty !== diff) return false;
          if (query && !game.name.toLowerCase().includes(query)) return false;
          return true;
        });

      const container = document.getElementById('recentList');
      container.innerHTML = days.length
        ? days.map(d => dayCardHTML(d)).join('')
        : `<p class="yt-empty">Ningún juego publicado coincide con la búsqueda.</p>`;
    }

    document.getElementById('gameSearch').addEventListener('input', renderRecent);
    document.getElementById('diffFilter').addEventListener('change', renderRecent);
    renderRecent();

    // ──────────────────────────────────────────────────────────
    // RINCÓN DEL FRIKI — contenido de Marvel / The Boys / Cruce
    // Añade aquí cada vídeo nuevo que subas (ver nota en la página).
    // ──────────────────────────────────────────────────────────
    const geekContent = [
      {
        title: "Reaccionando al tráiler de Los 4 Fantásticos",
        saga: "marvel",
        type: "reaccion",
        date: "2026-08-12",
        summary: "Primeras impresiones en caliente, fotograma a fotograma, del nuevo tráiler.",
        thumbnail: "🎬",
        internalView: "rf-reaccion-4f", reviewed: false
      },
      {
        title: "5 curiosidades que no sabías del traje de Spider-Man",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-08-19",
        summary: "Datos de rodaje y cómic que seguramente se te han pasado por alto.",
        thumbnail: "🕸️",
        internalView: "rf-curiosidades-spiderman", reviewed: false
      },
      {
        title: "La Saga del Multiverso: ¿de verdad ha merecido la pena?",
        saga: "marvel",
        type: "opinion",
        date: "2026-08-24",
        summary: "Repaso honesto a lo que Marvel prometió con el multiverso y lo que realmente ha dado.",
        thumbnail: "🌀",
        internalView: "rf-opinion-multiverso", reviewed: false
      },
      {
        title: "Fancast: ¿quién debería ser el próximo Wolverine?",
        saga: "marvel",
        type: "fancast",
        date: "2026-08-29",
        summary: "Tres candidatos con argumentos a favor, y mi favorito personal razonado.",
        thumbnail: "🐾",
        internalView: "rf-fancast-wolverine", reviewed: false
      },
      {
        title: "The Boys vs Marvel: por qué esta serie me ha enganchado más",
        saga: "boys",
        type: "opinion",
        date: "2026-09-01",
        summary: "Por qué, pese a lo dura que es, The Boys me está gustando más que el rumbo actual de Marvel.",
        thumbnail: "🩸",
        internalView: "rf-boys-vs-marvel", reviewed: false
      },
      {
        title: "Lo que no sabías sobre Homelander",
        saga: "boys",
        type: "curiosidad",
        date: "2026-09-04",
        summary: "Inspiración real y detalles de guion detrás del villano más inquietante de la serie.",
        thumbnail: "🦸",
        internalView: "rf-curiosidades-homelander", reviewed: false
      },
      {
        title: "Homelander vs Thanos: ¿quién ganaría?",
        saga: "cruce",
        type: "batalla",
        date: "2026-09-06",
        summary: "Comparativa de poderes, debilidades y escenario de combate entre los dos.",
        thumbnail: "⚔️",
        internalView: "rf-batalla-homelander-thanos", reviewed: false
      }
      // { title:"...", saga:"marvel|boys|cruce", type:"reaccion|curiosidad|opinion|fancast|batalla",
      //   date:"AAAA-MM-DD", summary:"...", thumbnail:"🎬", videoUrl:"..." },
    ];

    const SAGA_LABELS = { marvel:"🅼 Marvel", boys:"🅱️ The Boys", cruce:"⚔️ Cruce" };
    const TYPE_LABELS = {
      reaccion:"🔴 Reacción", curiosidad:"🟡 Curiosidad", opinion:"🟣 Opinión",
      fancast:"🟢 Fancast", batalla:"🟠 Batalla"
    };

    // ──────────────────────────────────────────────────────────
    // Insignias "Pendiente de revisión" — ahora interactivas: al pulsarlas
    // se marcan como revisadas para siempre (localStorage, este navegador)
    // y desaparecen, sin tener que decírmelo por chat.
    // ──────────────────────────────────────────────────────────
    const REVIEWED_KEY = 'charkuma_reviewed_items';

    function loadReviewedSet(){
      try { return new Set(JSON.parse(localStorage.getItem(REVIEWED_KEY)) || []); }
      catch (e) { return new Set(); }
    }

    function isReviewed(id){
      return loadReviewedSet().has(id);
    }

    function markReviewed(id){
      const set = loadReviewedSet();
      set.add(id);
      try { localStorage.setItem(REVIEWED_KEY, JSON.stringify(Array.from(set))); }
      catch (e) { /* localStorage no disponible: seguimos sin recordarlo, sin romper nada */ }
    }

    function markReviewedAndRerender(id){
      markReviewed(id);
      // Quita al instante cualquier insignia con este id que esté en pantalla
      // ahora mismo (la tarjeta de la lista y/o la de dentro de la página).
      document.querySelectorAll(`[data-review-id="${id}"]`).forEach(el => el.remove());
    }

    // Al cargar la página, oculta las insignias estáticas de las páginas de
    // detalle que ya se marcaron como revisadas en una visita anterior.
    function hideAlreadyReviewedBadges(){
      document.querySelectorAll('.review-badge[data-review-id]').forEach(el => {
        if (isReviewed(el.dataset.reviewId)) el.remove();
      });
    }

    // Insignia reutilizable: marca contenido generado por Claude que el
    // usuario todavía no ha revisado a mano. Pon reviewed:false en cualquier
    // entrada de cualquier array de contenido para que aparezca aquí.
    function reviewBadgeHTML(item){
      if (item.reviewed !== false) return '';
      const rid = item.internalView || item.title;
      if (isReviewed(rid)) return '';
      return `<button type="button" class="review-badge" data-review-id="${rid}"
                onclick="event.stopPropagation(); markReviewedAndRerender('${rid}')"
                title="Pulsa para marcar como revisado">⏳ Pendiente de revisión</button>`;
    }

    function geekCardHTML(item){
      const date = item.date ? new Date(item.date).toLocaleDateString('es-ES', {day:'numeric', month:'short'}) : '';
      const titleLink = item.internalView
        ? `<a href="javascript:void(0)" onclick="showView('${item.internalView}')">${item.title} ↗</a>`
        : `<a href="${item.videoUrl}" target="_blank" rel="noopener">${item.title} ↗</a>`;
      return `
        <div class="geek-card">
          ${reviewBadgeHTML(item)}
          <div class="geek-thumb">${item.thumbnail || "🎬"}</div>
          <div class="geek-info">
            <div class="geek-badges">
              <span class="saga-chip saga-${item.saga}">${SAGA_LABELS[item.saga] || item.saga}</span>
              <span class="type-chip type-${item.type}">${TYPE_LABELS[item.type] || item.type}</span>
              ${date ? `<span class="yt-empty" style="margin:0">${date}</span>` : ''}
            </div>
            <h4>${titleLink}</h4>
            <p>${item.summary}</p>
          </div>
        </div>`;
    }

    function renderGeekContent(){
      const query = document.getElementById('geekSearch').value.trim().toLowerCase();
      const saga = document.getElementById('geekSagaFilter').value;
      const type = document.getElementById('geekTypeFilter').value;

      const items = geekContent
        .filter(item => {
          if (saga && item.saga !== saga) return false;
          if (type && item.type !== type) return false;
          if (query && !item.title.toLowerCase().includes(query)) return false;
          return true;
        })
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

      const container = document.getElementById('geekContentList');
      container.innerHTML = items.length
        ? items.map(geekCardHTML).join('')
        : `<p class="yt-empty">Ningún vídeo coincide con la búsqueda.</p>`;
    }

    document.getElementById('geekSearch').addEventListener('input', renderGeekContent);
    document.getElementById('geekSagaFilter').addEventListener('change', renderGeekContent);
    document.getElementById('geekTypeFilter').addEventListener('change', renderGeekContent);
    renderGeekContent();

    // ──────────────────────────────────────────────────────────
    // Easter egg: banco secreto de 50 ideas de vídeo para Rincón
    // del Friki, agrupadas por los mismos 5 tipos de contenido
    // (10 ideas por tipo). Mismo patrón que la chuleta de Retro 365
    // — pensado para poder repetirse en el resto de secciones.
    // ──────────────────────────────────────────────────────────
    // Orden pensado para canal recién empezado en Rincón del Friki (aún sin
    // vídeos publicados): primero Opinión, para sentar base presentando series
    // y personajes desde cero (nada de dar por visto contenido previo del canal),
    // y Reacción al final, ya que reaccionar pide algo de contexto ya construido.
    // Las ideas están planteadas sobre "lo que esté de actualidad" en cada
    // momento, no sobre tramas concretas ya superadas.
    // Etiqueta de universo/franquicia: a qué IP pertenece cada idea, para
    // poder verlo de un vistazo (Marvel, The Boys, anime...). Se define
    // aquí en general —con Disney y DreamWorks incluidos— para poder
    // reutilizar el mismo mapa de etiquetas en futuros bancos de ideas de
    // otras secciones, aunque en Rincón del Friki hoy solo usemos las que
    // encajan con su temática (Marvel, The Boys, anime, cine geek, cruces).
    const IDEA_UNIVERSE_LABELS = {
      marvel: '🅼 Marvel',
      boys: '🅱️ The Boys',
      anime: '🎌 Anime',
      disney: '🏰 Disney',
      dreamworks: '🐉 DreamWorks',
      cruce: '⚔️ Cruce',
      geek: '🎬 Cine geek'
    };

    const rinconSecretIdeas = {
      opinion: [
        {universe:'boys', text:"Por qué deberías empezar a ver The Boys ya mismo (presentación sin destripar la trama)."},
        {universe:'boys', text:"Homelander, explicado desde cero: por qué es de los villanos más interesantes de la ficción actual."},
        {universe:'marvel', text:"Por qué la peli o serie Marvel del momento merece que le des una oportunidad."},
        {universe:'anime', text:"El anime que está petándolo ahora mismo: por qué recomendarlo desde el primer capítulo."},
        {universe:'boys', text:"Por qué prefiero las historias de superhéroes \"sucias\" (tipo The Boys) a las clásicas, para quien no ha visto ninguna."},
        {universe:'geek', text:"Mi opinión sincera sobre el estreno más comentado del mes, sin dar nada por sabido."},
        {universe:'marvel', text:"Este personaje secundario merece su propio hueco: presentación para quien no lo conoce."},
        {universe:'geek', text:"El villano de moda ahora mismo: quién es y por qué funciona tan bien, explicado desde cero."},
        {universe:'marvel', text:"Por qué esta saga que lleva años corriendo sigue mereciendo la pena empezar hoy."},
        {universe:'cruce', text:"Por dónde empezar en Marvel o en The Boys si no has visto nada todavía (mi ranking)."}
      ],
      curiosidad: [
        {universe:'geek', text:"10 datos curiosos sobre el origen de un personaje que está de actualidad."},
        {universe:'marvel', text:"Cosas que cambia respecto al cómic la serie o película que se está estrenando ahora."},
        {universe:'geek', text:"Easter eggs escondidos en el estreno más comentado del momento."},
        {universe:'geek', text:"Datos curiosos del actor o actriz protagonista de lo que está en boca de todos."},
        {universe:'marvel', text:"El presupuesto real de la escena más comentada del estreno actual, y en qué se fue."},
        {universe:'boys', text:"Diferencias entre el diseño del cómic y el de la adaptación que se estrena ahora."},
        {universe:'marvel', text:"El origen real (mitológico o histórico) que inspiró al personaje del momento."},
        {universe:'boys', text:"Anécdotas de rodaje del estreno más comentado que se han vuelto virales."},
        {universe:'geek', text:"Por qué el villano de la serie o película actual iba a ser muy distinto en el guion original."},
        {universe:'cruce', text:"Curiosidades sobre el crossover o la teoría fan que está circulando ahora mismo."}
      ],
      fancast: [
        {universe:'marvel', text:"Fancast: quién debería interpretar al próximo gran villano que se anuncie."},
        {universe:'boys', text:"Si adaptaran la serie o el cómic que está de moda ahora, este sería mi reparto ideal."},
        {universe:'marvel', text:"Fancast de una heroína clásica que todavía no ha tenido su adaptación."},
        {universe:'geek', text:"Actor infravalorado que merece un papel de superhéroe, con lo que se está rumoreando ahora."},
        {universe:'geek', text:"Si adaptaran este cómic poco conocido, así lo castearía yo."},
        {universe:'marvel', text:"Fancast de villana para la próxima gran saga que se viene."},
        {universe:'anime', text:"Quién debería doblar al personaje de moda en su adaptación live-action."},
        {universe:'boys', text:"El actor \"de otra franquicia\" que encajaría perfecto en el papel que se rumorea ahora."},
        {universe:'marvel', text:"Fancast generacional: quién sustituiría al héroe veterano si se retira, según los rumores actuales."},
        {universe:'boys', text:"Si hicieran serie del equipo secundario que la gente pide en redes, este sería el reparto."}
      ],
      batalla: [
        {universe:'boys', text:"Homelander vs el villano más popular del momento: ¿quién gana en serio?"},
        {universe:'geek', text:"El villano más fuerte físicamente ahora mismo, ranking razonado."},
        {universe:'cruce', text:"The Boys (el equipo) vs los Vengadores en un enfrentamiento directo."},
        {universe:'marvel', text:"Batalla imposible: el héroe cósmico de moda contra un héroe callejero, ¿hay opción?"},
        {universe:'geek', text:"El combate más infravalorado del estreno actual, revisitado y analizado."},
        {universe:'geek', text:"Ranking de los villanos más letales de lo que se está emitiendo ahora mismo."},
        {universe:'cruce', text:"Starlight vs la heroína Marvel del momento — análisis de poderes."},
        {universe:'geek', text:"El plan que un villano actual casi ejecuta a la perfección (y por qué falló)."},
        {universe:'geek', text:"Un equipo de 3 héroes random vs el villano de moda: ¿sobreviven?"},
        {universe:'geek', text:"La pelea que los fans llevan pidiendo en redes ahora mismo y nunca ha pasado."}
      ],
      reaccion: [
        {universe:'geek', text:"Primera reacción al tráiler más reciente que se ha estrenado esta semana."},
        {universe:'marvel', text:"Reaccionando por primera vez a la escena post-créditos más comentada ahora mismo."},
        {universe:'geek', text:"Primera vez viendo la escena más viral de un estreno reciente, reacción real y sin spoilers previos."},
        {universe:'anime', text:"Reaccionando al tráiler de un anime recién anunciado que está petándolo."},
        {universe:'geek', text:"Reaccionando a los primeros minutos del estreno del que todo el mundo habla esta semana."},
        {universe:'geek', text:"Reacción al anuncio de casting más comentado del momento."},
        {universe:'boys', text:"Reaccionando a la escena más bestia del estreno actual (con aviso de contenido)."},
        {universe:'geek', text:"Reaccionando a un tráiler filtrado que se ha vuelto viral esta semana."},
        {universe:'marvel', text:"Reaccionando a la comparación de un traje o diseño que se está comentando en redes."},
        {universe:'boys', text:"Primera reacción a un capítulo suelto de una serie que se está estrenando ahora, sin dar nada por sabido de antes."}
      ]
    };

    function renderRinconSecret(){
      const container = document.getElementById('rfSecretContainer');
      if (!container) return;
      const bank = 'rincon';
      const bankState = loadIdeaBanks()[bank] || {};

      // No perder qué acordeones estaban abiertos al volver a pintar.
      const openTypes = new Set(
        [...container.querySelectorAll('details.month')].filter(d => d.open).map(d => d.dataset.type)
      );

      const discardedItems = [];
      let html = "";
      Object.keys(rinconSecretIdeas).forEach(type => {
        const ideas = rinconSecretIdeas[type];
        const emoji = (TYPE_LABELS[type] || '💡').split(' ')[0];
        const rows = ideas.map((idea, i) => {
          const id = `${type}-${i}`;
          const s = bankState[id] || {};
          if (s.discarded) discardedItems.push({id, label: idea.text});
          return `
          <div class="idea-card${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${bank}','${id}')"
              title="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}">${s.done ? '✅' : emoji}</button>
            <div class="idea-body">
              <div class="template-head" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <span class="type-chip type-${type}">${TYPE_LABELS[type]}</span>
                  <span class="type-chip universe-chip">${IDEA_UNIVERSE_LABELS[idea.universe] || idea.universe}</span>
                </div>
                <span class="count">#${i + 1}</span>
              </div>
              <p style="margin:6px 0 0">${idea.text}</p>
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${bank}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`;
        }).join('');
        html += `
          <details class="month" data-type="${type}"${openTypes.has(type) ? ' open' : ''}>
            <summary>
              <span>${TYPE_LABELS[type]}</span>
              <span class="count">${ideas.length} ideas</span>
            </summary>
            <div class="month-body">${rows}</div>
          </details>`;
      });
      container.innerHTML = html;
      container.classList.toggle('hide-discarded', getHideDiscardedPref(bank));

      const counterEl = document.getElementById('rfDiscardCounter');
      if (counterEl) counterEl.textContent = `🗑️ ${discardedItems.length} descartada${discardedItems.length === 1 ? '' : 's'}`;
      const discardedCountEl = document.getElementById('rfDiscardedCount');
      if (discardedCountEl) discardedCountEl.textContent = discardedItems.length;
      const discardedListEl = document.getElementById('rfDiscardedListBody');
      if (discardedListEl) discardedListEl.innerHTML = discardedListHTML(bank, discardedItems);
      const hideCheckbox = document.getElementById('rfHideDiscarded');
      if (hideCheckbox) hideCheckbox.checked = getHideDiscardedPref(bank);
    }
    IDEA_BANK_RENDERERS.rincon = renderRinconSecret;
    renderRinconSecret();

    // ──────────────────────────────────────────────────────────
    // HELQUIDGAMES · RULETA DEL 11
    // ──────────────────────────────────────────────────────────
    const FORMATION_SLOTS = [
      {id:'gk',  label:'Portero',          category:'portero',   line:'Portero'},
      {id:'lb',  label:'Lateral Izq.',     category:'lateral',   line:'Defensa'},
      {id:'cb1', label:'Defensa Central',  category:'central',   line:'Defensa'},
      {id:'cb2', label:'Defensa Central',  category:'central',   line:'Defensa'},
      {id:'rb',  label:'Lateral Der.',     category:'lateral',   line:'Defensa'},
      {id:'cm1', label:'Centrocampista',   category:'medio',     line:'Centrocampo'},
      {id:'cm2', label:'Centrocampista',   category:'medio',     line:'Centrocampo'},
      {id:'cm3', label:'Centrocampista',   category:'medio',     line:'Centrocampo'},
      {id:'lw',  label:'Extremo Izq.',     category:'extremo',   line:'Ataque'},
      {id:'st',  label:'Delantero Centro', category:'delantero', line:'Ataque'},
      {id:'rw',  label:'Extremo Der.',     category:'extremo',   line:'Ataque'}
    ];

    const CATEGORY_LABELS = {
      portero:'🧤 Portero', lateral:'🏃 Lateral', central:'🛡️ Defensa Central',
      medio:'⚙️ Centrocampista', extremo:'🌀 Extremo', delantero:'⚔️ Delantero Centro'
    };

    const CLUB_POOL = [
      "Real Madrid","FC Barcelona","Atlético de Madrid","Manchester United","Manchester City",
      "Liverpool","Chelsea","Bayern Múnich","Juventus","AC Milan","Inter de Milán","PSG",
      "🇪🇸 España","🇦🇷 Argentina","🇧🇷 Brasil","🇫🇷 Francia","🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra","🇵🇹 Portugal"
    ];

    function freshRuletaState(){
      return {
        teams: [
          { name: "Equipo 1", slots: {}, complete: false },
          { name: "Equipo 2", slots: {}, complete: false }
        ],
        currentTeam: 0,
        usedPlayers: [], // [{display, key}]
        pending: null    // {slotId, slotLabel, category, club}
      };
    }

    // Guardado de partida (localStorage): si recargas la página a mitad de
    // partida, la recuperas tal cual la dejaste.
    const RULETA_STORAGE_KEY = 'charkuma_ruleta11_partida';

    function saveRuletaState(){
      try { localStorage.setItem(RULETA_STORAGE_KEY, JSON.stringify(ruletaState)); }
      catch (e) { /* localStorage no disponible */ }
    }

    function loadRuletaState(){
      try {
        const raw = localStorage.getItem(RULETA_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    }

    function clearRuletaState(){
      try { localStorage.removeItem(RULETA_STORAGE_KEY); }
      catch (e) { /* nada que hacer */ }
    }

    let ruletaState = loadRuletaState() || freshRuletaState();

    function openCategoriesFor(team){
      const openSlots = FORMATION_SLOTS.filter(s => !(s.id in team.slots));
      return [...new Set(openSlots.map(s => s.category))];
    }

    function nextSlotForCategory(team, category){
      return FORMATION_SLOTS.find(s => s.category === category && !(s.id in team.slots));
    }

    function spinRuleta(){
      hideRuletaError();
      hideRuletaWarning();
      const team = ruletaState.teams[ruletaState.currentTeam];
      if (!team || team.complete || ruletaState.pending) return;

      const cats = openCategoriesFor(team);
      if (!cats.length) return;

      const category = cats[Math.floor(Math.random() * cats.length)];
      const club = CLUB_POOL[Math.floor(Math.random() * CLUB_POOL.length)];
      const slot = nextSlotForCategory(team, category);

      ruletaState.pending = { slotId: slot.id, slotLabel: slot.label, category, club };
      playRouletteSound(900);

      document.getElementById('ruletaResult').innerHTML =
        `Te toca: <br><strong>${CATEGORY_LABELS[category]} (${slot.label})</strong> — <strong>${club}</strong>`;
      document.getElementById('ruletaAssign').hidden = false;
      document.getElementById('playerNameInput').value = '';
      document.getElementById('playerNameInput').focus();
      document.getElementById('spinRuletaBtn').disabled = true;
      saveRuletaState();
    }

    function showRuletaError(msg){
      const el = document.getElementById('ruletaError');
      el.textContent = msg;
      el.hidden = false;
    }
    function hideRuletaError(){
      document.getElementById('ruletaError').hidden = true;
    }

    function showRuletaWarning(msg){
      const el = document.getElementById('ruletaWarning');
      el.textContent = msg;
      el.hidden = false;
    }
    function hideRuletaWarning(){
      document.getElementById('ruletaWarning').hidden = true;
    }

    // ── Base de datos de jugadores (autocompletado + aviso, no bloqueante) ──
    // 2313 jugadores reales (leyendas + actuales con rating alto). Si el
    // archivo no carga por lo que sea, el juego sigue funcionando igual,
    // simplemente sin autocompletar ni avisar.
    let playersDB = null; // Set con los nombres conocidos, en minúsculas

    let playersDisplayNames = null; // array de nombres, para filtrar mientras se escribe

    async function loadPlayersDB(){
      try {
        const data = await fetch('players-data.json').then(r => r.json());
        const displayNames = new Set();
        const lookupKeys = new Set();
        data.forEach(p => {
          const display = p.c || `${p.f} ${p.l}`;
          displayNames.add(display);
          lookupKeys.add(display.toLowerCase());
          lookupKeys.add(`${p.f} ${p.l}`.toLowerCase());
        });
        playersDB = lookupKeys;
        playersDisplayNames = Array.from(displayNames).sort();
      } catch (err) {
        playersDB = null;
        playersDisplayNames = null;
      }
    }
    loadPlayersDB();

    // El <datalist> solo se rellena a partir de 3 letras escritas — con
    // miles de jugadores, mostrarlos todos desde la primera letra hacía
    // que el menú de sugerencias fuera enorme y molesto.
    const PLAYERS_AUTOCOMPLETE_MIN_CHARS = 3;
    const PLAYERS_AUTOCOMPLETE_MAX_RESULTS = 50;

    document.getElementById('playerNameInput').addEventListener('input', (e) => {
      const datalist = document.getElementById('playersDatalist');
      const query = e.target.value.trim().toLowerCase();

      if (!playersDisplayNames || query.length < PLAYERS_AUTOCOMPLETE_MIN_CHARS) {
        datalist.innerHTML = '';
        return;
      }

      const matches = playersDisplayNames
        .filter(n => n.toLowerCase().includes(query))
        .slice(0, PLAYERS_AUTOCOMPLETE_MAX_RESULTS);

      datalist.innerHTML = matches.map(n => `<option value="${n.replace(/"/g, '&quot;')}">`).join('');
    });

    function assignPlayer(){
      const pending = ruletaState.pending;
      if (!pending) return;
      const input = document.getElementById('playerNameInput');
      const name = input.value.trim();

      if (!name) { showRuletaError('Escribe un nombre antes de asignar.'); return; }

      const key = name.toLowerCase();
      if (ruletaState.usedPlayers.some(p => p.key === key)) {
        showRuletaError(`"${name}" ya ha sido usado. Elige otro jugador.`);
        return;
      }

      hideRuletaError();
      if (playersDB && !playersDB.has(key)) {
        showRuletaWarning(`⚠️ "${name}" no está en mi base de datos de jugadores, pero se ha asignado igualmente.`);
      } else {
        hideRuletaWarning();
      }

      const team = ruletaState.teams[ruletaState.currentTeam];
      team.slots[pending.slotId] = name;
      ruletaState.usedPlayers.push({ display: name, key });

      if (Object.keys(team.slots).length >= FORMATION_SLOTS.length) team.complete = true;

      ruletaState.pending = null;
      document.getElementById('ruletaAssign').hidden = true;
      document.getElementById('ruletaResult').textContent = 'Pulsa "Girar" para conocer tu posición y club/selección.';
      document.getElementById('spinRuletaBtn').disabled = false;

      advanceTurn();
      renderRuleta();
      saveRuletaState();
    }

    function advanceTurn(){
      const teams = ruletaState.teams;
      if (teams.every(t => t.complete)) return; // partida terminada
      let next = (ruletaState.currentTeam + 1) % teams.length;
      let guard = 0;
      while (teams[next].complete && guard < teams.length) { next = (next + 1) % teams.length; guard++; }
      ruletaState.currentTeam = next;
    }

    function boardHTML(team, index){
      const lines = ['Portero', 'Defensa', 'Centrocampo', 'Ataque'];
      const isActive = index === ruletaState.currentTeam && !team.complete && !ruletaState.teams.every(t => t.complete);
      const linesHTML = lines.map(line => {
        const slots = FORMATION_SLOTS.filter(s => s.line === line);
        return `
          <div class="board-line">
            <div class="board-line-label">${line}</div>
            ${slots.map(s => {
              const filled = team.slots[s.id];
              return `<div class="board-slot ${filled ? '' : 'empty'}">
                <span class="slot-pos">${s.label}</span>
                <span class="slot-name">${filled || '—'}</span>
              </div>`;
            }).join('')}
          </div>`;
      }).join('');

      return `
        <div class="team-board ${isActive ? 'active-team' : ''} ${team.complete ? 'complete' : ''}">
          <h4>${team.name}</h4>
          <div class="team-status">${team.complete ? '✅ Once completo' : (isActive ? '🎯 Tu turno' : 'Esperando turno')}</div>
          ${linesHTML}
        </div>`;
    }

    function renderRuleta(){
      document.getElementById('teamsBoards').innerHTML =
        ruletaState.teams.map((t, i) => boardHTML(t, i)).join('');

      const usedContainer = document.getElementById('usedPlayersList');
      usedContainer.innerHTML = ruletaState.usedPlayers.length
        ? ruletaState.usedPlayers.map(p => `<span class="used-chip">${p.display}</span>`).join('')
        : `<p class="yt-empty">Todavía no se ha usado ningún jugador.</p>`;

      const allComplete = ruletaState.teams.every(t => t.complete);
      const turnEl = document.getElementById('ruletaTurn');
      if (allComplete) {
        turnEl.textContent = '🏆 ¡Partida completada! Pulsa "Reiniciar partida" para jugar otra vez.';
        document.getElementById('spinRuletaBtn').disabled = true;
      } else {
        turnEl.textContent = `Turno de: ${ruletaState.teams[ruletaState.currentTeam].name}`;
      }
    }

    function resetRuleta(){
      const hasProgress = ruletaState.usedPlayers.length > 0;
      if (hasProgress && !confirm('¿Seguro que quieres reiniciar la partida?\n\nSe borrarán las dos alineaciones y la lista de jugadores usados. Esta acción no se puede deshacer.')) {
        return;
      }
      const name0 = document.getElementById('teamNameInput0').value.trim() || 'Equipo 1';
      const name1 = document.getElementById('teamNameInput1').value.trim() || 'Equipo 2';
      ruletaState = freshRuletaState();
      ruletaState.teams[0].name = name0;
      ruletaState.teams[1].name = name1;
      hideRuletaError();
      document.getElementById('ruletaAssign').hidden = true;
      document.getElementById('ruletaResult').textContent = 'Pulsa "Girar" para conocer tu posición y club/selección.';
      document.getElementById('spinRuletaBtn').disabled = false;
      renderRuleta();
      clearRuletaState();
    }

    // Si al cargar la página había una partida guardada, restaura también
    // los nombres de los equipos y, si había un giro a medio resolver, el
    // formulario de asignar jugador.
    function restoreRuletaUI(){
      document.getElementById('teamNameInput0').value = ruletaState.teams[0].name;
      document.getElementById('teamNameInput1').value = ruletaState.teams[1].name;

      if (ruletaState.pending) {
        const p = ruletaState.pending;
        document.getElementById('ruletaResult').innerHTML =
          `Te toca: <br><strong>${CATEGORY_LABELS[p.category]} (${p.slotLabel})</strong> — <strong>${p.club}</strong>`;
        document.getElementById('ruletaAssign').hidden = false;
        document.getElementById('spinRuletaBtn').disabled = true;
      }
    }

    // ──────────────────────────────────────────────────────────
    // HELQUIDGAMES · CALCARTE (Juego 002)
    // Reutiliza getAudioCtx() ya compartido con el sonido de las ruletas.
    // ──────────────────────────────────────────────────────────
    // "cat" = a qué categoría/saga pertenece cada personaje. Se usa para
    // pedirle a la IA una interpretación conceptual en vez del personaje
    // exacto (menos problemas de derechos de autor y menos bloqueos).
    const calcCharacters = [
      // Originales
      {emoji:'⚡', text:'Pikachu', cat:'Pokémon', desc:'criatura pequeña y redondeada de pelaje amarillo, mejillas circulares rojas, orejas puntiagudas con las puntas negras, y una cola larga en forma de rayo'},
      {emoji:'🦖', text:'Godzilla', cat:'kaiju de cine', desc:'reptil bípedo gigante de piel gris-verdosa rugosa, con placas dorsales triangulares irregulares sobresaliendo de la espalda y la cola, hocico alargado con dientes afilados'},
      {emoji:'🎖️', text:'Napoleón', cat:'figura histórica', desc:'hombre bajo de época napoleónica, uniforme militar azul con charreteras doradas, sombrero bicornio negro, una mano metida dentro de la chaqueta'},
      {emoji:'🐙', text:'Un pulpo', cat:'animal'},
      {emoji:'🦩', text:'Un flamenco', cat:'animal'},
      {emoji:'🎧', text:'DJ pingüino', cat:'personaje original', desc:'pingüino de cuerpo redondeado blanco y negro, pico y patas naranjas, con auriculares grandes sobre la cabeza'},
      {emoji:'🦄', text:'Un unicornio', cat:'criatura fantástica'},
      {emoji:'🧛', text:'Drácula', cat:'terror clásico', desc:'hombre pálido y delgado, capa negra de cuello alto, pelo negro peinado hacia atrás, colmillos afilados visibles, esmoquin formal'},
      {emoji:'🐄', text:'Vaca astronauta', cat:'personaje original', desc:'vaca blanca con manchas negras, vistiendo un traje espacial voluminoso y casco transparente de burbuja'},
      {emoji:'🦕', text:'Un dinosaurio', cat:'animal prehistórico'},
      {emoji:'👻', text:'Un fantasma', cat:'personaje original'},
      {emoji:'🤖', text:'Robot jardinero', cat:'personaje original'},
      // Superhéroes
      {emoji:'🕷️', text:'Spider-Man', cat:'superhéroe Marvel', desc:'traje ajustado de cuerpo completo rojo y azul con un patrón de telaraña por todo el cuerpo, ojos grandes blancos en forma de gota en la máscara, emblema de araña en el pecho'},
      {emoji:'🦇', text:'Batman', cat:'superhéroe DC', desc:'hombre musculoso con traje oscuro de cuerpo completo, capa larga, orejas puntiagudas en la capucha, cinturón con utensilios, emblema de murciélago en el pecho'},
      {emoji:'🦸', text:'Superman', cat:'superhéroe DC', desc:'hombre musculoso con traje azul ajustado, capa larga, un símbolo en forma de escudo en el pecho, mechón de pelo oscuro caído sobre la frente, botas altas'},
      {emoji:'🗡️', text:'Wolverine', cat:'superhéroe Marvel', desc:'hombre musculoso y de baja estatura, pelo oscuro peinado hacia arriba en dos puntas, patillas largas, garras metálicas afiladas saliendo de los nudillos'},
      {emoji:'🔫', text:'Deadpool', cat:'superhéroe Marvel', desc:'traje ajustado rojo y negro de cuerpo completo, ojos grandes en forma de almendra en la máscara, dos espadas cruzadas en la espalda, pistoleras en los muslos'},
      {emoji:'💚', text:'Hulk', cat:'superhéroe Marvel', desc:'hombre gigante y extremadamente musculoso de piel verde, pantalones rasgados, expresión de enfado'},
      {emoji:'🔨', text:'Thor', cat:'superhéroe Marvel', desc:'hombre rubio musculoso de melena larga, capa, armadura metálica, sujetando un martillo de cabeza rectangular'},
      {emoji:'🛡️', text:'Capitán América', cat:'superhéroe Marvel', desc:'hombre musculoso con traje ajustado azul, una estrella en el pecho y rayas horizontales en la cintura, escudo circular, casco con alas pequeñas a los lados'},
      {emoji:'🃏', text:'Joker', cat:'villano DC', desc:'hombre delgado de piel muy pálida, pelo verde, sonrisa exageradamente ancha pintada de rojo, traje llamativo de colores vivos'},
      {emoji:'💣', text:'Harley Quinn', cat:'villana DC', desc:'mujer con coletas altas teñidas mitad rojo mitad azul, maquillaje blanco en la cara, ropa a cuadros de arlequín, a veces con un mazo grande'},
      {emoji:'⚔️', text:'Wonder Woman', cat:'superheroína DC', desc:'mujer atlética con una corona en la cabeza, pelo oscuro largo, top y falda cortos con estrellas, brazaletes en las muñecas, un lazo enrollado en la cintura'},
      {emoji:'🏃', text:'Flash', cat:'superhéroe DC', desc:'hombre delgado con traje ajustado rojo de cuerpo completo, un rayo amarillo en el pecho y a los lados de la cabeza'},
      {emoji:'🔱', text:'Aquaman', cat:'superhéroe DC', desc:'hombre musculoso de pelo largo, traje ajustado con textura de escamas, a veces sujetando un tridente'},
      {emoji:'🍥', text:'Naruto', cat:'protagonista de anime', desc:'chico joven de pelo rubio puntiagudo, tres marcas finas a cada lado de las mejillas, banda en la frente con una placa metálica, chaqueta naranja y negra'},
      {emoji:'🐉', text:'Goku', cat:'protagonista de anime', desc:'hombre joven de pelo oscuro muy puntiagudo y desordenado hacia arriba, uniforme de artes marciales naranja con cinturón, camiseta azul debajo'},
      // Cultura geek
      {emoji:'🍄', text:'Mario', cat:'personaje de videojuego', desc:'hombre bajo y rechoncho con bigote grueso oscuro, gorra roja con una letra mayúscula, camisa roja de manga larga, mono azul, guantes blancos'},
      {emoji:'💍', text:'Gandalf', cat:'personaje de fantasía', desc:'anciano alto de barba y pelo largo blanco, sombrero puntiagudo, túnica larga hasta los pies, sujetando un bastón de madera'},
      {emoji:'🖤', text:'Darth Vader', cat:'personaje de Star Wars', desc:'figura alta vestida completamente de negro, casco redondeado con visera triangular, capa larga, respirador metálico en el pecho'},
      {emoji:'🍩', text:'Homer Simpson', cat:'personaje de serie animada', desc:'hombre calvo con dos mechones de pelo, piel amarilla, camisa blanca de manga corta, pantalones azules, barriga prominente'},
      {emoji:'🧪', text:'Rick Sanchez', cat:'personaje de serie animada', desc:'anciano delgado de pelo azulado puntiagudo y despeinado, bata de laboratorio, camisa azul claro debajo'},
      {emoji:'🤡', text:'Pennywise', cat:'villano de terror', desc:'payaso con pelo de color vivo a los lados de la cabeza calva, traje con volantes grandes en el cuello y las muñecas, sonrisa muy amplia'},
      {emoji:'🐻', text:'Chewbacca', cat:'personaje de Star Wars', desc:'criatura peluda muy alta cubierta de pelo largo marrón por todo el cuerpo, sin ropa, a veces con una cartuchera cruzada en el pecho'},
      {emoji:'🟢', text:'Shrek', cat:'personaje de película animada', desc:'ogro grande y musculoso de piel verde, orejas puntiagudas grandes, chaleco marrón sin camisa'},
      {emoji:'🦔', text:'Sonic', cat:'personaje de videojuego', desc:'erizo azul antropomórfico con púas hacia atrás, guantes blancos, zapatillas rojas con una franja blanca, ojos verdes grandes'},
      {emoji:'🪖', text:'Master Chief', cat:'personaje de videojuego', desc:'figura humana alta con armadura espacial voluminosa oscura, casco dorado reflectante sin rasgos faciales visibles'},
      {emoji:'👽', text:'Yoda', cat:'personaje de Star Wars', desc:'criatura pequeña de piel verde arrugada, orejas puntiagudas muy grandes y largas, pocos mechones de pelo blanco, túnica sencilla, a veces con bastón'},
      // Personajes femeninos icónicos
      {emoji:'🪄', text:'Hermione Granger', cat:'personaje de fantasía', desc:'chica joven de pelo castaño muy rizado y abundante, túnica escolar oscura con corbata a rayas, sujetando una varita'},
      {emoji:'❄️', text:'Elsa', cat:'princesa Disney', desc:'mujer joven de pelo rubio platino recogido en una trenza lateral larga, vestido largo brillante con capa semitransparente, corona pequeña'},
      {emoji:'🌸', text:'Mulan', cat:'princesa Disney', desc:'mujer joven asiática con pelo oscuro largo recogido, armadura militar tradicional o vestido de seda tradicional'},
      {emoji:'🌙', text:'Sailor Moon', cat:'heroína de anime', desc:'chica joven de pelo rubio muy largo recogido en dos coletas altas con moños, uniforme tipo marinero con falda corta y lazo, tiara con una joya en la frente'},
      {emoji:'🕵️‍♀️', text:'Velma', cat:'personaje de serie animada', desc:'chica con pelo corto castaño tipo melena, gafas grandes de pasta, jersey de cuello alto, falda'},
      {emoji:'🎷', text:'Lisa Simpson', cat:'personaje de serie animada', desc:'niña con pelo amarillo puntiagudo en forma de estrella, piel amarilla, vestido rojo, collar de perlas'},
      {emoji:'🖤', text:'Wednesday Addams', cat:'personaje de TV/cine', desc:'chica joven de piel pálida, pelo oscuro largo liso recogido en dos trenzas, expresión seria, vestido oscuro con cuello blanco redondo'},
      {emoji:'👑', text:'Princesa Peach', cat:'personaje de videojuego', desc:'mujer rubia con pelo largo recogido bajo una corona pequeña, vestido rosa largo con guantes blancos hasta el codo, pendientes'},
      {emoji:'🧡', text:'Merida', cat:'princesa Disney/Pixar', desc:'chica joven con una melena rizada y muy voluminosa de color rojizo intenso, vestido verde medieval, arco y flechas'},
      // Series infantiles (diseños simples, ideales para calcar)
      {emoji:'🐷', text:'Peppa Pig', cat:'personaje infantil animado', desc:'cerdita rosa de cuerpo redondeado hecho con formas geométricas muy simples, cara siempre de perfil con los dos ojos juntos a un lado, vestido rojo sencillo'},
      {emoji:'👦', text:'George Pig', cat:'personaje infantil animado', desc:'cerdito pequeño rosa, más bajo que su hermana, sujetando un dinosaurio de peluche verde, ropa azul sencilla'},
      {emoji:'🐶', text:'Bluey', cat:'personaje infantil animado', desc:'perrita cachorra de color azul con manchas más oscuras, orejas largas caídas, cuerpo redondeado y sencillo, sin ropa'},
      {emoji:'🧽', text:'Bob Esponja', cat:'personaje infantil animado', desc:'esponja amarilla rectangular con agujeros, ojos azules grandes y saltones, pantalón corto marrón, camisa blanca con corbata roja'},
      {emoji:'⭐', text:'Patricio Estrella', cat:'personaje infantil animado', desc:'estrella de mar rosa de cinco puntas, ojos pequeños muy separados, sonrisa ancha, pantalón corto con estampado floral'},
      {emoji:'🔵', text:'Doraemon', cat:'personaje infantil animado', desc:'robot gato azul redondeado sin orejas visibles, cara blanca redonda, nariz roja pequeña, collar con cascabel, bolsillo delantero blanco'},
      {emoji:'🎀', text:'Hello Kitty', cat:'personaje infantil animado', desc:'gatita blanca con cabeza redonda grande, sin boca dibujada, lazo grande a un lado de la cabeza junto a la oreja, ojos pequeños ovalados'},
      {emoji:'🧸', text:'Winnie the Pooh', cat:'personaje infantil animado', desc:'osito redondeado de color dorado/amarillento, sin pantalones, camiseta corta que no cubre la barriga'},
      {emoji:'🗺️', text:'Dora la Exploradora', cat:'personaje infantil animado', desc:'niña de pelo oscuro corto tipo melena, camiseta de manga corta, pantalón corto, mochila a la espalda'},
      {emoji:'🐤', text:'Piolín', cat:'personaje infantil animado', desc:'pájaro amarillo pequeño de cuerpo redondeado, cabeza grande con ojos enormes, patas finas, sin plumas puntiagudas visibles'},
      {emoji:'🐰', text:'Miffy', cat:'personaje infantil animado', desc:'conejita blanca de cabeza redonda muy simple, dos orejas rectas hacia arriba, una X pequeña como boca, sin nariz definida, vestido de un solo color liso'},
      // Animales
      {emoji:'🐘', text:'Un elefante', cat:'animal'},
      {emoji:'🦁', text:'Un león', cat:'animal'},
      {emoji:'🦈', text:'Un tiburón', cat:'animal'},
      {emoji:'🐨', text:'Un koala', cat:'animal'},
      {emoji:'🐼', text:'Un panda', cat:'animal'},
      {emoji:'🐒', text:'Un mono', cat:'animal'},
      {emoji:'🐯', text:'Un tigre', cat:'animal'},
      {emoji:'🦎', text:'Un camaleón', cat:'animal'},
      {emoji:'🐸', text:'Una rana', cat:'animal'},
      {emoji:'🐻‍❄️', text:'Un oso polar', cat:'animal'},
      {emoji:'🦘', text:'Un canguro', cat:'animal'},
      {emoji:'🦔', text:'Un erizo', cat:'animal'},
      {emoji:'🐳', text:'Una ballena', cat:'animal'},
      {emoji:'🦉', text:'Un búho', cat:'animal'},
      {emoji:'🐊', text:'Un cocodrilo', cat:'animal'}
    ];
    const calcActions = [
      // Originales
      {emoji:'🧇', text:'haciendo un gofre'},
      {emoji:'🥁', text:'tocando la batería'},
      {emoji:'🌮', text:'comiendo tacos'},
      {emoji:'🌿', text:'regando plantas'},
      {emoji:'🧘', text:'haciendo yoga'},
      {emoji:'⛸️', text:'patinando'},
      {emoji:'🎣', text:'pescando'},
      {emoji:'♟️', text:'jugando al ajedrez'},
      {emoji:'🛹', text:'en monopatín'},
      {emoji:'💃', text:'bailando salsa'},
      {emoji:'🎨', text:'pintando un cuadro'},
      {emoji:'🏄', text:'haciendo surf'},
      // Más variadas / con puntito gamberro (sin nada explícito)
      {emoji:'🎉', text:'en una fiesta descontrolada'},
      {emoji:'🍺', text:'brindando con una jarra de cerveza'},
      {emoji:'🤕', text:'con una resaca tremenda'},
      {emoji:'👊', text:'liándola parda en un bar'},
      {emoji:'🚨', text:'huyendo de la policía'},
      {emoji:'🎰', text:'perdiendo hasta la camisa en el casino'},
      {emoji:'🃏', text:'haciendo trampas al póker'},
      {emoji:'🕺', text:'bailando reggaetón sin vergüenza'},
      {emoji:'🍕', text:'atracándose de pizza a las 4 de la mañana'},
      {emoji:'🧨', text:'provocando el caos'},
      {emoji:'🤮', text:'vomitando después de una fiesta'},
      {emoji:'💥', text:'destrozando una ciudad entera'},
      {emoji:'🥊', text:'noqueando a alguien de un puñetazo'},
      {emoji:'🚬', text:'fumando un puro como un gánster'},
      {emoji:'🛒', text:'robando en el supermercado'},
      {emoji:'😱', text:'gritando de pánico'},
      {emoji:'🕶️', text:'haciéndose el chulo con gafas de sol'},
      {emoji:'🎤', text:'cantando fatal en un karaoke'},
      // Cotidianas
      {emoji:'😴', text:'durmiendo la siesta'},
      {emoji:'📚', text:'estudiando para un examen'},
      {emoji:'🛒', text:'haciendo la compra'},
      {emoji:'🐕', text:'paseando al perro'},
      {emoji:'🍽️', text:'lavando los platos'},
      {emoji:'🚗', text:'conduciendo a toda pastilla'},
      {emoji:'🚲', text:'montando en bici'},
      {emoji:'📖', text:'leyendo un libro'},
      {emoji:'☕', text:'tomando un café bien cargado'},
      {emoji:'📓', text:'escribiendo su diario secreto'},
      {emoji:'🧳', text:'haciendo la maleta a última hora'},
      {emoji:'📺', text:'tirado en el sofá viendo la tele'},
      {emoji:'👕', text:'planchando la ropa'},
      {emoji:'🎂', text:'horneando una tarta'},
      {emoji:'🎮', text:'jugando a videojuegos hasta las tantas'},
      {emoji:'🏋️', text:'sudando en el gimnasio'},
      {emoji:'🎸', text:'tocando la guitarra eléctrica'},
      {emoji:'🧗', text:'escalando una montaña'},
      {emoji:'🏊', text:'nadando en la piscina'},
      {emoji:'🏃‍♂️', text:'corriendo una maratón'},
      // Absurdas
      {emoji:'💡', text:'discutiendo con una farola'},
      {emoji:'🏃', text:'persiguiendo su propia sombra'},
      {emoji:'🪽', text:'intentando volar sin ningún éxito'},
      {emoji:'🪴', text:'hablando con las plantas'},
      {emoji:'🔑', text:'buscando las llaves como un loco'},
      {emoji:'🤸', text:'tropezando con sus propios pies'},
      {emoji:'🪞', text:'haciendo muecas raras al espejo'},
      {emoji:'🖨️', text:'peleándose con la impresora'},
      {emoji:'☁️', text:'gritándole a las nubes'},
      {emoji:'🕺', text:'bailando solo en su cuarto'},
      // Más gamberras
      {emoji:'🎱', text:'jugando al billar en un bar cutre'},
      {emoji:'🐎', text:'apostándolo todo en una carrera de caballos'},
      {emoji:'✈️', text:'montando un numerito en el aeropuerto'},
      {emoji:'💿', text:'rompiendo la pista de baile'},
      {emoji:'🟨', text:'discutiendo a gritos con el árbitro'},
      {emoji:'🎫', text:'colándose en un concierto'},
      {emoji:'🏨', text:'destrozando la habitación de un hotel'},
      {emoji:'🎊', text:'organizando una fiesta que acaba fatal'},
      {emoji:'📺', text:'peleándose por el mando de la tele'},
      {emoji:'😈', text:'planeando su venganza'},
      // Frikis
      {emoji:'🐲', text:'luchando contra el jefe final'},
      {emoji:'🍿', text:'maratoneando una serie entera'},
      {emoji:'🎭', text:'haciendo cosplay en una convención'}
    ];

    const CALC_ITEM_HEIGHT = 88;
    const CALC_REPEAT = 8;

    function calcBuildReel(trackId, items){
      const track = document.getElementById(trackId);
      let html = '';
      for (let r = 0; r < CALC_REPEAT; r++){
        items.forEach(it => { html += `<li><span>${it.emoji} ${it.text}</span></li>`; });
      }
      track.innerHTML = html;
      return {track, items, n: items.length};
    }

    const calcCharReel = calcBuildReel('calcReelChar', calcCharacters);
    const calcActionReel = calcBuildReel('calcReelAction', calcActions);

    const calcReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calcReduceMotion) {
      calcCharReel.track.style.transitionDuration = '0.6s';
      calcActionReel.track.style.transitionDuration = '0.6s';
    }
    const calcSpinDuration = calcReduceMotion ? 650 : 2150;

    function calcSpinReel(reel){
      const n = reel.n;
      const targetIndex = Math.floor(Math.random() * n);
      const base = n;
      reel.track.style.transition = 'none';
      reel.track.style.transform = `translateY(-${base * CALC_ITEM_HEIGHT}px)`;
      void reel.track.offsetHeight;
      reel.track.style.transition = '';
      const extraLoops = 3 + Math.floor(Math.random() * 2);
      const finalIndex = base + extraLoops * n + targetIndex;
      requestAnimationFrame(() => {
        reel.track.style.transform = `translateY(-${finalIndex * CALC_ITEM_HEIGHT}px)`;
      });
      return reel.items[targetIndex];
    }

    let calcSoundEnabled = true;

    function playCalcLeverClunk(){
      if (!calcSoundEnabled) return;
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.16);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }

    function playCalcResultChime(){
      if (!calcSoundEnabled) return;
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const start = now + i * 0.09;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    }

    document.getElementById('calcSoundToggle').addEventListener('click', () => {
      calcSoundEnabled = !calcSoundEnabled;
      const btn = document.getElementById('calcSoundToggle');
      btn.textContent = calcSoundEnabled ? '🔊' : '🔇';
      btn.setAttribute('aria-pressed', String(!calcSoundEnabled));
    });

    let calcCurrentPrompt = '';
    let calcIsSpinning = false;

    function runCalcSpin(){
      if (calcIsSpinning) return;
      calcIsSpinning = true;
      playCalcLeverClunk();
      const leverBtn = document.getElementById('calcLeverBtn');
      const resultCard = document.getElementById('calcResultCard');
      leverBtn.classList.add('pulled');
      resultCard.hidden = true;
      const chosenChar = calcSpinReel(calcCharReel);
      const chosenAction = calcSpinReel(calcActionReel);
      setTimeout(() => { leverBtn.classList.remove('pulled'); }, 220);
      setTimeout(() => {
        document.getElementById('calcResultText').textContent = `${chosenChar.emoji} ${chosenChar.text} ${chosenAction.emoji} ${chosenAction.text}`;
        const calcCatClause = chosenChar.cat ? ` de tipo "${chosenChar.cat}"` : '';
        const calcDescClause = chosenChar.desc
          ? ` En vez de basarte en el nombre o el diseño oficial registrado, básate solo en esta descripción física para dibujarlo: ${chosenChar.desc}. Estos son los rasgos que más deben destacar y reconocerse en el dibujo.`
          : '';
        calcCurrentPrompt = `Genérame una imagen: tu propia interpretación conceptual, NO una réplica exacta con derechos de autor, de un personaje${calcCatClause} inspirado en "${chosenChar.text}", ${chosenAction.text}.${calcDescClause} No copies el diseño oficial al detalle ni reproduzcas ninguna marca registrada: haz tu propia versión genérica reconocible del concepto, evitando cualquier interés de terceros sobre el contenido. Debe ser un boceto sencillo en blanco y negro. Estilo de dibujo: minimalista tipo chibi/Sanrio (como Hello Kitty o Miffy) — proporciones simplificadas, formas grandes y redondeadas, el mínimo número de líneas posible, sin patrones ni texturas en la ropa ni el cuerpo, lo más fácil posible de calcar y colorear a mano. Instrucciones: solo líneas de contorno limpias y gruesas, sin sombras, sin color. El fondo debe tener muy pocos elementos (uno o dos como máximo) relacionados con la escena, pero grandes, simples y dibujados con líneas igual de gruesas y limpias que el personaje — nada de detalles pequeños, texturas ni fondos recargados que compliquen calcarlo; el resto del espacio debe quedar en blanco. Estilo dibujo para colorear tipo "coloring book", pensado para calcarlo fácilmente a mano. Créala directamente, sin hacerme preguntas antes.`;
        document.getElementById('calcPromptField').value = calcCurrentPrompt;
        resultCard.hidden = false;
        playCalcResultChime();
        calcIsSpinning = false;
      }, calcSpinDuration);
    }

    document.getElementById('calcLeverBtn').addEventListener('click', runCalcSpin);
    document.getElementById('calcLeverBtn').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); runCalcSpin(); }
    });

    function flashCalcCopyLabel(label){
      const btn = document.getElementById('calcCopyBtn');
      const original = '📋 Copiar prompt para la IA';
      btn.textContent = label;
      setTimeout(() => { btn.textContent = original; }, 1600);
    }

    document.getElementById('calcCopyBtn').addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard API no disponible');
        await navigator.clipboard.writeText(calcCurrentPrompt);
        flashCalcCopyLabel('¡Copiado!');
      } catch (err) {
        try {
          const field = document.getElementById('calcPromptField');
          field.focus();
          field.select();
          field.setSelectionRange(0, field.value.length);
          if (document.execCommand('copy')) { flashCalcCopyLabel('¡Copiado!'); return; }
        } catch (err2) { /* seguimos al aviso manual */ }
        flashCalcCopyLabel('Mantén pulsado el texto de arriba y copia');
      }
    });

    // ──────────────────────────────────────────────────────────
    // Botón "Copiar" genérico reutilizable (IA & Experimentos)
    // ──────────────────────────────────────────────────────────
    function wireCopyButton(buttonId, fieldId, defaultLabel){
      const btn = document.getElementById(buttonId);
      const field = document.getElementById(fieldId);
      if (!btn || !field) return;

      function flashLabel(label){
        btn.textContent = label;
        setTimeout(() => { btn.textContent = defaultLabel; }, 1600);
      }

      btn.addEventListener('click', async () => {
        const text = field.value;
        try {
          if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard API no disponible');
          await navigator.clipboard.writeText(text);
          flashLabel('¡Copiado!');
        } catch (err) {
          try {
            field.removeAttribute('disabled');
            field.focus();
            field.select();
            field.setSelectionRange(0, text.length);
            if (document.execCommand('copy')) { flashLabel('¡Copiado!'); return; }
          } catch (err2) { /* seguimos al aviso manual */ }
          flashLabel('Mantén pulsado el texto de arriba y copia');
        }
      });
    }

    wireCopyButton('copyReaccionBtn', 'promptReaccionBox', '📋 Copiar prompt');
    wireCopyButton('copyDiscordBtn', 'discordPayloadBox', '📋 Copiar ejemplo');
    wireCopyButton('copyMiniaturaBtn', 'promptMiniaturaBox', '📋 Copiar prompt');

    // ──────────────────────────────────────────────────────────
    // CHARKUMA LAB — proyectos, herramientas y bitácora
    // ──────────────────────────────────────────────────────────
    const labContent = [
      {
        title: "Rediseño del overlay de streaming",
        type: "proyecto",
        date: "2026-08-20",
        summary: "Nueva capa gráfica para los directos: alertas, cámara y marcador a juego con la estética de la web.",
        thumbnail: "🎨",
        internalView: "lab-overlay-redesign", reviewed: false
      },
      {
        title: "Generador de miniaturas con IA",
        type: "herramienta",
        date: "2026-08-28",
        summary: "Prompt afinado para sacar miniaturas de vídeo con look consistente en un par de intentos.",
        thumbnail: "🤖",
        internalView: "lab-generador-miniaturas", reviewed: false
      },
      {
        title: "Bitácora: probando ComfyUI por primera vez",
        type: "bitacora",
        date: "2026-09-02",
        summary: "Primeras impresiones montando flujos de generación de imagen con nodos. Va para largo.",
        thumbnail: "📓",
        internalView: "lab-comfyui", reviewed: false
      },
      {
        title: "Bot de Discord para el servidor de CHARKUMA",
        type: "proyecto",
        date: "2026-09-04",
        summary: "Comandos básicos, roles automáticos y aviso cuando sube un vídeo nuevo.",
        thumbnail: "🕹️",
        internalView: "lab-bot-discord", reviewed: false
      }
      // { title:"...", type:"proyecto|herramienta|bitacora", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🧪", link:"..." },
    ];

    const LAB_TYPE_LABELS = {
      proyecto: '🟣 Proyecto', herramienta: '🟢 Herramienta', bitacora: '🟡 Bitácora'
    };

    function labCardHTML(item){
      const date = new Date(item.date).toLocaleDateString('es-ES', {day:'numeric', month:'short', year:'numeric'});
      const titleLink = item.internalView
        ? `<a href="javascript:void(0)" onclick="showView('${item.internalView}')">${item.title} ↗</a>`
        : `<a href="${item.link}" target="_blank" rel="noopener">${item.title} ↗</a>`;
      return `
        <div class="geek-card">
          ${reviewBadgeHTML(item)}
          <div class="geek-thumb">${item.thumbnail || "🧪"}</div>
          <div class="geek-info">
            <div class="geek-badges">
              <span class="type-chip type-${item.type}">${LAB_TYPE_LABELS[item.type] || item.type}</span>
              <span class="yt-empty" style="margin:0">${date}</span>
            </div>
            <h4>${titleLink}</h4>
            <p>${item.summary}</p>
          </div>
        </div>`;
    }

    function renderLabContent(){
      const query = document.getElementById('labSearch').value.trim().toLowerCase();
      const type = document.getElementById('labTypeFilter').value;

      const items = labContent
        .filter(item => (!type || item.type === type) && (!query || item.title.toLowerCase().includes(query)))
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // más reciente primero

      const container = document.getElementById('labContentList');
      container.innerHTML = items.length
        ? items.map(labCardHTML).join('')
        : `<p class="yt-empty">Nada por aquí todavía con esos filtros.</p>`;
    }

    document.getElementById('labSearch').addEventListener('input', renderLabContent);
    document.getElementById('labTypeFilter').addEventListener('change', renderLabContent);
    renderLabContent();

    // ──────────────────────────────────────────────────────────
    // Constructor genérico de tarjetas "tipo + fecha + título + resumen"
    // reutilizado por IA & Experimentos, Creator Tools y Hecho a Mano.
    // ──────────────────────────────────────────────────────────
    function genericCardHTML(item, labelsMap, colorsMap){
      const date = new Date(item.date).toLocaleDateString('es-ES', {day:'numeric', month:'short', year:'numeric'});
      const titleLink = item.internalView
        ? `<a href="javascript:void(0)" onclick="showView('${item.internalView}')">${item.title} ↗</a>`
        : `<a href="${item.link}" target="_blank" rel="noopener">${item.title} ↗</a>`;
      return `
        <div class="geek-card">
          ${reviewBadgeHTML(item)}
          <div class="geek-thumb">${item.thumbnail || "🧪"}</div>
          <div class="geek-info">
            <div class="geek-badges">
              <span class="type-chip ${colorsMap[item.type] || 'chip-purple'}">${labelsMap[item.type] || item.type}</span>
              <span class="yt-empty" style="margin:0">${date}</span>
            </div>
            <h4>${titleLink}</h4>
            <p>${item.summary}</p>
          </div>
        </div>`;
    }

    function setupFilterableFeed(cfg){
      const searchEl = document.getElementById(cfg.searchId);
      const typeEl = document.getElementById(cfg.typeId);
      const listEl = document.getElementById(cfg.listId);

      function render(){
        const query = searchEl.value.trim().toLowerCase();
        const type = typeEl.value;
        const items = cfg.data
          .filter(item => (!type || item.type === type) && (!query || item.title.toLowerCase().includes(query)))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        listEl.innerHTML = items.length
          ? items.map(item => genericCardHTML(item, cfg.labels, cfg.colors)).join('')
          : `<p class="yt-empty">Nada por aquí todavía con esos filtros.</p>`;
      }

      searchEl.addEventListener('input', render);
      typeEl.addEventListener('change', render);
      render();
    }

    // ── IA & Experimentos ──
    // "reviewed:false" = contenido que ha generado Claude y que Charkuma
    // todavía no ha revisado/afinado a mano. Quítalo (o ponlo a true) en
    // cuanto le hayas dado el visto bueno a esa entrada.
    const iaContent = [
      {
        title: "Prompt para miniaturas con estética CHARKUMA",
        type: "prompt", date: "2026-08-15",
        summary: "La receta de prompt que uso para sacar miniaturas con el mismo estilo morado/naranja de la web.",
        thumbnail: "🎨", internalView: "ia-prompt-miniaturas", reviewed: false
      },
      {
        title: "Aviso automático a Discord cuando subo vídeo",
        type: "automatizacion", date: "2026-08-25",
        summary: "Automatización sencilla que avisa al servidor en cuanto se publica un vídeo nuevo.",
        thumbnail: "⚙️", internalView: "ia-auto-discord", reviewed: false
      },
      {
        title: "Generando personajes retro con IA",
        type: "visual", date: "2026-09-01",
        summary: "Pruebas de generación de imagen para ilustrar juegos clásicos de Retro 365.",
        thumbnail: "🖼️", internalView: "ia-visual-retro", reviewed: false
      },
      {
        title: "Vídeo generado con IA: intro alternativa del canal",
        type: "video", date: "2026-09-03",
        summary: "Prueba de una intro corta hecha con generación de vídeo, comparada con la actual.",
        thumbnail: "🎬", internalView: "ia-video-intro", reviewed: false
      },
      {
        title: "Prompt para guiones cortos de reacción",
        type: "prompt", date: "2026-09-05",
        summary: "Plantilla de prompt para estructurar rápido un guion de reacción antes de grabar.",
        thumbnail: "📝", internalView: "ia-prompt-reaccion", reviewed: false
      }
      // { title:"...", type:"prompt|automatizacion|visual|video", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🤖", link:"..." },  // "link" para externo, o "internalView" para página propia
      // Añade reviewed:false si lo genera Claude y aún no lo has revisado.
    ];
    const IA_LABELS = { prompt:'🎨 Prompt', automatizacion:'⚙️ Automatización', visual:'🖼️ Generación visual', video:'🎬 Generación vídeo' };
    const IA_COLORS = { prompt:'chip-purple', automatizacion:'chip-green', visual:'chip-yellow', video:'chip-orange' };

    // ── Creator Tools ──
    const creatorContent = [
      {
        title: "Overlay de directo CHARKUMA",
        type: "overlay", date: "2026-08-10",
        summary: "Capa gráfica completa para streaming: alertas, cámara y marcador a juego con la web.",
        thumbnail: "🎥", internalView: "ct-overlay-directo", reviewed: false
      },
      {
        title: "Escenas de OBS para sesiones retro",
        type: "obs", date: "2026-08-22",
        summary: "Configuración de escenas y transiciones pensada para grabar Retro 365.",
        thumbnail: "🎛️", internalView: "ct-obs-retro", reviewed: false
      },
      {
        title: "Plantilla de miniatura para Rincón del Friki",
        type: "plantilla", date: "2026-09-03",
        summary: "Plantilla editable para sacar miniaturas de vídeos de Marvel/The Boys en minutos.",
        thumbnail: "📐", internalView: "ct-plantilla-friki", reviewed: false
      },
      {
        title: "Pack de stingers y sonidos de transición",
        type: "recurso", date: "2026-09-04",
        summary: "Efectos de sonido cortos para cambios de escena, hechos a medida para el canal.",
        thumbnail: "🔌", internalView: "ct-stingers", reviewed: false
      },
      {
        title: "Overlay especial para maratones de Retro 365",
        type: "overlay", date: "2026-09-06",
        summary: "Variante del overlay principal con contador de días y progreso del reto en pantalla.",
        thumbnail: "🎥", internalView: "ct-overlay-retro365", reviewed: false
      }
      // { title:"...", type:"overlay|obs|plantilla|recurso", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🖥️", link:"..." },
    ];
    const CREATOR_LABELS = { overlay:'🎥 Overlay', obs:'🎛️ Config OBS', plantilla:'📐 Plantilla', recurso:'🔌 Recurso' };
    const CREATOR_COLORS = { overlay:'chip-purple', obs:'chip-green', plantilla:'chip-yellow', recurso:'chip-orange' };

    // ── Hecho a Mano ──
    const hechoContent = [
      {
        title: "Alfombra tufting del logo de CHARKUMA",
        type: "tufting", date: "2026-08-05",
        summary: "Primera pieza grande: el lagarto de la marca hecho alfombra, punto por punto.",
        thumbnail: "🧶", internalView: "hm-alfombra-logo", reviewed: false
      },
      {
        title: "Parche bordado retro gamer",
        type: "diseno", date: "2026-08-18",
        summary: "Diseño de parche inspirado en cartuchos de consola clásicos.",
        thumbnail: "🎨", internalView: "hm-parche-retro", reviewed: false
      },
      {
        title: "Figura impresa en 3D de mascota",
        type: "objeto", date: "2026-08-30",
        summary: "Primera figura física de la mascota CHARKUMA, impresa y pintada a mano.",
        thumbnail: "📦", internalView: "hm-figura-3d", reviewed: false
      },
      {
        title: "Cojín tufting de un mando retro",
        type: "tufting", date: "2026-09-02",
        summary: "Segunda pieza de tufting: un mando de NES en forma de cojín para el sofá del set.",
        thumbnail: "🎮", internalView: "hm-cojin-mando", reviewed: false
      },
      {
        title: "Diseño de merch: taza CHARKUMA",
        type: "diseno", date: "2026-09-05",
        summary: "Primer boceto de merchandising: taza con el lagarto y el eslogan de la marca.",
        thumbnail: "☕", internalView: "hm-taza-merch", reviewed: false
      }
      // { title:"...", type:"tufting|diseno|objeto", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🧶", link:"..." },
    ];
    const HECHO_LABELS = { tufting:'🧶 Tufting', diseno:'🎨 Diseño personalizado', objeto:'📦 Objeto físico' };
    const HECHO_COLORS = { tufting:'chip-purple', diseno:'chip-green', objeto:'chip-yellow' };

    setupFilterableFeed({ searchId:'iaSearch', typeId:'iaTypeFilter', listId:'iaContentList', data:iaContent, labels:IA_LABELS, colors:IA_COLORS });
    setupFilterableFeed({ searchId:'creatorSearch', typeId:'creatorTypeFilter', listId:'creatorContentList', data:creatorContent, labels:CREATOR_LABELS, colors:CREATOR_COLORS });
    setupFilterableFeed({ searchId:'hechoSearch', typeId:'hechoTypeFilter', listId:'hechoContentList', data:hechoContent, labels:HECHO_LABELS, colors:HECHO_COLORS });

    // ──────────────────────────────────────────────────────────
    // BANCOS SECRETOS DE IDEAS del resto de secciones — mismo patrón
    // que el de Rincón del Friki (🦸), ahora repetido tal como se dejó
    // planeado: HELQUIDGAMES, Charkuma Lab, IA & Experimentos,
    // Creator Tools y Hecho a Mano. Los tipos reutilizan las mismas
    // etiquetas/colores que ya usa cada sección en su feed normal.
    // ──────────────────────────────────────────────────────────
    const HELQUID_IDEA_LABELS = { reto:'🏆 Reto', formato:'🎮 Formato nuevo', colab:'🤝 Colab', especial:'✨ Especial' };
    const helquidSecretIdeas = {
      reto: [
        "Terminar un roguelike sin morir ni una vez en directo (o hasta rendirte).",
        "Completar un juego clásico usando solo el teclado, sin mando.",
        "Reto de \"un intento\": si mueres al primer fallo grave, se acaba el vídeo.",
        "Speedrun casual de un juego de Retro 365, sin practicar antes.",
        "Jugar un juego entero sin mirar ninguna guía ni tutorial.",
        "Reto de dificultad: pasar un nivel concreto en el modo más difícil disponible.",
        "24 horas de un mismo juego: cuánto se puede avanzar en un día.",
        "Reto \"solo objetos random\": usar únicamente lo primero que encuentres.",
        "Terminar un juego de terror sin pausar ni una vez.",
        "Reto comunidad: la audiencia decide la siguiente decisión del juego."
      ],
      formato: [
        "\"Primeros 10 minutos\": primeras impresiones de un juego recién anunciado.",
        "Comparativa rápida: dos juegos del mismo género, cara a cara.",
        "\"¿Vale la pena en 2026?\": revisando un juego con unos años ya encima.",
        "Ranking personal: mis 5 juegos favoritos de un género concreto.",
        "\"Adivina el juego\" con pistas cada vez más fáciles.",
        "Probar un juego hecho por un solo desarrollador (indie).",
        "\"Lo que nadie te cuenta\" de un juego popular: mecánicas ocultas.",
        "Sesión de preguntas de la audiencia mientras juegas.",
        "\"De 0 a experto\": aprendiendo un juego competitivo desde cero.",
        "Probar mods o contenido creado por la comunidad de un juego ya conocido."
      ],
      colab: [
        "Torneo amistoso 1 vs 1 con otro creador de contenido.",
        "Reacción cruzada: reaccionamos juntos al mismo tráiler o anuncio.",
        "Ronda de preguntas rápidas con otro streamer o creador invitado.",
        "Partida cooperativa con un invitado en un juego multijugador.",
        "Intercambio de recomendaciones: cada uno prueba el juego favorito del otro.",
        "Reto conjunto: los dos intentamos el mismo desafío por separado y comparamos.",
        "Entrevista corta a otro creador sobre cómo empezó en esto.",
        "Colab de dibujo o arte con alguien de Charkuma Lab aplicada a un juego.",
        "Directo conjunto sorteando algo entre las dos comunidades.",
        "Versus por turnos: cada uno elige un reto para que el otro lo cumpla."
      ],
      especial: [
        "Especial de aniversario del canal: repaso de los mejores momentos.",
        "Especial de Navidad o fin de año jugando algo con temática festiva.",
        "Vídeo de \"detrás de cámaras\": cómo se graba y edita normalmente.",
        "Especial de hito de suscriptores: agradecimiento + sorteo.",
        "Recopilatorio de los mejores fails y momentos random del canal.",
        "Especial \"responde la comunidad\": Q&A largo sobre el canal y HELQUIDGAMES.",
        "Probar el primer juego que jugaste de pequeño, con ojos de adulto.",
        "Especial de Halloween: maratón de juegos de terror cortos.",
        "Vídeo \"un año de HELQUIDGAMES\": qué ha cambiado y qué viene.",
        "Especial cruce: un día jugando algo pedido por Rincón del Friki."
      ]
    };
    IDEA_BANK_RENDERERS.helquid = () => renderTypedIdeaBank({
      bank:'helquid', ideasByType:helquidSecretIdeas, typeLabels:HELQUID_IDEA_LABELS,
      containerId:'helquidSecretContainer', discardCounterId:'helquidDiscardCounter',
      discardedCountId:'helquidDiscardedCount', discardedListId:'helquidDiscardedListBody',
      hideCheckboxId:'helquidHideDiscarded'
    });
    IDEA_BANK_RENDERERS.helquid();

    const labSecretIdeas = {
      proyecto: [
        "Rediseñar la pantalla de \"empieza el directo\" a juego con la estética de la web.",
        "Crear un bot simple que salude a quien entra por primera vez al directo.",
        "Montar un dashboard propio con las estadísticas del canal en una sola pantalla.",
        "Diseñar un sistema de puntos o logros para la comunidad del Discord.",
        "Crear una landing page mini para cada nuevo proyecto que se anuncie.",
        "Construir un generador de miniaturas semi-automático con plantillas.",
        "Hacer una extensión de navegador tonta pero útil para el flujo de grabación.",
        "Montar un \"modo invitado\" en la web para mostrarla en entrevistas o colabs.",
        "Crear un sistema de votaciones para que la comunidad elija el próximo proyecto.",
        "Diseñar alertas personalizadas para donaciones o subs con la mascota CHARKUMA."
      ],
      herramienta: [
        "Script que recorta automáticamente los mejores momentos de un directo.",
        "Plantilla de guion reutilizable para vídeos cortos tipo reacción.",
        "Herramienta que sugiere horarios de publicación según la audiencia activa.",
        "Generador de nombres de vídeo con varias opciones de título por idea.",
        "Checklist interactivo de \"antes de publicar\" (miniatura, tags, descripción...).",
        "Comparador de dos miniaturas para decidir cuál usar antes de publicar.",
        "Herramienta que recuerda qué juegos de Retro 365 llevan más tiempo sin tocar.",
        "Conversor rápido de notas sueltas a guion con estructura.",
        "Plantilla de respuesta rápida para comentarios frecuentes.",
        "Cronómetro de \"tiempo de pantalla vs tiempo hablando\" para calibrar el ritmo."
      ],
      bitacora: [
        "Primeras impresiones probando un motor de vídeo con IA por primera vez.",
        "Lo que he aprendido montando el buscador global de la web.",
        "Registro de errores graciosos al programar la web (bugs memorables).",
        "Cómo decidí la paleta de colores y la estética morada/naranja de CHARKUMA.",
        "Bitácora de una semana probando una herramienta nueva de edición.",
        "Qué tal ha ido migrar la web a GitHub Pages, con los tropiezos incluidos.",
        "Diario de a bordo: una semana completa de creación de contenido, sin editar.",
        "Probando por primera vez a programar algo sin ayuda externa (o con ella).",
        "Registro de cómo evoluciona el banco de ideas secreto mes a mes.",
        "Reflexión sincera sobre qué proyecto de Charkuma Lab ha sido el más útil."
      ]
    };
    IDEA_BANK_RENDERERS.lab = () => renderTypedIdeaBank({
      bank:'lab', ideasByType:labSecretIdeas, typeLabels:LAB_TYPE_LABELS,
      containerId:'labSecretContainer', discardCounterId:'labDiscardCounter',
      discardedCountId:'labDiscardedCount', discardedListId:'labDiscardedListBody',
      hideCheckboxId:'labHideDiscarded'
    });
    IDEA_BANK_RENDERERS.lab();

    const iaSecretIdeas = {
      prompt: [
        "Prompt para convertir una idea suelta en guion de 60 segundos.",
        "Prompt para generar 10 títulos de vídeo a partir de un tema.",
        "Prompt para resumir un directo largo en los 5 mejores momentos.",
        "Prompt para escribir la descripción de YouTube optimizada para SEO.",
        "Prompt para generar preguntas de Q&A a partir de comentarios reales.",
        "Prompt para adaptar un guion largo a formato corto (Reels/TikTok).",
        "Prompt para generar ideas de miniatura a partir del título del vídeo.",
        "Prompt para escribir un post anunciando un vídeo nuevo.",
        "Prompt para convertir notas de voz transcritas en guion limpio.",
        "Prompt para generar variantes de un mismo chiste o gancho inicial."
      ],
      automatizacion: [
        "Aviso automático a Discord cuando cambia el estado de \"en directo\" en Twitch.",
        "Publicar automáticamente en redes cuando sale un vídeo nuevo de YouTube.",
        "Guardar en una hoja de cálculo las ideas descartadas de los bancos secretos.",
        "Recordatorio automático semanal de qué falta por revisar en la web.",
        "Backup automático semanal de los datos guardados en localStorage (exportado).",
        "Generar automáticamente el changelog de la web a partir de los commits.",
        "Alerta automática si un enlace de la web deja de funcionar.",
        "Automatizar el redimensionado de miniaturas a los tamaños de cada plataforma.",
        "Bot que resuma los comentarios nuevos de un vídeo cada mañana.",
        "Automatizar el paso de \"guion aprobado\" a tarea en el calendario de publicación."
      ],
      visual: [
        "Generar variaciones del logo de CHARKUMA para distintas estaciones del año.",
        "Probar estilos de miniatura distintos para el mismo vídeo y comparar clics.",
        "Generar arte conceptual para una skin especial de la mascota lagarto.",
        "Crear iconos personalizados para cada sección de la web con IA.",
        "Probar generación de fondos para overlays de streaming.",
        "Generar variantes de la mascota reaccionando a juegos de Retro 365.",
        "Crear stickers para Discord con la estética del canal.",
        "Probar la generación de miniaturas \"estilo cómic\" para Rincón del Friki.",
        "Generar ilustraciones para las portadas del banco de ideas secreto.",
        "Experimentar con estilos pixel-art para representar juegos de Retro 365."
      ],
      video: [
        "Probar una intro generada con IA para un vídeo de Rincón del Friki.",
        "Generar un adelanto corto de la semana con clips ya grabados.",
        "Probar subtítulos automáticos y comparar precisión en español.",
        "Generar una transición animada entre secciones de un mismo vídeo.",
        "Probar voces de IA para narrar una curiosidad corta de Rincón del Friki.",
        "Generar un resumen en vídeo de los cambios nuevos de la web.",
        "Probar herramientas de mejora automática de audio en grabaciones antiguas.",
        "Generar una versión corta (Shorts/Reels) automática de un vídeo largo.",
        "Probar el doblaje automático de un clip a otro idioma, solo por curiosidad.",
        "Generar b-roll genérico (paisajes, texturas) para rellenar cortes de edición."
      ]
    };
    IDEA_BANK_RENDERERS.ia = () => renderTypedIdeaBank({
      bank:'ia', ideasByType:iaSecretIdeas, typeLabels:IA_LABELS,
      containerId:'iaSecretContainer', discardCounterId:'iaDiscardCounter',
      discardedCountId:'iaDiscardedCount', discardedListId:'iaDiscardedListBody',
      hideCheckboxId:'iaHideDiscarded'
    });
    IDEA_BANK_RENDERERS.ia();

    const creatorSecretIdeas = {
      overlay: [
        "Overlay especial para las colabs, con hueco para el logo del invitado.",
        "Overlay temático para maratones de terror en Halloween.",
        "Overlay minimalista para clips cortos, sin cámara ni chat.",
        "Overlay con contador de días restantes de un reto en curso.",
        "Overlay para Q&A con las preguntas destacadas en pantalla.",
        "Overlay de \"modo viajando\": versión ligera del set para grabar fuera de casa.",
        "Overlay festivo intercambiable para fechas señaladas.",
        "Overlay especial para anuncios grandes (nuevo proyecto, nueva sección).",
        "Overlay con marcador tipo \"torneo\" para los retos 1 vs 1.",
        "Overlay reducido para pantalla compartida en formato vertical (móvil)."
      ],
      obs: [
        "Escena rápida de \"volviendo en 5 minutos\" con la estética de la web.",
        "Configuración de escenas para grabar tutoriales paso a paso.",
        "Preset de cámara + juego a partes iguales para reacciones.",
        "Escena de \"empezando pronto\" con cuenta atrás integrada.",
        "Configuración multi-cámara para las colabs presenciales.",
        "Escena dedicada para mostrar la pantalla del móvil (apps, juegos móviles).",
        "Preset de audio equilibrado para directos largos sin fatiga de voz.",
        "Escena de \"encuesta en pantalla\" para decisiones de la comunidad en directo.",
        "Configuración ligera para grabar rápido sin montar todo el set completo.",
        "Escena de despedida con resumen del directo y próximos vídeos."
      ],
      plantilla: [
        "Plantilla de miniatura para el banco de ideas de HELQUIDGAMES.",
        "Plantilla de miniatura para vídeos de Charkuma Lab.",
        "Plantilla de portada para clips cortos de Retro 365.",
        "Plantilla de guion para vídeos tipo \"primeras impresiones\".",
        "Plantilla de descripción de YouTube reutilizable, con huecos para rellenar.",
        "Plantilla de post para redes anunciando un vídeo nuevo.",
        "Plantilla de miniatura para las colabs, con espacio para dos personas.",
        "Plantilla de calendario editorial semanal, sencilla y visual.",
        "Plantilla de \"ficha de reto\" para los desafíos de HELQUIDGAMES.",
        "Plantilla de captura de pantalla anotada para tutoriales de Creator Tools."
      ],
      recurso: [
        "Pack de transiciones cortas a juego con la paleta morada/naranja.",
        "Banco de sonidos de UI (clics, aciertos, fallos) para overlays interactivos.",
        "Pack de iconos para redes sociales a juego con la estética CHARKUMA.",
        "Plantilla de hoja de cálculo para seguimiento de ideas y estados.",
        "Pack de marcos y bordes para clips cortos verticales.",
        "Paleta de colores exportada para usar en cualquier editor.",
        "Pack de emotes básicos para Discord/Twitch con la mascota lagarto.",
        "Banco de música libre de derechos ya filtrada por tipo de vídeo.",
        "Plantilla de brief para pedir colabs a otros creadores.",
        "Checklist descargable de \"todo lo que lleva publicar un vídeo\"."
      ]
    };
    IDEA_BANK_RENDERERS.creator = () => renderTypedIdeaBank({
      bank:'creator', ideasByType:creatorSecretIdeas, typeLabels:CREATOR_LABELS,
      containerId:'creatorSecretContainer', discardCounterId:'creatorDiscardCounter',
      discardedCountId:'creatorDiscardedCount', discardedListId:'creatorDiscardedListBody',
      hideCheckboxId:'creatorHideDiscarded'
    });
    IDEA_BANK_RENDERERS.creator();

    const hechoSecretIdeas = {
      tufting: [
        "Alfombra tufting de la mascota lagarto en versión mini, para el escritorio.",
        "Cojín tufting con el logo de HELQUIDGAMES.",
        "Alfombra tufting inspirada en un juego concreto de Retro 365.",
        "Posavasos de tufting a juego con la paleta de la web.",
        "Tapiz de pared tufting con el eslogan del canal.",
        "Alfombra tufting temática de Rincón del Friki (con permiso creativo).",
        "Funda de cojín tufting para silla gaming.",
        "Alfombra de baño tufting con un diseño pixel-art sencillo.",
        "Colgante de puerta tufting pequeño con la cara de la mascota.",
        "Alfombra tufting a juego con el overlay de streaming, para el fondo del set."
      ],
      diseno: [
        "Diseño de merch: sudadera con el lagarto en modo \"gamer\".",
        "Pegatinas para portátil con los iconos de cada sección de la web.",
        "Diseño de fondo de pantalla (móvil y escritorio) con la estética CHARKUMA.",
        "Diseño de carcasa de móvil personalizada con el logo.",
        "Diseño de llavero con la mascota en distintas poses.",
        "Diseño de funda para mando de consola a juego con la web.",
        "Diseño de tarjetas de presentación para colabs y eventos.",
        "Diseño de parche bordado para HELQUIDGAMES, estilo retro gamer.",
        "Diseño de agenda o cuaderno con la paleta morada/naranja.",
        "Diseño de banner para el canal de Discord, a juego con la web."
      ],
      objeto: [
        "Figura 3D de la mascota en pose \"listo para grabar\" (auriculares puestos).",
        "Soporte para móvil impreso en 3D con el logo de CHARKUMA.",
        "Base para teclado o ratón impresa a juego con el set de streaming.",
        "Figura conmemorativa de un hito del canal (por ejemplo, suscriptores).",
        "Organizador de escritorio impreso en 3D con hueco para micro y cascos.",
        "Réplica en miniatura de un objeto icónico de un juego de Retro 365.",
        "Portalápices con la forma del lagarto de la marca.",
        "Placa o trofeo impreso en 3D para ganadores de retos de HELQUIDGAMES.",
        "Soporte para cámara o luz de streaming personalizado.",
        "Pin o insignia física con el logo, para llevar a eventos."
      ]
    };
    IDEA_BANK_RENDERERS.hecho = () => renderTypedIdeaBank({
      bank:'hecho', ideasByType:hechoSecretIdeas, typeLabels:HECHO_LABELS,
      containerId:'hechoSecretContainer', discardCounterId:'hechoDiscardCounter',
      discardedCountId:'hechoDiscardedCount', discardedListId:'hechoDiscardedListBody',
      hideCheckboxId:'hechoHideDiscarded'
    });
    IDEA_BANK_RENDERERS.hecho();

    // ──────────────────────────────────────────────────────────
    // BUSCADOR GLOBAL: junta el contenido de todas las secciones (más
    // unas cuantas entradas fijas para las páginas que no vienen de un
    // array) en un único índice buscable por título, resumen o etiqueta.
    // Se reconstruye cada vez que se abre el buscador — el sitio es
    // pequeño, así que no hace falta cachearlo.
    // ──────────────────────────────────────────────────────────
    function buildSiteIndex(){
      const index = [];
      const addFrom = (arr, section, sectionEmoji, labelsMap) => {
        arr.forEach(item => index.push({
          title: item.title,
          summary: item.summary,
          view: item.internalView || item.link,
          external: !item.internalView,
          section, sectionEmoji,
          tags: [labelsMap && labelsMap[item.type]].filter(Boolean),
          emoji: item.thumbnail || sectionEmoji
        }));
      };
      addFrom(geekContent, 'Rincón del Friki', '🦸', TYPE_LABELS);
      addFrom(iaContent, 'IA & Experimentos', '🤖', IA_LABELS);
      addFrom(creatorContent, 'Creator Tools', '🛠️', CREATOR_LABELS);
      addFrom(hechoContent, 'Hecho a Mano', '🧶', HECHO_LABELS);
      addFrom(labContent, 'Charkuma Lab', '🧪', LAB_TYPE_LABELS);

      // Páginas "hub" o fijas que no vienen de un array de contenido.
      index.push(
        { title:'Retro 365', summary:'Reto de recomendar un juego distinto cada día, con calendario público y progreso.', view:'retro365', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Retro 365','Juegos'], emoji:'🎮' },
        { title:'Ruleta del 11', summary:'Sorteador de una alineación de fútbol con base de datos real de jugadores.', view:'ruleta11', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Fútbol'], emoji:'⚽' },
        { title:'CalcArte', summary:'Máquina de ideas al azar para dibujos para colorear, con prompt listo para IA.', view:'calcarte', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Arte','IA'], emoji:'🎰' },
        { title:'Rincón del Friki', summary:'Series, superhéroes, cómics y anime — Marvel y The Boys por encima de todo.', view:'rincon', section:'Rincón del Friki', sectionEmoji:'🦸', tags:['Marvel','The Boys'], emoji:'🦸' },
        { title:'Redes Sociales', summary:'Todos los enlaces a mis redes: YouTube, TikTok, Instagram, Twitch.', view:'redes', section:'General', sectionEmoji:'📱', tags:['Redes'], emoji:'📱' },
        { title:'Calendario de publicación', summary:'Lo próximo: el siguiente día de Retro 365 y el contenido pendiente de revisión del resto de secciones.', view:'calendario', section:'General', sectionEmoji:'📅', tags:['Planificación'], emoji:'📅' }
      );
      return index;
    }

    function searchResultCardHTML(item){
      const titleLink = item.external
        ? `<a href="${item.view}" target="_blank" rel="noopener">${item.title} ↗</a>`
        : `<a href="javascript:void(0)" onclick="showView('${item.view}')">${item.title} ↗</a>`;
      const tagChips = item.tags.map(t => `<span class="type-chip universe-chip">${t}</span>`).join('');
      return `
        <div class="geek-card">
          <div class="geek-thumb">${item.emoji}</div>
          <div class="geek-info">
            <div class="geek-badges">
              <span class="type-chip chip-purple">${item.sectionEmoji} ${item.section}</span>
              ${tagChips}
            </div>
            <h4>${titleLink}</h4>
            <p>${item.summary}</p>
          </div>
        </div>`;
    }

    function renderGlobalSearch(){
      const query = document.getElementById('globalSearchInput').value.trim().toLowerCase();
      const section = document.getElementById('globalSearchSection').value;
      const index = buildSiteIndex();

      const sectionSelect = document.getElementById('globalSearchSection');
      if (sectionSelect.options.length <= 1) {
        [...new Set(index.map(i => i.section))].sort().forEach(sec => {
          const opt = document.createElement('option');
          opt.value = sec; opt.textContent = sec;
          sectionSelect.appendChild(opt);
        });
      }

      const results = index.filter(item => {
        if (section && item.section !== section) return false;
        if (!query) return true;
        const haystack = (item.title + ' ' + item.summary + ' ' + item.tags.join(' ')).toLowerCase();
        return haystack.includes(query);
      });

      const container = document.getElementById('globalSearchResults');
      container.innerHTML = results.length
        ? results.map(searchResultCardHTML).join('')
        : `<p class="yt-empty">Nada coincide con esa búsqueda todavía.</p>`;
    }

    document.getElementById('globalSearchInput').addEventListener('input', renderGlobalSearch);
    document.getElementById('globalSearchSection').addEventListener('change', renderGlobalSearch);

    // Abre el buscador (icono de la cabecera o el atajo "/").
    function openSearchView(){
      showView('buscar');
      renderGlobalSearch();
      requestAnimationFrame(() => {
        const input = document.getElementById('globalSearchInput');
        if (input) input.focus();
      });
    }

    // ──────────────────────────────────────────────────────────
    // CALENDARIO DE PUBLICACIÓN: un vistazo simple a "lo próximo" —
    // el siguiente día decidido de Retro 365, y el contenido de las
    // demás secciones que sigue "pendiente de revisión" (generado
    // como base, a falta del toque final de Charkuma).
    // ──────────────────────────────────────────────────────────
    function renderCalendarView(){
      const retroList = document.getElementById('calendarRetroList');
      const pendingList = document.getElementById('calendarPendingList');
      if (!retroList || !pendingList) return;

      const plannedDays = Object.keys(plannedGames).map(Number).sort((a, b) => a - b);
      retroList.innerHTML = plannedDays.length
        ? plannedDays.map(day => {
            const g = plannedGames[day];
            return `
              <div class="geek-card">
                <div class="geek-thumb">${g.emoji || '📝'}</div>
                <div class="geek-info">
                  <div class="geek-badges">
                    <span class="type-chip chip-purple">DÍA ${String(day).padStart(3,'0')}</span>
                    <span class="type-chip diff-${g.difficulty}">${DIFF_LABELS[g.difficulty] || g.difficulty}</span>
                  </div>
                  <h4>${g.name}</h4>
                  <p>${g.summary}</p>
                </div>
              </div>`;
          }).join('')
        : `<p class="yt-empty">No hay ningún día decidido sin grabar ahora mismo — abre la chuleta secreta de Retro 365 para añadir más.</p>`;

      const pendingSources = [
        [geekContent, 'Rincón del Friki', '🦸'],
        [iaContent, 'IA & Experimentos', '🤖'],
        [creatorContent, 'Creator Tools', '🛠️'],
        [hechoContent, 'Hecho a Mano', '🧶'],
        [labContent, 'Charkuma Lab', '🧪']
      ];
      const pending = [];
      pendingSources.forEach(([arr, section, emoji]) => {
        arr.forEach(item => {
          const rid = item.internalView || item.title;
          if (item.reviewed === false && !isReviewed(rid)) {
            pending.push({ item, section, emoji });
          }
        });
      });
      pending.sort((a, b) => new Date(b.item.date || 0) - new Date(a.item.date || 0));

      pendingList.innerHTML = pending.length
        ? pending.map(({item, section, emoji}) => `
            <div class="geek-card">
              <div class="geek-thumb">${item.thumbnail || emoji}</div>
              <div class="geek-info">
                <div class="geek-badges">
                  <span class="type-chip chip-purple">${emoji} ${section}</span>
                  ${reviewBadgeHTML(item)}
                </div>
                <h4><a href="javascript:void(0)" onclick="showView('${item.internalView}')">${item.title} ↗</a></h4>
                <p>${item.summary}</p>
              </div>
            </div>`).join('')
        : `<p class="yt-empty">Todo revisado por aquí — nada pendiente ahora mismo.</p>`;
    }

    document.getElementById('spinRuletaBtn').addEventListener('click', spinRuleta);
    document.getElementById('assignBtn').addEventListener('click', assignPlayer);
    document.getElementById('resetRuletaBtn').addEventListener('click', resetRuleta);
    document.getElementById('playerNameInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') assignPlayer();
    });
    ['teamNameInput0', 'teamNameInput1'].forEach((id, i) => {
      document.getElementById(id).addEventListener('change', (e) => {
        ruletaState.teams[i].name = e.target.value.trim() || `Equipo ${i + 1}`;
        renderRuleta();
        saveRuletaState();
      });
    });

    restoreRuletaUI();
    renderRuleta();

    // ──────────────────────────────────────────────────────────
    // WIDGET LATERAL — últimos vídeos de YouTube (en vivo)
    // (La configuración YT_API_KEY / YT_CHANNEL_ID / GEEK_NEWS_FEED
    // está arriba del todo del script — instrucciones justo ahí.)
    // ──────────────────────────────────────────────────────────

    // El lateral muestra "Últimos vídeos" en todo el sitio, EXCEPTO dentro
    // de Rincón del Friki, donde muestra "Noticias Geek" en su lugar.
    function updateSidebar(viewId){
      const list = document.getElementById('ytVideoList');
      const title = document.getElementById('ytSidebarTitle');
      if (!list || !title) return;

      if (viewId === 'rincon') {
        currentSidebarMode = 'news';
        title.textContent = '📰 Noticias Geek';
        if (cachedNewsHTML) list.innerHTML = cachedNewsHTML;
        else { list.innerHTML = `<p class="yt-empty">Cargando noticias...</p>`; loadGeekNews(); }
      } else {
        currentSidebarMode = 'videos';
        title.textContent = '▶️ Últimos vídeos';
        if (cachedVideosHTML) list.innerHTML = cachedVideosHTML;
        else { list.innerHTML = `<p class="yt-empty">Cargando...</p>`; loadLatestVideos(); }
      }
    }

    async function loadLatestVideos(){
      const notConfigured =
        !YT_API_KEY || YT_API_KEY.indexOf("PON_AQUI") === 0 ||
        !YT_CHANNEL_ID || YT_CHANNEL_ID.indexOf("PON_AQUI") === 0;

      if (notConfigured) {
        cachedVideosHTML = `<p class="yt-empty">
          Configura <code>YT_API_KEY</code> y <code>YT_CHANNEL_ID</code>
          en el &lt;script&gt; de este archivo para activar esta sección
          (instrucciones justo encima, en el código).
        </p>`;
        if (currentSidebarMode === 'videos') document.getElementById('ytVideoList').innerHTML = cachedVideosHTML;
        return;
      }

      try {
        // Pedimos "statistics" a la vez que "contentDetails" (misma
        // llamada) para poder mostrar el nº de suscriptores sin gastar
        // una segunda petición a la API.
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`
        ).then(r => r.json());

        const channelItem = channelRes.items && channelRes.items[0];
        const uploadsId = channelItem && channelItem.contentDetails.relatedPlaylists.uploads;
        if (!uploadsId) throw new Error("Canal no encontrado");

        const stats = channelItem.statistics;
        const subCountEl = document.getElementById('ytSubCount');
        if (subCountEl && stats && !stats.hiddenSubscriberCount && stats.subscriberCount) {
          const formatted = new Intl.NumberFormat('es-ES').format(Number(stats.subscriberCount));
          subCountEl.textContent = `👥 ${formatted} suscriptores`;
          subCountEl.hidden = false;
        }

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${uploadsId}&key=${YT_API_KEY}`
        ).then(r => r.json());

        const videos = videosRes.items || [];
        cachedVideosHTML = videos.length
          ? videos.map(v => {
              const s = v.snippet;
              const videoId = s.resourceId.videoId;
              const thumb = (s.thumbnails.medium || s.thumbnails.default).url;
              const date = new Date(s.publishedAt).toLocaleDateString('es-ES', {day:'numeric', month:'short'});
              return `
                <a class="yt-video" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
                  <img class="yt-thumb" src="${thumb}" alt="Miniatura del vídeo: ${s.title}" loading="lazy">
                  <div class="yt-info">
                    <strong>${s.title}</strong>
                    <span>${date}</span>
                  </div>
                </a>`;
            }).join('')
          : `<p class="yt-empty">Todavía no hay vídeos publicados.</p>`;

        // Reutiliza el primer vídeo también en la tarjeta de la página Redes Sociales
        if (videos.length) {
          const s0 = videos[0].snippet;
          const thumb0 = (s0.thumbnails.medium || s0.thumbnails.default).url;
          const date0 = new Date(s0.publishedAt).toLocaleDateString('es-ES', {day:'numeric', month:'short'});
          const redesThumb = document.getElementById('redesYtThumb');
          const redesTitle = document.getElementById('redesYtTitle');
          const redesDate = document.getElementById('redesYtDate');
          const redesCard = document.getElementById('redesYtCard');
          if (redesThumb) redesThumb.outerHTML = `<img class="latest-thumb" id="redesYtThumb" src="${thumb0}" alt="Miniatura del vídeo: ${s0.title}" loading="lazy">`;
          if (redesTitle) redesTitle.textContent = s0.title;
          if (redesDate) redesDate.textContent = date0;
          if (redesCard) redesCard.onclick = () => window.open(`https://www.youtube.com/watch?v=${s0.resourceId.videoId}`, '_blank');
          if (redesCard) redesCard.style.cursor = 'pointer';
        }
      } catch (err) {
        cachedVideosHTML = `<p class="yt-empty">No se pudieron cargar los vídeos ahora mismo (revisa la API key y el Channel ID).</p>`;
      }

      if (currentSidebarMode === 'videos') document.getElementById('ytVideoList').innerHTML = cachedVideosHTML;
    }

    async function loadGeekNews(){
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(GEEK_NEWS_FEED)}`
        ).then(r => r.json());

        const items = (res.items || []).slice(0, 6);
        cachedNewsHTML = items.length
          ? items.map(item => {
              const date = new Date(item.pubDate).toLocaleDateString('es-ES', {day:'numeric', month:'short'});
              const thumb = item.thumbnail || (item.enclosure && item.enclosure.link) || "";
              return `
                <a class="yt-video" href="${item.link}" target="_blank" rel="noopener">
                  ${thumb
                    ? `<img class="yt-thumb" src="${thumb}" alt="Imagen de la noticia: ${item.title}" loading="lazy">`
                    : `<div class="yt-thumb" style="display:grid;place-items:center;font-size:22px">📰</div>`}
                  <div class="yt-info">
                    <strong>${item.title}</strong>
                    <span>${date}</span>
                  </div>
                </a>`;
            }).join('')
          : `<p class="yt-empty">No hay noticias disponibles ahora mismo.</p>`;
      } catch (err) {
        cachedNewsHTML = `<p class="yt-empty">No se pudieron cargar las noticias ahora mismo.</p>`;
      }

      if (currentSidebarMode === 'news') document.getElementById('ytVideoList').innerHTML = cachedNewsHTML;
    }

    if (!cameFromHash) updateSidebar('home');

    // ──────────────────────────────────────────────────────────
    // BLOC DE NOTAS — se guarda en este navegador (localStorage).
    // No se sincroniza entre dispositivos ni navegadores distintos.
    // ──────────────────────────────────────────────────────────
    const NOTES_KEY = 'charkuma_notes';

    function loadNotes(){
      try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || []; }
      catch (e) { return []; }
    }

    function saveNotes(notes){
      try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }
      catch (e) { /* localStorage no disponible (modo privado, etc.) */ }
    }

    function escapeHTML(str){
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function renderNotes(){
      const notes = loadNotes();
      const list = document.getElementById('notesList');
      list.innerHTML = notes.length
        ? notes.slice().reverse().map(note => `
            <div class="note-item">
              <button class="note-delete" onclick="deleteNote('${note.id}')" title="Borrar nota">✕</button>
              <p>${escapeHTML(note.text)}</p>
              <span>${note.date}</span>
            </div>`).join('')
        : `<p class="yt-empty">Todavía no tienes notas. Escribe la primera arriba 👆</p>`;
    }

    function addNote(){
      const input = document.getElementById('noteInput');
      const text = input.value.trim();
      if (!text) return;
      const notes = loadNotes();
      notes.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text,
        date: new Date().toLocaleString('es-ES', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})
      });
      saveNotes(notes);
      input.value = '';
      renderNotes();
    }

    function deleteNote(id){
      saveNotes(loadNotes().filter(n => n.id !== id));
      renderNotes();
    }

    document.getElementById('noteSaveBtn').addEventListener('click', addNote);
    document.getElementById('noteInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNote();
    });

    renderNotes();

    // ──────────────────────────────────────────────────────────
    // ORDEN DE "MIS PROYECTOS" — el que tenga la novedad más reciente
    // (un vídeo, una entrada, un juego...) sale primero.
    //
    // HELQUIDGAMES no tiene un array de contenido con fechas propio
    // (es un hub de juegos, no un feed), así que su fecha se actualiza
    // a mano aquí abajo cada vez que añadas o toques algo en esa sección.
    // ──────────────────────────────────────────────────────────
    const HELQUIDGAMES_LAST_UPDATE = "2026-09-07"; // ← actualiza esta fecha cuando cambies algo en HELQUIDGAMES

    function latestDate(list, field){
      const dates = list.map(item => new Date(item[field]).getTime()).filter(n => !isNaN(n));
      return dates.length ? Math.max(...dates) : 0;
    }

    function reorderProjectCards(){
      const lastUpdate = {
        retro365: latestDate(Object.values(completedGames), 'dateAdded'),
        rincon: latestDate(geekContent, 'date'),
        helquidgames: new Date(HELQUIDGAMES_LAST_UPDATE).getTime(),
        charkumalab: latestDate(labContent, 'date')
      };

      const grid = document.getElementById('projectsGrid');
      const cards = Array.from(grid.querySelectorAll('[data-project]'));
      cards.sort((a, b) => (lastUpdate[b.dataset.project] || 0) - (lastUpdate[a.dataset.project] || 0));
      cards.forEach(card => grid.appendChild(card));
    }

    reorderProjectCards();
    hideAlreadyReviewedBadges();

    // ──────────────────────────────────────────────────────────
    // Estado "en directo" de Twitch, sin necesitar tu propia API key:
    // decapi.me es un servicio público y gratuito (sin autenticación)
    // muy usado para overlays de streaming, que solo dice si el canal
    // está emitiendo ahora mismo y desde cuándo. Si algún día prefieres
    // tu propia app de Twitch (Client ID + token), esta es la función
    // a sustituir.
    // ──────────────────────────────────────────────────────────
    async function loadTwitchLiveStatus(){
      const badge = document.getElementById('twitchLiveBadge');
      if (!badge) return;
      try {
        const text = (await fetch('https://decapi.me/twitch/uptime/kiddcolors').then(r => r.text())).trim();
        const isLive = text && !/offline|no existe|not found/i.test(text);
        badge.hidden = false;
        badge.classList.toggle('is-live', !!isLive);
        badge.textContent = isLive ? `🔴 En directo ahora mismo (${text})` : '⚫ Ahora mismo no está en directo';
      } catch (err) {
        badge.hidden = true; // servicio no disponible: no mostramos nada raro
      }
    }
    loadTwitchLiveStatus();
