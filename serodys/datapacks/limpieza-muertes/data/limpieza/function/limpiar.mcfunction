# Elimina los mobs hostiles en 32 bloques alrededor del punto de la muerte
kill @e[type=#limpieza:hostiles,distance=..32]
particle minecraft:poof ~ ~1 ~ 3 1 3 0.05 80 force
tellraw @s {"text":"Has muerto más de 3 veces en menos de 1 minuto: he limpiado los mobs de tu alrededor.","color":"gold"}

# Vacía el historial para que la cuenta empiece de cero
scoreboard players set @s lmp.m1 0
scoreboard players set @s lmp.m2 0
scoreboard players set @s lmp.m3 0
