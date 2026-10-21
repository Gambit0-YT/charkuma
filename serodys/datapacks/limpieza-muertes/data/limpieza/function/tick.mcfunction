# Se ejecuta cada tick: atiende a quien acaba de morir, en el sitio donde murió
execute as @a[scores={lmp.muertes=1..}] at @s run function limpieza:muerte
