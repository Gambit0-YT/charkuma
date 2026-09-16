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
      },
      42: {
        name: "Portal",
        summary: "El puzzle en primera persona que enseñó a medio mundo a pensar con portales — y a desconfiar de una IA con muy mala leche.",
        difficulty: "media",
        emoji: "🧪",
        steamUrl: "https://store.steampowered.com/app/400/Portal/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 42 de Retro 365, y hoy hay una tarta esperándome al final... o eso dice GLaDOS. Bienvenidos a Portal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay abriendo un portal azul y otro naranja. <strong>🎬 Producción:</strong> SFX de disparo de portal · corte duro · BGM: sting corto, robótico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un puzzle en primera persona tan corto como perfecto, que te enseña una mecánica nueva cada dos minutos sin un solo tutorial pesado — hoy os cuento por qué sigue siendo una clase magistral de diseño."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 042 · PORTAL" con la barra de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un sujeto de pruebas de Aperture Science, guiado por GLaDOS, una inteligencia artificial que promete una tarta al terminar las pruebas — y que, cuanto más avanzas, más raro empieza a sonar todo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una sala de pruebas con cámaras de vigilancia. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La pistola de portales conecta dos puntos del espacio como si fueran uno solo, así que aprender a usar tu propia inercia para lanzarte por el aire es la mitad del juego — y la otra mitad es que GLaDOS no deja de hablarte mientras lo haces."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una sala de pruebas resuelta con inercia real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la sala donde se me resistió más la primera vez que jugué esto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando en tiempo real al resolver el puzzle. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿lo habías jugado ya, o es tu primera vez con la pistola de portales?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Lo había jugado hace años, pero cada vez que vuelvo se me olvida lo bien pensado que está cada puzzle."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Corto, perfecto, y con una de las IAs más memorables de los videojuegos — un básico de Retro 365 que tocaba ya sí o sí."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de portales abiertos durante el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿La tarta es mentira o no? Ya sabéis dónde decírmelo: en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      43: {
        name: "Celeste",
        summary: "Plataformas de precisión brutal sobre una chica escalando una montaña — y sobre lo que de verdad significa esa montaña.",
        difficulty: "dificil",
        emoji: "⛰️",
        steamUrl: "https://store.steampowered.com/app/504230/Celeste/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 43 de Retro 365, y hoy voy a morir. Muchas veces. Bienvenidos a Celeste, el plataformas que más me ha hecho gritar en años."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una muerte rápida al principio de un salto. <strong>🎬 Producción:</strong> SFX golpe/muerte del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Plataformas de precisión endiablada sobre Madeline subiendo la Montaña Celeste — hoy os cuento por qué, detrás de lo difícil, hay una de las historias más honestas del género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 043 · CELESTE" con la barra de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Madeline decide subir sola una montaña, y por el camino se encuentra con un reflejo oscuro de sí misma — una forma directa de hablar de ansiedad y salud mental sin decirlo nunca de forma literal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el escenario de la montaña. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Solo tienes salto, un dash aéreo de un solo uso, y trepar — y con eso el juego construye cientos de pantallas donde cada muerte te enseña algo nuevo, sin cargas eternas entre intento e intento."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — distintas pantallas de plataformas resueltas. <strong>🎬 Producción:</strong> SFX de combate real del juego · corte seco entre pantallas · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: ¿cuántos intentos me lleva pasar de esta pantalla concreta hoy?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve tras cada muerte, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué tal se te da el juego en directo, o qué capítulo te está costando más?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Se me sigue resistiendo, pero es de los pocos juegos donde morir 50 veces seguidas no me frustra, me pica."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Difícil de verdad, pero justo en cada muerte — y con un mensaje real detrás que se queda más tiempo que cualquier boss final."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap rápido de highlights del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya llegaste a la cima tú? Dime en comentarios cuántas muertes te costó tu escena más dura."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      44: {
        name: "Hollow Knight",
        summary: "Metroidvania dibujado a mano en el reino insecto de Hallownest — grande, precioso, y bastante más duro de lo que aparenta.",
        difficulty: "dificil",
        emoji: "🦋",
        steamUrl: "https://store.steampowered.com/app/367520/Hollow_Knight/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 44 de Retro 365, y hoy soy un caballero insecto explorando un reino subterráneo entero. Bienvenidos a Hollow Knight."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una zona nueva de Hallownest. <strong>🎬 Producción:</strong> SFX ambiente del juego · corte duro · BGM: sting corto, melancólico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un metroidvania dibujado a mano entero, con un mapa gigante y una dificultad que no perdona — hoy os cuento por qué se ha ganado fama de referencia del género casi sin ayuda de nadie."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 044 · HOLLOW KNIGHT" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Hallownest es un reino insecto en ruinas, y tú eres un pequeño caballero silencioso que baja a explorarlo sin que nadie te explique gran cosa — el propio mapa es algo que tienes que ganarte comprando el plano de cada zona."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa del juego a medio completar. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate mezcla espadazos precisos con un sistema de magia que también sirve para curarte, cada jefe te obliga a aprender su patrón desde cero, y las mejoras de movimiento abren rutas que antes eran imposibles."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate contra un jefe real del juego. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un jefe que llevo varios intentos sin poder pasar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos contra el jefe. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué zona de Hallownest te está gustando más hasta ahora, o cuál se te ha atragantado?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Cada zona nueva me sorprende más que la anterior, aunque hay un jefe concreto que me está costando la vida entera."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Precioso, gigante, y nada fácil — de los que dan más de lo que prometen al principio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de zonas exploradas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya conoces Hallownest tú? Dime en comentarios qué jefe te pareció el más injusto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      45: {
        name: "Stardew Valley",
        summary: "Simulador de granja hecho casi entero por una sola persona — y que ha terminado enganchando a medio planeta.",
        difficulty: "facil",
        emoji: "🌾",
        steamUrl: "https://store.steampowered.com/app/413150/Stardew_Valley/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 45 de Retro 365, y hoy heredo una granja abandonada y decido dejarlo todo por ella. Bienvenidos a Stardew Valley."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay llegando por primera vez a la granja. <strong>🎬 Producción:</strong> SFX ambiente relajado · corte suave · BGM: sting corto, tranquilo</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un simulador de granja hecho casi por completo por una sola persona — hoy os cuento por qué un juego tan tranquilo puede engancharte más que muchos triple A."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 045 · STARDEW VALLEY" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, relajado</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Dejas tu trabajo de oficina y te mudas al pueblo de Pelican Town para hacerte cargo de la granja de tu abuelo — cultivos, animales, minas, y todo un pueblo lleno de vecinos con su propia vida."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay paseando por el pueblo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Plantar y vender cultivos es solo la puerta de entrada: hay minas para explorar, peces que pescar, relaciones que construir con cada vecino, y decenas de horas de contenido que ni se notan al principio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — cultivos, pesca, mina. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver qué me encuentro hoy bajando un poco más en la mina."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay bajando de nivel en la mina. <strong>🎬 Producción:</strong> SFX de mina real · BGM: sube tensión ligera</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué estás priorizando tú en la granja, cultivos, animales, o directamente hacerte amigo de todo el pueblo?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Empecé queriendo centrarme en cultivos y acabé más pendiente de las relaciones del pueblo que de la propia cosecha."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Tranquilo, adictivo, y con muchísimo más contenido del que aparenta al principio — el descanso perfecto entre juegos más intensos de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la granja a lo largo del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ya tienes tu propia granja? Dime en comentarios a qué le das prioridad tú."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      46: {
        name: "Resident Evil 4",
        summary: "El remake del survival horror que reinventó el género en 2005 — ahora con Leon Kennedy más pulido que nunca.",
        difficulty: "dificil",
        emoji: "🧟",
        steamUrl: "https://store.steampowered.com/app/2050650/Resident_Evil_4/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 46 de Retro 365, y hoy un pueblo entero de aldeanos infectados me está esperando. Bienvenidos al remake de Resident Evil 4."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la emboscada del pueblo. <strong>🎬 Producción:</strong> SFX de disparo real del juego · corte duro · BGM: sting corto, tenso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El remake de uno de los juegos que más ha influido en el survival horror moderno — hoy os cuento qué se mantiene igual de brillante y qué se ha pulido de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 046 · RESIDENT EVIL 4" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tenso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Leon Kennedy va a un pueblo remoto de España a rescatar a la hija del presidente, y se encuentra con una comunidad entera infectada por un parásito llamado Las Plagas — el origen real de que este juego cambiara el género para siempre."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el pueblo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La munición sigue siendo escasa de verdad, cada enemigo obliga a apuntar con cabeza (literalmente, a las extremidades), y el maletín de inventario tipo Tetris sigue siendo tan satisfactorio como en el original."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay organizando el maletín + combate real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la primera vez que me rodean de verdad sin munición de sobra."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la emboscada en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: si jugaste el original, ¿qué cambio del remake te ha convencido más, o cuál echas de menos?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El apuntado más libre me ha convencido del todo, aunque echo un poco de menos la cámara fija del original en algunos momentos concretos."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un remake que respeta lo que hizo grande al original sin quedarse anclado en él — de los pocos que de verdad justifican su existencia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Original o remake? Dime en comentarios con cuál te quedas tú."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      47: {
        name: "Metal Gear Solid V: The Phantom Pain",
        summary: "El mundo abierto de sigilo de Kojima, con Big Boss al mando — infiltración con libertad total y una banda sonora ochentera de fondo.",
        difficulty: "media",
        emoji: "🐍",
        steamUrl: "https://store.steampowered.com/app/287700/METAL_GEAR_SOLID_V_THE_PHANTOM_PAIN/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 47 de Retro 365, y hoy me infiltro en una base militar entera con una caja de cartón como única defensa. Bienvenidos a Metal Gear Solid V."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando la caja de cartón para esconderse. <strong>🎬 Producción:</strong> SFX de sigilo real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El mundo abierto de sigilo de Hideo Kojima, con Big Boss al mando y libertad casi total para resolver cada misión — hoy os cuento por qué sigue siendo referencia años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 047 · METAL GEAR SOLID V" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Big Boss despierta de un coma de nueve años y monta su propio ejército privado, Diamond Dogs, para hacerse cargo de misiones de infiltración por todo Afganistán y África en plena Guerra Fría."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el mapa abierto. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada base se puede resolver a sigilo total, a tiros, o secuestrando literalmente al enemigo con un globo — y todo lo que capturas o construyes vuelve a tu propia base para mejorar equipo y personal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de extracción con globo (Fulton). <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver cómo de mal sale este plan de infiltración improvisado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un plan que se tuerce en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿prefieres el sigilo puro o te gusta más liarla a tiros cuando algo sale mal?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Intento ir siempre de sigilo, pero en cuanto algo sale mal me acabo divirtiendo más liándola a tiros de lo que admito."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Libertad de verdad para resolver cada misión como quieras — de los mundos abiertos con más opciones reales que he jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de misiones resueltas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Sigilo o acción directa? Dime en comentarios cómo juegas tú."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      48: {
        name: "Ori and the Blind Forest",
        summary: "Metroidvania precioso y emotivo sobre un espíritu del bosque salvando su hogar — de los que más lloran sin avisar.",
        difficulty: "media",
        emoji: "🌲",
        steamUrl: "https://store.steampowered.com/app/387290/Ori_and_the_Blind_Forest/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 48 de Retro 365, y hoy os aviso: este juego me ha hecho llorar sin avisar en los primeros diez minutos. Bienvenidos a Ori and the Blind Forest."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la escena inicial del bosque. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: sting corto, emotivo</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un metroidvania precioso sobre un pequeño espíritu del bosque intentando salvar su hogar — hoy os cuento por qué la parte visual y la emocional pesan tanto como el propio gameplay."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 048 · ORI AND THE BLIND FOREST" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, emotivo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Ori es un espíritu guardián que despierta cuando el bosque de Nibel empieza a morir, y tiene que recuperar la luz perdida recorriendo un mapa lleno de secretos y zonas que solo se abren con nuevas habilidades."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una zona nueva del bosque. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El movimiento se siente cada vez más fluido según vas ganando habilidades — doble salto, dash aéreo, correr por paredes — y algunas secuencias de escape te obligan a ejecutarlo todo a la perfección sin margen de error."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una secuencia de escape real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una de esas secuencias de escape sin margen para fallar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en la secuencia de escape. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿te ha pillado también la parte emocional, o vas más a saco con el gameplay?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me ha pillado la parte emocional más de lo que esperaba para ser 'solo' un plataformas."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Precioso, emotivo, y con un movimiento que se siente cada vez mejor — de los metroidvanias que se quedan contigo después de apagar la consola."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de zonas exploradas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te ha pasado también llorar con un videojuego sin avisar? Cuéntamelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      49: {
        name: "Dead Cells",
        summary: "Roguevania de acción frenética donde cada muerte te hace un poco más fuerte para el siguiente intento.",
        difficulty: "dificil",
        emoji: "⚔️",
        steamUrl: "https://store.steampowered.com/app/588650/Dead_Cells/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 49 de Retro 365, y hoy vuelvo a empezar desde cero otra vez. Bienvenidos a Dead Cells."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una muerte rápida al principio de una run. <strong>🎬 Producción:</strong> SFX golpe/muerte del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un roguevania de acción frenética donde cada muerte reorganiza el mapa entero, pero algunas mejoras se quedan contigo para siempre — hoy os cuento por qué engancha tanto volver a intentarlo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 049 · DEAD CELLS" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, ritmo alto</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Controlas una masa de células sin rostro poseyendo cadáveres para explorar una isla en cuarentena — cada muerte te devuelve al principio, pero las mejoras permanentes que vas desbloqueando cambian lo que es posible en la siguiente run."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el árbol de mejoras permanentes. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate combina espadas, arcos, trampas y hechizos que puedes mezclar libremente, cada nivel se genera de forma distinta cada vez, y los jefes obligan a aprenderse patrones reales sin depender solo de la suerte del equipo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate variado — distintas armas en acción. <strong>🎬 Producción:</strong> SFX de combate real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: ¿hasta dónde llego en esta run con el equipo que me ha tocado?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de progreso de la run actual. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué combinación de armas te está funcionando mejor hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy probando combinaciones, pero cuando encuentro un arco bueno ya no quiero soltarlo en toda la run."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Rápido, injusto solo cuando toca, y de los que te hacen decir 'una run más' sin darte cuenta de la hora que es."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de runs jugadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Hasta qué bioma has llegado tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      50: {
        name: "Return of the Obra Dinn",
        summary: "Misterio de deducción en blanco y negro: un barco fantasma, sesenta muertes, y tú tienes que averiguar quién fue quién.",
        difficulty: "media",
        emoji: "🚢",
        steamUrl: "https://store.steampowered.com/app/653530/Return_of_the_Obra_Dinn/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 50 de Retro 365, y hoy tengo que averiguar cómo murieron 60 personas en un barco fantasma. Bienvenidos a Return of the Obra Dinn."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del barco fantasma llegando a puerto. <strong>🎬 Producción:</strong> SFX ambiente marino · corte duro · BGM: sting corto, misterioso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de deducción pura en un estilo visual de un solo bit, en blanco y negro — hoy os cuento por qué resolver este misterio se siente como ser un detective de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 050 · RETURN OF THE OBRA DINN" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, misterioso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "El Obra Dinn vuelve a puerto cinco años después de desaparecer, sin tripulación viva a bordo, y tú, como inspector de seguros, tienes un reloj mágico que te muestra el momento exacto de cada muerte."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay usando el reloj para ver una escena congelada. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada escena congelada es una pista visual y sonora que hay que interpretar del todo — quién es quién, de dónde es, y qué le pasó exactamente — sin que el juego te dé la respuesta nunca de forma directa."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay anotando una muerte en el libro de registro. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una muerte que llevo varias escenas sin conseguir identificar del todo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta sobre una pista. <strong>🎬 Producción:</strong> SFX sting de tensión · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin spoilers, ¿cuántas muertes llevas resueltas ya, o hay alguna pista que te tiene bloqueado?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Llevo bastantes resueltas, pero hay un grupo concreto de la tripulación que todavía tengo hecho un lío."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de detectives de verdad, sin ayudas ni marcadores — de los que te hacen sentir listo cuando por fin encajas la pieza."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de páginas del libro completadas. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Sin destripar nada: ¿te atreverías con este misterio tú solo? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      51: {
        name: "Slay the Spire",
        summary: "El deckbuilder roguelike que definió el género — cada carta cuenta, cada decisión puede acabar con la run entera.",
        difficulty: "media",
        emoji: "🃏",
        steamUrl: "https://store.steampowered.com/app/646570/Slay_the_Spire/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 51 de Retro 365, y hoy subo una torre entera solo con un mazo de cartas. Bienvenidos a Slay the Spire."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate de cartas real. <strong>🎬 Producción:</strong> SFX de carta jugada · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El deckbuilder roguelike que ha definido medio género desde que salió — hoy os cuento por qué cada decisión de carta puede salvarte la run o mandarla directa a la basura."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 051 · SLAY THE SPIRE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Subes una torre maldita combate a combate, construyendo tu mazo de cartas sobre la marcha — cada personaje juega de una forma completamente distinta, y cada run empieza literalmente desde cero."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa de la torre. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada combate es un puzle de energía y cartas: sabes lo que va a hacer el enemigo antes de que lo haga, así que perder no es mala suerte, es no haber jugado bien tus cartas — literalmente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate con la intención del enemigo visible. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una decisión de carta que puede definir toda la run a partir de ahora."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta la elección de carta. <strong>🎬 Producción:</strong> SFX sting de tensión · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué personaje te está gustando más jugar hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy decidiendo, pero el personaje más agresivo es el que más me está enganchando por ahora."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Estratégico de verdad, sin nada de suerte tonta escondida — de los roguelikes que más piden pensar antes de jugar cada carta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la run jugada en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Hasta qué acto has llegado tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      52: {
        name: "Cuphead",
        summary: "Run and gun dibujado a mano al estilo de los dibujos animados de los años 30 — precioso, y durísimo de verdad.",
        difficulty: "dificil",
        emoji: "☕",
        steamUrl: "https://store.steampowered.com/app/268910/Cuphead/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 52 de Retro 365, y hoy le debo mi alma al diablo por una partida de dados. Bienvenidos a Cuphead."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la escena inicial del casino del diablo. <strong>🎬 Producción:</strong> SFX de jazz del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un run and gun dibujado a mano entero al estilo de los dibujos animados de los años 30 — hoy os cuento por qué es tan bonito de ver como durísimo de jugar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 052 · CUPHEAD" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de jazz de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Cuphead y Mugman pierden una apuesta con el diablo y tienen que cobrar deudas de alma a un montón de jefes excéntricos por todo el reino — cada uno es literalmente una pelea de jefe entera, sin niveles normales entre medias."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa del mundo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada jefe tiene varias fases con patrones completamente distintos, aprender a esquivar y disparar a la vez es obligatorio, y todo — absolutamente todo — está animado a mano, fotograma a fotograma, como en los cartoons clásicos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate contra un jefe real del juego. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre fases · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: el jefe que llevo más intentos sin conseguir pasar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos contra el jefe. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué jefe te ha costado más hasta ahora, o cuál te parece el mejor diseñado?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no tengo un favorito claro, pero hay un jefe concreto que me ha hecho tirar el mando más de una vez."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Precioso de ver, brutal de jugar, y sin ni un solo momento de relleno — puro jefe tras jefe de principio a fin."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de jefes enfrentados en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu jefe favorito de Cuphead? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      53: {
        name: "It Takes Two",
        summary: "Aventura cooperativa obligatoria sobre una pareja convertida en muñecos — cada nivel cambia de mecánica por completo.",
        difficulty: "facil",
        emoji: "🤝",
        steamUrl: "https://store.steampowered.com/app/1426210/It_Takes_Two/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 53 de Retro 365, y hoy hace falta otra persona conmigo para poder avanzar. Bienvenidos a It Takes Two."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay cooperativo de una mecánica compartida. <strong>🎬 Producción:</strong> SFX ambiente del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Una aventura cooperativa que solo se puede jugar entre dos, sobre una pareja convertida en muñecos por accidente — hoy os cuento por qué cada nivel se reinventa entero sin repetirse nunca."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 053 · IT TAKES TWO" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Cody y May están a punto de divorciarse cuando su hija, sin querer, los convierte en muñecos de trapo con un hechizo — y ahora tienen que aprender a trabajar juntos de verdad para volver a ser humanos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el jardín en miniatura. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada capítulo introduce mecánicas completamente nuevas —desde controlar un imán hasta manejar el tiempo— que solo funcionan si los dos jugadores cooperan de verdad, sin que ninguno pueda avanzar solo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una mecánica cooperativa concreta. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un puzle cooperativo que necesita coordinación real, no solo buena puntería por separado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al puzle cooperativo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿con quién lo estás jugando, y qué mecánica de las que ha ido cambiando te ha gustado más?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Cada capítulo nuevo me sorprende más que el anterior — es de los pocos juegos que se atreve a no repetir nunca la misma mecánica."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un juego cooperativo de verdad, no uno individual con un segundo mando pegado — de los mejores para jugar acompañado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de mecánicas jugadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Con quién lo jugarías tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      54: {
        name: "Hi-Fi Rush",
        summary: "Acción rítmica donde todo el mundo se mueve al ritmo de la música — incluidos tus propios golpes.",
        difficulty: "media",
        emoji: "🎸",
        steamUrl: "https://store.steampowered.com/app/1817230/HiFi_RUSH/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 54 de Retro 365, y hoy hasta las explosiones del escenario van al ritmo de la música. Bienvenidos a Hi-Fi Rush."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate sincronizado con la música. <strong>🎬 Producción:</strong> SFX musical del juego · corte duro · BGM: sting corto, con ritmo</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de acción donde absolutamente todo el escenario late al ritmo de la canción de fondo — hoy os cuento por qué esta mezcla de combate y música funciona tan bien."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 054 · HI-FI RUSH" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, con ritmo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Chai sueña con ser una estrella de rock, pero un accidente de laboratorio le fusiona un reproductor de música al pecho — y de repente todo su mundo, incluido él mismo, empieza a moverse en sincronía con la banda sonora."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mundo moviéndose al ritmo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Golpear a tiempo con la música da más daño y mejores combos, así que el combate premia tener oído además de reflejos — y el propio juego te avisa visualmente del ritmo en todo momento, sin obligarte a memorizar nada de música."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate encadenando combos al ritmo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver si consigo mantener el ritmo entero de este combate sin fallar un solo golpe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de combo en pantalla. <strong>🎬 Producción:</strong> SFX sting al romper el combo · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿se te da bien lo de mantener el ritmo, o se te acaba yendo la pinza con los combos?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Al principio se me iba el ritmo constantemente, pero en cuanto le pillas el truco es difícil dejarlo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Original de verdad, con un estilo propio y una banda sonora que se te queda pegada — de los juegos más frescos que he probado en mucho tiempo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Se te da bien lo de ir al ritmo en los juegos? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      55: {
        name: "Outer Wilds",
        summary: "Exploración espacial en bucle temporal de 22 minutos — cada vuelta sabes un poco más sobre el misterio de tu sistema solar.",
        difficulty: "media",
        emoji: "🚀",
        steamUrl: "https://store.steampowered.com/app/753640/Outer_Wilds/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 55 de Retro 365, y en 22 minutos el sol de este sistema va a explotar. Otra vez. Bienvenidos a Outer Wilds."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la explosión final del bucle. <strong>🎬 Producción:</strong> SFX de explosión real del juego · corte duro · BGM: sting corto, misterioso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de exploración espacial atrapado en un bucle temporal de 22 minutos — hoy os cuento por qué morir una y otra vez es aquí la forma real de avanzar en la historia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 055 · OUTER WILDS" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, misterioso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres el nuevo explorador de una especie alienígena curiosa, y descubres que el sol explota cada 22 minutos, reiniciando el tiempo — pero tú recuerdas todo lo aprendido en cada vuelta anterior."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay despegando de tu planeta natal. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "No hay ni un solo tutorial que te diga qué hacer: cada planeta esconde piezas reales del misterio, y el propio conocimiento que vas anotando en tu nave es el único progreso permanente que existe en este juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un planeta nuevo del sistema. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver qué consigo descubrir en esta vuelta concreta del bucle antes de que explote el sol otra vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de tiempo restante del bucle. <strong>🎬 Producción:</strong> SFX de tensión creciente · BGM: sube según se acerca el final</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar nada, ¿cuánto llevas descubierto del misterio, o qué planeta te ha sorprendido más?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Llevo descubierto bastante, pero cada planeta nuevo me hace más preguntas de las que responde, y eso me encanta."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un misterio de verdad, sin marcadores ni ayudas — de los pocos juegos donde el conocimiento propio es literalmente tu única arma."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de planetas explorados en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Sin spoilers grandes: ¿te atreverías con este misterio tú solo? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      56: {
        name: "Baba Is You",
        summary: "El puzzle donde las propias reglas del juego son piezas que puedes mover — resolver un nivel a veces significa reescribirlo entero.",
        difficulty: "media",
        emoji: "🐇",
        steamUrl: "https://store.steampowered.com/app/736260/Baba_Is_You/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 56 de Retro 365, cierre de esta tanda, y hoy voy a reescribir las reglas del propio juego para ganar. Bienvenidos a Baba Is You."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay moviendo un bloque de regla del juego. <strong>🎬 Producción:</strong> SFX de bloque movido · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un puzzle donde las reglas del juego son literalmente bloques que puedes empujar y reorganizar — hoy os cuento por qué esta idea tan simple da para cientos de niveles distintos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 056 · BABA IS YOU" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Controlas a Baba porque una frase en el propio nivel dice 'BABA ES TÚ' — pero esa frase también son bloques físicos que puedes empujar, así que cambiar las reglas es la única forma real de avanzar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando las frases-bloque de un nivel. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Puedes hacer que una roca sea 'tú' en vez de Baba, que el agua sea 'ganar' en vez de 'hundir', o que las paredes dejen de ser 'parar' — el juego no tiene límite real de soluciones, solo las que se te ocurran a ti."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay resolviendo un puzle cambiando una regla clave. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un nivel que llevo un rato sin ver la solución de reglas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta la solución. <strong>🎬 Producción:</strong> SFX sting de tensión · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál ha sido la regla más rara que has conseguido usar para resolver un nivel?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "La regla más rara que he usado hasta ahora ha sido convertir una pared entera en 'ganar' — se siente hacer trampa aunque sea legal."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Una idea simple llevada al extremo, con soluciones que ni el propio juego espera que encuentres — cierre perfecto para esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de reglas usadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál sería la regla que te gustaría poder cambiar en la vida real? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      57: {
        name: "Silent Hill 2",
        summary: "El remake del survival horror psicológico que define el género — niebla, monstruos, y una carta que te lleva a un pueblo que no debería existir.",
        difficulty: "dificil",
        emoji: "🌫️",
        steamUrl: "https://store.steampowered.com/app/2124490/SILENT_HILL_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 57 de Retro 365, y hoy recibo una carta de mi mujer muerta pidiéndome que vaya a buscarla. Bienvenidos al remake de Silent Hill 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la niebla del pueblo apareciendo. <strong>🎬 Producción:</strong> SFX ambiente de niebla y estática · corte duro · BGM: sting corto, inquietante</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El remake de uno de los survival horror psicológicos más respetados de la historia — hoy os cuento por qué este pueblo sigue metiendo tanto miedo veinte años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 057 · SILENT HILL 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, inquietante</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "James Sunderland recibe una carta de su esposa Mary, que lleva tres años muerta, pidiéndole que vaya a Silent Hill — y a partir de ahí, cada monstruo y cada rincón del pueblo empieza a significar mucho más de lo que parece a simple vista."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una calle del pueblo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La radio con estática avisa de peligro antes de que lo veas, los combates son torpes a propósito para que nunca te sientas seguro, y cada enemigo está diseñado como metáfora directa de los traumas del propio James."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate tenso con un enemigo real del juego. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube la tensión</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: el primer encuentro real con Pyramid Head, sin saber muy bien qué esperar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al encuentro en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión de golpe</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: si jugaste el original, ¿qué tal te está sentando el remake, o es tu primera vez en Silent Hill?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Es mi primera vez de verdad en Silent Hill, y entiendo perfectamente por qué la gente lleva veinte años hablando de este juego."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Terror psicológico de verdad, no solo sustos baratos — de los remakes que respetan por completo lo que hizo especial al original."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de momentos de tensión del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te atreverías a entrar en la niebla tú solo? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      58: {
        name: "Kingdom Come: Deliverance",
        summary: "RPG medieval sin fantasía ni magia: espadas de verdad, enfermedades reales, y un mundo que no te espera si vas mal preparado.",
        difficulty: "dificil",
        emoji: "⚔️",
        steamUrl: "https://store.steampowered.com/app/379430/Kingdom_Come_Deliverance/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 58 de Retro 365, y hoy me han dado una paliza por no saber ni sujetar bien una espada. Bienvenidos a Kingdom Come: Deliverance."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate torpe con espada. <strong>🎬 Producción:</strong> SFX de choque de espadas · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG medieval sin ni una gota de fantasía: nada de magia, nada de dragones, solo un reino real del siglo XV y sus problemas de verdad — hoy os cuento por qué es tan duro como fascinante."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 058 · KINGDOM COME: DELIVERANCE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, medieval</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Henry, hijo de un herrero, ve cómo su aldea es arrasada y se ve arrastrado a una guerra real de Bohemia en 1403 — sin ser un elegido, sin poderes especiales, solo un chico normal aprendiendo a sobrevivir."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el mundo abierto medieval. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate con espada tiene un sistema de direcciones real que hay que aprender desde cero, te puedes enfermar, emborrachar o ensuciar la ropa, y hasta leer es una habilidad que tienes que entrenar — nada viene regalado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del sistema de combate direccional. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: mi primer duelo real contra un bandido con más experiencia que yo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando en tiempo real al duelo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué tal se te está dando el combate realista, o te está costando más de lo que esperabas?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me está costando bastante más de lo que pensaba — aquí no vale spamear un botón, hay que pensar cada golpe de verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG con los pies en el suelo de verdad, sin atajos ni magia que lo arregle todo — de los que más respetan tu tiempo y tu paciencia a la vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te gustan los RPG realistas o prefieres la fantasía de siempre? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      59: {
        name: "Vampire Survivors",
        summary: "Sobrevive a oleadas infinitas de monstruos mientras tu propio poder se vuelve absurdamente ridículo en minutos.",
        difficulty: "facil",
        emoji: "🧛",
        steamUrl: "https://store.steampowered.com/app/1794680/Vampire_Survivors/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 59 de Retro 365, y en diez minutos voy a tener tanto poder en pantalla que ni yo mismo me voy a ver. Bienvenidos a Vampire Survivors."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una pantalla saturada de enemigos y ataques. <strong>🎬 Producción:</strong> SFX de combate masivo · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego donde solo tienes que moverte y sobrevivir mientras tus armas atacan solas — hoy os cuento por qué esta idea tan simple ha creado un género entero de imitadores."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 059 · VAMPIRE SURVIVORS" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eliges un personaje, entras a un escenario, y durante 30 minutos oleadas de monstruos cada vez más numerosas intentan acabar contigo — tú solo te mueves, tus armas hacen el resto solas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa de escenario elegido. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada nivel te da a elegir entre varias mejoras de armas, y combinarlas bien puede convertir tu personaje en una máquina de destrucción total antes de que se acabe el reloj — el mapa entero acaba lleno de efectos por todos lados."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay eligiendo una mejora de arma. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver si consigo sobrevivir hasta el final del reloj esta vez."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador del reloj de la run en pantalla. <strong>🎬 Producción:</strong> SFX de tensión creciente · BGM: sube según avanza el reloj</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué combinación de armas te ha dado el resultado más ridículo hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy buscando la combinación perfecta, pero cuando la pantalla se llena de proyectiles propios es de lo más satisfactorio que hay."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Simple, barato, y muchísimo más adictivo de lo que parece por fuera — de los juegos que dices 'una run más' sin darte cuenta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de runs jugadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Hasta qué minuto has aguantado tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      60: {
        name: "Death Stranding",
        summary: "Repartir paquetes por un mundo post-apocalíptico se convierte en una de las experiencias más raras y personales de Kojima.",
        difficulty: "media",
        emoji: "📦",
        steamUrl: "https://store.steampowered.com/app/1190460/DEATH_STRANDING/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 60 de Retro 365, y hoy mi misión es literalmente llevar un paquete de un sitio a otro sin caerme. Bienvenidos a Death Stranding."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay cruzando un terreno complicado cargado de paquetes. <strong>🎬 Producción:</strong> SFX ambiente real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El juego más raro de Hideo Kojima hasta la fecha, donde repartir paquetes por un mundo roto se convierte en toda una experiencia emocional — hoy os cuento por qué no es tan aburrido como suena en el papel."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 060 · DEATH STRANDING" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Sam Porter Bridges tiene que reconectar una América post-apocalíptica repartiendo cargamentos entre ciudades aisladas, mientras esquiva criaturas invisibles del más allá y un terreno que por sí solo ya es el enemigo principal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un paisaje montañoso. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cargar bien el peso, escoger la ruta correcta, y no perder el equilibrio importa tanto como cualquier combate — y lo más curioso es que las estructuras que construyen otros jugadores reales aparecen también en tu propia partida para ayudarte."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una estructura construida por otro jugador. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: cruzar un terreno especialmente traicionero sin perder ni un solo paquete."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un tropiezo en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿te está enganchando lo de repartir paquetes, o te está costando entrar en el rollo?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Al principio me costó entrar, pero cuando llevas un rato se convierte en algo casi meditativo que no esperaba disfrutar tanto."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Rarísimo, lento, y precisamente por eso distinto a todo lo demás — de los juegos que hay que probar sin esperar nada parecido antes."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de entregas hechas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te atreverías a repartir paquetes por un mundo roto? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      61: {
        name: "Titanfall 2",
        summary: "Shooter en primera persona con parkour fluido y mechas gigantes — la campaña más infravalorada de su generación.",
        difficulty: "media",
        emoji: "🤖",
        steamUrl: "https://store.steampowered.com/app/1237970/Titanfall_2/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 61 de Retro 365, y hoy corro por las paredes antes de invocar a un mecha gigante desde el cielo. Bienvenidos a Titanfall 2."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay corriendo por una pared y llamando al Titán. <strong>🎬 Producción:</strong> SFX real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un shooter en primera persona con parkour fluido de verdad y mechas gigantes pilotables — hoy os cuento por qué su campaña sigue considerada una de las mejores que nadie jugó a tiempo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 061 · TITANFALL 2" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Jack Cooper, un simple soldado de infantería, se convierte de golpe en piloto de Titán cuando su mentor muere en combate — y su Titán, BT, se convierte en el compañero más memorable de todo el juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una conversación con BT. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El movimiento a pie es rapidísimo — correr por paredes, doble salto, deslizarte — y en cualquier momento puedes saltar dentro de tu Titán para convertirte literalmente en un tanque andante durante unos minutos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate real dentro del Titán. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una de las secuencias de plataformas más famosas del juego, sin practicarla antes."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la secuencia en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿lo habías jugado ya, o te habías quedado con las ganas como mucha gente en su momento?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me había quedado con las ganas en su momento, y ahora entiendo perfectamente por qué la gente sigue hablando de esta campaña años después."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Rápido, espectacular, y con una campaña que no le sobra ni un solo minuto — un básico injustamente olvidado de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Lo jugaste en su momento tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      62: {
        name: "Inside",
        summary: "Plataformas oscuro y sin diálogos donde un niño huye de algo que nunca se explica del todo — hasta un final que no vas a olvidar.",
        difficulty: "media",
        emoji: "👤",
        steamUrl: "https://store.steampowered.com/app/304430/INSIDE/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 62 de Retro 365, y nadie me ha explicado ni una sola palabra de por qué estoy huyendo. Bienvenidos a Inside."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del niño corriendo por un bosque oscuro. <strong>🎬 Producción:</strong> sin SFX destacado · corte duro · BGM: sting corto, inquietante</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un plataformas oscuro sin una sola línea de diálogo en todo el juego — hoy os cuento por qué el silencio total aquí da más miedo que cualquier explicación."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 062 · INSIDE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, inquietante</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Controlas a un niño sin nombre huyendo a través de un bosque, una granja y unas instalaciones que parecen esconder algo mucho más grande — sin un solo texto ni voz que te diga qué está pasando de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una instalación abandonada. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada puzle es sencillo de entender pero incómodo de resolver — esconderte, empujar objetos, controlar a otras criaturas — mientras el propio ambiente te va dando pistas visuales de una historia que nunca se explica en voz alta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay resolviendo un puzle ambiental real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una persecución real, sin saber muy bien qué me va a pasar si me atrapan."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la persecución en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar el final, ¿qué crees que está pasando de verdad en este juego?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no tengo ni idea de qué está pasando, y precisamente por eso no puedo parar de jugarlo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Corto, incómodo, y con un final que da para hablar horas — de los juegos que dicen más callando que la mayoría hablando."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de momentos de tensión del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Sin spoilers grandes: ¿qué crees tú que significa este juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      63: {
        name: "Katana ZERO",
        summary: "Acción de un solo golpe, manipulación del tiempo, y una historia de neón que se cuenta entre nivel y nivel.",
        difficulty: "dificil",
        emoji: "🗡️",
        steamUrl: "https://store.steampowered.com/app/460950/Katana_ZERO/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 63 de Retro 365, y hoy un solo golpe me mata a mí o al enemigo, no hay término medio. Bienvenidos a Katana ZERO."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un asesinato de un solo golpe. <strong>🎬 Producción:</strong> SFX de katana real del juego · corte duro · BGM: sting corto, synthwave</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de acción donde cada nivel es un puzle de ensayo y error a toda velocidad, con capacidad de ralentizar el tiempo — hoy os cuento por qué la historia entre niveles pega tan fuerte como el propio gameplay."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 063 · KATANA ZERO" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, synthwave</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un asesino a sueldo con una katana y la capacidad de predecir el futuro a corto plazo, trabajando para alguien que te da misiones a través de cintas de casete — y algo va muy mal contigo desde el principio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la escena de la sala de terapia. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada nivel se resuelve muriendo decenas de veces hasta encontrar la ruta perfecta, ralentizar el tiempo te deja esquivar balas al filo del segundo, y al final de cada nivel puedes elegir qué decir en los diálogos — cambiando la historia de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una secuencia perfeccionada tras varios intentos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la habitación que llevo más intentos sin conseguir limpiar entera."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin spoilers, ¿qué opción de diálogo has elegido tú hasta ahora en las conversaciones importantes?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "He ido eligiendo las opciones más agresivas, y no sé si eso me va a pasar factura más adelante."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Brutal, estiloso, y con una historia que engancha más de lo que un juego de acción tan corto debería permitirse — pura calidad sin relleno."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de habitaciones limpiadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Confiarías tú en el tipo de las cintas de casete? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      64: {
        name: "Monster Hunter: World",
        summary: "Caza monstruos gigantes pieza a pieza para fabricarte el equipo con el que cazar al siguiente, más grande todavía.",
        difficulty: "dificil",
        emoji: "🐉",
        steamUrl: "https://store.steampowered.com/app/582010/Monster_Hunter_World/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 64 de Retro 365, y hoy un dragón del tamaño de un edificio me acaba de tirar al suelo de un coletazo. Bienvenidos a Monster Hunter: World."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del monstruo derribando al cazador. <strong>🎬 Producción:</strong> SFX de impacto real del juego · corte duro · BGM: sting corto, épico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de caza de monstruos gigantes donde cada pieza que consigues sirve para fabricar el equipo con el que enfrentarte al siguiente — hoy os cuento por qué este ciclo engancha tanto como parece."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 064 · MONSTER HUNTER: WORLD" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, épico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un cazador enviado al Nuevo Mundo para investigar una migración masiva de monstruos gigantes — cada zona es un ecosistema real donde las criaturas se pelean entre ellas incluso sin que tú intervengas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de dos monstruos peleando entre sí. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada una de las 14 armas se juega de forma completamente distinta, cazar un monstruo puede llevar 20 minutos reales de combate estudiando sus patrones, y las piezas que te da al final sirven para fabricar armadura y armas nuevas — el ciclo perfecto de recompensa."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate largo contra un monstruo real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la primera cacería real contra este monstruo en concreto, sin conocer aún sus patrones."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a un ataque sorpresa del monstruo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué arma te está gustando más de las que has probado hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy probando armas, pero las que van más a lo bestia son las que más me están enganchando de momento."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Exigente de verdad, con una sensación de progreso que se nota en cada pieza de armadura nueva — de los juegos que más recompensan la paciencia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la cacería del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Qué monstruo te gustaría que cazara en directo? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      65: {
        name: "Doom Eternal",
        summary: "Shooter ultrarrápido donde recargar munición significa literalmente descuartizar demonios con las manos.",
        difficulty: "dificil",
        emoji: "👹",
        steamUrl: "https://store.steampowered.com/app/782330/DOOM_Eternal/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 65 de Retro 365, y hoy me quedo sin munición en medio de un ejército de demonios. La solución: arrancarles un brazo. Bienvenidos a Doom Eternal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una ejecución brutal (glory kill). <strong>🎬 Producción:</strong> SFX real del juego · corte duro · BGM: sting corto, metal</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un shooter ultrarrápido donde estar quieto es la forma más rápida de morir — hoy os cuento por qué su sistema de recursos te obliga a jugar siempre a la ofensiva."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 065 · DOOM ETERNAL" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, metal</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "El Doom Slayer vuelve a la Tierra a detener una invasión demoníaca a gran escala — sin mucho más argumento del necesario, porque aquí lo importante es lo que pasa en cada combate."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un escenario infernal. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La munición se recupera con la motosierra, la vida con ejecuciones cuerpo a cuerpo, y la armadura prendiendo fuego a los enemigos — así que el juego te empuja constantemente a moverte y rotar entre armas en vez de esconderte."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real rotando entre armas y recursos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una arena entera de demonios sin ningún sitio real donde esconderse."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la arena de combate. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué arma o mejora te está gustando más de las que llevas desbloqueadas?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "La motosierra se ha convertido en mi solución para todo, aunque sé que debería usar más variedad de armas."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Rápido, brutal, y con un sistema de combate que premia la agresividad más que ningún otro shooter que haya jugado — pura adrenalina sin pausa."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu arma favorita de la saga Doom? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      66: {
        name: "Untitled Goose Game",
        summary: "Eres un ganso. Tu único objetivo es fastidiar a todo un pueblo. Es tan tonto como perfecto.",
        difficulty: "facil",
        emoji: "🦢",
        steamUrl: "https://store.steampowered.com/app/1149460/Untitled_Goose_Game/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 66 de Retro 365, y hoy mi único objetivo en la vida es robarle las gafas a un señor mayor. Bienvenidos a Untitled Goose Game."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del ganso robando un objeto. <strong>🎬 Producción:</strong> SFX de graznido real del juego · corte duro · BGM: sting corto, orquestal</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Eres un ganso, y tu único objetivo es fastidiar a un pueblo entero de la forma más molesta posible — hoy os cuento por qué esta idea tan tonta es una de las más geniales de los últimos años."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 066 · UNTITLED GOOSE GAME" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, orquestal</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "No hay historia ni explicación de ningún tipo: eres un ganso terrible con la gente, y cada zona del pueblo tiene una lista de travesuras que completar molestando a sus habitantes."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la lista de tareas del ganso. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Solo puedes agarrar cosas con el pico, graznar y correr, pero con eso basta para robar, esconder objetos y hacer que la gente del pueblo se vuelva completamente loca contigo — cada puzle se resuelve siendo lo más molesto posible."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay resolviendo una travesura real del juego. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la travesura que más me está costando resolver de todo el pueblo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al intento fallido. <strong>🎬 Producción:</strong> SFX sting cómico · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál ha sido la travesura que más te ha hecho reír hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "La que más me ha hecho reír ha sido conseguir que dos vecinos se pelearan entre ellos sin que se dieran cuenta de que fui yo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Corto, tontísimo, y absolutamente perfecto en lo que se propone — a veces la idea más simple es la que mejor funciona."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de travesuras del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿A quién le harías la vida imposible tú si fueras un ganso? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      67: {
        name: "Sekiro: Shadows Die Twice",
        summary: "Acción y sigilo samurái con un sistema de postura que convierte cada duelo en un baile de espadas sin margen de error.",
        difficulty: "dificil",
        emoji: "🥷",
        steamUrl: "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 67 de Retro 365, y hoy voy a morir dos veces por el mismo enemigo, literalmente. Bienvenidos a Sekiro: Shadows Die Twice."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un duelo de espadas real. <strong>🎬 Producción:</strong> SFX de choque de katanas · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de acción samurái donde parar el golpe importa más que esquivarlo — hoy os cuento por qué este sistema de postura cambia por completo cómo se siente pelear."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 067 · SEKIRO: SHADOWS DIE TWICE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres un shinobi con un brazo protésico lleno de herramientas, buscando rescatar a tu señor secuestrado en un Japón feudal alternativo — y con la habilidad de resucitar una vez tras morir, si sabes cuándo usarla."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el escenario feudal. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Parar los golpes en el momento justo rompe la postura del enemigo hasta poder rematarlo de un solo golpe — así que cada duelo se convierte en un ritmo de ataque y parada que hay que aprender de memoria, jefe a jefe."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un duelo real contra un jefe. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: el jefe que llevo más intentos sin conseguir romperle la postura del todo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos contra el jefe. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿te está costando más el sistema de parada que en otros juegos parecidos, o le has cogido el truco rápido?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me está costando bastante más de lo que esperaba — aquí no vale con esquivar todo el rato, hay que atreverse a parar de verdad."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Exigente hasta la médula, pero con un sistema de combate tan preciso que hace que cada victoria se sienta ganada de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de duelos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuántos intentos te costó tu jefe más difícil de este juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      68: {
        name: "Baldur's Gate 3",
        summary: "RPG por turnos basado en Dungeons & Dragons con una libertad de decisiones que pocos juegos se atreven a ofrecer de verdad.",
        difficulty: "media",
        emoji: "🎲",
        steamUrl: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 68 de Retro 365, y hoy he resuelto un problema entero hablando en vez de peleando. Bienvenidos a Baldur's Gate 3."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una conversación con opciones de diálogo reales. <strong>🎬 Producción:</strong> sin SFX destacado · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un RPG por turnos basado en Dungeons & Dragons con una libertad de decisiones brutal — hoy os cuento por qué casi cualquier idea rara que se te ocurra probar, aquí funciona de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 068 · BALDUR'S GATE 3" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Tu personaje ha sido infectado por un parásito de mente ilithid, y tiene que encontrar una cura antes de convertirse en un monstruo — mientras reúne a un grupo de compañeros con sus propios problemas reales por resolver."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el campamento del grupo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Los combates por turnos usan reglas reales de Dungeons & Dragons, casi todo el escenario es interactivo de verdad, y muchísimas situaciones se pueden resolver de formas completamente distintas según lo que decidas — sin un único camino correcto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate táctico por turnos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una decisión importante que puede cambiar el rumbo de toda esta partida."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta la decisión. <strong>🎬 Producción:</strong> SFX sting de tensión · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué personaje del grupo te está gustando más hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy conociendo al grupo, pero ya hay un compañero cuya historia me tiene enganchado más que el resto."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Libertad de verdad, sin decisiones de cartón piedra — de los RPG con más peso real detrás de cada elección que he jugado en años."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de decisiones tomadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Qué clase jugarías tú en un mundo de Dungeons & Dragons? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      69: {
        name: "Journey",
        summary: "Cruza un desierto hacia una montaña lejana, casi sin palabras, y posiblemente acompañado de un desconocido real.",
        difficulty: "facil",
        emoji: "🏜️",
        steamUrl: "https://store.steampowered.com/app/638230/Journey/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 69 de Retro 365, y hoy solo tengo una montaña lejana como objetivo y ni una sola palabra de por medio. Bienvenidos a Journey."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la figura con capa cruzando el desierto. <strong>🎬 Producción:</strong> sin SFX destacado · corte duro · BGM: sting corto, orquestal</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de exploración precioso, casi sin texto ni voz, donde el objetivo es simplemente cruzar un desierto hacia una montaña que se ve desde el principio — hoy os cuento por qué su final sigue emocionando años después."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 069 · JOURNEY" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, orquestal</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "No hay nombre, ni diálogo, ni interfaz real más allá de lo esencial — solo una figura con capa cruzando ruinas y dunas hacia una montaña que se puede ver, literalmente, desde el primer minuto de juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la montaña a lo lejos. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Puedes encontrarte de forma aleatoria con otro jugador real durante el viaje, sin chat de voz ni texto — solo un sonido para comunicaros — y muchísima gente termina el juego sintiendo que ese desconocido se convirtió en algo importante."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real con otro jugador acompañando. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver si me cruzo con algún otro jugador real durante este tramo del viaje."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando si aparece otro jugador. <strong>🎬 Producción:</strong> SFX suave · BGM: sube emotivamente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿te has cruzado ya con algún otro jugador, o qué parte del viaje te ha emocionado más hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no me he cruzado con nadie, pero solo el paisaje ya me ha dejado con la boca abierta más de una vez."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Corto, precioso, y con una de las experiencias multijugador más raras y bonitas que existen — de los juegos que se sienten más que se juegan."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del viaje del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Has tenido tú algún momento así con un desconocido en un juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      70: {
        name: "Papers, Please",
        summary: "Eres inspector de fronteras en un país ficticio: cada sello que pones (o no pones) tiene consecuencias reales para alguien.",
        difficulty: "media",
        emoji: "🛂",
        steamUrl: "https://store.steampowered.com/app/239030/Papers_Please/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 70 de Retro 365, y hoy tengo que decidir si dejo pasar a alguien con los papeles casi en regla. Bienvenidos a Papers, Please."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay revisando un pasaporte real del juego. <strong>🎬 Producción:</strong> SFX de sello real del juego · corte duro · BGM: sting corto, burocrático</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego donde eres inspector de fronteras en un país ficticio de la guerra fría — hoy os cuento por qué revisar papeles se convierte en uno de los dilemas morales más intensos que he jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 070 · PAPERS, PLEASE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, burocrático</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Trabajas en el puesto fronterizo del país ficticio de Arstotzka, revisando documentos de personas que quieren entrar — y tu sueldo depende literalmente de cuántos errores cometas al día."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el sueldo y los gastos del día. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada documento hay que revisarlo entero — fechas, sellos, coincidencia de fotos — y algunas personas te van a contar historias reales que te ponen en el dilema de seguir las normas o hacer lo que crees justo, sabiendo que ambas opciones tienen consecuencias."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una revisión de documentos con un dilema real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una decisión de verdad complicada con alguien que me acaba de contar su historia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta la decisión. <strong>🎬 Producción:</strong> SFX sting de tensión · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿has seguido las normas a rajatabla hasta ahora, o ya te has saltado alguna por hacer lo que creías correcto?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "He intentado seguir las normas al pie de la letra, pero ya he tenido un par de momentos donde me ha costado mucho hacerlo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un juego sobre sellos y papeles que consigue hacerte sentir el peso real de cada decisión — de los que menos esperarías que te afectaran tanto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de decisiones tomadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Tú seguirías las normas o harías lo que crees justo? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      71: {
        name: "Streets of Rage 4",
        summary: "El resurgir de un clásico beat 'em up de los 90 — golpes, combos, y un pixel art precioso hecho a mano.",
        difficulty: "media",
        emoji: "👊",
        steamUrl: "https://store.steampowered.com/app/985890/Streets_of_Rage_4/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 71 de Retro 365, cierre de esta tanda, y hoy voy a limpiar la calle a golpes yo solo. Bienvenidos a Streets of Rage 4."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combo real contra varios enemigos. <strong>🎬 Producción:</strong> SFX de golpes real del juego · corte duro · BGM: sting corto, funk</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El regreso de una saga clásica de beat 'em up de los 90, con un pixel art dibujado a mano precioso — hoy os cuento por qué este resurgir ha salido mucho mejor de lo que nadie esperaba."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 071 · STREETS OF RAGE 4" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, funk</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Diez años después de derrotar al villano original, una nueva amenaza controla la ciudad con música hipnótica — y los antiguos héroes vuelven a la calle a repartir golpes, nivel tras nivel, como en los 90."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el primer nivel de la ciudad. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada personaje tiene su propio set de combos y movimientos especiales, encadenar golpes sin recibir daño da puntuación extra real, y jugarlo con un amigo en cooperativo local es exactamente como se recuerda de la época dorada del género."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combo largo encadenado. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: el jefe de final de nivel que más me está costando de toda la tanda de hoy."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al combate contra el jefe. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿jugaste los Streets of Rage clásicos, o es tu primera vez con la saga?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Jugué los clásicos de pequeño, y este resurgir me ha devuelto exactamente esa misma sensación con mejores gráficos."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un beat 'em up hecho con muchísimo cariño al original — cierre perfecto para esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Jugaste los Streets of Rage clásicos tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      72: {
        name: "Hades II",
        summary: "La secuela del roguelike de Supergiant: ahora eres Melinoë, hechicera del inframundo, con magia nueva y un ritmo aún más frenético.",
        difficulty: "dificil",
        emoji: "🔥",
        steamUrl: "https://store.steampowered.com/app/1145350/Hades_II/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 72 de Retro 365, y hoy vuelvo a morir. Otra vez. Pero esta vez soy una hechicera, no un príncipe. Bienvenidos a Hades II."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una muerte rápida al principio. <strong>🎬 Producción:</strong> SFX golpe/muerte del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "La secuela del roguelike que ya jugamos hace tiempo en Retro 365 — hoy os cuento qué cambia de verdad con Melinoë al mando y magia nueva de por medio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 072 · HADES II" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, ritmo alto</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Melinoë, hija de Hades y princesa del inframundo, se enfrenta esta vez al Titán del Tiempo — con un nuevo hub central, nuevas armas, y un sistema de magia que se suma al combate cuerpo a cuerpo de siempre."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el nuevo hub central. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "La magia se recarga con el tiempo, así que ahora hay que decidir entre ataques normales y hechizos según el momento del combate, las bendiciones de los dioses se combinan igual de bien que en el original, y cada run se sigue sintiendo distinta a la anterior."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay variado — combate cuerpo a cuerpo y magia en acción. <strong>🎬 Producción:</strong> SFX de combate real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combates</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: ¿cuántos intentos me lleva pasar de esta zona hoy?"</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de intentos en pantalla. <strong>🎬 Producción:</strong> SFX sting dramático en cada muerte · BGM: caída breve tras cada muerte, luego vuelve</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: si jugaste el primer Hades, ¿qué cambio de esta secuela te está gustando más?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "El sistema de magia es lo que más me está gustando — le da una capa extra al combate que el original no tenía."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Una secuela que se atreve a cambiar cosas de verdad, sin perder lo que hizo grande al original — Retro 365 tenía que volver al inframundo tarde o temprano."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap rápido de highlights del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Prefieres el original o esta secuela? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      73: {
        name: "Balatro",
        summary: "Un solitario de póker que se convierte en un roguelike adictivo hasta límites ridículos — cada partida es una obsesión nueva.",
        difficulty: "media",
        emoji: "🃏",
        steamUrl: "https://store.steampowered.com/app/2379780/Balatro/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 73 de Retro 365, y hoy un solitario de cartas se ha convertido en la razón de que sean las tres de la mañana. Bienvenidos a Balatro."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una mano de póker con multiplicadores altísimos. <strong>🎬 Producción:</strong> SFX de carta jugada · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de póker en solitario convertido en roguelike, hecho por una sola persona — hoy os cuento por qué es una de las sorpresas más adictivas de los últimos años."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 073 · BALATRO" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Juegas manos de póker normales contra una puntuación objetivo cada ronda, pero vas comprando comodines que multiplican tu puntuación de formas cada vez más absurdas — el objetivo real es romper el juego por completo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando la tienda de comodines. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada comodín interactúa con los demás de formas que ni te esperas, algunas combinaciones te dejan hacer puntuaciones que suenan a mentira, y la dificultad va subiendo cada ronda hasta obligarte a optimizar tu mazo de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una puntuación final absurda en pantalla. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver si esta combinación de comodines es tan buena como creo que es."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la puntuación en directo. <strong>🎬 Producción:</strong> SFX de tensión creciente · BGM: sube según se acerca el resultado</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál ha sido la combinación de comodines más ridícula que has conseguido montar hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no he encontrado mi combinación perfecta, pero cada vez que rompo mi propio récord me engancho un poco más."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Simple de entender, imposible de soltar — de esos juegos donde 'una partida más' se convierte en una mentira que te cuentas a ti mismo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la mejor mano del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu puntuación más alta en este juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      74: {
        name: "Terraria",
        summary: "Minería, construcción y combate en 2D con un contenido tan grande que parece que nunca se termina de descubrir del todo.",
        difficulty: "media",
        emoji: "⛏️",
        steamUrl: "https://store.steampowered.com/app/105600/Terraria/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 74 de Retro 365, y hoy voy a cavar un agujero tan grande que voy a acabar en el infierno. Literalmente. Bienvenidos a Terraria."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay excavando hacia zonas profundas. <strong>🎬 Producción:</strong> SFX de minería real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un sandbox 2D de minería, construcción y combate con más contenido del que nadie es capaz de ver entero — hoy os cuento por qué sigue recibiendo actualizaciones gratis años después de salir."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 074 · TERRARIA" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Llegas a un mundo generado al azar con solo un hacha y una espada básica, y de ahí todo depende de ti: excavar hacia abajo, construir hacia arriba, o explorar en horizontal buscando biomas cada vez más raros y peligrosos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando el mapa del mundo generado. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada material nuevo desbloquea herramientas y armas mejores, hay jefes reales que invocar cuando estás preparado, y construir tu propia base se convierte en su propio minijuego dentro del juego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate contra un jefe real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver qué me encuentro bajando un poco más de lo que debería."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay bajando a una zona nueva y peligrosa. <strong>🎬 Producción:</strong> SFX de tensión creciente · BGM: sube según se acerca el peligro</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué estás priorizando tú, la exploración, el combate contra jefes, o construir tu propia base?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Empecé queriendo solo explorar y acabé más obsesionado con construir la base perfecta de lo que admito."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un mundo entero por descubrir con tus propias reglas — de los sandbox con más contenido real que existen, sin relleno de por medio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la base construida en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Minero, constructor, o cazador de jefes? Dime en comentarios qué eres tú."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      75: {
        name: "Subnautica",
        summary: "Supervivencia bajo el agua en un planeta alienígena — tan bonito de explorar como aterrador cuando te alejas de la superficie.",
        difficulty: "media",
        emoji: "🌊",
        steamUrl: "https://store.steampowered.com/app/264710/Subnautica/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 75 de Retro 365, y hoy mi nave se ha estrellado en un planeta que es prácticamente todo océano. Bienvenidos a Subnautica."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la nave estrellada hundiéndose. <strong>🎬 Producción:</strong> SFX ambiente submarino · corte duro · BGM: sting corto, misterioso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de supervivencia bajo el agua en un planeta alienígena entero — hoy os cuento por qué la belleza de las zonas superficiales se convierte en puro terror cuanto más te alejas de ellas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 075 · SUBNAUTICA" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, misterioso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Eres el único superviviente de un accidente de nave en el planeta 4546B, cubierto casi por completo de océano — sin armas de verdad, solo tu ingenio para fabricar herramientas y sobrevivir a lo que sea que viva ahí abajo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un arrecife colorido cerca de la superficie. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Fabricar oxígeno, comida y herramientas mejores te permite bucear cada vez más profundo, pero cuanto más bajas, más oscuro y silencioso se vuelve todo — hasta que algo enorme rompe ese silencio sin avisar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay bajando a una zona profunda y oscura. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, tensión creciente</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: bajar a una zona que todavía no he explorado, sin saber qué me voy a encontrar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a algo inesperado bajo el agua. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión de golpe</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿le tienes miedo real al agua profunda del juego, o vas sin miedo a explorar cualquier zona?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Le tengo un respeto real a las zonas profundas — este juego consigue meter miedo sin un solo jumpscare barato."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Precioso y aterrador a partes iguales, según la profundidad a la que te atrevas a llegar — de los juegos de supervivencia que mejor usan su propio escenario."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de zonas exploradas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Te da miedo el agua profunda en los videojuegos? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      76: {
        name: "Persona 4 Golden",
        summary: "JRPG de instituto y mazmorras con una investigación de asesinatos de fondo — amistad, calendario, y mucho corazón.",
        difficulty: "media",
        emoji: "🎭",
        steamUrl: "https://store.steampowered.com/app/1113000/Persona_4_Golden/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 76 de Retro 365, y hoy voy a instituto de día y a investigar asesinatos dentro de una televisión por la tarde. Bienvenidos a Persona 4 Golden."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay entrando al mundo dentro de la televisión. <strong>🎬 Producción:</strong> SFX ambiente del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un JRPG que mezcla vida de instituto, calendario social, y mazmorras dentro de un mundo paralelo — hoy os cuento por qué la gente sigue recomendando este juego años después de salir."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 076 · PERSONA 4 GOLDEN" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Te mudas a un pueblo pequeño justo cuando empiezan a pasar asesinatos misteriosos relacionados con un mundo dentro de la televisión — y tienes la habilidad única de invocar Personas, versiones internas de tu propia psique, para investigar y luchar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el pueblo. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada día real cuenta: puedes estudiar, quedar con amigos para fortalecer vínculos que mejoran tu combate, o meterte en la mazmorra a subir de nivel — y todo pasa contrarreloj antes de que se acabe el propio caso del asesino."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate real por turnos. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver cómo reparto el día de hoy entre amigos y mazmorra."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara pensando en voz alta cómo repartir el día. <strong>🎬 Producción:</strong> sin SFX destacado · BGM: continúa</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué personaje del grupo te está gustando más hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy conociendo al grupo, pero ya hay un compañero cuya historia personal me tiene enganchado."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Una mezcla rarísima de instituto y misterio que funciona muchísimo mejor de lo que suena en el papel — de los JRPG con más corazón que he jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del día jugado en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Instituto o mazmorra, a qué le darías prioridad tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      77: {
        name: "God of War Ragnarök",
        summary: "Kratos y Atreus contra el fin del mundo nórdico — combate brutal, cámara continua, y una historia de padre e hijo muy real.",
        difficulty: "media",
        emoji: "🪓",
        steamUrl: "https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 77 de Retro 365, y hoy el fin del mundo nórdico está más cerca que nunca. Bienvenidos a God of War Ragnarök."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate brutal contra un enemigo grande. <strong>🎬 Producción:</strong> SFX de hacha real del juego · corte duro · BGM: sting corto, épico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "La continuación directa de la aventura nórdica de Kratos y Atreus — hoy os cuento por qué esta secuela consigue cerrar la historia sin perder nada de lo que hizo grande al anterior."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 077 · GOD OF WAR RAGNARÖK" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, épico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Fimbulwinter ya ha llegado, y Kratos y Atreus tienen que decidir si intentan evitar el Ragnarök o dejar que pase — mientras Atreus, cada vez más independiente, empieza a cuestionar las decisiones de su padre."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un reino nórdico nevado. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El combate mezcla el hacha de hielo con las cadenas de caos, la cámara sigue sin cortarse en ningún momento como en el juego anterior, y ahora se puede jugar tramos enteros controlando a Atreus por su cuenta."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real alternando entre Kratos y Atreus. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un combate contra un enemigo que llevo un rato sin conseguir superar."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al combate en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: si jugaste el God of War anterior, ¿qué te está pareciendo esta continuación?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Me está pareciendo a la altura del anterior, que ya es decir bastante — la relación entre Kratos y Atreus sigue siendo lo mejor de todo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un cierre a la altura de lo que prometía — combate brutal con una historia de padre e hijo que pega fuerte de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Qué relación de padre e hijo en videojuegos te ha marcado más? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      78: {
        name: "Marvel's Spider-Man Remastered",
        summary: "Balancearte por Nueva York como el trepamuros nunca se ha sentido tan bien — combate ágil y una ciudad viva de verdad.",
        difficulty: "media",
        emoji: "🕷️",
        steamUrl: "https://store.steampowered.com/app/1817070/Marvels_SpiderMan_Remastered/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 78 de Retro 365, y hoy me balanceo por Nueva York entera solo porque puedo. Bienvenidos a Marvel's Spider-Man Remastered."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un balanceo real por los rascacielos. <strong>🎬 Producción:</strong> SFX de telaraña real del juego · corte duro · BGM: sting corto, heroico</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "El juego que consiguió que balancearse por una ciudad se sintiera perfecto desde el primer minuto — hoy os cuento por qué sigue siendo la referencia de cómo debe moverse Spider-Man en un videojuego."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 078 · MARVEL'S SPIDER-MAN REMASTERED" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, heroico</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Un Peter Parker con ocho años de experiencia como Spider-Man se enfrenta a un grupo criminal que está tomando el control de Nueva York — mientras intenta que su vida personal no se le desmorone del todo por el camino."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando el mapa abierto de Nueva York. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "El balanceo usa físicas reales de telaraña en vez de simplemente volar, el combate mezcla acrobacias con gadgets variados, y las misiones secundarias por la ciudad se sienten parte del mundo en vez de relleno puro."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de combate real usando gadgets. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una persecución real por los tejados sin perder al objetivo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la persecución en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué traje de Spider-Man te gustaría desbloquear primero, o cuál es tu favorito de los cómics?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía voy con el traje clásico, pero tengo ganas de desbloquear alguno de los más raros de los cómics."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "El movimiento más satisfactorio de superhéroe que he jugado en años, con una ciudad que se siente viva de verdad — un básico que Rincón del Friki y Retro 365 tenían que cruzar tarde o temprano."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de balanceos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu traje favorito de Spider-Man? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      79: {
        name: "A Short Hike",
        summary: "Una excursión tranquila a una montaña, sin prisa ni presión — de los juegos más relajantes y bonitos que existen.",
        difficulty: "facil",
        emoji: "🐦",
        steamUrl: "https://store.steampowered.com/app/1055540/A_Short_Hike/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 79 de Retro 365, y hoy lo único que tengo que hacer es subir una montaña sin ninguna prisa. Bienvenidos a A Short Hike."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del pájaro protagonista empezando a subir. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: sting corto, tranquilo</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego cortito sobre subir una montaña para conseguir cobertura en el móvil — hoy os cuento por qué esta idea tan simple es de lo más relajante que he jugado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 079 · A SHORT HIKE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tranquilo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Claire, un pájaro de vacaciones forzosas, necesita subir a la cima de la montaña de la isla para tener cobertura y hablar con su madre — y por el camino se cruza con toda clase de personajes con sus propias historias pequeñitas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando la isla y hablando con un personaje. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Puedes ir directa a la cima en poco más de media hora, o perder horas explorando cada rincón de la isla, pescando, buscando tesoros, o simplemente planeando desde lo alto con las plumas que vas mejorando."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay planeando desde una zona alta de la isla. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: a ver qué me encuentro explorando esta zona que todavía no he visto."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una zona nueva de la isla. <strong>🎬 Producción:</strong> sin SFX destacado · BGM: continúa</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿fuiste directo a la cima, o te entretuviste explorando la isla entera como yo?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Fui con toda la intención de ir directo a la cima y acabé explorando la isla entera sin darme cuenta."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Corto, tranquilo, y con un mensaje sencillo sobre no tener prisa por llegar a ningún sitio — el respiro perfecto entre juegos más intensos de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la isla explorada en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Prisa por llegar a la cima, o prefieres explorarlo todo con calma? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      80: {
        name: "Deep Rock Galactic",
        summary: "Cuatro enanos espaciales mineros contra hordas de bichos alienígenas — cooperativo cavernícola con mucha dinamita de por medio.",
        difficulty: "media",
        emoji: "⛏️",
        steamUrl: "https://store.steampowered.com/app/548430/Deep_Rock_Galactic/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 80 de Retro 365, y hoy voy a volar una cueva entera con dinamita porque sí. Bienvenidos a Deep Rock Galactic."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una explosión real destruyendo terreno. <strong>🎬 Producción:</strong> SFX de explosión real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un cooperativo de minería y combate donde eres literalmente un enano espacial contratado por una corporación — hoy os cuento por qué cavar cuevas destructibles de verdad se siente tan satisfactorio."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 080 · DEEP ROCK GALACTIC" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Trabajas para una corporación minera interestelar, bajando a cuevas alienígenas generadas por completo de forma procedural a por minerales valiosos — mientras hordas de bichos hostiles intentan que no salgas vivo de ahí."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una cueva generada al azar. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada clase de enano tiene su propio rol —minero, artillero, explorador, ingeniero— el terreno entero se puede destruir y excavar de verdad, y las hordas de bichos pueden convertir una misión tranquila en un caos total en segundos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una horda real de bichos atacando. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: una horda real que ha aparecido justo cuando menos me lo esperaba."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la horda en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión de golpe</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿qué clase de enano usas o usarías tú, y con quién te gustaría bajar a la mina?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía estoy probando clases, pero la de excavar con explosivos me está pareciendo la más divertida hasta ahora."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Caos cooperativo del bueno, con cuevas que se destruyen de verdad — de los mejores juegos para jugar acompañado que he probado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de la misión del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Con quién bajarías tú a las minas? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      81: {
        name: "HITMAN World of Assassination",
        summary: "Sigilo y asesinatos creativos por escenarios gigantes y llenos de vida — cada misión se puede resolver de decenas de formas distintas.",
        difficulty: "media",
        emoji: "🎩",
        steamUrl: "https://store.steampowered.com/app/1659040/HITMAN_World_of_Assassination/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 81 de Retro 365, y hoy voy a eliminar a mi objetivo disfrazado de camarero, cocinero, y probablemente algo más raro todavía. Bienvenidos a HITMAN World of Assassination."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay del Agente 47 cambiando de disfraz. <strong>🎬 Producción:</strong> SFX de sigilo real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de sigilo y asesinatos donde cada misión es un escenario gigante lleno de posibilidades — hoy os cuento por qué la libertad real para resolver cada objetivo es lo mejor de toda la saga."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 081 · HITMAN WORLD OF ASSASSINATION" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "El Agente 47, un asesino a sueldo calvo y con un código de barras en la nuca, viaja por localizaciones exóticas de todo el mundo eliminando objetivos concretos — sin que nadie se entere de cómo lo hizo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando una localización gigante y detallada. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada nivel esconde decenas de formas distintas de eliminar al mismo objetivo — un accidente, un disfraz perfecto, un veneno discreto— y el propio escenario está lleno de gente con rutinas reales que puedes usar a tu favor."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una eliminación creativa real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un plan de eliminación improvisado que puede salir muy bien o muy mal."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al plan en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿prefieres ir de sigilo perfecto sin que nadie te vea, o te gusta más improvisar sobre la marcha?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Intento ir siempre de sigilo perfecto, pero cuando un plan sale mal acabo improvisando de la forma más ridícula posible."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Libertad creativa real para resolver cada objetivo — de los juegos de sigilo que más premian pensar distinto a la manera obvia."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de eliminaciones del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cómo eliminarías tú a un objetivo si fueras el Agente 47? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      82: {
        name: "Ghost of Tsushima",
        summary: "Samurái contra invasión mongola en un Japón feudal precioso — sigilo, katana, y un viento que literalmente te marca el camino.",
        difficulty: "media",
        emoji: "🍃",
        steamUrl: "https://store.steampowered.com/app/2215430/Ghost_of_Tsushima_DIRECTORS_CUT/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 82 de Retro 365, y hoy dejo que el viento me diga hacia dónde ir, en vez de un mapa normal. Bienvenidos a Ghost of Tsushima."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real del viento guiando al jugador. <strong>🎬 Producción:</strong> SFX ambiente real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de samuráis contra la invasión mongola de Japón en 1274 — hoy os cuento por qué su forma de guiarte por el mapa con el viento es tan elegante como todo lo demás."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 082 · GHOST OF TSUSHIMA" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Jin Sakai, uno de los pocos samuráis supervivientes de la primera invasión mongola, tiene que decidir si sigue el código samurái tradicional o adopta tácticas de sigilo consideradas deshonrosas para poder salvar a su gente."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando un paisaje de la isla de Tsushima. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Los duelos samurái cara a cara se sienten tensos y cinematográficos, el sigilo desde las sombras es una alternativa real y viable, y el propio escenario —campos de flores, bosques de bambú— está pensado para que pares solo a hacer fotos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un duelo samurái real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube en combate</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un duelo samurái real, cara a cara, sin margen de error."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al duelo en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿vas más de samurái honorable en duelo, o prefieres el sigilo del fantasma?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Empecé queriendo ser un samurái honorable y acabé abrazando el sigilo del fantasma bastante más rápido de lo que esperaba."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Precioso, elegante, y con un dilema real de honor detrás de cada decisión — de los mundos abiertos más bonitos que he explorado."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de paisajes explorados en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Samurái honorable o fantasma sigiloso? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      83: {
        name: "Yakuza 0",
        summary: "Drama criminal japonés de los 80 con combate callejero y minijuegos absurdos a partes iguales — un tono único que no se parece a nada.",
        difficulty: "media",
        emoji: "🐉",
        steamUrl: "https://store.steampowered.com/app/638970/Yakuza_0/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 83 de Retro 365, y en la misma tarde voy a pelear contra una banda entera y luego a cantar karaoke. Bienvenidos a Yakuza 0."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un combate callejero real. <strong>🎬 Producción:</strong> SFX de combate real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un drama criminal japonés ambientado en 1988, con combate callejero serio y minijuegos completamente absurdos a la vez — hoy os cuento por qué esta mezcla tan rara funciona de maravilla."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 083 · YAKUZA 0" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Kazuma Kiryu es acusado injustamente de un asesinato que no cometió, y tiene que limpiar su nombre mientras se mete de lleno en las guerras internas del clan Yakuza en el Tokio de los 80."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando las calles de neón de Tokio. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Los combates callejeros cambian de estilo según el momento, la historia principal es dramática de verdad, y entre medias puedes parar a jugar recreativas clásicas, karaoke, o decenas de misiones secundarias tan raras que dan hasta vergüenza ajena."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un minijuego absurdo real. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la misión secundaria más ridícula que me haya encontrado hasta ahora."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando a la misión secundaria. <strong>🎬 Producción:</strong> SFX cómico · BGM: sube ligeramente</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál ha sido la misión secundaria más rara que te has encontrado hasta ahora?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no he visto la más rara del todo, pero ya he tenido un par de misiones secundarias que no me esperaba para nada."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Drama serio y comedia absurda conviviendo sin chocar en ningún momento — de los tonos más originales que existen en los videojuegos."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de combates y minijuegos del directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Karaoke o pelea callejera, con qué te quedas tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      84: {
        name: "Rocket League",
        summary: "Fútbol con coches propulsados por cohetes — fácil de entender, imposible de dominar del todo.",
        difficulty: "media",
        emoji: "🚗",
        steamUrl: "https://store.steampowered.com/app/252950/Rocket_League/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 84 de Retro 365, y hoy voy a marcar un gol volando literalmente por los aires con mi coche. Bienvenidos a Rocket League."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un gol aéreo real. <strong>🎬 Producción:</strong> SFX de gol real del juego · corte duro · BGM: sting corto</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Fútbol con coches propulsados por cohetes, tan simple de explicar como imposible de dominar del todo — hoy os cuento por qué sigue siendo uno de los mejores juegos competitivos que existen."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 084 · ROCKET LEAGUE" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Controlas un coche con cohete en un partido de fútbol donde el balón es gigante — sin más reglas que meter más goles que el equipo contrario, usando saltos, cohetes, y físicas de coche completamente realistas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un partido real en curso. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Aprender a saltar y usar el cohete para golpear el balón en el aire es solo el principio: jugadores de nivel alto encadenan movimientos aéreos que parecen imposibles la primera vez que los ves en directo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real de un movimiento aéreo avanzado. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: un partido real, sin saber si voy a meter el gol o hacer el ridículo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando al partido en directo. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿se te da bien lo de los goles aéreos, o vas más de defensa segura?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Los goles aéreos se me siguen resistiendo bastante, así que de momento voy más de defensa que de ataque estrella."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Simple de aprender, con un techo de habilidad altísimo — de los pocos juegos competitivos que enganchan igual jugando mal que jugando bien."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap del partido jugado en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Ataque o defensa, qué prefieres tú en este juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      85: {
        name: "Fall Guys",
        summary: "Battle royale de obstáculos con frijoles de colores — caerte de forma ridícula es la mitad de la diversión.",
        difficulty: "facil",
        emoji: "🫘",
        steamUrl: "https://store.steampowered.com/app/1097150/Fall_Guys/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 85 de Retro 365, y hoy me acabo de caer de la forma más ridícula posible delante de sesenta personas más. Bienvenidos a Fall Guys."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de una caída cómica real. <strong>🎬 Producción:</strong> SFX cómico real del juego · corte duro · BGM: sting corto, alegre</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un battle royale de obstáculos con personajes en forma de frijol de colores — hoy os cuento por qué caerse en este juego da tanta gracia como perder de verdad."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 085 · FALL GUYS" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, alegre</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Decenas de jugadores compiten en rondas de minijuegos de obstáculos eliminatorios, hasta que solo queda una corona por repartir — sin combate, sin armas, solo carreras absurdas y físicas que te hacen quedar en ridículo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay mostrando una ronda de obstáculos completa. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Cada ronda es un minijuego distinto — carreras de obstáculos, juegos de equipo, pruebas de equilibrio— y las físicas exageradas hacen que hasta los jugadores mejores acaben cayéndose de la forma más tonta posible en cualquier momento."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay real de una ronda de equipo. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop, sube el ritmo</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: la ronda final por la corona, sin saber si la voy a fastidiar en el último segundo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> contador de eliminados restantes en pantalla. <strong>🎬 Producción:</strong> SFX de tensión creciente · BGM: sube según se acerca el final</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: ¿cuál ha sido tu caída más ridícula hasta ahora, o has llegado ya a alguna corona?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Todavía no he ganado ninguna corona, pero mis caídas más ridículas ya podrían tener su propio compilado de vídeo."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Tonto, caótico, y sin ni una gota de mala leche — de los battle royale más divertidos precisamente porque perder no duele nada."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de rondas jugadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "¿Cuál es tu ronda favorita de este juego? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      },
      86: {
        name: "Inscryption",
        summary: "Deckbuilder de terror psicológico en una cabaña — cuanto más juegas, más te das cuenta de que este juego de cartas esconde algo más.",
        difficulty: "media",
        emoji: "🕯️",
        steamUrl: "https://store.steampowered.com/app/1092790/Inscryption/",
        script: `
          <h4>🪝 Hook (0-10s)</h4>
          <p><strong>🎙️ Off:</strong> "Día 86 de Retro 365, cierre de esta tanda, y hoy juego a cartas contra alguien que no debería estar sentado frente a mí. Bienvenidos a Inscryption."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de la partida de cartas en la cabaña. <strong>🎬 Producción:</strong> SFX ambiente inquietante · corte duro · BGM: sting corto, tenso</p>
          <h4>🎯 Promesa</h4>
          <p><strong>🎙️ Off:</strong> "Un deckbuilder que empieza pareciendo un simple juego de cartas de terror, y termina siendo mucho más raro de lo que cualquier tráiler puede explicar — hoy os cuento hasta donde puedo sin destriparlo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> texto "DÍA 086 · INSCRYPTION" con la barra de progreso. <strong>🎬 Producción:</strong> SFX whoosh · BGM: entra loop de fondo, tenso</p>
          <h4>📍 Contexto</h4>
          <p><strong>🎙️ Off:</strong> "Despiertas encerrado en una cabaña oscura, obligado a jugar partidas de cartas contra un anfitrión encapuchado que controla las reglas del propio juego — y cuanto más avanzas, menos normal empieza a sentirse todo."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay explorando la cabaña entre partidas. <strong>🎬 Producción:</strong> sin SFX destacado · corte suave · BGM: continúa</p>
          <h4>🎬 Desarrollo</h4>
          <p><strong>🎙️ Off:</strong> "Las cartas se hacen sacrificando otras criaturas, algunas mecánicas se saltan las reglas normales de un juego de mesa por completo, y hay puzles fuera de la propia partida escondidos en la cabaña que cambian cómo juegas las siguientes rondas."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> gameplay de un puzle real fuera de la partida de cartas. <strong>🎬 Producción:</strong> SFX real del juego · corte seco entre ejemplos · BGM: mismo loop</p>
          <h4>🔀 Giro / momento del directo</h4>
          <p><strong>🎙️ Off:</strong> "Y aquí toca vivirlo en directo: algo ha pasado en esta partida que no me esperaba para nada."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> cámara reaccionando genuinamente sorprendida. <strong>🎬 Producción:</strong> SFX dramático · BGM: sube tensión de golpe</p>
          <h4>💬 Opinión</h4>
          <p>[IVÁN — AÑADIR OPINIÓN: sin destripar nada, ¿qué es lo más raro que te ha pasado hasta ahora en este juego?]</p>
          <p class="script-suggestion"><strong>💡 Sugerencia de Claude (no es tu opinión real — edítala, sustitúyela o dicta la tuya):</strong> "Ya me ha pasado algo que no puedo contar sin destriparlo, y todavía estoy procesando lo que significa."</p>
          <h4>🏁 Conclusión</h4>
          <p><strong>🎙️ Off:</strong> "Un juego de cartas que es mucho más que un juego de cartas — cierre perfecto y perturbador para esta tanda de Retro 365."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> recap de partidas jugadas en el directo. <strong>🎬 Producción:</strong> fundido cruzado · BGM: sube ligeramente</p>
          <h4>📣 CTA</h4>
          <p><strong>🎙️ Off:</strong> "Sin spoilers grandes: ¿te atreverías a sentarte en esa mesa tú? Dímelo en comentarios."</p>
          <p class="script-prod"><strong>🎥 Visual:</strong> animación de comentarios + contador de progreso de Retro 365. <strong>🎬 Producción:</strong> SFX stinger de marca · BGM: sube a volumen normal, corte a logo</p>`
      }
      // 87: { name: "...", summary: "...", difficulty: "...", emoji: "...", steamUrl: "..." },
    };
