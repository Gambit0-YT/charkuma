    // ══════════ 03-retro365-home-widgets.js ══════════
    // Renderizado de Retro 365 (tarjetas de día, vista pública, progreso), Ranking friki, Radar de estrenos (TMDB) y demás widgets del inicio.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    const DIFF_LABELS = {
      facil: "🟢 Fácil",
      media: "🟡 Media",
      dificil: "🔴 Difícil",
      muydificil: "🟣 Muy difícil"
    };
    // Backlog #11 — miniatura sugerida por dificultad: cuando un
    // candidato del mazo no trae su propio emoji, en vez de un genérico
    // 🎮 siempre igual, usa el mismo círculo de color que ya identifica
    // esa dificultad en toda la web (reutiliza DIFF_LABELS, no duplica
    // el mapeo de colores en otro sitio).
    function defaultEmojiForDifficulty(difficulty){
      const label = DIFF_LABELS[difficulty];
      return label ? label.split(' ')[0] : '🎮';
    }

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
            <div class="day-thumb" data-game="${escapeAttr(game.name)}">${game.emoji || "🎮"}</div>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · 🔓 DESBLOQUEADO</div>
              <h4><a href="${game.videoUrl}" target="_blank" rel="noopener">▶ ${game.name}</a></h4>
              <p>${game.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${game.difficulty}">${DIFF_LABELS[game.difficulty] || game.difficulty}</span>
                ${game.duration ? `<span class="diff-chip chip-neutral">⏱️ ${game.duration}</span>` : ''}
                ${game.platform ? `<span class="diff-chip chip-neutral">${PLATFORM_LABELS[game.platform] || game.platform}</span>` : ''}
                <a class="diff-chip chip-neutral" href="${game.steamUrl}" target="_blank" rel="noopener">🛒 Steam ↗</a>
              </div>
            </div>
          </div>`;
      }

      // Backlog/pedido explícito de Iván (9 sep): revelar también los
      // días ya DECIDIDOS aunque el vídeo todavía no se haya grabado ni
      // publicado — a sabiendas de que esto rompe la sorpresa del reto
      // de cara a la audiencia real (se lo advertí antes de tocar esto,
      // confirmó que lo quiere igualmente). Se etiqueta con honestidad
      // como "decidido, sin grabar" — nunca como si ya estuviera
      // publicado — y solo se enseña la identidad del juego (nombre,
      // resumen, dificultad), NUNCA el guion completo con opiniones y
      // chistes todavía sin grabar: eso se queda solo en la chuleta
      // secreta, que es donde vive el guion de verdad.
      const planned = plannedGames[day];
      if (planned) {
        return `
          <div class="day-card planned">
            <div class="day-thumb" data-game="${escapeAttr(planned.name)}">${planned.emoji || "📝"}</div>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · 📝 DECIDIDO (sin grabar)</div>
              <h4><a href="${planned.steamUrl}" target="_blank" rel="noopener">${planned.name} ↗</a></h4>
              <p>${planned.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${planned.difficulty}">${DIFF_LABELS[planned.difficulty] || planned.difficulty}</span>
                ${planned.duration ? `<span class="diff-chip chip-neutral">⏱️ ${planned.duration}</span>` : ''}
                ${planned.platform ? `<span class="diff-chip chip-neutral">${PLATFORM_LABELS[planned.platform] || planned.platform}</span>` : ''}
              </div>
              <p class="lock-note">Todavía sin grabar — el vídeo llegará más adelante.</p>
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
        let monthPlanned = 0;
        let cards = "";
        for (let d = start; d <= end; d++){
          if (completedGames[d]) monthUnlocked++;
          else if (plannedGames[d]) monthPlanned++;
          cards += dayCardHTML(d);
        }
        const openAttr = (nextDay >= start && nextDay <= end) || i === 0 ? " open" : "";
        html += `
          <details class="month"${openAttr}>
            <summary>
              <span>${name}</span>
              <span class="count">${monthUnlocked} / ${daysInMonth} desbloqueados${monthPlanned ? ` (+${monthPlanned} decididos)` : ''}</span>
            </summary>
            <div class="month-body">${cards}</div>
          </details>`;
        day = end + 1;
      });

      container.innerHTML = html;
      hydrateGameThumbs(container);
      renderRetroCoverGallery();

      const pct = Math.round((unlockedDays.length / totalDays) * 100);
      document.getElementById('progressFill').style.width = pct + "%";
      document.getElementById('progressLabel').textContent =
        `${unlockedDays.length} / ${totalDays} días desbloqueados (${pct}%)`;

      // Backlog #66 — el mismo progreso, resumido en el inicio.
      const homeFill = document.getElementById('homeRetroProgressFill');
      const homeLabel = document.getElementById('homeRetroProgressLabel');
      if (homeFill && homeLabel) {
        homeFill.style.width = pct + "%";
        homeLabel.textContent = `🎮 Retro 365 · día ${unlockedDays.length} de ${totalDays} (${pct}%)`;
      }
      renderRetro365HomePreview(pct);
      renderRandomBuildFact();
    }

    // Backlog #312 (Operación Bikini, 10 sep) — previsualización real de
    // Retro 365 en el inicio: el último día real ya publicado (no un
    // "próximo día" inventado, no una carátula falsa — el emoji y el
    // resumen son los mismos datos reales de `completedGames`), más el
    // % de progreso real. Nunca fabrica contenido que no exista todavía.
    function renderRetro365HomePreview(pct){
      const el = document.getElementById('retro365PreviewBody');
      if (!el) return;
      if (!lastUnlocked || !completedGames[lastUnlocked]) {
        el.innerHTML = `<p class="yt-empty">Todavía no hay ningún día publicado — vuelve pronto.</p>`;
        return;
      }
      const game = completedGames[lastUnlocked];
      el.innerHTML = `
        <div class="retro-preview-day">
          <span class="retro-preview-emoji">${game.emoji || '🎮'}</span>
          <div>
            <h3>Día ${lastUnlocked} · ${escapeHTML(game.name)}</h3>
            <p class="yt-empty">${DIFF_LABELS[game.difficulty] || ''}</p>
          </div>
        </div>
        <p class="retro-preview-summary">${escapeHTML(game.summary)}</p>
        <div class="retro-preview-track"><div class="retro-preview-fill" style="width:${pct}%"></div></div>
        <p class="yt-empty" style="margin:0">${lastUnlocked} / ${totalDays} días (${pct}%)</p>
      `;
    }

    // Backlog #136 — frase random del diario de construcción en el pie de
    // página: lee de verdad los párrafos ya escritos en #devLogTimeline
    // (nunca un texto aparte que se pueda desincronizar) y elige uno al
    // azar, una vez por carga de página — no hace falta que cambie en
    // caliente, es un detalle curioso, no un dato en vivo.
    function renderRandomBuildFact(){
      const el = document.getElementById('footerBuildFact');
      if (!el) return;
      const paragraphs = [...document.querySelectorAll('#devLogTimeline .log-entry p')];
      if (!paragraphs.length) return;
      // El HTML fuente tiene saltos de línea/indentación dentro del propio
      // párrafo (se ve bien renderizado, pero .textContent los arrastra) —
      // normalizamos a espacios simples antes de cortar la frase.
      const pick = paragraphs[Math.floor(Math.random() * paragraphs.length)].textContent.replace(/\s+/g, ' ').trim();
      // Solo la primera frase, para que quepa cómodo en el pie de página.
      const firstSentence = pick.split(/(?<=[.!?])\s/)[0];
      el.textContent = `💭 ${firstSentence}`;
    }

    // Backlog #9 — galería visual compacta de portadas reales de todos
    // los días ya publicados (reutiliza hydrateGameThumbs, el mismo
    // fetch a RAWG que ya usan las tarjetas de día).
    function renderRetroCoverGallery(){
      const gallery = document.getElementById('retroCoverGallery');
      if (!gallery) return;
      const days = unlockedDays.slice().sort((a, b) => a - b);
      if (!days.length) {
        gallery.innerHTML = `<p class="yt-empty">Todavía no hay portadas — se irán llenando según se publiquen días.</p>`;
        return;
      }
      gallery.innerHTML = days.map(day => {
        const game = completedGames[day];
        return `
          <div class="cover-tile" data-game="${escapeAttr(game.name)}" data-day="${day}" title="Día ${day} · ${escapeAttr(game.name)}" onclick="scrollToRetroDay(${day})">
            <span class="cover-emoji">${game.emoji || '🎮'}</span>
            <span class="cover-daytag">${String(day).padStart(3,'0')}</span>
          </div>`;
      }).join('');
      // No reutilizamos hydrateGameThumbs tal cual: apunta a
      // ".day-thumb[data-game]", y ese selector trae su propio tamaño
      // fijo (72x72) que rompería el grid de esta galería. Mismo fetch,
      // selector propio, conservando la etiqueta del día al sustituir.
      gallery.querySelectorAll('.cover-tile[data-game]').forEach(async el => {
        const url = await fetchGameCoverUrl(el.dataset.game);
        if (!url) return;
        const emojiEl = el.querySelector('.cover-emoji');
        if (emojiEl) emojiEl.outerHTML = `<img src="${url}" alt="Carátula de ${escapeAttr(el.dataset.game)}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`;
      });
    }

    // Backlog #4 — vista de calendario mensual REAL para Retro 365: los
    // mismos 365 días de siempre, pero mapeados a fechas de verdad desde
    // RETRO365_START_DATE (10 nov 2026), en una rejilla semana a semana
    // (lunes primero) en vez de la lista plana de arriba. Llamada al
    // final del script (ver comentario junto a RETRO365_START_DATE) para
    // evitar el TDZ de esa constante.
    const RETRO_CAL_WEEKDAYS = ['L','M','X','J','V','S','D'];
    function renderRetroCalendarGrid(){
      const container = document.getElementById('retroCalendarGrid');
      if (!container || typeof RETRO365_START_DATE === 'undefined') return;

      // Agrupamos los 365 días por mes-calendario real.
      const monthsMap = new Map(); // "2026-10" -> [{day, date}]
      for (let d = 1; d <= totalDays; d++){
        const date = new Date(RETRO365_START_DATE);
        date.setDate(date.getDate() + (d - 1));
        const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2,'0')}`;
        if (!monthsMap.has(key)) monthsMap.set(key, []);
        monthsMap.get(key).push({ day: d, date });
      }

      const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      let html = '';
      let firstOpenDone = false;
      for (const [key, entries] of monthsMap){
        const [year, monthIdx] = key.split('-').map(Number);
        const firstDate = entries[0].date;
        // Lunes = 0 ... domingo = 6 (getDay() da domingo = 0, lo rotamos)
        const leadingBlanks = (firstDate.getDay() + 6) % 7;
        const unlockedInMonth = entries.filter(e => completedGames[e.day]).length;
        const plannedInMonth = entries.filter(e => !completedGames[e.day] && plannedGames[e.day]).length;
        const containsNext = entries.some(e => e.day === nextDay);
        const openAttr = (containsNext || !firstOpenDone) ? ' open' : '';
        if (containsNext || !firstOpenDone) firstOpenDone = true;

        let cells = RETRO_CAL_WEEKDAYS.map(w => `<div class="retro-cal-weekday">${w}</div>`).join('');
        for (let i = 0; i < leadingBlanks; i++) cells += `<div class="retro-cal-cell empty"></div>`;
        entries.forEach(({ day, date }) => {
          const game = completedGames[day];
          const planned = !game && plannedGames[day];
          const isNext = day === nextDay;
          const cls = game ? 'unlocked' : (planned ? 'planned' : (isNext ? 'locked next' : 'locked'));
          const title = game
            ? `Día ${day} · ${game.name}`
            : planned ? `Día ${day} · ${planned.name} (decidido, sin grabar)`
            : (isNext ? `Día ${day} · próximo a publicarse` : `Día ${day} · todavía sin anunciar`);
          cells += `<div class="retro-cal-cell ${cls}" title="${escapeAttr(title)}" onclick="scrollToRetroDay(${day})"><span class="retro-cal-daynum">${date.getDate()}</span>${game ? (game.emoji || '🎮') : planned ? (planned.emoji || '📝') : (isNext ? '🟠' : '🔒')}</div>`;
        });

        html += `
          <details class="month"${openAttr}>
            <summary>
              <span>${MONTH_NAMES[monthIdx]} ${year}</span>
              <span class="count">${unlockedInMonth} / ${entries.length} desbloqueados${plannedInMonth ? ` (+${plannedInMonth} decididos)` : ''}</span>
            </summary>
            <div class="retro-cal-grid">${cells}</div>
          </details>`;
      }
      container.innerHTML = html;
    }

    // Al pulsar un día del calendario real, abrimos (si hace falta) y
    // desplazamos hasta su tarjeta equivalente en la lista de siempre —
    // así el calendario es un atajo visual, no una vista duplicada.
    function scrollToRetroDay(day){
      const container = document.getElementById('monthsContainer');
      if (!container) return;
      const details = [...container.querySelectorAll('details.month')];
      const dayBadgeText = `DÍA ${String(day).padStart(3,'0')}`;
      for (const det of details){
        const badge = [...det.querySelectorAll('.day-badge')].find(b => b.textContent.includes(dayBadgeText));
        if (badge) {
          det.open = true;
          badge.closest('.day-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
          badge.closest('.day-card').style.outline = '2px solid var(--orange)';
          setTimeout(() => { badge.closest('.day-card').style.outline = ''; }, 1600);
          return;
        }
      }
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
    // Bandera para no reenviar a Firestore lo que acabamos de recibir DE
    // Firestore (evitaría un eco de escritura inofensivo pero inútil) —
    // ver initIdeaBanksRealtime más abajo.
    let applyingRemoteIdeaBanksUpdate = false;
    function saveIdeaBanks(banks){
      try { localStorage.setItem(IDEA_BANKS_KEY, JSON.stringify(banks)); }
      catch(e){ /* localStorage no disponible: seguimos sin persistir */ }
      if (!applyingRemoteIdeaBanksUpdate && typeof pushIdeaBanksState === 'function') pushIdeaBanksState();
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
          <span>${it.label}${it.discardedAt ? `<span class="discarded-date"> · descartado el ${formatDiscardedDate(it.discardedAt)}</span>` : ''}${it.discardReason ? `<br><span class="discarded-date">💬 ${escapeAttr(it.discardReason)}</span>` : ''}</span>
          <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${bank}','${it.id}')">↩️ Restaurar</button>
        </div>`).join('');
    }

    // ──────────────────────────────────────────────────────────
    // IDEAS "EXTRA" GENÉRICAS (para HELQUIDGAMES, Charkuma Lab, IA &
    // Experimentos, Creator Tools y Hecho a Mano): mismo patrón que
    // RINCON_EXTRA_IDEAS_KEY, pero genérico para cualquier banco cuyas
    // ideas sean strings simples (no objetos con universo). Una clave de
    // localStorage por banco: charkuma_extra_ideas_<bank>.
    // ──────────────────────────────────────────────────────────
    const BANK_EXTRA_IDEAS_PREFIX = 'charkuma_extra_ideas_';
    function loadBankExtraIdeas(bank){
      try { return JSON.parse(localStorage.getItem(BANK_EXTRA_IDEAS_PREFIX + bank)) || {}; }
      catch (e) { return {}; }
    }
    function saveBankExtraIdeas(bank, data){
      try { localStorage.setItem(BANK_EXTRA_IDEAS_PREFIX + bank, JSON.stringify(data)); }
      catch (e) { /* seguimos sin guardarlo, sin romper nada */ }
      if (!applyingRemoteIdeaBanksUpdate && typeof pushIdeaBanksState === 'function') pushIdeaBanksState();
    }
    function getBankIdeasMerged(bank, baseIdeas){
      const extra = loadBankExtraIdeas(bank);
      const merged = {};
      Object.keys(baseIdeas).forEach(type => {
        merged[type] = baseIdeas[type].concat(extra[type] || []);
      });
      Object.keys(extra).forEach(type => {
        if (!merged[type]) merged[type] = extra[type].slice();
      });
      return merged;
    }
    function addBankExtraIdeas(bank, additionsByType){
      const extra = loadBankExtraIdeas(bank);
      Object.keys(additionsByType).forEach(type => {
        extra[type] = (extra[type] || []).concat(additionsByType[type]);
      });
      saveBankExtraIdeas(bank, extra);
    }

    const IDEA_BANK_RENDERERS = {};

    // Backlog #62 — micro-animación al marcar una idea como hecha: un
    // pequeño "pop" en el botón antes de que el re-render normal
    // sustituya la tarjeta entera (si no, no daría tiempo a verse). Sin
    // botón (llamada programática) o al desmarcar, va directo sin
    // esperar — el "pop" es solo para el gesto de completar algo.
    function toggleIdeaDone(bank, id, btnEl){
      const state = (loadIdeaBanks()[bank] || {})[id] || {};
      const turningOn = !state.done;
      setIdeaState(bank, id, {done: turningOn});
      const rerender = () => { if (IDEA_BANK_RENDERERS[bank]) IDEA_BANK_RENDERERS[bank](); };
      if (turningOn && btnEl) {
        btnEl.classList.add('idea-check-pop');
        setTimeout(rerender, 220);
      } else {
        rerender();
      }
    }
    // Backlog #37 — vincular ideas relacionadas entre bancos: modo de
    // "vinculación en dos pasos" (sin modal ni buscador nuevo) — se
    // arranca desde una idea, se navega a la otra (de cualquier banco)
    // y se completa allí. Bidireccional, guardado en localStorage por
    // clave "banco::id".
    const IDEA_LINKS_KEY = 'charkuma_idea_links';
    let ideaLinkingFrom = null;
    function loadIdeaLinks(){
      try { return JSON.parse(localStorage.getItem(IDEA_LINKS_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveIdeaLinks(links){
      try { localStorage.setItem(IDEA_LINKS_KEY, JSON.stringify(links)); }
      catch (e) { /* seguimos sin guardar, sin romper nada */ }
    }
    function ideaLinkKey(bank, id){ return `${bank}::${id}`; }
    function getLinkedIdeas(bank, id){ return loadIdeaLinks()[ideaLinkKey(bank, id)] || []; }
    // Cada banco tiene su propia función de render — esto las llama a
    // todas para que el estado de "vinculando..." (o un enlace recién
    // creado) se vea igual en cualquier página abierta.
    function rerenderAllIdeaBanks(){
      Object.values(IDEA_BANK_RENDERERS).forEach(fn => fn());
      if (typeof renderRinconSecret === 'function') renderRinconSecret();
      const banner = document.getElementById('ideaLinkingBanner');
      const active = ideaLinkingFrom || ideaCombiningFrom;
      if (banner) banner.hidden = !active;
      if (banner && ideaLinkingFrom) {
        banner.querySelector('span').textContent = `🔗 Vinculando "${ideaLinkingFrom.label}" — ve a la otra idea y pulsa "✅ Vincular con ésta".`;
      } else if (banner && ideaCombiningFrom) {
        const shortText = ideaCombiningFrom.text.length > 70 ? ideaCombiningFrom.text.slice(0, 67) + '...' : ideaCombiningFrom.text;
        banner.querySelector('span').textContent = `🔀 Combinando "${shortText}" — ve a la otra idea y pulsa "🔀 Combinar con ésta".`;
      }
    }
    function startIdeaLink(bank, id, label){
      ideaLinkingFrom = { bank, id, label };
      rerenderAllIdeaBanks();
    }
    function cancelIdeaLink(){
      ideaLinkingFrom = null;
      rerenderAllIdeaBanks();
    }
    function completeIdeaLink(bank, id, label){
      if (!ideaLinkingFrom) return;
      if (ideaLinkingFrom.bank === bank && ideaLinkingFrom.id === id) { alert('No puedes vincular una idea consigo misma — ve a otra distinta.'); return; }
      const links = loadIdeaLinks();
      const keyA = ideaLinkKey(ideaLinkingFrom.bank, ideaLinkingFrom.id);
      const keyB = ideaLinkKey(bank, id);
      if (!links[keyA]) links[keyA] = [];
      if (!links[keyB]) links[keyB] = [];
      links[keyA].push({ bank, id, label });
      links[keyB].push({ bank: ideaLinkingFrom.bank, id: ideaLinkingFrom.id, label: ideaLinkingFrom.label });
      saveIdeaLinks(links);
      ideaLinkingFrom = null;
      rerenderAllIdeaBanks();
    }
    function unlinkIdeas(bank, id, otherBank, otherId){
      const links = loadIdeaLinks();
      const keyA = ideaLinkKey(bank, id);
      const keyB = ideaLinkKey(otherBank, otherId);
      if (links[keyA]) links[keyA] = links[keyA].filter(l => !(l.bank === otherBank && l.id === otherId));
      if (links[keyB]) links[keyB] = links[keyB].filter(l => !(l.bank === bank && l.id === id));
      saveIdeaLinks(links);
      rerenderAllIdeaBanks();
    }
    // Backlog #33 — combinar dos ideas en una: mismo patrón "en dos
    // pasos" que vincular (#37) — se arranca en una idea, se navega a
    // la otra (de cualquier banco, incluido Rincón, que guarda sus
    // ideas con forma distinta) y se completa allí. La idea nueva se
    // añade al banco/tipo de la PRIMERA idea; las dos originales quedan
    // descartadas (con motivo), no borradas — reversible desde
    // "descartadas" si el resultado no convence.
    let ideaCombiningFrom = null;
    function addCombinedIdea(bank, type, text){
      if (bank === 'rincon') {
        const extra = loadRinconExtraIdeas();
        if (!extra[type]) extra[type] = [];
        extra[type].push({ universe: 'geek', text });
        saveRinconExtraIdeas(extra);
      } else {
        addBankExtraIdeas(bank, { [type]: [text] });
      }
    }
    function startIdeaCombine(bank, id, type, text){
      ideaCombiningFrom = { bank, id, type, text };
      rerenderAllIdeaBanks();
    }
    function cancelIdeaCombine(){
      ideaCombiningFrom = null;
      rerenderAllIdeaBanks();
    }
    function completeIdeaCombine(bank, id, text){
      if (!ideaCombiningFrom) return;
      if (ideaCombiningFrom.bank === bank && ideaCombiningFrom.id === id) { alert('No puedes combinar una idea consigo misma — ve a otra distinta.'); return; }
      const combinedText = `${ideaCombiningFrom.text} — combinado con — ${text}`;
      const sourceBank = ideaCombiningFrom.bank;
      addCombinedIdea(sourceBank, ideaCombiningFrom.type, combinedText);
      const reason = 'Combinada con otra idea en una nueva';
      setIdeaState(sourceBank, ideaCombiningFrom.id, { discarded: true, discardedAt: Date.now(), discardReason: reason });
      setIdeaState(bank, id, { discarded: true, discardedAt: Date.now(), discardReason: reason });
      ideaCombiningFrom = null;
      rerenderAllIdeaBanks();
      alert('Ideas combinadas — la nueva idea está al final de su categoría en ' + sourceBank + ', y las dos originales han quedado descartadas (se pueden restaurar si hace falta).');
    }

    const IDEA_BANK_SECRET_VIEW = { helquid: 'helquid-secret', lab: 'lab-secret', ia: 'ia-secret', creator: 'creator-secret', hecho: 'hecho-secret', rincon: 'rf-secret' };
    function ideaLinkControlsHTML(bank, id, type, fullText){
      const label = fullText.length > 70 ? fullText.slice(0, 67) + '...' : fullText;
      const safeLabel = escapeAttr(label).replace(/'/g, "&#39;");
      const safeText = escapeAttr(fullText).replace(/'/g, "&#39;");
      const linked = getLinkedIdeas(bank, id);

      let linkBtn = '';
      const isLinkSource = ideaLinkingFrom && ideaLinkingFrom.bank === bank && ideaLinkingFrom.id === id;
      if (isLinkSource) {
        linkBtn = `<button type="button" class="idea-link-btn is-active" onclick="cancelIdeaLink()">🔗 Cancelar vinculación</button>`;
      } else if (ideaLinkingFrom) {
        linkBtn = `<button type="button" class="idea-link-btn is-active" onclick="completeIdeaLink('${bank}','${id}','${safeLabel}')">✅ Vincular con ésta</button>`;
      } else {
        linkBtn = `<button type="button" class="idea-link-btn" onclick="startIdeaLink('${bank}','${id}','${safeLabel}')">🔗 Vincular con otra idea</button>`;
      }

      // Backlog #33 — combinar dos ideas en una: mismo botón "en dos
      // pasos" que vincular, pero acción distinta (crea una idea nueva
      // y descarta las dos originales en vez de solo enlazarlas).
      let combineBtn = '';
      const isCombineSource = ideaCombiningFrom && ideaCombiningFrom.bank === bank && ideaCombiningFrom.id === id;
      if (isCombineSource) {
        combineBtn = `<button type="button" class="idea-link-btn is-active" onclick="cancelIdeaCombine()">🔀 Cancelar combinación</button>`;
      } else if (ideaCombiningFrom) {
        combineBtn = `<button type="button" class="idea-link-btn is-active" onclick="completeIdeaCombine('${bank}','${id}','${safeText}')">🔀 Combinar con ésta</button>`;
      } else {
        combineBtn = `<button type="button" class="idea-link-btn" onclick="startIdeaCombine('${bank}','${id}','${type}','${safeText}')">🔀 Combinar con otra idea</button>`;
      }

      const tags = linked.map(l => `
        <span class="idea-link-tag">
          <a href="javascript:void(0)" onclick="showView('${IDEA_BANK_SECRET_VIEW[l.bank] || ''}')">🔗 ${escapeAttr(l.label)}</a>
          <button type="button" onclick="unlinkIdeas('${bank}','${id}','${l.bank}','${l.id}')" title="Quitar este enlace">✕</button>
        </span>`).join('');
      return `<div class="idea-link-row">${linkBtn}${combineBtn}${tags}</div>`;
    }

    // Backlog #38 — motivo de descarte guardado, no solo el hecho: al
    // descartar (nunca al restaurar) se pregunta un motivo corto,
    // opcional — cancelar el prompt sigue descartando sin motivo, no
    // bloquea la acción.
    function toggleIdeaDiscard(bank, id){
      const state = (loadIdeaBanks()[bank] || {})[id] || {};
      const discarding = !state.discarded;
      const patch = {discarded: discarding, discardedAt: discarding ? Date.now() : null};
      if (discarding) {
        const reason = prompt('¿Por qué la descartas? (opcional, déjalo en blanco si no quieres poner nada)', '');
        patch.discardReason = reason ? reason.trim() : '';
      } else {
        patch.discardReason = '';
      }
      setIdeaState(bank, id, patch);
      if (IDEA_BANK_RENDERERS[bank]) IDEA_BANK_RENDERERS[bank]();
    }

    // Fecha corta y legible para mostrar junto a cada idea descartada
    // (mejora #29 de la lista de 150: "papelera real, con fecha").
    function formatDiscardedDate(ts){
      if (!ts) return '';
      try {
        return new Date(ts).toLocaleDateString('es-ES', {day:'numeric', month:'short', year:'numeric'});
      } catch (e) { return ''; }
    }

    // Descarta de golpe TODAS las ideas de un tipo (p. ej. cuando toda
    // una categoría deja de tener sentido a corto plazo, como el
    // tufting sin máquina) — evita tener que ir una por una. Sigue
    // siendo reversible: cada una se puede restaurar suelta luego.
    function discardAllOfType(bank, type, count){
      if (!confirm(`¿Descartar las ${count} ideas de este tipo? Se pueden restaurar luego, una a una, desde "descartadas".`)) return;
      const banks = loadIdeaBanks();
      const bankState = banks[bank] || (banks[bank] = {});
      for (let i = 0; i < count; i++) {
        const id = `${type}-${i}`;
        bankState[id] = Object.assign({}, bankState[id], { discarded: true });
      }
      saveIdeaBanks(banks);
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

      // Backlog #36 — buscador interno por banco: filtra las tarjetas
      // visibles por texto, pero NUNCA la lista de descartadas (esa
      // sigue mostrando todo, tenga o no la búsqueda algo escrito) ni
      // los índices reales (`${type}-${i}` tiene que seguir apuntando a
      // la idea correcta aunque esté oculta por el filtro).
      const searchQuery = (document.getElementById(cfg.bank + 'IdeaSearch')?.value || '').trim().toLowerCase();

      const discardedItems = [];
      let html = "";
      Object.keys(cfg.ideasByType).forEach(type => {
        const ideas = cfg.ideasByType[type];
        const emoji = (cfg.typeLabels[type] || '💡').split(' ')[0];
        let matchCount = 0;
        const rows = ideas.map((idea, i) => {
          const id = `${type}-${i}`;
          const s = bankState[id] || {};
          if (s.discarded) discardedItems.push({id, label: idea, discardedAt: s.discardedAt, discardReason: s.discardReason});
          if (searchQuery && !idea.toLowerCase().includes(searchQuery)) return '';
          matchCount++;
          return `
          <div class="idea-card${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${cfg.bank}','${id}', this)"
              title="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}"
              aria-label="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}">${s.done ? '✅' : emoji}</button>
            <div class="idea-body">
              <div class="template-head" style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                <span class="type-chip type-${type}">${cfg.typeLabels[type]}</span>
                <span class="count">#${i + 1}</span>
              </div>
              <p style="margin:6px 0 0">${escapeHTML(idea)}</p>
              ${ideaLinkControlsHTML(cfg.bank, id, type, idea)}
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${cfg.bank}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`;
        }).join('');
        if (searchQuery && matchCount === 0) return; // categoría entera sin coincidencias: no la mostramos
        html += `
          <details class="month" data-type="${type}"${(openTypes.has(type) || searchQuery) ? ' open' : ''}>
            <summary>
              <span>${cfg.typeLabels[type]}</span>
              <span class="count">${searchQuery ? `${matchCount} de ${ideas.length}` : `${ideas.length} ideas`}</span>
            </summary>
            <div class="month-body">
              <button type="button" class="idea-discard-all-btn" onclick="event.preventDefault();discardAllOfType('${cfg.bank}','${type}',${ideas.length})">🗑️ Descartar toda esta categoría</button>
              ${rows}
            </div>
          </details>`;
      });
      container.innerHTML = html || (searchQuery ? emptyStateHTML(`Nada coincide con "${escapeAttr(searchQuery)}" en este banco.`) : html);
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
      // plannedGames = del código (fijo en todos los dispositivos); si no
      // hay nada ahí, miramos la capa "extra" que se asigna a mano desde
      // Game Match (localStorage, solo en este navegador hasta que se
      // suba al código con un guion real).
      const planned = plannedGames[day] || loadExtraPlannedGames()[day];

      if (published) {
        return { html: `
          <div class="day-card unlocked">
            <div class="day-thumb" data-game="${escapeAttr(published.name)}">${published.emoji || "🎮"}</div>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · ✅ PUBLICADO</div>
              <h4><a href="${published.videoUrl}" target="_blank" rel="noopener">▶ ${published.name}</a></h4>
              <p>${published.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${published.difficulty}">${DIFF_LABELS[published.difficulty] || published.difficulty}</span>
                ${published.duration ? `<span class="diff-chip chip-neutral">⏱️ ${published.duration}</span>` : ''}
                ${published.platform ? `<span class="diff-chip chip-neutral">${PLATFORM_LABELS[published.platform] || published.platform}</span>` : ''}
                <a class="diff-chip chip-neutral" href="${published.steamUrl}" target="_blank" rel="noopener">🛒 Steam ↗</a>
              </div>
            </div>
          </div>`, difficulty: published.difficulty };
      }

      if (planned) {
        const id = `day-${day}`;
        const s = (plannedBankState && plannedBankState[id]) || {};
        const statusBadge = planned.script ? '✍️ CREANDO GUION' : '📝 DECIDIDO (sin grabar)';
        return {
          html: `
          <div class="day-card planned${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="day-thumb idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${RETRO_PLANNED_BANK}','${id}', this)"
              title="${s.done ? 'Quitar confirmación' : 'Confirmar que sigues queriendo este juego para este día'}"
              aria-label="${s.done ? 'Quitar confirmación' : 'Confirmar que sigues queriendo este juego para este día'}">${s.done ? '✅' : (planned.emoji || "📝")}</button>
            <div class="day-info">
              <div class="day-badge">DÍA ${String(day).padStart(3,"0")} · ${statusBadge}</div>
              <h4><a href="${planned.steamUrl}" target="_blank" rel="noopener">${planned.name} ↗</a></h4>
              <p>${planned.summary}</p>
              <div class="day-meta">
                <span class="diff-chip diff-${planned.difficulty}">${DIFF_LABELS[planned.difficulty] || planned.difficulty}</span>
              </div>
              ${planned.script ? `
                <details class="month" style="margin-top:12px">
                  <summary><span>✍️ Guion</span><span class="count">ver</span></summary>
                  <div class="month-body">
                    <div class="panel">${planned.script}</div>
                    <button type="button" class="btn btn-secondary" style="margin-top:12px" onclick="openRecordingMode('retro-day-${day}', this)">🖥️ Modo grabación</button>
                  </div>
                </details>` : ''}
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${RETRO_PLANNED_BANK}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`,
          discarded: !!s.discarded,
          discardedAt: s.discardedAt,
          discardReason: s.discardReason,
          id,
          label: `Día ${String(day).padStart(3,"0")} · ${planned.name}`,
          difficulty: planned.difficulty
        };
      }

      return { html: `<div class="undecided-row">DÍA ${String(day).padStart(3,"0")} · ❔ aún sin decidir</div>`, difficulty: null };
    }

    function renderSecret(){
      const container = document.getElementById('secretMonthsContainer');
      const plannedBankState = loadIdeaBanks()[RETRO_PLANNED_BANK] || {};
      const difficultyFilter = document.getElementById('retroDifficultyFilter')?.value || '';
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
          if (card.discarded) discardedItems.push({id: card.id, label: card.label, discardedAt: card.discardedAt, discardReason: card.discardReason});
          // Filtro de dificultad (mejora #3 del backlog): un día sin
          // dificultad todavía (sin decidir) no coincide con ningún
          // filtro concreto, así que se oculta también — el filtro solo
          // tiene sentido si enseña justo lo que pediste.
          if (difficultyFilter && card.difficulty !== difficultyFilter) continue;
          cards += card.html;
        }
        if (difficultyFilter && !cards) return; // mes entero sin coincidencias: no mostrar el desplegable vacío
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
      hydrateGameThumbs(container);
      container.classList.toggle('hide-discarded', getHideDiscardedPref(RETRO_PLANNED_BANK));

      // Racha (mejora #2 del backlog): días consecutivos publicados desde
      // el día 1 sin ningún hueco — es la racha del reto en sí, no de
      // fechas de calendario reales (el reto no obliga a un día natural
      // por entrada).
      let streak = 0;
      while (completedGames[streak + 1]) streak++;

      document.getElementById('secretSummary').textContent =
        `✅ ${publishedCount} publicados · 📝 ${plannedCount} decididos sin grabar · ❔ ${totalDays - publishedCount - plannedCount} por decidir` +
        (streak > 0 ? ` · 🔥 racha de ${streak} día${streak === 1 ? '' : 's'}` : '');

      const counterEl = document.getElementById('retroDiscardCounter');
      if (counterEl) counterEl.textContent = `🗑️ ${discardedItems.length} juego${discardedItems.length === 1 ? '' : 's'} descartado${discardedItems.length === 1 ? '' : 's'}`;
      const discardedCountEl = document.getElementById('retroDiscardedCount');
      if (discardedCountEl) discardedCountEl.textContent = discardedItems.length;
      const discardedListEl = document.getElementById('retroDiscardedListBody');
      if (discardedListEl) discardedListEl.innerHTML = discardedListHTML(RETRO_PLANNED_BANK, discardedItems);
      const hideCheckbox = document.getElementById('retroHideDiscarded');
      if (hideCheckbox) hideCheckbox.checked = getHideDiscardedPref(RETRO_PLANNED_BANK);
      // El mazo Tinder ya no vive aquí (mudado a HELQUIDGAMES, ver showView).
      renderRetroNextDaySuggestion();
      if (typeof renderRetroUploadsSidebar === 'function') renderRetroUploadsSidebar();
    }
    IDEA_BANK_RENDERERS[RETRO_PLANNED_BANK] = renderSecret;

    // Backlog #116, retirado 9 sep junto con Game Match: Iván confirmó que
    // los juegos del reto ya están decididos, así que ya no tiene sentido
    // avisar de "preselección esperando en Game Match" (la herramienta ya
    // no existe). Se deja la función (no la borro, por si algún día vuelve
    // a hacer falta un mecanismo similar) pero siempre oculta.
    function renderRetroNextDaySuggestion(){
      const el = document.getElementById('retroNextSuggestion');
      if (el) el.hidden = true;
    }

    // ──────────────────────────────────────────────────────────
    // MAZO ESTILO TINDER (chuleta secreta de Retro 365): forma rápida
    // de repasar un JSON grande de candidatos (pensado para cientos,
    // incluso miles) y quedarte solo con los que te interesan — ❤️ los
    // guarda en una "preselección", ✖️ simplemente pasa al siguiente sin
    // guardarlo. Solo se pinta UNA tarjeta a la vez (nunca la lista
    // entera), así que aguanta mazos grandes sin problema de rendimiento.
    // Todo vive en localStorage: es una herramienta de curación personal
    // tuya, no contenido que otros dispositivos necesiten ver igual.
    // ──────────────────────────────────────────────────────────
    const SWIPE_CANDIDATES_KEY = 'charkuma_retro365_swipe_candidates';
    const SWIPE_INDEX_KEY = 'charkuma_retro365_swipe_index';
    const SWIPE_SHORTLIST_KEY = 'charkuma_retro365_swipe_shortlist';
    // Bug real reportado por el usuario: "siempre repito las opciones ya
    // aprobadas". Causa: ni "Cargar catálogo completo" ni pegar un JSON
    // nuevo comprobaban qué se había decidido ya — solo miraban el
    // "shortlist" actual (que además pierde entradas al asignarlas a un
    // día de Retro 365) o los candidatos cargados en ese momento. Este
    // registro es la memoria PERMANENTE de nombres ya decididos (me
    // gusta o paso), nunca se borra al recargar el catálogo, cambiar de
    // JSON ni asignar un juego a un día — así nunca vuelve a aparecer
    // algo sobre lo que ya te has pronunciado.
    const SWIPE_DECIDED_KEY = 'charkuma_retro365_swipe_decided';

    function loadSwipeCandidates(){ try { return JSON.parse(localStorage.getItem(SWIPE_CANDIDATES_KEY)) || []; } catch (e) { return []; } }
    function saveSwipeCandidates(arr){ try { localStorage.setItem(SWIPE_CANDIDATES_KEY, JSON.stringify(arr)); } catch (e) { /* seguimos sin guardar */ } }
    function loadSwipeIndex(){ try { return Number(localStorage.getItem(SWIPE_INDEX_KEY)) || 0; } catch (e) { return 0; } }
    function saveSwipeIndex(i){ try { localStorage.setItem(SWIPE_INDEX_KEY, String(i)); } catch (e) {} }
    function loadSwipeShortlist(){ try { return JSON.parse(localStorage.getItem(SWIPE_SHORTLIST_KEY)) || []; } catch (e) { return []; } }
    function saveSwipeShortlist(arr){ try { localStorage.setItem(SWIPE_SHORTLIST_KEY, JSON.stringify(arr)); } catch (e) {} }
    function loadSwipeDecided(){ try { return JSON.parse(localStorage.getItem(SWIPE_DECIDED_KEY)) || []; } catch (e) { return []; } }
    function saveSwipeDecided(arr){ try { localStorage.setItem(SWIPE_DECIDED_KEY, JSON.stringify(arr)); } catch (e) {} }
    function markSwipeDecided(name){
      const decided = loadSwipeDecided();
      const key = name.toLowerCase();
      if (!decided.includes(key)) { decided.push(key); saveSwipeDecided(decided); }
    }
    // Migración de una sola vez: si ya había un "shortlist" (me gusta) de
    // antes de que existiera este registro, sus nombres cuentan como
    // decididos desde ya, sin que el usuario tenga que hacer nada.
    function ensureSwipeDecidedSeeded(){
      let seeded = false;
      try { seeded = localStorage.getItem('charkuma_swipe_decided_seeded') === '1'; } catch (e) {}
      if (seeded) return;
      const decided = new Set(loadSwipeDecided());
      loadSwipeShortlist().forEach(g => { if (g && g.name) decided.add(g.name.toLowerCase()); });
      saveSwipeDecided(Array.from(decided));
      try { localStorage.setItem('charkuma_swipe_decided_seeded', '1'); } catch (e) {}
    }

    // ──────────────────────────────────────────────────────────
    // Asignar directamente un "me gusta" de Game Match a un día de
    // Retro 365, sin pasar por Claude — a petición del usuario. Vive en
    // localStorage aparte de `plannedGames` (que es del código, fijo
    // para todos los dispositivos); esta capa "extra" se fusiona por
    // encima en secretDayCardHTML, igual que ya se hace con los bancos
    // de ideas normales (código + localStorage por encima).
    // ──────────────────────────────────────────────────────────
    const EXTRA_PLANNED_KEY = 'charkuma_retro365_extra_planned';
    function loadExtraPlannedGames(){ try { return JSON.parse(localStorage.getItem(EXTRA_PLANNED_KEY)) || {}; } catch (e) { return {}; } }
    function saveExtraPlannedGames(map){ try { localStorage.setItem(EXTRA_PLANNED_KEY, JSON.stringify(map)); } catch (e) {} }

    // ──────────────────────────────────────────────────────────
    // SINCRONIZACIÓN DE GAME MATCH ENTRE DISPOSITIVOS (2026-09-07):
    // igual que las notas, todo el estado del mazo (candidatos, índice,
    // preselección y asignaciones a días) vive también en un documento
    // de Firestore (`gameMatch/state`), no solo en localStorage de este
    // navegador. Un cambio en el móvil se ve en el PC y viceversa, en
    // tiempo real. Si Firestore no está disponible (sin conexión, o
    // falló al iniciar), todo sigue funcionando solo en local, como
    // antes — nunca rompe la web por esto.
    //
    // Diseño simple a propósito (como las notas): "gana la última
    // escritura", sin fusión inteligente de conflictos — para un solo
    // usuario en un par de dispositivos es más que suficiente, y mantiene
    // esto entendible.
    // ──────────────────────────────────────────────────────────
    function pushGameMatchState(){
      if (!firestoreReady()) return;
      const { doc, setDoc } = window.firestoreFns;
      const data = {
        candidates: loadSwipeCandidates(),
        index: loadSwipeIndex(),
        shortlist: loadSwipeShortlist(),
        decided: loadSwipeDecided(),
        extraPlanned: loadExtraPlannedGames(),
        updatedAt: Date.now()
      };
      setDoc(doc(window.firestoreDB, 'gameMatch', 'state'), data).catch(() => {
        // Sin conexión ahora mismo: el cambio se queda en local y ya
        // está — no hacemos cola de reintentos, para no complicarlo.
      });
    }

    let gameMatchRealtimeStarted = false;
    async function initGameMatchRealtime(){
      if (!firestoreReady() || gameMatchRealtimeStarted) return;
      gameMatchRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'gameMatch', 'state');
      onSnapshot(ref, async (snap) => {
        if (!snap.exists()) {
          // Nadie ha usado Game Match todavía en ningún dispositivo:
          // sembramos el catálogo y esa es la primera versión compartida.
          await loadFullCatalogIntoDeck(); // guarda en local Y sube a Firestore
          return;
        }
        const data = snap.data() || {};
        if (Array.isArray(data.candidates)) saveSwipeCandidates(data.candidates);
        if (typeof data.index === 'number') saveSwipeIndex(data.index);
        if (Array.isArray(data.shortlist)) saveSwipeShortlist(data.shortlist);
        if (Array.isArray(data.decided)) {
          saveSwipeDecided(data.decided);
        } else {
          // Doc antiguo, de antes de que existiera este registro: lo
          // migramos desde el shortlist ya sincronizado y lo subimos, así
          // el resto de dispositivos también lo reciben.
          ensureSwipeDecidedSeeded();
          pushGameMatchState();
        }
        if (data.extraPlanned && typeof data.extraPlanned === 'object') saveExtraPlannedGames(data.extraPlanned);
        try { localStorage.setItem(CATALOG_SEEDED_KEY, '1'); } catch (e) {}
        if (document.getElementById('view-helquid-game-match')?.classList.contains('active') && typeof renderSwipeDeck === 'function') renderSwipeDeck();
        if (document.getElementById('view-retro-secret')?.classList.contains('active') && typeof renderSecret === 'function') renderSecret();
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    // Backlog #41 — migrar los bancos de ideas a Firestore: mismo
    // patrón "un documento compartido" que Game Match/notas, con
    // "el último que escribe gana" — sin fusión de conflictos, a
    // propósito, igual que el resto de esta web. Cubre el estado de
    // cada idea (hecha/descartada/motivo, #29/#38) y las ideas "extra"
    // añadidas a mano, generadas o combinadas (#33) en los 6 bancos.
    const EXTRA_IDEAS_BANKS = ['helquid', 'lab', 'ia', 'creator', 'hecho'];
    function pushIdeaBanksState(){
      if (!firestoreReady()) return;
      const { doc, setDoc } = window.firestoreFns;
      const extraIdeas = {};
      EXTRA_IDEAS_BANKS.forEach(bank => { extraIdeas[bank] = loadBankExtraIdeas(bank); });
      const data = {
        ideaBanksState: loadIdeaBanks(),
        extraIdeas,
        rinconExtraIdeas: loadRinconExtraIdeas(),
        updatedAt: Date.now()
      };
      setDoc(doc(window.firestoreDB, 'ideaBanks', 'state'), data).catch(() => {
        // Sin conexión ahora mismo: se queda en local, sin cola de reintentos.
      });
    }

    let ideaBanksRealtimeStarted = false;
    async function initIdeaBanksRealtime(){
      if (!firestoreReady() || ideaBanksRealtimeStarted) return;
      ideaBanksRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'ideaBanks', 'state');
      onSnapshot(ref, (snap) => {
        if (!snap.exists()) {
          // Nadie ha tocado nada desde ningún dispositivo todavía —
          // subimos el estado local (vacío o lo que sea) como primera
          // versión compartida, igual que hace Game Match con el catálogo.
          pushIdeaBanksState();
          return;
        }
        const data = snap.data() || {};
        applyingRemoteIdeaBanksUpdate = true;
        try {
          if (data.ideaBanksState && typeof data.ideaBanksState === 'object') saveIdeaBanks(data.ideaBanksState);
          if (data.extraIdeas && typeof data.extraIdeas === 'object') {
            EXTRA_IDEAS_BANKS.forEach(bank => {
              if (data.extraIdeas[bank]) saveBankExtraIdeas(bank, data.extraIdeas[bank]);
            });
          }
          if (data.rinconExtraIdeas && typeof data.rinconExtraIdeas === 'object') saveRinconExtraIdeas(data.rinconExtraIdeas);
        } finally {
          applyingRemoteIdeaBanksUpdate = false;
        }
        // Repintar cualquier banco/vista que esté abierta ahora mismo.
        Object.values(IDEA_BANK_RENDERERS).forEach(fn => fn());
        if (typeof renderRinconSecret === 'function') renderRinconSecret();
        if (document.getElementById('view-idea-swipe')?.classList.contains('active') && typeof renderIdeaSwipeStage === 'function') renderIdeaSwipeStage();
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    function assignShortlistGameToDay(index){
      const shortlist = loadSwipeShortlist();
      const game = shortlist[index];
      if (!game) return;
      const input = document.getElementById(`shortlistDayInput-${index}`);
      const day = input ? parseInt(input.value, 10) : NaN;
      if (!day || day < 1 || day > 365) { alert('Escribe un día válido, del 1 al 365.'); return; }

      if (completedGames[day]) { alert(`El día ${day} ya está publicado (${completedGames[day].name}) — elige otro.`); return; }
      if (plannedGames[day]) { alert(`El día ${day} ya está decidido en el código (${plannedGames[day].name}) — elige otro.`); return; }
      const extra = loadExtraPlannedGames();
      if (extra[day]) { if (!confirm(`El día ${day} ya tiene asignado "${extra[day].name}" — ¿sustituirlo por "${game.name}"?`)) return; }

      extra[day] = { name: game.name, summary: game.summary, difficulty: game.difficulty, emoji: game.emoji, steamUrl: game.steamUrl || '', videoUrl: game.videoUrl || '' };
      saveExtraPlannedGames(extra);

      shortlist.splice(index, 1);
      saveSwipeShortlist(shortlist);
      renderSwipeShortlist();
      pushGameMatchState();
      alert(`✅ "${game.name}" asignado al día ${day} de Retro 365. Ya aparece decidido en la chuleta secreta.`);
    }

    // Los teclados móviles (Gboard, iOS) suelen "corregir" comillas rectas
    // por comillas tipográficas ( " " ' ' ) al escribir o pegar, lo que
    // rompe JSON.parse aunque el contenido sea correcto — es el bug real
    // que reportó el usuario desde Android. También limpiamos espacios
    // raros y caracteres invisibles que a veces vienen al copiar desde
    // apps de notas.
    function sanitizeJsonText(text){
      return text
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"')   // comillas dobles tipograficas -> rectas
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")   // comillas simples tipograficas -> rectas
        .replace(/[\u00A0\u2007\u202F]/g, ' ')          // espacios especiales -> espacio normal
        .replace(/[\u200B-\u200D\uFEFF]/g, '');         // caracteres invisibles (zero-width, BOM)
    }

    function importSwipeCandidates(){
      const textarea = document.getElementById('swipeJsonImport');
      const statusEl = document.getElementById('swipeImportStatus');
      if (!textarea || !statusEl) return;
      let parsed;
      try { parsed = JSON.parse(textarea.value); }
      catch (e) {
        try { parsed = JSON.parse(sanitizeJsonText(textarea.value)); }
        catch (e2) { statusEl.textContent = '❌ Eso no es JSON válido — revisa comillas y comas.'; return; }
      }
      if (!Array.isArray(parsed)) { statusEl.textContent = '❌ Tiene que ser un array de juegos, entre corchetes [ ].'; return; }

      const clean = parsed.filter(g => g && g.name).map(g => {
        const difficulty = ['facil', 'media', 'dificil', 'muydificil'].includes(g.difficulty) ? g.difficulty : 'media';
        return {
          name: String(g.name),
          summary: g.summary ? String(g.summary) : '',
          difficulty,
          emoji: g.emoji || defaultEmojiForDifficulty(difficulty),
          steamUrl: g.steamUrl || '',
          videoUrl: g.videoUrl || ''
        };
      });
      if (!clean.length) { statusEl.textContent = '⚠️ No he encontrado ningún juego válido ahí (falta el campo "name").'; return; }

      // Se AÑADE al mazo que ya tengas (normalmente el catálogo incorporado),
      // no lo reemplaza — así pegar un par de juegos sueltos no borra los
      // 417 del catálogo. Evita duplicados por nombre con lo que ya había.
      const existing = loadSwipeCandidates();
      const existingNames = new Set(existing.map(g => g.name.toLowerCase()));
      const decided = new Set(loadSwipeDecided());
      const toAdd = clean.filter(g => !existingNames.has(g.name.toLowerCase()) && !decided.has(g.name.toLowerCase()));
      saveSwipeCandidates(existing.concat(toAdd));
      const skipped = clean.length - toAdd.length;
      statusEl.textContent = `✅ Añadidos ${toAdd.length} candidato${toAdd.length === 1 ? '' : 's'} nuevo${toAdd.length === 1 ? '' : 's'}`
        + (skipped > 0 ? ` (${skipped} ya estaban en el mazo o ya los habías decidido antes).` : '.');
      textarea.value = '';
      renderSwipeDeck();
      pushGameMatchState();
    }

    function resetSwipeDeck(){
      if (!confirm('¿Reiniciar el mazo? Esto no borra tu preselección de "me gusta", solo vuelve a empezar desde el primer candidato SIN decidir todavía (los que ya dijiste sí o no no se repiten).')) return;
      // Al reiniciar quitamos del array los que ya estén decididos (por si
      // venían de antes de este arreglo) — así el índice 0 siempre apunta
      // a algo pendiente de verdad, nunca a algo que ya se decidió.
      const decided = new Set(loadSwipeDecided());
      const remaining = loadSwipeCandidates().filter(g => g && g.name && !decided.has(g.name.toLowerCase()));
      saveSwipeCandidates(remaining);
      saveSwipeIndex(0);
      renderSwipeDeck();
      pushGameMatchState();
    }

    // ──────────────────────────────────────────────────────────
    // CATÁLOGO INCORPORADO (backlog: "no quiero tener que pegar JSON cada
    // vez"): 417 juegos reales, sacados de RAWG (PC/Steam, móvil y
    // Nintendo, 2005 en adelante, Metacritic ≥60, deduplicados) — no
    // llegan a 500 porque se descartó rellenar con juegos de menos nota
    // solo por cuadrar el número. Vive en game-catalog.json aparte (no
    // inline en este archivo) para no engordar app.js con datos que no
    // hacen falta en cada carga de página. Se carga sola la primera vez
    // que se abre el mazo; después, un botón deja recargarla cuando
    // quieras (p. ej. tras terminar de decidir sobre todos).
    // ──────────────────────────────────────────────────────────
    const CATALOG_SEEDED_KEY = 'charkuma_game_catalog_seeded';
    let gameCatalogCache = null;
    async function fetchGameCatalog(){
      if (gameCatalogCache) return gameCatalogCache;
      const res = await fetch('game-catalog.json');
      if (!res.ok) throw new Error('No se pudo cargar game-catalog.json');
      gameCatalogCache = await res.json();
      return gameCatalogCache;
    }
    async function loadFullCatalogIntoDeck(){
      const statusEl = document.getElementById('swipeImportStatus');
      if (statusEl) statusEl.textContent = '⏳ Cargando catálogo…';
      try {
        ensureSwipeDecidedSeeded();
        const catalog = await fetchGameCatalog();
        const decided = new Set(loadSwipeDecided());
        const fresh = catalog.filter(g => g && g.name && !decided.has(g.name.toLowerCase()));
        const skipped = catalog.length - fresh.length;
        saveSwipeCandidates(fresh);
        saveSwipeIndex(0);
        try { localStorage.setItem(CATALOG_SEEDED_KEY, '1'); } catch (e) {}
        if (statusEl) statusEl.textContent = skipped > 0
          ? `✅ Catálogo cargado — ${fresh.length} juegos nuevos por decidir (${skipped} ya los habías decidido antes, no se repiten).`
          : `✅ Catálogo cargado — ${fresh.length} juegos reales listos para decidir.`;
        renderSwipeDeck();
        pushGameMatchState();
      } catch (e) {
        if (statusEl) statusEl.textContent = '❌ No se pudo cargar el catálogo — revisa tu conexión e inténtalo de nuevo.';
      }
    }
    // Primera vez que se abre el mazo en este navegador (nunca se ha
    // pegado nada ni se ha cargado el catálogo antes): lo rellenamos
    // solos, sin que haga falta pegar ningún JSON.
    async function autoSeedCatalogIfNeeded(){
      // Con Firestore disponible, el listener en tiempo real
      // (initGameMatchRealtime) ya se encarga de esto — sembrar aquí
      // además solo duplicaría trabajo. Esto es el respaldo para cuando
      // no hay conexión con Firestore (offline, o falló al iniciar).
      if (firestoreReady()) return;
      let seeded = false;
      try { seeded = localStorage.getItem(CATALOG_SEEDED_KEY) === '1'; } catch (e) {}
      if (seeded || loadSwipeCandidates().length > 0) return;
      await loadFullCatalogIntoDeck();
    }

    function renderSwipeDeck(){
      const stage = document.getElementById('swipeStage');
      const controls = document.getElementById('swipeControls');
      const counterEl = document.getElementById('swipeCounter');
      if (!stage || !controls || !counterEl) return;

      const candidates = loadSwipeCandidates();
      const index = loadSwipeIndex();
      const card = candidates[index];

      const randomRow = document.getElementById('swipeRandomRow');
      const keyboardHint = document.getElementById('swipeKeyboardHint');

      if (!candidates.length) {
        stage.innerHTML = `<p class="yt-empty">Pega tu JSON arriba para empezar a elegir.</p>`;
        controls.hidden = true;
        if (randomRow) randomRow.hidden = true;
        if (keyboardHint) keyboardHint.hidden = true;
        counterEl.textContent = '';
      } else if (!card) {
        stage.innerHTML = `<p class="yt-empty">✅ Ya has decidido sobre todos los candidatos cargados (${candidates.length}). Pega un JSON nuevo para seguir, o revisa tu preselección abajo.</p>`;
        controls.hidden = true;
        if (randomRow) randomRow.hidden = true;
        if (keyboardHint) keyboardHint.hidden = true;
        counterEl.textContent = '';
      } else {
        // Si el candidato ya trae su propio videoUrl (gameplay real, tráiler...)
        // lo usamos tal cual; si no, generamos un enlace de búsqueda en YouTube
        // — nunca nos inventamos un vídeo concreto que no sabemos si existe.
        const hasRealVideo = !!card.videoUrl;
        const videoUrl = hasRealVideo
          ? card.videoUrl
          : `https://www.youtube.com/results?search_query=${encodeURIComponent(card.name + ' gameplay')}`;
        const videoLabel = hasRealVideo ? '▶️ Ver gameplay' : '🔍 Buscar gameplay en YouTube';
        stage.innerHTML = `
          <div class="swipe-card" id="activeSwipeCard">
            <div class="swipe-badge-like" id="swipeBadgeLike">ME GUSTA</div>
            <div class="swipe-badge-pass" id="swipeBadgePass">PASO</div>
            <div class="swipe-card-emoji" id="swipeCardCover">${card.emoji}</div>
            <h4>${escapeHTML(card.name)}</h4>
            <span class="diff-chip diff-${card.difficulty}">${DIFF_LABELS[card.difficulty] || card.difficulty}</span>
            ${card.summary ? `<p>${escapeHTML(card.summary)}</p>` : ''}
            <a class="swipe-video-link" href="${videoUrl}" target="_blank" rel="noopener"
               onpointerdown="event.stopPropagation()" onclick="event.stopPropagation()">${videoLabel}</a>
          </div>`;
        controls.hidden = false;
        if (randomRow) randomRow.hidden = false;
        if (keyboardHint) keyboardHint.hidden = false;
        counterEl.textContent = `${index + 1} / ${candidates.length}`;
        initSwipeDrag(document.getElementById('activeSwipeCard'));
        hydrateSwipeCardCover(card.name, index);
      }
      renderSwipeShortlist();
    }

    // Portada real vía RAWG (mismo mecanismo que en los días de Retro
    // 365), aplicada a la tarjeta activa del mazo. Comprueba el índice al
    // resolver por si el usuario ya pasó a otra tarjeta mientras tanto
    // (evita pegar la portada equivocada encima de la tarjeta nueva).
    async function hydrateSwipeCardCover(name, expectedIndex){
      const url = await fetchGameCoverUrl(name);
      if (!url) return;
      if (loadSwipeIndex() !== expectedIndex) return;
      const cover = document.getElementById('swipeCardCover');
      if (!cover) return;
      cover.innerHTML = `<img src="${url}" alt="${escapeAttr(name)}" loading="lazy">`;
    }

    // Backlog #7: en vez de ir siempre en orden, "saltar" a un candidato
    // al azar de una dificultad concreta que todavía no se haya decidido
    // — útil para planificar variando el ritmo en vez de darle a todo
    // "fácil" seguido o todo "muy difícil" seguido. No se pierde el
    // progreso: el candidato saltado simplemente pasa a ocupar la
    // posición actual, así que su turno de decidirlo llega ahora.
    function swipeRandomByDifficulty(){
      const sel = document.getElementById('swipeRandomDifficulty');
      const difficulty = sel ? sel.value : '';
      const candidates = loadSwipeCandidates();
      const index = loadSwipeIndex();
      const statusEl = document.getElementById('swipeImportStatus');

      const pool = [];
      for (let i = index; i < candidates.length; i++){
        if (!difficulty || candidates[i].difficulty === difficulty) pool.push(i);
      }
      if (!pool.length) {
        if (statusEl) statusEl.textContent = difficulty
          ? `⚠️ No queda ningún candidato de dificultad "${DIFF_LABELS[difficulty] || difficulty}" por decidir.`
          : '⚠️ No queda ningún candidato por decidir.';
        return;
      }
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      if (chosen !== index) {
        const tmp = candidates[index];
        candidates[index] = candidates[chosen];
        candidates[chosen] = tmp;
        saveSwipeCandidates(candidates);
      }
      if (statusEl) statusEl.textContent = '';
      renderSwipeDeck();
    }

    // Arrastre real con el ratón/dedo (pointer events cubren ambos a la
    // vez) — mueve y rota la tarjeta según el arrastre, y si supera el
    // umbral al soltar, dispara la decisión; si no, vuelve al centro.
    function initSwipeDrag(el){
      if (!el) return;
      let startX = 0, currentX = 0, dragging = false;
      const likeBadge = document.getElementById('swipeBadgeLike');
      const passBadge = document.getElementById('swipeBadgePass');

      const onDown = (e) => {
        dragging = true;
        startX = e.clientX;
        el.classList.add('swiping');
        el.setPointerCapture && e.pointerId != null && el.setPointerCapture(e.pointerId);
      };
      const onMove = (e) => {
        if (!dragging) return;
        currentX = e.clientX - startX;
        el.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
        if (likeBadge) likeBadge.style.opacity = Math.max(0, Math.min(1, currentX / 80));
        if (passBadge) passBadge.style.opacity = Math.max(0, Math.min(1, -currentX / 80));
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('swiping');
        if (currentX > 100) swipeDecision('like');
        else if (currentX < -100) swipeDecision('pass');
        else {
          el.style.transform = '';
          if (likeBadge) likeBadge.style.opacity = 0;
          if (passBadge) passBadge.style.opacity = 0;
        }
        currentX = 0;
      };

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
    }

    function swipeDecision(action){
      const candidates = loadSwipeCandidates();
      const index = loadSwipeIndex();
      const card = candidates[index];
      if (!card) return;

      const el = document.getElementById('activeSwipeCard');
      if (el) {
        el.style.transition = 'transform .3s ease, opacity .3s ease';
        el.style.transform = action === 'like' ? 'translateX(420px) rotate(20deg)' : 'translateX(-420px) rotate(-20deg)';
        el.style.opacity = '0';
      }
      if (action === 'like') {
        const shortlist = loadSwipeShortlist();
        shortlist.push(card);
        saveSwipeShortlist(shortlist);
      }
      markSwipeDecided(card.name);
      saveSwipeIndex(index + 1);
      setTimeout(renderSwipeDeck, 200);
      pushGameMatchState();
    }

    // Backlog #82 — navegación por teclado completa en el mazo Tinder de
    // Game Match: hasta ahora solo se podía decidir arrastrando con el
    // ratón/dedo o pulsando los botones ❤️/✖️ uno a uno con Tab+Intro,
    // sin atajo rápido. Mismo patrón que el modo grabación (#18):
    // ← / → deciden, pero solo si la vista está activa y el foco no
    // está escribiendo en un campo de texto (pegar JSON, buscador...).
    document.addEventListener('keydown', (e) => {
      const view = document.getElementById('view-helquid-game-match');
      if (!view || !view.classList.contains('active')) return;
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); swipeDecision('like'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); swipeDecision('pass'); }
    });

    function renderSwipeShortlist(){
      const panel = document.getElementById('swipeShortlistPanel');
      const listEl = document.getElementById('swipeShortlistList');
      const countEl = document.getElementById('swipeShortlistCount');
      if (!panel || !listEl || !countEl) return;
      const shortlist = loadSwipeShortlist();
      panel.hidden = shortlist.length === 0;
      countEl.textContent = shortlist.length;
      listEl.innerHTML = shortlist.map((g, i) => `
        <div class="discarded-row shortlist-row">
          <span>${g.emoji} ${escapeHTML(g.name)}</span>
          <div class="shortlist-assign">
            <input type="number" id="shortlistDayInput-${i}" class="shortlist-day-input" min="1" max="365" placeholder="día">
            <button type="button" class="btn btn-secondary" onclick="assignShortlistGameToDay(${i})">📅 Asignar a Retro 365</button>
            <button type="button" class="idea-discard-btn" onclick="removeFromSwipeShortlist(${i})">✕ Quitar</button>
          </div>
        </div>`).join('');
    }

    function removeFromSwipeShortlist(i){
      const shortlist = loadSwipeShortlist();
      shortlist.splice(i, 1);
      saveSwipeShortlist(shortlist);
      renderSwipeShortlist();
      pushGameMatchState();
    }

    function exportSwipeShortlist(){
      const shortlist = loadSwipeShortlist();
      if (!shortlist.length) { alert('Todavía no tienes ningún candidato en la preselección.'); return; }
      const text = JSON.stringify(shortlist, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => alert(`Preselección de ${shortlist.length} juego(s) copiada — pégamela en el chat para añadirlos a Retro 365.`),
          () => alert(text)
        );
      } else {
        alert(text);
      }
    }

    // ──────────────────────────────────────────────────────────
    // BARRA LATERAL "Retro 365 · Por subir" — control rápido, siempre
    // visible (mismo hueco que "Últimos vídeos"/"Notas rápidas"), de
    // qué días ya tienen guion escrito (plannedGames) pero todavía no
    // vídeo real publicado (completedGames). Pedido por Iván 17 sep.
    // ──────────────────────────────────────────────────────────
    function renderRetroUploadsSidebar(){
      const summaryEl = document.getElementById('retroUploadsSummary');
      const listEl = document.getElementById('retroUploadsList');
      if (!summaryEl || !listEl) return;

      const pendingDays = Object.keys(plannedGames)
        .map(Number)
        .filter(d => !completedGames[d])
        .sort((a, b) => a - b);

      const publishedCount = Object.keys(completedGames).length;

      summaryEl.textContent = `✅ ${publishedCount} subidos · ✍️ ${pendingDays.length} con guion listo esperando subir`;

      if (!pendingDays.length) {
        listEl.innerHTML = `<p class="yt-empty">${Object.keys(plannedGames).length ? '¡Todo lo escrito ya está subido!' : 'Todavía no hay guiones escritos.'}</p>`;
        return;
      }

      const NEXT_N = 8;
      listEl.innerHTML = pendingDays.slice(0, NEXT_N).map(day => {
        const g = plannedGames[day];
        return `
          <div class="pending-decision-item">
            <div class="pending-decision-text">
              <p>Día ${String(day).padStart(3,'0')} · ${g.emoji || '🎮'} ${g.name}</p>
              <span>${DIFF_LABELS[g.difficulty] || g.difficulty}</span>
            </div>
          </div>`;
      }).join('') + (pendingDays.length > NEXT_N
        ? `<p class="yt-sub-count" style="margin:6px 0 0">+ ${pendingDays.length - NEXT_N} día(s) más en la cola</p>`
        : '');
    }

    renderPublic();
    renderSecret();
    renderRetroUploadsSidebar();

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
      hydrateGameThumbs(container);
    }

    document.getElementById('gameSearch').addEventListener('input', renderRecent);
    document.getElementById('diffFilter').addEventListener('change', renderRecent);
    renderRecent();

    // ──────────────────────────────────────────────────────────
    // RINCÓN DEL FRIKI — contenido de Marvel / The Boys / Cruce
    // Añade aquí cada vídeo nuevo que subas (ver nota en la página).
    // ──────────────────────────────────────────────────────────