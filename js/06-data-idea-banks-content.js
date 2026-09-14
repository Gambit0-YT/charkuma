    // ══════════ 06-data-idea-banks-content.js ══════════
    // Los 6 bancos secretos de ideas (Rincón, HELQUIDGAMES, Lab, IA, Creator Tools, Hecho a Mano) y sus arrays de contenido (iaContent/creatorContent/hechoContent/helquidGamesContent).
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

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
        {universe:'cruce', text:"Por dónde empezar en Marvel o en The Boys si no has visto nada todavía (mi ranking)."},
        {universe:'anime', text:"Por qué el anime de la temporada que más se comenta merece una oportunidad aunque no veas anime normalmente."},
        {universe:'geek', text:"El regreso de una saga clásica: por qué me da más ilusión que miedo, sin dar nada por sabido."}
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
        {universe:'cruce', text:"Curiosidades sobre el crossover o la teoría fan que está circulando ahora mismo."},
        {universe:'anime', text:"Cosas que cambia el anime respecto al manga original, sin destripar nada gordo."},
        {universe:'geek', text:"El cameo que casi nadie pilló en el estreno más comentado del mes."}
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
        {universe:'boys', text:"Si hicieran serie del equipo secundario que la gente pide en redes, este sería el reparto."},
        {universe:'anime', text:"Fancast de doblaje: quién debería poner voz al personaje de anime que está en boca de todos."},
        {universe:'geek', text:"Si convirtieran este videojuego en serie, este sería mi reparto soñado."}
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
        {universe:'geek', text:"La pelea que los fans llevan pidiendo en redes ahora mismo y nunca ha pasado."},
        {universe:'anime', text:"El protagonista de anime más infravalorado en fuerza bruta, defendido con argumentos."},
        {universe:'cruce', text:"Goku vs el héroe cósmico Marvel del momento: análisis sin favoritismos."}
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
        {universe:'boys', text:"Primera reacción a un capítulo suelto de una serie que se está estrenando ahora, sin dar nada por sabido de antes."},
        {universe:'anime', text:"Reaccionando al primer capítulo de la temporada de anime más esperada del año."},
        {universe:'geek', text:"Reaccionando al tráiler final antes del estreno más comentado del mes."}
      ]
    };

    // ──────────────────────────────────────────────────────────
    // IMPORTAR IDEAS DESDE JSON (Rincón del Friki): las 50 ideas base
    // viven en el código (rinconSecretIdeas), pero el usuario puede
    // pegar un bloque JSON externo con ideas nuevas — se guardan aparte
    // (localStorage) y se combinan con las del código al pintar, sin
    // tocar rinconSecretIdeas. Los IDs de "hecha/descartar" siguen
    // funcionando porque las nuevas ideas se añaden SIEMPRE al final de
    // cada tipo (índices que continúan a partir de las de base).
    // ──────────────────────────────────────────────────────────
    const RINCON_EXTRA_IDEAS_KEY = 'charkuma_rincon_extra_ideas';
    const RINCON_VALID_TYPES = Object.keys(rinconSecretIdeas);

    function loadRinconExtraIdeas(){
      try { return JSON.parse(localStorage.getItem(RINCON_EXTRA_IDEAS_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveRinconExtraIdeas(data){
      try { localStorage.setItem(RINCON_EXTRA_IDEAS_KEY, JSON.stringify(data)); }
      catch (e) { /* seguimos sin guardarlo, sin romper nada */ }
      if (!applyingRemoteIdeaBanksUpdate && typeof pushIdeaBanksState === 'function') pushIdeaBanksState();
    }
    function getRinconIdeasMerged(){
      const extra = loadRinconExtraIdeas();
      const merged = {};
      Object.keys(rinconSecretIdeas).forEach(type => {
        merged[type] = rinconSecretIdeas[type].concat(extra[type] || []);
      });
      // Por si el JSON trae un tipo que no existe todavía en el banco base.
      Object.keys(extra).forEach(type => {
        if (!merged[type]) merged[type] = extra[type].slice();
      });
      return merged;
    }

    function importRinconIdeasFromJSON(){
      const textarea = document.getElementById('rinconJsonImport');
      const statusEl = document.getElementById('rinconJsonImportStatus');
      if (!textarea || !statusEl) return;

      let parsed;
      try {
        parsed = JSON.parse(textarea.value);
      } catch (e) {
        statusEl.textContent = '❌ Eso no es JSON válido — revisa comillas y comas.';
        return;
      }

      const additions = {};
      const addEntry = (type, entry) => {
        if (!entry) return;
        const text = typeof entry === 'string' ? entry : entry.text;
        if (!text || typeof text !== 'string') return;
        const finalType = RINCON_VALID_TYPES.includes(type) ? type : 'opinion';
        if (!additions[finalType]) additions[finalType] = [];
        additions[finalType].push({
          universe: (entry.universe && String(entry.universe)) || 'geek',
          text: text.trim()
        });
      };

      if (Array.isArray(parsed)) {
        parsed.forEach(entry => addEntry(entry && entry.type, entry));
      } else if (parsed && typeof parsed === 'object') {
        Object.keys(parsed).forEach(type => {
          const arr = Array.isArray(parsed[type]) ? parsed[type] : [];
          arr.forEach(entry => addEntry(type, entry));
        });
      }

      const addedCount = Object.values(additions).reduce((sum, arr) => sum + arr.length, 0);
      if (!addedCount) {
        statusEl.textContent = '⚠️ No he reconocido ninguna idea válida ahí — mira el formato de ejemplo de arriba.';
        return;
      }

      // Backlog #177 — avisar ANTES de guardar si alguna idea nueva se
      // parece mucho a algo que ya existe (otra idea de cualquier banco,
      // o un guion ya real) — no bloquea el guardado, solo avisa, la
      // decisión sigue siendo del usuario.
      const warnings = [];
      Object.values(additions).flat().forEach(entry => {
        const match = findSimilarExistingTitle(entry.text);
        if (match) warnings.push(`"${entry.text}" se parece a "${match.text}" (${Math.round(match.score * 100)}% de palabras en común)`);
      });

      const extra = loadRinconExtraIdeas();
      Object.keys(additions).forEach(type => {
        extra[type] = (extra[type] || []).concat(additions[type]);
      });
      saveRinconExtraIdeas(extra);

      textarea.value = '';
      let msg = `✅ Añadidas ${addedCount} idea${addedCount === 1 ? '' : 's'} nueva${addedCount === 1 ? '' : 's'} al banco.`;
      if (warnings.length) msg += ` ⚠️ Posible parecido: ${warnings.join(' · ')}`;
      statusEl.textContent = msg;
      renderRinconSecret();
    }

    function renderRinconSecret(){
      const container = document.getElementById('rfSecretContainer');
      if (!container) return;
      const bank = 'rincon';
      const bankState = loadIdeaBanks()[bank] || {};

      // No perder qué acordeones estaban abiertos al volver a pintar.
      const openTypes = new Set(
        [...container.querySelectorAll('details.month')].filter(d => d.open).map(d => d.dataset.type)
      );

      const allIdeas = getRinconIdeasMerged();
      const searchQuery = (document.getElementById('rfIdeaSearch')?.value || '').trim().toLowerCase();
      const discardedItems = [];
      let html = "";
      Object.keys(allIdeas).forEach(type => {
        const ideas = allIdeas[type];
        const emoji = (TYPE_LABELS[type] || '💡').split(' ')[0];
        let matchCount = 0;
        const rows = ideas.map((idea, i) => {
          const id = `${type}-${i}`;
          const s = bankState[id] || {};
          if (s.discarded) discardedItems.push({id, label: idea.text, discardedAt: s.discardedAt, discardReason: s.discardReason});
          if (searchQuery && !idea.text.toLowerCase().includes(searchQuery)) return '';
          matchCount++;
          return `
          <div class="idea-card${s.discarded ? ' is-discarded' : ''}">
            <button type="button" class="idea-check${s.done ? ' is-done' : ''}"
              onclick="toggleIdeaDone('${bank}','${id}', this)"
              title="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}"
              aria-label="${s.done ? 'Marcar como pendiente de nuevo' : 'Marcar como ya hecha'}">${s.done ? '✅' : emoji}</button>
            <div class="idea-body">
              <div class="template-head" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <span class="type-chip type-${type}">${TYPE_LABELS[type] || type}</span>
                  <span class="type-chip universe-chip">${IDEA_UNIVERSE_LABELS[idea.universe] || idea.universe || IDEA_UNIVERSE_LABELS.geek}</span>
                </div>
                <span class="count">#${i + 1}</span>
              </div>
              <p style="margin:6px 0 0">${escapeHTML(idea.text)}</p>
              ${ideaLinkControlsHTML(bank, id, type, idea.text)}
            </div>
            <button type="button" class="idea-discard-btn" onclick="toggleIdeaDiscard('${bank}','${id}')">${s.discarded ? '↩️ Restaurar' : '🗑️ Descartar'}</button>
          </div>`;
        }).join('');
        if (searchQuery && matchCount === 0) return;
        html += `
          <details class="month" data-type="${type}"${(openTypes.has(type) || searchQuery) ? ' open' : ''}>
            <summary>
              <span>${TYPE_LABELS[type] || type}</span>
              <span class="count">${searchQuery ? `${matchCount} de ${ideas.length}` : `${ideas.length} ideas`}</span>
            </summary>
            <div class="month-body">${rows}</div>
          </details>`;
      });
      container.innerHTML = html || (searchQuery ? emptyStateHTML(`Nada coincide con "${escapeAttr(searchQuery)}" en este banco.`) : html);
      container.classList.toggle('hide-discarded', getHideDiscardedPref(bank));

      const counterEl = document.getElementById('rfDiscardCounter');
      if (counterEl) counterEl.textContent = `🗑️ ${discardedItems.length} descartada${discardedItems.length === 1 ? '' : 's'}`;
      const discardedCountEl = document.getElementById('rfDiscardedCount');
      if (discardedCountEl) discardedCountEl.textContent = discardedItems.length;
      const discardedListEl = document.getElementById('rfDiscardedListBody');
      if (discardedListEl) discardedListEl.innerHTML = discardedListHTML(bank, discardedItems);
      const hideCheckbox = document.getElementById('rfHideDiscarded');
      if (hideCheckbox) hideCheckbox.checked = getHideDiscardedPref(bank);

      const totalIdeas = Object.values(allIdeas).reduce((sum, arr) => sum + arr.length, 0);
      const summaryEl = document.getElementById('rfSecretSummary');
      if (summaryEl) summaryEl.textContent = `${totalIdeas} ideas · ${Object.keys(allIdeas).length} tipos de contenido`;
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
      if (!applyingRemoteRankingScheduleUpdate && typeof pushRankingScheduleState === 'function') pushRankingScheduleState();
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
                <span class="slot-name">${filled ? escapeHTML(filled) : '—'}</span>
              </div>`;
            }).join('')}
          </div>`;
      }).join('');

      return `
        <div class="team-board ${isActive ? 'active-team' : ''} ${team.complete ? 'complete' : ''}">
          <h4>${escapeHTML(team.name)}</h4>
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
    wireCopyButton('copyShortVersionBtn', 'shortVersionText', '📋 Copiar'); // Backlog #227

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
        internalView: "lab-generador-miniaturas", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Bitácora: probando ComfyUI por primera vez",
        type: "bitacora",
        date: "2026-09-02",
        summary: "Primeras impresiones montando flujos de generación de imagen con nodos. Va para largo.",
        thumbnail: "📓",
        internalView: "lab-comfyui", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Bot de Discord para el servidor de CHARKUMA",
        type: "proyecto",
        date: "2026-09-04",
        summary: "Comandos básicos, roles automáticos y aviso cuando sube un vídeo nuevo.",
        thumbnail: "🕹️",
        internalView: "lab-bot-discord", reviewed: false, stage: 'creando-guion'
      }
      // { title:"...", type:"proyecto|herramienta|bitacora", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🧪", link:"..." },
    ];

    const LAB_TYPE_LABELS = {
      proyecto: '🟣 Proyecto', herramienta: '🟢 Herramienta', bitacora: '🟡 Bitácora'
    };

    // ── HELQUIDGAMES: conceptos de próximos juegos (no vídeos, juegos
    // en sí) — igual que labContent/geekContent, para que tengan su
    // propio estado (pendiente/aprobado/en proceso/publicado/descartado)
    // con los mismos botones que el resto de contenido.
    const helquidGamesContent = [
      {
        title: "Draft Arena",
        type: "concepto",
        date: "2026-09-06",
        summary: "Draft por turnos para 2 jugadores en el mismo dispositivo, reutilizando la mecánica de Ruleta del 11 con pools intercambiables.",
        thumbnail: "🎴",
        internalView: "helquid-draft-arena", reviewed: false, stage: 'creando-guion'
      }
      // { title:"...", type:"concepto", date:"AAAA-MM-DD",
      //   summary:"...", thumbnail:"🎮", internalView:"..." },
    ];
    const HELQUID_GAME_LABELS = { concepto: '💡 Concepto de juego' };

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
        thumbnail: "🎨", internalView: "ia-prompt-miniaturas", reviewed: false, isTool: true
      },
      {
        title: "Aviso automático a Discord cuando subo vídeo",
        type: "automatizacion", date: "2026-08-25",
        summary: "Automatización sencilla que avisa al servidor en cuanto se publica un vídeo nuevo.",
        thumbnail: "⚙️", internalView: "ia-auto-discord", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Generando personajes retro con IA",
        type: "visual", date: "2026-09-01",
        summary: "Pruebas de generación de imagen para ilustrar juegos clásicos de Retro 365.",
        thumbnail: "🖼️", internalView: "ia-visual-retro", reviewed: false, stage: 'creando-guion'
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
        thumbnail: "📝", internalView: "ia-prompt-reaccion", reviewed: false, stage: 'creando-guion'
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
        thumbnail: "🎛️", internalView: "ct-obs-retro", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Plantilla de miniatura para Rincón del Friki",
        type: "plantilla", date: "2026-09-03",
        summary: "Plantilla editable para sacar miniaturas de vídeos de Marvel/The Boys en minutos.",
        thumbnail: "📐", internalView: "ct-plantilla-friki", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Pack de stingers y sonidos de transición",
        type: "recurso", date: "2026-09-04",
        summary: "Efectos de sonido cortos para cambios de escena, hechos a medida para el canal.",
        thumbnail: "🔌", internalView: "ct-stingers", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Overlay especial para maratones de Retro 365",
        type: "overlay", date: "2026-09-06",
        summary: "Variante del overlay principal con contador de días y progreso del reto en pantalla.",
        thumbnail: "🎥", internalView: "ct-overlay-retro365", reviewed: false, stage: 'creando-guion'
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
        thumbnail: "📦", internalView: "hm-figura-3d", reviewed: false, stage: 'creando-guion'
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
    const HELQUID_IDEA_LABELS = { reto:'🏆 Reto', formato:'🎮 Formato nuevo', colab:'🤝 Colab', especial:'✨ Especial', tendencia:'📈 Tendencia real (VidIQ)' };
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
        "Reto comunidad: la audiencia decide la siguiente decisión del juego.",
        "Terminar un juego usando solo el mando al revés (o alguna restricción física parecida), por diversión.",
        "Reto pacifista: completar un nivel entero sin eliminar a ningún enemigo, si el juego lo permite.",
        "Superar el jefe final más odiado del canal en el menor número de intentos posible, en directo."
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
        "Probar mods o contenido creado por la comunidad de un juego ya conocido.",
        "Blind run: jugar algo elegido a ciegas por el chat, sin saber nada antes de empezar.",
        "Ranking de los peores/mejores tutoriales de videojuegos que he sufrido nunca."
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
        "Versus por turnos: cada uno elige un reto para que el otro lo cumpla.",
        "Reto de \"quien pierde dona algo simbólico\" con otro creador, en un juego competitivo corto.",
        "Maratón conjunta de un juego largo, turnándonos cada 30 minutos con otro streamer."
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
        "Especial cruce: un día jugando algo pedido por Rincón del Friki.",
        "Especial \"vuelvo a intentarlo\": retomar en directo un juego que dejé a medias hace tiempo.",
        "Especial de estrenos: probamos en directo lo que salga ese día en Retro 365."
      ],
      // Ideas ya formadas (no combinadas al azar) sacadas de vídeos de gaming
      // en español que están funcionando de verdad ahora mismo, vía VidIQ
      // (vidiq_trending_videos, 6-sep-2026). Se refrescan de vez en cuando —
      // no son una plantilla genérica, son temas reales del momento.
      tendencia: [
        "Analizar cómo el modelo free-to-play y las microtransacciones han cambiado (a peor, según muchos) la industria del gaming, con ejemplos reales.",
        "Repasar casos reales de periodistas generalistas hablando fatal y sin idea sobre videojuegos, y desmontar sus argumentos.",
        "Explicar de forma sencilla cómo funciona la IA de los enemigos o compañeros en un juego famoso (tipo Alien: Isolation o Resident Evil 4).",
        "Recopilar easter eggs poco conocidos en varios juegos populares, con el contexto de por qué existen.",
        "Vídeo tipo \"making of\": por qué trabajar en el desarrollo de un juego indie es divertido, aunque sea duro.",
        "Ranking de las colaboraciones más locas entre música (rap/hip-hop) y videojuegos a lo largo de los años.",
        "Ranking en tono de humor: qué personajes de videojuegos tienen \"más aura\" ahora mismo.",
        "Contar la historia de cómo llegó el doblaje latino a los videojuegos que marcaron a una generación.",
        "Explicar en cristiano una tecnología gráfica nueva (tipo IA/upscaling) y cómo cambiaría un juego retro si se aplicara hoy.",
        "Repasar las controversias más absurdas de videojuegos recientes, con opinión propia sobre cada una."
      ]
    };
    IDEA_BANK_RENDERERS.helquid = () => renderTypedIdeaBank({
      bank:'helquid', ideasByType:getBankIdeasMerged('helquid', helquidSecretIdeas), typeLabels:HELQUID_IDEA_LABELS,
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
        "Diseñar alertas personalizadas para donaciones o subs con la mascota CHARKUMA.",
        "Mini-juego de navegador basado en el universo de CHARKUMA, jugable desde la propia web.",
        "Sistema de logros desbloqueables navegando por la web (easter eggs incluidos).",
        "Rediseño del Control Secreto Maestro con vista de tablero tipo kanban.",
        "Widget de \"racha de publicación\" visible en la portada de la web."
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
        "Cronómetro de \"tiempo de pantalla vs tiempo hablando\" para calibrar el ritmo.",
        "Generador automático de miniaturas a partir del título y la sección del vídeo.",
        "Comparador de dos versiones de un guion para ver qué cambió entre borradores.",
        "Script que avisa si una idea lleva demasiado tiempo en \"pendiente\" sin moverse."
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
        "Reflexión sincera sobre qué proyecto de Charkuma Lab ha sido el más útil.",
        "Cómo monté el sistema de bancos de ideas secretos, paso a paso, con los fallos incluidos.",
        "Una semana usando el Control Secreto Maestro a diario: qué ha cambiado en mi flujo de trabajo.",
        "Lo que aprendí generando estrenos en vivo con la API de TMDB por primera vez."
      ]
    };
    // Backlog #231 — "Detrás de cámaras" como fuente ACTIVA de ideas, no
    // solo una página que se lee y ya. Estas 3 ideas nacen literalmente
    // de lo que esa misma página ya cuenta de verdad (nada inventado, ni
    // una tendencia externa) — el botón las manda de verdad al banco de
    // Charkuma Lab, reutilizando exactamente el mismo addBankExtraIdeas()
    // que ya usan los generadores de ideas existentes, con un registro
    // real de cuáles ya se añadieron para no duplicarlas si se revisita
    // la página.
    const DETRAS_CAMARAS_IDEAS = [
      'Enseño de verdad cuántos commits reales lleva esta web hechos en unos pocos días — la mayoría, mientras dormía.',
      'La única regla que nunca rompo programando esto con IA: nunca inventar un dato para que "parezca que funciona".',
      'Cómo decido qué automatizar y qué no cuando trabajo con Claude en modo autónomo (/loop).'
    ];
    const DETRAS_CAMARAS_IDEAS_ADDED_KEY = 'charkuma_detras_camaras_ideas_added';
    function loadDetrasCamarasIdeasAdded(){
      try { return new Set(JSON.parse(localStorage.getItem(DETRAS_CAMARAS_IDEAS_ADDED_KEY)) || []); }
      catch (e) { return new Set(); }
    }
    function renderDetrasCamarasIdeas(){
      const list = document.getElementById('detrasCamarasIdeasList');
      if (!list) return;
      const added = loadDetrasCamarasIdeasAdded();
      list.innerHTML = DETRAS_CAMARAS_IDEAS.map((idea, i) => `
        <div class="panel" style="padding:12px 16px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
          <span>${escapeAttr(idea)}</span>
          <button type="button" class="btn btn-secondary" ${added.has(i) ? 'disabled' : ''} onclick="addDetrasCamarasIdeaToLab(${i})">${added.has(i) ? '✅ Añadida' : '➕ Añadir a Charkuma Lab'}</button>
        </div>`).join('');
    }
    function addDetrasCamarasIdeaToLab(i){
      const idea = DETRAS_CAMARAS_IDEAS[i];
      if (!idea) return;
      const added = loadDetrasCamarasIdeasAdded();
      if (added.has(i)) return; // ya añadida antes, no duplicar
      addBankExtraIdeas('lab', { bitacora: [idea] });
      added.add(i);
      try { localStorage.setItem(DETRAS_CAMARAS_IDEAS_ADDED_KEY, JSON.stringify([...added])); } catch (e) {}
      if (IDEA_BANK_RENDERERS.lab) IDEA_BANK_RENDERERS.lab();
      renderDetrasCamarasIdeas();
    }

    IDEA_BANK_RENDERERS.lab = () => renderTypedIdeaBank({
      bank:'lab', ideasByType:getBankIdeasMerged('lab', labSecretIdeas), typeLabels:LAB_TYPE_LABELS,
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
        "Prompt para generar variantes de un mismo chiste o gancho inicial.",
        "Prompt para convertir un comentario de la audiencia en idea de vídeo completa.",
        "Prompt para generar 5 ganchos distintos para el mismo vídeo y elegir el mejor.",
        "Prompt para transformar una nota rápida a medias en guion presentable."
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
        "Automatizar el paso de \"guion aprobado\" a tarea en el calendario de publicación.",
        "Aviso automático cuando una idea aprobada lleva más de dos semanas sin empezar guion.",
        "Sincronizar el estado a \"publicado\" en cuanto se detecta el vídeo ya subido a YouTube.",
        // Backlog #233 — refresco real 14 sep, con tendencias de verdad de
        // 2026 (Forbes España, Microsoft Source EMEA — ver detalle y
        // fuentes en el commit): agentes que encadenan tareas solas
        // ("sistemas multiagente"), no solo automatizaciones de un paso.
        "Probar un agente de IA que encadene varias tareas seguidas sin pedirle cada paso por separado (p. ej. buscar tendencia → generar guion → puntuar título), en vez de automatizaciones de un solo paso.",
        "Delegar en un asistente de IA con acceso a herramientas externas una tarea completa de principio a fin, para ver hasta dónde llega solo antes de necesitar ayuda."
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
        "Experimentar con estilos pixel-art para representar juegos de Retro 365.",
        "Generar variantes de miniatura A/B para el mismo vídeo y comparar cuál engancha más.",
        "Probar estilos de ilustración distintos para representar cada banco de ideas secreto."
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
        "Generar b-roll genérico (paisajes, texturas) para rellenar cortes de edición.",
        "Probar clonación de voz propia para narrar sin tener que grabar en el momento.",
        "Generar automáticamente capítulos (timestamps) a partir del guion ya escrito.",
        "Probar edición asistida por IA para el primer corte en bruto de un vídeo largo.",
        // Backlog #233 — mismo refresco 14 sep: vídeo generativo cada vez
        // más maduro y modelos pequeños especializados frente a los
        // generalistas de siempre (fuentes: Forbes España, Microsoft
        // Source EMEA, thevalley.es).
        "Probar un modelo de vídeo generativo para una escena completa de b-roll (varios segundos seguidos), no solo una imagen suelta como hasta ahora.",
        "Probar un modelo de IA pequeño y especializado en una sola tarea (p. ej. solo miniaturas) y comparar coste/calidad frente a uno generalista de siempre."
      ]
    };
    IDEA_BANK_RENDERERS.ia = () => renderTypedIdeaBank({
      bank:'ia', ideasByType:getBankIdeasMerged('ia', iaSecretIdeas), typeLabels:IA_LABELS,
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
        "Overlay reducido para pantalla compartida en formato vertical (móvil).",
        "Overlay con marcador de \"racha de días publicando\" a la vista durante el directo.",
        "Overlay ligero para probar juegos nuevos sin cámara, centrado solo en pantalla y chat."
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
        "Escena de despedida con resumen del directo y próximos vídeos.",
        "Escena de transición con la mascota reaccionando, para cambios de juego en directo.",
        "Preset rápido para grabar en vertical pensado directamente para Shorts/Reels.",
        "Escena de \"repasando comentarios\" con el chat en grande para leer en directo."
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
        "Plantilla de captura de pantalla anotada para tutoriales de Creator Tools.",
        "Plantilla de miniatura para vídeos de bitácora de Charkuma Lab.",
        "Plantilla de guion para vídeos de reacción a estrenos del Radar de estrenos.",
        "Plantilla de checklist de publicación con casillas, para imprimir o usar digital."
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
        "Checklist descargable de \"todo lo que lleva publicar un vídeo\".",
        "Pack de transiciones tipo \"glitch\" a juego con la estética retro de HELQUIDGAMES.",
        "Banco de preguntas frecuentes ya redactadas, para copiar y pegar en descripciones."
      ]
    };
    IDEA_BANK_RENDERERS.creator = () => renderTypedIdeaBank({
      bank:'creator', ideasByType:getBankIdeasMerged('creator', creatorSecretIdeas), typeLabels:CREATOR_LABELS,
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
        "Alfombra tufting a juego con el overlay de streaming, para el fondo del set.",
        "Alfombra tufting con el diseño del Radar de estrenos, versión mini para escritorio.",
        "Cojín tufting con el emoji secreto 🎮 de HELQUIDGAMES.",
        "Tapiz tufting con la silueta de la mascota en pose de streaming."
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
        "Diseño de banner para el canal de Discord, a juego con la web.",
        "Diseño de funda de portátil con el lema de CHARKUMA.",
        "Diseño de pin esmaltado con el logo de Retro 365.",
        "Diseño de fondo de escritorio a juego con el set de streaming.",
        "Diseño de camiseta conmemorativa del primer aniversario del canal."
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
        "Pin o insignia física con el logo, para llevar a eventos.",
        "Lámpara con el logo de CHARKUMA impresa en 3D, con luz interior.",
        "Base personalizada para el micrófono, a juego con el set.",
        "Set de imanes de nevera con la mascota en distintas poses."
      ]
    };
    IDEA_BANK_RENDERERS.hecho = () => renderTypedIdeaBank({
      bank:'hecho', ideasByType:getBankIdeasMerged('hecho', hechoSecretIdeas), typeLabels:HECHO_LABELS,
      containerId:'hechoSecretContainer', discardCounterId:'hechoDiscardCounter',
      discardedCountId:'hechoDiscardedCount', discardedListId:'hechoDiscardedListBody',
      hideCheckboxId:'hechoHideDiscarded'
    });
    IDEA_BANK_RENDERERS.hecho();

    // ──────────────────────────────────────────────────────────
    // REGISTRO DE ACTIVIDAD (Control Secreto Maestro): un log sencillo
    // en localStorage donde queda constancia de lo que se ha generado
    // o encontrado automáticamente — ideas nuevas, fallos, pendientes
    // de tu decisión. Lo usa tanto el botón "➕ Generar ideas" como
    // cualquier modo de trabajo autónomo futuro. Tope de 100 entradas
    // para no crecer sin límite.
    // ──────────────────────────────────────────────────────────