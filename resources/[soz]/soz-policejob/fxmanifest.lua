fx_version "cerulean"
lua54 "yes"
game "gta5"

description "SOZ Job Police"

shared_scripts {"config.lua"}

client_scripts {
    "@menuv/menuv.lua",
    "@PolyZone/client.lua",
    "@PolyZone/CircleZone.lua",

    "client/main.lua",
    "client/functions.lua",
    "client/animations.lua",
    "client/interactions/*.lua",
    "client/stations/*.lua",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "server/main.lua",
    "server/vehicle.lua",
    "server/spike.lua",
    "server/moneycheck.lua",
}

dependencies {"qb-target", "soz-jobs"}
