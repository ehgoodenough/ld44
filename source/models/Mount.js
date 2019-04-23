import Game from "models/Game.js"

export default class Mount {
    constructor(model = {}) {
        this.title = model.title || "LD44"
        this.game = new Game({
            // ...
        })

        this.screen = "TitleScreen"
        // if(__STAGE__ == "DEVELOPMENT") {
        //     this.screen = "GameScreen"
        // }
    }
    update(delta) {
        this.game.update(delta)
    }
}
