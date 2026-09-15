    // ══════════ 05-drive-recording-mode.js ══════════
    // VOZ_GUION_DRIVE_FOLDERS, Modo grabación (teleprompter, fotos de contexto, Shorts semanales/Un dato un minuto) y el Generador de Voz en Off.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    const VOZ_GUION_DRIVE_FOLDERS = {
      'rf-cruce-superman-spiderman': '114ZzlsMQzQVyq9on3BrL0ZGt9UvFg45h',
      'rf-mcu-homecoming-error': '1b-psSF6DtgpkSFjZqJuDQzLpmwBCkDUb',
      'rf-curiosidades-spiderman': '1zcdIn3irnAp9pIKRfysv-ZgOK9n6x3AP',
      'rf-opinion-multiverso': '1XhdC5AuWPeR8RengJR9jjpfj-v96ACLT',
      'rf-fancast-wolverine': '15dLarbPISkITVF5j_0FaUll5BU62x7BY',
      'rf-boys-vs-marvel': '1Gp6W-k15ZK_i21RzTZxKnhVgx7YSf42b',
      'rf-curiosidades-homelander': '1y-OPumqaeegpjxSXKB6TLN5eFLz9GxOo',
      'helquid-draft-arena': '1rGNRtX-O8cQGzPhwCbn1d4XlIc41x5xo',
      'lab-generador-miniaturas': '1WYuskrwM40zVl4UK0ekSUeLH_RTpDylD',
      'lab-comfyui': '1BGtWA9gE0JPp70XI61liP4lLvD2HPX6f',
      'lab-bot-discord': '1JcpE2x1IWySPbY0vePC345V6g-4sUTvR',
      'ia-prompt-reaccion': '1WgVE1bgHSwXHw57AHIUlVQtCiEpnmWiY',
      'ia-visual-retro': '1fjC3b33NO0alyHkavbeUA-ooDCcLTv5i',
      'ia-auto-discord': '1OQhm6dmxtKBoPfYngo0nVnvaIVw1pnK2',
      'ia-prompt-miniaturas': '1AOZQjyQ4npa_xJb0bA8kqK0J3hjet6Xu',
      'ct-obs-retro': '17rvl4z707oXvz32JR2LUGvzIgDFqOKjL',
      'ct-plantilla-friki': '1so0A0nEZQWNq7cTEUkijPZDBoF5aeWEf',
      'ct-stingers': '1cqAEEwujh0uqjvxb_aAWX-gnGi7zhYBY',
      'ct-overlay-retro365': '1TwIBW0H4ArZTjwFJ-ESI1lo6RpO5R7bS',
      'hm-figura-3d': '1JA_xySm1_Oto4_ZWafY1g7HSh4_dJwhx',
      'rf-ranking-empezar': '19bDLXqVBb2Y0ipJzyEfmgiY18SVeRO7w',
      'rf-opinion-homelander': '18J3rLLKgs8o4LKC-VFzPR2oBK5sRFDGb',
      'rf-opinion-deep': '1lt878iZusvNK5lb5jSeJa7hC-liQNvDV',
      'rf-opinion-brand-new-day': '1Zo0NF5jSVj4tYroU1_xO2QF-uhF_sfoy',
      'rf-opinion-regreso-xmen': '1I1pB0u8XweyAt72Az6oCxYr1QjQPKUK6',
      'rf-opinion-doom-rdj': '1Dc2EHNFsX2Y8I_fCW5j56eQLl80ecgI4',
      'rf-opinion-doom-centinelas': '1uKUoa9yK5LJAnCRjrPO3poNlePDee3h3',
      'rf-curiosidades-doom': '1cAmgpKSYirZ8TRJScqxNK86oMg2Ww0QO',
      'rf-curiosidades-tom-holland': '1Vj3_ZoZtxESPklPwH5-2Cf85r2W_c2_a',
      'rf-opinion-superheroes-sucios': '18cALvfcyRdkn7o8-bmwrFTR_Ti9lYf8l',
      'rf-nuevo-black-panther': '13mGiwKxV7ncCVhyJGQ9d3VBnEtzMbms9',
      'rf-ryan-gosling-ghost-rider': '1Q8QDiWqmqn-faW73joLGBRSpw34zJtFX',
      'rf-doomsday-cruce-historico': '1G_lJhzzxBPCLk9JkquxJhswNz40rYHyL',
      'rf-vought-rising': '14pZaJo5X88hY40CpqCpgHiXDzI0nxq_C',
      'rf-endgame-encore': '14lPuLlFigoE1p78VISI7AMCRtCSMe9O0',
      'rf-steve-peggy-regreso': '10TiDnuMTuZOJkTo7HiMTf44P9GMoQx4I',
      'rf-visionquest': '1nvGc9HoYeUNUJQ1kVljfhVAdaXoeN1tQ',
      'rf-marvels-wolverine-game': '1DW-xUoMrsN6OvF0Dj_BF5bj9zG6oG4Oc',
      'rf-dc-clayface': '1OQ2L4kFFc3efrUYCYOQpdushx8HTx-lZ',
      'rf-dragonball-beerus-remake': '1MtBu5qSVvAHCbQEcXxMAvzXPm-kLrV1x',
      'rf-directores-nolan-odyssey': '1iK0hsib-tIFqq4AmEBVzZuzgoVJU84HD'
    };

    // Extrae la narración real de un guion por su id de vista, SIN
    // necesidad de navegar hasta esa página — todas las vistas ya están
    // en el DOM (arquitectura de un solo HTML), así que basta con
    // buscarla por id. Reutiliza extractGuionBeats/findGuionPanel (#17/#18).
    function extractGuionFullScript(rid){
      const target = document.getElementById('view-' + rid);
      const panel = target && findGuionPanel(target);
      if (!panel) return '';
      return extractGuionBeats(panel)
        .filter(b => b.hasNarration)
        .map(b => b.text.replace(/^["“]+|["”]+$/g, ''))
        .join(' ');
    }

    function buildAllGuionItems(){
      return Object.keys(VOZ_GUION_DRIVE_FOLDERS).map(rid => {
        const item = findContentItemByView(rid);
        return { rid, title: item ? item.title : rid };
      });
    }

    let vozPreviewUtterance = null;
    function previewGuionVoiceSpeech(){
      const select = document.getElementById('vozGuionSelect');
      const rid = select && select.value;
      const script = rid && extractGuionFullScript(rid);
      if (!script || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      vozPreviewUtterance = new SpeechSynthesisUtterance(script);
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('es'));
      if (esVoice) vozPreviewUtterance.voice = esVoice;
      vozPreviewUtterance.lang = esVoice ? esVoice.lang : 'es-ES';
      const stopBtn = document.getElementById('vozStopBtn');
      const previewBtn = document.getElementById('vozPreviewBtn');
      vozPreviewUtterance.onend = () => { if (stopBtn) stopBtn.hidden = true; if (previewBtn) previewBtn.hidden = false; };
      if (stopBtn) stopBtn.hidden = false;
      if (previewBtn) previewBtn.hidden = true;
      window.speechSynthesis.speak(vozPreviewUtterance);
    }
    function stopGuionVoicePreview(){
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const stopBtn = document.getElementById('vozStopBtn');
      const previewBtn = document.getElementById('vozPreviewBtn');
      if (stopBtn) stopBtn.hidden = true;
      if (previewBtn) previewBtn.hidden = false;
    }

    // Estado real de audios ya generados con IA, sincronizado desde
    // Firestore (lo escribe Claude cuando genera uno de verdad — el
    // navegador nunca puede llamar a VidIQ por su cuenta).
    let audioGenState = {};
    function renderVozGuionDetail(){
      const select = document.getElementById('vozGuionSelect');
      const scriptBox = document.getElementById('vozGuionScript');
      const driveBtn = document.getElementById('vozDriveBtn');
      const statusBox = document.getElementById('vozRealStatus');
      if (!select || !select.value) return;
      const rid = select.value;
      const script = extractGuionFullScript(rid);
      if (scriptBox) scriptBox.value = script || '(No se ha encontrado narración real en este guion.)';
      const folderId = VOZ_GUION_DRIVE_FOLDERS[rid];
      if (driveBtn) driveBtn.onclick = () => window.open('https://drive.google.com/drive/folders/' + folderId, '_blank');
      const gen = audioGenState[rid];
      if (statusBox) {
        if (gen && gen.audioUrl) {
          const date = gen.generatedAt ? new Date(gen.generatedAt).toLocaleDateString('es-ES') : '';
          statusBox.innerHTML = `<strong>✅ Voz real ya generada</strong>${gen.voiceName ? ' (' + escapeAttr(gen.voiceName) + ')' : ''}${date ? ' — ' + date : ''}. <a href="${escapeAttr(gen.audioUrl)}" target="_blank" rel="noopener">▶️ Escuchar / descargar</a>`;
        } else {
          statusBox.innerHTML = `<strong>⏳ Todavía sin voz real generada.</strong> Pídesela a Claude cuando vayas a grabar/editar este vídeo — queda guardada en la carpeta de Drive de arriba.`;
        }
      }
      stopGuionVoicePreview();
    }
    function populateVozGuionSelect(){
      const select = document.getElementById('vozGuionSelect');
      if (!select) return;
      const items = buildAllGuionItems();
      select.innerHTML = items.map(it => `<option value="${escapeAttr(it.rid)}">${escapeAttr(it.title)}</option>`).join('');
      select.onchange = renderVozGuionDetail;
      renderVozGuionDetail();
      renderVozOverallStatus();
    }
    // Backlog Fase 2 #189 — de un vistazo, sin tener que abrir guion a
    // guion en el desplegable de arriba: cuántos ya tienen voz real
    // generada y cuáles faltan. Mismo dato real (`audioGenState`,
    // sincronizado desde Firestore) que ya usa `renderVozGuionDetail`.
    // Backlog #173 — cuánto queda por grabar en total, sumando la
    // narración real de cada guion pendiente (misma fórmula que ya usa
    // #17/injectBeatDurationEstimate, sin inventar un cálculo aparte).
    function pendingGuionTotalSeconds(pending){
      let total = 0;
      pending.forEach(it => {
        const target = document.getElementById('view-' + it.rid);
        const panel = target && findGuionPanel(target);
        if (!panel) return;
        extractGuionBeats(panel).forEach(b => {
          if (b.hasNarration) total += Math.max(1, Math.round(b.words / NARRATION_WORDS_PER_SECOND));
        });
      });
      return total;
    }
    function formatSecondsAsMinutes(totalSeconds){
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      return m > 0 ? `${m} min ${s}s` : `${s}s`;
    }
    function renderVozOverallStatus(){
      const statusEl = document.getElementById('vozOverallStatus');
      const detailsEl = document.getElementById('vozPendingDetails');
      const listEl = document.getElementById('vozPendingList');
      if (!statusEl) return;
      const items = buildAllGuionItems();
      const withVoice = items.filter(it => audioGenState[it.rid] && audioGenState[it.rid].audioUrl);
      const pending = items.filter(it => !(audioGenState[it.rid] && audioGenState[it.rid].audioUrl));
      const pendingSeconds = pendingGuionTotalSeconds(pending);
      statusEl.textContent = `${withVoice.length} de ${items.length} guiones ya tienen voz real generada.`
        + (pending.length ? ` ⏱️ ~${formatSecondsAsMinutes(pendingSeconds)} de narración pendiente de grabar en total.` : '');
      if (detailsEl) detailsEl.hidden = pending.length === 0;
      if (listEl) {
        listEl.innerHTML = pending.length
          ? `<ul class="ia-steps">${pending.map(it => `<li>${escapeAttr(it.title)}</li>`).join('')}</ul>`
          : '';
      }
    }
    // Backlog #174 — repaso rápido: el Hook (primeros 10s) de cada
    // guion todavía sin voz generada, para refrescar antes de una
    // sesión de grabación sin tener que abrir cada guion uno a uno.
    // Reutiliza extractGuionBeats (misma extracción real que ya usa el
    // modo grabación), solo se queda con el primer beat narrado.
    function toggleQuickHookReview(){
      const box = document.getElementById('quickHookReviewList');
      if (!box) return;
      box.hidden = !box.hidden;
      if (!box.hidden) renderQuickHookReview();
    }
    function renderQuickHookReview(){
      const box = document.getElementById('quickHookReviewList');
      if (!box) return;
      const items = buildAllGuionItems();
      const pending = items.filter(it => !(audioGenState[it.rid] && audioGenState[it.rid].audioUrl));
      const rows = pending.map(it => {
        const target = document.getElementById('view-' + it.rid);
        const panel = target && findGuionPanel(target);
        const beats = panel ? extractGuionBeats(panel).filter(b => b.hasNarration) : [];
        const hook = beats[0];
        if (!hook) return '';
        return `
          <div class="note" style="margin:0">
            <strong>${escapeAttr(it.title)}</strong>
            <p style="margin:6px 0 0">${escapeAttr(hook.text)}</p>
          </div>`;
      }).filter(Boolean).join('');
      box.innerHTML = rows || '<p class="yt-empty">No hay guiones pendientes con Hook narrado ahora mismo.</p>';
    }
    let audioGenRealtimeStarted = false;
    function initAudioGenRealtime(){
      if (!firestoreReady() || audioGenRealtimeStarted) return;
      audioGenRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'audioGeneration', 'state');
      onSnapshot(ref, (snap) => {
        audioGenState = (snap.exists() && snap.data().items) || {};
        const view = document.getElementById('view-ct-generador-voz');
        if (view && view.classList.contains('active')) { renderVozGuionDetail(); renderVozOverallStatus(); }
      });
    }

    // Backlog #18 — modo grabación a pantalla completa: overlay tipo
    // teleprompter con solo la narración de cada beat, en grande, para
    // grabar la voz en off sin tener que leer el guion completo con
    // todas las notas de producción de por medio.
    let recordingModeBeats = [];
    let recordingModeIndex = 0;
    let recordingModeRid = null;
    // Petición de Iván (8 sep, ampliada el mismo día a "los demás guiones
    // que la necesiten" y a cada página del modo grabación): al grabar la
    // voz en off, que aparezca una foto de contexto real justo encima del
    // beat cuando ese beat nombra a alguien concreto — p.ej. una foto de
    // Robert Downey Jr. sobre el Hook del guion que habla de él como
    // Doctor Doom. Cada heading admite VARIAS fotos (algunos beats
    // nombran a dos o tres actores a la vez, como el de Steve/Peggy o el
    // de los tres candidatos a Wolverine).
    // Regla estricta, igual que #67/#68 (nunca fabricar imágenes falsas):
    // solo entran aquí fotos REALES, con URL verificada a mano y crédito
    // correcto al autor/licencia — nunca una imagen generada ni un enlace
    // sin comprobar. En guiones con reparto muy numeroso (X-Men, el cruce
    // de Doomsday) se eligieron 1-2 caras representativas, no el reparto
    // entero, para no disparar el tiempo de verificación fuera de lo
    // razonable — están marcados abajo con una nota.
    const RECORDING_MODE_IMAGES = {
      // Ampliado 9 sep (foto por frase, no solo por beat): Desarrollo se
      // dividió en 3 frases independientes (Sue Storm/familia, diseño
      // del traje, RDJ como actor) — la del diseño del traje se deja
      // sin foto a propósito (sería mostrar el traje real de la
      // película, un elemento con copyright, no algo fotografiable con
      // honestidad fuera de un fotograma real).
      'rf-opinion-doom-rdj': {
        'Hook': [{
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg/500px-Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg',
          alt: 'Robert Downey Jr. en la Comic-Con de San Diego, 2014',
          credit: 'Robert Downey Jr. — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)'
        }],
        'Desarrollo': [
          { match: 'Sue Storm lo describe', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg/500px-Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg',
            alt: 'Vanessa Kirby, actriz de Sue Storm',
            credit: 'Vanessa Kirby (Sue Storm) — Foto: Jay Dixit, CC BY-SA 4.0 (Wikimedia Commons)'
          }] },
          { match: 'RDJ sabe construir un personaje', photos: [{
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg/500px-Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg',
            alt: 'Robert Downey Jr. en la Comic-Con de San Diego, 2014',
            credit: 'Robert Downey Jr. — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)'
          }] },
          // Añadido 9 sep (prioridad de Iván: seguir el barrido de fotos):
          // la frase del diseño del traje no tenía foto — imagen
          // promocional OFICIAL real del traje de Doom (no fan art, no
          // IA), verificada por HTTP. Distinto del resto (fotos de
          // actores reales): aquí lo real y fotografiable es el propio
          // traje ya mostrado oficialmente por el estudio.
          { match: 'cuidado real en el diseño', photos: [{
            url: 'https://images.thedirect.com/media/photos/doom_MEW6IA4.jpg',
            alt: 'Diseño oficial del traje de Doctor Doom en Avengers: Doomsday',
            credit: 'Arte promocional oficial del traje de Doom — Marvel Studios'
          }] }
        ]
      },
      // Ampliado 9 sep (pedido de Iván: foto en cada frase, no solo por
      // beat) — Hook y Desarrollo ahora tienen foto real por segmento
      // narrado: Chris Hemsworth (Thor, a quien Doom vence) y Vanessa
      // Kirby (actriz real de Sue Storm, la narradora del adelanto según
      // las fuentes). El segmento de los Centinelas se deja sin foto a
      // propósito: son un elemento ficticio con copyright, y no hay
      // ninguna imagen real y honesta que los represente sin fingir ser
      // un fotograma de la película. El hecho real y fotografiable del
      // beat Contexto sigue siendo el propio evento: el D23 Expo de
      // Anaheim (Cory Doctorow, CC BY-SA 2.0, Wikimedia Commons).
      'rf-opinion-doom-centinelas': {
        'Hook': [{
          url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/500px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg',
          alt: 'Chris Hemsworth, actor de Thor',
          credit: 'Chris Hemsworth (Thor) — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
        }],
        'Contexto': [{
          url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/D23_Expo_2015_general_admission_queue_%2820634317635%29.jpg',
          alt: 'Cola de entrada al D23 Expo, Anaheim',
          credit: 'D23 Expo, Anaheim — Foto: Cory Doctorow, CC BY-SA 2.0 (Wikimedia Commons)'
        }],
        'Desarrollo': [
          { match: 'deja fuera de combate a Thor', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/500px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg',
            alt: 'Chris Hemsworth, actor de Thor',
            credit: 'Chris Hemsworth (Thor) — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
          }] },
          { match: 'perder a su familia', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg/500px-Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg',
            alt: 'Vanessa Kirby, actriz de Sue Storm',
            credit: 'Vanessa Kirby (Sue Storm, narradora del adelanto) — Foto: Jay Dixit, CC BY-SA 4.0 (Wikimedia Commons)'
          }] }
        ]
      },
      // Doctor Doom no nace de un actor concreto sino de sus creadores —
      // foto de Stan Lee (Comic-Con) y de Jack Kirby (años 40, uniforme
      // del ejército — la única foto suya de licencia libre encontrada,
      // de antes de su etapa en el cómic, pero es él de verdad).
      // Bug real corregido 9 sep: estas fotos estaban puestas en la key
      // 'Desarrollo', pero a Stan Lee y Jack Kirby se les nombra en el
      // beat 'Contexto' ("creado por Stan Lee y Jack Kirby...") — nunca
      // llegaban a mostrarse en el paso correcto. 'Desarrollo' (Latveria,
      // el pacto de su madre, sus cicatrices) es pura ficción de Doom
      // sin ninguna persona real que nombrar, así que se queda sin foto
      // a propósito.
      'rf-curiosidades-doom': {
        'Contexto': [
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Stan_Lee_by_Gage_Skidmore.jpg/500px-Stan_Lee_by_Gage_Skidmore.jpg', alt: 'Stan Lee', credit: 'Stan Lee — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Jack_Kirby.jpg/500px-Jack_Kirby.jpg', alt: 'Jack Kirby, años 40', credit: 'Jack Kirby (años 40, uniforme del ejército de EE.UU.) — dominio público, Wikimedia Commons' }
        ]
      },
      'rf-nuevo-black-panther': {
        'Contexto': [{
          url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/David_Jonsson_%2854461706802%29.jpg/500px-David_Jonsson_%2854461706802%29.jpg',
          alt: 'David Jonsson', credit: 'David Jonsson — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)'
        }],
        // Backlog Fase 2 #153 (auditoría de guiones ya cubiertos): Ryan
        // Coogler, el director, se nombra por su nombre en Desarrollo
        // ("el director Ryan Coogler lo identificó en persona"), un beat
        // distinto del que ya tenía foto (Contexto, David Jonsson).
        // Ampliado 9 sep (foto por frase): Desarrollo dividido en 2
        // frases (trama de Toussaint / cómo llegó Coogler) — la foto de
        // Coogler ahora solo sale en su frase, no en toda la trama.
        'Desarrollo': [
          { match: 'Ryan Coogler lo identificó', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Ryan_Coogler_by_Gage_Skidmore.jpg/500px-Ryan_Coogler_by_Gage_Skidmore.jpg',
            alt: 'Ryan Coogler', credit: 'Ryan Coogler — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
          }] }
        ]
      },
      'rf-ryan-gosling-ghost-rider': {
        'Hook': [{
          url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Ryan_Gosling_by_Gage_Skidmore.jpg/500px-Ryan_Gosling_by_Gage_Skidmore.jpg',
          alt: 'Ryan Gosling', credit: 'Ryan Gosling — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
        }],
        // Shawn Levy, el director, se nombra por su nombre en Contexto
        // ("con Shawn Levy, el director de Deadpool y Lobezno, al mando").
        'Contexto': [{
          url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Shawn_Levy_by_Gage_Skidmore.jpg/500px-Shawn_Levy_by_Gage_Skidmore.jpg',
          alt: 'Shawn Levy', credit: 'Shawn Levy — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
        }],
        // Ampliado 9 sep (foto por frase): Desarrollo dividido en 3
        // frases — la de Tropper (guionista) se deja sin foto, no hay
        // ninguna verificada para él.
        'Desarrollo': [
          { match: 'Gosling llevaba años pidiendo', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Ryan_Gosling_by_Gage_Skidmore.jpg/500px-Ryan_Gosling_by_Gage_Skidmore.jpg',
            alt: 'Ryan Gosling', credit: 'Ryan Gosling — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
          }] },
          { match: 'él y Levy están rodando juntos', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Ryan_Gosling_by_Gage_Skidmore.jpg/500px-Ryan_Gosling_by_Gage_Skidmore.jpg', alt: 'Ryan Gosling', credit: 'Ryan Gosling — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Shawn_Levy_by_Gage_Skidmore.jpg/500px-Shawn_Levy_by_Gage_Skidmore.jpg', alt: 'Shawn Levy', credit: 'Shawn Levy — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }
          ] }
        ]
      },
      // Cruce con reparto muy numeroso — solo 2 caras representativas
      // (Pedro Pascal por los 4 Fantásticos, Ryan Gosling por el debut
      // de Ghost Rider), no el reparto entero.
      // Petición de Iván (8 sep, "sigue sin parar, cubre cada parte de
      // cada guion"): se amplía el reparto de este cruce, que antes se
      // había limitado a 2 caras representativas, con el resto de
      // actores que la propia narración nombra por su nombre.
      // Ampliado 9 sep (foto por frase, no solo por beat): antes las 7
      // fotos salían TODAS A LA VEZ durante el único párrafo narrado de
      // Desarrollo — ahora ese párrafo está dividido en 3 frases (una
      // por franquicia) y cada una enseña solo a sus actores.
      'rf-doomsday-cruce-historico': {
        'Desarrollo': [
          { match: '4 Fantásticos con Pedro Pascal', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg/500px-Pedro_Pascal_by_Gage_Skidmore.jpg', alt: 'Pedro Pascal', credit: 'Pedro Pascal — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg/500px-Vanessa_Kirby_at_the_2024_Toronto_International_Film_Festival_08_%28Cropped%29.jpg', alt: 'Vanessa Kirby', credit: 'Vanessa Kirby — Foto: Jay Dixit, CC BY-SA 4.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Joseph_Quinn_by_Gage_Skidmore.jpg/500px-Joseph_Quinn_by_Gage_Skidmore.jpg', alt: 'Joseph Quinn', credit: 'Joseph Quinn — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Ebon_Moss-Bachrach_by_Gage_Skidmore.jpg/500px-Ebon_Moss-Bachrach_by_Gage_Skidmore.jpg', alt: 'Ebon Moss-Bachrach', credit: 'Ebon Moss-Bachrach — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }
          ] },
          { match: 'X-Men clásicos', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/James_Marsden_by_Gage_Skidmore.jpg/500px-James_Marsden_by_Gage_Skidmore.jpg', alt: 'James Marsden', credit: 'James Marsden — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kelsey_Grammer_2016.jpg/500px-Kelsey_Grammer_2016.jpg', alt: 'Kelsey Grammer', credit: 'Kelsey Grammer — Foto: Greg2600, CC BY-SA 2.0 (Wikimedia Commons)' }
          ] },
          { match: 'Ghost Rider debuta', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Ryan_Gosling_by_Gage_Skidmore.jpg/500px-Ryan_Gosling_by_Gage_Skidmore.jpg', alt: 'Ryan Gosling', credit: 'Ryan Gosling — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }
          ] }
        ]
      },
      // Ampliado 9 sep (foto por frase): Desarrollo dividido en 2 frases
      // (Gen V cancelada, sin persona real / The Boys México con Diego
      // Luna) — antes su foto salía también durante la frase de Gen V.
      'rf-vought-rising': {
        'Desarrollo': [
          { match: 'Diego Luna como productor', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Diego_Luna_%282016%29.jpg/500px-Diego_Luna_%282016%29.jpg',
            alt: 'Diego Luna', credit: 'Diego Luna — Foto: Dick Thomas Johnson, CC BY 2.0 (Wikimedia Commons)'
          }] }
        ]
      },
      // Ampliado 9 sep (foto por frase): Contexto dividido en 2 frases
      // (una por actor), cada una con su propia foto en vez de las 2 a
      // la vez.
      'rf-steve-peggy-regreso': {
        'Contexto': [
          { match: 'Chris Evans regresa', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Chris_Evans_at_the_2025_Toronto_International_Film_Festival_%28cropped%29.jpg/500px-Chris_Evans_at_the_2025_Toronto_International_Film_Festival_%28cropped%29.jpg', alt: 'Chris Evans', credit: 'Chris Evans — Foto: Sara Komatsu, CC BY-SA 4.0 (Wikimedia Commons)'
          }] },
          { match: 'Hayley Atwell vuelve', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Hayley_Atwell_by_Gage_Skidmore.jpg/500px-Hayley_Atwell_by_Gage_Skidmore.jpg', alt: 'Hayley Atwell', credit: 'Hayley Atwell — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
          }] }
        ],
        // Ampliado 9 sep (prioridad de Iván: fotos en guiones ya
        // escritos): el Desarrollo era una sola frase larga combinando 3
        // ideas — dividida en 3 frases sueltas, y la que cita a Atwell
        // reutiliza su misma foto ya verificada (sin buscar una nueva).
        'Desarrollo': [
          { match: 'propia Atwell lo explicó', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Hayley_Atwell_by_Gage_Skidmore.jpg/500px-Hayley_Atwell_by_Gage_Skidmore.jpg', alt: 'Hayley Atwell', credit: 'Hayley Atwell — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)'
          }] }
        ]
      },
      // Ampliado 9 sep (foto por frase): la frase de la trama (sin
      // personas reales, solo ficción) se deja sin foto a propósito; las
      // 4 fotos ya verificadas se agrupan en la frase del reparto, que
      // es la que de verdad los nombra.
      'rf-visionquest': {
        'Desarrollo': [
          { match: 'Paul Bettany vuelve al papel', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Paul_Bettany_by_Gage_Skidmore.jpg/500px-Paul_Bettany_by_Gage_Skidmore.jpg', alt: 'Paul Bettany', credit: 'Paul Bettany — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/James_Spader_by_Gage_Skidmore.jpg/500px-James_Spader_by_Gage_Skidmore.jpg', alt: 'James Spader', credit: 'James Spader — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/James_D%27Arcy.jpg/500px-James_D%27Arcy.jpg', alt: 'James D\'Arcy', credit: 'James D\'Arcy — Foto: Eric Houdas, CC BY-SA 4.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Orla_Brady_2020_1.jpg/500px-Orla_Brady_2020_1.jpg', alt: 'Orla Brady', credit: 'Orla Brady — Foto: Virgin Media Dublin International Film Festival, CC BY 3.0 (Wikimedia Commons)' }
          ] }
        ]
      },
      // El propio guion ya pedía "foto/clip del actor" en sus notas de
      // producción (🎥 Visual) — esto solo cumple lo que el guion mismo
      // ya pide, con fotos reales verificadas.
      // El propio "Desarrollo" de este guion es una lista <ol> de los 3
      // candidatos, no narración "🎙️ Off" — el teleprompter lo salta
      // (mismo criterio que ya usa #17 para "sin narración directa"), así
      // que las 3 fotos van en el "Giro" siguiente, que sí es narración y
      // habla de "los tres" recién listados.
      'rf-fancast-wolverine': {
        'Hook': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Hugh_Jackman_by_Gage_Skidmore.jpg/500px-Hugh_Jackman_by_Gage_Skidmore.jpg', alt: 'Hugh Jackman', credit: 'Hugh Jackman — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }],
        'Giro': [
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Scott_Adkins_%2834554454204%29.jpg/500px-Scott_Adkins_%2834554454204%29.jpg', alt: 'Scott Adkins', credit: 'Scott Adkins — Foto: Eva Rinaldi, CC BY-SA 2.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Karl_Urban_by_Gage_Skidmore.jpg/500px-Karl_Urban_by_Gage_Skidmore.jpg', alt: 'Karl Urban', credit: 'Karl Urban — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Charlie_Hunnam_by_Gage_Skidmore.jpg/500px-Charlie_Hunnam_by_Gage_Skidmore.jpg', alt: 'Charlie Hunnam', credit: 'Charlie Hunnam — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }
        ],
        'Opinión': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Karl_Urban_by_Gage_Skidmore.jpg/500px-Karl_Urban_by_Gage_Skidmore.jpg', alt: 'Karl Urban', credit: 'Karl Urban — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }]
      },
      'rf-curiosidades-homelander': {
        'Giro': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Antony_Starr.jpg/500px-Antony_Starr.jpg', alt: 'Antony Starr', credit: 'Antony Starr — Foto: Eva Rinaldi, CC BY-SA 2.0 (Wikimedia Commons)' }]
      },
      // Ampliado 9 sep (foto por frase): Desarrollo dividido en 3 frases
      // — su foto solo sale en la 3ª (la que de verdad lo nombra), no en
      // las 2 anteriores (contraste/sátira, sin persona real).
      'rf-opinion-homelander': {
        'Desarrollo': [
          { match: 'interpretación de Antony Starr', photos: [{
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Antony_Starr_Photo_Op_GalaxyCon_Oklahoma_City_2024.jpg/500px-Antony_Starr_Photo_Op_GalaxyCon_Oklahoma_City_2024.jpg', alt: 'Antony Starr, 2024', credit: 'Antony Starr — Foto: Super Festivals, CC BY 2.0 (Wikimedia Commons)'
          }] }
        ]
      },
      // Backlog Fase 2 #153: el mismo beat nombra a 5 actores (Tom
      // Holland, Zendaya, Jon Bernthal, Florence Pugh, Mark Ruffalo) —
      // mismo criterio de "2 representativas" que otros repartos
      // numerosos (doomsday-cruce, regreso-xmen), no las 5.
      // Ampliado 9 sep (foto por frase + 3 actores nuevos verificados,
      // "no me importa de dónde, dame contexto"): Desarrollo dividido en
      // 3 frases (reparto/tono/recepción) — el reparto real nombra 5
      // actores, antes solo 2 tenían foto.
      'rf-opinion-brand-new-day': {
        'Desarrollo': [
          { match: 'junta a Tom Holland y Zendaya', photos: [
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/500px-Tom_Holland_by_Gage_Skidmore.jpg', alt: 'Tom Holland', credit: 'Tom Holland — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Zendaya_by_Gage_Skidmore.jpg/500px-Zendaya_by_Gage_Skidmore.jpg', alt: 'Zendaya', credit: 'Zendaya — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Jon_Bernthal_by_Gage_Skidmore.jpg/500px-Jon_Bernthal_by_Gage_Skidmore.jpg', alt: 'Jon Bernthal', credit: 'Jon Bernthal — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped%29.jpg/500px-Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped%29.jpg', alt: 'Florence Pugh', credit: 'Florence Pugh — Foto: Frank Sun, CC BY-SA 4.0 (Wikimedia Commons)' },
            { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/500px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg', alt: 'Mark Ruffalo', credit: 'Mark Ruffalo — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)' }
          ] }
        ]
      },
      'rf-curiosidades-tom-holland': {
        'Promesa': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/500px-Tom_Holland_by_Gage_Skidmore.jpg', alt: 'Tom Holland', credit: 'Tom Holland — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }]
      },
      // Reparto de 4 actores clásicos nombrados — solo 2 fotos
      // representativas (James Marsden, Kelsey Grammer), no las 4.
      // Bug real corregido 9 sep: estas 4 fotos estaban en la key
      // 'Desarrollo', pero a los 4 actores se les nombra en el beat
      // 'Contexto' ("actores clásicos como James Marsden, Kelsey
      // Grammer, Rebecca Romijn y Alan Cumming reaparecen...") — nunca
      // llegaban a mostrarse en el paso correcto. 'Desarrollo' habla de
      // 3 razones abstractas (fan-service, apuesta seria, timing) sin
      // nombrar a nadie, así que se queda sin foto a propósito.
      'rf-opinion-regreso-xmen': {
        'Contexto': [
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/James_Marsden_by_Gage_Skidmore.jpg/500px-James_Marsden_by_Gage_Skidmore.jpg', alt: 'James Marsden', credit: 'James Marsden — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kelsey_Grammer_2016.jpg/500px-Kelsey_Grammer_2016.jpg', alt: 'Kelsey Grammer', credit: 'Kelsey Grammer — Foto: Greg2600, CC BY-SA 2.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Rebecca_Romijn_by_Gage_Skidmore.jpg/500px-Rebecca_Romijn_by_Gage_Skidmore.jpg', alt: 'Rebecca Romijn', credit: 'Rebecca Romijn — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' },
          { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/AlanCummingSept2013TIFF.jpg/500px-AlanCummingSept2013TIFF.jpg', alt: 'Alan Cumming', credit: 'Alan Cumming — Foto: gdcgraphics, CC BY-SA 2.0 (Wikimedia Commons)' }
        ]
      },
      // Petición ampliada (8 sep): "no quiero solo el personaje, quiero
      // contexto real para lo que voy a narrar" — se extiende a guiones
      // donde se nombra a un actor/personaje real aunque el guion no gire
      // sobre él, siempre que la narración lo mencione de verdad (nunca
      // una foto forzada sin que el texto la sostenga).
      'rf-opinion-deep': {
        'Contexto': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Chace_Crawford_2.jpg/500px-Chace_Crawford_2.jpg', alt: 'Chace Crawford, actor de The Deep', credit: 'Chace Crawford — Foto: Christopher Peterson, CC BY 3.0 (Wikimedia Commons)' }]
      },
      'rf-boys-vs-marvel': {
        'Hook': [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Antony_Starr_Photo_Op_GalaxyCon_Oklahoma_City_2024.jpg/500px-Antony_Starr_Photo_Op_GalaxyCon_Oklahoma_City_2024.jpg', alt: 'Antony Starr, 2024', credit: 'Antony Starr — Foto: Super Festivals, CC BY 2.0 (Wikimedia Commons)' }]
      },
      // "Loki" solo se nombra en el segmento "A favor" — con `match` la
      // foto solo sale en esa frase, no en "Tesis" ni en "En contra".
      'rf-opinion-multiverso': {
        'Desarrollo': [{ match: 'Loki', photos: [{ url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Tom_Hiddleston_by_Gage_Skidmore.jpg/500px-Tom_Hiddleston_by_Gage_Skidmore.jpg', alt: 'Tom Hiddleston, actor de Loki', credit: 'Tom Hiddleston — Foto: Gage Skidmore, CC BY-SA 3.0 (Wikimedia Commons)' }] }]
      },
      // "Iron Man (2008)" solo sale en el segmento de Marvel — con
      // `match` no aparece durante el segmento de The Boys.
      'rf-ranking-empezar': {
        'Desarrollo': [{ match: 'Iron Man', photos: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg/500px-Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg', alt: 'Robert Downey Jr., Iron Man', credit: 'Robert Downey Jr. — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)' }] }]
      },
      // El metraje inédito del reestreno "probablemente presenta a Victor
      // von Doom" — misma foto de RDJ que en su guion de Doom.
      // Ampliado 9 sep (foto por frase): Desarrollo dividido en 3 frases
      // — la foto de RDJ solo sale en la frase que menciona a Victor von
      // Doom (su personaje), no en las otras 2 (minutos inéditos / IMAX).
      'rf-endgame-encore': {
        'Desarrollo': [
          { match: 'presentando a Victor von Doom', photos: [{
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg/500px-Robert_Downey%2C_Jr._SDCC_2014_%28cropped%29.jpg', alt: 'Robert Downey Jr.', credit: 'Robert Downey Jr. — Foto: Gage Skidmore, CC BY-SA 2.0 (Wikimedia Commons)'
          }] }
        ]
      },
      // Petición ampliada (8 sep): para guiones sin ningún actor/persona
      // real que mostrar, usar una ILUSTRACIÓN generada con IA (Gamma) en
      // vez de dejarlo sin nada — pero nunca del personaje con copyright
      // en sí (eso lo bloquea el propio filtro de contenido, y además
      // sale mal — un intento real con "Wolverine" genérico salió como
      // un garabato irreconocible). En su lugar, se ilustra la ESCENA o
      // el LUGAR real que el propio guion describe — sí da contexto de
      // verdad y no depende de recrear ningún personaje. Guardada en el
      // propio repo (`context-img/`) en vez de enlazar al CDN de Gamma,
      // igual que pasó con los audios de VidIQ: no hay garantía de que
      // esa URL externa siga viva dentro de un tiempo.
      // Petición ampliada (8 sep): cuando no se puede generar con IA (sin
      // créditos de Gamma), buscar una foto REAL ya existente en
      // internet con licencia libre verificada — mismo rigor que con
      // las fotos de personas (nunca una imagen con copyright sin
      // permiso). Madripoor se queda sin foto a propósito: es un lugar
      // ficticio sin equivalente real al que fotografiar.
      'rf-marvels-wolverine-game': {
        // Añadido 9 sep (barrido de fotos): Contexto nombra al estudio
        // real (Insomniac Games) — logo oficial, dominio público
        // (Logopedia vía Wikimedia), la propia nota de Visual del guion
        // ya pedía "logo de Insomniac Games".
        'Contexto': [{
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Insomniac_Games_logo.svg',
          alt: 'Logo de Insomniac Games',
          credit: 'Logo de Insomniac Games — dominio público (Wikimedia Commons)'
        }],
        'Desarrollo': [
          {
            url: 'context-img/rf-marvels-wolverine-game-canada.jpg',
            alt: 'Bosque nevado de Canadá, uno de los 3 escenarios del juego',
            credit: 'Uno de los 3 escenarios reales del juego (Canadá) — Gamma, prompt propio',
            ai: true
          },
          {
            url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Ginza_at_night%2C_Tokyo_JP.jpg/500px-Ginza_at_night%2C_Tokyo_JP.jpg',
            alt: 'Calles de Ginza, Tokio, de noche',
            credit: 'Tokio, otro de los 3 escenarios del juego — Foto: Stefano Vigorelli, CC BY-SA 4.0 (Wikimedia Commons)'
          }
        ]
      },
      // Backlog Fase 2 #151/#152 (2026-09-08, /loop autónomo): los 2
      // guiones que se quedaron sin ninguna imagen — mismo criterio que
      // Wolverine, ilustrar la ESCENA/CONCEPTO real, nunca el personaje.
      'rf-opinion-superheroes-sucios': {
        'Contexto': [{
          url: 'context-img/rf-opinion-superheroes-sucios-tono.jpg',
          alt: 'Ambiente urbano oscuro y lluvioso, tono "sucio"',
          credit: 'Ilustración del tono "sucio" descrito en el guion — Gamma, prompt propio',
          ai: true
        }]
      },
      'rf-curiosidades-spiderman': {
        'Hook': [{
          url: 'context-img/rf-curiosidades-spiderman-webshooter.jpg',
          alt: 'Concepto de lanzatelarañas mecánico, sin personaje',
          credit: 'Concepto del lanzatelarañas (invento, no poder biológico) — Gamma, prompt propio',
          ai: true
        }]
      },
      // Primer guion de la saga "dc" (9 sep) — Mike Flanagan (guionista
      // real de Clayface) solo aparece nombrado en la frase de Desarrollo
      // que habla del equipo creativo, así que la foto se ata a esa
      // frase con 'match' y no al resto del beat.
      'rf-dc-clayface': {
        'Desarrollo': [
          {
            match: 'guion de Mike Flanagan',
            photos: [{
              url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Mike_Flanagan_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg',
              alt: 'Mike Flanagan',
              credit: 'Mike Flanagan, guionista de Clayface — Foto: Kevin Payravi / WikiPortraits, CC BY-SA 4.0 (Wikimedia Commons)'
            }]
          }
        ]
      },
      // Primer guion de la saga "dragonball" (9 sep) — Masako Nozawa
      // (voz real de Goku) solo aparece nombrada en la frase de
      // Desarrollo que habla del reparto, así que la foto se ata a esa
      // frase con 'match'. La foto real la muestra junto a otra persona
      // (recibiendo un reconocimiento oficial) — crédito honesto de
      // ambos, mismo criterio que cualquier foto de grupo verificada.
      'rf-dragonball-beerus-remake': {
        'Desarrollo': [
          {
            match: 'Masako Nozawa como Goku',
            photos: [{
              url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Masako_Nozawa_and_Yohei_Matsumoto_2025-11-04.jpg',
              alt: 'Masako Nozawa, voz de Goku desde el origen de la franquicia',
              credit: 'Masako Nozawa recibiendo el reconocimiento de Persona de Mérito Cultural — Ministerio de Educación de Japón (MEXT), CC BY 4.0 (Wikimedia Commons)'
            }]
          }
        ]
      },
      // Primer guion de la saga "directores" (9 sep) — foto real de la
      // rueda de prensa de The Odyssey en Seúl (agosto 2026), muestra a
      // Nolan junto al reparto real (Theron, Damon) — crédito honesto
      // del grupo, mismo criterio que otras fotos de evento verificadas.
      'rf-directores-nolan-odyssey': {
        'Contexto': [{
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/The_Odyssey_Press_Conference_at_Seoul_%28August_3%2C_2026%29.jpg',
          alt: 'Christopher Nolan en la rueda de prensa de The Odyssey en Seúl, junto al reparto',
          credit: 'Rueda de prensa de The Odyssey en Seúl, agosto 2026 — Gobierno de la República de Corea, CC BY-SA 4.0 (Wikimedia Commons)'
        }]
      }
    };
    // Retro 365 (9 sep, pedido explícito de Iván: "en cada fase de cada
    // guion"): a diferencia de Rincón del Friki (personas/escenas
    // distintas por beat), aquí lo fotografiable real de cada guion es
    // siempre EL PROPIO JUEGO — así que se usa su carátula oficial real
    // (RAWG, mismo mecanismo ya usado en toda la web para las
    // miniaturas de Retro 365, verificada por HTTP igual que cualquier
    // otra foto de contexto) en los 6 beats que hablan del juego en sí.
    // "🔀 Giro / momento del directo" (algo personal del directo de
    // Iván, no un hecho fotografiable) y "💬 Opinión" (todavía sin
    // escribir, placeholder [IVÁN — AÑADIR OPINIÓN]) se dejan sin foto
    // a propósito — mismo criterio de honestidad que en Rincón del
    // Friki: no forzar una imagen donde no hay nada real que enseñar.
    // Generado en bucle en vez de repetir 37 veces el mismo bloque de 6
    // claves a mano.
    // `shots` (9 sep, ampliación "foto por frase"): 2 capturas de
    // gameplay REALES por juego, vía el propio endpoint de screenshots
    // de RAWG (mismo API key ya usado para las carátulas), verificadas
    // por HTTP antes de guardarlas — así Hook/Contexto/Conclusión/CTA
    // usan la carátula y Promesa/Desarrollo usan capturas de gameplay
    // reales y distintas, en vez de repetir siempre la misma imagen en
    // los 6 beats.
    const RETRO_DAY_COVERS = {
      4: { name: 'Hades', url: 'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg', shots: ['https://media.rawg.io/media/screenshots/546/546826ed2cde2dec94e1b470c8cbb9ac.jpg', 'https://media.rawg.io/media/screenshots/0aa/0aa5e778c3cf8f47e3ee7f8e0185eb16.jpg'] },
      5: { name: 'Unpacking', url: 'https://media.rawg.io/media/games/c11/c1118fbcfd846c631ecb7646f8efc780.jpg', shots: ['https://media.rawg.io/media/screenshots/007/007875f8599c35c73c108a7bcd9be6a6.jpg', 'https://media.rawg.io/media/screenshots/a47/a475f0f644a81c59f4b584ffcd1af855.jpg'] },
      7: { name: 'Portal 2', url: 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg', shots: ['https://media.rawg.io/media/screenshots/221/221a03c11e5ff9f765d62f60d4b4cbf5.jpg', 'https://media.rawg.io/media/screenshots/173/1737ff43c14f40294011a209b1012875.jpg'] },
      8: { name: 'Undertale', url: 'https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg', shots: ['https://media.rawg.io/media/screenshots/f06/f0657f2790937cf09c34f0aa65e81d7d.jpg', 'https://media.rawg.io/media/screenshots/1af/1af4cbbe6aaaad4661d627f545969a62.jpg'] },
      9: { name: 'Mario Kart 8 Deluxe', url: 'https://media.rawg.io/media/games/6f8/6f846e941c78cfbabe53cd67e55ced83.jpg', shots: ['https://media.rawg.io/media/screenshots/f94/f94b27140ac3b7af61ba844f4d54bb42.jpg', 'https://media.rawg.io/media/screenshots/9a1/9a13007b3ea3d8e6a4e16cc3d8f41a93.jpg'] },
      10: { name: 'Team Fortress 2', url: 'https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg', shots: ['https://media.rawg.io/media/screenshots/596/5968ba06bac8bee0ec7e9d03c970c421.jpg', 'https://media.rawg.io/media/screenshots/94f/94f4eb0b3d1fde7a37ec84f0f66f7f87.jpg'] },
      11: { name: 'The Walking Dead: Season 1', url: 'https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg', shots: ['https://media.rawg.io/media/screenshots/d38/d38c78ec9cc707bf42652452235dbe8c.jpg', 'https://media.rawg.io/media/screenshots/bdb/bdb7dd4891bfbb0a80cd49b36ffd1a20.jpg'] },
      12: { name: 'Red Dead Redemption 2', url: 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg', shots: ['https://media.rawg.io/media/screenshots/7b8/7b8895a23e8ca0dbd9e1ba24696579d9.jpg', 'https://media.rawg.io/media/screenshots/b8c/b8cee381079d58b981594ede46a3d6ca.jpg'] },
      13: { name: 'Divinity: Original Sin 2', url: 'https://media.rawg.io/media/games/424/424facd40f4eb1f2794fe4b4bb28a277.jpg', shots: ['https://media.rawg.io/media/screenshots/17b/17b87165c8b985ba98e12e0757455379.jpg', 'https://media.rawg.io/media/screenshots/876/87691068e9f4aafb4fbb35f2e2d6a2ff.jpg'] },
      14: { name: 'God of War (2018)', url: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg', shots: ['https://media.rawg.io/media/screenshots/d68/d6868e5f7bce66e326bd48b11ba24b13.jpeg', 'https://media.rawg.io/media/screenshots/928/928cdaf4ae204f202d177bbd65e911b3.jpeg'] },
      15: { name: "Sid Meier's Civilization IV", url: 'https://media.rawg.io/media/screenshots/85c/85c91c5064d2cdd56a949c8008868318.jpg', shots: ['https://media.rawg.io/media/screenshots/6cf/6cf85f3138f404b01e96632b2867d011.jpg', 'https://media.rawg.io/media/screenshots/ddb/ddb5ed69b4cc79a3bc687ae072401262.jpg'] },
      16: { name: 'Batman: Arkham City', url: 'https://media.rawg.io/media/games/b5a/b5a1226bfd971284a735a4a0969086b3.jpg', shots: ['https://media.rawg.io/media/screenshots/186/186256b37ba30738c118daefceba77e4.jpg', 'https://media.rawg.io/media/screenshots/55b/55ba4f622a1babc31b54489ea0144758.jpg'] },
      17: { name: 'The Legend of Zelda: Breath of the Wild', url: 'https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg', shots: ['https://media.rawg.io/media/screenshots/3c4/3c4a8f6b1994def75e73e1cb64624e7f.jpg', 'https://media.rawg.io/media/screenshots/8f5/8f5d4264b12090bb7aa5626fcfb5be18.jpg'] },
      18: { name: 'Elden Ring', url: 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg', shots: ['https://media.rawg.io/media/screenshots/36f/36f941f72e2b2a41629f5fb3bd448688.jpg', 'https://media.rawg.io/media/screenshots/290/29096848622521df7555850000236cb6.jpg'] },
      19: { name: 'Persona 5 Royal', url: 'https://media.rawg.io/media/games/a9c/a9c789951de65da545d51f664b4f2ce0.jpg', shots: ['https://media.rawg.io/media/screenshots/e70/e701311c431504ccd8653a5243188a13.jpg', 'https://media.rawg.io/media/screenshots/5af/5af7efeca549b9a768870c52eff7e128.jpg'] },
      20: { name: 'XCOM 2: War of the Chosen', url: 'https://media.rawg.io/media/games/824/8244534a6db2180e177271cebb9c002f.jpg', shots: ['https://media.rawg.io/media/screenshots/3a8/3a8eeb2638c573d7efb98ab4f7441fbc.jpg', 'https://media.rawg.io/media/screenshots/fbd/fbd8237d95731597e58ac45ca9e03c66.jpg'] },
      21: { name: 'Super Smash Bros. Ultimate', url: 'https://media.rawg.io/media/games/9f3/9f3c513b301d8d7250a64dd7e73c62df.jpg', shots: ['https://media.rawg.io/media/screenshots/1c9/1c9ae7a68285ad0d4aa046b22bcdc4bf.jpg', 'https://media.rawg.io/media/screenshots/f67/f670247976d1b8121a5149bdfd8dbc21.jpg'] },
      22: { name: 'Super Mario Odyssey', url: 'https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg', shots: ['https://media.rawg.io/media/screenshots/a38/a38e8c2161eb6c3c233b0488a3c2d5f1.jpg', 'https://media.rawg.io/media/screenshots/ff8/ff80f35e3301fa9c0027d9f021c24340.jpg'] },
      23: { name: 'The Witcher 3: Wild Hunt', url: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', shots: ['https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg', 'https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg'] },
      24: { name: 'Company of Heroes', url: 'https://media.rawg.io/media/games/0fa/0fadc446fd1e9ae9e23a32793d9a5406.jpg', shots: ['https://media.rawg.io/media/screenshots/1c8/1c8cf5141e6f1abc99b164c8c7c58f30.jpg', 'https://media.rawg.io/media/screenshots/b7d/b7d236b7de2b9ca670fa5f5bc09a09e1.jpg'] },
      25: { name: 'Bayonetta 2', url: 'https://media.rawg.io/media/games/3d7/3d7c8e749b18cfc898c80016594981fe.jpg', shots: ['https://media.rawg.io/media/screenshots/9bd/9bdf5a7fd96180970182cfe1c2644591.jpg', 'https://media.rawg.io/media/screenshots/24e/24e17421e42f3f8456c37aa7e8e07b69.jpg'] },
      26: { name: 'Grand Theft Auto IV', url: 'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg', shots: ['https://media.rawg.io/media/screenshots/07f/07f7cf80741ff306e4eca982c3e64ac8.jpg', 'https://media.rawg.io/media/screenshots/fef/fefd51ec13aa33acbd796ef79bcef7cb.jpg'] },
      27: { name: 'BioShock', url: 'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg', shots: ['https://media.rawg.io/media/screenshots/01f/01f62d7064838a5c3202acfc61503487.jpg', 'https://media.rawg.io/media/screenshots/7f5/7f517e07e36e4af5a7c0b86a7d42853f.jpg'] },
      28: { name: 'Fire Emblem Awakening', url: 'https://media.rawg.io/media/games/c43/c432339312ee5441edb081c05d2fa411.jpg', shots: ['https://media.rawg.io/media/screenshots/ca8/ca84c869162ed578ee9b3e4f9da40c5e.jpg', 'https://media.rawg.io/media/screenshots/41c/41cb3d5e005341447c7bf3fda605ce93.jpg'] },
      29: { name: 'The Elder Scrolls V: Skyrim', url: 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg', shots: ['https://media.rawg.io/media/screenshots/3bd/3bd2710bd1ffb6664fdea7b83afd067e.jpg', 'https://media.rawg.io/media/screenshots/d4e/d4e9b13f54748584ccbd6f998094dade.jpg'] },
      30: { name: 'StarCraft II: Wings of Liberty', url: 'https://media.rawg.io/media/games/5f7/5f7191716faebcf102a357c5c2889394.jpg', shots: ['https://media.rawg.io/media/screenshots/bb4/bb44d47aad507399057a320969cfb639.jpg', 'https://media.rawg.io/media/screenshots/14d/14d5a969573b103fba709ebd3fe4389c.jpg'] },
      31: { name: 'Cut the Rope', url: 'https://media.rawg.io/media/games/242/242011264968168c61e4efc71059f2ed.jpg', shots: ['https://media.rawg.io/media/screenshots/3fc/3fc43cc1198217ccf544f06f7f0da8c3.jpg', 'https://media.rawg.io/media/screenshots/6d1/6d1f8e9f78ac36f49d8ef3c3f9a8a9ba.jpg'] },
      32: { name: 'Half-Life 2', url: 'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg', shots: ['https://media.rawg.io/media/screenshots/8af/8af6188357426890cbc8c8a34d9e7b75.jpg', 'https://media.rawg.io/media/screenshots/3b5/3b542c954ba5bd2f32da067c8122cd80.jpg'] },
      33: { name: 'Mass Effect 2', url: 'https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg', shots: ['https://media.rawg.io/media/screenshots/3e9/3e987ae85497ded8e4fea09634be9c0a.jpg', 'https://media.rawg.io/media/screenshots/be5/be56c7c5c5b0f10644213f99051525f4.jpg'] },
      34: { name: 'Age of Empires II: Definitive Edition', url: 'https://media.rawg.io/media/games/945/9455733af10406794b0c1b8d117bca76.jpg', shots: ['https://media.rawg.io/media/screenshots/486/4869b64447fb4237b8cf62a9d91989cc.jpg', 'https://media.rawg.io/media/screenshots/f52/f522ea2ddf04e67cb73b62676b5d2b08.jpg'] },
      35: { name: 'Okami HD', url: 'https://media.rawg.io/media/games/a38/a3857b2445c70ac5dbe73b210a827ad8.jpg', shots: ['https://media.rawg.io/media/screenshots/0ac/0acef7da2162e1323dc7be0e59214b2e.jpg', 'https://media.rawg.io/media/screenshots/48b/48b317514627e92562eeb5f68f9c51e4.jpg'] },
      36: { name: 'Call of Duty 4: Modern Warfare', url: 'https://media.rawg.io/media/games/9fb/9fbaea2168caea1f806546dfdaaeb1da.jpg', shots: ['https://media.rawg.io/media/screenshots/e8e/e8e92ec1aff7d7767662614d6b47e1c6.jpg', 'https://media.rawg.io/media/screenshots/3a7/3a716eecfb1b6cbc85d90c36534177a4.jpg'] },
      37: { name: 'Grand Theft Auto V', url: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg', shots: ['https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg', 'https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg'] },
      38: { name: 'Dark Souls II', url: 'https://media.rawg.io/media/games/651/6512783a214618584d144d5d852ba595.jpg', shots: ['https://media.rawg.io/media/screenshots/03e/03e657663de4826fde181d09deeb8791.jpg', 'https://media.rawg.io/media/screenshots/0f5/0f5501f44c4331b7a7cfb83bb68e7dca.jpg'] },
      39: { name: 'Disco Elysium - The Final Cut', url: 'https://media.rawg.io/media/games/0af/0afe9e8ace196123d8c7cf22172cec63.jpg', shots: ['https://media.rawg.io/media/screenshots/627/627aeb395f83dbbe72ab6292f7980c97.jpg', 'https://media.rawg.io/media/screenshots/273/2733c373f7b29cfb25d15db8055fbfb2.jpg'] },
      40: { name: 'Overwatch', url: 'https://media.rawg.io/media/games/4ea/4ea507ceebeabb43edbc09468f5aaac6.jpg', shots: ['https://media.rawg.io/media/screenshots/879/8794242f393b3258e97b690a4138d056.jpg', 'https://media.rawg.io/media/screenshots/9b0/9b060d7b7d606cc3717face57c9f0910.jpg'] },
      41: { name: 'NieR:Automata', url: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg', shots: ['https://media.rawg.io/media/screenshots/286/28651ead277f96a8b950ded95b617b25.jpg', 'https://media.rawg.io/media/screenshots/818/8186c49e4788cb1a9d346689afeff9e4.jpg'] }
    };
    Object.keys(RETRO_DAY_COVERS).forEach(day => {
      const { name, url, shots } = RETRO_DAY_COVERS[day];
      const coverPhotos = [{ url, alt: `Carátula oficial de ${name}`, credit: `Carátula oficial de ${name} — vía RAWG.io` }];
      const entry = {};
      ['Hook', 'Contexto', 'Conclusión', 'CTA'].forEach(key => { entry[key] = coverPhotos; });
      if (shots && shots[0]) entry['Promesa'] = [{ url: shots[0], alt: `Captura real de gameplay de ${name}`, credit: `Captura real de ${name} — vía RAWG.io` }];
      if (shots && shots[1]) entry['Desarrollo'] = [{ url: shots[1], alt: `Captura real de gameplay de ${name}`, credit: `Captura real de ${name} — vía RAWG.io` }];
      RECORDING_MODE_IMAGES[`retro-day-${day}`] = entry;
    });
    function openRecordingMode(rid, triggerEl){
      // `triggerEl` (el propio botón pulsado) es opcional y solo hace
      // falta en páginas con MÁS DE UN guion en la misma vista activa —
      // la chuleta secreta de Retro 365 mete los 37 días decididos en
      // una sola vista, así que sin esto findGuionPanel() cogería
      // siempre el primer "✍️ Guion" del DOM sin importar qué día se
      // pulsó. Con triggerEl, se busca solo dentro de la tarjeta del
      // día concreto (.day-card) en vez de en toda la vista activa. Las
      // llamadas de siempre (guiones de Rincón del Friki, uno por
      // vista) no pasan este parámetro y siguen funcionando igual.
      const scope = triggerEl ? triggerEl.closest('.day-card') : document.querySelector('.app-view.active');
      const panel = findGuionPanel(scope);
      if (!panel) { alert('No he encontrado el guion de esta página.'); return; }
      recordingModeRid = rid;
      // Un paso del teleprompter por CADA frase de narración (no por
      // beat completo) — así un beat con "Tesis/A favor/En contra" no
      // mezcla tres tonos distintos en una sola pantalla.
      recordingModeBeats = [];
      extractGuionBeats(panel).filter(b => b.hasNarration).forEach(b => {
        b.segments.forEach(seg => {
          recordingModeBeats.push({ heading: b.heading, text: seg.text, tone: seg.tone });
        });
      });
      if (!recordingModeBeats.length) { alert('Este guion no tiene narración "🎙️ Off" que leer.'); return; }
      recordingModeIndex = 0;
      document.getElementById('recordingModeOverlay').hidden = false;
      renderRecordingModeStep();
    }
    function closeRecordingMode(){
      document.getElementById('recordingModeOverlay').hidden = true;
    }
    // Backlog Fase 2 #193 — aquí sí importa que se note si una foto de
    // contexto falla (Wikimedia cambia de dominio, borra el archivo...):
    // el listener global de #159 la ocultaría en silencio como con
    // cualquier otra imagen decorativa del sitio, pero aquí el hueco
    // vacío puede confundir más que ayudar. Este handler específico del
    // <img> (fase de "target", se ejecuta después del listener global de
    // captura) sustituye la propia figura por un aviso claro.
    function handleContextPhotoLoadError(imgEl){
      const figure = imgEl.closest('.recording-mode-figure-item');
      if (!figure) return;
      // Backlog #160: Wikimedia sirve las mismas fotos desde dos dominios
      // reales (`thumb.wikimedia.org` y `upload.wikimedia.org`) — si uno
      // falla, un solo reintento con el otro puede salvar la foto antes
      // de rendirse y mostrar el aviso de error. `data-domain-retry` evita
      // un bucle si el reintento también falla.
      if (!imgEl.dataset.domainRetry) {
        let swapped = null;
        if (imgEl.src.includes('thumb.wikimedia.org')) swapped = imgEl.src.replace('thumb.wikimedia.org', 'upload.wikimedia.org');
        else if (imgEl.src.includes('upload.wikimedia.org')) swapped = imgEl.src.replace('upload.wikimedia.org', 'thumb.wikimedia.org');
        if (swapped) {
          imgEl.dataset.domainRetry = '1';
          imgEl.src = swapped;
          return;
        }
      }
      figure.innerHTML = '<p class="recording-mode-credit">⚠️ No se pudo cargar esta foto (puede que la URL haya cambiado)</p>';
    }
    function renderRecordingModeStep(){
      const beat = recordingModeBeats[recordingModeIndex];
      document.getElementById('recordingModeHeading').textContent = beat.heading;
      const toneEl = document.getElementById('recordingModeTone');
      if (beat.tone) { toneEl.textContent = `🎭 ${beat.tone}`; toneEl.hidden = false; }
      else { toneEl.hidden = true; }
      const figureEl = document.getElementById('recordingModeFigure');
      // Los headings reales llevan emoji + rango de tiempo ("🪝 Hook
      // (0-10s)"), así que se busca por coincidencia parcial, no exacta.
      const imagesForRid = RECORDING_MODE_IMAGES[recordingModeRid] || {};
      const imgKey = Object.keys(imagesForRid).find(k => beat.heading.includes(k));
      const entry = imgKey ? imagesForRid[imgKey] : null;
      // Un heading puede tener varios segmentos de narración a la vez
      // (p.ej. "Desarrollo" con Tesis/A favor/En contra) — si la entrada
      // es una lista de grupos con `match`, solo se muestra el grupo cuyo
      // texto de `match` aparece en la frase que se está narrando AHORA,
      // no en todo el heading entero. Si es una lista simple de fotos
      // (formato de siempre), se muestra igual en todo el heading.
      let photos = null;
      if (Array.isArray(entry)) {
        if (entry.length && entry[0] && entry[0].match) {
          const group = entry.find(g => beat.text.includes(g.match));
          photos = group ? group.photos : null;
        } else {
          photos = entry;
        }
      }
      if (photos && photos.length) {
        // `ai: true` marca una ilustración generada (Gamma), no una foto
        // real — distinción estructural, no depende de acordarme de
        // escribirlo bien en cada crédito: badge visible + borde propio.
        figureEl.innerHTML = photos.map(p => `
          <figure class="recording-mode-figure-item${p.ai ? ' is-ai' : ''}">
            ${contextImageTagHTML(p, 'recording-mode-image')}
            <figcaption class="recording-mode-credit">${p.ai ? '🎨 Ilustración con IA — ' : ''}${escapeAttr(p.credit || '')}</figcaption>
          </figure>`).join('');
        figureEl.hidden = false;
      } else {
        figureEl.innerHTML = '';
        figureEl.hidden = true;
      }
      document.getElementById('recordingModeText').textContent = beat.text;
      document.getElementById('recordingModeProgress').textContent = `${recordingModeIndex + 1} / ${recordingModeBeats.length}`;
      document.getElementById('recordingModePrev').disabled = recordingModeIndex === 0;
      document.getElementById('recordingModeNext').textContent = recordingModeIndex === recordingModeBeats.length - 1 ? '✅ Terminado' : 'Siguiente ▶';
    }
    function recordingModeStep(delta){
      if (recordingModeIndex === recordingModeBeats.length - 1 && delta > 0) { closeRecordingMode(); return; }
      recordingModeIndex = Math.max(0, Math.min(recordingModeBeats.length - 1, recordingModeIndex + delta));
      renderRecordingModeStep();
    }
    // Backlog #280 — gestos táctiles (swipe) en el modo grabación: mismo
    // resultado que los botones ◀ Anterior / Siguiente ▶ de siempre, para
    // cuando se está leyendo el teleprompter en el móvil sujeto con una
    // mano, sin soltarlo para buscar el botón. Umbral mínimo de 60px y
    // exige que el movimiento sea más horizontal que vertical, para no
    // interferir con el scroll vertical normal del overlay (guiones
    // largos ya necesitan `overflow-y:auto`, backlog #199).
    (function initRecordingModeSwipe(){
      const overlay = document.getElementById('recordingModeOverlay');
      if (!overlay) return;
      const SWIPE_THRESHOLD = 60;
      let startX = 0, startY = 0, tracking = false;
      overlay.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
      }, {passive:true});
      overlay.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
        recordingModeStep(dx < 0 ? 1 : -1); // deslizar a la izquierda = Siguiente, a la derecha = Anterior
      }, {passive:true});
    })();
    // Backlog Fase 2 #161 — QA de las fotos de contexto: comprueba que
    // cada `key` de RECORDING_MODE_IMAGES coincide con un heading real
    // de ese guion (el bug real que encontramos con `rf-fancast-wolverine`
    // — su "Desarrollo" era una lista sin narración, así que la key nunca
    // llegaba a mostrarse). Se ejecuta a mano desde la consola cuando se
    // toquen guiones o fotos: `await qaCheckContextImages()`. No corre
    // sola ni bloquea nada — es una herramienta de mantenimiento, no una
    // validación en caliente.
    async function qaCheckContextImages(){
      const activeBefore = document.querySelector('.app-view.active');
      const report = {};
      // Comprueba las claves configuradas de `rid` contra los headings
      // reales YA abiertos en el modo grabación (recordingModeBeats) —
      // compartido entre los dos tipos de guion de abajo, solo cambia
      // CÓMO se llega a abrirlo.
      function checkOpenBeats(rid){
        if (!recordingModeBeats.length) return ['No se pudo abrir el modo grabación (sin narración "🎙️ Off")'];
        const realHeadings = recordingModeBeats.map(b => b.heading);
        const problems = [];
        Object.keys(RECORDING_MODE_IMAGES[rid]).forEach(key => {
          if (!realHeadings.some(h => h.includes(key))) {
            problems.push(`La key "${key}" no coincide con ningún heading real (headings: ${realHeadings.join(' | ')})`);
          }
        });
        let anyShown = false;
        for (let i = 0; i < recordingModeBeats.length; i++) {
          recordingModeIndex = i;
          renderRecordingModeStep();
          if (!document.getElementById('recordingModeFigure').hidden) anyShown = true;
        }
        if (!anyShown) problems.push('Ninguna foto configurada llega a mostrarse en ningún paso real');
        return problems;
      }
      for (const rid of Object.keys(RECORDING_MODE_IMAGES)) {
        // Retro 365 (9 sep): estos rid ("retro-day-N") no son vistas
        // propias — viven todos dentro de view-retro-secret, con un
        // botón de Modo grabación por día. Hay que abrir esa vista y
        // pulsar el botón correcto (mismo triggerEl que usa un click
        // real), no buscar una view-retro-day-N que no existe.
        const retroMatch = rid.match(/^retro-day-(\d+)$/);
        if (retroMatch) {
          showView('retro-secret');
          document.querySelectorAll('#secretMonthsContainer details').forEach(d => { d.open = true; });
          const btn = [...document.querySelectorAll('button')]
            .find(b => b.textContent.includes('Modo grabación') && (b.getAttribute('onclick') || '').includes(`'retro-day-${retroMatch[1]}'`));
          if (!btn) { report[rid] = [`No se encontró el botón de Modo grabación del día ${retroMatch[1]} en la chuleta secreta`]; continue; }
          btn.click();
          const problems = checkOpenBeats(rid);
          if (problems.length) report[rid] = problems;
          closeRecordingMode();
          continue;
        }
        const panelView = document.getElementById(`view-${rid}`);
        if (!panelView) { report[rid] = ['La vista view-' + rid + ' no existe en el DOM']; continue; }
        showView(rid);
        openRecordingMode(rid);
        const problems = checkOpenBeats(rid);
        if (problems.length) report[rid] = problems;
        closeRecordingMode();
      }
      if (activeBefore) showView(activeBefore.id.replace('view-', ''));
      const ok = Object.keys(report).length === 0;
      console.log(ok ? `✅ QA fotos de contexto: sin problemas (${Object.keys(RECORDING_MODE_IMAGES).length} guiones revisados).` : '⚠️ QA fotos de contexto: problemas encontrados', report);
      return report;
    }
    document.addEventListener('keydown', (e) => {
      const overlay = document.getElementById('recordingModeOverlay');
      if (!overlay || overlay.hidden) return;
      if (e.key === 'Escape') closeRecordingMode();
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); recordingModeStep(1); }
      if (e.key === 'ArrowLeft') recordingModeStep(-1);
    });

    // Copia texto plano al portapapeles desde un botón — el texto va en
    // data-copy (ya escapado como atributo, el navegador lo desentraña
    // solo al leer .dataset), así evitamos meter texto libre del guion
    // dentro de un onclick="..." con comillas/backticks sin controlar.
    function copyTextToClipboard(btnEl){
      const text = btnEl.dataset.copy || '';
      const original = btnEl.textContent;
      const flash = (label) => { btnEl.textContent = label; setTimeout(() => { btnEl.textContent = original; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => flash('✅ Copiado')).catch(() => flash('No se pudo copiar'));
      } else {
        flash('No se pudo copiar');
      }
    }

    // Backlog #15/#16 — descripción de YouTube y tags sugeridos,
    // generados a partir de los datos que el guion ya tiene (título,
    // resumen, saga/tipo si existen) — nunca inventa nada que no esté
    // ya en el propio contenido.
    function humanizeTag(str){
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }
    // Backlog: el usuario pidió explícitamente ("añade a mejoras") que la
    // descripción incluyera también redes sociales, enlace a la web, e
    // info de dónde jugar el juego del vídeo cuando aplique. Los enlaces
    // de redes/web son siempre los mismos y reales (mismos que en el
    // schema.org de <head> y en Redes Sociales). El de "jugar" solo se
    // añade para contenido de HELQUIDGAMES, y apunta al hub real del
    // laboratorio de juegos — nunca a un enlace de descarga inventado,
    // porque los juegos de HELQUIDGAMES se juegan en la propia web, no
    // se descargan.
    function generateYoutubeDescription(item){
      const lines = [item.title, ''];
      if (item.summary) lines.push(item.summary, '');
      lines.push(
        '🦎 Más contenido en CHARKUMA — gaming, cultura geek y creatividad.',
        '📺 Suscríbete si te ha gustado.',
        '',
        '🌐 Web: https://gambit0-yt.github.io/charkuma/',
        '📺 YouTube: https://www.youtube.com/@mrchakurma',
        '🎵 TikTok: https://www.tiktok.com/@kiddcolors',
        '📸 Instagram: https://www.instagram.com/kiddcolors/',
        '🕹️ Twitch: https://www.twitch.tv/kiddcolors'
      );
      if (helquidGamesContent.includes(item)) {
        lines.push('🎮 Juega a los juegos de HELQUIDGAMES gratis en la web: https://gambit0-yt.github.io/charkuma/#view=helquidgames');
      }
      lines.push('');
      lines.push(suggestedTagsFor(item).map(t => '#' + t.replace(/\s+/g, '')).join(' '));
      return lines.join('\n');
    }
    const TAG_STOPWORDS = new Set(['de','la','el','en','un','una','los','las','y','o','del','al','que','con','por','para','a','tu','mi','su','no','si','sí','es','son','lo','se','más','como','sin','este','esta','entre']);
    function suggestedTagsFor(item){
      const words = `${item.title} ${item.summary || ''}`
        .toLowerCase()
        .replace(/[^a-záéíóúñü0-9\s]/gi, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !TAG_STOPWORDS.has(w));
      const freq = {};
      words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
      const topWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 6);
      const tags = new Set(['charkuma']);
      if (item.saga) tags.add(item.saga);
      if (item.type) tags.add(item.type);
      topWords.forEach(w => tags.add(w));
      return [...tags].slice(0, 10);
    }
    function youtubeMetaHTML(item, rid){
      const desc = generateYoutubeDescription(item);
      const tags = suggestedTagsFor(item);
      return `
        <details class="recording-checklist">
          <summary>📋 Descripción y tags sugeridos para YouTube</summary>
          <div class="recording-checklist-body">
            <textarea readonly rows="6" style="width:100%;background:var(--panel2);border:1px solid var(--line2);border-radius:10px;padding:10px;color:var(--text);font-size:12px;font-family:inherit;resize:vertical" onclick="this.select()">${escapeAttr(desc)}</textarea>
            <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
              <button type="button" class="btn btn-secondary" data-copy="${escapeAttr(desc)}" onclick="copyTextToClipboard(this)">📋 Copiar descripción</button>
              <button type="button" class="btn btn-secondary" data-copy="${escapeAttr(tags.map(t => '#' + t).join(' '))}" onclick="copyTextToClipboard(this)">🏷️ Copiar tags</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${tags.map(t => `<span class="type-chip chip-neutral">#${humanizeTag(t)}</span>`).join('')}
            </div>
          </div>
        </details>`;
    }

    // Backlog #12 — checklist de grabación integrada en la propia página
    // del guion (dentro de .review-controls, inyectado por
    // updateViewChrome en cada navegación — ver reviewControlsHTML).
    // Guardado por rid + índice de paso en localStorage, igual que el
    // resto del estado de revisión.
    const RECORDING_CHECKLIST_KEY = 'charkuma_recording_checklist';
    const RECORDING_CHECKLIST_ITEMS = [
      '📖 Guion revisado y ajustado a mi voz',
      '🎙️ Voz en off grabada',
      '🎥 Gameplay/clips grabado o descargado',
      '🎵 Música de fondo elegida',
      '🔊 Efectos de sonido añadidos',
      '✂️ Primer montaje hecho',
      '🖼️ Miniatura lista',
      '📝 Título y descripción escritos'
    ];
    function loadRecordingChecklistState(){
      try { return JSON.parse(localStorage.getItem(RECORDING_CHECKLIST_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveRecordingChecklistState(state){
      try { localStorage.setItem(RECORDING_CHECKLIST_KEY, JSON.stringify(state)); }
      catch (e) { /* seguimos sin guardar, sin romper nada */ }
    }
    function toggleRecordingChecklistItem(rid, idx){
      const state = loadRecordingChecklistState();
      if (!state[rid]) state[rid] = {};
      state[rid][idx] = !state[rid][idx];
      saveRecordingChecklistState(state);
      refreshReviewControls();
    }
    function recordingChecklistHTML(rid){
      const state = loadRecordingChecklistState()[rid] || {};
      const doneCount = RECORDING_CHECKLIST_ITEMS.filter((_, i) => state[i]).length;
      const items = RECORDING_CHECKLIST_ITEMS.map((label, i) => `
        <label class="recording-checklist-item${state[i] ? ' is-done' : ''}">
          <input type="checkbox" ${state[i] ? 'checked' : ''} onchange="toggleRecordingChecklistItem('${rid}', ${i})">
          ${label}
        </label>`).join('');
      return `
        <details class="recording-checklist">
          <summary>🎬 Checklist de grabación <span class="rc-progress">${doneCount}/${RECORDING_CHECKLIST_ITEMS.length}</span></summary>
          <div class="recording-checklist-body">${items}</div>
        </details>`;
    }

    // Backlog Fase 2 #156 — mini vista de las fotos de contexto de un
    // guion directamente en su propia página, sin tener que entrar en
    // el modo grabación completo solo para verlas. Aplana todos los
    // formatos posibles de RECORDING_MODE_IMAGES (lista simple de fotos,
    // o lista de grupos con `match`) y quita duplicados por URL, ya que
    // varios beats pueden reutilizar la misma foto (p.ej. Ryan Gosling
    // en Hook y también en el cruce de Doomsday).
    // Backlog Fase 2 #164 — WebP con respaldo JPEG, ahora que hay Node/npm
    // disponible (antes aparcado: este sistema no tenía ningún
    // codificador WebP instalado). Solo aplica a las imágenes propias
    // del repo (`context-img/*.jpg`, las 3 generadas con Gamma) — las
    // fotos reales de Wikimedia son URLs externas que no controlamos,
    // se quedan como estaban. Un <picture> con <source webp> + <img jpg>
    // deja que el navegador elija solo, sin romper nada si algún
    // navegador no soporta WebP.
    function contextImageTagHTML(p, imgClass, imgStyle){
      const isLocalJpg = /^context-img\/.+\.jpg$/i.test(p.url);
      const imgTag = `<img class="${imgClass || ''}" src="${escapeAttr(p.url)}" alt="${escapeAttr(p.alt || '')}"${imgStyle ? ` style="${imgStyle}"` : ''} onerror="handleContextPhotoLoadError ? handleContextPhotoLoadError(this) : null">`;
      if (!isLocalJpg) return imgTag;
      const webpUrl = p.url.replace(/\.jpg$/i, '.webp');
      return `<picture><source srcset="${escapeAttr(webpUrl)}" type="image/webp">${imgTag}</picture>`;
    }
    function flattenContextPhotos(rid){
      const entries = RECORDING_MODE_IMAGES[rid];
      if (!entries) return [];
      const all = [];
      Object.values(entries).forEach(entry => {
        if (!Array.isArray(entry)) return;
        if (entry.length && entry[0] && entry[0].match) {
          entry.forEach(g => all.push(...(g.photos || [])));
        } else {
          all.push(...entry);
        }
      });
      const seen = new Set();
      return all.filter(p => {
        if (seen.has(p.url)) return false;
        seen.add(p.url);
        return true;
      });
    }
    // Backlog #194 — tener a mano todas las fotos de contexto de un
    // guion al editar el vídeo, sin tener que guardarlas una a una a
    // mano desde el modo grabación. Descarga real (fetch + blob, no un
    // simple <a href> que con imágenes de otro dominio solo las abre
    // en pestaña nueva en vez de descargarlas) — una detrás de otra con
    // una pequeña pausa para que el navegador no las bloquee por venir
    // todas de golpe.
    async function downloadAllContextPhotos(rid){
      const photos = flattenContextPhotos(rid);
      if (!photos.length) { alert('Este guion no tiene fotos de contexto configuradas todavía.'); return; }
      let ok = 0, fail = 0;
      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        try {
          const res = await fetch(p.url);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const blob = await res.blob();
          const ext = (blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg').split('+')[0];
          const safeName = (p.alt || `foto-${i + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          const objUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = objUrl;
          a.download = `${rid}-${i + 1}-${safeName}.${ext}`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(objUrl), 4000);
          ok++;
        } catch (e) {
          console.warn('No se pudo descargar esta foto de contexto:', p.url, e);
          fail++;
        }
        if (i < photos.length - 1) await new Promise(r => setTimeout(r, 350));
      }
      if (fail) alert(`Descargadas ${ok} de ${photos.length} fotos — ${fail} no se pudieron descargar (revisa la consola).`);
    }
    // Backlog #157 — créditos fotográficos consolidados, en la página
    // "Detrás de cámaras". Recorre TODOS los rid de RECORDING_MODE_IMAGES
    // (Rincón del Friki + Retro 365) y agrupa por URL real — si la misma
    // foto se reutiliza en varios guiones (pasa con algunos actores),
    // sale una sola vez con la lista de dónde aparece, no repetida.
    // Nunca una lista mantenida a mano aparte: sale siempre de los
    // mismos datos reales que ya usa el modo grabación.
    function renderPhotoCreditsPage(){
      const summaryEl = document.getElementById('photoCreditsSummary');
      const listEl = document.getElementById('photoCreditsList');
      if (!summaryEl || !listEl) return;
      const byUrl = new Map();
      Object.keys(RECORDING_MODE_IMAGES).forEach(rid => {
        flattenContextPhotos(rid).forEach(p => {
          if (!byUrl.has(p.url)) byUrl.set(p.url, { ...p, rids: [] });
          byUrl.get(p.url).rids.push(rid);
        });
      });
      const all = [...byUrl.values()];
      const real = all.filter(p => !p.ai);
      const ai = all.filter(p => p.ai);
      summaryEl.textContent = `${all.length} fotos de contexto en total — ${real.length} reales con licencia verificada, ${ai.length} ilustraciones con IA (sin licencia externa, prompt propio).`;
      const cardHTML = p => `
        <div class="note" style="margin:0;display:flex;gap:10px;align-items:flex-start">
          ${contextImageTagHTML(p, '', `width:64px;height:64px;object-fit:cover;border-radius:8px;flex:none;border:1px solid var(--line2)${p.ai ? ';border-style:dashed' : ''}`)}
          <div style="min-width:0">
            <p style="margin:0;font-size:12px;line-height:1.4">${p.ai ? '🎨 ' : ''}${escapeAttr(p.credit || '')}</p>
            <p style="margin:4px 0 0;font-size:10.5px;color:var(--muted)">Usada en ${p.rids.length} guion${p.rids.length === 1 ? '' : 'es'}</p>
          </div>
        </div>`;
      listEl.innerHTML = all.map(cardHTML).join('');
    }
    function contextPhotosPreviewHTML(rid){
      const photos = flattenContextPhotos(rid);
      if (!photos.length) return '';
      return `
        <details class="recording-checklist">
          <summary>🖼️ Ver fotos de contexto de este guion (${photos.length})</summary>
          <div class="recording-checklist-body" style="display:flex;flex-wrap:wrap;gap:12px">
            ${photos.map(p => `
              <figure style="margin:0;width:110px;text-align:center">
                ${contextImageTagHTML(p, '', `width:100%;height:110px;object-fit:cover;border-radius:10px;border:1px solid var(--line2)${p.ai ? ';border-style:dashed' : ''}`)}
                <figcaption style="font-size:10.5px;color:var(--muted);margin-top:4px;line-height:1.3">${p.ai ? '🎨 ' : ''}${escapeAttr(p.credit || '')}</figcaption>
              </figure>`).join('')}
          </div>
        </details>`;
    }
    function reviewControlsHTML(item){
      const rid = item.internalView || item.title;
      const status = getContentStatus(item, rid);
      const published = status === 'publicado';
      const stageIndex = CONTENT_STAGE_ORDER.indexOf(status);
      const inProgress = stageIndex !== -1 || published;
      const discarded = status === 'descartado';
      const approved = status === 'aprobado' || inProgress; // fase/publicado implican ya aprobado
      const statusChip = `<span class="type-chip ${CONTENT_STATUS_CHIPCLASS[status]}">${CONTENT_STATUS_LABELS[status]}</span>`;
      const isLastStage = stageIndex === CONTENT_STAGE_ORDER.length - 1;
      // La checklist solo tiene sentido una vez aprobado (hay guion de
      // verdad detrás) y hasta que se publique (después ya no aporta).
      const showChecklist = approved && !published;
      // Backlog #158 — quién sale de verdad en este guion (personas
      // reales con foto ya verificada), visible de un vistazo en vez de
      // tener que abrir el modo grabación para saberlo.
      const realPeopleHTML = (item.realPeople && item.realPeople.length)
        ? `<span class="type-chip chip-neutral" title="Personas reales con foto verificada en este guion">🎭 ${item.realPeople.map(escapeAttr).join(', ')}</span>`
        : '';
      // Backlog: una vez publicado de verdad (con la doble confirmación
      // de toggleContentPublished), el resto de botones de gestión ya no
      // aportan nada — el proyecto está terminado. Se deja solo el
      // estado, el botón para deshacerlo por si acaso, y el historial;
      // nada de aprobar/fase/descartar/siguiente.
      if (published) {
        return `
          <div class="review-controls" data-review-id="${rid}">
            ${statusChip}
            ${realPeopleHTML}
            ${recentlyUpdatedBadgeHTML(rid)}
            <button type="button" class="btn btn-secondary review-published-btn" onclick="toggleContentPublished('${rid}')">
              ↩️ Quitar "publicado"
            </button>
            ${contentHistoryHTML(rid)}
          </div>`;
      }
      return `
        <div class="review-controls" data-review-id="${rid}">
          ${statusChip}
          ${realPeopleHTML}
          ${recentlyUpdatedBadgeHTML(rid)}
          <button type="button" class="btn btn-secondary review-approve-btn" onclick="toggleContentApproved('${rid}')">
            ${approved ? '↩️ Quitar aprobación' : '✅ Aprobar'}
          </button>
          <button type="button" class="btn btn-secondary review-stage-btn" onclick="regressContentStage('${rid}')" ${stageIndex <= 0 ? 'disabled' : ''}>
            ◀ Fase anterior
          </button>
          <button type="button" class="btn btn-secondary review-stage-btn" onclick="advanceContentStage('${rid}')" ${isLastStage ? 'disabled' : ''}>
            ${stageIndex === -1 ? '✍️ Empezar guion' : 'Fase siguiente ▶'}
          </button>
          <button type="button" class="btn btn-secondary review-published-btn" onclick="toggleContentPublished('${rid}')">
            📤 Marcar como publicado
          </button>
          <button type="button" class="btn btn-secondary review-discard-btn" onclick="toggleContentDiscarded('${rid}')">
            ${discarded ? '↩️ Restaurar' : '🗑️ Descartar idea'}
          </button>
          <button type="button" class="btn btn-primary review-next-btn" onclick="goToNextUntouchedContent('${rid}')" title="Saltar al siguiente elemento al que todavía no le has tocado el estado">
            → Siguiente
          </button>
          ${approved ? priorityControlHTML(rid) : ''}
          ${approved ? costControlHTML(rid) : ''}
          ${showChecklist ? `<button type="button" class="btn btn-secondary" onclick="openRecordingMode('${rid}')">🖥️ Modo grabación</button>` : ''}
          ${showChecklist ? `<button type="button" class="btn btn-secondary" onclick="openShortVersionModal('${rid}')" title="Recorte automático: Hook + Giro + CTA, sin reescribir nada">🎬 Versión corta (Shorts)</button>` : ''}
          ${showChecklist ? `<button type="button" class="btn btn-secondary" onclick="openShortVersionModal('${rid}', 'un-dato')" title="Recorte automático de un único dato (Contexto), sin reescribir nada">⚡ Un dato, un minuto</button>` : ''}
          ${showChecklist ? `<button type="button" class="btn btn-secondary" onclick="window.print()" title="Copia en papel del guion, sin controles ni columnas laterales">🖨️ Imprimir guion</button>` : ''}
          ${showChecklist && flattenContextPhotos(rid).length ? `<button type="button" class="btn btn-secondary" onclick="downloadAllContextPhotos('${rid}')" title="Descarga todas las fotos de contexto de este guion, una a una">⬇️ Descargar fotos (${flattenContextPhotos(rid).length})</button>` : ''}
          ${showChecklist ? contextPhotosPreviewHTML(rid) : ''}
          ${showChecklist ? recordingChecklistHTML(rid) : ''}
          ${showChecklist ? youtubeMetaHTML(item, rid) : ''}
          ${contentHistoryHTML(rid)}
        </div>`;
    }

    // Botón "→ Siguiente" de los controles: te lleva directo al próximo
    // elemento (proyecto o idea suelta) al que TODAVÍA no le has tocado
    // el estado — para poder ir aprobando/descartando uno detrás de
    // otro sin volver cada vez al control secreto maestro. Solo cuentan
    // "pendiente" y "aprobado" como "sin tocar" — cualquier fase ya
    // significa que has empezado a trabajar en ese contenido.
    function goToNextUntouchedContent(currentRid){
      const all = buildMasterControlIndex();
      const priorities = ['pendiente', 'aprobado'];
      for (const status of priorities) {
        const next = all.find(i => i.status === status && i.view && i.view !== currentRid && i.title !== currentRid);
        if (next) {
          if (next.external) { window.open(next.view, '_blank'); return; }
          // /loop V4 (15 sep): este panel ahora vive solo en Control
          // Maestro (ver openMasterControlManagePanel) — "Siguiente" ya
          // no navega a la página pública del contenido (ahí no queda
          // ningún botón), abre directamente el panel del próximo ítem
          // sin tocar, en el mismo sitio donde ya estás.
          if (typeof openMasterControlManagePanel === 'function' && document.getElementById('view-master-control')?.classList.contains('active')) {
            openMasterControlManagePanel(next.view, true);
          } else {
            sessionStorage.setItem('mcExpandRid', next.view);
            showView('master-control');
          }
          return;
        }
      }
      // No queda nada sin tocar: no hay a dónde saltar, así que al menos
      // dejamos el estado recién cambiado bien pintado en la vista actual
      // en vez de quedarnos con los botones desactualizados.
      refreshReviewControls();
      alert('No queda ningún elemento sin tocar — todo tiene ya un estado definido (o está descartado).');
    }

    // Backlog #19 — historial de revisiones por elemento: cada cambio de
    // estado real (aprobar, fase, publicar, descartar) queda anotado
    // con fecha, para poder ver después cómo avanzó un guion concreto.
    const CONTENT_HISTORY_KEY = 'charkuma_content_history';
    function loadContentHistory(){
      try { return JSON.parse(localStorage.getItem(CONTENT_HISTORY_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveContentHistory(h){
      try { localStorage.setItem(CONTENT_HISTORY_KEY, JSON.stringify(h)); }
      catch (e) { /* seguimos sin guardar, sin romper nada */ }
    }
    function logContentHistory(rid, text){
      const h = loadContentHistory();
      if (!h[rid]) h[rid] = [];
      h[rid].push({ ts: Date.now(), text });
      saveContentHistory(h);
    }
    // Backlog #71 — indicador de "recién actualizado" (24h): se apoya en
    // el mismo historial de #19, sin ningún dato nuevo — si la última
    // entrada del historial de este elemento es de hace menos de un
    // día, se muestra una insignia junto al estado.
    const RECENTLY_UPDATED_MS = 24 * 60 * 60 * 1000;
    function recentlyUpdatedBadgeHTML(rid){
      const entries = loadContentHistory()[rid] || [];
      if (!entries.length) return '';
      const lastTs = entries[entries.length - 1].ts;
      if (Date.now() - lastTs > RECENTLY_UPDATED_MS) return '';
      return `<span class="type-chip chip-green" title="Cambió de estado hace menos de 24h">🆕 Recién actualizado</span>`;
    }

    // Backlog #299 — "guiones que edité hoy": mismo historial real de
    // #19/#71 (`charkuma_content_history`, con marca de tiempo), pero
    // comparando el DÍA de calendario en vez de "últimas 24h" (que #71
    // ya cubre) — así "hoy" significa hoy de verdad, no "en la última
    // vuelta del reloj". Si no hay ninguna entrada de hoy, la sección se
    // oculta sola en vez de enseñar una lista vacía.
    function renderTodayEditsSection(){
      const heading = document.getElementById('hubTodayEditsHeading');
      const list = document.getElementById('hubTodayEditsList');
      if (!heading || !list) return;
      const history = loadContentHistory();
      const todayStr = new Date().toDateString();
      const index = buildSiteIndex();
      const items = Object.keys(history)
        .filter(rid => history[rid].some(e => new Date(e.ts).toDateString() === todayStr))
        .map(rid => index.find(i => i.view === rid))
        .filter(Boolean);
      heading.hidden = !items.length;
      list.hidden = !items.length;
      if (items.length) list.innerHTML = items.map(searchResultCardHTML).join('');
    }

    // Backlog #292 — "fijar" el guion que se está grabando hoy en la
    // barra superior: mismo criterio de "hoy" que #299 (día de calendario
    // real, nunca una ventana móvil de 24h), pero restringido a
    // contenido realmente "en proceso" (creando-guion/editando-video/
    // remates-finales/listo-publicar) — un guion ya aprobado sin tocar o
    // ya publicado no cuenta como "se está grabando ahora mismo". Si hay
    // varios tocados hoy, se fija solo el más reciente (nunca una lista).
    function getTodayPinnedContent(){
      const history = loadContentHistory();
      const todayStr = new Date().toDateString();
      const index = buildSiteIndex();
      let best = null, bestTs = -1;
      Object.keys(history).forEach(rid => {
        const todaysEntries = history[rid].filter(e => new Date(e.ts).toDateString() === todayStr);
        if (!todaysEntries.length) return;
        const item = index.find(i => i.view === rid);
        if (!item || !CONTENT_STAGE_ORDER.includes(item.status)) return;
        const lastTs = todaysEntries[todaysEntries.length - 1].ts;
        if (lastTs > bestTs) { bestTs = lastTs; best = item; }
      });
      return best;
    }
    // Backlog #295 — tooltip solo la primera vez que se entra a una vista
    // nueva, nunca repetido. A propósito NO se aplica a las 46 vistas del
    // sitio (la mayoría son guiones/proyectos autoexplicativos con su
    // propio título y resumen) — solo a las herramientas de gestión reales
    // donde un primer vistazo puede no dejar claro qué hacer. Se marca
    // "visto" en cuanto aparece (no solo al pulsar "Entendido"): "nunca
    // repetido" significa eso, no "hasta que lo cierres a mano".
    const FIRST_TIME_HINT_SEEN_KEY = 'charkuma_hint_seen_views';
    function loadHintSeenViews(){
      try { return new Set(JSON.parse(localStorage.getItem(FIRST_TIME_HINT_SEEN_KEY)) || []); }
      catch (e) { return new Set(); }
    }
    function markHintSeen(viewId){
      const seen = loadHintSeenViews();
      seen.add(viewId);
      try { localStorage.setItem(FIRST_TIME_HINT_SEEN_KEY, JSON.stringify([...seen])); } catch (e) {}
    }
    const FIRST_TIME_HINTS = {
      'guiones-bandeja': '💡 Aquí ves los guiones ya aprobados y listos para grabar, ordenados por urgencia real (fecha límite primero, si la tienen). Pulsa "▶️ Empezar a grabar" cuando arranques la voz en off de uno.',
      'master-control': '💡 Aquí está TODO el contenido del sitio con su estado real — busca, filtra y cambia de fase desde una sola lista, en vez de entrar guion a guion.',
      'idea-swipe': '💡 Desliza (o usa los botones) para decidir rápido: ✅ para quedártela, 🗑️ para descartarla — funciona sobre cualquiera de los 6 bancos de ideas.',
    };
    function maybeShowFirstTimeHint(viewId, pageHead){
      const hintText = FIRST_TIME_HINTS[viewId];
      const existing = pageHead && pageHead.querySelector('.first-time-hint');
      if (existing) existing.remove();
      if (!hintText || !pageHead) return;
      if (loadHintSeenViews().has(viewId)) return;
      const el = document.createElement('div');
      el.className = 'first-time-hint';
      el.innerHTML = `<span>${hintText}</span><button type="button" class="btn btn-secondary" onclick="this.closest('.first-time-hint').remove()">Entendido</button>`;
      pageHead.appendChild(el);
      markHintSeen(viewId);
    }

    function updatePinnedGuion(activeViewId){
      const pill = document.getElementById('navPinnedGuion');
      if (!pill) return;
      const item = getTodayPinnedContent();
      // Oculto también si ya estás justo en esa vista — fijar un acceso
      // a donde ya estás no aporta nada, mismo criterio que #263/#264.
      if (!item || item.view === activeViewId) { pill.hidden = true; return; }
      pill.textContent = `📌 ${item.title}`;
      pill.title = `Grabando hoy: ${item.title}`;
      pill.onclick = () => showView(item.view);
      pill.hidden = false;
    }

    // Backlog #101 — archivo de publicados filtrable por año/mes: usa la
    // fecha REAL en la que algo se marcó "📤 Marcado como publicado" en
    // el historial de #19 (la última vez, por si se quitó y se puso otra
    // vez), no `item.date` — esa suele ser la fecha de creación de la
    // idea, no la de publicación real.
    function getPublishedDate(rid){
      const entries = loadContentHistory()[rid] || [];
      const publishEntries = entries.filter(e => e.text === '📤 Marcado como publicado');
      if (!publishEntries.length) return null;
      return publishEntries[publishEntries.length - 1].ts;
    }

    function contentHistoryHTML(rid){
      const entries = (loadContentHistory()[rid] || []).slice().reverse();
      if (!entries.length) return '';
      const rows = entries.map(e => {
        const when = new Date(e.ts).toLocaleString('es-ES', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
        return `<li><span class="yt-empty" style="display:inline">${when}</span> — ${escapeAttr(e.text)}</li>`;
      }).join('');
      return `
        <details class="recording-checklist">
          <summary>🕘 Historial de revisiones <span class="rc-progress">${entries.length}</span></summary>
          <ul style="margin:10px 0 0;padding-left:18px;font-size:12px;color:var(--text);line-height:1.7">${rows}</ul>
        </details>`;
    }

    function toggleContentApproved(rid){
      if (isReviewed(rid)) {
        // "Quitar aprobación": no hay un unmarkReviewed ya hecho — lo
        // montamos aquí mismo, reutilizando el mismo Set. Si tenía una
        // fase o estaba publicado, quitar la aprobación también retrocede.
        const set = loadReviewedSet();
        set.delete(rid);
        try { localStorage.setItem(REVIEWED_KEY, JSON.stringify(Array.from(set))); } catch(e) {}
        setContentStage(rid, null);
        setContentPublished(rid, false);
        logContentHistory(rid, '↩️ Aprobación retirada');
        refreshReviewControls();
      } else {
        // Aprobar es una decisión de revisión (como descartar) — salta
        // directamente a la siguiente idea sin tocar, en vez de dejarte
        // en la misma página esperando a que pulses "→ Siguiente" a mano.
        markReviewed(rid);
        clearScheduledDate(rid); // ya no cuenta como "pendiente sin hacer" en el calendario
        logContentHistory(rid, '✅ Aprobado');
        goToNextUntouchedContent(rid);
      }
    }
    function toggleContentPublished(rid){
      const turningOn = !isContentPublished(rid);
      // Backlog: confirmación antes de marcar como publicado — es un
      // paso "de verdad terminado", así que pide reconfirmar en vez de
      // que un clic de más lo marque sin querer. Al quitarlo no hace
      // falta confirmar (deshacer es inofensivo).
      if (turningOn && !confirm('¿Seguro de que este vídeo/proyecto está terminado y publicado de verdad?')) {
        return;
      }
      setContentPublished(rid, turningOn);
      // La fecha que se ve en las tarjetas pasa a ser la de AHORA (el
      // momento real de terminarlo), no la fecha en la que se apuntó la
      // idea originalmente. Al quitar "publicado" se borra y vuelve a
      // mostrarse la fecha original.
      setContentPublishedDate(rid, turningOn ? new Date().toISOString() : null);
      // "Publicado" implica los pasos anteriores: si hacía falta,
      // aprueba y deja la fase en la última ("listo para publicar") en
      // vez de sin fase, para que al "quitar publicado" no vuelva a cero.
      if (turningOn) {
        if (!isReviewed(rid)) markReviewed(rid);
        if (!getContentStage(rid)) setContentStage(rid, CONTENT_STAGE_ORDER[CONTENT_STAGE_ORDER.length - 1]);
      }
      logContentHistory(rid, turningOn ? '📤 Marcado como publicado' : '↩️ "Publicado" retirado');
      refreshReviewControls();
    }
    // Avanza una fase (creando guion → editando vídeo → remates finales
    // → listo para publicar). Si todavía no había empezado ninguna,
    // aprueba automáticamente y arranca en la primera fase.
    function advanceContentStage(rid){
      const current = getContentStage(rid);
      if (!current) {
        if (!isReviewed(rid)) markReviewed(rid);
        setContentStage(rid, CONTENT_STAGE_ORDER[0]);
        logContentHistory(rid, `▶️ Fase: ${CONTENT_STAGE_LABELS[CONTENT_STAGE_ORDER[0]]}`);
      } else {
        const idx = CONTENT_STAGE_ORDER.indexOf(current);
        if (idx < CONTENT_STAGE_ORDER.length - 1) {
          const next = CONTENT_STAGE_ORDER[idx + 1];
          setContentStage(rid, next);
          logContentHistory(rid, `▶️ Fase: ${CONTENT_STAGE_LABELS[next]}`);
        }
      }
      refreshReviewControls();
    }
    // Retrocede una fase; desde la primera fase vuelve a "aprobado" sin fase.
    function regressContentStage(rid){
      const current = getContentStage(rid);
      if (!current) return;
      const idx = CONTENT_STAGE_ORDER.indexOf(current);
      if (idx <= 0) {
        setContentStage(rid, null);
        logContentHistory(rid, '◀ Fase anterior: aprobado (sin fase)');
      } else {
        const prev = CONTENT_STAGE_ORDER[idx - 1];
        setContentStage(rid, prev);
        logContentHistory(rid, `◀ Fase anterior: ${CONTENT_STAGE_LABELS[prev]}`);
      }
      refreshReviewControls();
    }
    function toggleContentDiscarded(rid){
      const discarding = !isContentDiscarded(rid);
      setContentDiscarded(rid, discarding);
      logContentHistory(rid, discarding ? '🗑️ Descartado' : '↩️ Restaurado');
      // Descartar es una decisión de revisión: salta directo a la
      // siguiente idea sin tocar. Restaurar es una corrección, no un
      // avance — ahí nos quedamos donde estamos.
      if (discarding) { clearScheduledDate(rid); goToNextUntouchedContent(rid); }
      else refreshReviewControls();
    }
    // Vuelve a pintar el bloque de controles de la vista activa (y quita
    // las insignias pequeñas del kicker si ya no hacen falta).
    function refreshReviewControls(){
      const active = document.querySelector('.app-view.active');
      if (active) {
        updateViewChrome(active.id.replace(/^view-/, ''), active);
        hideAlreadyReviewedBadges();
      }
      // Backlog #42 — todas las acciones de revisión (aprobar, fase,
      // publicar, descartar, prioridad, coste) terminan llamando aquí:
      // es el único sitio que hace falta enganchar para sincronizar todo
      // ese estado con Firestore, sin tocar cada función suelta.
      if (!applyingRemoteContentReviewUpdate && typeof pushContentReviewState === 'function') pushContentReviewState();
    }

    // Backlog #42 — migrar a Firestore el estado de revisión: aprobado,
    // fase de producción, publicado, descartado, prioridad, coste
    // estimado, historial (#19) y la checklist de grabación (#12).
    // Mismo patrón "un documento, el último que escribe gana" que el
    // resto de la web. Enganchado en refreshReviewControls() (arriba)
    // porque TODAS las acciones de revisión terminan llamando ahí.
    let applyingRemoteContentReviewUpdate = false;
    function pushContentReviewState(){
      if (!firestoreReady()) return;
      const { doc, setDoc } = window.firestoreFns;
      const data = {
        reviewed: Array.from(loadReviewedSet()),
        discarded: Array.from(loadDiscardedContentSet()),
        stages: loadContentStageMap(),
        published: Array.from(loadPublishedContentSet()),
        priority: loadContentPriorityMap(),
        cost: loadContentCostMap(),
        history: loadContentHistory(),
        checklist: loadRecordingChecklistState(),
        updatedAt: Date.now()
      };
      setDoc(doc(window.firestoreDB, 'contentReview', 'state'), data).catch(() => {
        // Sin conexión ahora mismo: se queda en local, sin cola de reintentos.
      });
    }

    let contentReviewRealtimeStarted = false;
    async function initContentReviewRealtime(){
      if (!firestoreReady() || contentReviewRealtimeStarted) return;
      contentReviewRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'contentReview', 'state');
      onSnapshot(ref, (snap) => {
        if (!snap.exists()) { pushContentReviewState(); return; }
        const data = snap.data() || {};
        applyingRemoteContentReviewUpdate = true;
        try {
          if (Array.isArray(data.reviewed)) localStorage.setItem(REVIEWED_KEY, JSON.stringify(data.reviewed));
          if (Array.isArray(data.discarded)) localStorage.setItem(DISCARDED_CONTENT_KEY, JSON.stringify(data.discarded));
          if (data.stages && typeof data.stages === 'object') localStorage.setItem(CONTENT_STAGE_KEY, JSON.stringify(data.stages));
          if (Array.isArray(data.published)) localStorage.setItem(PUBLISHED_CONTENT_KEY, JSON.stringify(data.published));
          if (data.priority && typeof data.priority === 'object') localStorage.setItem(CONTENT_PRIORITY_KEY, JSON.stringify(data.priority));
          if (data.cost && typeof data.cost === 'object') localStorage.setItem(CONTENT_COST_KEY, JSON.stringify(data.cost));
          if (data.history && typeof data.history === 'object') localStorage.setItem(CONTENT_HISTORY_KEY, JSON.stringify(data.history));
          if (data.checklist && typeof data.checklist === 'object') localStorage.setItem(RECORDING_CHECKLIST_KEY, JSON.stringify(data.checklist));
          refreshReviewControls();
          if (typeof renderMasterControlList === 'function') renderMasterControlList();
        } catch (e) { /* localStorage no disponible: seguimos sin aplicarlo local */ }
        applyingRemoteContentReviewUpdate = false;
      }, () => {
        // onSnapshot en modo error (reglas, red...) — seguimos en local.
      });
    }

    // Insignia reutilizable: marca contenido generado por Claude que el
    // usuario todavía no ha revisado a mano. Pon reviewed:false en cualquier
    // entrada de cualquier array de contenido para que aparezca aquí.
    // /loop V4 (15 sep): este badge vivía visible y clicable en cualquier
    // tarjeta pública (Explorar universo, listados de sección...) — un
    // visitante cualquiera podía marcar contenido como "revisado", no
    // solo Iván. Movido a Control Maestro (botón "✅ Marcar revisado",
    // ver markReviewedFromMasterControl) — esta función ya no pinta nada
    // en las tarjetas públicas, se deja solo por si algún día hace falta
    // reactivarla en un contexto no público.
    function reviewBadgeHTML(item){
      return '';
    }

    function geekCardHTML(item){
      const displayDate = contentDisplayDate(item);
      const date = displayDate ? new Date(displayDate).toLocaleDateString('es-ES', {day:'numeric', month:'short'}) : '';
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
          // Backlog #313bis (investigación SEO 10 sep, pedido de Iván):
          // un guion descartado también deja de aparecer en la lista
          // pública de Rincón del Friki — no solo en Control Maestro.
          // Es reversible: quitar el descarte desde Control Maestro lo
          // vuelve a mostrar. La vista del guion en sí NO se toca (sigue
          // accesible por URL directa), solo se saca de la parrilla.
          if (isContentDiscarded(item.internalView || item.title)) return false;
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
    // RANKING FRIKI: minijuego de votos por personaje. Los números de
    // salida son una estimación mía orientativa de fama general (no
    // existe un dato público de "visitas históricas totales en Google"
    // al que se pueda acceder de verdad) — sirven solo para tener un
    // orden inicial razonable antes de que lleguen votos reales.
    // Guardado en localStorage: por navegador, no compartido entre
    // visitantes (ver nota en la propia página).
    // ──────────────────────────────────────────────────────────
    const RANKING_KEY = 'charkuma_anime_ranking';
    const RANKING_SEED = {
      "Goku": 98, "Pikachu": 96, "Naruto Uzumaki": 95, "Batman": 92,
      "Spider-Man": 93, "Iron Man": 91, "Luffy": 90, "Homer Simpson": 88,
      "Wolverine": 86, "Vegeta": 87, "Deadpool": 85, "Gojo Satoru": 83,
      "Tanjiro Kamado": 82, "Eren Yeager": 81, "Saitama": 80,
      "Light Yagami": 79, "Levi Ackerman": 78, "Homelander": 75,
      "Master Chief": 70, "Starlight": 62
    };

    function loadRanking(){
      try {
        const saved = JSON.parse(localStorage.getItem(RANKING_KEY));
        if (saved && typeof saved === 'object') return Object.assign({}, RANKING_SEED, saved);
      } catch(e) { /* usamos solo la semilla */ }
      return Object.assign({}, RANKING_SEED);
    }
    function saveRanking(ranking){
      try { localStorage.setItem(RANKING_KEY, JSON.stringify(ranking)); }
      catch(e) { /* seguimos sin persistir */ }
      if (!applyingRemoteRankingScheduleUpdate && typeof pushRankingScheduleState === 'function') pushRankingScheduleState();
    }

    // Escapa texto para meterlo dentro de un atributo HTML entre
    // comillas dobles (distinto de escapeHTML, que solo vale para texto
    // suelto: un nombre de personaje con comillas dentro rompería el
    // atributo si no se escapa también " y &).
    function escapeAttr(str){
      return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderRankingTop8(){
      const container = document.getElementById('rankingTop8');
      if (!container) return;
      const ranking = loadRanking();
      const top8 = Object.entries(ranking)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
      container.innerHTML = top8.map(([name, score], i) => `
        <div class="ranking-row">
          <div class="ranking-rank">${i + 1}</div>
          <div class="ranking-name">${escapeHTML(name)}</div>
          <span class="ranking-score">${score} pts</span>
          <button type="button" class="ranking-vote-btn" data-char="${escapeAttr(name)}" onclick="voteRankingCharacter(this.dataset.char)" aria-label="Votar por ${escapeAttr(name)}" title="Votar por ${escapeAttr(name)}">👍</button>
        </div>`).join('');
    }

    function voteRankingCharacter(name){
      const ranking = loadRanking();
      if (!(name in ranking)) return;
      ranking[name] += 1;
      saveRanking(ranking);
      renderRankingTop8();
    }

    function addRankingCharacter(){
      const input = document.getElementById('rankingNewCharacter');
      const name = input.value.trim();
      if (!name) return;
      const ranking = loadRanking();
      // Si ya existe (comparando sin mayúsculas), le suma un voto en vez
      // de crear un duplicado.
      const existingKey = Object.keys(ranking).find(k => k.toLowerCase() === name.toLowerCase());
      if (existingKey) ranking[existingKey] += 1;
      else ranking[name] = 1;
      saveRanking(ranking);
      input.value = '';
      renderRankingTop8();
    }
    const rankingInput = document.getElementById('rankingNewCharacter');
    if (rankingInput) {
      rankingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addRankingCharacter();
      });
    }
    renderRankingTop8();

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
      geek: '🎬 Cine geek',
      dc: '🦇 DC',
      dragonball: '🐉 Dragon Ball',
      directores: '🎥 Directores'
    };
