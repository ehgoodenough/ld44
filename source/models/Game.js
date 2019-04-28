import Keyb from "keyb"
import Id from "shortid"

import LocalStorage from "local-storage-json"

import Goodie from "models/Goodie.js"
import Baddie from "models/Baddie.js"
import World from "models/World.js"

const SPAWN_TIMER = 5000

const BADDIES = LocalStorage.get("baddies") || [
    // {"position": {"x": 12, "y": 9 * 0.5}, "levelnum": 0},
    // {"position": {"x": 7, "y": 9 * 0.5}, "levelnum": 1},
]

export default class Game {
    constructor(game) {
        this.entities = {}
        this.goodies = {}
        this.baddies = {}

        this.add(this.player = new Goodie())

        BADDIES.forEach((baddie) => {
            this.add(new Baddie(baddie))
        })

        this.world = new World()

        this.nextSpawnTimer = SPAWN_TIMER / 2
    }
    update(delta) {
        if(Keyb.wasJustPressed("<escape>")) {
            this.isPaused = !this.isPaused
        }

        if(this.isPaused == true) {
            return
        }

        Object.values(this.entities).forEach((entity) => {
            entity.update(delta)
        })

        this.world.update(delta)

        this.nextSpawnTimer -= delta.ms
        if(this.nextSpawnTimer < 0) {
            this.nextSpawnTimer = SPAWN_TIMER
            this.add(new Baddie({
                "position": {"x": 17, "y": 0},
                "levelnum": Math.floor(Math.random() * this.world.levels.length)
            }))
        }
    }
    add(entity) {
        entity.id = entity.id || Id.generate()
        this.entities[entity.id] = entity
        if(entity.group != undefined) {
            this[entity.group] = this[entity.group] || {}
            this[entity.group][entity.id] = entity
        }
    }
    remove(entity) {
        delete this.entities[entity.id]
        if(entity.group != undefined) {
            delete this[entity.group][entity.id]
        }
    }
}
