import Game from "models/Game.js"

export default class Mount {
    constructor(model = {}) {
        this.title = model.title || "LD44"

        this.screen = "TitleScreen"
        if(__STAGE__ == "DEVELOPMENT") {
            this.screen = "GameScreen"
            this.startGame()
        }
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
