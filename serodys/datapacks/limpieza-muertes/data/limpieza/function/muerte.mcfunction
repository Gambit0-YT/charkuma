scoreboard players set @s lmp.muertes 0
execute store result score @s lmp.ahora run time query gametime
scoreboard players add @s lmp.m3 0

# Ticks desde la tercera muerte anterior; si son menos de 1200 (1 minuto), esta es la cuarta
scoreboard players operation @s lmp.dif = @s lmp.ahora
scoreboard players operation @s lmp.dif -= @s lmp.m3

# Desplaza el historial: m3 <- m2 <- m1 <- ahora
scoreboard players operation @s lmp.m3 = @s lmp.m2
scoreboard players operation @s lmp.m2 = @s lmp.m1
scoreboard players operation @s lmp.m1 = @s lmp.ahora

execute if score @s lmp.dif matches 0..1199 run function limpieza:limpiar
