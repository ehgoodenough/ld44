import Keyb from "keyb"
import Id from "shortid"

import Goodie from "models/Goodie.js"
import Baddie from "models/Baddie.js"
import World from "models/World.js"

const SPAWN_TIMER = 3500

export default class Game {
    constructor(game) {
        this.isDemo = game.isDemo

        this.entities = {}
        this.goodies = {}
        this.baddies = {}

        this.world = new World(game.world)

        this.nextSpawnTimer = SPAWN_TIMER / 2

        if(this.isDemo) {
            this.player = {}
        } else {
            this.add(this.player = new Goodie())

            this.add(this.firstBaddie = new Baddie({
                "position": {"x": 14, "y": 0},
                "levelnum": 0,
            }))

            const WORLD_LENGTH = 160
            // for(let levelnum = 0; levelnum < 3; levelnum += 1) {
            for(let x = 18; x < WORLD_LENGTH; x += 0) {
                const levelnum = Math.floor(Math.random() * 3)
                x += (levelnum + 1) * 2
                this.add(new Baddie({
                    "position": {"x": x, "y": 0},
                    "levelnum": levelnum
                }))
            }
            // }
        }
    }
    update(delta) {
        if(Keyb.wasJustPressed("<escape>")) {
            this.isPaused = !this.isPaused
        }

        if(this.isPaused == true) {
            return
        }

        this.world.update(delta)

        Object.values(this.entities).forEach((entity) => {
            entity.update(delta)
        })

        // if(this.isDemo != true) {
        //     this.nextSpawnTimer -= delta.ms
        //     if(this.nextSpawnTimer < 0) {
        //         this.nextSpawnTimer = SPAWN_TIMER
        //         this.add(new Baddie({
        //             "position": {"x": 17, "y": 0},
        //             "levelnum": Math.floor(Math.random() * this.world.levels.length)
        //         }))
        //     }
        // }

        // this.timer = this.timer || 0
        // this.timer += delta.s
        // if(this.timer > 60) {
        //     this.isDone = true
        // }
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
