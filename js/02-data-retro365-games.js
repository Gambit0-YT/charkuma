    // ══════════ 02-data-retro365-games.js ══════════
    // plannedGames — los días de Retro 365 ya decididos, cada uno con su guion completo (HTML) como plantilla. Solo datos, ninguna función.
    // Backlog #73 (14 sep) — parte del split de app.js en módulos más
    // pequeños. Este archivo NUNCA se sirve solo: build.js lo concatena
    // con el resto, en orden, para generar app.js (que a su vez se
    // minifica a app.min.js, como siempre). Editar aquí, nunca en
    // app.js directamente — se sobrescribe en el siguiente build.

    const plannedGames = {
      4: {
        name: "Hades",
        summary: "Roguelike de mazmorras del inframundo: ritmo endiablado y una historia que se cuenta muriendo una y otra vez.",
        difficulty: "dificil",
        emoji: "🔥",
        steamUrl: "https://store.steampowered.com/app/1145360/Hades/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 4 de Retro 365, y hoy toca morir. Mucho. En Hades, morir no es perder — es parte de la historia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay directo de una muerte rápida al principio. <strong>🎬 Producción:</strong> SFX golpe/muerte del juego · corte duro · BGM: sting corto, entra en silencio</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un roguelike de mazmorras del inframundo, ritmo endiablado, y una historia que avanza cada vez que la palmas — hoy os cuento por qué engancha tanto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 004 · HADES" con la barra de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, ritmo alto</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres Zagreus, hijo de Hades, intentando escapar del inframundo una y otra vez — y cada intento, aunque falles, deja huella en la historia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el hub central y un diálogo con un personaje. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada sala es un combate distinto, cada arma cambia por completo cómo juegas, y las bendiciones de los dioses hacen que ninguna run se sienta igual a la anterior."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — distintas armas, distintas bendiciones en acción. <strong>🎬 Producción:</strong> SFX de combate real del juego · corte seco entre salas · BGM: mismo loop, sube en los combates</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí es donde toca vivirlo en directo: ¿cuántos intentos me lleva pasar de esta zona hoy?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla (gráfico simple, tipo "intento nº"). <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve tras cada muerte, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué tal se te da el juego en directo, o qué build/arma te está gustando más hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Se me sigue resistiendo bastante — pero cada muerte me deja con ganas de un intento más, que es justo lo que hace tan bueno a este juego."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Difícil de verdad, pero de esos juegos donde perder también es avanzar — Retro 365 lo tenía pendiente, y ya tocaba."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap rápido de highlights del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya lo has jugado? Dime en comentarios cuántos intentos te llevó tu primera escapada de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      5: {
        name: "Unpacking",
        summary: "Desempaquetas cajas de mudanza y, sin una sola palabra, cuentas una vida entera.",
        difficulty: "facil",
        emoji: "📦",
        steamUrl: "https://store.steampowered.com/app/1135690/Unpacking/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 5 de Retro 365, y hoy no hay combates, ni disparos, ni prisa — solo cajas de mudanza. Y aun así, es de lo más emotivo que he jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay tranquilo sacando un objeto de una caja. <strong>🎬 Producción:</strong> SFX de desempaquetar (sonido suave de cartón) · corte suave · BGM: sting calmado</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego donde desempaquetas cajas de mudanza y, sin una sola palabra de diálogo, acabas contando una vida entera."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 005 · UNPACKING" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh suave · BGM: entra loop relajado</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Cada nivel es una mudanza distinta, en un momento distinto de la vida de la protagonista — y tú decides dónde va cada objeto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando una habitación vacía llenándose poco a poco. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "No hay texto, no hay voces — la historia se cuenta solo con qué objetos aparecen, cómo cambian de mudanza en mudanza, y qué te dejan intuir sobre su vida."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay señalando objetos "con historia" (fotos, diplomas, objetos que desaparecen entre niveles). <strong>🎬 Producción:</strong> SFX suave al colocar cada objeto significativo · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí viene lo curioso de jugarlo en directo: intentar adivinar en voz alta qué está pasando en su vida solo por las cajas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando mientras se especula sobre la historia. <strong>🎬 Producción:</strong> sin SFX · BGM: baja un poco para dar protagonismo a la voz</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué momento o mudanza del juego te ha tocado más a nivel personal?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Hay una mudanza en concreto donde ciertos objetos ya no aparecen, y sin que nadie diga nada, entiendes perfectamente lo que ha pasado — ese es el mejor logro del juego."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Fácil de jugar, pero no fácil de olvidar — el contraste perfecto después de un día tan intenso como el de Hades."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de las mudanzas jugadas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Si ya lo has jugado, cuéntame en comentarios qué crees que le pasó a la protagonista — sin spoilers para quien no lo haya probado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Backlog Fase 2 (2026-09-08, /loop autónomo): el usuario pidió
      // usar el catálogo real de 444 juegos de Game Match directamente
      // (la preselección de "me gusta" seguía casi vacía) para seguir
      // completando días de Retro 365. Elegidos por variedad de género y
      // dificultad, evitando repetir juego/franquicia ya usada en los
      // días 1-6 (Celeste, Stardew Valley, Hollow Knight, Hades,
      // Unpacking, Assassin's Creed Odyssey).
      7: {
        name: "Portal 2",
        summary: "Un shooter de puzles donde la única arma dispara portales — y una IA que no deja de reírse de ti.",
        difficulty: "media",
        emoji: "🧩",
        steamUrl: "https://store.steampowered.com/app/620/Portal_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 7 de Retro 365, y hoy no hay armas de verdad — solo un portal azul y otro naranja. Y aun así, es de los juegos con el humor más negro que vais a ver aquí."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay abriendo un portal y cruzándolo al instante. <strong>🎬 Producción:</strong> SFX de apertura de portal · corte duro · BGM: sting corto, entra en silencio</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un shooter de puzles donde la única arma dispara portales, no balas — hoy os cuento por qué GLaDOS es una de las mejores villanas de la historia de los videojuegos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 007 · PORTAL 2" con la barra de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un sujeto de pruebas atrapado en los laboratorios de Aperture Science, resolviendo salas con portales mientras una inteligencia artificial te vigila... y se ríe de ti."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando una sala de pruebas completa desde arriba. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada sala añade una mecánica nueva — gel de propulsión, láseres, cubos de compañía — y GLaDOS nunca deja de comentar cada cosa que haces, para bien o para mal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado usando gel y láseres. <strong>🎬 Producción:</strong> SFX real del juego en cada mecánica · corte seco entre salas · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver cuántas veces me quedo atascado en una sala 'obvia' delante de todos vosotros."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un atasco real. <strong>🎬 Producción:</strong> SFX cómico de fallo · BGM: baja un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué frase de GLaDOS te ha hecho más gracia hasta ahora, o cuál esperas que diga?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "GLaDOS consigue que odies y quieras al mismo personaje a la vez — pocos villanos de videojuego logran eso solo con diálogo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un puzle perfecto con el humor más afilado del medio — el descanso mental que hacía falta después de un día tan intenso."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los puzles resueltos. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu sala favorita de Portal 2? Dímelo en comentarios, a ver si me la destripáis antes de tiempo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      8: {
        name: "Undertale",
        summary: "Un RPG indie donde puedes terminar el juego entero sin matar a nadie — y el juego se acuerda de cómo lo hiciste.",
        difficulty: "facil",
        emoji: "💛",
        steamUrl: "https://store.steampowered.com/app/391540/Undertale/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 8 de Retro 365, y hoy tengo un juego que me puede matar por hacer las cosas 'bien'. En Undertale, ser pacifista es la ruta más difícil de todas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate esquivando ataques sin atacar. <strong>🎬 Producción:</strong> SFX 8-bit del combate · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG indie donde puedes terminar el juego entero sin matar a nadie — y hoy os cuento por qué esa decisión pesa más de lo que parece."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 008 · UNDERTALE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono cálido</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Un humano cae a un mundo subterráneo lleno de monstruos, y desde el primer combate el juego te deja elegir: luchar, o intentar entenderlos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la opción "Actuar" en un combate. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada personaje tiene su propia forma de 'perdonarlo' sin pelear, los combates son balas esquivables tipo bullet-hell, y el juego literalmente recuerda las decisiones que tomaste, aunque borres la partida."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay esquivando un patrón de balas complejo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí viene el reto en directo: intentar la ruta pacifista de un jefe sin perder la paciencia con vosotros mirando."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un intento fallido. <strong>🎬 Producción:</strong> SFX cómico de derrota · BGM: baja un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿tú intentarías la ruta pacifista o la genocida primero, y por qué?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Yo iría directo a la pacifista — la idea de que el juego 'recuerde' lo que hiciste me da más respeto que ganas de probar la otra ruta."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Fácil de jugar, pero con una de las decisiones morales mejor construidas del medio — puro contraste con los puzles de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates pacíficos logrados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya elegiste tu ruta en Undertale? Cuéntamelo en comentarios, sin destripar el final a quien no lo haya jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      9: {
        name: "Mario Kart 8 Deluxe",
        summary: "El caparazón azul más temido de los videojuegos — carreras cortas, caos total, ideal para reírse en directo.",
        difficulty: "facil",
        emoji: "🏎️",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 9 de Retro 365, y hoy vamos a hablar del objeto más odiado de los videojuegos: el caparazón azul. Bienvenidos a Mario Kart 8 Deluxe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay recibiendo un caparazón azul en primer puesto. <strong>🎬 Producción:</strong> SFX de explosión del caparazón · corte duro · BGM: sting cómico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Carreras cortas, objetos absurdos y caos total — hoy os cuento por qué este es de los juegos que mejor funcionan para reírse en directo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 009 · MARIO KART 8 DELUXE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, ritmo alegre</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Carreras de karts con personajes de Mario, circuitos llenos de trampas, y objetos que pueden darle la vuelta a la carrera en el último segundo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando un circuito con trampa visual. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "200cc es directamente otro juego de rápido que va, el modo batalla es puro caos de globos, y hasta en solitario contra la máquina el caparazón azul siempre encuentra el peor momento posible para llegar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay a 200cc y un round de modo batalla. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre modos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: ganar una copa entera a 200cc sin reventar contra una pared por las prisas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un choque real. <strong>🎬 Producción:</strong> SFX cómico de choque · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál es tu personaje/kart favorito, y el circuito que más rabia te da perder?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "A mí el circuito del arcoíris me sigue pareciendo el más injusto de toda la saga — un despiste y estás fuera."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Fácil de coger, imposible de dominar del todo — el subidón de energía que hacía falta después de un día más tranquilo como el de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los mejores adelantamientos. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿A cuántos os ha reventado un caparazón azul en el último segundo? Contádmelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      10: {
        name: "Team Fortress 2",
        summary: "Nueve clases, cero equilibrio serio, y el shooter por equipos más gamberro de la historia.",
        difficulty: "media",
        emoji: "🔫",
        steamUrl: "https://store.steampowered.com/app/440/Team_Fortress_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 10 de Retro 365, y hoy toca un shooter que lleva desde 2007 haciendo el payaso a propósito. Bienvenidos a Team Fortress 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del Pyro prendiendo fuego con efectos absurdos. <strong>🎬 Producción:</strong> SFX de disparo cómico · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Nueve clases, cero equilibrio serio, y un sentido del humor que ningún shooter moderno se atreve a copiar — hoy os cuento por qué sigue vivo casi 20 años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 010 · TEAM FORTRESS 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Dos equipos, nueve clases completamente distintas entre sí, y objetivos tipo captura de bandera o empujar un carrito — el shooter por equipos que definió el género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el selector de clases. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada clase juega distinto de verdad — el Heavy es puro tanque lento, el Scout es velocidad pura, el Spy se disfraza del equipo rival — y encima el juego se ríe de sí mismo en cada línea de diálogo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay alternando 3 clases distintas. <strong>🎬 Producción:</strong> SFX real de cada clase · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: sobrevivir una partida entera de Spy sin que me descubran en los primeros 10 segundos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a que le descubren como Spy. <strong>🎬 Producción:</strong> SFX cómico de fallo · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué clase juegas tú normalmente, o cuál te da más miedo que te toque enfrente?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El Pyro siempre me pilla por sorpresa desde una esquina — es la clase que menos respeto hasta que me toca sufrirla."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Sigue siendo de lo más divertido que hay en shooters por equipos — la energía perfecta después de las carreras de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de las mejores muertes/momentos. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu clase favorita de TF2? Dímelo en comentarios, a ver si coincidimos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      11: {
        name: "The Walking Dead: Season 1",
        summary: "Una aventura narrativa donde tus decisiones se recuerdan — y ninguna elección se siente realmente bien.",
        difficulty: "facil",
        emoji: "🧟",
        steamUrl: "https://store.steampowered.com/app/207610/The_Walking_Dead/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 11 de Retro 365, y hoy no hay combates de verdad — solo decisiones imposibles con un cronómetro encima. Bienvenidos a The Walking Dead: Season 1."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una decisión con cronómetro visible en pantalla. <strong>🎬 Producción:</strong> SFX de tictac tenso · corte duro · BGM: sting dramático</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Una aventura narrativa de zombis donde lo que de verdad da miedo no son los muertos vivientes, sino tener que decidir a quién salvas — hoy os cuento por qué pesa tanto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 011 · THE WALKING DEAD" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono tenso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Interpretas a Lee, protegiendo a una niña llamada Clementine en pleno apocalipsis zombi — mecánicamente es sencillo, pero cada conversación puede cambiar quién sigue vivo mañana."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un diálogo con opciones de respuesta. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Casi todo el juego son diálogos y decisiones bajo presión de tiempo — el juego recuerda cada elección, los personajes se acuerdan de lo que dijiste, y no hay una opción 'correcta' clara casi nunca."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el aviso "Clementine recordará esto". <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, tenso</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: tomar una decisión difícil sin pensarla de más, justo como se supone que hay que jugarlo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando justo tras decidir. <strong>🎬 Producción:</strong> sin SFX, silencio breve · BGM: baja del todo</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿hay alguna decisión de este tipo de juegos que todavía recuerdes por lo mal que te sentó tomarla?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo que más me interesa de estos juegos es que ninguna decisión se siente como 'ganar' — solo eliges con qué te quedas viviendo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Sencillo de jugar, durísimo de digerir — el contraste emocional perfecto después del caos gamberro de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de las decisiones tomadas (sin spoilers grandes). <strong>🎬 Producción:</strong> fundido cruzado, más lento <strong>BGM:</strong> sube muy poco a poco</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Has jugado esta temporada? Cuéntame en comentarios qué decisión te costó más, sin destriparla del todo para quien no la haya jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Segunda tanda (mismo día, /loop autónomo): días 12-16, mismo
      // criterio de variedad de género/dificultad, evitando repetir
      // franquicia con los días 1-11 ya usados.
      12: {
        name: "Red Dead Redemption 2",
        summary: "El western definitivo: un mundo que respira sin ti, y un protagonista que carga con todo lo que hizo antes.",
        difficulty: "media",
        emoji: "🤠",
        steamUrl: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 12 de Retro 365, y hoy el juego no tiene ninguna prisa por ti. Bienvenidos a Red Dead Redemption 2, donde hasta ensillar el caballo tiene su propia animación."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay ensillando el caballo con calma. <strong>🎬 Producción:</strong> SFX ambiente del oeste · corte duro · BGM: sting corto de guitarra western</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El western definitivo, con un mundo que sigue viviendo aunque no hagas nada — hoy os cuento por qué Arthur Morgan es de los mejores protagonistas que ha dado el medio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 012 · RED DEAD REDEMPTION 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, ambiente western</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres Arthur Morgan, forajido de una banda que se está quedando sin sitio en un mundo que avanza sin ellos — la historia es tan importante como el propio disparo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un diálogo del campamento de la banda. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El detalle está en todo — el caballo se cansa de verdad, la ropa se moja y se seca, y cada NPC con el que hablas puede recordarte la próxima vez que os crucéis."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el sistema de honor/reputación con un NPC. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: intentar cazar un animal legendario sin espantarlo antes de acercarme lo suficiente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a que el animal huye. <strong>🎬 Producción:</strong> SFX cómico de frustración · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué misión o momento del juego te ha dejado más marcado hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo que más me sorprende es que el juego no tiene prisa ninguna por enseñarte nada — y aun así, no se me hace lento en ningún momento."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un mundo que se toma su tiempo de verdad — el ritmo pausado perfecto después de las decisiones a contrarreloj de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de paisajes explorados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya has jugado esta historia? Dime en comentarios qué banda/misión secundaria no me puedo perder."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      13: {
        name: "Divinity: Original Sin 2",
        summary: "Un RPG por turnos donde casi cualquier idea rara que se te ocurra... funciona de verdad en combate.",
        difficulty: "dificil",
        emoji: "🎲",
        steamUrl: "https://store.steampowered.com/app/435150/Divinity_Original_Sin_2__Definitive_Edition/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 13 de Retro 365, y hoy voy a intentar ganar un combate prendiendo fuego a un charco de aceite mientras llueve. Bienvenidos a Divinity: Original Sin 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una combinación elemental real (fuego + aceite). <strong>🎬 Producción:</strong> SFX de explosión del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG por turnos donde casi cualquier idea rara que se te ocurra en combate... funciona de verdad — hoy os cuento por qué es de los más profundos que hay."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 013 · DIVINITY: ORIGINAL SIN 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Creas tu propio grupo de aventureros en un mundo de magia e intriga política, y cada combate por turnos usa el terreno, el clima y los elementos a tu favor."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la creación de personaje. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El agua conduce electricidad, el aceite arde, la sangre puede resbalar a un enemigo — y encima casi todo el diálogo tiene opciones distintas según qué tipo de personaje elegiste al crear tu grupo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay combinando 2-3 elementos en combate. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: ganar un combate difícil usando solo trampas del entorno, sin gastar ni una habilidad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al resultado del combate. <strong>🎬 Producción:</strong> SFX dramático si sale mal · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué combinación rara probarías tú primero si tuvieras el mando?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "A mí me interesa más romper el sistema con física de entorno que subir de nivel a lo bruto — este juego premia justo eso."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Difícil de dominar del todo, pero de los RPG con más libertad real que he tocado — vuelve el nivel de reto tras el paseo tranquilo de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combos elementales logrados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Has jugado este u otro RPG de Larian? Cuéntame en comentarios tu build favorita."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      14: {
        name: "God of War (2018)",
        summary: "Kratos con un hijo al lado y un hacha que vuelve cuando la llamas — el reinicio que nadie esperaba que funcionara tan bien.",
        difficulty: "media",
        emoji: "🪓",
        steamUrl: "https://store.steampowered.com/app/1593500/God_of_War/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 14 de Retro 365, y hoy Kratos ya no está solo — tiene un hijo al lado, y un hacha que vuelve a su mano con solo llamarla. Bienvenidos a God of War."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay lanzando el hacha y llamándola de vuelta. <strong>🎬 Producción:</strong> SFX del hacha volviendo · corte duro · BGM: sting corto, épico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El reinicio que nadie pedía y que acabó siendo de lo mejor de su generación — hoy os cuento por qué la relación entre Kratos y Atreus es lo que hace grande a este juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 014 · GOD OF WAR" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono épico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Kratos deja atrás la mitología griega y se muda a la nórdica, ahora como padre de Atreus — y toda la cámara del juego está pensada para no cortar nunca, como si fuera un solo plano."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando un combate con Atreus ayudando. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate mezcla el hacha cuerpo a cuerpo con los disparos de flecha de Atreus, la progresión de armadura te cambia el estilo entero, y encima toda la cámara se mantiene sin cortes durante todo el juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado de combate combinado. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: un jefe grande, sin usar pociones, a ver qué tal se me da bajo presión."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al combate contra el jefe. <strong>🎬 Producción:</strong> SFX dramático de jefe · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué te parece el cambio de tono de Kratos respecto a la trilogía griega original?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me sorprende lo bien que envejece Kratos como personaje aquí — pasar de furia pura a intentar ser mejor padre da mucho más juego del que esperaba."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un reinicio que se arriesgó de verdad y le salió bien — la épica que hacía falta tras la estrategia más pausada de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los mejores golpes del hacha. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Trilogía griega o esta nueva etapa nórdica? Dímelo en comentarios, sin miedo a discrepar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      15: {
        name: "Sid Meier's Civilization IV",
        summary: "El juego de estrategia que te promete 'un turno más' y te deja jugando hasta las 4 de la mañana.",
        difficulty: "dificil",
        emoji: "🏛️",
        steamUrl: "https://store.steampowered.com/app/3900/Sid_Meiers_Civilization_IV/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 15 de Retro 365, y hoy tengo el juego responsable de más noches sin dormir de la historia de la estrategia. Bienvenidos a Civilization IV."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del mapa mundial con varias civilizaciones. <strong>🎬 Producción:</strong> SFX de "nuevo turno" · corte duro · BGM: sting corto, orquestal</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El juego que inventó la frase 'total, un turno más' — hoy os cuento por qué sigue siendo de lo mejor del género casi 20 años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 015 · CIVILIZATION IV" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Coges una civilización desde la Edad de Piedra y la llevas, turno a turno, hasta la carrera espacial — construyendo ciudades, tecnología, ejércitos y diplomacia por el camino."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay fundando la primera ciudad. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada civilización juega distinto según sus bonificaciones únicas, el árbol de tecnología te obliga a tomar decisiones reales, y la diplomacia con las IA puede cambiar de aliado a enemigo en un solo turno mal gestionado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el árbol de tecnología y un mensaje diplomático. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: prometer que voy a jugar 'solo 20 minutos' de esta sesión — a ver si cumplo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara mirando el reloj con resignación. <strong>🎬 Producción:</strong> SFX cómico · BGM: baja un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué civilización eliges tú siempre, y por qué?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El 'un turno más' de este juego es real de verdad — cada vez que digo que voy a parar, acabo fundando una ciudad más."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un clásico que sigue enganchando por las razones correctas — el reto mental perfecto después de la épica de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del progreso del imperio. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuántas noches te ha robado este juego? Cuéntamelo en comentarios, que aquí nadie te juzga."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      16: {
        name: "Batman: Arkham City",
        summary: "Toda una ciudad-prisión para moverte como Batman de verdad — combate fluido y villanos icónicos por todas partes.",
        difficulty: "media",
        emoji: "🦇",
        steamUrl: "https://store.steampowered.com/app/200260/Batman_Arkham_City_GOTY/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 16 de Retro 365, y hoy me convierto en el mejor detective del mundo con una ciudad entera convertida en prisión. Bienvenidos a Batman: Arkham City."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay planeando con la capa sobre la ciudad. <strong>🎬 Producción:</strong> SFX de viento al planear · corte duro · BGM: sting corto, oscuro</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El juego que definió cómo se siente ser Batman de verdad en un videojuego — hoy os cuento por qué su combate sigue siendo la referencia del género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 016 · BATMAN: ARKHAM CITY" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono oscuro</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Toda una zona de Gotham se convierte en una prisión a cielo abierto llena de los villanos más icónicos del cómic — y te mueves por ella planeando de tejado en tejado como el propio Batman."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay identificando a un villano conocido en la calle. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El sistema de combate 'Freeflow' te deja encadenar golpes contra grupos enteros sin cortes, el modo detective te muestra pistas invisibles a simple vista, y los gadgets de Batman cambian según a qué villano te enfrentes."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate encadenado contra varios enemigos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: mantener una racha de combate perfecta sin recibir ni un golpe, delante de todos vosotros."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando si se rompe la racha. <strong>🎬 Producción:</strong> SFX de fallo · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué villano de Batman te gustaría ver mejor tratado en un videojuego?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El combate de esta saga sigue siendo la vara de medir — pocos juegos consiguen que sentirse 'imparable' no se vuelva aburrido."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un combate que se sigue sintiendo genial más de una década después — cierre perfecto de esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de las mejores combinaciones de combate. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu juego de Batman favorito de todos los tiempos? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Tercera tanda (mismo `/loop`, tick siguiente): días 17-21.
      17: {
        name: "The Legend of Zelda: Breath of the Wild",
        summary: "Te sueltan en un mundo entero y te dicen 'ahí está el final, ve cuando quieras' — libertad real, no de mentira.",
        difficulty: "media",
        emoji: "🗺️",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 17 de Retro 365, y hoy el juego me dice literalmente 've a matar al malo final cuando quieras, incluso ahora mismo'. Bienvenidos a Zelda: Breath of the Wild."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mirando desde una colina hacia el castillo final, muy lejos. <strong>🎬 Producción:</strong> SFX de viento ambiente · corte duro · BGM: sting corto, orquestal suave</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un mundo abierto que te da libertad de verdad, no de mentira — hoy os cuento por qué cambió para siempre lo que se espera de este tipo de juegos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 017 · BREATH OF THE WILD" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Despiertas sin recuerdos, en un mundo devastado por una catástrofe de hace 100 años, con un objetivo claro pero cero indicaciones de cómo ni cuándo cumplirlo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del despertar inicial en la Meseta. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La física y la química del mundo se combinan entre sí de verdad — el metal atrae rayos, el fuego prende hierba seca, el frío te congela si no vas abrigado — y casi todo lo puedes resolver de más de una forma distinta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando una combinación física/química real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: llegar a un santuario cercano usando solo la creatividad, sin mirar ninguna guía."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a una solución improvisada. <strong>🎬 Producción:</strong> SFX de logro · BGM: sube un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿fuiste directo al castillo nada más empezar, o exploraste todo el mapa primero?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Yo tardaría en ir al castillo aposta — la gracia de este juego está en todo lo que te encuentras por el camino, no en el objetivo final."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Libertad real, sin trampa — el mundo abierto tranquilo que hacía falta después del combate directo de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de paisajes y santuarios explorados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál fue tu primera solución creativa en este juego? Cuéntamela en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      18: {
        name: "Elden Ring",
        summary: "Un mundo abierto que no te explica nada — y que te hace sentir el mejor jugador del mundo cuando por fin lo entiendes.",
        difficulty: "dificil",
        emoji: "⚔️",
        steamUrl: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 18 de Retro 365, y hoy voy a morir. Muchas veces. Contra el mismo jefe. Bienvenidos a Elden Ring."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una muerte rápida contra un jefe. <strong>🎬 Producción:</strong> SFX de muerte del juego · corte duro · BGM: sting corto, dramático</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El mundo abierto que no te explica absolutamente nada — hoy os cuento por qué eso, en vez de frustrar, es justo lo que lo hace tan especial."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 018 · ELDEN RING" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono épico oscuro</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un Sinluz explorando las Tierras Intermedias en busca de fragmentos del Círculo de Elden — y desde el minuto uno puedes ir literalmente a cualquier parte, incluida tu propia muerte segura."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa abierto desde el inicio. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada jefe te obliga a aprender su patrón a base de morir, cada build juega completamente distinto según tus armas y hechizos, y el propio mundo te va guiando en silencio hacia dónde deberías ir sin decírtelo nunca directamente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — combate, exploración, un hechizo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: ¿cuántos intentos me lleva hoy pasar de este jefe en concreto?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve tras cada muerte</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué build estás usando o usarías, y qué jefe te tiene más frustrado?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "La primera vez que le ganas a un jefe que te llevaba costando horas es de las mejores sensaciones que dan los videojuegos, punto."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Difícil de verdad, pero justo — cada muerte enseña algo. El reto más duro de esta tanda de Retro 365, y se nota."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap rápido de los intentos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuántos intentos te llevó a ti ese mismo jefe? Dímelo en comentarios, a ver quién la tuvo peor."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      19: {
        name: "Persona 5 Royal",
        summary: "Instituto de día, robo de corazones corruptos por la noche — con el estilo visual más marcado de todo el género RPG.",
        difficulty: "media",
        emoji: "🎭",
        steamUrl: "https://store.steampowered.com/app/1687950/Persona_5_Royal/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 19 de Retro 365, y hoy de día voy al instituto, y de noche le robo el corazón corrupto a un adulto. Bienvenidos a Persona 5 Royal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del menú estilizado característico del juego. <strong>🎬 Producción:</strong> SFX de transición de menú · corte duro · BGM: sting corto, jazzy</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El RPG con el estilo visual más marcado del género — hoy os cuento por qué mezclar vida de instituto con mazmorras psicológicas funciona tan bien."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 019 · PERSONA 5 ROYAL" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tono jazzy</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un estudiante de intercambio con un pasado turbio, que descubre que puede entrar en el 'Palacio' — la mente distorsionada de un adulto corrupto — para hacerle cambiar de actitud."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la vida escolar normal. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Durante el día gestionas tu vida social y tus estudios, y por la noche te transformas en Ladrón Fantasma para explorar mazmorras por turnos usando debilidades elementales de los enemigos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate por turnos explotando una debilidad. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: gestionar mi tiempo del día de hoy sin arrepentirme luego de haber elegido mal la actividad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara dudando entre dos opciones del calendario. <strong>🎬 Producción:</strong> SFX cómico de duda · BGM: baja un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué Confidente/personaje social te llama más la atención por ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo que más me atrae es que gestionar el tiempo pesa tanto como el propio combate — cada decisión social se siente importante de verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Estilo, ritmo y combate por turnos que no se siente lento — un cambio de energía perfecto tras la dureza de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los looks/estilo del juego. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya jugaste esta versión Royal? Dime en comentarios qué añadido te pareció el mejor."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      20: {
        name: "XCOM 2: War of the Chosen",
        summary: "Estrategia por turnos donde un solo disparo fallado con un 90% de acierto te puede costar el soldado que más querías.",
        difficulty: "dificil",
        emoji: "🎯",
        steamUrl: "https://store.steampowered.com/app/268500/XCOM_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 20 de Retro 365, y hoy voy a fallar un disparo con un 94% de acierto, y os prometo que va a doler más de lo que suena. Bienvenidos a XCOM 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un disparo fallado con alta probabilidad. <strong>🎬 Producción:</strong> SFX de fallo/disparo errado · corte duro · BGM: sting corto, tenso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Estrategia por turnos donde cada decisión pesa de verdad — hoy os cuento por qué encariñarte con tus soldados es la peor y mejor idea que puedes tener."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 020 · XCOM 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tenso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "La Tierra ya perdió la guerra contra los alienígenas, y comandas la resistencia desde un avión oculto, reclutando y entrenando soldados que pueden morir para siempre en cualquier misión."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la base móvil (el Avenger). <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada misión es un tablero táctico donde la cobertura y la posición lo son todo, la muerte de un soldado veterano es permanente y de verdad duele, y los Elegidos de esta expansión te persiguen a lo largo de toda la campaña con su propia personalidad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una emboscada táctica bien ejecutada. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, tenso</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: terminar la misión de hoy sin perder a ningún soldado — sin cargar partida si algo sale mal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un momento de tensión real. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿le tienes nombre propio a tus soldados, o prefieres no encariñarte para que no duela tanto perderlos?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Yo les pondría nombre seguro, y luego me arrepentiría cada vez que uno cae — ese es justo el gancho del juego."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Tensión pura, turno a turno — la estrategia más despiadada que hemos visto en Retro 365 hasta ahora, tras el ritmo más relajado de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la misión, con o sin bajas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es la peor pérdida que has tenido en un XCOM? Cuéntamela en comentarios, que aquí se llora en compañía."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      21: {
        name: "Super Smash Bros. Ultimate",
        summary: "Todos los personajes de Nintendo (y no solo de Nintendo) peleando en un mismo juego — el crossover más loco de los videojuegos.",
        difficulty: "facil",
        emoji: "🥊",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 21 de Retro 365, y hoy Mario, Sonic, Pac-Man y Solid Snake pueden pelear entre ellos en el mismo escenario. Bienvenidos a Super Smash Bros. Ultimate."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate caótico con varios personajes icónicos. <strong>🎬 Producción:</strong> SFX de golpe cómico · corte duro · BGM: sting corto, energético</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El crossover más loco de los videojuegos, con literalmente todos los luchadores que ha tenido la saga — hoy os cuento por qué es la fiesta perfecta para jugar acompañado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 021 · SMASH BROS. ULTIMATE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, alegre</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "En vez de barras de vida, aquí subes el porcentaje de daño de tu rival hasta lanzarlo fuera del escenario — cuanto más alto el porcentaje, más lejos sale volando de un solo golpe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando un KO por fuera del escenario. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada personaje juega radicalmente distinto entre sí, los objetos y escenarios cambian el ritmo de cada combate por completo, y hasta los que no conocéis de nombre tienen su propio moveset currado de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay alternando 3 personajes muy distintos entre sí. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: sobrevivir un combate a 4 con solo una vida, sin que me saquen del escenario en los primeros 10 segundos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un KO temprano. <strong>🎬 Producción:</strong> SFX cómico de fallo · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál es tu luchador principal, y qué personaje te haría más ilusión que metieran en un DLC futuro?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo más loco de este roster es que hasta los personajes que nunca esperarías, como Solid Snake o Steve de Minecraft, encajan de verdad en el juego."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Puro caos accesible para cualquiera — el subidón de fiesta perfecto tras la tensión estratégica de ayer. Cierre de esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los mejores KOs del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu main en Smash? Dímelo en comentarios, a ver si alguien se anima a un torneo entre la comunidad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Cuarta tanda (mismo `/loop`, tick siguiente): días 22-26.
      22: {
        name: "Super Mario Odyssey",
        summary: "Mario conquista un sombrero que posee a casi cualquier cosa — el plataformas más creativo de la saga.",
        difficulty: "media",
        emoji: "🎩",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 22 de Retro 365, y hoy Mario tiene un sombrero que puede poseer casi cualquier cosa que se mueva. Bienvenidos a Super Mario Odyssey."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay poseyendo a un enemigo con Cappy. <strong>🎬 Producción:</strong> SFX de posesión del sombrero · corte duro · BGM: sting corto, alegre</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El plataformas más creativo de toda la saga de Mario — hoy os cuento por qué el sombrero Cappy cambió las reglas del género entero."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 022 · SUPER MARIO ODYSSEY" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, alegre</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Mario viaja por reinos completamente distintos entre sí en su nave, la Odyssey, buscando lunas de poder para rescatar a Peach de Bowser — otra vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un reino nuevo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Puedes poseer ranas para saltos imposibles, tanques para arrasar enemigos, o hasta a un dinosaurio — cada posesión cambia por completo cómo se juega ese tramo del nivel."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay alternando 3 posesiones distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: encontrar una luna escondida sin ninguna pista, solo explorando a ojo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al encontrarla (o no). <strong>🎬 Producción:</strong> SFX de logro · BGM: sube un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál es tu reino favorito de todos los que visita Mario aquí?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El reino de Nueva Donk City sigue siendo el que más me sorprendió la primera vez — meter humanos realistas en un juego de Mario sonaba raro sobre el papel, y funciona genial."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Creatividad pura en cada reino — la alegría perfecta después del caos de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de reinos visitados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuántas lunas tienes recogidas tú? Dímelo en comentarios, a ver quién es el más completista."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      23: {
        name: "The Witcher 3: Wild Hunt",
        summary: "Un cazador de monstruos por encargo, en un mundo donde hasta la misión secundaria más pequeña tiene mejor historia que muchos juegos enteros.",
        difficulty: "media",
        emoji: "🐺",
        steamUrl: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 23 de Retro 365, y hoy una misión secundaria de 'busca un gato perdido' me va a hacer llorar más que el final de muchas películas. Bienvenidos a The Witcher 3."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de Geralt usando sentidos de brujo para rastrear. <strong>🎬 Producción:</strong> SFX de sentidos de brujo · corte duro · BGM: sting corto, folk oscuro</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un mundo donde hasta la misión secundaria más pequeña tiene mejor historia que juegos enteros — hoy os cuento por qué sigue siendo la vara de medir del género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 023 · THE WITCHER 3" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, folk</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres Geralt de Rivia, cazador de monstruos por encargo, buscando a su hija adoptiva Ciri en un mundo devastado por la guerra y perseguido por la Cacería Salvaje."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una aldea afectada por la guerra. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada contrato de monstruo empieza como investigación antes que combate, las decisiones morales casi nunca son blanco o negro, y las expansiones grandes añaden regiones enteras con su propia historia principal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay investigando un contrato de monstruo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: aceptar una misión secundaria random sin saber nada de ella, a ver si me sorprende como siempre dicen que pasa."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la sorpresa de la misión. <strong>🎬 Producción:</strong> sin SFX · BGM: baja un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué contrato o misión secundaria te ha sorprendido más si ya lo has jugado?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "La fama de este juego por sus misiones secundarias es de las pocas veces que la realidad supera a la expectativa — no es marketing, es verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG que se toma en serio hasta lo pequeño — el ritmo pausado que hacía falta tras el plataformas de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de paisajes/contratos completados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Qué final elegiste para Ciri? Dímelo en comentarios, sin destripar detalles a quien no lo haya jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      24: {
        name: "Company of Heroes",
        summary: "Estrategia en tiempo real de la Segunda Guerra Mundial donde el terreno y la cobertura importan más que el número de tropas.",
        difficulty: "dificil",
        emoji: "🎖️",
        steamUrl: "https://store.steampowered.com/app/7620/Company_of_Heroes__Legacy_Edition/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 24 de Retro 365, y hoy un solo muro derribado en el momento justo me puede ganar toda la partida. Bienvenidos a Company of Heroes."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un muro destruido cubriendo una retirada. <strong>🎬 Producción:</strong> SFX de explosión real del juego · corte duro · BGM: sting corto, militar</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Estrategia en tiempo real de la Segunda Guerra Mundial donde el terreno importa más que el número de soldados — hoy os cuento por qué sigue siendo un referente del género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 024 · COMPANY OF HEROES" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tenso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Comandas tropas aliadas en el frente europeo, y a diferencia de otras RTS, casi todo el escenario es destructible y la cobertura real decide quién sobrevive a un tiroteo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando tropas usando cobertura real. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada unidad reacciona distinto según si tiene cobertura, un tanque bien flanqueado puede caer en segundos, y destruir el edificio equivocado te puede dejar sin la cobertura que tú mismo necesitabas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un flanqueo exitoso contra un tanque. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, tenso</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: ganar el escenario de hoy sin perder ni una unidad veterana entrenada desde el principio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a una pérdida real. <strong>🎬 Producción:</strong> SFX dramático · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿juegas más de forma agresiva o defensiva en las RTS, y por qué?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El escenario destructible cambia todo mi enfoque — aquí no basta con tener más unidades, hay que pensar en el terreno como una pieza más del ejército."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Estrategia táctica de la buena, sin adornos — el reto mental que tocaba tras la historia pausada de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del campo de batalla tras la victoria. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Juegas otras RTS de la Segunda Guerra Mundial? Recomiéndame alguna en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      25: {
        name: "Bayonetta 2",
        summary: "Combate estiloso a base de esquivar en el último milisegundo — cuanto más al límite juegas, mejor te premia el juego.",
        difficulty: "dificil",
        emoji: "💃",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 25 de Retro 365, y hoy cuanto más al límite esquive un golpe, mejor me premia el juego por ello. Bienvenidos a Bayonetta 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una esquiva perfecta activando "Tiempo Brujo". <strong>🎬 Producción:</strong> SFX de ralentización · corte duro · BGM: sting corto, estiloso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Combate estiloso puro, donde jugar arriesgado literalmente te da ventaja — hoy os cuento por qué esta saga es de las más infravaloradas del género de acción."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 025 · BAYONETTA 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, estiloso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres Bayonetta, una bruja que pelea contra ángeles y demonios con armas escondidas en su propio pelo — tan absurdo como suena, y funciona a la perfección."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando un combo largo y estiloso. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El sistema de esquiva perfecta ralentiza el tiempo si lo clavas en el último instante, cada arma cambia el ritmo del combo entero, y el juego te puntúa por estilo, no solo por sobrevivir al combate."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado usando 2-3 armas distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: sacar la puntuación 'Pure Platinum' en un combate, sin recibir ni un solo golpe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al resultado de puntuación. <strong>🎬 Producción:</strong> SFX de puntuación · BGM: sube o baja según resultado</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué otro juego de acción estilosa (Devil May Cry, Metal Gear Rising...) pondrías al nivel de este?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Esta saga merece mucho más reconocimiento del que tiene — el combate aquí compite de tú a tú con cualquier Devil May Cry."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Estilo y riesgo recompensado en cada combate — el reto de precisión perfecto tras la estrategia pausada de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los mejores combos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Conocías esta saga de antes? Dímelo en comentarios, que se merece más cariño del que recibe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      26: {
        name: "Grand Theft Auto IV",
        summary: "Niko Bellic llega buscando el sueño americano — y encuentra una ciudad que no se lo va a poner nada fácil.",
        difficulty: "media",
        emoji: "🗽",
        steamUrl: "https://store.steampowered.com/app/12210/Grand_Theft_Auto_IV_The_Complete_Edition/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 26 de Retro 365, y hoy Niko Bellic llega a Liberty City buscando el sueño americano que le prometió su primo. Bienvenidos a GTA IV."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del skyline de Liberty City desde un coche. <strong>🎬 Producción:</strong> SFX de tráfico ambiente · corte duro · BGM: sting corto, urbano</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El GTA más serio y menos exagerado de la saga — hoy os cuento por qué la historia de Niko sigue siendo de las mejores que ha contado Rockstar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 026 · GTA IV" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, urbano</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Niko deja atrás un pasado violento en Europa del Este para empezar de cero en América — pero el sueño que le prometieron y la realidad que encuentra son dos cosas muy distintas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un diálogo entre Niko y su primo Roman. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El motor de físicas hace que conducir se sienta con peso de verdad, las misiones de amigos (bolos, copas, citas) construyen a Niko como personaje fuera de la trama principal, y el tono general es mucho más gris y humano que en otros GTA."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay conduciendo con físicas realistas y una misión de amigos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: completar una persecución policial sin perder el coche por el camino."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la persecución. <strong>🎬 Producción:</strong> SFX de sirenas y choques · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿prefieres el tono más serio de este GTA o el más gamberro de otras entregas de la saga?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El tono gris de este GTA en concreto es el que más me ha hecho recordar la historia después de terminarla — no es el más divertido de la saga, pero sí el más humano."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Una historia con más peso del esperado — el contraste perfecto tras el combate estiloso de ayer. Cierre de esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de momentos clave de la historia. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu GTA favorito de toda la saga? Dímelo en comentarios, que seguro que genera debate."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Quinta tanda (mismo `/loop`, tick siguiente): días 27-31.
      27: {
        name: "BioShock",
        summary: "Una ciudad submarina utópica que se fue al garete — y una de las mejores sorpresas de guion de la historia de los videojuegos.",
        difficulty: "media",
        emoji: "🌊",
        steamUrl: "https://store.steampowered.com/app/7670/BioShock/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 27 de Retro 365, y hoy voy a bajar a una ciudad submarina que prometía ser un paraíso... y se convirtió en justo lo contrario. Bienvenidos a BioShock."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay descendiendo en el batiscafo hacia Rapture. <strong>🎬 Producción:</strong> SFX de agua/máquina submarina · corte duro · BGM: sting corto, inquietante</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Una de las mejores sorpresas de guion de la historia de los videojuegos, sin exagerar — hoy os cuento por qué Rapture sigue siendo un ambiente único casi 20 años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 027 · BIOSHOCK" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, inquietante</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Sobrevives a un accidente aéreo y encuentras la entrada a Rapture, una ciudad submarina utópica fundada para huir de todo control — que ahora está poblada de gente mutada hasta la locura."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando la entrada de Rapture. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Combinas armas normales con plásmidos que te dan poderes genéticos, cada decisión sobre las Little Sisters cambia el final, y el ambiente del propio escenario cuenta tanto como cualquier diálogo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando un plásmido en combate. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: mi primer encuentro con un Big Daddy, sin saber muy bien a qué distancia es seguro acercarme."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al primer Big Daddy visto de cerca. <strong>🎬 Producción:</strong> SFX pesado del Big Daddy · BGM: tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar el giro de guion, ¿qué juego te ha sorprendido a ti de forma parecida?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Muy pocos juegos consiguen que replantees todo lo que has hecho hasta ese punto — esa es la razón por la que este sigue en las listas de 'mejores guiones' tantos años después."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un ambiente que no se olvida — el shooter con más personalidad propia que hemos tocado en Retro 365 hasta ahora."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de rincones de Rapture explorados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya conocías el giro de este juego, o te lo he destripado sin querer? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      28: {
        name: "Fire Emblem Awakening",
        summary: "Táctica por turnos donde cada unidad que pierdes se va para siempre — y el juego no te avisa dos veces.",
        difficulty: "dificil",
        emoji: "🗡️",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 28 de Retro 365, y hoy si pierdo a un personaje en combate, se va para siempre — sin cargar partida, si puedo evitarlo. Bienvenidos a Fire Emblem: Awakening."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate táctico en cuadrícula. <strong>🎬 Producción:</strong> SFX de espada del juego · corte duro · BGM: sting corto, épico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Táctica por turnos donde cada unidad importa de verdad — hoy os cuento por qué la muerte permanente cambia completamente cómo se siente cada batalla."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 028 · FIRE EMBLEM: AWAKENING" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Comandas un ejército de personajes con sus propias historias, relaciones y hasta hijos que aparecen según quién se lleve bien con quién — todo mientras luchas contra un enemigo que amenaza el continente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa de la campaña. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El triángulo de armas decide quién tiene ventaja en cada choque, posicionar mal a una unidad puede costarte para siempre, y las conversaciones entre personajes fuera del combate construyen relaciones que afectan a la propia historia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate usando el triángulo de armas a favor. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: terminar el mapa de hoy sin perder a ningún personaje — con muerte permanente activada de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a una unidad en peligro real. <strong>🎬 Producción:</strong> SFX dramático · BGM: tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿juegas con muerte permanente activada, o prefieres el modo clásico sin ese riesgo?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Jugaría con muerte permanente aunque doliera — es lo que hace que cada decisión táctica pese de verdad, no solo sobre el papel."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Tensión táctica real, turno a turno — la estrategia con más corazón que hemos visto en esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del ejército tras la batalla. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿A qué personaje no puedes perder bajo ningún concepto? Cuéntamelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      29: {
        name: "The Elder Scrolls V: Skyrim",
        summary: "Un dragón interrumpe tu ejecución en el primer minuto — y a partir de ahí, el mundo entero es tuyo para perderte en él.",
        difficulty: "media",
        emoji: "🐉",
        steamUrl: "https://store.steampowered.com/app/72850/The_Elder_Scrolls_V_Skyrim/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 29 de Retro 365, y hoy un dragón interrumpe literalmente mi propia ejecución en el primer minuto de juego. Bienvenidos a Skyrim."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del dragón atacando durante la ejecución inicial. <strong>🎬 Producción:</strong> SFX de rugido de dragón · corte duro · BGM: sting corto, épico nórdico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El mundo abierto que definió una generación entera de RPG — hoy os cuento por qué la gente sigue jugándolo más de una década después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 029 · SKYRIM" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, nórdico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres el Sangre de Dragón, la única persona capaz de absorber el alma de los dragones y usar sus gritos de poder — pero el juego te deja ignorar esa trama principal durante literalmente cientos de horas si quieres."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando libremente lejos de la trama principal. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Puedes ser guerrero, mago, ladrón o las tres cosas a la vez, cada ciudad tiene sus propias facciones y misiones, y la comunidad de mods lleva más de una década alargándole la vida al juego original."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay alternando combate mágico y sigilo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: seguir el primer camino random que vea en el mapa, sin ningún objetivo concreto, a ver dónde acabo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a lo que encuentra por el camino. <strong>🎬 Producción:</strong> sin SFX · BGM: continúa relajado</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿guerrero, mago o ladrón — o de los que lo prueban todo en la misma partida?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo que hace especial a este juego es que perderse literalmente es parte del plan — la trama principal casi se siente como una distracción del propio mundo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un mundo hecho para perderse en él — el paseo tranquilo perfecto tras la tensión táctica de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de paisajes/ciudades exploradas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuántas horas reales le has echado a este juego? Confiésalo en comentarios, sin vergüenza."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      30: {
        name: "StarCraft II: Wings of Liberty",
        summary: "Estrategia en tiempo real de altísimo nivel — donde los mejores del mundo hacen cientos de acciones por minuto sin pestañear.",
        difficulty: "dificil",
        emoji: "👽",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 30 de Retro 365, y hoy los jugadores profesionales de este juego hacen más de 300 acciones por minuto. Yo voy a intentar llegar a 50 sin bloquearme. Bienvenidos a StarCraft II."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una base gestionando varias cosas a la vez. <strong>🎬 Producción:</strong> SFX de construcción del juego · corte duro · BGM: sting corto, sci-fi</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Estrategia en tiempo real de altísimo nivel competitivo — hoy os cuento por qué este juego lleva más de una década siendo el rey de los eSports de estrategia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 030 · STARCRAFT II" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, sci-fi</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Tres razas completamente distintas entre sí — humanos, zerg y protoss — luchando por la galaxia, cada una jugándose de una forma radicalmente diferente a las otras dos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando unidades de las 3 razas. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Gestionar la economía, producir unidades sin parar y controlar el mapa a la vez es lo que separa a un jugador normal de uno bueno de verdad — y la campaña en solitario cuenta una historia real detrás de todo ese caos táctico."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una misión de campaña. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: intentar no dejar de producir unidades ni un solo segundo durante los próximos 5 minutos — algo que los profesionales hacen sin pensar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al intentar gestionar todo a la vez. <strong>🎬 Producción:</strong> SFX cómico de agobio · BGM: sube ritmo</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿alguna vez has visto una partida profesional de StarCraft? ¿Qué te pareció el nivel de los jugadores?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Ver una partida profesional de esto es de las cosas más impresionantes que hay en eSports — el nivel de multitarea que manejan es casi de otro planeta."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Estrategia al límite de lo que un humano puede gestionar — el reto más exigente de esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la partida jugada. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Qué raza jugarías tú — humanos, zerg o protoss? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      31: {
        name: "Cut the Rope",
        summary: "Corta cuerdas con el dedo para darle un caramelo a un pequeño monstruo verde — simple, adictivo, y sin ninguna prisa.",
        difficulty: "facil",
        emoji: "🍬",
        steamUrl: "",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 31 de Retro 365, y hoy cierro el mes con algo mucho más sencillo: cortar cuerdas para darle un caramelo a un monstruo verde. Bienvenidos a Cut the Rope."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay cortando una cuerda y el caramelo cayendo a la boca de Om Nom. <strong>🎬 Producción:</strong> SFX de corte + masticar caramelo · corte duro · BGM: sting corto, alegre</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un puzle casual tan simple como adictivo — hoy os cuento por qué este juego se volvió un fenómeno mundial en su momento."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 031 · CUT THE ROPE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, alegre</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Om Nom, un pequeño monstruo verde, quiere caramelos — y tu trabajo es cortar las cuerdas correctas, en el orden correcto, para que el caramelo llegue hasta su boca."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando un nivel con varias cuerdas. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada nivel añade un elemento nuevo — burbujas que hacen flotar el caramelo, ventiladores que lo empujan, arañas que hay que esquivar — y conseguir las 3 estrellas de cada nivel pide precisión real, no solo suerte."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando 2-3 mecánicas distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: sacar las 3 estrellas de un nivel a la primera, sin practicarlo antes delante de vosotros."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al resultado. <strong>🎬 Producción:</strong> SFX de estrellas conseguidas · BGM: sube si sale bien</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿jugaste a este juego en su momento en el móvil? ¿Qué recuerdas de él?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Este tipo de juegos casuales tan bien diseñados no reciben el crédito que merecen — parecer simple no significa que sea fácil de diseñar bien."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Simple, adictivo y sin ninguna prisa — el cierre relajado perfecto de esta tanda de Retro 365, tras la exigencia de ayer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de los niveles completados con 3 estrellas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te acordabas de este juego? Dímelo en comentarios, seguro que le trae nostalgia a más de uno."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Sexta tanda (mismo `/loop`, tick siguiente): días 32-36, arranca el "mes 2".
      32: {
        name: "Half-Life 2",
        summary: "Una pata de cabra, una física que se toma en serio, y un ritmo narrativo que no se detiene ni una sola vez a explicarte nada por texto.",
        difficulty: "media",
        emoji: "🔧",
        steamUrl: "https://store.steampowered.com/app/220/Half-Life_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 32 de Retro 365, empezamos el segundo mes, y hoy mi arma más útil no dispara balas — es una pata de cabra oxidada. Bienvenidos a Half-Life 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay golpeando una caja con la pata de cabra. <strong>🎬 Producción:</strong> SFX metálico del golpe · corte duro · BGM: sting corto, industrial</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El shooter que cambió cómo se cuentan las historias en videojuegos, sin una sola cinemática ni un solo texto de carga — hoy os cuento por qué sigue siendo tan influyente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 032 · HALF-LIFE 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, industrial</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Gordon Freeman despierta en una Tierra ya conquistada por una fuerza alienígena burocrática, y desde el primer segundo hasta el último, la cámara nunca se corta ni te saca del personaje."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del tren de llegada a City 17. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La pistola de gravedad te deja usar el propio escenario como arma, la física de objetos afecta a los puzles tanto como al combate, y los personajes hablan contigo en tiempo real sin ningún corte a cinemática."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando la pistola de gravedad en combate. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: resolver el puzle físico de esta sala usando solo la pistola de gravedad, sin mirar ninguna guía."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al resolver (o no) el puzle. <strong>🎬 Producción:</strong> SFX de logro · BGM: sube un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿crees que alguna vez veremos Half-Life 3, o ya has hecho las paces con que no va a llegar?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Con Half-Life: Alyx demostraron que la saga sigue viva de alguna forma — pero sigo sin apostar nada a que veamos un '3' numerado pronto."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un ritmo narrativo que sigue sin envejecer — el arranque perfecto para este segundo mes de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de momentos clave jugados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya jugaste Half-Life: Alyx? Dime en comentarios si crees que es un digno 'episodio 3' o no."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      33: {
        name: "Mass Effect 2",
        summary: "Reúnes un equipo para una misión suicida — y el juego te avisa de que casi cualquiera de ellos puede morir de verdad si lo haces mal.",
        difficulty: "media",
        emoji: "🚀",
        steamUrl: "https://store.steampowered.com/app/2362420/Mass_Effect_2_2010_Edition/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 33 de Retro 365, y hoy estoy reclutando un equipo entero para lo que el propio juego llama, sin rodeos, 'la misión suicida'. Bienvenidos a Mass Effect 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del menú de reclutamiento del equipo. <strong>🎬 Producción:</strong> SFX sci-fi de interfaz · corte duro · BGM: sting corto, espacial</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG de ciencia ficción donde reclutas a tu propio equipo de especialistas — hoy os cuento por qué la misión final es de las más tensas que ha dado el género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 033 · MASS EFFECT 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, espacial</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "El comandante Shepard vuelve de entre los muertos para reunir un equipo de especialistas contra una amenaza que nadie más se toma en serio — cada personaje tiene su propia misión de lealtad antes del tramo final."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un diálogo con un miembro del equipo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada decisión de diálogo construye tu relación con el equipo, completar bien las misiones de lealtad literalmente decide quién sobrevive a la misión final, y el combate mezcla cobertura táctica con habilidades específicas de cada clase."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate usando cobertura y habilidades. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una decisión de diálogo importante, tomada sin pensarla de más, tal y como la sentiría de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando justo tras decidir. <strong>🎬 Producción:</strong> sin SFX, silencio breve · BGM: baja del todo</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿a qué personaje del equipo le tienes más cariño, o te daría más miedo perder en la misión final?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Que un juego consiga que te importe de verdad si un personaje secundario sobrevive o no, en vez de ser solo una barra de vida más, dice mucho de lo bien escrito que está."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un elenco de personajes que se queda contigo — la space opera con más peso emocional que hemos tocado en Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del equipo reunido. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Sobrevivió todo tu equipo a la misión suicida la primera vez que jugaste? Confiésalo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      34: {
        name: "Age of Empires II: Definitive Edition",
        summary: "Estrategia medieval en tiempo real que sigue reuniendo torneos multitudinarios casi 30 años después de su lanzamiento original.",
        difficulty: "dificil",
        emoji: "🏹",
        steamUrl: "https://store.steampowered.com/app/813780/Age_of_Empires_II_Definitive_Edition/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 34 de Retro 365, y hoy voy a intentar no perder mi aldeano número uno en los primeros dos minutos de partida. Bienvenidos a Age of Empires II."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de los aldeanos iniciales recolectando recursos. <strong>🎬 Producción:</strong> SFX medieval de construcción · corte duro · BGM: sting corto, medieval</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Casi 30 años después de su lanzamiento original, sigue reuniendo torneos multitudinarios — hoy os cuento por qué este clásico se resiste a envejecer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 034 · AGE OF EMPIRES II" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, medieval</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eliges una civilización real de la historia, cada una con sus propias unidades y bonificaciones únicas, y la avanzas por 4 edades distintas mientras gestionas economía, tecnología y ejército a la vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay avanzando de edad. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada civilización juega distinto de verdad según su bonificación única, el 'piedra-papel-tijera' de unidades obliga a adaptar el ejército sobre la marcha, y los aldeanos gestionando bien la economía pesan tanto como cualquier batalla."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una batalla entre varias unidades distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: llegar a la Edad Imperial antes de que la IA me ataque en serio — a ver si me da tiempo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la carrera contra el reloj. <strong>🎬 Producción:</strong> SFX de tensión · BGM: sube ritmo</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué civilización jugabas tú en su día, o jugarías ahora si empezaras de cero?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Que este juego siga teniendo escena competitiva activa casi 30 años después es de lo más raro y bonito que hay en la estrategia — pocos géneros envejecen tan bien."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un clásico que sigue exigiendo de verdad — la estrategia medieval que le tocaba a este segundo mes de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del imperio construido. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Jugabas a esto de pequeño? Cuéntame tu civilización favorita en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      35: {
        name: "Okami HD",
        summary: "Eres una diosa loba pintando el mundo de vuelta a la vida con un pincel celestial — arte japonés hecho videojuego.",
        difficulty: "media",
        emoji: "🐺",
        steamUrl: "https://store.steampowered.com/app/587620/Okami_HD/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 35 de Retro 365, y hoy soy una diosa loba que repinta el mundo de vuelta a la vida con un pincel mágico. Bienvenidos a Okami."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando el Pincel Celestial para revivir un árbol. <strong>🎬 Producción:</strong> SFX de pincelada mágica · corte duro · BGM: sting corto, tradicional japonés</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Arte tradicional japonés convertido en mecánica de juego real — hoy os cuento por qué este juego sigue siendo visualmente único casi 20 años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 035 · OKAMI HD" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tradicional</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres Amaterasu, la diosa del sol encarnada en forma de loba blanca, devolviendo la vida y el color a un Japón mitológico que la oscuridad ha ido consumiendo poco a poco."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el contraste entre zona oscura y zona repintada. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El Pincel Celestial te deja dibujar directamente sobre la pantalla para cortar objetos, crear viento o hacer salir el sol, cada técnica nueva abre zonas antes inaccesibles, y todo el estilo visual imita deliberadamente la pintura tradicional sumi-e."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando 2-3 técnicas de pincel distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: resolver un puzle de pincel sin mirar ninguna pista, solo con lo que el propio escenario me sugiere."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al resolver el puzle. <strong>🎬 Producción:</strong> SFX de logro · BGM: sube un poco</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué otro juego con un estilo visual tan marcado como este se te viene a la cabeza?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Muy pocos juegos se atreven a un estilo visual tan específico como este — y encima consiguen que la mecánica (el pincel) tenga sentido con el propio arte, no sea solo estética."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Arte, mitología y mecánica unidos de verdad — la joya visual que le tocaba a esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de zonas repintadas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Conocías este juego de antes? Dímelo en comentarios, que merece mucho más reconocimiento del que tiene."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      36: {
        name: "Call of Duty 4: Modern Warfare",
        summary: "El shooter militar que definió una década entera de multijugador — y una campaña con una de las misiones más recordadas del género.",
        difficulty: "media",
        emoji: "🪖",
        steamUrl: "https://store.steampowered.com/app/7940/Call_of_Duty_4_Modern_Warfare_2007/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 36 de Retro 365, y hoy toca un shooter que definió cómo se juega al multijugador militar durante más de una década. Bienvenidos a Call of Duty 4: Modern Warfare."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un tiroteo intenso en campaña. <strong>🎬 Producción:</strong> SFX real de disparo · corte duro · BGM: sting corto, militar</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El shooter militar que popularizó el sistema de rangos y perks que todavía usan los shooters de hoy — hoy os cuento por qué su campaña sigue siendo una referencia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 036 · CALL OF DUTY 4" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, militar</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Alternas entre un marine estadounidense y un miembro del SAS británico en un conflicto moderno ficticio — y una misión en concreto, jugada desde un punto de vista muy distinto al resto, se quedó grabada en la memoria de toda una generación."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un tramo de campaña distinto al resto (sin destripar cuál). <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La campaña dura poco pero no desperdicia ni un solo tramo, el multijugador introdujo perks y rangos que se convirtieron en estándar del género, y el ritmo de disparo se sintió más directo que cualquier shooter militar anterior."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una partida multijugador. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: completar el tramo de campaña de hoy en la dificultad más alta, sin bajarla aunque me cueste."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a una muerte en dificultad alta. <strong>🎬 Producción:</strong> SFX de muerte del juego · BGM: caída breve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar cuál, ¿qué misión de un shooter te ha dejado más marcado igual que esta lo hizo con tanta gente?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Muy pocos shooters se atreven a romper el ritmo de acción constante para meter un momento así — y por eso se recuerda tantos años después, más que cualquier tiroteo del resto de la campaña."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un shooter que definió el molde de toda una década — cierre de esta sexta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de momentos de campaña. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu Call of Duty favorito de todos los tiempos? Dímelo en comentarios, que seguro que hay debate."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      // Séptima tanda (mismo `/loop`, tick siguiente): días 37-41.
      37: {
        name: "Grand Theft Auto V",
        summary: "Tres protagonistas, una ciudad entera para hacer el gamberro, y el juego más vendido de la historia sin discusión seria.",
        difficulty: "media",
        emoji: "💵",
        steamUrl: "https://store.steampowered.com/app/3240220/Grand_Theft_Auto_V_Enhanced/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 37 de Retro 365, y hoy juego con tres protagonistas a la vez, cambiando entre ellos en cualquier momento. Bienvenidos a GTA V."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay cambiando de personaje con la rueda de selección. <strong>🎬 Producción:</strong> SFX de cambio de personaje · corte duro · BGM: sting corto, urbano</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El juego más vendido de la historia sin discusión seria — hoy os cuento por qué tener tres protagonistas a la vez cambió el diseño de las misiones para siempre."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 037 · GTA V" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Michael, Franklin y Trevor son tres criminales con motivaciones y personalidades totalmente distintas, y muchas misiones te dejan cambiar entre ellos a mitad de un atraco para controlar partes distintas del plan."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un atraco cambiando de perspectiva. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Los golpes grandes se planifican con distintos enfoques posibles, el mapa es enorme sin sentirse vacío, y el modo online lleva más de una década recibiendo contenido nuevo sin parar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — conducción, tiroteo, exploración. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: completar el golpe de hoy con el enfoque más silencioso posible, sin que salte ninguna alarma."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando si salta la alarma. <strong>🎬 Producción:</strong> SFX de alarma si falla · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál de los tres protagonistas te cae mejor, y por qué?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Trevor sigue siendo el más memorable de los tres para mí — es el que menos filtro tiene, y eso hace que cada misión suya se sienta impredecible de verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Más de una década después y el modo online sigue vivo — pocos juegos aguantan tanto tiempo en lo más alto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del golpe completado. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Sigues jugando el online de este juego? Cuéntame en comentarios qué tal está ahora mismo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      38: {
        name: "Dark Souls II",
        summary: "El Souls más incomprendido de la saga — más difícil de entender que de jugar, y con una comunidad que lo defiende con uñas y dientes.",
        difficulty: "dificil",
        emoji: "💀",
        steamUrl: "https://store.steampowered.com/app/236430/DARK_SOULS_II/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 38 de Retro 365, y hoy toca el Souls que más discusiones genera entre sus propios fans. Bienvenidos a Dark Souls II."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una muerte contra un enemigo. <strong>🎬 Producción:</strong> SFX de muerte del juego · corte duro · BGM: sting corto, oscuro</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El Souls más incomprendido de la saga, para bien y para mal — hoy os cuento por qué merece una segunda oportunidad si lo descartaste hace años."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 038 · DARK SOULS II" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, oscuro</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Un No-Muerto más busca respuestas sobre su maldición en Drangleic, un reino en decadencia — la fórmula base es la misma que el resto de Souls, pero con decisiones de diseño que dividieron a la comunidad desde el primer día."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una zona nueva de Drangleic. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Tiene más builds de armas y hechizos que ningún otro Souls, morir demasiadas veces reduce tu vida máxima de forma temporal, y algunas zonas se atrevieron a diseños que nunca se habían visto antes en la saga."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay probando 2 builds distintas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: ¿cuántos intentos me lleva hoy pasar de esta zona en concreto, con la vida ya reducida por morir antes?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve tras cada muerte</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿tú estás en el bando que defiende este Souls, o en el que lo considera el más flojo de la saga?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me parece que se le juzgó muy duro en su momento solo por no ser una copia exacta del primero — visto con perspectiva, se atrevió a probar cosas que el resto de la saga no hizo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Divisivo, sí — pero con razones reales para defenderlo. El reto más debatido de esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap rápido de los intentos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu Souls favorito de la saga completa? Prepárate para el debate en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      39: {
        name: "Disco Elysium - The Final Cut",
        summary: "Un detective con amnesia total, cero combate, y las conversaciones más profundas jamás escritas para un videojuego.",
        difficulty: "media",
        emoji: "🕵️",
        steamUrl: "https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 39 de Retro 365, y hoy me despierto sin recordar ni mi propio nombre, con una corbata en el ventilador y un caso de asesinato que resolver. Bienvenidos a Disco Elysium."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del despertar inicial del detective. <strong>🎬 Producción:</strong> SFX ambiental melancólico · corte duro · BGM: sting corto, jazz decadente</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Cero combate, cientos de miles de palabras de diálogo, y una de las escrituras más elogiadas de la historia de los videojuegos — hoy os cuento por qué merece la pena a pesar de no tener ni una sola pelea."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 039 · DISCO ELYSIUM" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, jazz</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un detective con amnesia total investigando un asesinato en una ciudad en ruinas política — y tus propias habilidades mentales te hablan directamente, a veces para ayudarte, a veces para sabotearte."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una habilidad mental "hablando" en un diálogo interno. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada tirada de dado puede fallar de formas hilarantes o devastadoras, tu propia personalidad se construye según qué habilidades potencias, y prácticamente cada NPC de la ciudad tiene una conversación real y profunda esperando."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una tirada de dado fallida con consecuencias. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una decisión de personalidad importante, sin pensarla de más, tal y como me saldría de forma natural."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando justo tras decidir. <strong>🎬 Producción:</strong> sin SFX, silencio breve · BGM: baja del todo</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué tipo de detective serías tú — el que sigue las pistas con lógica fría, o el que se deja llevar por el caos?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Que un juego sin combate consiga engancharte tanto solo con diálogo dice mucho de lo bien escrito que está — pocos RPG se atreven a apostarlo todo a la escritura de esta forma."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Sin una sola pelea, y aun así de lo más intenso que hemos tocado en Retro 365 — la escritura como protagonista absoluta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de decisiones/diálogos memorables. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya jugaste este juego? Cuéntame en comentarios qué habilidad mental te dio más problemas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      40: {
        name: "Overwatch",
        summary: "Shooter de héroes por equipos donde saber cuándo cambiar de personaje pesa tanto como saber apuntar.",
        difficulty: "media",
        emoji: "🦸",
        steamUrl: "https://store.steampowered.com/app/2357570/Overwatch/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 40 de Retro 365, y hoy el enemigo más peligroso no es el que dispara mejor, es el que cambia de personaje en el momento justo. Bienvenidos a Overwatch."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay cambiando de héroe a mitad de partida. <strong>🎬 Producción:</strong> SFX de cambio de héroe · corte duro · BGM: sting corto, heroico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un shooter de héroes por equipos donde saber cuándo cambiar pesa tanto como saber apuntar — hoy os cuento por qué su diseño de personajes sigue siendo un referente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 040 · OVERWATCH" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Cada héroe tiene un rol claro — daño, tanque o soporte — y cada uno se juega de forma radicalmente distinta, desde francotiradores hasta sanadores que también pueden hacer bastante daño si hace falta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando 3 roles distintos en la misma partida. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La composición de equipo importa más que la habilidad individual muchas veces, cada mapa favorece a ciertos héroes sobre otros, y las habilidades definitivas bien coordinadas pueden ganar un combate de equipo entero de golpe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una habilidad definitiva coordinada. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca el reto en directo: leer la composición del equipo rival y cambiar de héroe para contrarrestarla, en tiempo real."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la composición rival. <strong>🎬 Producción:</strong> SFX de cambio de héroe · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál es tu héroe principal, y cuál te cuesta más jugar en contra?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo que más me gusta del diseño es que casi cualquier héroe puede ser el más importante de la partida si sabes cuándo usarlo — no hay uno solo que se sienta relleno."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Trabajo en equipo por encima de la puntería individual — el shooter más táctico que hemos tocado en esta tanda."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de las mejores jugadas de equipo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu héroe favorito de todo el roster? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      41: {
        name: "NieR:Automata",
        summary: "Androides peleando la guerra de la humanidad contra máquinas — con varios finales que cambian por completo lo que crees que es el juego.",
        difficulty: "media",
        emoji: "🤖",
        steamUrl: "https://store.steampowered.com/app/524220/NieRAutomata/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 41 de Retro 365, y hoy soy una androide luchando la guerra de la humanidad contra máquinas — y os prometo que este juego no es lo que parece al principio. Bienvenidos a NieR:Automata."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate estiloso contra máquinas. <strong>🎬 Producción:</strong> SFX de combate del juego · corte duro · BGM: sting corto, melancólico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de acción con varios finales que cambian por completo lo que crees que estás jugando — hoy os cuento por qué terminarlo una sola vez es no haberlo terminado de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 041 · NIER:AUTOMATA" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, melancólico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "2B y 9S son androides luchando por lo que queda de la humanidad contra un ejército de máquinas — pero cuanto más avanzas, más preguntas reales sobre la propia guerra empiezan a aparecer."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando las ruinas de una ciudad. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate mezcla espada cuerpo a cuerpo con disparos tipo bullet-hell de tu dron acompañante, la cámara cambia de perspectiva constantemente sin avisar, y el final 'A' es solo el principio real de la historia completa."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay con un cambio de perspectiva de cámara real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un combate contra una máquina jefe, sin saber muy bien qué mecánica nueva me va a sorprender esta vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a una mecánica sorpresa del jefe. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar nada, ¿tienes pensado sacar todos los finales, o te conformas con el primero?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Parar en el primer final de este juego es perderse literalmente la mitad de lo que lo hace especial — merece la pena aguantar hasta el final de verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Acción estilosa con una de las estructuras narrativas más originales que existen — cierre de esta séptima tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates jugados. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Sin spoilers grandes: ¿por qué final te quedas tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      }
      // 42: { name: "...", summary: "...", difficulty: "...", emoji: "...", steamUrl: "..." },
    };
