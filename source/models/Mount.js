import LocalStorage from "local-storage-json"

import Game from "models/Game.js"
import Audiomix from "models/Audiomix.js"

export default class Mount {
    constructor() {
        this.title = "Heartslingers II"

        this.audio = new Audiomix()

        this.screen = "TitleScreen"
        if(__STAGE__ == "DEVELOPMENT") {
            this.screen = "GameScreen"
        }

        this.startGame()

        this.timer = 0
    }
    update(delta) {
        this.timer += delta.ms
        
        if(this.screen == "GameScreen") {
            if(this.game != undefined) {
                this.game.update(delta)
            }
        }
    }
    startGame() {
        this.game = new Game({
            // ...
        })
    }
}
