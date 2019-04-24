import World from "models/World.js"
import Player from "models/Player.js"

export default class Game {
    constructor(game = {}) {
        this.world = new World()
        this.player = new Player()
    }
    update(delta) {
        this.player.update(delta)
    }
}
