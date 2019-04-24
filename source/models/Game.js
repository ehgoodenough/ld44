import World from "models/World.js"

export default class Game {
    constructor(game = {}) {
        this.world = new World()
    }
    update(delta) {
        // ...
    }
}
