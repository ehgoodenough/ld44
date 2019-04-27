import Keyb from "keyb"

import Player from "models/Player.js"

export default class Game {
    constructor(game) {
        console.info("Starting game.")

        this.player = new Player()
    }
    update(delta) {
        if(Keyb.wasJustPressed("<escape>")) {
            this.isPaused = !this.isPaused
        }

        this.player.update(delta)
    }
}
