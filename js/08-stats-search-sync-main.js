    // ══════════ 08-stats-search-sync-main.js ══════════
    // Logros y estadísticas del Panel, buscador global del sitio, sincronización con Firestore, y el resto de funciones de arranque/varios que no encajaban en los bloques anteriores.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    function renderAchievements(){
      const container = document.getElementById('achievementsGrid');
      if (!container) return;
      container.innerHTML = computeAchievements().map(a => `
        <div class="achievement-badge${a.unlocked ? ' unlocked' : ''}">
          <span class="achievement-icon">${a.icon}</span>
          <span class="achievement-label">${a.label}</span>
        </div>`).join('');
    }

    // Backlog #218 (9 sep) — cuenta los guiones reales de Rincón del
    // Friki cuya `date` (fecha de creación/anuncio) cae en los últimos
    // 7 días, agrupados por `saga`. Usa `date`, no `deadline` (#302) —
    // son dos cosas distintas: cuándo se ESCRIBIÓ vs cuándo hay que
    // PUBLICARLO como muy tarde.
    function renderGuionesEstaSemanaStat(){
      const el = document.getElementById('guionesEstaSemanaStat');
      if (!el) return;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recent = geekContent.filter(item => item.date && new Date(item.date + 'T00:00:00') >= sevenDaysAgo);
      if (!recent.length) { el.textContent = 'Ningún guion nuevo de Rincón del Friki en los últimos 7 días.'; return; }
      const bySaga = {};
      recent.forEach(item => { const s = item.saga || 'sin saga'; bySaga[s] = (bySaga[s] || 0) + 1; });
      const parts = Object.keys(bySaga)
        .sort((a, b) => bySaga[b] - bySaga[a])
        .map(saga => `${SAGA_LABELS[saga] || saga}: ${bySaga[saga]}`);
      el.textContent = `${recent.length} guion${recent.length === 1 ? '' : 'es'} en los últimos 7 días — ${parts.join(' · ')}.`;
    }
    function renderGuionCreationStreak(){
      const el = document.getElementById('guionCreationStreakStat');
      if (!el) return;
      const streak = computeGuionCreationStreak();
      el.textContent = streak > 0
        ? `🔥 ${streak} día${streak === 1 ? '' : 's'} seguidos aprobando al menos una idea.`
        : 'Todavía sin racha activa — se cuenta desde que existe este historial (hoy).';
    }

    // Backlog #40 — "ideas más antiguas sin tocar": cuenta, por banco,
    // cuántas ideas sueltas siguen sin marcar como hecha ni descartada
    // (status 'pendiente' en buildMasterControlIndex, kind 'Idea') — un
    // recuento honesto de acumulación, no una fecha exacta (los
    // one-liners no tienen marca de tiempo de creación individual).
    function renderUntouchedIdeasStat(){
      const el = document.getElementById('untouchedIdeasStat');
      if (!el) return;
      const untouched = buildMasterControlIndex().filter(i => i.kind === 'Idea' && i.status === 'pendiente');
      if (!untouched.length) { el.textContent = 'No hay ninguna idea suelta sin tocar ahora mismo.'; return; }
      const bySection = {};
      untouched.forEach(i => { bySection[i.section] = (bySection[i.section] || 0) + 1; });
      const parts = Object.keys(bySection)
        .sort((a, b) => bySection[b] - bySection[a])
        .map(sec => `${sec}: ${bySection[sec]}`);
      el.textContent = `${untouched.length} ideas sueltas sin tocar en total — ${parts.join(' · ')}.`;
    }

    // Backlog #49 — gráfica real de evolución de visitas: los últimos 30
    // días de verdad, vía vidiq_channel_stats (consultado 2026-09-07).
    // Los suscriptores se quedan planos en 396 todo el mes (sin
    // movimiento real que graficar), así que la gráfica se centra en
    // visitas, que sí tienen recorrido. Es una foto, no un dato en
    // directo — se actualiza a mano de vez en cuando, igual que el
    // resto del panel de VidIQ.
    const VIDIQ_VIEWS_HISTORY = [
      {date:"2026-08-08",views:116022},{date:"2026-08-09",views:116036},{date:"2026-08-10",views:116052},
      {date:"2026-08-11",views:116060},{date:"2026-08-12",views:116062},{date:"2026-08-13",views:116074},
      {date:"2026-08-14",views:116075},{date:"2026-08-15",views:116081},{date:"2026-08-16",views:116092},
      {date:"2026-08-17",views:116103},{date:"2026-08-18",views:116118},{date:"2026-08-19",views:116135},
      {date:"2026-08-20",views:116148},{date:"2026-08-21",views:116151},{date:"2026-08-22",views:116159},
      {date:"2026-08-23",views:116209},{date:"2026-08-24",views:116214},{date:"2026-08-25",views:116221},
      {date:"2026-08-26",views:116233},{date:"2026-08-27",views:116247},{date:"2026-08-28",views:116268},
      {date:"2026-08-29",views:116280},{date:"2026-08-30",views:116290},{date:"2026-08-31",views:116321},
      {date:"2026-09-01",views:116324},{date:"2026-09-02",views:116338},{date:"2026-09-03",views:116343},
      {date:"2026-09-04",views:116359},{date:"2026-09-05",views:116377},{date:"2026-09-06",views:116393},
      {date:"2026-09-07",views:116407}
    ];
    function renderViewsEvolutionChart(){
      const container = document.getElementById('viewsEvolutionChart');
      if (!container) return;
      const points = VIDIQ_VIEWS_HISTORY;
      const W = 700, H = 180, padL = 46, padR = 12, padT = 12, padB = 24;
      const values = points.map(p => p.views);
      const min = Math.min(...values), max = Math.max(...values);
      const yPad = Math.max(5, Math.round((max - min) * 0.08));
      const yMin = min - yPad, yMax = max + yPad;
      const x = i => padL + (i / (points.length - 1)) * (W - padL - padR);
      const y = v => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);

      const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.views).toFixed(1)}`).join(' ');
      const areaPath = `${linePath} L${x(points.length - 1).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`;

      // 4 marcas en el eje Y (mínimo, dos intermedias, máximo) y una
      // etiqueta de fecha cada ~10 días en el eje X, para no saturarlo.
      const yTicks = [yMin, yMin + (yMax - yMin) / 3, yMin + (yMax - yMin) * 2 / 3, yMax];
      const yTicksHTML = yTicks.map(v => `
        <text x="${padL - 8}" y="${y(v).toFixed(1)}" text-anchor="end" dominant-baseline="middle" font-size="10" fill="var(--muted)">${Math.round(v).toLocaleString('es-ES')}</text>
        <line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${W - padR}" y2="${y(v).toFixed(1)}" stroke="var(--line2)" stroke-width="1" stroke-dasharray="3,4"/>`
      ).join('');
      const xTicksHTML = points.map((p, i) => i % 10 === 0 || i === points.length - 1 ? `
        <text x="${x(i).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--muted)">${p.date.slice(5)}</text>` : '').join('');
      const lastPoint = points[points.length - 1];

      container.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block">
          ${yTicksHTML}
          <path d="${areaPath}" fill="var(--orange)" opacity="0.12"/>
          <path d="${linePath}" fill="none" stroke="var(--orange)" stroke-width="2.5"/>
          <circle cx="${x(points.length - 1).toFixed(1)}" cy="${y(lastPoint.views).toFixed(1)}" r="4" fill="var(--orange)"/>
          ${xTicksHTML}
        </svg>
        <p class="yt-empty" style="margin:6px 0 0">Visitas totales del canal, últimos 30 días reales (vía VidIQ).</p>`;
    }

    // Backlog #50 — comparativa mes a mes automática: dos ventanas
    // reales de 30 días consecutivas (vía vidiq_channel_stats,
    // consultado 2026-09-07) — "automática" en el mismo sentido que el
    // resto del panel de VidIQ: Claude la trae en cada refresco, la web
    // no puede pedirla sola por ser estática.
    const VIDIQ_MONTH_COMPARISON = {
      previous: { from: "2026-07-09", to: "2026-08-07", viewsGained: 394, subscribersGained: -1 },
      current: { from: "2026-08-08", to: "2026-09-07", viewsGained: 385, subscribersGained: 0 }
    };
    function renderMonthComparison(){
      const container = document.getElementById('monthComparisonStat');
      if (!container) return;
      const { previous, current } = VIDIQ_MONTH_COMPARISON;
      const diff = current.viewsGained - previous.viewsGained;
      const pct = ((diff / previous.viewsGained) * 100).toFixed(1);
      const trend = diff > 0 ? `📈 +${pct}%` : diff < 0 ? `📉 ${pct}%` : '➡️ igual';
      container.innerHTML = `
        <span class="yt-empty" style="display:inline">${previous.from} → ${previous.to}: +${previous.viewsGained} visitas</span> ·
        <span class="yt-empty" style="display:inline">${current.from} → ${current.to}: +${current.viewsGained} visitas</span> ·
        <strong>${trend} respecto al mes anterior</strong>`;
    }

    // Backlog #53 — seguimiento de 2-3 canales de referencia, con datos
    // reales (vía vidiq_channel_search, consultado 2026-09-07). Elegidos
    // a partir de la propia historia del usuario con los videojuegos
    // (los youtubers de Call of Duty/Minecraft que veía de más joven:
    // Willyrex, Vegetta777 y sTaxx) — no es una decisión de estrategia
    // ajena, son sus propias referencias declaradas. Si algún día quiere
    // cambiarlas por otras, es tan simple como editar este array.
    const VIDIQ_REFERENCE_CHANNELS = [
      { name: "Willyrex", handle: "@willyrex", subscribers: 17300000, views: 5507180239, viewsGrowth30d: 0.18 },
      { name: "VEGETTA777", handle: "@vegetta777", subscribers: 34700000, views: 16458280884, viewsGrowth30d: 0.12 },
      { name: "sTaXxCraft", handle: "@staxxcraft", subscribers: 7840000, views: 1922684826, viewsGrowth30d: 0.03 }
    ];
    function renderReferenceChannels(){
      const container = document.getElementById('referenceChannelsList');
      if (!container) return;
      container.innerHTML = VIDIQ_REFERENCE_CHANNELS.map(c => `
        <div class="vidiq-stat">
          <span class="vidiq-stat-value" style="font-size:16px">${c.name}</span>
          <span class="vidiq-stat-label">${c.subscribers.toLocaleString('es-ES')} susc. · ${c.views.toLocaleString('es-ES')} visitas · 📈 +${c.viewsGrowth30d}% (30d)</span>
        </div>`).join('');
    }

    // Backlog #57 — vídeos con bajo rendimiento, con datos reales del
    // propio canal (vía vidiq_user_videos, consultado 2026-09-07): los
    // últimos 50 vídeos publicados, comparados con la media real de
    // visitas de esa misma muestra. "Bajo rendimiento" = menos del 30%
    // de esa media — enlace directo a cada vídeo real en YouTube.
    const VIDIQ_RECENT_VIDEOS_SAMPLE = [
      {id:"98ulJqRYRmA",title:"Schedule 1: El Imperio de las Chucherías – Primer Directo",views:0},
      {id:"PyRKhzJSn-I",title:"DONALD DUCK LUCKY DIME EN MASTER SYSTEM",views:189},
      {id:"UC5PZJLIAn0",title:"DRÁCULA EN MASTER SYSTEM",views:695},
      {id:"v7xK0awzAA8",title:"SPIDER-MAN EN PS1",views:791},
      {id:"AX-ZoTTjPyM",title:"VECTORMAN EN MEGA DRIVE",views:771},
      {id:"hqbkrrjTKZA",title:"GOLDEN AXE II EN MEGA DRIVE",views:725},
      {id:"OrnMU8zy2H0",title:"THE PUNISHER EN PS2",views:672},
      {id:"qcmqJcDH0JQ",title:"GOLDENEYE 007 EN N64",views:690},
      {id:"-jGfR_h056E",title:"STREET GANGS EN NES",views:693},
      {id:"m2rUU4bvy-Q",title:"CROC LEGEND OF THE GOBBOS",views:106},
      {id:"MEuN6cqAHpc",title:"MARVEL VS CAPCOM EN DREAMCAST",views:759},
      {id:"M9sehTank4A",title:"STAR WARS EN MASTER SYSTEM",views:156},
      {id:"f_5VVOKavVs",title:"BATMAN THE VIDEO GAME NES",views:275},
      {id:"Yvv0k8zVQrw",title:"STREET FIGHTER III DOUBLE IMPACT",views:251},
      {id:"KZcpXXOMS4o",title:"SPIDER-MAN EN MASTER SYSTEM",views:308},
      {id:"SvB_dbyDqGg",title:"ROBOCOP 2 EN NES",views:212},
      {id:"E6AN_IMpeKo",title:"TERMINATOR EN MASTER SYSTEM",views:473},
      {id:"pg1vjgkXL4g",title:"MARVEL SUPER HEROES EN SATURN",views:320},
      {id:"TNMTSTihUXE",title:"GHOSTBUSTERS EN MEGA DRIVE",views:452},
      {id:"skVXlnC1XQg",title:"MARVEL WAR OF THE GEMS EN SNES",views:977},
      {id:"dFmHTbMs5TE",title:"THE IMMORTAL EN MEGA DRIVE",views:702},
      {id:"gzRfgS_8nDI",title:"VUELVE EL CABALLERO OSCURO - BATMAN ARKHAM ASSYLUM",views:5},
      {id:"EUQcJ70A5zo",title:"LUCKY LUKE EN SNES",views:843},
      {id:"NHkXc1oieUU",title:"RAMBO III EN MEGA DRIVE",views:285},
      {id:"EO-uxKgAWnc",title:"BARTMAN EN NES",views:5749},
      {id:"kUwK0Cem0b4",title:"MOONWALKER EN MEGA DRIVE",views:1382},
      {id:"xNqQ4jiJv6s",title:"SPACE JAM EN SEGA SATURN",views:1101},
      {id:"f0lR_bJmFFE",title:"TMNT II THE ARCADE GAME NES",views:3034},
      {id:"_ENJ-mliIeU",title:"ALADDIN EN SUPERNINTENDO",views:1381},
      {id:"OgriONMpaCA",title:"QUACKSHOT EN MEGA DRIVE",views:926},
      {id:"NefPA2aFePM",title:"SUPER MARIO BROS. 3",views:6601},
      {id:"uGabCVB2BDQ",title:"DR. MARIO Y SUS PASTILLAS",views:1663},
      {id:"z0yXYUSgb_8",title:"DONKEY KONG COUNTRY EN SNES",views:3359},
      {id:"kC33gI2NU7Q",title:"EL MARIO IMPOSIBLE (Famicom Disk System)",views:2474},
      {id:"w-CuTEq4HKY",title:"EL MARIO MÁS RARO",views:2828},
      {id:"qvavf4X_ZRY",title:"BATMAN FOREVER EN 16 BITS",views:2256},
      {id:"RqAlQoNvqGU",title:"LOS RANGERS EN 16 BITS",views:1393},
      {id:"L2X9R6k3uvw",title:"MARIO Y SUS MONEDAS DE ORO",views:1331},
      {id:"FIbehbt3I5M",title:"LINK EN EL MULTIVERSO MALDITO",views:1160},
      {id:"H0lxr6pVPy4",title:"YOSHI DE NIÑERA",views:1371},
      {id:"erPV4tloqMI",title:"Un boss final atrapado en un ciclo eterno",views:1482},
      {id:"c-t0xXe8oxY",title:"Un soulslike raro con bichos de pesadilla",views:762},
      {id:"c7bJu0IvTIs",title:"El shooter más random (50 Cent)",views:1114},
      {id:"QtxTt2QjJ4Y",title:"Mafias, píxeles y drogas en un indie turbio",views:1610},
      {id:"qxH-b_qMptI",title:"¿Es Tears of the Kingdom solo un DLC de BOTW?",views:1149},
      {id:"khpjCSV8-KI",title:"WWE 2K Battlegrounds es el WWE más loco",views:341},
      {id:"eJpA3wXPbxs",title:"El inframundo nunca descansa: llega Melinoë",views:1342},
      {id:"PIndFzjSDT0",title:"Cult of the Lamb, el indie más satánico y cute",views:249},
      {id:"TR28xUyfzKo",title:"RoboCop 3 en SNES",views:167},
      {id:"F0ndPaf4Ez0",title:"probando DYING LIGHT",views:901}
    ];
    function renderLowPerformingVideos(){
      const container = document.getElementById('lowPerformingVideos');
      if (!container) return;
      const sample = VIDIQ_RECENT_VIDEOS_SAMPLE;
      const avg = sample.reduce((s, v) => s + v.views, 0) / sample.length;
      const threshold = avg * 0.3;
      const low = sample.filter(v => v.views < threshold).sort((a, b) => a.views - b.views).slice(0, 8);
      container.innerHTML = `
        <p class="section-sub" style="margin:4px 0 10px">
          Media real de los últimos ${sample.length} vídeos: ~${Math.round(avg)} visitas. Por debajo del 30%
          de esa media (~${Math.round(threshold)}):
        </p>
        ${low.map(v => `<div class="log-entry"><strong>${v.views} visitas</strong><p><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">${escapeAttr(v.title)} ↗</a></p></div>`).join('')}`;
    }

    // Backlog #127 — análisis de retención por vídeo, con datos REALES de
    // YouTube Analytics (API oficial `youtubeanalytics.googleapis.com/v2`,
    // consultado 2026-09-10 con el token OAuth de `.secrets/`). El sitio es
    // estático y no puede llamar a la API en vivo (el token no se puede
    // exponer), así que esto es una instantánea igual que los datos de VidIQ.
    // Métrica clave: `averageViewPercentage` — % medio del vídeo que la
    // gente ve de verdad. Rango de fechas: 1 ene – 10 sep 2026.
    const YT_ANALYTICS_RETENTION = {
      updatedAt: '10 sep 2026',
      channel: { views: 3529, avgViewPct: 46.11, avgViewSec: 51, last30dViews: 377, last30dAvgViewPct: 40.91 },
      // retención por fuente de tráfico (jun–sep 2026) — de dónde llega
      // la gente y cuánto aguanta según de dónde venga
      trafficSources: [
        { source: 'Búsqueda de YouTube', views: 820, avgViewPct: 50.52 },
        { source: 'Página del canal', views: 255, avgViewPct: 18.12 },
        { source: 'Feed de Shorts', views: 104, avgViewPct: 19.50 },
        { source: 'Suscriptores', views: 40, avgViewPct: 77.74 },
        { source: 'Otras páginas de YouTube', views: 32, avgViewPct: 59.38 },
        { source: 'Enlaces externos', views: 32, avgViewPct: 42.51 },
        { source: 'Listas de reproducción', views: 31, avgViewPct: 77.85 },
        { source: 'Vídeos relacionados', views: 15, avgViewPct: 75.16 }
      ],
      // por vídeo (los que superan ~60 visitas en el periodo). Título
      // tomado de VIDIQ_RECENT_VIDEOS_SAMPLE cuando el id coincide; los
      // que no, se muestran por id (el token no tiene permiso del Data
      // API v3 para leer títulos, solo Analytics).
      videos: [
        { id: 'jYoHDt16-g4', views: 143, avgViewPct: 88.47 },
        { id: 'hG2Fez9-GmA', views: 165, avgViewPct: 73.52 },
        { id: '08LLD5-2ShQ', views: 719, avgViewPct: 60.37 },
        { id: 'S_mpR3_nAY8', views: 247, avgViewPct: 41.20 },
        { id: 'Yvv0k8zVQrw', views: 102, avgViewPct: 40.42 },
        { id: 'EO-uxKgAWnc', views: 120, avgViewPct: 39.46 },
        { id: 'EUQcJ70A5zo', views: 66, avgViewPct: 37.30 },
        { id: 'skVXlnC1XQg', views: 134, avgViewPct: 33.60 },
        { id: 'f_5VVOKavVs', views: 71, avgViewPct: 33.13 },
        { id: '3H3YdZTI7nY', views: 124, avgViewPct: 30.39 },
        { id: 'xNqQ4jiJv6s', views: 64, avgViewPct: 28.89 },
        { id: 'KZcpXXOMS4o', views: 86, avgViewPct: 25.88 },
        { id: 'qvavf4X_ZRY', views: 68, avgViewPct: 25.42 },
        { id: 'OrnMU8zy2H0', views: 65, avgViewPct: 19.32 },
        { id: 'MEuN6cqAHpc', views: 64, avgViewPct: 14.66 }
      ]
    };
    function renderRetentionSnapshot(){
      const container = document.getElementById('retentionSnapshot');
      if (!container) return;
      const d = YT_ANALYTICS_RETENTION;
      const titleById = {};
      (typeof VIDIQ_RECENT_VIDEOS_SAMPLE !== 'undefined' ? VIDIQ_RECENT_VIDEOS_SAMPLE : []).forEach(v => { titleById[v.id] = v.title; });
      const pctClass = p => p >= 50 ? 'ret-good' : (p >= 30 ? 'ret-mid' : 'ret-low');
      const trend = d.channel.last30dAvgViewPct < d.channel.avgViewPct ? '🔻' : '🔺';
      const worst = d.videos.slice().sort((a, b) => a.avgViewPct - b.avgViewPct).slice(0, 6);
      const best = d.videos.slice().sort((a, b) => b.avgViewPct - a.avgViewPct).slice(0, 3);
      const vidRow = v => {
        const label = titleById[v.id] ? escapeAttr(titleById[v.id]) : `Vídeo ${v.id}`;
        return `<div class="log-entry"><strong class="${pctClass(v.avgViewPct)}">${v.avgViewPct.toFixed(0)}%</strong>
          <p><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">${label} ↗</a> · ${v.views} visitas</p></div>`;
      };
      container.innerHTML = `
        <p class="section-sub" style="margin:4px 0 12px">
          Datos reales de YouTube Analytics (API oficial), 1 ene – 10 sep 2026. La retención
          es el % medio de cada vídeo que la gente ve antes de irse.
        </p>
        <div class="vidiq-stat-grid">
          <div class="vidiq-stat"><span class="vidiq-stat-value ${pctClass(d.channel.avgViewPct)}">${d.channel.avgViewPct.toFixed(0)}%</span><span class="vidiq-stat-label">Retención media del canal</span></div>
          <div class="vidiq-stat"><span class="vidiq-stat-value ${pctClass(d.channel.last30dAvgViewPct)}">${trend} ${d.channel.last30dAvgViewPct.toFixed(0)}%</span><span class="vidiq-stat-label">Últimos 30 días</span></div>
          <div class="vidiq-stat"><span class="vidiq-stat-value">${d.channel.avgViewSec}s</span><span class="vidiq-stat-label">Duración media vista</span></div>
        </div>
        <p style="margin:16px 0 6px"><strong>📥 Según de dónde llega la gente</strong></p>
        ${d.trafficSources.map(s => `<div class="log-entry"><strong class="${pctClass(s.avgViewPct)}">${s.avgViewPct.toFixed(0)}%</strong><p>${escapeAttr(s.source)} · ${s.views} visitas</p></div>`).join('')}
        <p class="yt-empty" style="margin:8px 0 0">
          La búsqueda de YouTube trae más gente <em>y</em> la que mejor aguanta (50%+): el SEO
          está funcionando. Quien entra por la página del canal o el feed de Shorts se va enseguida
          (~19%). Los suscriptores y las listas de reproducción son pocos pero fieles (~78%).
        </p>
        <p style="margin:16px 0 6px"><strong>🔻 Peor retención — dónde se está yendo la gente</strong></p>
        ${worst.map(vidRow).join('')}
        <p style="margin:16px 0 6px"><strong>🔺 Mejor retención — qué formato/tema engancha</strong></p>
        ${best.map(vidRow).join('')}
        <p class="yt-empty" style="margin:12px 0 0">📅 Última actualización: ${d.updatedAt} · se refresca a mano con el token OAuth (el sitio es estático).</p>
      `;
    }

    // Backlog #126 — estimación de ganancias real (vidiq_video_earnings_estimate,
    // 2026-09-07) sobre los 3 vídeos reales más vistos del canal. Los
    // tres dieron $0 — resultado real y honesto, no un fallo: vidIQ
    // marca los canales con menos de ~1.000 suscriptores como
    // normalmente no monetizados (este tiene 396), así que no hay nada
    // que estimar todavía. Se dice tal cual, igual que #54.
    const VIDIQ_EARNINGS_ESTIMATE = [
      { id:'v7xK0awzAA8', title:'SPIDER-MAN EN PS1', views:791, low:0, mid:0, high:0 },
      { id:'AX-ZoTTjPyM', title:'VECTORMAN EN MEGA DRIVE', views:771, low:0, mid:0, high:0 },
      { id:'MEuN6cqAHpc', title:'MARVEL VS CAPCOM EN DREAMCAST', views:759, low:0, mid:0, high:0 }
    ];
    function renderVideoEarningsEstimate(){
      const container = document.getElementById('videoEarningsEstimate');
      if (!container) return;
      const allZero = VIDIQ_EARNINGS_ESTIMATE.every(v => v.high === 0);
      const rows = VIDIQ_EARNINGS_ESTIMATE.map(v =>
        `<div class="log-entry"><strong>${escapeAttr(v.title)}</strong><p>${v.views} visitas — estimado: $${v.low}–$${v.high}</p></div>`
      ).join('');
      container.innerHTML = `
        <p class="section-sub" style="margin:4px 0 10px">
          Sobre los 3 vídeos reales más vistos del canal, vía vidIQ (<code>vidiq_video_earnings_estimate</code>).
          ${allZero ? 'Los tres dan $0 — resultado real, no un fallo: con 396 suscriptores el canal está por debajo del umbral que vidIQ considera normalmente monetizado, así que todavía no hay ganancias reales que estimar.' : ''}
        </p>
        ${rows}`;
    }

    // Backlog #56 — resumen mensual automático, juntando en un solo
    // texto los datos reales que ya trae el resto del panel (#49/#50/
    // #51/#53) — "automático" en el mismo sentido de siempre: Claude lo
    // redacta con datos reales en cada refresco, la web no puede
    // generarlo sola.
    function renderMonthlySummary(){
      const el = document.getElementById('monthlySummaryText');
      if (!el) return;
      const { current, previous } = VIDIQ_MONTH_COMPARISON;
      const spikes = detectViralSpikes();
      const spikeText = spikes.length
        ? `hubo ${spikes.length} día${spikes.length === 1 ? '' : 's'} con subidas fuera de lo normal (destaca el ${spikes[0].date}, +${spikes[0].delta} visitas)`
        : 'sin ningún día fuera de lo normal';
      const trendWord = current.viewsGained >= previous.viewsGained ? 'creciendo' : 'con un mes algo más flojo que el anterior';
      el.textContent = `Del ${current.from} al ${current.to}: +${current.viewsGained} visitas totales (396 suscriptores, sin cambios), ${spikeText}. Comparado con el mes anterior (+${previous.viewsGained}), el canal sigue ${trendWord}.`;
    }

    // Backlog #51 — alerta de crecimiento viral repentino: mira los
    // saltos diarios REALES de VIDIQ_VIEWS_HISTORY (#49) y avisa si
    // algún día se sale claramente de lo normal (más del doble de la
    // subida media del resto del mes). Con los datos de hoy no hay
    // ningún salto así de fuerte — se dice tal cual, no se inventa una
    // alerta para que "se vea que funciona".
    const VIRAL_SPIKE_MULTIPLIER = 2;
    function detectViralSpikes(){
      const h = VIDIQ_VIEWS_HISTORY;
      const deltas = [];
      for (let i = 1; i < h.length; i++) deltas.push({ date: h[i].date, delta: h[i].views - h[i - 1].views });
      const avg = deltas.reduce((s, d) => s + d.delta, 0) / deltas.length;
      return deltas.filter(d => d.delta > avg * VIRAL_SPIKE_MULTIPLIER && d.delta > 0)
        .map(d => Object.assign({}, d, { avg: Math.round(avg) }));
    }
    function renderViralSpikeAlert(){
      const container = document.getElementById('viralSpikeAlert');
      if (!container) return;
      const spikes = detectViralSpikes();
      if (!spikes.length) {
        container.innerHTML = `<p class="yt-empty" style="margin:10px 0 0">🔔 Sin saltos fuera de lo normal en los últimos 30 días (media diaria ~${Math.round(VIDIQ_VIEWS_HISTORY.slice(1).reduce((s,d,i)=>s+(d.views-VIDIQ_VIEWS_HISTORY[i].views),0)/(VIDIQ_VIEWS_HISTORY.length-1))} visitas/día) — esto se avisaría solo si algún día doblara claramente esa media.</p>`;
        return;
      }
      container.innerHTML = `
        <div class="stale-warning" style="margin-top:10px">
          <strong>🚀 ${spikes.length} día${spikes.length === 1 ? '' : 's'} con crecimiento fuera de lo normal:</strong>
          <ul>${spikes.map(s => `<li>${s.date}: +${s.delta} visitas (media del mes: ~${s.avg})</li>`).join('')}</ul>
        </div>`;
    }

    // Backlog #70 — modo compacto de Control Maestro: preferencia simple
    // por navegador (no hace falta sincronizarla entre dispositivos,
    // es solo una cuestión de densidad visual en pantalla).
    const MC_COMPACT_KEY = 'charkuma_master_control_compact';
    function setMasterControlCompact(on){
      try { localStorage.setItem(MC_COMPACT_KEY, on ? '1' : '0'); } catch (e) {}
      const listEl = document.getElementById('masterControlProjectsList');
      if (listEl) listEl.classList.toggle('mc-compact', on);
    }
    (function initMasterControlCompact(){
      let on = false;
      try { on = localStorage.getItem(MC_COMPACT_KEY) === '1'; } catch (e) {}
      const toggle = document.getElementById('masterControlCompactToggle');
      if (toggle) toggle.checked = on;
    })();

    // Backlog #301 — abrir por defecto la vista (lista/kanban) que MÁS se
    // usa de verdad, no solo la última elegida ni un valor fijo a mano.
    // Cuenta real de veces que se elige cada una en el propio selector
    // (nunca inventada) — con datos insuficientes o empate, se queda con
    // "list", el default seguro de siempre.
    const MASTER_CONTROL_VIEW_COUNTS_KEY = 'charkuma_master_control_view_counts';
    function loadMasterControlViewCounts(){
      try { return JSON.parse(localStorage.getItem(MASTER_CONTROL_VIEW_COUNTS_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function trackMasterControlViewChoice(mode){
      const counts = loadMasterControlViewCounts();
      counts[mode] = (counts[mode] || 0) + 1;
      try { localStorage.setItem(MASTER_CONTROL_VIEW_COUNTS_KEY, JSON.stringify(counts)); } catch (e) {}
    }
    (function initMasterControlViewDefault(){
      const select = document.getElementById('masterControlView');
      if (!select) return;
      const counts = loadMasterControlViewCounts();
      if ((counts.kanban || 0) > (counts.list || 0)) select.value = 'kanban';
    })();

    function renderMasterControlList(){
      const listEl = document.getElementById('masterControlProjectsList');
      const countEl = document.getElementById('masterControlCount');
      if (!listEl) return;
      try { listEl.classList.toggle('mc-compact', localStorage.getItem(MC_COMPACT_KEY) === '1'); } catch (e) {}
      renderActivityLog();
      renderAutonomousLoopStatus();
      renderContentTimeline();
      renderNextToPublishWidget();
      renderAvgApprovedToPublished();
      renderGuionCreationStreak();
      renderGuionesEstaSemanaStat();
      renderUntouchedIdeasStat();
      renderStaleContentWarning();
      renderBackupHistory();
      renderViewsEvolutionChart();
      renderMonthComparison();
      renderViralSpikeAlert();
      renderReferenceChannels();
      renderMonthlySummary();
      renderLowPerformingVideos();
      renderRetentionSnapshot();
      renderVideoEarningsEstimate();
      populateGenerateSectionSelect();

      const sectionSelect = document.getElementById('masterControlSection');
      const query = document.getElementById('masterControlSearch').value.trim().toLowerCase();
      const sectionFilter = sectionSelect.value;
      const statusFilter = document.getElementById('masterControlStatus').value;
      const monthFilter = document.getElementById('masterControlPublishedMonth').value;
      const sortBy = document.getElementById('masterControlSort').value;

      const all = buildMasterControlIndex();

      if (sectionSelect.options.length <= 1) {
        [...new Set(all.map(i => i.section))].sort().forEach(sec => {
          const opt = document.createElement('option');
          opt.value = sec; opt.textContent = sec;
          sectionSelect.appendChild(opt);
        });
      }

      // Backlog #101 — opciones de mes reales, derivadas de fechas de
      // publicación reales (getPublishedDate), no inventadas ni fijas.
      const monthSelect = document.getElementById('masterControlPublishedMonth');
      if (monthSelect.options.length <= 1) {
        const MONTH_NAMES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
        const months = new Set();
        all.forEach(i => {
          const ts = getPublishedDate(i.view);
          if (ts) months.add(`${new Date(ts).getFullYear()}-${String(new Date(ts).getMonth() + 1).padStart(2, '0')}`);
        });
        [...months].sort().reverse().forEach(key => {
          const [y, m] = key.split('-');
          const opt = document.createElement('option');
          opt.value = key; opt.textContent = `${MONTH_NAMES[Number(m) - 1]} ${y}`;
          monthSelect.appendChild(opt);
        });
      }

      let items = all.filter(i => {
        if (sectionFilter && i.section !== sectionFilter) return false;
        if (statusFilter === 'en-curso') {
          if (!['aprobado', ...CONTENT_STAGE_ORDER].includes(i.status)) return false;
        } else if (statusFilter && i.status !== statusFilter) return false;
        if (monthFilter) {
          const ts = getPublishedDate(i.view);
          if (!ts) return false;
          const key = `${new Date(ts).getFullYear()}-${String(new Date(ts).getMonth() + 1).padStart(2, '0')}`;
          if (key !== monthFilter) return false;
        }
        if (query && !i.title.toLowerCase().includes(query)) return false;
        return true;
      });

      const PRIORITY_SORT_RANK = { alta: 0, media: 1, baja: 2, '': 3 };
      if (sortBy === 'status') {
        items.sort((a, b) => MASTER_CONTROL_STATUS_PRIORITY[a.status] - MASTER_CONTROL_STATUS_PRIORITY[b.status]);
      } else if (sortBy === 'priority') {
        items.sort((a, b) => PRIORITY_SORT_RANK[a.priority] - PRIORITY_SORT_RANK[b.priority]);
      } else {
        const withDate = items.filter(i => i.date).sort((a, b) => new Date(a.date) - new Date(b.date));
        const withoutDate = items.filter(i => !i.date);
        items = withDate.concat(withoutDate);
      }

      countEl.textContent = `${items.length} de ${all.length} elementos (proyectos + ideas de los bancos secretos)`;

      // Backlog #27 — vista Kanban: las mismas tarjetas filtradas de
      // arriba, agrupadas por estado en columnas en vez de una lista
      // plana. Reutiliza exactamente `items` (mismos filtros/orden).
      const viewMode = document.getElementById('masterControlView')?.value || 'list';
      if (viewMode === 'kanban') {
        const KANBAN_STATUSES = ['pendiente', 'aprobado', ...CONTENT_STAGE_ORDER, 'publicado', 'descartado'];
        listEl.innerHTML = `<div class="kanban-board">${KANBAN_STATUSES.map(status => {
          const colItems = items.filter(i => i.status === status);
          const cards = colItems.map(item => `
            <div class="kanban-card">
              <a href="javascript:void(0)" onclick="showView('${item.view}')">${escapeAttr(item.title)} ↗</a>
              <span class="kanban-section">${item.sectionEmoji} ${escapeAttr(item.section)}${item.priority ? ' · ' + PRIORITY_LABELS[item.priority] : ''}${item.cost ? ' · ' + COST_LABELS[item.cost] : ''}</span>
            </div>`).join('');
          return `
            <div class="kanban-column">
              <div class="kanban-column-head"><span>${CONTENT_STATUS_LABELS[status]}</span><span>${colItems.length}</span></div>
              <div class="kanban-cards">${cards || '<p class="yt-empty" style="margin:0">—</p>'}</div>
            </div>`;
        }).join('')}</div>`;
        return;
      }

      listEl.innerHTML = items.length ? items.map(item => {
        const dateLabel = item.date
          ? new Date(item.date).toLocaleDateString('es-ES', { day:'numeric', month:'short', year:'numeric' })
          : '—';
        const statusChip = `<span class="type-chip ${CONTENT_STATUS_CHIPCLASS[item.status]}">${CONTENT_STATUS_LABELS[item.status]}</span>`;
        const titleLink = item.external
          ? `<a href="${item.view}" target="_blank" rel="noopener">${item.title} ↗</a>`
          : `<a href="javascript:void(0)" onclick="showView('${item.view}')">${item.title} ↗</a>`;
        return `
          <div class="geek-card">
            <div class="geek-thumb">${item.emoji}</div>
            <div class="geek-info">
              <div class="geek-badges">
                <span class="type-chip chip-purple">${item.sectionEmoji} ${item.section}</span>
                <span class="type-chip universe-chip">${item.kind}</span>
                <span class="type-chip chip-neutral">📅 ${dateLabel}</span>
                ${statusChip}
                ${item.priority ? `<span class="type-chip chip-neutral">${PRIORITY_LABELS[item.priority]}</span>` : ''}
                ${item.cost ? `<span class="type-chip chip-neutral">${COST_LABELS[item.cost]}</span>` : ''}
              </div>
              <h4>${titleLink}</h4>
              ${item.summary ? `<p>${item.summary}</p>` : ''}
            </div>
          </div>`;
      }).join('') : emptyStateHTML('Nada coincide con esos filtros.');
    }
    document.getElementById('masterControlSearch').addEventListener('input', renderMasterControlList);
    document.getElementById('masterControlSection').addEventListener('change', renderMasterControlList);
    document.getElementById('masterControlStatus').addEventListener('change', renderMasterControlList);
    document.getElementById('masterControlPublishedMonth').addEventListener('change', renderMasterControlList);

    // ──────────────────────────────────────────────────────────
    // BANDEJA DE GUIONES: todo lo aprobado o ya "creando-guion" de
    // cualquier sección (Rincón del Friki, IA & Experimentos, Creator
    // Tools, Hecho a Mano, Charkuma Lab, HELQUIDGAMES), reunido en un
    // solo sitio para ir grabando la voz en off una detrás de otra sin
    // saltar de página en página. Reutiliza buildSiteIndex() (mismo
    // dato que Control Maestro) filtrado a solo contenido con fases
    // reales — las páginas "hub" fijas (Retro 365, Ruleta del 11...) no
    // tienen findContentItemByView y quedan fuera a propósito.
    // NO incluye los guiones de Retro 365 (plannedGames): esos tienen
    // su propio sistema de seguimiento en la chuleta secreta.
    // ──────────────────────────────────────────────────────────
    // Backlog #35 — swipe estilo Retro 365 (Game Match) para los otros
    // 6 bancos de ideas: en vez de una página dedicada por banco (como
    // Game Match tiene la suya), un único "🃏 Swipe de ideas" con
    // selector de banco — mismo espíritu, sin duplicar 6 veces la misma
    // interfaz. "Me gusta" = marcar como hecha; "Descartar" = lo de
    // siempre (#38, pregunta motivo); "Saltar" = pasar de largo sin
    // decidir nada, solo para esta sesión del navegador (no se guarda).
    const IDEA_TYPE_LABELS_BY_BANK = {
      rincon: TYPE_LABELS, helquid: HELQUID_IDEA_LABELS, lab: LAB_TYPE_LABELS,
      ia: IA_LABELS, creator: CREATOR_LABELS, hecho: HECHO_LABELS
    };
    let ideaSwipeSkipped = {}; // { [bank]: Set(id) } — en memoria, se olvida al recargar

    function getPendingIdeasForBank(bank){
      const merged = ideasMergedForBank(bank);
      const state = loadIdeaBanks()[bank] || {};
      const pending = [];
      Object.keys(merged).forEach(type => {
        merged[type].forEach((idea, i) => {
          const id = `${type}-${i}`;
          const s = state[id] || {};
          if (!s.done && !s.discarded) {
            pending.push({ type, id, text: typeof idea === 'string' ? idea : idea.text });
          }
        });
      });
      return pending;
    }

    // Backlog #286 — "Todas las ideas": junta lo pendiente de los 6
    // bancos en una sola lista filtrable, reutilizando exactamente la
    // misma función normalizadora y las mismas acciones reales
    // (toggleIdeaDone/toggleIdeaDiscard) que ya usa el swipe — no
    // duplica la lógica de decisión, solo cambia cómo se enseña.
    const ALL_IDEAS_BANK_LABELS = {
      rincon: '🦸 Rincón del Friki', helquid: '🎮 HELQUIDGAMES', lab: '🧪 Charkuma Lab',
      ia: '🤖 IA & Experimentos', creator: '🖥️ Creator Tools', hecho: '🧶 Hecho a Mano'
    };
    function allIdeasToggleDone(bank, id, btnEl){
      toggleIdeaDone(bank, id, btnEl);
      renderAllIdeasList();
    }
    function allIdeasToggleDiscard(bank, id){
      toggleIdeaDiscard(bank, id);
      renderAllIdeasList();
    }
    function renderAllIdeasList(){
      const el = document.getElementById('allIdeasList');
      const filterSel = document.getElementById('allIdeasFilter');
      if (!el) return;
      const filterBank = filterSel ? filterSel.value : '';
      const banks = filterBank ? [filterBank] : Object.keys(ALL_IDEAS_BANK_LABELS);
      const items = [];
      banks.forEach(bank => {
        getPendingIdeasForBank(bank).forEach(idea => {
          const typeLabel = (IDEA_TYPE_LABELS_BY_BANK[bank] || {})[idea.type] || idea.type;
          items.push(Object.assign({bank, typeLabel}, idea));
        });
      });
      el.innerHTML = items.length
        ? items.map(it => `
            <div class="geek-card">
              <div class="geek-thumb">${(ALL_IDEAS_BANK_LABELS[it.bank] || '').split(' ')[0] || '💡'}</div>
              <div class="geek-info">
                <div class="geek-badges">
                  <span class="type-chip chip-purple">${escapeHTML(ALL_IDEAS_BANK_LABELS[it.bank] || it.bank)}</span>
                  <span class="type-chip type-${it.type}">${escapeHTML(it.typeLabel)}</span>
                </div>
                <p>${escapeHTML(it.text)}</p>
                <div class="review-controls" style="margin-top:8px">
                  <button type="button" class="btn btn-secondary" onclick="allIdeasToggleDiscard('${it.bank}','${it.id}')">❌ Descartar</button>
                  <button type="button" class="btn btn-primary" onclick="allIdeasToggleDone('${it.bank}','${it.id}', this)">✅ Hecha</button>
                </div>
              </div>
            </div>`).join('')
        : `<p class="yt-empty">${filterBank ? 'Ningún banco tiene ideas sin decidir con ese filtro.' : '¡No queda ninguna idea sin decidir en ningún banco!'}</p>`;
    }

    function renderIdeaSwipeStage(){
      const select = document.getElementById('ideaSwipeBank');
      const stage = document.getElementById('ideaSwipeStage');
      const progress = document.getElementById('ideaSwipeProgress');
      if (!select || !stage) return;
      const bank = select.value;
      const allPending = getPendingIdeasForBank(bank);
      const skipped = ideaSwipeSkipped[bank] || new Set();
      const visible = allPending.filter(p => !skipped.has(p.id));

      progress.textContent = `${allPending.length} idea${allPending.length === 1 ? '' : 's'} sin decidir en este banco${skipped.size ? ` (${skipped.size} saltada${skipped.size === 1 ? '' : 's'} esta sesión)` : ''}.`;

      if (!visible.length) {
        stage.innerHTML = `<p class="yt-empty">${allPending.length ? 'Has saltado todas las que quedaban por decidir — recarga la página para volver a verlas.' : '¡Ya no queda ninguna idea sin decidir en este banco!'}</p>`;
        return;
      }
      const current = visible[0];
      const typeLabel = (IDEA_TYPE_LABELS_BY_BANK[bank] || {})[current.type] || current.type;
      stage.innerHTML = `
        <div class="idea-swipe-card">
          <span class="type-chip type-${current.type}">${typeLabel}</span>
          <p>${escapeHTML(current.text)}</p>
        </div>
        <div class="idea-swipe-controls">
          <button type="button" class="btn btn-secondary" onclick="ideaSwipeDecide('${bank}','${current.id}',false)">❌ Descartar</button>
          <button type="button" class="btn btn-secondary" onclick="ideaSwipeSkip('${bank}','${current.id}')">⏭️ Saltar</button>
          <button type="button" class="btn btn-primary" onclick="ideaSwipeDecide('${bank}','${current.id}',true)">✅ Hecha</button>
        </div>`;
    }
    function ideaSwipeDecide(bank, id, done){
      if (done) toggleIdeaDone(bank, id); else toggleIdeaDiscard(bank, id);
      renderIdeaSwipeStage();
    }
    function ideaSwipeSkip(bank, id){
      if (!ideaSwipeSkipped[bank]) ideaSwipeSkipped[bank] = new Set();
      ideaSwipeSkipped[bank].add(id);
      renderIdeaSwipeStage();
    }

    // Backlog #302 (9 sep, pedido explícito de Iván: "el vídeo se tiene
    // que subir antes de que se estrene, eso siempre lo tiene que tener
    // en cuenta") — un guion sobre una fecha real (estreno, evento)
    // pierde su sentido si se publica después. `deadline` en el
    // contenido original marca esa fecha límite real.
    function guionDeadlineDays(rid){
      const item = findContentItemByView(rid);
      if (!item || !item.deadline) return null;
      return Math.ceil((new Date(item.deadline + 'T00:00:00') - new Date()) / 86400000);
    }
    // Backlog #268/#281 — filtro de estado de la Bandeja de Guiones,
    // recordado entre sesiones vía localStorage. Por defecto "en-curso"
    // (lo que Iván ya está grabando), no "todos" como antes.
    const GUIONES_BANDEJA_FILTRO_KEY = 'charkuma_guionesBandejaFiltro';
    function getGuionesBandejaFiltro(){
      const sel = document.getElementById('guionesBandejaFilter');
      if (sel && sel.value) return sel.value;
      try { return localStorage.getItem(GUIONES_BANDEJA_FILTRO_KEY) || 'en-curso'; } catch (e) { return 'en-curso'; }
    }
    function initGuionesBandejaFiltro(){
      const sel = document.getElementById('guionesBandejaFilter');
      if (!sel) return;
      let saved = 'en-curso';
      try { saved = localStorage.getItem(GUIONES_BANDEJA_FILTRO_KEY) || 'en-curso'; } catch (e) { /* localStorage no disponible */ }
      sel.value = saved;
      sel.addEventListener('change', () => {
        try { localStorage.setItem(GUIONES_BANDEJA_FILTRO_KEY, sel.value); } catch (e) { /* localStorage no disponible */ }
        renderGuionesBandeja();
      });
    }
    initGuionesBandejaFiltro(); // se llama una sola vez al cargar el script

    function buildGuionesBandeja(filtro){
      const base = buildSiteIndex()
        .filter(item => findContentItemByView(item.view))
        .filter(item => item.status === 'aprobado' || item.status === CONTENT_STAGE_ORDER[0]);
      const filtered = filtro === 'sin-empezar'
        ? base.filter(item => item.status === 'aprobado')
        : filtro === 'en-curso'
          ? base.filter(item => item.status === CONTENT_STAGE_ORDER[0])
          : base; // 'todos'
      return filtered.sort((a, b) => {
          // Prioridad real: primero por urgencia de fecha límite (el
          // que menos días tenga, o ya pasado, va primero), luego por
          // el criterio de siempre (empezado > sin empezar).
          const da = guionDeadlineDays(a.view);
          const db = guionDeadlineDays(b.view);
          if (da !== null && db !== null) return da - db;
          if (da !== null) return -1;
          if (db !== null) return 1;
          return (a.status === 'aprobado' ? 1 : 0) - (b.status === 'aprobado' ? 1 : 0);
        });
    }

    // Backlog #14 — plantilla de estructura de guion para empezar uno
    // nuevo desde cero: los mismos 8 beats que ya usa todo guion
    // existente (HOOK→PROMESA→...→CTA), con placeholders en vez de
    // texto real.
    const GUION_TEMPLATE = [
      '🪝 Hook (0-10s)',
      '🎙️ Off: [la imagen o el momento más icónico, sin rodeos, en la primera frase]',
      '',
      '🎯 Promesa',
      '🎙️ Off: [qué es en una frase + por qué merece la pena seguir viendo]',
      '',
      '📍 Contexto',
      '🎙️ Off: [lo mínimo que hace falta saber para entender el resto]',
      '',
      '🎬 Desarrollo',
      '🎙️ Off: [el cuerpo real del contenido — datos, pasos o ejemplos]',
      '',
      '🔀 Giro / momento más fuerte',
      '🎙️ Off: [el dato o giro que más sorprende, para el momento de más atención]',
      '',
      '💬 Opinión',
      '🎙️ Off: [IVÁN — AÑADIR OPINIÓN: ...]',
      '',
      '🏁 Conclusión',
      '🎙️ Off: [cierre que ata todo lo anterior]',
      '',
      '📣 CTA',
      '🎙️ Off: [pregunta o invitación concreta a comentar/suscribirse]'
    ].join('\n');
    function copyGuionTemplateIfPresent(){
      const btn = document.getElementById('copyGuionTemplateBtn');
      if (btn) btn.dataset.copy = GUION_TEMPLATE;
    }

    function renderGuionesBandeja(){
      const listEl = document.getElementById('guionesBandejaList');
      const countEl = document.getElementById('guionesBandejaCount');
      if (!listEl) return;
      copyGuionTemplateIfPresent();
      const filtro = getGuionesBandejaFiltro();
      const items = buildGuionesBandeja(filtro);
      // Backlog Fase 2 #172 — cuántos de estos guiones todavía tienen el
      // placeholder "[IVÁN — AÑADIR OPINIÓN..." sin resolver en su beat
      // de Opinión — mirando el DOM real de cada vista, no un número
      // aparte que se pueda quedar desactualizado.
      const pendingOpinion = items.filter(item => {
        const panel = document.getElementById(`view-${item.view}`);
        return panel && panel.innerHTML.includes('AÑADIR OPINIÓN');
      }).length;
      // Backlog Fase 2 #188 — cuántos de estos guiones ya tienen alguna
      // foto/ilustración de contexto para el modo grabación (real o IA,
      // cualquiera de las dos cuenta) frente a los que todavía no.
      const withContextPhoto = items.filter(item => !!RECORDING_MODE_IMAGES[item.view]).length;
      // Backlog #302 — cuántos de estos guiones tienen una fecha límite
      // real (dentro de 14 días) que se perdería si no se graban a tiempo.
      const urgentCount = items.filter(item => {
        const d = guionDeadlineDays(item.view);
        return d !== null && d <= 14;
      }).length;
      // Backlog #268/#281 — con filtro activo, un resultado vacío no
      // siempre significa "no hay nada pendiente": puede que sí lo haya,
      // solo que en otro estado. Distinguimos ambos casos en el mensaje.
      const totalSinFiltrar = buildGuionesBandeja('todos').length;
      countEl.textContent = items.length
        ? `${items.length} guion${items.length === 1 ? '' : 'es'} listo${items.length === 1 ? '' : 's'} para grabar${pendingOpinion ? ` — ${pendingOpinion} con la Opinión todavía sin escribir` : ''} — ${withContextPhoto} de ${items.length} con foto de contexto.${urgentCount ? ` ⏰ ${urgentCount} con fecha límite real en menos de 14 días.` : ''}`
        : totalSinFiltrar
          ? 'Ningún guion coincide con este filtro — prueba con "Todos" para ver el resto.'
          : 'No hay guiones pendientes de grabar ahora mismo — todo lo aprobado ya está en edición o publicado.';
      listEl.innerHTML = items.map(item => {
        const rid = item.view;
        const notStarted = item.status === 'aprobado';
        const statusChip = notStarted
          ? `<span class="type-chip chip-green">✅ Guion listo, sin empezar</span>`
          : `<span class="type-chip chip-orange">✍️ Grabando voz en off</span>`;
        const actionLabel = notStarted ? '▶️ Empezar a grabar' : '✅ Voz grabada → pasar a edición';
        // Backlog #302 — badge de fecha límite real, cuando el guion la
        // tiene: rojo si quedan 3 días o menos (o ya pasó), naranja si
        // quedan menos de 14, neutro si hay más margen.
        const deadlineDays = guionDeadlineDays(rid);
        let deadlineBadge = '';
        if (deadlineDays !== null) {
          const urgentClass = deadlineDays <= 3 ? 'chip-red' : deadlineDays <= 14 ? 'chip-orange' : 'chip-neutral';
          const deadlineLabel = deadlineDays < 0
            ? `⏰ Fecha límite pasada hace ${Math.abs(deadlineDays)} día${Math.abs(deadlineDays) === 1 ? '' : 's'}`
            : deadlineDays === 0
              ? `⏰ Fecha límite: HOY`
              : `⏰ Publicar antes de ${deadlineDays} día${deadlineDays === 1 ? '' : 's'}`;
          deadlineBadge = `<span class="type-chip ${urgentClass}" title="Este guion pierde sentido si se publica después de la fecha real del evento">${deadlineLabel}</span>`;
        }
        return `
          <div class="geek-card">
            <div class="geek-thumb">${item.emoji}</div>
            <div class="geek-info">
              <div class="geek-badges">
                <span class="type-chip chip-purple">${item.sectionEmoji} ${item.section}</span>
                ${statusChip}
                ${deadlineBadge}
                ${RECORDING_MODE_IMAGES[rid] ? `<span class="type-chip chip-neutral">🖼️ Con foto de contexto</span>` : ''}
                ${recentlyUpdatedBadgeHTML(rid)}
              </div>
              <h4><a href="javascript:void(0)" onclick="showView('${rid}')">${item.title} ↗</a></h4>
              ${item.summary ? `<p>${item.summary}</p>` : ''}
              <div class="review-controls" style="margin-top:10px">
                <button type="button" class="btn btn-secondary" onclick="showView('${rid}')">📜 Abrir guion</button>
                <button type="button" class="btn btn-primary" onclick="markGuionVozGrabada('${rid}')">${actionLabel}</button>
                <button type="button" class="btn btn-secondary review-discard-btn" onclick="discardFromBandeja('${rid}')">🗑️ Descartar</button>
              </div>
            </div>
          </div>`;
      }).join('');
    }

    // Un toque desde "aprobado" solo arranca la fase (avisa de que se ha
    // empezado); un segundo toque desde "creando-guion" es el que de
    // verdad saca el guion de esta bandeja, al pasar a "editando-vídeo".
    function markGuionVozGrabada(rid){
      advanceContentStage(rid);
      renderGuionesBandeja();
    }

    // Pedido directo de Iván (14 sep): "a cada guion añadele el boton
    // descartar" — la Bandeja ya permitía descartar abriendo cada guion
    // primero (reviewControlsHTML, inyectado en toda página de contenido
    // vía updateViewChrome), pero eso obliga a entrar y salir uno a uno.
    // Este botón vive en la propia tarjeta de la lista. A diferencia de
    // toggleContentDiscarded() — pensado para descartar DESDE la página
    // del guion y saltar automáticamente al siguiente sin tocar — este
    // NO navega a ningún sitio: solo actualiza el estado (mismo campo,
    // mismo historial, misma sincronización con Firestore) y vuelve a
    // pintar esta misma lista, para poder seguir repasando el resto de
    // guiones sin perder el sitio en el que estabas.
    function discardFromBandeja(rid){
      setContentDiscarded(rid, true);
      logContentHistory(rid, '🗑️ Descartado');
      clearScheduledDate(rid);
      refreshReviewControls();
      renderGuionesBandeja();
    }
    document.getElementById('masterControlSort').addEventListener('change', renderMasterControlList);

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
      // El hueco lateral izquierdo es compartido: Ranking friki en Rincón
      // del Friki, Radar de estrenos en el inicio — nunca coinciden, así
      // que basta con mostrar/ocultar cada <aside> por separado dentro
      // del mismo contenedor.
      const leftSidebar = document.getElementById('leftSidebarStack');
      const rankingAside = document.getElementById('rankingSidebar');
      const estrenosAside = document.getElementById('estrenosSidebar');
      const showRanking = viewId === 'rincon';
      const showEstrenos = viewId === 'home';
      if (leftSidebar) leftSidebar.classList.toggle('active', showRanking || showEstrenos);
      if (rankingAside) rankingAside.hidden = !showRanking;
      if (estrenosAside) estrenosAside.hidden = !showEstrenos;

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

    // ──────────────────────────────────────────────────────────
    // AUTO-DETECCIÓN de vídeos publicados de Retro 365: mira los
    // últimos vídeos reales de YouTube (ya cargados por loadLatestVideos)
    // y, si el título o la descripción de alguno contiene el hashtag
    // "#Reto365" JUNTO con el nombre de un juego "decidido, sin grabar"
    // todavía, lo marca como hecho automáticamente en el banco de ideas
    // de Retro 365 (mismo efecto que pulsar el ✅ a mano ahí).
    //
    // Por ahora esto solo existe para Retro 365, que es la única
    // sección con un hashtag fijo definido (#Reto365 + nombre del
    // juego, en todos los vídeos, tanto en YouTube como en TikTok). Si
    // luego usas un hashtag parecido en otras secciones, este mismo
    // patrón se puede repetir para ellas.
    //
    // Limitación real: solo puede comprobar los vídeos que ve la API de
    // YouTube (no TikTok), y solo funciona en el dominio real de la web
    // (la clave de YouTube está restringida a ese referrer) — en local
    // no hace nada útil.
    function checkRetro365AutoPublish(){
      if (!latestVideosRaw.length) return;
      const plannedBankState = loadIdeaBanks()[RETRO_PLANNED_BANK] || {};
      Object.keys(plannedGames).forEach(day => {
        const id = `day-${day}`;
        if ((plannedBankState[id] || {}).done) return; // ya marcado, nada que hacer
        const game = plannedGames[day];
        const gameName = (game.name || '').toLowerCase().trim();
        if (!gameName) return;
        const matched = latestVideosRaw.some(v => {
          const text = ((v.snippet.title || '') + ' ' + (v.snippet.description || '')).toLowerCase();
          return text.includes('#reto365') && text.includes(gameName);
        });
        if (matched) { toggleIdeaDone(RETRO_PLANNED_BANK, id); clearScheduledDate(`retro-day-${day}`); }
      });
    }

    // Backlog #61 — skeleton loaders: filas falsas con la misma forma
    // que un `.yt-video` real (miniatura + 2 líneas de texto), para que
    // la espera a la API de YouTube/TMDB se sienta como carga en curso
    // y no como una sección rota o en blanco.
    function skeletonVideoRowsHTML(n){
      return Array.from({ length: n }).map(() => `
        <div class="skeleton-video">
          <div class="skeleton-block"></div>
          <div class="skeleton-video-lines">
            <div class="skeleton-block"></div>
            <div class="skeleton-block"></div>
          </div>
        </div>`).join('');
    }

    // Backlog #65 — ilustración propia para estados vacíos: la misma
    // silueta de geco del pie de página (nuestro propio motivo de
    // marca, no un icono de librería), envuelta en un mensaje. Un solo
    // helper para no repetir el SVG en cada sitio que lo necesite.
    const GECKO_ILLUSTRATION_SVG = `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M8 62 Q24 40 40 50 Q52 58 46 44" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="66" cy="46" rx="22" ry="13" stroke="currentColor" stroke-width="5"/>
      <ellipse cx="94" cy="38" rx="12" ry="9" stroke="currentColor" stroke-width="5"/>
      <path d="M56 56 L48 66 M76 56 L82 68 M58 36 L50 26 M82 34 L90 22" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <circle cx="98" cy="35" r="2.4" fill="currentColor"/>
    </svg>`;
    function emptyStateHTML(message){
      return `<div class="empty-state">${GECKO_ILLUSTRATION_SVG}<p>${message}</p></div>`;
    }

    function skeletonCardsHTML(n){
      return Array.from({ length: n }).map(() => `
        <div class="skeleton-card">
          <div class="skeleton-block"></div>
          <div class="skeleton-card-lines">
            <div class="skeleton-block"></div>
            <div class="skeleton-block"></div>
            <div class="skeleton-block"></div>
          </div>
        </div>`).join('');
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

      if (currentSidebarMode === 'videos') {
        const listEl = document.getElementById('ytVideoList');
        if (listEl) listEl.innerHTML = skeletonVideoRowsHTML(3);
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
        latestVideosRaw = videos;
        checkRetro365AutoPublish();
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
    // RADAR DE ESTRENOS: lista fija ("otros que quiero cubrir") +
    // lista en vivo desde TMDB (si hay clave configurada).
    // ──────────────────────────────────────────────────────────
    function renderCustomPremieres(){
      const container = document.getElementById('premieresCustomList');
      if (!container) return;
      container.innerHTML = customPremieres.map(p => `
        <div class="geek-card">
          <div class="geek-thumb">${p.emoji || '🎬'}</div>
          <div class="geek-info">
            <div class="geek-badges">
              <span class="type-chip ${p.status === 'visto' ? 'chip-green' : 'chip-orange'}">${p.status === 'visto' ? '✅ Ya vista' : '🎬 Bombazo'}</span>
            </div>
            <h4>${p.imdbUrl ? `<a href="${p.imdbUrl}" target="_blank" rel="noopener">${p.title} ↗ IMDb</a>` : p.title}</h4>
            <p>${p.note}</p>
          </div>
        </div>`).join('');
    }
    renderCustomPremieres();

    // Backlog #76 — cachear más agresivamente TMDB: "estrenos próximos"
    // no cambia de un minuto para otro, así que repetir las 3 llamadas
    // cada vez que se abre el inicio (o se toca un filtro de género) es
    // gasto de cuota innecesario. Cache corta (3h) en localStorage,
    // separada por combinación de géneros elegida (cambiar el filtro sí
    // debe traer datos frescos de esa combinación, no los de otra).
    const TMDB_PREMIERES_CACHE_KEY = 'charkuma_tmdb_premieres_cache';
    const TMDB_PREMIERES_TTL_MS = 3 * 60 * 60 * 1000;
    function tmdbPremieresCacheKey(genres){ return [...genres].sort((a, b) => a - b).join(','); }
    function loadTMDBPremieresCache(){
      try { return JSON.parse(localStorage.getItem(TMDB_PREMIERES_CACHE_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveTMDBPremieresCacheEntry(key, combined){
      const cache = loadTMDBPremieresCache();
      cache[key] = { ts: Date.now(), combined };
      try { localStorage.setItem(TMDB_PREMIERES_CACHE_KEY, JSON.stringify(cache)); } catch (e) { /* seguimos sin guardar */ }
    }
    function renderPremieresCombined(container, combined){
      container.innerHTML = combined.length
        ? combined.map(item => {
            const url = item.mediaType === 'tv'
              ? `https://www.themoviedb.org/tv/${item.id}`
              : `https://www.themoviedb.org/movie/${item.id}`;
            const mediaBadge = item.mediaType === 'tv' ? '📺 Serie' : '🎬 Película';
            return `
            <div class="geek-card">
              ${item.poster_path
                ? `<img class="geek-thumb" style="object-fit:cover" src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="Póster de ${item.title}" loading="lazy">`
                : `<div class="geek-thumb">${item.mediaType === 'tv' ? '📺' : '🎬'}</div>`}
              <div class="geek-info">
                <div class="geek-badges">
                  <span class="type-chip chip-purple">📅 ${item.date || 'sin fecha'}</span>
                  <span class="type-chip chip-neutral">${mediaBadge}</span>
                </div>
                <h4><a href="${url}" target="_blank" rel="noopener">${item.title} ↗</a></h4>
                <p>${item.overview || 'Sin sinopsis disponible todavía.'}</p>
              </div>
            </div>`;
          }).join('')
        : `<p class="yt-empty">TMDB no devuelve estrenos próximos de este tipo ahora mismo.</p>`;
    }

    async function loadLivePremieres(){
      const container = document.getElementById('premieresLiveList');
      if (!container) return;
      const notConfigured = !TMDB_API_KEY || TMDB_API_KEY.indexOf('PON_AQUI') === 0;
      if (notConfigured) {
        container.innerHTML = `<p class="yt-empty">
          Configura <code>TMDB_API_KEY</code> en el &lt;script&gt; (app.js) para activar
          esta lista en vivo — instrucciones justo encima, en el código.
        </p>`;
        return;
      }
      const wantedGenresForCache = loadTMDBGenrePrefs();
      const cacheKey = tmdbPremieresCacheKey(wantedGenresForCache);
      const cached = loadTMDBPremieresCache()[cacheKey];
      if (cached && (Date.now() - cached.ts) < TMDB_PREMIERES_TTL_MS) {
        cachedPremiereMovies = cached.combined;
        renderPremieresCombined(container, cached.combined);
        return;
      }
      container.innerHTML = skeletonCardsHTML(3);
      try {
        // "movie/upcoming" (estrenos próximos confirmados en España) en vez
        // de "discover" con filtro de fecha: probado en vivo, discover con
        // primary_release_date.gte deja fuera casi todo porque muchas
        // películas grandes todavía no tienen fecha mundial exacta fijada.
        // upcoming sí trae fechas reales de cartelera — filtramos el
        // género nosotros mismos con los resultados (upcoming no admite
        // with_genres). Dos páginas son de sobra para el hueco temporal
        // que cubre este endpoint.
        //
        // Para series sí funciona bien "discover/tv" con with_genres +
        // first_air_date.gte (probado en vivo) — ahí los géneros de TMDB
        // son distintos a los de película: 16 Animación (cubre anime),
        // 10765 "Sci-Fi & Fantasy" (así llama TMDB al combinado en TV).
        const today = new Date().toISOString().slice(0, 10);
        const wantedGenres = wantedGenresForCache;
        const [p1, p2, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-ES&region=ES&page=1`).then(r => r.json()).catch(() => ({ results: [] })),
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-ES&region=ES&page=2`).then(r => r.json()).catch(() => ({ results: [] })),
          fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=es-ES&with_genres=16,10765&sort_by=popularity.desc&first_air_date.gte=${today}`).then(r => r.json()).catch(() => ({ results: [] }))
        ]);
        const movies = [...(p1.results || []), ...(p2.results || [])]
          .filter(m => (m.genre_ids || []).some(g => wantedGenres.includes(g)))
          .map(m => ({ id: m.id, mediaType: 'movie', title: m.title, date: m.release_date, overview: m.overview, poster_path: m.poster_path }));
        const series = (tvRes.results || [])
          .map(s => ({ id: s.id, mediaType: 'tv', title: s.name, date: s.first_air_date, overview: s.overview, poster_path: s.poster_path }));
        const combined = [...movies, ...series]
          .sort((a, b) => new Date(a.date || '9999') - new Date(b.date || '9999'))
          .slice(0, 6);
        cachedPremiereMovies = combined; // lo usa buildNotifications() para avisar de estrenos a menos de una semana
        saveTMDBPremieresCacheEntry(cacheKey, combined);
        renderPremieresCombined(container, combined);
      } catch (err) {
        container.innerHTML = `<p class="yt-empty">No se pudieron cargar los estrenos ahora mismo.</p>`;
      }
    }
    loadLivePremieres();

    (function initDriveButton(){
      const btn = document.getElementById('driveFolderBtn');
      const notice = document.getElementById('driveNotConfigured');
      if (!btn || !notice) return;
      const configured = DRIVE_FOLDER_URL && DRIVE_FOLDER_URL.indexOf('PON_AQUI') !== 0;
      btn.hidden = !configured;
      notice.hidden = configured;
      if (configured) btn.href = DRIVE_FOLDER_URL;
    })();

    // ──────────────────────────────────────────────────────────
    // BLOC DE NOTAS — ahora en Firebase Firestore (desde 2026-09-06),
    // ya no en localStorage: sincroniza sola entre dispositivos y
    // navegadores en tiempo real (onSnapshot). window.firestoreDB y
    // window.firestoreFns los prepara el <script type="module"> de
    // index.html, cargado ANTES que este archivo — si por lo que sea no
    // están listos (red, bloqueador...), todo cae en un aviso claro en
    // vez de romper la web.
    // ──────────────────────────────────────────────────────────
    const OLD_NOTES_KEY = 'charkuma_notes'; // legado, solo para la migración de una vez
    const NOTES_MIGRATED_KEY = 'charkuma_notes_migrated_to_firestore';
    let notesUnsubscribe = null;

    function escapeHTML(str){
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function firestoreReady(){
      return !!(window.firestoreDB && window.firestoreFns);
    }
    function showNotesConnectionError(){
      const list = document.getElementById('notesList');
      if (list) list.innerHTML = `<p class="yt-empty">No se ha podido conectar con el servidor de notas ahora mismo (revisa tu conexión o algún bloqueador). Tus notas siguen a salvo en Firebase, solo no se han podido cargar aquí.</p>`;
    }

    function renderNotes(notes){
      const list = document.getElementById('notesList');
      if (!list) return;
      list.innerHTML = notes.length
        ? notes.slice().reverse().map(note => `
            <div class="note-item">
              <button class="note-delete" onclick="deleteNote('${note.id}')" title="Borrar nota">✕</button>
              <p>${escapeHTML(note.text)}</p>
              <span>${escapeHTML(note.dateLabel || '')}</span>
            </div>`).join('')
        : `<p class="yt-empty">Todavía no tienes notas. Escribe la primera arriba 👆</p>`;
    }

    // Migración de una sola vez: si había notas antiguas en localStorage
    // (de antes de tener Firestore), se suben una vez y se marca hecho.
    async function migrateOldLocalNotesOnce(){
      try {
        if (localStorage.getItem(NOTES_MIGRATED_KEY)) return;
        const old = JSON.parse(localStorage.getItem(OLD_NOTES_KEY) || '[]');
        if (Array.isArray(old) && old.length && firestoreReady()) {
          const { collection, addDoc } = window.firestoreFns;
          for (const note of old) {
            if (note && note.text) {
              await addDoc(collection(window.firestoreDB, 'notes'), {
                text: note.text, dateLabel: note.date || '', createdAt: Date.now()
              });
            }
          }
        }
        localStorage.setItem(NOTES_MIGRATED_KEY, '1');
      } catch (e) { /* si falla, las notas antiguas siguen intactas en localStorage, no se pierde nada */ }
    }

    async function initNotesRealtime(){
      if (!firestoreReady()) { showNotesConnectionError(); return; }
      await migrateOldLocalNotesOnce();
      const { collection, query, orderBy, onSnapshot } = window.firestoreFns;
      const notesQuery = query(collection(window.firestoreDB, 'notes'), orderBy('createdAt', 'asc'));
      if (notesUnsubscribe) notesUnsubscribe();
      notesUnsubscribe = onSnapshot(notesQuery,
        (snapshot) => renderNotes(snapshot.docs.map(d => Object.assign({id: d.id}, d.data()))),
        () => showNotesConnectionError()
      );
    }

    async function addNote(){
      const input = document.getElementById('noteInput');
      const text = input.value.trim();
      if (!text) return;
      if (!firestoreReady()) { alert('No hay conexión con el servidor de notas ahora mismo.'); return; }
      const { collection, addDoc } = window.firestoreFns;
      await addDoc(collection(window.firestoreDB, 'notes'), {
        text,
        dateLabel: new Date().toLocaleString('es-ES', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'}),
        createdAt: Date.now()
      });
      input.value = '';
      // Backlog #297 — la nota ya se guardó de verdad, el borrador local
      // sobra (si no se limpia, "resucitaría" en la próxima carga).
      try { localStorage.removeItem('charkuma_noteDraft'); } catch (e) { /* localStorage no disponible */ }
      // No hace falta repintar a mano: onSnapshot se entera solo en
      // cuanto Firestore confirma el cambio (y en cualquier otro
      // dispositivo abierto a la vez, también).
    }

    async function deleteNote(id){
      if (!firestoreReady()) return;
      const { doc, deleteDoc } = window.firestoreFns;
      await deleteDoc(doc(window.firestoreDB, 'notes', id));
    }

    // Exportar/importar sigue teniendo sentido como copia de seguridad
    // manual (por si algún día se quiere mover a otro proyecto de
    // Firebase, o simplemente tener un respaldo local aparte).
    async function exportNotes(){
      if (!firestoreReady()) { alert('No hay conexión con el servidor de notas ahora mismo.'); return; }
      const { collection, getDocs } = window.firestoreFns;
      const snapshot = await getDocs(collection(window.firestoreDB, 'notes'));
      const notes = snapshot.docs.map(d => d.data());
      const blob = new Blob([JSON.stringify(notes, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `charkuma-notas-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    async function importNotesFile(file){
      if (!file) return;
      if (!firestoreReady()) { alert('No hay conexión con el servidor de notas ahora mismo.'); return; }
      const reader = new FileReader();
      reader.onload = async () => {
        let imported;
        try { imported = JSON.parse(reader.result); }
        catch (e) { alert('Ese archivo no es un JSON válido.'); return; }
        if (!Array.isArray(imported)) { alert('Ese archivo no tiene el formato esperado de una exportación de notas.'); return; }

        const { collection, addDoc, getDocs } = window.firestoreFns;
        const existingSnap = await getDocs(collection(window.firestoreDB, 'notes'));
        const existingTexts = new Set(existingSnap.docs.map(d => d.data().text));
        let added = 0;
        for (const n of imported) {
          if (n && typeof n.text === 'string' && !existingTexts.has(n.text)) {
            await addDoc(collection(window.firestoreDB, 'notes'), {
              text: n.text, dateLabel: n.date || n.dateLabel || '', createdAt: Date.now()
            });
            added++;
          }
        }
        alert(`Importadas ${added} nota${added === 1 ? '' : 's'} nueva${added === 1 ? '' : 's'} (las que ya tenías no se han duplicado).`);
      };
      reader.readAsText(file);
    }

    // ──────────────────────────────────────────────────────────
    // PENDIENTE DE TU DECISIÓN: cosas que Claude encuentra y no puede
    // resolver por su cuenta (necesitan un criterio o una cuenta externa
    // que solo tú puedes dar). A propósito NO vive en localStorage como
    // base — vive aquí, en el código, mantenida a mano por Claude, para
    // que sobreviva a que cambies de navegador o el navegador borre
    // datos. El botón ✅ de la web solo la OCULTA en ese navegador
    // (localStorage aparte, "dismissed"); para quitarla también de aquí
    // hay que decírselo a Claude en el chat, o él la quita solo en
    // cuanto la resuelve.
    // ──────────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────────
    // LIBRERÍA DE STEAM: lista fija, no en vivo — la clave de la API de
    // Steam no está pensada para exponerse en una web pública (a
    // diferencia de TMDB/RAWG), así que se trae a mano de vez en cuando
    // desde local (curl + la clave guardada fuera del repo) y se pega
    // aquí como array. Últimos 20 más jugados, traídos el 2026-09-06
    // desde el perfil real (steamcommunity.com/id/rubioacm).
    // ──────────────────────────────────────────────────────────
    const steamGames = [
      {name:"WWE 2K25", hours:116, appid:2878960},
      {name:"Schedule I", hours:76, appid:3164500},
      {name:"Marvel Snap", hours:50, appid:1997040},
      {name:"Balatro", hours:49, appid:2379780},
      {name:"Paladins", hours:49, appid:444090},
      {name:"Call of Duty", hours:47, appid:1938090},
      {name:"Cult of the Lamb", hours:44, appid:1313140},
      {name:"High Profits", hours:42, appid:545650},
      {name:"Far Cry 4", hours:37, appid:298110},
      {name:"The Last of Us Part I", hours:28, appid:1888930},
      {name:"Wallpaper Engine", hours:26, appid:431960},
      {name:"Batman: Arkham Asylum GOTY Edition", hours:17, appid:35140},
      {name:"Buckshot Roulette", hours:16, appid:2835570},
      {name:"WWE 2K Battlegrounds", hours:16, appid:1142100},
      {name:"Rust", hours:16, appid:252490},
      {name:"The Witcher 3: Wild Hunt - Complete Edition", hours:15, appid:292030},
      {name:"DC Universe Online", hours:14, appid:24200},
      {name:"Dying Light", hours:13, appid:239140},
      {name:"Resident Evil 0", hours:13, appid:339340},
      {name:"Who Wants To Be A Millionaire?", hours:11, appid:1356240}
    ];
    function renderSteamGames(){
      const container = document.getElementById('steamGamesList');
      if (!container) return;
      container.innerHTML = steamGames.map(g => `
        <div class="geek-card">
          <img class="geek-thumb" style="width:120px;height:56px;object-fit:cover" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg" alt="Portada de ${escapeAttr(g.name)}" loading="lazy">
          <div class="geek-info">
            <div class="geek-badges"><span class="type-chip chip-purple">⏱️ ${g.hours}h jugadas</span></div>
            <h4><a href="https://store.steampowered.com/app/${g.appid}" target="_blank" rel="noopener">${escapeHTML(g.name)} ↗</a></h4>
          </div>
        </div>`).join('');
    }

    // ──────────────────────────────────────────────────────────
    // MI SETUP: opinión real, escrita a mano — sin API detrás.
    // ──────────────────────────────────────────────────────────
    const techMainPc = [
      {emoji:'🖥️', name:'PC principal', detail:'AMD Ryzen 5 3600 · RTX 3060 · 16GB RAM · MSI B450-A PRO MAX', note:'El caballo de batalla de todo esto: graba, edita y aguanta lo que le eche sin quejarse.'},
      {emoji:'🖥️', name:'Monitor MSI', note:'El de trabajo del día a día.'},
      {emoji:'🖥️', name:'Monitor LG (curvo)', note:'El ancho, para tener todo a la vista sin cambiar de ventana cada dos minutos.'}
    ];
    const techStreaming = [
      {emoji:'📷', name:'Cámara EasyCam 502 4K', note:'Cumple de sobra para lo que necesito, sin gastarme una fortuna en algo profesional.'},
      {emoji:'🎙️', name:'Micrófono Blue Yeti + soporte (IKEA)', note:'El mejor cambio de calidad de audio que he hecho — se nota muchísimo en cualquier vídeo.'},
      {emoji:'🎧', name:'Auriculares KROM'},
      {emoji:'⌨️', name:'Teclado KROM'},
      {emoji:'🖱️', name:'Ratón KROM', note:'Todo el combo de la misma marca, sin dramas de compatibilidad.'},
      {emoji:'🎛️', name:'Elgato Stream Deck', note:'Un lujo para no andar buscando atajos de teclado a media grabación.'},
      {emoji:'🔊', name:'Amazon Echo (Alexa)', note:'Más para el día a día que para grabar, pero forma parte del set.'},
      {emoji:'💡', name:'Iluminación TP-Link Tapo', note:'Barata, controlable desde el móvil, y suficiente para no grabar con cara de zombi.'}
    ];
    const techSecondPc = [
      {emoji:'🧪', name:'PC secundario', detail:'GTX 1080 · 16GB RAM · CPU antiguo', note:'De momento sin un propósito claro — algún día se convertirá en un proyecto de Charkuma Lab.'}
    ];
    function renderTechList(containerId, items){
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = items.map(it => `
        <div class="geek-card">
          <div class="geek-thumb">${it.emoji}</div>
          <div class="geek-info">
            <h4>${escapeHTML(it.name)}</h4>
            ${it.detail ? `<p class="yt-empty" style="margin:0 0 4px">${escapeHTML(it.detail)}</p>` : ''}
            ${it.note ? `<p>${escapeHTML(it.note)}</p>` : ''}
          </div>
        </div>`).join('');
    }
    function renderTechSetup(){
      renderTechList('techMainPcList', techMainPc);
      renderTechList('techStreamingList', techStreaming);
      renderTechList('techSecondPcList', techSecondPc);
    }

    const pendingDecisions = [
      // Vacío por ahora — la última pendiente (tarjetas de "Sobre mí") se completó el 2026-09-06.
    ];

    // ──────────────────────────────────────────────────────────
    // "🙋 Necesita tu ayuda" (Control Maestro) — pedido explícito de Iván
    // 9 sep: quiere verlo dentro del propio panel de control cada vez que
    // entra al sitio, poder contestar ahí mismo, y que Claude lo tenga en
    // cuenta en el siguiente /loop. A diferencia de `pendingDecisions` de
    // arriba (solo se puede OCULTAR, en local, sin forma de responder),
    // esto sí guarda la respuesta real en Firestore — mismo patrón que
    // `contentReview`/`gameMatch` — legible por Claude vía REST en
    // cualquier sesión futura, y sincronizado entre dispositivos.
    // Mantener esta lista a mano, igual que pendingDecisions: añadir un
    // ítem nuevo cuando de verdad haga falta algo de Iván, quitarlo del
    // array (no solo "ocultarlo") cuando ya esté resuelto.
    const HELP_NEEDED_ITEMS = [
      {
        id: 'video-url-real', num: '#20 · #84 · #180 · #247',
        title: 'El enlace real de un vídeo tuyo ya publicado',
        why: 'Cuatro tareas distintas (subtítulos, datos SEO por vídeo, respuestas a comentarios) están paradas por lo mismo: ningún guion tiene todavía el enlace real de un vídeo que hayas subido de verdad. Con uno solo, las cuatro se desbloquean a la vez.',
        type: 'text', placeholder: 'Pega aquí el link de un vídeo real ya publicado'
      },
    ];
    let helpNeededAnswers = {};
    function pushHelpNeededAnswer(id, value){
      helpNeededAnswers[id] = { value, savedAt: Date.now() };
      renderHelpNeeded();
      if (!firestoreReady()) return;
      const { doc, setDoc } = window.firestoreFns;
      setDoc(doc(window.firestoreDB, 'helpNeeded', 'state'), helpNeededAnswers, { merge: true }).catch(() => {
        // Sin conexión ahora mismo: se queda en memoria, sin cola de reintentos.
      });
    }
    let helpNeededRealtimeStarted = false;
    async function initHelpNeededRealtime(){
      if (!firestoreReady() || helpNeededRealtimeStarted) return;
      helpNeededRealtimeStarted = true;
      const { doc, onSnapshot } = window.firestoreFns;
      const ref = doc(window.firestoreDB, 'helpNeeded', 'state');
      onSnapshot(ref, (snap) => {
        if (snap.exists()) { helpNeededAnswers = snap.data() || {}; renderHelpNeeded(); }
      }, () => {
        // Sin conexión: se queda con lo que ya haya en memoria.
      });
    }
    function renderHelpNeeded(){
      const listEl = document.getElementById('helpNeededList');
      const countEl = document.getElementById('helpNeededCount');
      if (!listEl) return;
      const answeredCount = HELP_NEEDED_ITEMS.filter(i => helpNeededAnswers[i.id] && helpNeededAnswers[i.id].value).length;
      if (countEl) countEl.textContent = `— ${answeredCount}/${HELP_NEEDED_ITEMS.length} contestadas`;
      listEl.innerHTML = HELP_NEEDED_ITEMS.map(item => {
        const saved = helpNeededAnswers[item.id];
        const isAnswered = !!(saved && saved.value);
        let actionHTML;
        if (item.type === 'text') {
          actionHTML = `
            <div class="help-needed-actions">
              <input type="text" id="help-input-${item.id}" placeholder="${escapeAttr(item.placeholder)}" value="${isAnswered ? escapeAttr(saved.value) : ''}">
              <button type="button" class="btn btn-secondary" onclick="pushHelpNeededAnswer('${item.id}', document.getElementById('help-input-${item.id}').value.trim())">Guardar</button>
            </div>`;
        } else {
          actionHTML = `
            <div class="help-needed-actions">
              ${item.options.map(opt => `<button type="button" class="btn ${isAnswered && saved.value === opt ? 'btn-primary' : 'btn-secondary'}" onclick="pushHelpNeededAnswer('${item.id}', '${escapeAttr(opt)}')">${opt}</button>`).join('')}
            </div>`;
        }
        return `
          <div class="help-needed-item ${isAnswered ? 'is-answered' : ''}">
            <div class="help-needed-head">
              <div><div class="help-needed-num">${item.num}</div><h4>${item.title}</h4></div>
              <span class="type-chip ${isAnswered ? 'chip-green' : 'chip-orange'}">${isAnswered ? '✅ Contestado' : '⏳ Pendiente'}</span>
            </div>
            <p class="help-needed-why">${item.why}</p>
            ${actionHTML}
            ${isAnswered ? `<p class="help-needed-saved">Tu respuesta: "${escapeHTML(saved.value)}"</p>` : ''}
          </div>`;
      }).join('');
    }
    renderHelpNeeded();
    const DISMISSED_PENDING_KEY = 'charkuma_dismissed_pending_decisions';
    function loadDismissedPending(){
      try { return new Set(JSON.parse(localStorage.getItem(DISMISSED_PENDING_KEY)) || []); }
      catch (e) { return new Set(); }
    }
    function dismissPendingDecision(id){
      const set = loadDismissedPending();
      set.add(id);
      try { localStorage.setItem(DISMISSED_PENDING_KEY, JSON.stringify([...set])); } catch (e) {}
      renderPendingDecisions();
    }
    function renderPendingDecisions(){
      const widget = document.getElementById('pendingDecisionsWidget');
      const list = document.getElementById('pendingDecisionsList');
      if (!widget || !list) return;
      const dismissed = loadDismissedPending();
      const visible = pendingDecisions.filter(p => !dismissed.has(p.id));
      widget.hidden = visible.length === 0;
      list.innerHTML = visible.map(p => `
        <div class="pending-decision-item">
          <button type="button" class="pending-decision-check" onclick="dismissPendingDecision('${p.id}')" title="Ocultar en este navegador (para quitarla del código, dilo en el chat)">✅</button>
          <div class="pending-decision-text"><p>${escapeHTML(p.text)}</p><span>${p.date}</span></div>
        </div>`).join('');
    }
    renderPendingDecisions();

    document.getElementById('noteSaveBtn').addEventListener('click', addNote);
    document.getElementById('noteInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNote();
    });

    // Backlog #297 — borrador de la nota sin guardar: si escribes algo y
    // cierras/recargas antes de pulsar "Guardar", no se pierde. Se borra
    // solo en cuanto la nota se guarda de verdad (addNote la limpia).
    const NOTE_DRAFT_KEY = 'charkuma_noteDraft';
    (function initNoteDraft(){
      const input = document.getElementById('noteInput');
      if (!input) return;
      let draft = '';
      try { draft = localStorage.getItem(NOTE_DRAFT_KEY) || ''; } catch (e) { /* localStorage no disponible */ }
      if (draft) input.value = draft;
      input.addEventListener('input', () => {
        try { localStorage.setItem(NOTE_DRAFT_KEY, input.value); } catch (e) { /* localStorage no disponible */ }
      });
    })();

    initNotesRealtime();
    initHelpNeededRealtime();
    // initGameMatchRealtime() retirada 9 sep junto con la vista de Game
    // Match — los juegos del reto ya están decididos, no hace falta
    // seguir sincronizando su estado.
    initIdeaBanksRealtime();
    initContentReviewRealtime();
    initRankingScheduleRealtime();
    initUIPrefsRealtime();
    initBrowsingStateRealtime();
    initAudioGenRealtime();
    maybeRunWeeklyBackup();

    // Backlog #79 — manejo básico de "sin conexión" (ver sw.js: estrategia
    // "network-first", nunca sirve una versión vieja mientras haya red).
    // Registro fuera del hilo de arranque (no bloquea nada) y con su
    // propio try/catch — si el navegador no soporta service workers, o
    // el registro falla, la web sigue funcionando exactamente igual que
    // hasta ahora, sin este extra.
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {
          // Sin service worker disponible ahora mismo: seguimos sin él.
        });
      });
    }

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

    // Ahora sí: RETRO365_START_DATE, plannedGames y buildSiteIndex ya
    // están definidas, así que esta llamada es segura aquí al final.
    renderNotifications();
    renderActivityLog();
    renderAutonomousLoopStatus();
    renderRetroCalendarGrid();
