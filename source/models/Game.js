import Keyb from "keyb"
import Id from "shortid"

import Goodie from "models/Goodie.js"
import Baddie from "models/Baddie.js"
import World from "models/World.js"

export default class Game {
    constructor(game) {
        this.entities = {}
        this.goodies = {}
        this.baddies = {}
        this.add(this.player = new Goodie())
        // this.add(new Baddie({"position": {"x": 16 * 0.5, "y": 9 * 0.5}}))

        this.world = new World()
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
