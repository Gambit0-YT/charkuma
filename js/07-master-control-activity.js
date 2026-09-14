    // ══════════ 07-master-control-activity.js ══════════
    // Registro de actividad, generador de ideas del Control Maestro, y buena parte de Control Maestro (lista/kanban, filtros, buscador de ese panel).
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    const ACTIVITY_LOG_KEY = 'charkuma_activity_log';
    function loadActivityLog(){
      try { return JSON.parse(localStorage.getItem(ACTIVITY_LOG_KEY)) || []; }
      catch (e) { return []; }
    }
    function saveActivityLog(list){
      try { localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(list.slice(-100))); }
      catch (e) { /* seguimos sin guardarlo, sin romper nada */ }
    }
    function logActivity(message, kind){
      const list = loadActivityLog();
      list.push({ ts: new Date().toISOString(), message, kind: kind || 'info' });
      saveActivityLog(list);
      renderActivityLog();
    }
    function renderActivityLog(){
      const listEl = document.getElementById('activityLogList');
      if (!listEl) return;
      const list = loadActivityLog().slice().reverse();

      const statsEl = document.getElementById('activityLogStats');
      if (statsEl) {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const thisWeek = list.filter(e => new Date(e.ts).getTime() >= weekAgo);
        const ideasThisWeek = thisWeek.filter(e => e.kind === 'idea').length;
        statsEl.textContent = list.length
          ? `📊 ${list.length} entrada${list.length === 1 ? '' : 's'} en total · ${thisWeek.length} esta semana (${ideasThisWeek} de ideas generadas)`
          : '';
      }

      listEl.innerHTML = list.length ? list.map(entry => {
        const d = new Date(entry.ts);
        const dateLabel = isNaN(d) ? '' : d.toLocaleString('es-ES', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' });
        const kindEmoji = entry.kind === 'bug' ? '🐛' : entry.kind === 'pending' ? '⏳' : entry.kind === 'idea' ? '💡' : 'ℹ️';
        return `<div class="activity-log-row"><span class="activity-log-time">${dateLabel}</span><span>${kindEmoji} ${escapeHTML(entry.message)}</span></div>`;
      }).join('') : `<p class="yt-empty" style="margin:0">Todavía no hay nada registrado.</p>`;
    }
    function clearActivityLog(){
      if (!confirm('¿Borrar todo el registro de actividad? No se puede deshacer.')) return;
      saveActivityLog([]);
      renderActivityLog();
    }

    // ──────────────────────────────────────────────────────────
    // GENERADOR DE IDEAS ("➕ Generar ideas" del Control Secreto
    // Maestro). La web es estática y no llama a ninguna IA en directo,
    // así que "generar" aquí significa combinar plantillas propias de
    // cada banco (frase con hueco) con una lista de temas variables,
    // evitando repetir texto exacto ya existente (base + extra) en ese
    // banco. El resultado se guarda igual que una importación JSON —
    // como ideas "extra" — y aparece marcado como pendiente, nunca
    // aprobado automáticamente.
    // ──────────────────────────────────────────────────────────
    const IDEA_GENERATOR_BASE = {
      helquid: helquidSecretIdeas, lab: labSecretIdeas, ia: iaSecretIdeas,
      creator: creatorSecretIdeas, hecho: hechoSecretIdeas
    };
    // Backlog #39 — sujetos reales de tendencia (VidIQ vidiq_trending_videos,
    // shorts en español, 2026-09-07) añadidos a Rincón del Friki y
    // HELQUIDGAMES — los dos bancos donde "qué está de moda ahora mismo"
    // tiene sentido real (los otros 4 son herramientas/proceso propio del
    // canal, no contenido de tendencia). Es una FOTO puntual, como las
    // estadísticas de VidIQ del canal — se queda desactualizada con el
    // tiempo y conviene refrescarla de vez en cuando con una nueva
    // consulta, no todos los días.
    const IDEA_GENERATORS = {
      rincon: {
        label: 'Rincón del Friki',
        subjects: ['el villano de moda ahora mismo','el héroe más infravalorado del momento','el antihéroe que todo el mundo comenta','la última incorporación al reparto','el crossover que nadie esperaba','el personaje secundario que se ha vuelto viral','la teoría fan más comentada esta semana','el spin-off recién anunciado','el actor protagonista del estreno actual','la escena que más se ha compartido esta semana',
          'las actrices de Marvel que odiaron sus propios trajes','Marvel Rivals y su fiebre actual','el nuevo tráiler de los Cuatro Fantásticos','la eterna polémica con Capitana Marvel','Deadpool volviéndose viral otra vez'],
        universes: ['geek','marvel','boys','anime','cruce','dc','dragonball','directores'],
        templates: {
          opinion: ['Mi opinión sincera sobre {s}, para quien no sabe nada todavía.','Por qué {s} merece más atención de la que le están dando.'],
          curiosidad: ['5 datos curiosos sobre {s} que casi nadie conoce.','Lo que cambia {s} respecto a su versión original en el cómic.'],
          fancast: ['Fancast: quién debería dar vida a {s} si lo adaptan.','Si tuviera que elegir reparto para {s}, este sería el mío.'],
          batalla: ['{s} contra el villano más popular del momento: ¿quién gana en serio?','Ranking: dónde queda {s} entre los más fuertes ahora mismo.'],
          reaccion: ['Primera reacción a todo lo que se sabe sobre {s}.','Reaccionando en directo a la última escena de {s}.']
        }
      },
      helquid: {
        label: 'HELQUIDGAMES',
        subjects: ['un juego indie recién salido','un clásico que casi nadie recuerda','el juego más pedido en el Discord','un juego con mecánicas raras de verdad','un roguelike corto','un juego cooperativo para dos personas','un juego con una sola vida de verdad','un juego hecho por un equipo pequeño',
          'Tomb Raider: Legacy of Atlantis, recién salido','Maneater 2, el anuncio del momento','el último leak gordo de Valve','DLSS 5 filtrado y lo que cambia de verdad','The Blood of Dawnwalker, ¿vale la pena?'],
        templates: {
          reto: ['Reto: terminar {s} sin usar ni una guía.','Un solo intento con {s} — si fallo, se acaba el vídeo.'],
          formato: ['Primeras impresiones jugando {s} por primera vez en directo.','¿Vale la pena en 2026? revisando {s}.'],
          colab: ['Torneo amistoso con otro creador usando {s}.','Reto cruzado: probamos {s} y comparamos resultados.'],
          especial: ['Especial jugando {s} elegido por la comunidad.','Maratón corto centrado en {s}.']
        }
      },
      lab: {
        label: 'Charkuma Lab',
        subjects: ['el buscador global de la web','el sistema de bancos de ideas','el panel de ajustes','una sección nueva de la web','el flujo de publicación de contenido','una herramienta interna del canal','el sistema de notificaciones','una página nueva del sitio'],
        templates: {
          proyecto: ['Rediseñar {s} con una identidad visual propia.','Montar una versión mejorada de {s} desde cero.'],
          herramienta: ['Pequeño script para automatizar parte de {s}.','Plantilla reutilizable pensada para {s}.'],
          bitacora: ['Lo que he aprendido montando {s}.','Diario de a bordo mientras construyo {s}.']
        }
      },
      ia: {
        label: 'IA & Experimentos',
        subjects: ['un guion corto','una miniatura nueva','un resumen de directo','una descripción de YouTube','un post para redes','una transición de vídeo','una voz narrando una curiosidad','un adelanto semanal'],
        templates: {
          prompt: ['Prompt para generar {s} a partir de una idea suelta.','Prompt para mejorar {s} ya existente en dos versiones distintas.'],
          automatizacion: ['Automatizar la creación de {s} cada semana.','Aviso automático cuando toque preparar {s}.'],
          visual: ['Generar variantes visuales para {s} con IA.','Probar un estilo nuevo aplicado a {s}.'],
          video: ['Probar IA para producir {s} más rápido.','Generar una versión corta de {s} de forma automática.']
        }
      },
      creator: {
        label: 'Creator Tools',
        subjects: ['las colabs con otros creadores','los directos largos','los clips cortos verticales','los tutoriales paso a paso','los anuncios de proyecto nuevo','las sesiones de Q&A','los maratones temáticos','el material de apoyo para grabar'],
        templates: {
          overlay: ['Overlay pensado específicamente para {s}.','Overlay alternativo, más ligero, para {s}.'],
          obs: ['Escena de OBS dedicada a {s}.','Configuración rápida de escenas para {s}.'],
          plantilla: ['Plantilla reutilizable de miniatura para {s}.','Plantilla de guion pensada para {s}.'],
          recurso: ['Pack de recursos (sonidos o iconos) para {s}.','Checklist descargable pensado para {s}.']
        }
      },
      hecho: {
        label: 'Hecho a Mano',
        subjects: ['la mascota lagarto','el logo del canal','un juego concreto de Retro 365','el eslogan del canal','la paleta morada y naranja de la web','un hito de suscriptores','el set de streaming','una colab reciente'],
        templates: {
          tufting: ['Alfombra tufting pequeña inspirada en {s}.','Cojín tufting a juego con {s}.'],
          diseno: ['Diseño de merch basado en {s}.','Pegatina o diseño para portátil con {s}.'],
          objeto: ['Objeto impreso en 3D relacionado con {s}.','Figura o soporte físico inspirado en {s}.']
        }
      }
    };

    function pickRandom(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

    function ideasMergedForBank(bankKey){
      return bankKey === 'rincon' ? getRinconIdeasMerged() : getBankIdeasMerged(bankKey, IDEA_GENERATOR_BASE[bankKey]);
    }
    function ideaCountForBank(bankKey){
      return Object.values(ideasMergedForBank(bankKey)).reduce((sum, arr) => sum + arr.length, 0);
    }
    // Elegimos el banco con menos ideas en total, para que "Generar
    // ideas" reparta el crecimiento entre todas las secciones en vez de
    // acumularlo siempre en la misma — en empate, cualquiera de ellas.
    function pickLeastPopulatedBank(){
      const counts = Object.keys(IDEA_GENERATORS).map(bank => ({ bank, total: ideaCountForBank(bank) }));
      const min = Math.min(...counts.map(c => c.total));
      return pickRandom(counts.filter(c => c.total === min)).bank;
    }

    // Backlog #115 — antes solo se comparaba contra las ideas del MISMO
    // banco; una idea podía repetirse casi igual en otro banco sin que
    // nada lo detectara. Recoge el texto de las ideas ya existentes en
    // TODOS los bancos generadores, no solo el de destino.
    // Ampliado 9 sep (backlog #177): también incluye los títulos de
    // contenido YA REAL (guiones/proyectos con `internalView`, vía
    // buildAllGuionItems) — antes una idea podía repetir casi igual un
    // guion ya publicado sin que nada lo avisara, solo se comparaba
    // contra otras ideas sueltas del banco.
    function allExistingIdeaTexts(){
      const texts = new Set();
      Object.keys(IDEA_GENERATORS).forEach(key => {
        const merged = ideasMergedForBank(key);
        Object.values(merged).flat().forEach(entry => {
          texts.add((typeof entry === 'string' ? entry : entry.text).trim().toLowerCase());
        });
      });
      if (typeof buildAllGuionItems === 'function') {
        buildAllGuionItems().forEach(it => { if (it.title) texts.add(it.title.trim().toLowerCase()); });
      }
      return texts;
    }
    // Backlog #177 — parecido "de verdad", no solo texto idéntico:
    // solapamiento de palabras significativas (más de 3 letras, sin
    // acentos ni signos) entre dos títulos. Umbral 0.5 (la mitad o más
    // de las palabras significativas del más corto coinciden) — no es
    // NLP de verdad, es una heurística honesta y simple, pero encuentra
    // parecidos reales tipo "el regreso de los X-Men" vs "los X-Men
    // vuelven a Marvel" que un match exacto no vería nunca.
    function significantWords(text){
      return new Set((text || '').toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita acentos
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/).filter(w => w.length > 3));
    }
    function titleSimilarity(a, b){
      const wa = significantWords(a), wb = significantWords(b);
      if (!wa.size || !wb.size) return 0;
      let shared = 0;
      wa.forEach(w => { if (wb.has(w)) shared++; });
      return shared / Math.min(wa.size, wb.size);
    }
    function findSimilarExistingTitle(newText, threshold){
      threshold = threshold || 0.5;
      let best = null, bestScore = 0;
      allExistingIdeaTexts().forEach(existing => {
        const score = titleSimilarity(newText, existing);
        if (score > bestScore) { bestScore = score; best = existing; }
      });
      return bestScore >= threshold ? { text: best, score: bestScore } : null;
    }

    function generateIdeasForBank(bankKey, count){
      const cfg = IDEA_GENERATORS[bankKey];
      if (!cfg) return { added: 0 };

      const existingTexts = allExistingIdeaTexts();

      const types = Object.keys(cfg.templates);
      const additions = {};
      let added = 0, attempts = 0;
      while (added < count && attempts < count * 25) {
        attempts++;
        const type = pickRandom(types);
        const text = pickRandom(cfg.templates[type]).replace('{s}', pickRandom(cfg.subjects));
        if (existingTexts.has(text.trim().toLowerCase())) continue;
        existingTexts.add(text.trim().toLowerCase());
        if (!additions[type]) additions[type] = [];
        additions[type].push(bankKey === 'rincon' ? { universe: pickRandom(cfg.universes), text } : text);
        added++;
      }

      if (added > 0) {
        if (bankKey === 'rincon') {
          const extra = loadRinconExtraIdeas();
          Object.keys(additions).forEach(type => { extra[type] = (extra[type] || []).concat(additions[type]); });
          saveRinconExtraIdeas(extra);
        } else {
          addBankExtraIdeas(bankKey, additions);
        }
        if (IDEA_BANK_RENDERERS[bankKey]) IDEA_BANK_RENDERERS[bankKey]();
      }

      return { added, additions, label: cfg.label };
    }

    // Rellena el desplegable de sección la primera vez que haga falta
    // (se llama desde renderMasterControlList, igual que el de categorías).
    function populateGenerateSectionSelect(){
      const select = document.getElementById('masterControlGenerateSection');
      if (!select || select.options.length > 1) return;
      Object.keys(IDEA_GENERATORS).forEach(bank => {
        const opt = document.createElement('option');
        opt.value = bank;
        opt.textContent = IDEA_GENERATORS[bank].label;
        select.appendChild(opt);
      });
    }

    function generateIdeaBatchFromMasterControl(){
      const select = document.getElementById('masterControlGenerateSection');
      const bankKey = (select && select.value) || pickLeastPopulatedBank();
      const result = generateIdeasForBank(bankKey, 5);
      const statusEl = document.getElementById('masterControlGenerateStatus');
      if (result.added > 0) {
        const typesUsed = Object.keys(result.additions).join(', ');
        const msg = `✅ Añadidas ${result.added} idea${result.added === 1 ? '' : 's'} nueva${result.added === 1 ? '' : 's'} a ${result.label} (${typesUsed}) — pendientes de tu revisión.`;
        if (statusEl) statusEl.textContent = msg;
        logActivity(`Generadas ${result.added} idea${result.added === 1 ? '' : 's'} nueva${result.added === 1 ? '' : 's'} para ${result.label}.`, 'idea');
      } else if (statusEl) {
        statusEl.textContent = `⚠️ No he encontrado ninguna idea nueva sin repetir para ${result.label} esta vez — vuelve a intentarlo.`;
      }
      renderMasterControlList();
    }

    // Backlog #284 — acceso directo a "Generar ideas" desde la barra
    // flotante (antes solo se llegaba entrando primero al Panel). A
    // propósito NO llama a generateIdeaBatchFromMasterControl() a ciegas
    // desde fuera de esa vista — esa función lee/escribe el <select> y el
    // aviso de estado que solo existen dentro del Panel, así que llamarla
    // sin estar ahí generaría ideas de verdad pero sin ningún feedback
    // visible (parecería que no ha pasado nada). En su lugar, navega y
    // desplaza hasta el panel exacto para que el usuario pulse el botón
    // real con el <select> a la vista, con el mismo resultado pero sin
    // sorpresas silenciosas.
    function goToGenerateIdeas(){
      showView('hub-secreto', {resetScroll:false});
      setTimeout(() => {
        const panel = document.getElementById('generateIdeasPanel');
        if (!panel) return;
        panel.scrollIntoView({behavior:'smooth', block:'center'});
        panel.classList.add('flash-highlight');
        setTimeout(() => panel.classList.remove('flash-highlight'), 1500);
      }, 60);
    }

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
          type: item.type,
          date: item.date || null,
          // true = ya revisado/definitivo — cuenta tanto el campo original
          // (reviewed:false en el array) como el botón interactivo "⏳
          // Pendiente de revisión" que el propio Charkuma puede pulsar
          // para marcarlo hecho sin tocar el código.
          reviewed: item.reviewed !== false || isReviewed(item.internalView || item.title),
          discarded: isContentDiscarded(item.internalView || item.title),
          inProgress: isContentInProgress(item.internalView || item.title),
          status: getContentStatus(item),
          tags: [labelsMap && labelsMap[item.type]].filter(Boolean),
          emoji: item.thumbnail || sectionEmoji,
          // Backlog #158 — campo estructurado real (antes solo vivía
          // dentro de RECORDING_MODE_IMAGES): qué personas reales, con
          // foto ya verificada, salen en este contenido. `[]` = ya
          // comprobado y confirmado que no hay ninguna (distinto de "sin
          // comprobar" — los ítems sin este campo en absoluto son los que
          // nunca han pasado por este barrido).
          realPeople: item.realPeople || []
        }));
      };
      addFrom(geekContent, 'Rincón del Friki', '🦸', TYPE_LABELS);
      addFrom(iaContent, 'IA & Experimentos', '🤖', IA_LABELS);
      addFrom(creatorContent, 'Creator Tools', '🛠️', CREATOR_LABELS);
      addFrom(hechoContent, 'Hecho a Mano', '🧶', HECHO_LABELS);
      addFrom(labContent, 'Charkuma Lab', '🧪', LAB_TYPE_LABELS);
      addFrom(helquidGamesContent, 'HELQUIDGAMES', '🎮', HELQUID_GAME_LABELS);

      // Páginas "hub" o fijas que no vienen de un array de contenido.
      index.push(
        { title:'Retro 365', summary:'Reto de recomendar un juego distinto cada día, con calendario público y progreso.', view:'retro365', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Retro 365','Juegos'], emoji:'🎮', date:null, reviewed:true, status:'aprobado' },
        { title:'Ruleta del 11', summary:'Sorteador de una alineación de fútbol con base de datos real de jugadores.', view:'ruleta11', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Fútbol'], emoji:'⚽', date:null, reviewed:true, status:'aprobado' },
        { title:'CalcArte', summary:'Máquina de ideas al azar para dibujos para colorear, con prompt listo para IA.', view:'calcarte', section:'HELQUIDGAMES', sectionEmoji:'🎮', tags:['Arte','IA'], emoji:'🎰', date:null, reviewed:true, status:'aprobado' },
        { title:'Rincón del Friki', summary:'Series, superhéroes, cómics y anime — Marvel y The Boys por encima de todo.', view:'rincon', section:'Rincón del Friki', sectionEmoji:'🦸', tags:['Marvel','The Boys'], emoji:'🦸', date:null, reviewed:true, status:'aprobado' },
        { title:'Redes Sociales', summary:'Todos los enlaces a mis redes: YouTube, TikTok, Instagram, Twitch.', view:'redes', section:'General', sectionEmoji:'📱', tags:['Redes'], emoji:'📱', date:null, reviewed:true, status:'aprobado' },
        { title:'Calendario de publicación', summary:'Lo próximo: el siguiente día de Retro 365 y el contenido pendiente de revisión del resto de secciones.', view:'calendario', section:'General', sectionEmoji:'📅', tags:['Planificación'], emoji:'📅', date:null, reviewed:true, status:'aprobado' }
      );
      return index;
    }

    // Backlog #266 — favoritos: guarda vistas/guiones marcados con ⭐,
    // con su propia sección en el Panel (no un icono nuevo en la barra
    // de arriba — mismo criterio que #265/#296 para no reabrir la
    // sobrecarga del 11 sep). Un solo array plano en localStorage, sin
    // distinguir tipo — cualquier `view` de `buildSiteIndex()` vale.
    const FAVORITES_KEY = 'charkuma_favorites';
    function loadFavorites(){
      try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; } catch (e) { return []; }
    }
    function isFavorite(view){ return loadFavorites().includes(view); }
    function toggleFavorite(view, btnEl){
      let favs = loadFavorites();
      const nowFav = !favs.includes(view);
      favs = nowFav ? favs.concat([view]) : favs.filter(v => v !== view);
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs)); } catch (e) { /* localStorage no disponible */ }
      // Backlog #293 — sincroniza entre dispositivos, mismo patrón que
      // ideaBanks/uiPrefs (documento propio, ver pushBrowsingState más abajo).
      if (typeof pushBrowsingState === 'function') pushBrowsingState();
      if (btnEl) {
        btnEl.classList.toggle('is-favorite', nowFav);
        btnEl.textContent = nowFav ? '⭐' : '☆';
        btnEl.title = nowFav ? 'Quitar de favoritos' : 'Marcar como favorito';
      }
      if (typeof renderFavoritesSection === 'function') renderFavoritesSection();
    }
    function favoriteStarButtonHTML(view){
      const active = isFavorite(view);
      return `<button type="button" class="favorite-star-btn${active ? ' is-favorite' : ''}" onclick="event.stopPropagation();toggleFavorite('${escapeAttr(view)}', this)" title="${active ? 'Quitar de favoritos' : 'Marcar como favorito'}" aria-label="Marcar como favorito">${active ? '⭐' : '☆'}</button>`;
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
            <h4>${titleLink} ${favoriteStarButtonHTML(item.view)}</h4>
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
        // Backlog #158 — buscar "Robert Downey Jr." (o cualquier otra
        // persona real verificada) ya encuentra los guiones reales donde
        // sale, aunque su nombre no aparezca en el título/resumen.
        const haystack = (item.title + ' ' + item.summary + ' ' + item.tags.join(' ') + ' ' + (item.realPeople || []).join(' ')).toLowerCase();
        return haystack.includes(query);
      });

      const container = document.getElementById('globalSearchResults');
      container.innerHTML = results.length
        ? results.map(searchResultCardHTML).join('')
        : emptyStateHTML('Nada coincide con esa búsqueda todavía.');
    }

    document.getElementById('globalSearchInput').addEventListener('input', renderGlobalSearch);
    document.getElementById('globalSearchSection').addEventListener('change', renderGlobalSearch);

    // Historial de búsquedas recientes (solo el texto escrito, no
    // resultados) — guarda al pulsar Enter, para no meter cada tecleo.
    const SEARCH_HISTORY_KEY = 'charkuma_search_history';
    function loadSearchHistory(){
      try { return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || []; }
      catch (e) { return []; }
    }
    function saveSearchToHistory(term){
      term = term.trim();
      if (!term) return;
      let history = loadSearchHistory().filter(t => t.toLowerCase() !== term.toLowerCase());
      history.unshift(term);
      try { localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, 8))); }
      catch (e) { /* seguimos sin guardar */ }
      renderSearchHistory();
    }
    function clearSearchHistory(){
      try { localStorage.removeItem(SEARCH_HISTORY_KEY); } catch (e) {}
      renderSearchHistory();
    }
    function renderSearchHistory(){
      const row = document.getElementById('searchRecentRow');
      const chipsEl = document.getElementById('searchRecentChips');
      if (!row || !chipsEl) return;
      const history = loadSearchHistory();
      row.hidden = history.length === 0;
      chipsEl.innerHTML = history.map(term => `
        <button type="button" class="search-recent-chip" onclick="searchByKeyword('${escapeAttr(term)}')">${escapeHTML(term)}</button>
      `).join('');
    }
    document.getElementById('globalSearchInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveSearchToHistory(e.target.value);
    });

    // Abre el buscador (icono de la cabecera o el atajo "/").
    function openSearchView(){
      showView('buscar');
      renderGlobalSearch();
      renderKeywordCloud();
      renderSearchHistory();
      requestAnimationFrame(() => {
        const input = document.getElementById('globalSearchInput');
        if (input) input.focus();
      });
    }

    // ──────────────────────────────────────────────────────────
    // NUBE DE PALABRAS CLAVE: navegación rápida por toda la web —
    // secciones enteras (van directas a esa vista) y temas/tipos ya
    // definidos en el propio código (van a la búsqueda filtrada por
    // ese término). Reutiliza los mapas de etiquetas que ya existen
    // (TYPE_LABELS, SAGA_LABELS, IA_LABELS...) en vez de mantener una
    // lista de palabras clave aparte y que se desactualice sola.
    // ──────────────────────────────────────────────────────────
    function buildKeywordIndex(){
      const sectionKeywords = [
        { label: '🦸 Rincón del Friki', view: 'rincon' },
        { label: '🎮 HELQUIDGAMES', view: 'helquidgames' },
        { label: '🧪 Charkuma Lab', view: 'charkumalab' },
        { label: '🤖 IA & Experimentos', view: 'ia' },
        { label: '🖥️ Creator Tools', view: 'creator' },
        { label: '🧶 Hecho a Mano', view: 'hecho' },
        { label: '🎮 Retro 365', view: 'retro365' },
        { label: '📱 Redes Sociales', view: 'redes' },
        { label: '📅 Calendario', view: 'calendario' }
      ];

      const tagLabelMaps = [
        TYPE_LABELS, SAGA_LABELS, IA_LABELS, CREATOR_LABELS, HECHO_LABELS,
        LAB_TYPE_LABELS, HELQUID_IDEA_LABELS, HELQUID_GAME_LABELS, IDEA_UNIVERSE_LABELS
      ];
      const seen = new Set();
      const tagKeywords = [];
      tagLabelMaps.forEach(map => {
        Object.values(map).forEach(label => {
          // Quita el emoji inicial del label para usarlo como término de
          // búsqueda (p. ej. "🅼 Marvel" → "Marvel").
          const query = label.replace(/^\S+\s+/, '').trim() || label;
          const key = query.toLowerCase();
          if (!seen.has(key)) { seen.add(key); tagKeywords.push({ label, query }); }
        });
      });
      return { sectionKeywords, tagKeywords };
    }

    function renderKeywordCloud(){
      const container = document.getElementById('keywordCloud');
      if (!container) return;
      const { sectionKeywords, tagKeywords } = buildKeywordIndex();
      const sectionsHTML = sectionKeywords
        .map(k => `<button type="button" class="keyword-chip keyword-chip-section" onclick="showView('${k.view}')">${k.label}</button>`)
        .join('');
      const tagsHTML = tagKeywords
        .map(k => `<button type="button" class="keyword-chip" onclick="searchByKeyword('${k.query.replace(/'/g, "\\'")}')">${k.label}</button>`)
        .join('');
      container.innerHTML = `
        <div class="keyword-group">
          <h5>Secciones</h5>
          <div class="keyword-cloud">${sectionsHTML}</div>
        </div>
        <div class="keyword-group">
          <h5>Temas</h5>
          <div class="keyword-cloud">${tagsHTML}</div>
        </div>`;
    }

    // Escribe el término en el buscador, lanza la búsqueda y lleva la
    // vista hasta los resultados — el "ir de una ventana a otra" que
    // pedía el usuario, sin salir del buscador.
    function searchByKeyword(term){
      const input = document.getElementById('globalSearchInput');
      input.value = term;
      renderGlobalSearch();
      const results = document.getElementById('globalSearchResults');
      if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ──────────────────────────────────────────────────────────
    // CALENDARIO DE PUBLICACIÓN: un vistazo simple a "lo próximo" —
    // el siguiente día decidido de Retro 365, y el contenido de las
    // demás secciones que sigue "pendiente de revisión" (generado
    // como base, a falta del toque final de Charkuma).
    // ──────────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────────
    // "Añadir a Google Calendar": no hace falta ninguna API key ni
    // OAuth — es la misma URL con plantilla que usa el propio botón
    // "Add to Calendar" de Google. Al abrirse, Google Calendar ya crea
    // el evento con título, fecha, duración y descripción rellenos;
    // en cuanto el evento existe en tu calendario, las notificaciones
    // al teléfono las manda la propia app de Calendar con tus ajustes
    // habituales — no hace falta nada más para eso.
    // ──────────────────────────────────────────────────────────
    function googleCalendarLink(cfg){
      // Formato UTC "AAAAMMDDTHHmmssZ" que espera Google Calendar — al
      // llevar la Z, la propia Google Calendar la convierte y la
      // muestra en la hora local de quien abra el enlace.
      const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const start = new Date(cfg.date);
      const end = new Date(start.getTime() + (cfg.durationMinutes || 60) * 60000);
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: cfg.title,
        dates: `${fmt(start)}/${fmt(end)}`,
        details: cfg.details || ''
      });
      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // Botón "➕ Añadir eventos del mes": en vez de darle uno a uno a
    // "Añadir a Google Calendar", genera un único archivo .ics con
    // todos los eventos de los próximos 30 días (los ya calculados por
    // el último renderCalendarView(), retrasados incluidos) — se importa
    // de una vez en Google Calendar (o cualquier otra app de calendario).
    function icsEscape(str){
      return String(str || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    }
    function icsDate(d){
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    function downloadMonthCalendarEvents(){
      const in30Days = new Date();
      in30Days.setDate(in30Days.getDate() + 30);
      const events = lastScheduledCalendarEvents.filter(e => e.date <= in30Days);

      if (!events.length) {
        alert('No hay ningún evento en los próximos 30 días para añadir.');
        return;
      }

      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CHARKUMA//Calendario de publicación//ES'];
      events.forEach(e => {
        const end = new Date(e.date.getTime() + (e.durationMinutes || 60) * 60000);
        lines.push(
          'BEGIN:VEVENT',
          `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@charkuma`,
          `DTSTAMP:${icsDate(new Date())}`,
          `DTSTART:${icsDate(e.date)}`,
          `DTEND:${icsDate(end)}`,
          `SUMMARY:${icsEscape(e.title)}`,
          `DESCRIPTION:${icsEscape(e.details)}`,
          'END:VEVENT'
        );
      });
      lines.push('END:VCALENDAR');

      const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `charkuma-calendario-${new Date().toISOString().slice(0, 10)}.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    // Backlog #10 — exportar el reto de Retro 365 entero (los 365 días,
    // no solo los próximos 30 como el botón de arriba) a un único .ics,
    // con la fecha real de cada día desde RETRO365_START_DATE. Los días
    // todavía bloqueados no revelan el juego (mismo criterio "sin
    // spoilers" que ya usa la vista pública) — solo título genérico.
    function downloadRetro365FullCalendar(){
      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CHARKUMA//Retro 365//ES'];
      for (let day = 1; day <= totalDays; day++){
        const date = new Date(RETRO365_START_DATE);
        date.setDate(date.getDate() + (day - 1));
        const game = completedGames[day];
        const summary = game ? `Retro 365 · Día ${day}: ${game.name}` : `Retro 365 · Día ${day} (sin anunciar)`;
        const description = game
          ? `${game.summary}\n\nDificultad: ${DIFF_LABELS[game.difficulty] || game.difficulty}${game.videoUrl ? '\nVídeo: ' + game.videoUrl : ''}`
          : 'Todavía sin anunciar — se desbloqueará en cuanto suba el vídeo de este día.';
        // Fecha en componentes LOCALES, no toISOString(): convertir a UTC
        // desplazaría la fecha un día en cualquier huso horario adelantado
        // a UTC (España incluida) porque la medianoche local cae en el
        // día anterior en UTC.
        const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
        lines.push(
          'BEGIN:VEVENT',
          `UID:retro365-day-${day}@charkuma`,
          `DTSTAMP:${icsDate(new Date())}`,
          `DTSTART;VALUE=DATE:${ymd}`,
          `SUMMARY:${icsEscape(summary)}`,
          `DESCRIPTION:${icsEscape(description)}`,
          'END:VEVENT'
        );
      }
      lines.push('END:VCALENDAR');

      const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'retro365-calendario-completo.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function taskDescriptionFor(item, sectionLabel){
      const url = item.internalView ? (location.origin + location.pathname + '#view=' + item.internalView) : '';
      return [
        `Sección: ${sectionLabel}`,
        '',
        item.summary,
        url ? `\nToda la info (guion/prompt/recursos) está en la propia página:\n${url}` : '',
        '',
        'Instrucciones generales: revisa y ajusta el contenido de la página antes de grabar, ' +
        'prepara los recursos que se mencionen en ella (plantillas, overlays, prompts de IA...) ' +
        'y edita siguiendo tu flujo habitual de Creator Tools.'
      ].filter(Boolean).join('\n');
    }

    // Fecha real en la que arranca de nuevo la grabación/subida de
    // Retro 365 (los días ya publicados quedan como están; esto solo
    // afecta a cuándo se reparten en el calendario los días "decididos,
    // sin grabar todavía"). Construida con año/mes(0-indexado)/día en
    // vez de un string ISO, para no depender de cómo cada navegador
    // interprete la zona horaria de "2026-11-10".
    const RETRO365_START_DATE = new Date(2026, 10, 10);

    // Backlog #256 — fecha real de la última tarjeta añadida al Diario
    // de construcción (#devLogTimeline). A mano, no parseada del texto
    // decorativo de cada tarjeta (lleva notas tipo "TARDE"/"2ª TANDA"
    // que harían el parseo frágil) — se actualiza en el mismo commit que
    // añade la tarjeta nueva, mismo criterio de mantenimiento manual que
    // ya pide el propio comentario HTML de arriba del timeline.
    const DEVLOG_LAST_UPDATE = new Date(2026, 8, 14);
    const DEVLOG_STALE_DAYS = 14;

    // ──────────────────────────────────────────────────────────
    // Reparto de fechas CON MEMORIA: a diferencia de repartir siempre
    // desde cero cada vez que se abre el calendario, aquí la fecha que
    // le toca a cada elemento se guarda la primera vez (charkuma_schedule_state)
    // y ya no cambia sola. Así, si a un elemento le tocaba el día X y
    // llega esa fecha sin que se haya marcado como hecho, se detecta
    // como "retrasado" — y los retrasados ocupan SIEMPRE los primeros
    // huecos libres, por delante de cualquier elemento nuevo todavía sin
    // fecha asignada. Es justo lo que pediste: nunca colar algo nuevo
    // delante de algo que ya debería estar hecho.
    // ──────────────────────────────────────────────────────────
    const SCHEDULE_STATE_KEY = 'charkuma_schedule_state';
    function loadScheduleState(){
      try { return JSON.parse(localStorage.getItem(SCHEDULE_STATE_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveScheduleState(state){
      try { localStorage.setItem(SCHEDULE_STATE_KEY, JSON.stringify(state)); }
      catch (e) { /* seguimos sin guardar */ }
      if (!applyingRemoteRankingScheduleUpdate && typeof pushRankingScheduleState === 'function') pushRankingScheduleState();
    }

    // Backlog #43 — migrar a Firestore el progreso de la Ruleta del 11
    // (partida en curso) y del calendario (fechas ya asignadas), junto
    // con el ranking friki (#no numerado, pero vive en el mismo lote de
    // "progreso" liviano) — mismo patrón de documento único que #41/#42.
    let applyingRemoteRankingScheduleUpdate = false;
    function pushRankingScheduleState(){
      if (!firestoreReady()) return;
      const { doc, setDoc } = window.firestoreFns;
      const data = {
        ranking: loadRanking(),
        ruletaState: loadRuletaState(),
        scheduleState: loadScheduleState(),
        updatedAt: Date.now()
      };
      setDoc(doc(window.firestoreDB, 'progress', 'state'), data).catch(() => {
        // Sin conexión ahora mismo: se queda en local, sin cola de reintentos.
      });
    }
    let rankingScheduleRealtimeStarted = false;
    async function initRankingScheduleRealtime(){
      if (!firestoreReady() || rankingScheduleRealtimeStarted) return;
      rankingScheduleRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'progress', 'state');
      onSnapshot(ref, (snap) => {
        if (!snap.exists()) { pushRankingScheduleState(); return; }
        const data = snap.data() || {};
        applyingRemoteRankingScheduleUpdate = true;
        try {
          if (data.ranking && typeof data.ranking === 'object') localStorage.setItem(RANKING_KEY, JSON.stringify(data.ranking));
          if (data.ruletaState && typeof data.ruletaState === 'object') {
            localStorage.setItem(RULETA_STORAGE_KEY, JSON.stringify(data.ruletaState));
            ruletaState = data.ruletaState;
          }
          if (data.scheduleState && typeof data.scheduleState === 'object') localStorage.setItem(SCHEDULE_STATE_KEY, JSON.stringify(data.scheduleState));
        } catch (e) { /* localStorage no disponible: seguimos sin aplicarlo local */ }
        applyingRemoteRankingScheduleUpdate = false;
        if (document.getElementById('view-rincon')?.classList.contains('active') && typeof renderRankingTop8 === 'function') renderRankingTop8();
        if (document.getElementById('view-ruleta11')?.classList.contains('active') && typeof renderRuleta === 'function') renderRuleta();
        if (document.getElementById('view-calendario')?.classList.contains('active') && typeof renderCalendarView === 'function') renderCalendarView();
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    // Backlog #46/#47 — sincronizar preferencias de interfaz entre
    // dispositivos: tema claro/oscuro, alto contraste y el modo
    // compacto de la cabecera/columnas laterales (#47 — lo que el
    // backlog llama "columnas fijadas" es justo `sidebars-hidden`,
    // el mismo interruptor del botón 📌). Documento propio y pequeño
    // (no tiene sentido mezclarlo con datos de contenido).
    let applyingRemoteUIPrefsUpdate = false;
    function pushUIPrefsState(){
      if (!firestoreReady() || applyingRemoteUIPrefsUpdate) return;
      const { doc, setDoc } = window.firestoreFns;
      let theme = 'dark', highContrast = false, sidebarsHidden = false, accentColor = DEFAULT_ACCENT_COLOR;
      try { theme = localStorage.getItem('charkuma_theme') || currentTheme(); } catch (e) {}
      try { highContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === '1'; } catch (e) {}
      try { sidebarsHidden = localStorage.getItem(SIDEBARS_HIDDEN_KEY) === '1'; } catch (e) {}
      try { accentColor = localStorage.getItem(ACCENT_COLOR_KEY) || DEFAULT_ACCENT_COLOR; } catch (e) {}
      setDoc(doc(window.firestoreDB, 'uiPrefs', 'state'), { theme, highContrast, sidebarsHidden, accentColor, updatedAt: Date.now() }).catch(() => {
        // Sin conexión ahora mismo: se queda en local, sin cola de reintentos.
      });
    }
    let uiPrefsRealtimeStarted = false;
    async function initUIPrefsRealtime(){
      if (!firestoreReady() || uiPrefsRealtimeStarted) return;
      uiPrefsRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'uiPrefs', 'state');
      onSnapshot(ref, (snap) => {
        if (!snap.exists()) { pushUIPrefsState(); return; }
        const data = snap.data() || {};
        applyingRemoteUIPrefsUpdate = true;
        try {
          if (data.theme === 'light' || data.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', data.theme);
            localStorage.setItem('charkuma_theme', data.theme);
            updateThemeButtonIcon();
          }
          if (typeof data.highContrast === 'boolean') {
            document.documentElement.classList.toggle('high-contrast', data.highContrast);
            localStorage.setItem(HIGH_CONTRAST_KEY, data.highContrast ? '1' : '0');
            const toggle = document.getElementById('highContrastToggle');
            if (toggle) toggle.checked = data.highContrast;
          }
          if (typeof data.sidebarsHidden === 'boolean') {
            document.body.classList.toggle('sidebars-hidden', data.sidebarsHidden);
            document.body.classList.toggle('nav-pinned', !data.sidebarsHidden);
            localStorage.setItem(SIDEBARS_HIDDEN_KEY, data.sidebarsHidden ? '1' : '0');
            updateSidebarsToggleIcon();
          }
          if (typeof data.accentColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(data.accentColor)) {
            applyAccentColor(data.accentColor);
            localStorage.setItem(ACCENT_COLOR_KEY, data.accentColor);
            const accentInput = document.getElementById('accentColorInput');
            if (accentInput) accentInput.value = data.accentColor;
          }
        } catch (e) { /* localStorage no disponible: seguimos sin aplicarlo local */ }
        applyingRemoteUIPrefsUpdate = false;
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    // Backlog #293 — sincronizar favoritos (#266) y últimas vistas
    // (#262/#265) entre dispositivos, mismo patrón exacto que ideaBanks/
    // uiPrefs (documento propio, pequeño, no mezclado con contenido).
    let applyingRemoteBrowsingStateUpdate = false;
    function pushBrowsingState(){
      if (!firestoreReady() || applyingRemoteBrowsingStateUpdate) return;
      const { doc, setDoc } = window.firestoreFns;
      setDoc(doc(window.firestoreDB, 'browsingState', 'state'), {
        favorites: loadFavorites(),
        recentViews: getRecentViews(),
        updatedAt: Date.now()
      }).catch(() => {
        // Sin conexión ahora mismo: se queda en local, sin cola de reintentos.
      });
    }
    let browsingStateRealtimeStarted = false;
    async function initBrowsingStateRealtime(){
      if (!firestoreReady() || browsingStateRealtimeStarted) return;
      browsingStateRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'browsingState', 'state');
      onSnapshot(ref, (snap) => {
        if (!snap.exists()) { pushBrowsingState(); return; }
        const data = snap.data() || {};
        applyingRemoteBrowsingStateUpdate = true;
        try {
          if (Array.isArray(data.favorites)) localStorage.setItem(FAVORITES_KEY, JSON.stringify(data.favorites));
          if (Array.isArray(data.recentViews)) localStorage.setItem(LAST_VIEW_KEY, JSON.stringify(data.recentViews));
        } catch (e) { /* localStorage no disponible: seguimos sin aplicarlo local */ }
        applyingRemoteBrowsingStateUpdate = false;
        // Repintar lo que esté abierto ahora mismo y dependa de esto.
        if (typeof renderFavoritesSection === 'function') renderFavoritesSection();
        if (typeof renderContinueWidget === 'function') renderContinueWidget();
        if (document.getElementById('settingsPanel') && !document.getElementById('settingsPanel').hidden && typeof renderRecentViewsList === 'function') renderRecentViewsList();
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    // Backlog #44/#45 — copia de seguridad automática semanal + historial
    // de versiones. Como la web es estática (nada corre en segundo plano
    // con la pestaña cerrada), "automática" significa: en cuanto se abre
    // la web y ya han pasado 7+ días desde la última, se guarda sola una
    // instantánea completa (todo lo que empieza por "charkuma_" en
    // localStorage) en Firestore — no depende de que nadie pulse un
    // botón ni descargue nada. #45 (historial de versiones) es la lista
    // de esas instantáneas en Control Maestro, cada una descargable como
    // el .json de siempre o restaurable directamente.
    const AUTO_BACKUP_LAST_KEY = 'charkuma_last_auto_backup_at';
    const AUTO_BACKUP_INTERVAL_DAYS = 7;
    const AUTO_BACKUP_KEEP = 12; // ~3 meses de histórico, no crecer sin límite

    function collectAllSiteData(){
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf(EXPORTABLE_KEY_PREFIX) === 0) data[key] = localStorage.getItem(key);
      }
      return data;
    }

    async function maybeRunWeeklyBackup(){
      if (!firestoreReady()) return;
      let lastAt = 0;
      try { lastAt = Number(localStorage.getItem(AUTO_BACKUP_LAST_KEY)) || 0; } catch (e) {}
      const daysSince = (Date.now() - lastAt) / 86400000;
      if (lastAt && daysSince < AUTO_BACKUP_INTERVAL_DAYS) return;

      const { collection, doc, setDoc, getDocs, query, orderBy, deleteDoc } = window.firestoreFns;
      const docId = new Date().toISOString().slice(0, 10); // una copia por día como máximo
      try {
        await setDoc(doc(window.firestoreDB, 'backups', docId), {
          createdAt: Date.now(),
          data: collectAllSiteData()
        });
        try { localStorage.setItem(AUTO_BACKUP_LAST_KEY, String(Date.now())); } catch (e) {}
        logActivity(`📦 Copia de seguridad automática guardada (${docId}).`, 'idea');

        // Poda: nos quedamos solo con las AUTO_BACKUP_KEEP más recientes.
        const snap = await getDocs(query(collection(window.firestoreDB, 'backups'), orderBy('createdAt', 'desc')));
        const all = snap.docs;
        for (let i = AUTO_BACKUP_KEEP; i < all.length; i++) {
          deleteDoc(doc(window.firestoreDB, 'backups', all[i].id)).catch(() => {});
        }
      } catch (e) { /* sin conexión ahora mismo: se reintenta la próxima vez que se abra la web */ }
    }

    // Descarga una copia guardada como el mismo .json que exportSiteData,
    // para poder guardarla fuera o inspeccionarla.
    function downloadBackupSnapshot(docId, data){
      const blob = new Blob([JSON.stringify({ exportedAt: docId, data }, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `charkuma-backup-${docId}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    // Restaura una copia guardada tal cual (mismo criterio que
    // importSiteData: sobrescribe local y recarga).
    function restoreBackupSnapshot(docId, data){
      if (!confirm(`¿Restaurar la copia del ${docId}? Sustituirá los datos actuales de este navegador (se recargará la página).`)) return;
      Object.keys(data).forEach(key => {
        if (key.indexOf(EXPORTABLE_KEY_PREFIX) === 0) localStorage.setItem(key, data[key]);
      });
      alert('Copia restaurada. La página se va a recargar para aplicarla.');
      location.reload();
    }

    async function renderBackupHistory(){
      const container = document.getElementById('backupHistoryList');
      if (!container || !firestoreReady()) return;
      const { collection, getDocs, query, orderBy } = window.firestoreFns;
      try {
        const snap = await getDocs(query(collection(window.firestoreDB, 'backups'), orderBy('createdAt', 'desc')));
        if (snap.empty) { container.innerHTML = `<p class="yt-empty">Todavía no hay ninguna copia guardada — se hará sola la próxima vez que abras la web (o si han pasado 7 días desde la última).</p>`; return; }
        container.innerHTML = snap.docs.map(d => {
          const v = d.data();
          const when = new Date(v.createdAt).toLocaleString('es-ES', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
          const dataJson = escapeAttr(JSON.stringify(v.data || {}));
          return `
            <div class="log-entry">
              <strong>${d.id} <span class="yt-empty" style="display:inline">(${when})</span></strong>
              <p>
                <button type="button" class="btn btn-secondary" onclick="downloadBackupSnapshot('${d.id}', JSON.parse(this.dataset.payload))" data-payload="${dataJson}">⬇️ Descargar</button>
                <button type="button" class="btn btn-secondary" onclick="restoreBackupSnapshot('${d.id}', JSON.parse(this.dataset.payload))" data-payload="${dataJson}">↩️ Restaurar esta versión</button>
              </p>
            </div>`;
        }).join('');
      } catch (e) {
        container.innerHTML = `<p class="yt-empty">No se ha podido cargar el historial ahora mismo.</p>`;
      }
    }

    // items: array de objetos cualquiera. idFn(item) → id estable para
    // guardar su fecha. gapDays → separación entre huecos. defaultStartDate
    // → no repartir nada antes de esta fecha MIENTRAS no haya retrasados
    // (una vez hay algo retrasado, se rellena desde mañana, delante de
    // todo lo demás, aunque eso adelante la fecha por defecto).
    function scheduleWithPriority(items, idFn, gapDays, defaultStartDate){
      const state = loadScheduleState();
      const now = new Date();
      const overdue = [], upcoming = [], fresh = [];

      items.forEach(it => {
        const id = idFn(it);
        const savedISO = state[id];
        if (!savedISO) { fresh.push(it); return; }
        const savedDate = new Date(savedISO);
        if (savedDate < now) overdue.push(it);
        else upcoming.push(Object.assign({}, it, { scheduledDate: savedDate }));
      });

      const takenTimes = new Set(upcoming.map(u => u.scheduledDate.getTime()));
      let cursor = new Date(now);
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(10, 0, 0, 0);
      // Si nada va con retraso todavía, respeta la fecha de arranque
      // "oficial" (p. ej. el 10 de noviembre de Retro 365) en vez de
      // empezar a repartir desde mañana.
      if (!overdue.length && defaultStartDate && new Date(defaultStartDate) > cursor) {
        cursor = new Date(defaultStartDate);
        cursor.setHours(10, 0, 0, 0);
      }
      function nextFreeSlot(){
        while (takenTimes.has(cursor.getTime())) cursor.setDate(cursor.getDate() + gapDays);
        const slot = new Date(cursor);
        takenTimes.add(slot.getTime());
        cursor.setDate(cursor.getDate() + gapDays);
        return slot;
      }

      const scheduledOverdue = overdue.map(it => {
        const slot = nextFreeSlot();
        state[idFn(it)] = slot.toISOString();
        return Object.assign({}, it, { scheduledDate: slot, isOverdue: true });
      });
      const scheduledFresh = fresh.map(it => {
        const slot = nextFreeSlot();
        state[idFn(it)] = slot.toISOString();
        return Object.assign({}, it, { scheduledDate: slot });
      });

      saveScheduleState(state);
      return [...scheduledOverdue, ...upcoming, ...scheduledFresh].sort((a, b) => a.scheduledDate - b.scheduledDate);
    }

    // Cuando un elemento se marca como hecho/publicado, ya no debe
    // seguir contando para "retrasado" — le liberamos su hueco guardado.
    function clearScheduledDate(id){
      const state = loadScheduleState();
      if (state[id]) { delete state[id]; saveScheduleState(state); }
    }

    function formatScheduledDate(d){
      // Fecha larga y en mayúsculas ("LUNES, 9 DE NOVIEMBRE DE 2026") en
      // vez de la abreviada ("lun, 9 nov") — más legible en el calendario.
      return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    }

    // Eventos ya calculados en el último renderCalendarView() — los usa
    // el botón "➕ Añadir eventos del mes" para meterlos todos de golpe
    // en un único archivo .ics, en vez de tener que darle uno a uno a
    // "Añadir a Google Calendar".
    let lastScheduledCalendarEvents = [];

    function renderCalendarView(){
      const retroList = document.getElementById('calendarRetroList');
      const pendingList = document.getElementById('calendarPendingList');
      if (!retroList || !pendingList) return;
      lastScheduledCalendarEvents = [];

      const plannedDays = Object.keys(plannedGames).map(Number).sort((a, b) => a - b);
      const scheduledRetro = scheduleWithPriority(
        plannedDays.map(day => ({ day, g: plannedGames[day] })),
        ({ day }) => `retro-day-${day}`,
        3, RETRO365_START_DATE
      );
      retroList.innerHTML = scheduledRetro.length
        ? scheduledRetro.map(({day, g, scheduledDate, isOverdue}) => {
            const details = taskDescriptionFor({ summary: g.summary }, 'Retro 365');
            const title = `Grabar Retro 365 · ${g.name}`;
            const calLink = googleCalendarLink({ title, date: scheduledDate, durationMinutes: 90, details });
            lastScheduledCalendarEvents.push({ title, date: scheduledDate, durationMinutes: 90, details });
            return `
              <div class="geek-card">
                <div class="geek-thumb">${g.emoji || '📝'}</div>
                <div class="geek-info">
                  <div class="geek-badges">
                    <span class="type-chip chip-purple">DÍA ${String(day).padStart(3,'0')}</span>
                    <span class="type-chip diff-${g.difficulty}">${DIFF_LABELS[g.difficulty] || g.difficulty}</span>
                    <span class="type-chip chip-neutral">📅 ${formatScheduledDate(scheduledDate)}</span>
                    ${isOverdue ? '<span class="type-chip chip-red">⏰ Retrasado</span>' : ''}
                  </div>
                  <h4>${g.name}</h4>
                  <p>${g.summary}</p>
                  <a class="btn btn-secondary" style="margin-top:8px;display:inline-flex" href="${calLink}" target="_blank" rel="noopener">📅 Añadir a Google Calendar</a>
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
          if (item.reviewed === false && !isReviewed(rid) && !isContentDiscarded(rid)) {
            pending.push({ item, section, emoji, rid });
          }
        });
      });
      pending.sort((a, b) => new Date(b.item.date || 0) - new Date(a.item.date || 0));
      const scheduledPending = scheduleWithPriority(pending, ({ rid }) => rid, 2);

      pendingList.innerHTML = scheduledPending.length
        ? scheduledPending.map(({item, section, emoji, scheduledDate, isOverdue}) => {
            const details = taskDescriptionFor(item, section);
            const title = `${section}: ${item.title}`;
            const calLink = googleCalendarLink({ title, date: scheduledDate, durationMinutes: 60, details });
            lastScheduledCalendarEvents.push({ title, date: scheduledDate, durationMinutes: 60, details });
            return `
            <div class="geek-card">
              <div class="geek-thumb">${item.thumbnail || emoji}</div>
              <div class="geek-info">
                <div class="geek-badges">
                  <span class="type-chip chip-purple">${emoji} ${section}</span>
                  <span class="type-chip chip-neutral">📅 ${formatScheduledDate(scheduledDate)}</span>
                  ${isOverdue ? '<span class="type-chip chip-red">⏰ Retrasado</span>' : ''}
                  ${reviewBadgeHTML(item)}
                </div>
                <h4><a href="javascript:void(0)" onclick="showView('${item.internalView}')">${item.title} ↗</a></h4>
                <p>${item.summary}</p>
                <a class="btn btn-secondary" style="margin-top:8px;display:inline-flex" href="${calLink}" target="_blank" rel="noopener">📅 Añadir a Google Calendar</a>
              </div>
            </div>`;
          }).join('')
        : `<p class="yt-empty">Todo revisado por aquí — nada pendiente ahora mismo.</p>`;
    }

    // ──────────────────────────────────────────────────────────
    // MAPA MAESTRO DE PROYECTOS (easter egg 🗺️ de la cabecera)
    // ──────────────────────────────────────────────────────────
    // Lista completa de contenido ordenada por fecha, con su estado
    // (⏳ pendiente / ✅ aprobado / 🗑️ descartado) — la usan tanto el
    // mapa maestro (🗺️) como el control secreto maestro (doble clic +
    // contraseña), para no mantener la misma lógica dos veces.
    function renderProjectsByDate(containerId){
      const container = document.getElementById(containerId);
      if (!container) return;
      const index = buildSiteIndex();
      const withDate = index.filter(i => i.date).sort((a, b) => new Date(a.date) - new Date(b.date));
      const withoutDate = index.filter(i => !i.date);
      const ordered = withDate.concat(withoutDate);
      container.innerHTML = ordered.map(item => {
        const dateLabel = item.date
          ? new Date(item.date).toLocaleDateString('es-ES', { day:'numeric', month:'short', year:'numeric' })
          : '—';
        const status = item.status || (item.discarded ? 'descartado' : item.reviewed ? 'aprobado' : 'pendiente');
        const statusChip = `<span class="type-chip ${CONTENT_STATUS_CHIPCLASS[status]}">${CONTENT_STATUS_LABELS[status]}</span>`;
        const titleLink = item.external
          ? `<a href="${item.view}" target="_blank" rel="noopener">${item.title} ↗</a>`
          : `<a href="javascript:void(0)" onclick="showView('${item.view}')">${item.title} ↗</a>`;
        return `
          <div class="geek-card">
            <div class="geek-thumb">${item.emoji}</div>
            <div class="geek-info">
              <div class="geek-badges">
                <span class="type-chip chip-purple">${item.sectionEmoji} ${item.section}</span>
                <span class="type-chip chip-neutral">📅 ${dateLabel}</span>
                ${statusChip}
              </div>
              <h4>${titleLink}</h4>
              <p>${item.summary}</p>
            </div>
          </div>`;
      }).join('');
    }

    // Backlog #275/#276/#277 — dashboard "de un vistazo" al entrar en el
    // Panel: mismo patrón que ya usa Voz en Off (Fase 2 #189), más UNA
    // única acción sugerida (la más urgente — sugerir varias a la vez es
    // lo mismo que no sugerir ninguna) y accesos directos a lo que más se
    // usa desde aquí. Todo con datos reales, nada inventado.
    function renderMasterHubSummary(){
      const statsEl = document.getElementById('hubSummaryStats');
      const nextActionEl = document.getElementById('hubNextAction');
      const linksEl = document.getElementById('hubQuickLinks');
      if (!statsEl || !nextActionEl || !linksEl) return;
      renderPushInviteBanner(); // Backlog #304

      const guionesPendientes = buildGuionesBandeja('todos').length;
      // Mismo cálculo por banco que usan las tarjetas de "Bancos secretos
      // de ideas" más abajo — no se duplica la lógica, se suma el mismo dato.
      const banks = [
        { bank:'rincon', ideas:rinconSecretIdeas },
        { bank:'retro365planned', ideas:{planned:Object.keys(plannedGames)} },
        { bank:'helquid', ideas:helquidSecretIdeas },
        { bank:'lab', ideas:labSecretIdeas },
        { bank:'ia', ideas:iaSecretIdeas },
        { bank:'creator', ideas:creatorSecretIdeas },
        { bank:'hecho', ideas:hechoSecretIdeas }
      ];
      const allBanksState = loadIdeaBanks();
      const ideasNuevas = banks.reduce((sum, b) => {
        const total = Object.values(b.ideas).reduce((s, arr) => s + arr.length, 0);
        const state = allBanksState[b.bank] || {};
        const doneOrDiscarded = Object.values(state).filter(s => s.done || s.discarded).length;
        return sum + Math.max(0, total - doneOrDiscarded);
      }, 0);

      // Backlog #260 — "resumen ejecutivo": guiones totales y sagas
      // cubiertas, con datos reales de lo que ya existe en el código (no
      // se añade "fotos pendientes" — distinguir "sin foto a propósito"
      // de "le falta una" solo vive en comentarios, no en un dato real
      // consultable, y fabricar esa cifra sería justo lo que #150 evitó).
      const guionesTotal = buildAllGuionItems().length;
      // `saga` es un campo propio de geekContent (Rincón del Friki) — no
      // pasa por buildSiteIndex(), que no lo copia al aplanar las 6
      // secciones en un índice común.
      const sagasCubiertas = new Set(geekContent.map(i => i.saga).filter(Boolean)).size;

      statsEl.innerHTML = `
        <div class="vidiq-stat"><span class="vidiq-stat-value">${guionesPendientes}</span><span class="vidiq-stat-label">Guiones pendientes de grabar</span></div>
        <div class="vidiq-stat"><span class="vidiq-stat-value">${ideasNuevas}</span><span class="vidiq-stat-label">Ideas sin usar en los bancos</span></div>
        <div class="vidiq-stat"><span class="vidiq-stat-value">${guionesTotal}</span><span class="vidiq-stat-label">Guiones totales en el sitio</span></div>
        <div class="vidiq-stat"><span class="vidiq-stat-value">${sagasCubiertas}</span><span class="vidiq-stat-label">Sagas cubiertas</span></div>`;

      // Misma prioridad que ya usa la propia Bandeja de Guiones: fecha
      // límite real primero. Solo se enseña la primera — el resto sigue
      // disponible en la Bandeja si hace falta.
      const pendientes = buildGuionesBandeja('todos');
      if (pendientes.length) {
        const next = pendientes[0];
        const days = guionDeadlineDays(next.view);
        const urgencyNote = days === null ? '' :
          days < 0 ? ` — fecha límite pasada hace ${Math.abs(days)} día${Math.abs(days) === 1 ? '' : 's'}` :
          days === 0 ? ' — fecha límite HOY' :
          ` — publicar antes de ${days} día${days === 1 ? '' : 's'}`;
        nextActionEl.innerHTML = `<strong>▶️ Siguiente acción sugerida:</strong> termina de grabar <a href="javascript:void(0)" onclick="showView('${next.view}')">"${escapeAttr(next.title)}"</a>${urgencyNote}.`;
      } else {
        nextActionEl.innerHTML = `<strong>✅ Todo al día</strong> — no hay ningún guion pendiente de grabar ahora mismo.`;
      }

      linksEl.innerHTML = [
        ['guiones-bandeja', '🎙️ Bandeja de guiones'],
        ['mis-proyectos', '🚀 Proyectos'],
        ['idea-swipe', '🃏 Swipe de ideas'],
        ['master-control', '🕹️ Control Maestro']
      ].map(([id, label]) => `<a href="javascript:void(0)" onclick="showView('${id}')">${label}</a>`).join('');
    }

    // Backlog #266 — sección de favoritos del Panel: lee `buildSiteIndex()`
    // en vivo cada vez (no una copia guardada), así un favorito de un
    // guion que se retire de verdad del sitio desaparece solo, en vez de
    // dejar un enlace roto.
    function renderFavoritesSection(){
      const el = document.getElementById('hubFavoritesList');
      if (!el) return;
      const favs = loadFavorites();
      const index = buildSiteIndex();
      const items = favs.map(v => index.find(i => i.view === v)).filter(Boolean);
      el.innerHTML = items.length
        ? items.map(searchResultCardHTML).join('')
        : `<p class="yt-empty">Todavía no has marcado ningún favorito — pulsa la ☆ junto a cualquier título para guardarlo aquí.</p>`;
    }

    function renderMasterHub(){
      const promptsList = document.getElementById('hubPromptsList');
      const banksList = document.getElementById('hubIdeaBanksList');
      if (!promptsList || !banksList) return;
      renderMasterHubSummary();
      renderFavoritesSection();
      if (typeof renderAllIdeasList === 'function') renderAllIdeasList();
      if (typeof renderTodayEditsSection === 'function') renderTodayEditsSection();

      const index = buildSiteIndex();

      // 1) Prompts guardados (cualquier sección con type === 'prompt')
      const prompts = index.filter(i => i.type === 'prompt');
      promptsList.innerHTML = prompts.length
        ? prompts.map(searchResultCardHTML).join('')
        : `<p class="yt-empty">No hay prompts guardados todavía.</p>`;

      // 2) Bancos secretos de ideas: total de ideas vivas (ni hechas ni
      // descartadas) por banco, con acceso directo a cada uno.
      const banks = [
        { bank:'rincon', label:'Rincón del Friki', emoji:'🦸', view:'rf-secret', ideas:rinconSecretIdeas },
        { bank:'retro365planned', label:'Retro 365', emoji:'🎮', view:'retro-secret', ideas:{planned:Object.keys(plannedGames)} },
        { bank:'helquid', label:'HELQUIDGAMES', emoji:'🎮', view:'helquid-secret', ideas:helquidSecretIdeas },
        { bank:'lab', label:'Charkuma Lab', emoji:'🧪', view:'lab-secret', ideas:labSecretIdeas },
        { bank:'ia', label:'IA & Experimentos', emoji:'🤖', view:'ia-secret', ideas:iaSecretIdeas },
        { bank:'creator', label:'Creator Tools', emoji:'🖥️', view:'creator-secret', ideas:creatorSecretIdeas },
        { bank:'hecho', label:'Hecho a Mano', emoji:'🧶', view:'hecho-secret', ideas:hechoSecretIdeas }
      ];
      const allBanksState = loadIdeaBanks();
      banksList.innerHTML = banks.map(b => {
        const total = Object.values(b.ideas).reduce((sum, arr) => sum + arr.length, 0);
        const state = allBanksState[b.bank] || {};
        const doneOrDiscarded = Object.values(state).filter(s => s.done || s.discarded).length;
        const pendingCount = Math.max(0, total - doneOrDiscarded);
        return `
          <div class="template-card" style="cursor:pointer" onclick="showView('${b.view}')">
            <div class="template-head"><span class="type-chip chip-purple">${b.emoji} ${b.label}</span></div>
            <p style="margin:0"><strong>${pendingCount}</strong> / ${total} ideas todavía sin hacer ni descartar</p>
          </div>`;
      }).join('');

      // 3) Todos los proyectos, por fecha (los que no tienen fecha van al final)
      renderProjectsByDate('hubProjectsList');
    }

    // "Explorar universo" del botón de la cabecera: en vez de ir siempre
    // a "Mis proyectos", salta directamente a uno al azar de los 10
    // contenidos más recientes que sigan "pendientes de revisión" (no
    // enseña ni contenido ya definitivo ni el catálogo completo). Si no
    // hay ninguno pendiente ahora mismo, cae de vuelta a "Mis proyectos".
    // Backlog #103 — "aleatorio pero no repetido": antes cada clic en
    // "Explorar universo" era un sorteo independiente sobre un grupo de
    // solo 10, así que era fácil que tocara el mismo dos veces seguidas.
    // Ahora se lleva la cuenta (por pestaña/sesión, no hace falta que
    // persista para siempre) de lo ya mostrado y no se repite ninguno
    // hasta que se hayan visto todos — como una baraja que se reparte
    // entera antes de barajar otra vez.
    const EXPLORE_SEEN_KEY = 'charkuma_explore_seen';
    function loadExploreSeen(){ try { return JSON.parse(sessionStorage.getItem(EXPLORE_SEEN_KEY)) || []; } catch (e) { return []; } }
    function saveExploreSeen(arr){ try { sessionStorage.setItem(EXPLORE_SEEN_KEY, JSON.stringify(arr)); } catch (e) {} }
    function exploreRandomPending(){
      const pending = buildSiteIndex()
        .filter(i => !i.reviewed && !i.discarded && i.view && !i.external)
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 10);
      if (!pending.length) { showView('mis-proyectos'); return; }

      let seen = loadExploreSeen();
      let pool = pending.filter(i => !seen.includes(i.view));
      if (!pool.length) { seen = []; pool = pending; } // ya se vieron todos: se reparte otra vez
      const pick = pool[Math.floor(Math.random() * pool.length)];
      seen.push(pick.view);
      saveExploreSeen(seen);
      showView(pick.view);
    }

    // ──────────────────────────────────────────────────────────
    // Carrusel "en qué estoy trabajando ahora" — clic en la mascota
    // de la portada. Muestra, con flechas, todos los proyectos que
    // siguen "en proceso" (pendientes de revisión) ahora mismo.
    // ──────────────────────────────────────────────────────────
    let inProgressItems = [];
    let inProgressIndex = 0;

    function openInProgressCarousel(){
      inProgressItems = buildSiteIndex().filter(i => CONTENT_STAGE_ORDER.includes(i.status) && i.view && !i.external);
      inProgressIndex = 0;
      document.getElementById('inProgressModal').hidden = false;
      renderInProgressSlide();
    }
    function closeInProgressCarousel(){
      document.getElementById('inProgressModal').hidden = true;
    }
    // Botón "➕ Añadir" del carrusel: lleva directo al control secreto
    // maestro ya filtrado por "✅ Aprobado" — la fase justo antes de "en
    // proceso" — para ir aprobando/promocionando ideas cuando quieras,
    // sin tener que buscar el filtro a mano cada vez.
    function goToApprovedInMasterControl(){
      closeInProgressCarousel();
      showView('master-control');
      const statusSelect = document.getElementById('masterControlStatus');
      if (statusSelect) {
        statusSelect.value = 'pendiente';
        statusSelect.dispatchEvent(new Event('change'));
      }
    }
    function stepInProgressCarousel(dir){
      if (!inProgressItems.length) return;
      inProgressIndex = (inProgressIndex + dir + inProgressItems.length) % inProgressItems.length;
      renderInProgressSlide();
    }
    function renderInProgressSlide(){
      const titleEl = document.getElementById('inProgressTitle');
      const cardEl = document.getElementById('inProgressCard');
      const counterEl = document.getElementById('inProgressCounter');
      if (!inProgressItems.length) {
        titleEl.textContent = 'Nada en proceso ahora mismo';
        cardEl.innerHTML = `<p class="yt-empty">Nada marcado como "en proceso" ahora mismo — apruébalo y pulsa "🎬 Empezar guion" en su página para que aparezca aquí.</p>`;
        counterEl.textContent = '';
        return;
      }
      const item = inProgressItems[inProgressIndex];
      titleEl.textContent = item.title;
      cardEl.innerHTML = searchResultCardHTML(item);
      counterEl.textContent = `${inProgressIndex + 1} / ${inProgressItems.length}`;
    }
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('inProgressModal');
      if (!modal || modal.hidden) return;
      if (e.key === 'Escape') closeInProgressCarousel();
      else if (e.key === 'ArrowLeft') stepInProgressCarousel(-1);
      else if (e.key === 'ArrowRight') stepInProgressCarousel(1);
    });

    // ──────────────────────────────────────────────────────────
    // CONTROL SECRETO MAESTRO: doble clic en "🎮 Player 1 Ready" pide un
    // código; si acierta, entra a la lista cronológica completa con
    // estado (pendiente/aprobado/descartado) de todo lo integrado en la
    // web. Aviso honesto: candado "de andar por casa", no seguridad real
    // — el contenido sigue estando en el código fuente de la página.
    // ──────────────────────────────────────────────────────────
    const MASTER_CONTROL_PASSWORD = '1987';

    function openMasterControlPrompt(){
      const modal = document.getElementById('masterControlPasswordModal');
      const input = document.getElementById('masterControlPasswordInput');
      const error = document.getElementById('masterControlPasswordError');
      input.value = '';
      error.hidden = true;
      modal.hidden = false;
      requestAnimationFrame(() => input.focus());
    }
    function closeMasterControlPrompt(){
      document.getElementById('masterControlPasswordModal').hidden = true;
    }
    function submitMasterControlPassword(){
      const input = document.getElementById('masterControlPasswordInput');
      const error = document.getElementById('masterControlPasswordError');
      if (input.value.trim() === MASTER_CONTROL_PASSWORD) {
        closeMasterControlPrompt();
        showView('master-control');
      } else {
        error.hidden = false;
        input.value = '';
        input.focus();
      }
    }
    document.getElementById('masterControlPasswordInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitMasterControlPassword();
    });
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('masterControlPasswordModal');
      if (modal && !modal.hidden && e.key === 'Escape') closeMasterControlPrompt();
    });
    // Backlog #227 — mismo patrón de Escape que los otros modales de esta
    // página (#287, ya auditado: cada modal/overlay lleva su propio
    // handler dedicado).
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('shortVersionModal');
      if (modal && !modal.hidden && e.key === 'Escape') closeShortVersionModal();
    });

    // ──────────────────────────────────────────────────────────
    // ÍNDICE COMPLETO DEL CONTROL SECRETO MAESTRO: junta los proyectos
    // (buildSiteIndex) con cada idea suelta de los 7 bancos secretos
    // (que tienen su propio sistema de estado: hecha/descartada vía
    // loadIdeaBanks), todo con el mismo formato de 4 estados para poder
    // buscar/filtrar/ordenar en un único sitio.
    // ──────────────────────────────────────────────────────────
    function buildMasterControlIndex(){
      const items = buildSiteIndex().map(i => ({
        title: i.title, summary: i.summary, section: i.section, sectionEmoji: i.sectionEmoji,
        emoji: i.emoji, date: i.date, status: i.status, view: i.view, external: i.external, kind: 'Proyecto',
        priority: getContentPriority(i.view), cost: getContentCost(i.view)
      }));

      // Fusionamos siempre con las ideas "extra" (importadas por JSON o
      // generadas con "➕ Generar ideas") — si no, esas ideas nunca
      // aparecerían aquí, en el Control Secreto Maestro.
      const ideaBanks = [
        { bank:'rincon', label:'Rincón del Friki', emoji:'🦸', view:'rf-secret', ideas:getRinconIdeasMerged() },
        { bank:'helquid', label:'HELQUIDGAMES', emoji:'🎮', view:'helquid-secret', ideas:getBankIdeasMerged('helquid', helquidSecretIdeas) },
        { bank:'lab', label:'Charkuma Lab', emoji:'🧪', view:'lab-secret', ideas:getBankIdeasMerged('lab', labSecretIdeas) },
        { bank:'ia', label:'IA & Experimentos', emoji:'🤖', view:'ia-secret', ideas:getBankIdeasMerged('ia', iaSecretIdeas) },
        { bank:'creator', label:'Creator Tools', emoji:'🖥️', view:'creator-secret', ideas:getBankIdeasMerged('creator', creatorSecretIdeas) },
        { bank:'hecho', label:'Hecho a Mano', emoji:'🧶', view:'hecho-secret', ideas:getBankIdeasMerged('hecho', hechoSecretIdeas) }
      ];
      const allBanksState = loadIdeaBanks();
      ideaBanks.forEach(meta => {
        const state = allBanksState[meta.bank] || {};
        Object.keys(meta.ideas).forEach(type => {
          meta.ideas[type].forEach((rawIdea, i) => {
            const id = `${type}-${i}`;
            const s = state[id] || {};
            const text = typeof rawIdea === 'string' ? rawIdea : rawIdea.text;
            // Las ideas sueltas no tienen guion propio, así que su
            // estado es más simple: pendiente / hecha (~aprobada) /
            // descartada — no hay "en proceso" para un one-liner.
            const status = s.discarded ? 'descartado' : s.done ? 'aprobado' : 'pendiente';
            items.push({
              title: text, summary: '', section: meta.label, sectionEmoji: meta.emoji,
              emoji: meta.emoji, date: null, status, view: meta.view, external: false, kind: 'Idea'
            });
          });
        });
      });
      return items;
    }

    const MASTER_CONTROL_STATUS_PRIORITY = Object.assign(
      Object.fromEntries(CONTENT_STAGE_ORDER.map((s, i) => [s, i])),
      { pendiente: 10, aprobado: 11, publicado: 12, descartado: 13 }
    );

    // Pinta el indicador de "/loop" allá donde exista en la página
    // (Control Maestro y la nota de Ajustes comparten el mismo mensaje).
    function renderAutonomousLoopStatus(){
      document.querySelectorAll('.autonomous-loop-status').forEach(el => {
        el.textContent = AUTONOMOUS_LOOP_ACTIVE ? '🌙 Automatización automática activada' : '⚪ Automatización automática desactivada';
        el.classList.toggle('is-active', AUTONOMOUS_LOOP_ACTIVE);
      });
      renderLastAutonomousActivity();
    }

    // Indicador de solo lectura (sí puede vivir en localStorage, a
    // diferencia del de arriba: aquí no importa que solo sea exacto en
    // ESTE navegador, es simplemente un recordatorio de "cuándo fue la
    // última vez que pasó algo por aquí").
    function renderLastAutonomousActivity(){
      document.querySelectorAll('.last-autonomous-activity').forEach(el => {
        const log = loadActivityLog();
        if (!log.length) { el.textContent = 'Todavía no hay actividad registrada.'; return; }
        const last = log[log.length - 1];
        const mins = Math.round((Date.now() - new Date(last.ts).getTime()) / 60000);
        const when = mins < 1 ? 'justo ahora'
          : mins < 60 ? `hace ${mins} min`
          : mins < 1440 ? `hace ${Math.round(mins / 60)} h`
          : `hace ${Math.round(mins / 1440)} día${Math.round(mins / 1440) === 1 ? '' : 's'}`;
        el.textContent = `Última actividad autónoma: ${when} — ${last.message}`;
      });
    }

    // Backlog #23 — línea de tiempo del contenido: junta el historial
    // por elemento (#19, `charkuma_content_history`) de TODOS los rids
    // en una sola lista cronológica, con el título real de cada uno
    // (vía buildSiteIndex) en vez de solo el id técnico.
    function renderContentTimeline(){
      const container = document.getElementById('contentTimelineList');
      if (!container) return;
      const history = loadContentHistory();
      const titleByRid = {};
      buildSiteIndex().forEach(i => { titleByRid[i.view] = i.title; });

      const events = [];
      Object.keys(history).forEach(rid => {
        history[rid].forEach(e => events.push({ rid, ...e }));
      });
      events.sort((a, b) => b.ts - a.ts);

      if (!events.length) {
        container.innerHTML = `<p class="yt-empty">Todavía no hay ningún cambio de estado registrado — aparecerán aquí en cuanto apruebes, avances de fase, publiques o descartes algo.</p>`;
        return;
      }
      container.innerHTML = events.slice(0, 40).map(e => {
        const when = new Date(e.ts).toLocaleString('es-ES', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
        const title = titleByRid[e.rid] || e.rid;
        return `<div class="log-entry"><strong>${when}</strong><p><a href="javascript:void(0)" onclick="showView('${e.rid}')">${escapeAttr(title)} ↗</a> — ${escapeAttr(e.text)}</p></div>`;
      }).join('');
    }

    // Backlog #24 — tiempo medio real entre "✅ Aprobado" y "📤
    // Marcado como publicado" para cada elemento que ya tenga ambos
    // hitos en su historial (#19) — nunca un número inventado, y
    // honesto cuando todavía no hay datos suficientes.
    function renderAvgApprovedToPublished(){
      const el = document.getElementById('avgApprovedToPublishedStat');
      if (!el) return;
      const history = loadContentHistory();
      const durationsMs = [];
      Object.values(history).forEach(entries => {
        const approved = entries.find(e => e.text === '✅ Aprobado');
        const published = entries.find(e => e.text === '📤 Marcado como publicado');
        if (approved && published && published.ts > approved.ts) {
          durationsMs.push(published.ts - approved.ts);
        }
      });
      if (!durationsMs.length) {
        el.textContent = 'Todavía no hay ningún elemento con ambos hitos (aprobado y publicado) registrados — se calculará solo en cuanto los haya.';
        return;
      }
      const avgMs = durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length;
      const avgDays = avgMs / 86400000;
      const label = avgDays >= 1 ? `${avgDays.toFixed(1)} días` : `${Math.round(avgMs / 3600000)} horas`;
      el.textContent = `${label} de media (sobre ${durationsMs.length} elemento${durationsMs.length === 1 ? '' : 's'} con datos reales).`;
    }

    // Backlog #26 — aviso si algo lleva mucho tiempo sin avanzar de
    // fase: mira la última entrada de historial de cada elemento
    // actualmente "en curso" (cualquier fase de CONTENT_STAGE_ORDER) y
    // avisa si han pasado más de STALE_STAGE_DAYS desde entonces. Los
    // elementos sin ninguna entrada de historial (fase puesta antes de
    // que existiera #19) se omiten — no hay forma de saber desde cuándo.
    const STALE_STAGE_DAYS = 7;
    function renderStaleContentWarning(){
      const container = document.getElementById('staleContentWarning');
      if (!container) return;
      const history = loadContentHistory();
      const now = Date.now();
      const stale = buildSiteIndex().filter(item => {
        if (!CONTENT_STAGE_ORDER.includes(item.status)) return false;
        const entries = history[item.view];
        if (!entries || !entries.length) return false;
        const lastTs = Math.max(...entries.map(e => e.ts));
        return (now - lastTs) > STALE_STAGE_DAYS * 86400000;
      });
      if (!stale.length) { container.innerHTML = ''; return; }
      container.innerHTML = `
        <div class="stale-warning">
          <strong>⚠️ ${stale.length} elemento${stale.length === 1 ? '' : 's'} llevan más de ${STALE_STAGE_DAYS} días sin avanzar de fase:</strong>
          <ul>${stale.map(i => `<li><a href="javascript:void(0)" onclick="showView('${i.view}')">${escapeAttr(i.title)} ↗</a> — ${CONTENT_STATUS_LABELS[i.status]}</li>`).join('')}</ul>
        </div>`;
    }

    // Backlog #30 — widget "próximo a publicar": destaca lo que ya está
    // en la última fase (listo-publicar); si no hay nada ahí todavía,
    // señala lo más avanzado en curso como referencia, sin fingir que
    // está más listo de lo que realmente está.
    function renderNextToPublishWidget(){
      const container = document.getElementById('nextToPublishWidget');
      if (!container) return;
      const all = buildSiteIndex();
      const ready = all.filter(i => i.status === 'listo-publicar');
      if (ready.length) {
        container.innerHTML = `<ul style="margin:0;padding-left:18px">${ready.map(i =>
          `<li><a href="javascript:void(0)" onclick="showView('${i.view}')">${escapeAttr(i.title)} ↗</a></li>`
        ).join('')}</ul>`;
        return;
      }
      const inProgress = all.filter(i => CONTENT_STAGE_ORDER.includes(i.status));
      if (!inProgress.length) {
        container.innerHTML = `<p class="yt-empty" style="margin:0">Nada en producción ahora mismo.</p>`;
        return;
      }
      inProgress.sort((a, b) => CONTENT_STAGE_ORDER.indexOf(b.status) - CONTENT_STAGE_ORDER.indexOf(a.status));
      const next = inProgress[0];
      container.innerHTML = `<p class="yt-empty" style="margin:0">Nada listo para publicar todavía — lo más avanzado ahora mismo es <a href="javascript:void(0)" onclick="showView('${next.view}')">${escapeAttr(next.title)} ↗</a> (${CONTENT_STATUS_LABELS[next.status]}).</p>`;
    }

    // Backlog #31 — racha de creación de guiones: días consecutivos
    // (incluyendo hoy) en los que se ha aprobado al menos una idea,
    // calculada sobre el historial real de #19 — empieza en 0 hasta que
    // haya aprobaciones registradas desde que existe este sistema.
    function computeGuionCreationStreak(){
      const history = loadContentHistory();
      const approvalDays = new Set();
      Object.values(history).forEach(entries => {
        entries.forEach(e => {
          if (e.text === '✅ Aprobado') {
            const d = new Date(e.ts);
            approvalDays.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
          }
        });
      });
      let streak = 0;
      const cursor = new Date();
      while (approvalDays.has(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`)) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      }
      return streak;
    }
    // Backlog #135 — logros por hitos reales: nada de números fijos ni
    // decorativos, cada uno se calcula sobre datos que la web ya lleva
    // (guiones en marcha, ideas resueltas, rachas...). Un logro bloqueado
    // es tan honesto como uno desbloqueado — no se "adelanta" ninguno.
    function computeAchievements(){
      const all = buildMasterControlIndex();
      const inMotion = all.filter(i => ['aprobado', ...CONTENT_STAGE_ORDER].includes(i.status)).length;
      const published = all.filter(i => i.status === 'publicado').length;
      let doneIdeas = 0;
      Object.values(loadIdeaBanks()).forEach(bankState => {
        Object.values(bankState).forEach(s => { if (s.done) doneIdeas++; });
      });
      let retroStreak = 0;
      while (completedGames[retroStreak + 1]) retroStreak++;
      const guionStreak = computeGuionCreationStreak();
      return [
        { icon:'🎬', label:'Primer guion en marcha', unlocked: inMotion >= 1 },
        { icon:'📚', label:'20 guiones en marcha', unlocked: inMotion >= 20 },
        { icon:'🚀', label:'Primera publicación real', unlocked: published >= 1 },
        { icon:'💡', label:'10 ideas resueltas', unlocked: doneIdeas >= 10 },
        { icon:'💎', label:'25 ideas resueltas', unlocked: doneIdeas >= 25 },
        { icon:'🎮', label:'Retro 365: racha de 3 días', unlocked: retroStreak >= 3 },
        { icon:'🏆', label:'Retro 365: racha de 7 días', unlocked: retroStreak >= 7 },
        { icon:'🔥', label:'3 días seguidos creando', unlocked: guionStreak >= 3 }
      ];
    }