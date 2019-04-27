import Keyb from "keyb"
import Id from "shortid"

import Player from "models/Player.js"

export default class Game {
    constructor(game) {
        this.entities = {}

        this.add(this.player = new Player())
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
    }
}
