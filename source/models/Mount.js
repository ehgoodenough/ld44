import LocalStorage from "local-storage-json"

import Game from "models/Game.js"
import Audio from "models/Audio.js"

export default class Mount {
    constructor(model = {}) {
        this.title = model.title || "LD44"

        this.audio = new Audio()

        this.screen = "TitleScreen"
        if(__STAGE__ == "DEVELOPMENT") {
            this.screen = "GameScreen"
            this.screen = "OptionsScreen"
        }

        this.startGame()
    }
    update(delta) {
        if(this.screen === "GameScreen") {
            if(this.game !== undefined) {
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
