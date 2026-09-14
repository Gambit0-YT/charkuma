    // ══════════ 04-data-geekcontent-review.js ══════════
    // geekContent — metadatos de todos los guiones de Rincón del Friki (el HTML real de cada uno vive en index.html) — y el sistema de revisión (aprobar/descartar/fase/publicado) que se aplica a todo el contenido del sitio.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

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
        realPeople: [], internalView: "rf-curiosidades-spiderman", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "La Saga del Multiverso: ¿de verdad ha merecido la pena?",
        saga: "marvel",
        type: "opinion",
        date: "2026-08-24",
        summary: "Repaso honesto a lo que Marvel prometió con el multiverso y lo que realmente ha dado.",
        thumbnail: "🌀",
        realPeople: ["Tom Hiddleston"], internalView: "rf-opinion-multiverso", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real verificada con WebSearch 2026-09-09: adelanto
        // ("special look") de Avengers: Doomsday mostrado en el D23 Expo
        // 2026 (Anaheim), narrado por Sue Storm — Doom vence a Thor y
        // levanta un ejército de Centinelas. Ángulo distinto de
        // rf-opinion-doom-rdj (casting/reacción) y rf-doomsday-cruce-historico
        // (escala del cruce) — ver comentario completo junto al HTML.
        title: "Doctor Doom con un ejército de Centinelas: la escena que lo cambia todo en Avengers: Doomsday",
        saga: "marvel",
        type: "opinion",
        date: "2026-09-09",
        summary: "En el nuevo adelanto mostrado en el D23 Expo, Doom no solo vence a Thor — resucita a los robots cazamutantes de los X-Men delante de todos.",
        thumbnail: "🤖",
        realPeople: ["Chris Hemsworth","Vanessa Kirby"], internalView: "rf-opinion-doom-centinelas", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Fancast: ¿quién debería ser el próximo Wolverine?",
        saga: "marvel",
        type: "fancast",
        date: "2026-08-29",
        summary: "Tres candidatos con argumentos a favor, y mi favorito personal razonado.",
        thumbnail: "🐾",
        realPeople: ["Hugh Jackman","Scott Adkins","Karl Urban","Charlie Hunnam"], internalView: "rf-fancast-wolverine", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "The Boys vs Marvel: por qué esta serie me ha enganchado más",
        saga: "boys",
        type: "opinion",
        date: "2026-09-01",
        summary: "Por qué, pese a lo dura que es, The Boys me está gustando más que el rumbo actual de Marvel.",
        thumbnail: "🩸",
        realPeople: ["Antony Starr"], internalView: "rf-boys-vs-marvel", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Lo que no sabías sobre Homelander",
        saga: "boys",
        type: "curiosidad",
        date: "2026-09-04",
        summary: "Inspiración real y detalles de guion detrás del villano más inquietante de la serie.",
        thumbnail: "🦸",
        realPeople: ["Antony Starr"], internalView: "rf-curiosidades-homelander", reviewed: false, stage: 'creando-guion'
      },
      {
        title: "Homelander vs Thanos: ¿quién ganaría?",
        saga: "cruce",
        type: "batalla",
        date: "2026-09-06",
        summary: "Comparativa de poderes, debilidades y escenario de combate entre los dos.",
        thumbnail: "⚔️",
        internalView: "rf-batalla-homelander-thanos", reviewed: false
      },
      {
        // Backlog-adjacent: idea "opinion-9" del banco secreto de Rincón del
        // Friki, marcada "hecha" por el usuario pero sin guion todavía —
        // convertida a contenido real siguiendo la regla nueva de
        // [[charkuma-autonomous-loop-rules]] (escribir guiones nuevos para
        // ideas ya aprobadas cuando no queda nada más que hacer). Tema
        // elegido a propósito por ser atemporal (no depende de ningún
        // estreno "actual" que habría que inventarse).
        title: "Por dónde empezar en Marvel y The Boys si no has visto nada",
        saga: "cruce",
        type: "opinion",
        date: "2026-09-07",
        summary: "Mi ranking real de por dónde empezar en cada universo, sin marear con 30 títulos.",
        thumbnail: "🧭",
        realPeople: ["Robert Downey Jr."], internalView: "rf-ranking-empezar", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-1" del banco secreto, marcada "hecha" — distinta de
        // "rf-curiosidades-homelander" (esa es trivia/inspiración real del
        // personaje; esta es análisis de por qué funciona como villano,
        // ángulo distinto, sin repetir contenido).
        title: "Homelander, explicado desde cero: por qué es de los villanos más interesantes de la ficción actual",
        saga: "boys",
        type: "opinion",
        date: "2026-09-07",
        summary: "Análisis de por qué el contraste entre su imagen pública y su psicopatía real lo convierte en uno de los villanos más interesantes de la ficción actual.",
        thumbnail: "🎭",
        realPeople: ["Antony Starr"], internalView: "rf-opinion-homelander", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-6" del banco secreto ("este personaje secundario
        // merece su propio hueco") — elegido The Deep por ser un
        // secundario real y ya establecido, sin depender de ningún
        // estreno actual.
        title: "The Deep: el personaje secundario que merece su propio hueco",
        saga: "boys",
        type: "opinion",
        date: "2026-09-07",
        summary: "Por qué el personaje más ridiculizado del grupo se ha convertido en uno de los arcos más interesantes de The Boys.",
        thumbnail: "🐬",
        realPeople: ["Chace Crawford"], internalView: "rf-opinion-deep", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-2" del banco secreto ("la peli/serie Marvel del
        // momento") — datos reales verificados con WebSearch 2026-09-07
        // (fecha de estreno, reparto, sinopsis sin spoilers, recepción y
        // taquilla), no inventados.
        title: "Por qué Spider-Man: Brand New Day merece que le des una oportunidad",
        saga: "marvel",
        type: "opinion",
        date: "2026-09-07",
        summary: "Reparto ampliado, tono más maduro y una recepción real (2.400M$ en taquilla) — por qué merece la pena, sin spoilers.",
        thumbnail: "🕷️",
        realPeople: ["Tom Holland","Zendaya","Jon Bernthal","Florence Pugh","Mark Ruffalo"], internalView: "rf-opinion-brand-new-day", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-11" del banco secreto ("el regreso de una saga
        // clásica") — datos reales verificados con WebSearch 2026-09-07:
        // actores clásicos de X-Men confirmados en Avengers: Doomsday, y
        // reboot completo confirmado para mayo de 2028 dirigido por Jake
        // Schreier, con reparto nuevo anunciado.
        title: "El regreso de los X-Men a Marvel: por qué me da más ilusión que miedo",
        saga: "marvel",
        type: "opinion",
        date: "2026-09-07",
        summary: "Actores clásicos vuelven en Avengers: Doomsday y ya hay un reboot completo confirmado para 2028 — lo bueno y el riesgo real de traer de vuelta una saga tan querida.",
        thumbnail: "🦾",
        realPeople: ["James Marsden","Kelsey Grammer","Rebecca Romijn","Alan Cumming"], internalView: "rf-opinion-regreso-xmen", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-7" del banco secreto ("el villano de moda ahora
        // mismo") — datos reales verificados con WebSearch 2026-09-08:
        // Robert Downey Jr. como Doctor Doom en Avengers: Doomsday (18
        // dic 2026) y Avengers: Secret Wars, reacción inicial dividida,
        // conexión real con los 4 Fantásticos confirmada en tráiler.
        title: "Robert Downey Jr. como Doctor Doom: el villano más comentado de Marvel ahora mismo",
        saga: "marvel",
        type: "opinion",
        date: "2026-09-08",
        summary: "El actor que fue Iron Man más de una década ahora es Doctor Doom — por qué el escepticismo inicial se está convirtiendo en curiosidad real.",
        thumbnail: "🎭",
        realPeople: ["Robert Downey Jr.","Vanessa Kirby"], internalView: "rf-opinion-doom-rdj", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "curiosidad-0" del banco secreto ("10 datos curiosos sobre
        // el origen de un personaje que está de actualidad") — Doctor Doom
        // elegido por ser el villano del momento (ver rf-opinion-doom-rdj).
        // Datos reales verificados con WebSearch 2026-09-08: creado por
        // Stan Lee y Jack Kirby (Los 4 Fantásticos #5, 1962), origen en
        // Latveria, pacto de su madre con Mephisto, cicatrices por un
        // experimento propio en la universidad.
        title: "Lo que no sabías sobre el origen real de Doctor Doom",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "Magia, un pacto con un demonio y un error propio que decidió ignorar — el origen real del villano más comentado de Marvel ahora mismo.",
        thumbnail: "🪄",
        realPeople: ["Stan Lee","Jack Kirby"], internalView: "rf-curiosidades-doom", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "curiosidad-3" del banco secreto ("datos curiosos del
        // actor o actriz protagonista de lo que está en boca de todos")
        // — Tom Holland elegido por ser el protagonista de Brand New Day
        // (ver rf-opinion-brand-new-day). Datos reales verificados con
        // WebSearch 2026-09-08: musical de Billy Elliot con 10 años,
        // gimnasia de niño, se enteró del papel por Instagram, pésimo
        // guardando secretos (Avengers: Endgame no le dio el guion
        // completo).
        title: "6 curiosidades de Tom Holland que no sabías",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "De bailarín de musical a Spider-Man más joven de la historia — datos reales del protagonista de la película Marvel del momento.",
        thumbnail: "🕷️",
        realPeople: ["Tom Holland"], internalView: "rf-curiosidades-tom-holland", reviewed: false, stage: 'creando-guion'
      },
      {
        // Idea "opinion-4" del banco secreto ("por qué prefiero las
        // historias de superhéroes sucias a las clásicas") — atemporal,
        // no requiere investigación de un estreno concreto.
        title: "Por qué prefiero los superhéroes 'sucios' a los clásicos (para quien no ha visto ninguno)",
        saga: "cruce",
        type: "opinion",
        date: "2026-09-08",
        summary: "Consecuencias reales, héroes que son personas y no símbolos, sátira con intención — por qué prefiero este tono, explicado para quien no ha visto ninguna de las dos cosas.",
        thumbnail: "🩸",
        realPeople: [], internalView: "rf-opinion-superheroes-sucios", reviewed: false, stage: 'creando-guion'
      },
      {
        // Backlog #229 — "si X e Y se cruzaran": Iván pidió no forzar un
        // cruce inventado, esperar a un ángulo real. Encontrado 14 sep vía
        // WebSearch: Marvel y DC llevan desde 2025 publicando un cruce
        // real de cómics por el 50 aniversario del primer cruce de la
        // historia (Superman vs. The Amazing Spider-Man, 1976) — incluye
        // Superman/Spider-Man #1 y Spider-Man/Superman #1 (historia
        // principal de Brad Meltzer y Pepe Larraz), varias historias
        // extra, y un recopilatorio "DC/Marvel: The Cosmic Kiss Caper &
        // Other Stories" que llega el 8 de septiembre de 2026. Fuentes:
        // dc.com (blog oficial + página del propio cómic), marvel.com
        // (página oficial del cómic + artículo de variant covers).
        title: "Superman y Spider-Man, juntos: el cruce más grande entre Marvel y DC en 50 años",
        saga: "cruce",
        type: "curiosidad",
        date: "2026-09-14",
        summary: "Medio siglo después del primer cruce de la historia entre las dos editoriales, Marvel y DC vuelven a juntar a sus dos héroes más icónicos — qué pasa en el cómic y quién está detrás.",
        thumbnail: "🕸️",
        internalView: "rf-cruce-superman-spiderman", reviewed: false, stage: 'creando-guion'
      },
      {
        // Backlog #230 — "Anacronismos y errores de continuidad": mismo
        // criterio que #229, solo con un error REAL y OFICIALMENTE
        // reconocido por Marvel Studios, no una interpretación mía de
        // fan — verificado con WebSearch 14 sep. El cartel real de
        // "Spider-Man: Homecoming" (2017) decía "8 años después" de "Los
        // Vengadores" (2012), pero el resto de la película transcurre
        // claramente meses después de "Civil War" (2016) — 4 años, no 8.
        // El propio libro oficial "Marvel Studios' The Marvel Cinematic
        // Universe: An Official Timeline" lo corrigió años después
        // (escena inicial: primavera 2012; resto de la película: otoño
        // 2016), usando a Miss Minutes (de "Loki") para reconocerlo con
        // humor. Fuentes: screenrant.com, collider.com, thedirect.com.
        title: "El error de línea temporal que Marvel tardó años en admitir",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-14",
        summary: "El cartel de \"Spider-Man: Homecoming\" decía \"8 años después\" — pero la propia guía oficial de Marvel confirmó, años después, que en realidad eran 4.",
        thumbnail: "🕰️",
        internalView: "rf-mcu-homecoming-error", reviewed: false, stage: 'creando-guion'
      },
      {
        // Pedido explícito del usuario 2026-09-08 ("sigue creando vídeos
        // para el Rincón del Friki a partir de noticias sobre
        // superhéroes y cultura geek que vayas encontrando") — ya no
        // atado a una idea concreta del banco, sino a noticias reales
        // encontradas con WebSearch. Datos verificados 2026-09-08: David
        // Jonsson (32 años, "Industry", "Rye Lane", "Alien: Romulus")
        // anunciado en la San Diego Comic-Con 2026 como Toussaint/T'Challa
        // II (no un reemplazo de T'Challa) para Black Panther III (15
        // dic 2028) — Ryan Coogler lo identificó personalmente.
        title: "Quién es David Jonsson, el nuevo Black Panther de Marvel",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "No es un reemplazo de T'Challa — es su hijo. Quién es el actor elegido y cómo llegó al papel, sin casting formal de por medio.",
        thumbnail: "🐾",
        realPeople: ["David Jonsson","Ryan Coogler"], internalView: "rf-nuevo-black-panther", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real encontrada con WebSearch 2026-09-08 (mismo modo de
        // trabajo que rf-nuevo-black-panther): Ryan Gosling confirmado
        // como Johnny Blaze/Ghost Rider en la SDCC 2026, dirigido por
        // Shawn Levy, estreno 28 julio 2028 — Gosling llevaba años
        // pidiendo el papel públicamente; él y Levy ruedan juntos ahora
        // mismo "Star Wars: Starfighter".
        title: "Ryan Gosling será Ghost Rider: la historia real detrás del anuncio",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "Llevaba años pidiendo el papel en público — cómo una amistad real con el director hizo posible este fichaje para 2028.",
        thumbnail: "🔥",
        realPeople: ["Ryan Gosling","Shawn Levy"], internalView: "rf-ryan-gosling-ghost-rider", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real encontrada con WebSearch 2026-09-08: Avengers:
        // Doomsday reunirá por primera vez en el cine a Vengadores,
        // X-Men, Thunderbolts y 4 Fantásticos — incluye el reparto real
        // de "Primeros Pasos" (2025, 521M$ en taquilla) y el debut de
        // Ghost Rider (Ryan Gosling) antes de su propia película.
        title: "Avengers: Doomsday será el cruce más grande de la historia del cine",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "Vengadores, X-Men, Thunderbolts y 4 Fantásticos, todos en la misma película por primera vez — qué hace tan arriesgada esta apuesta.",
        thumbnail: "⚡",
        realPeople: ["Pedro Pascal","Vanessa Kirby","Joseph Quinn","Ebon Moss-Bachrach","James Marsden","Kelsey Grammer","Ryan Gosling"], internalView: "rf-doomsday-cruce-historico", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real encontrada con WebSearch 2026-09-08: precuela real
        // "Vought Rising" (años 50, origen de Vought, Soldier Boy y
        // Stormfront, 2027), cancelación real de Gen V tras 2 temporadas,
        // y "The Boys: México" (versión en español, producción de Diego
        // Luna) — sin spoilers del final de la T5 ya emitida.
        title: "Vought Rising y las nuevas expansiones reales del universo The Boys",
        saga: "boys",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "Una precuela ambientada en los 50, y una versión hecha en español en México — lo que se ha confirmado de verdad tras el final de la serie.",
        thumbnail: "🩸",
        realPeople: ["Diego Luna"], internalView: "rf-vought-rising", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real y muy próxima en fecha, encontrada con WebSearch
        // 2026-09-08: "Avengers: Endgame Encore" vuelve a cines el 25 de
        // septiembre de 2026 (IMAX + "Infinity Vision"), con ~4 min de
        // metraje inédito (185 min totales) que sirve de puente hacia
        // Doomsday, más un adelanto exclusivo del propio Doomsday.
        title: "Avengers: Endgame vuelve al cine el 25 de septiembre con escenas nunca vistas",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        // Backlog #302 (9 sep, pedido explícito de Iván): "el vídeo se
        // tiene que subir ANTES de que ocurra lo que cuenta" — este
        // guion pierde casi todo su sentido si se publica después del
        // reestreno real. `deadline` = fecha real del evento, para que
        // Bandeja de Guiones lo resalte con la urgencia correcta.
        deadline: "2026-09-25",
        summary: "4 minutos de metraje inédito y un adelanto exclusivo de Doomsday — todo lo real sobre el reestreno de Endgame este mes.",
        thumbnail: "🎬",
        realPeople: ["Robert Downey Jr."], internalView: "rf-endgame-encore", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real encontrada con WebSearch 2026-09-08: Chris Evans
        // regresa como Steve Rogers y Hayley Atwell como Peggy Carter en
        // Avengers: Doomsday, anunciado en SDCC 2026 — cita real de
        // Atwell ("no puedes tener a Steve sin Peggy"), varios medios
        // apuntan a que no es la Peggy que se recuerda, y la propia
        // actriz admite no haber visto el montaje final.
        title: "Chris Evans y Hayley Atwell vuelven a Marvel: Steve y Peggy en Avengers Doomsday",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "Ni la propia actriz sabe todos los detalles — todo lo confirmado de verdad sobre el regreso de Steve Rogers y Peggy Carter.",
        thumbnail: "🛡️",
        realPeople: ["Chris Evans","Hayley Atwell"], internalView: "rf-steve-peggy-regreso", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real encontrada con WebSearch 2026-09-08: "VisionQuest"
        // (Disney+, 14 oct 2026), miniserie de 8 episodios que cierra la
        // trilogía WandaVision → Agatha Todo Menos Una Bruja → VisionQuest.
        // Paul Bettany vuelve como Visión, James Spader como Ultrón,
        // James D'Arcy (J.A.R.V.I.S.), Orla Brady (F.R.I.D.A.Y.),
        // showrunner Terry Matalas (Star Trek: Picard).
        title: "VisionQuest: la serie que cierra la trilogía de Visión llega en octubre",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        summary: "El regreso de Ultrón es la sorpresa que nadie esperaba — todo lo confirmado sobre la miniserie que cierra la historia de Visión.",
        thumbnail: "🤖",
        realPeople: ["Paul Bettany","James Spader","James D'Arcy","Orla Brady"], internalView: "rf-visionquest", reviewed: false, stage: 'creando-guion'
      },
      {
        // Noticia real y muy próxima en fecha (exactamente una semana),
        // encontrada con WebSearch 2026-09-08: "Marvel's Wolverine" de
        // Insomniac Games sale en PS5 el 15 de septiembre de 2026 —
        // trama (pasado olvidado de Logan), villanos (Reavers, Omega
        // Red), y localizaciones reales (Canadá, Tokio, Madripoor).
        title: "Marvel's Wolverine: todo lo confirmado antes de su estreno el 15 de septiembre",
        saga: "marvel",
        type: "curiosidad",
        date: "2026-09-08",
        deadline: "2026-09-15", // ver nota de #302 en rf-endgame-encore — el más urgente de todos ahora mismo
        summary: "Del mismo estudio que Marvel's Spider-Man — trama, combate y los tres escenarios reales del videojuego que sale en una semana.",
        thumbnail: "🦾",
        realPeople: [], internalView: "rf-marvels-wolverine-game", reviewed: false, stage: 'creando-guion'
      },
      {
        // Primer guion de la nueva categoría "dc" (backlog, 9 sep).
        // Noticia real verificada con WebSearch 2026-09-09: DC Studios
        // retrasó "Clayface" del 11 de septiembre al 23 de octubre de
        // 2026 para descongestionar el calendario de la DCU (Supergirl
        // 26 junio, Lanterns en HBO a finales de verano) y encajarla
        // mejor de cara a Halloween por ser una peli de terror corporal.
        // Dirige James Watkins, guion de Mike Flanagan, protagonizada
        // por Tom Rhys Harries como Matt Hagen — fuentes: thedirect.com,
        // screenrant.com.
        title: "Clayface cambia de fecha: por qué la primera peli de terror del universo DC se retrasa",
        saga: "dc",
        type: "curiosidad",
        date: "2026-09-09",
        deadline: "2026-10-23", // ver nota de #302 en rf-endgame-encore
        summary: "DC mueve su primera peli de terror corporal de septiembre a octubre — la razón real (y por qué encaja mejor así) detrás del cambio.",
        thumbnail: "🎃",
        realPeople: ["Mike Flanagan"], internalView: "rf-dc-clayface", reviewed: false, stage: 'creando-guion'
      },
      {
        // Primer guion de la saga "dragonball" (9 sep). Noticia real
        // verificada con WebSearch: en el evento oficial "Genkidamatsuri"
        // (25 enero 2026, 40 aniversario) Toei confirmó "Dragon Ball
        // Super: Beerus", un remake/"enhanced edition" del arco de
        // Beerus basado en el guion original de Akira Toriyama, con
        // cortes nuevos y escenas re-grabadas — estreno confirmado 11 de
        // octubre de 2026 (a un mes de hoy). Reparto confirmado: Masako
        // Nozawa (Goku), Koichi Yamadera (Beerus), Akio Iyoku (productor
        // ejecutivo). Fuentes: dragon-ball-official.com, animecorner.me.
        title: "Dragon Ball Super: Beerus se estrena en octubre — todo lo confirmado del remake",
        saga: "dragonball",
        type: "curiosidad",
        date: "2026-09-09",
        deadline: "2026-10-11", // ver nota de #302 en rf-endgame-encore
        summary: "El arco de Beerus vuelve reconstruido con el guion original de Toriyama — fecha confirmada, qué cambia y quién está detrás.",
        thumbnail: "🐉",
        realPeople: ["Masako Nozawa"], internalView: "rf-dragonball-beerus-remake", reviewed: false, stage: 'creando-guion'
      },
      {
        // Primer guion de la saga "directores" (9 sep). Noticia real
        // verificada con WebSearch + Wikipedia: "The Odyssey" de
        // Christopher Nolan (estrenada 17 julio 2026) es la primera
        // película rodada ÍNTEGRAMENTE con cámaras IMAX 70mm (más de 2
        // millones de pies de película, ~3M$ solo en material), y ya es
        // la película R-rated más taquillera de la historia ($1.638Bn
        // mundial sobre 250M$ de presupuesto, 2ª más taquillera de 2026).
        // No lleva `deadline`: no es una noticia con fecha futura que
        // "caduque" el vídeo, es un logro ya consumado.
        title: "The Odyssey ya es historia del cine: la primera peli rodada solo en IMAX 70mm",
        saga: "directores",
        type: "curiosidad",
        date: "2026-09-09",
        summary: "Christopher Nolan rodó una película entera sin ni una sola cámara digital — y ya es la R-rated más taquillera de siempre.",
        thumbnail: "🎬",
        realPeople: [], internalView: "rf-directores-nolan-odyssey", reviewed: false, stage: 'creando-guion'
      }
      // { title:"...", saga:"marvel|boys|cruce|dc|dragonball|directores", type:"reaccion|curiosidad|opinion|fancast|batalla",
      //   date:"AAAA-MM-DD", summary:"...", thumbnail:"🎬", videoUrl:"..." },
      // "dc" y "dragonball" son sagas propias (no cruces con Marvel/Boys).
      // "directores" es para películas sueltas de los 10 directores reconocidos
      // de la lista de charkuma-autonomous-loop-rules.md — no forman una saga
      // real entre sí, se agrupan aquí solo como categoría de "cine de autor".
    ];

    const SAGA_LABELS = { marvel:"🅼 Marvel", boys:"🅱️ The Boys", cruce:"⚔️ Cruce", dc:"🦇 DC", dragonball:"🐉 Dragon Ball", directores:"🎬 Directores" };
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

    // ──────────────────────────────────────────────────────────
    // DESCARTAR contenido ya generado (distinto de "revisado"): marca
    // que ese vídeo/idea concreto NO se va a hacer, para que deje de
    // salir en "Explorar universo", el carrusel "en proceso" y el
    // calendario. Mismo patrón que isReviewed/markReviewed.
    // ──────────────────────────────────────────────────────────
    const DISCARDED_CONTENT_KEY = 'charkuma_discarded_content';

    function loadDiscardedContentSet(){
      try { return new Set(JSON.parse(localStorage.getItem(DISCARDED_CONTENT_KEY)) || []); }
      catch (e) { return new Set(); }
    }
    function isContentDiscarded(id){
      return loadDiscardedContentSet().has(id);
    }
    function setContentDiscarded(id, discarded){
      const set = loadDiscardedContentSet();
      if (discarded) set.add(id); else set.delete(id);
      try { localStorage.setItem(DISCARDED_CONTENT_KEY, JSON.stringify(Array.from(set))); }
      catch (e) { /* seguimos sin recordarlo, sin romper nada */ }
    }

    // "En proceso" ya no es un único estado — son 4 fases seguidas
    // (creando guion → editando vídeo → remates finales → listo para
    // publicar), cada contenido guarda EN CUÁL está (o ninguna, si
    // todavía no se ha empezado). Se guarda como un mapa rid→fase en
    // vez de 4 sets sueltos, porque son fases excluyentes entre sí,
    // no banderas independientes.
    const CONTENT_STAGE_KEY = 'charkuma_content_stage';
    const CONTENT_STAGE_ORDER = ['creando-guion', 'editando-video', 'remates-finales', 'listo-publicar'];
    const CONTENT_STAGE_LABELS = {
      'creando-guion': '✍️ Creando guion',
      'editando-video': '🎬 Editando vídeo',
      'remates-finales': '✨ Remates finales',
      'listo-publicar': '🚀 Listo para publicar'
    };

    function loadContentStageMap(){
      try { return JSON.parse(localStorage.getItem(CONTENT_STAGE_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveContentStageMap(map){
      try { localStorage.setItem(CONTENT_STAGE_KEY, JSON.stringify(map)); }
      catch (e) { /* seguimos sin recordarlo, sin romper nada */ }
    }
    // La fase puede venir de dos sitios: una base fija en el propio
    // código (item.stage, para cuando Claude avanza un guion durante el
    // loop y quiere que se vea igual en cualquier dispositivo) o una
    // marca manual en este navegador (localStorage, para cuando tú la
    // cambias a mano) — el localStorage manda si existe. 'none' es un
    // valor explícito ("he retrocedido por debajo de la base del
    // código"), distinto de "no hay nada guardado" (ausente del mapa).
    function getContentStage(id){
      const stored = loadContentStageMap()[id];
      if (stored === 'none') return null;
      if (stored) return stored;
      const item = findContentItemByView(id);
      return (item && item.stage) || null;
    }
    function setContentStage(id, stage){
      const map = loadContentStageMap();
      map[id] = stage || 'none';
      saveContentStageMap(map);
    }
    // "En proceso" (en sentido amplio) = está en cualquiera de las 4 fases.
    function isContentInProgress(id){
      return CONTENT_STAGE_ORDER.includes(getContentStage(id));
    }

    // "Publicado": el vídeo ya está subido de verdad. Se puede marcar a
    // mano, o (solo para Retro 365, ver checkRetro365AutoPublish) sola
    // si detecta el hashtag #Reto365 + el nombre del juego en un vídeo
    // reciente de YouTube.
    const PUBLISHED_CONTENT_KEY = 'charkuma_published_content';

    function loadPublishedContentSet(){
      try { return new Set(JSON.parse(localStorage.getItem(PUBLISHED_CONTENT_KEY)) || []); }
      catch (e) { return new Set(); }
    }
    function isContentPublished(id){
      return loadPublishedContentSet().has(id);
    }
    function setContentPublished(id, published){
      const set = loadPublishedContentSet();
      if (published) set.add(id); else set.delete(id);
      try { localStorage.setItem(PUBLISHED_CONTENT_KEY, JSON.stringify(Array.from(set))); }
      catch (e) { /* seguimos sin recordarlo, sin romper nada */ }
    }

    // Busca, en todos los arrays de contenido, el objeto que corresponde
    // a una vista concreta (por su internalView) — para saber si esa
    // página es "contenido revisable" y poder pintar sus controles.
    function findContentItemByView(viewId){
      const sources = [geekContent, iaContent, creatorContent, hechoContent, labContent, helquidGamesContent];
      for (const arr of sources) {
        const found = arr.find(i => i.internalView === viewId);
        if (found) return found;
      }
      return null;
    }

    // Devuelve el estado real (4 posibles) de un contenido, combinando
    // los tres sets independientes de localStorage. Descartado manda
    // sobre todo lo demás; en proceso manda sobre aprobado.
    function getContentStatus(item, rid){
      rid = rid || item.internalView || item.title;
      if (isContentDiscarded(rid)) return 'descartado';
      if (isContentPublished(rid)) return 'publicado';
      const stage = getContentStage(rid);
      if (stage) return stage; // creando-guion / editando-video / remates-finales / listo-publicar
      if (item.reviewed !== false || isReviewed(rid)) return 'aprobado';
      return 'pendiente';
    }
    const CONTENT_STATUS_LABELS = Object.assign({
      pendiente: '⏳ Pendiente', aprobado: '✅ Aprobada',
      publicado: '📤 Publicado', descartado: '🗑️ Descartada'
    }, CONTENT_STAGE_LABELS);
    const CONTENT_STATUS_CHIPCLASS = Object.assign({
      pendiente: 'chip-yellow', aprobado: 'chip-green',
      publicado: 'chip-blue', descartado: 'chip-red'
    }, Object.fromEntries(CONTENT_STAGE_ORDER.map(s => [s, 'chip-orange'])));

    // Bloque grande de "✅ Aprobar / fase ◀▶ / 📤 Publicado / 🗑️
    // Descartar / → Siguiente" que se inyecta en la cabecera de la
    // propia página de detalle (no solo la insignia pequeña del
    // kicker) — reversible en todos los sentidos.
    // Backlog #25 — prioridad manual (alta/media/baja) por idea
    // aprobada: decisión 100% del usuario, Claude solo guarda y
    // muestra lo que él elija — nunca la asigna sola.
    const CONTENT_PRIORITY_KEY = 'charkuma_content_priority';
    const PRIORITY_LABELS = { alta: '🔴 Alta', media: '🟡 Media', baja: '🟢 Baja' };
    function loadContentPriorityMap(){
      try { return JSON.parse(localStorage.getItem(CONTENT_PRIORITY_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveContentPriorityMap(map){
      try { localStorage.setItem(CONTENT_PRIORITY_KEY, JSON.stringify(map)); }
      catch (e) { /* seguimos sin guardar, sin romper nada */ }
    }
    function getContentPriority(rid){
      return loadContentPriorityMap()[rid] || '';
    }
    function setContentPriority(rid, priority){
      const map = loadContentPriorityMap();
      if (priority) map[rid] = priority; else delete map[rid];
      saveContentPriorityMap(map);
      refreshReviewControls();
      if (typeof renderMasterControlList === 'function') renderMasterControlList();
    }
    function priorityControlHTML(rid){
      const current = getContentPriority(rid);
      const options = ['', 'alta', 'media', 'baja'].map(p =>
        `<option value="${p}" ${current === p ? 'selected' : ''}>${p ? PRIORITY_LABELS[p] : 'Sin prioridad'}</option>`
      ).join('');
      return `
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);flex-basis:100%">
          Prioridad:
          <select onchange="setContentPriority('${rid}', this.value)" style="padding:6px 10px;border-radius:8px;border:1px solid var(--line2);background:var(--panel);color:var(--text);font-family:inherit">${options}</select>
        </label>`;
    }

    // Backlog #34 — coste de producción estimado por idea aprobada:
    // igual que la prioridad (#25), una estimación manual del propio
    // usuario en tiempo/esfuerzo (no dinero, ya que no hay costes reales
    // que calcular aquí) — Claude solo guarda y muestra lo que él elija.
    const CONTENT_COST_KEY = 'charkuma_content_cost';
    const COST_LABELS = { bajo: '🟢 Bajo (una tarde)', medio: '🟡 Medio (varios días)', alto: '🔴 Alto (una semana o más)' };
    function loadContentCostMap(){
      try { return JSON.parse(localStorage.getItem(CONTENT_COST_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function saveContentCostMap(map){
      try { localStorage.setItem(CONTENT_COST_KEY, JSON.stringify(map)); }
      catch (e) { /* seguimos sin guardar, sin romper nada */ }
    }
    function getContentCost(rid){
      return loadContentCostMap()[rid] || '';
    }
    function setContentCost(rid, cost){
      const map = loadContentCostMap();
      if (cost) map[rid] = cost; else delete map[rid];
      saveContentCostMap(map);
      refreshReviewControls();
      if (typeof renderMasterControlList === 'function') renderMasterControlList();
    }
    function costControlHTML(rid){
      const current = getContentCost(rid);
      const options = ['', 'bajo', 'medio', 'alto'].map(c =>
        `<option value="${c}" ${current === c ? 'selected' : ''}>${c ? COST_LABELS[c] : 'Sin estimar'}</option>`
      ).join('');
      return `
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);flex-basis:100%">
          Coste de producción:
          <select onchange="setContentCost('${rid}', this.value)" style="padding:6px 10px;border-radius:8px;border:1px solid var(--line2);background:var(--panel);color:var(--text);font-family:inherit">${options}</select>
        </label>`;
    }

    // Backlog #17 — estimación de duración por beat: lee la narración
    // real ("🎙️ Off:") ya escrita en el guion de la propia página (DOM,
    // no un campo aparte — los guiones de los 6 bancos viven como HTML
    // estático) y calcula segundos por ritmo de habla, nunca un número
    // inventado. Los beats sin narración directa (p. ej. un desarrollo
    // en lista de puntos) se muestran sin estimar, en vez de forzar un
    // número sin base real.
    const NARRATION_WORDS_PER_SECOND = 2.6; // ritmo rápido tipo TikTok/Shorts

    // Encuentra el panel de guion dentro de una vista y extrae sus beats
    // (título de cada h4 + narración "🎙️ Off" si la tiene) — compartido
    // entre la estimación de duración (#17) y el modo grabación (#18),
    // para no reimplementar el mismo recorrido del DOM dos veces.
    function findGuionPanel(target){
      if (!target) return null;
      const guionPanel = [...target.querySelectorAll('details.month')]
        .find(d => /guion/i.test(d.querySelector('summary span')?.textContent || ''));
      return guionPanel && guionPanel.querySelector('.month-body .panel');
    }
    // Cada beat puede tener más de una frase de narración (p. ej. un
    // "Tesis" / "A favor" / "En contra" en el mismo bloque), y cada una
    // puede llevar su propia dirección de interpretación ("🎭 Tono:",
    // pedida por el usuario) — por eso además del texto agregado
    // (beat.text, para la estimación de duración de #17) se guarda
    // segments: [{text, tone}] con cada frase suelta y su tono, para
    // que el modo grabación pueda mostrarlas una a una con su tono.
    function extractGuionBeats(panel){
      const beats = [];
      let current = null;
      let lastSegment = null;
      [...panel.children].forEach(el => {
        if (el.tagName === 'H4') {
          current = { heading: el.textContent.trim(), words: 0, hasNarration: false, text: '', segments: [] };
          beats.push(current);
          lastSegment = null;
          return;
        }
        if (!current || el.tagName !== 'P') return;
        const strong = el.querySelector('strong');
        if (!strong) return;
        const label = strong.textContent;
        if (label.includes('🎙️ Off')) {
          const text = el.textContent.replace(label, '').trim();
          current.words += text.split(/\s+/).filter(Boolean).length;
          current.hasNarration = true;
          current.text += (current.text ? ' ' : '') + text;
          lastSegment = { text, tone: '' };
          current.segments.push(lastSegment);
        } else if (label.includes('🎭 Tono') && lastSegment && !lastSegment.tone) {
          lastSegment.tone = el.textContent.replace(label, '').trim();
        }
      });
      return beats;
    }

    // Backlog #227 — "Shorts semanales": recorte automático de un guion
    // YA ESCRITO Y APROBADO, nunca contenido nuevo — reutiliza exactamente
    // el mismo extractGuionBeats()/findGuionPanel() que ya usa el modo
    // grabación. Se queda con Hook + Giro (el "momento más fuerte" que el
    // propio guion ya identifica) + CTA; si el guion no tiene beat de
    // Giro (algunos de opinión no lo llevan), cae a Desarrollo en su
    // lugar. Ni una palabra reescrita — es el mismo texto tal cual ya
    // está aprobado, solo mostrado más corto para una versión de Shorts.
    function extractShortVersionText(rid){
      const scope = document.querySelector('.app-view.active');
      const panel = findGuionPanel(scope);
      if (!panel) return null;
      const beats = extractGuionBeats(panel).filter(b => b.hasNarration);
      if (!beats.length) return null;
      const findBeat = (re) => beats.find(b => re.test(b.heading));
      const hook = findBeat(/hook/i);
      const giro = findBeat(/giro/i) || findBeat(/desarrollo/i);
      const cta = findBeat(/cta/i);
      const picked = [hook, giro, cta].filter(Boolean);
      if (!picked.length) return null;
      return picked.map(b => `${b.heading}\n${b.text}`).join('\n\n');
    }
    // Backlog #228 — "Un dato, un minuto": mismo mecanismo y mismo modal
    // que #227, pero se queda con un ÚNICO beat (Contexto — "lo mínimo
    // que hace falta saber para entender el resto", el más parecido a un
    // dato concreto en la plantilla real de guion; Desarrollo como
    // alternativa si ese guion no tiene Contexto con narración). Nunca
    // decide "cuál es EL dato curioso" por su cuenta con una frase suelta
    // sacada de contexto — eso sí sería un juicio editorial que no le
    // corresponde tomar solo; se queda con el beat completo tal cual.
    function extractOneFactVersionText(rid){
      const scope = document.querySelector('.app-view.active');
      const panel = findGuionPanel(scope);
      if (!panel) return null;
      const beats = extractGuionBeats(panel).filter(b => b.hasNarration);
      if (!beats.length) return null;
      const findBeat = (re) => beats.find(b => re.test(b.heading));
      const beat = findBeat(/contexto/i) || findBeat(/desarrollo/i);
      if (!beat) return null;
      return `${beat.heading}\n${beat.text}`;
    }
    function openShortVersionModal(rid, mode){
      const modal = document.getElementById('shortVersionModal');
      const textarea = document.getElementById('shortVersionText');
      const title = document.getElementById('shortVersionTitle');
      const note = document.getElementById('shortVersionNote');
      if (!modal || !textarea) return;
      const isOneFact = mode === 'un-dato';
      const text = isOneFact ? extractOneFactVersionText(rid) : extractShortVersionText(rid);
      if (!text) {
        alert(isOneFact
          ? 'No se ha podido sacar un dato de este guion — puede que le falte el beat de Contexto/Desarrollo con narración real.'
          : 'No se ha podido recortar este guion — puede que le falten los beats de Hook/Giro/CTA con narración real.');
        return;
      }
      if (title) title.textContent = isOneFact ? '⚡ Un dato, un minuto' : '🎬 Versión corta (Shorts)';
      if (note) note.textContent = isOneFact
        ? 'Recorte automático de un único dato de este guion (Contexto) — tal cual ya está escrito y aprobado. Nada reescrito ni inventado.'
        : 'Recorte automático de este guion — Hook + Giro + CTA, tal cual ya están escritos y aprobados. Nada reescrito ni inventado.';
      textarea.value = text;
      modal.hidden = false;
    }
    function closeShortVersionModal(){
      const modal = document.getElementById('shortVersionModal');
      if (modal) modal.hidden = true;
    }

    function injectBeatDurationEstimate(target){
      const panel = findGuionPanel(target);
      if (!panel) return;
      const guionPanel = panel.closest('details.month');
      const beats = extractGuionBeats(panel);
      if (!beats.length) return;

      let totalSeconds = 0;
      const rows = beats.map(b => {
        if (!b.hasNarration) return `<li>${escapeAttr(b.heading)} — <span class="yt-empty" style="display:inline">sin narración directa</span></li>`;
        const seconds = Math.max(1, Math.round(b.words / NARRATION_WORDS_PER_SECOND));
        totalSeconds += seconds;
        return `<li>${escapeAttr(b.heading)} — ~${seconds}s (${b.words} palabras)</li>`;
      }).join('');

      let box = guionPanel.querySelector('.beat-duration-estimate');
      const html = `
        <strong>⏱️ Duración estimada por narración: ~${totalSeconds}s en total</strong>
        <ul style="margin:8px 0 0;padding-left:18px;font-size:12px;color:var(--muted);line-height:1.6">${rows}</ul>
        <p class="yt-empty" style="margin:8px 0 0">Estimado a ${NARRATION_WORDS_PER_SECOND} palabras/segundo sobre la narración real de este guion — los beats sin "🎙️ Off" (listas de puntos, etc.) no se cuentan.</p>`;
      if (box) {
        box.innerHTML = html;
      } else {
        box = document.createElement('div');
        box.className = 'beat-duration-estimate note';
        box.style.margin = '14px 18px 20px';
        box.innerHTML = html;
        panel.insertAdjacentElement('afterend', box);
      }
    }

    // ──────────────────────────────────────────────────────────
    // CREATOR TOOLS · HERRAMIENTA 001: GENERADOR DE VOZ EN OFF
    // Pedido explícito de Iván (2026-09-07): "el primer Creator Tools" de
    // verdad interactivo. Arquitectura en dos capas (ver nota larga junto
    // a #view-ct-generador-voz en index.html):
    //  1) Vista previa gratis con la Web Speech API del propio navegador
    //     — funciona sola, sin límite, pero no es la voz final.
    //  2) Voz real con IA (ElevenLabs vía VidIQ), generada por Claude bajo
    //     pedido — se sube a la carpeta de Drive de ese guion (mismos ids
    //     que la convención de clip-detection de #13) y se registra en
    //     Firestore `audioGeneration/state` para que esta página lo
    //     muestre ya listo. Nunca se genera en bloque para los 18: cada
    //     llamada real tiene coste de créditos VidIQ.