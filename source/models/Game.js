import Keyb from "keyb"

export default class Game {
    constructor(game) {
        console.info("Starting game.")
    }
    update(delta) {
        if(Keyb.wasJustPressed("<escape>")) {
            this.isPaused = !this.isPaused
        }
    }
}
