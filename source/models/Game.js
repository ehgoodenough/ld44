import Keyb from "keyb"
import Id from "shortid"

import Player from "models/Player.js"
import Turret from "models/Turret.js"

export default class Game {
    constructor(game) {
        this.entities = {}

        this.add(this.player = new Player())
        this.add(new Turret({
            "position": {"x": 16 * 0.75, "y": 9 * 0.5}
        }))
    }
    update(delta) {
        if(Keyb.wasJustPressed("<escape>")) {
            this.isPaused = !this.isPaused
        }

        Object.values(this.entities).forEach((entity) => {
            entity.update(delta)
        })
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
