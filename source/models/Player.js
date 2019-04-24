import Keyb from "keyb"

export default class Player {
    constructor(player = {}) {
        this.position = {"x": 5, "y": 5, "z": 1}
        this.size = {"x": 0.618, "y": 0.618, "z": 1}
    }
    update(delta) {
        if(Keyb.isPressed("W")
        || Keyb.isPressed("<up>")) {
            this.position.y -= 0.1
        }
        if(Keyb.isPressed("S")
        || Keyb.isPressed("<down>")) {
            this.position.y += 0.1
        }
        if(Keyb.isPressed("A")
        || Keyb.isPressed("<left>")) {
            this.position.x -= 0.1
        }
        if(Keyb.isPressed("D")
        || Keyb.isPressed("<right>")) {
            this.position.x += 0.1
        }

        // TODO: Normalize direction and speed as a vector.
        // TODO: Allow for gamepad input.
    }
}
