import Keyb from "keyb"
import Index from "index"

const FRAME_WIDTH = 16
const FRAME_HEIGHT = 9

import Projectile from "models/Projectile.js"

export default class Player {
    constructor() {
        this.width = 1
        this.height = 1

        this.position = {"x": 16/2, "y": 9/4}
        this.velocity = {"x": 0, "y": 0}

        this.stack = 5

        this.speed = 0.1
        this.deceleration = 0.25

        this.isDamaged = 0
    }
    update(delta) {
        if(Keyb.wasJustPressed("<space>")) {
            Index.model.game.add(new Projectile({
                "velocity": {"x": 0, "y": -0.5},
                "position": this.position,
                "affiliation": "goodies",
            }))
        }

        if(this.isDamaged > 0) {
            this.isDamaged -= delta.ms
            if(this.isDamaged < 0) {
                this.isDamaged = 0
            }
        }

        if(Keyb.isPressed("W")
        || Keyb.isPressed("<up>")) {
            this.velocity.y = -1 * this.speed * delta.f
        }
        if(Keyb.isPressed("S")
        || Keyb.isPressed("<down>")) {
            this.velocity.y = +1 * this.speed * delta.f
        }
        if(Keyb.isPressed("A")
        || Keyb.isPressed("<left>")) {
            this.velocity.x = -1 * this.speed * delta.f
        }
        if(Keyb.isPressed("D")
        || Keyb.isPressed("<right>")) {
            this.velocity.x = +1 * this.speed * delta.f
        }

        if(this.position.x + this.velocity.x < 0
        || this.position.x + this.velocity.x > FRAME_WIDTH) {
            this.velocity.x = 0
        }

        if(this.position.y + this.velocity.y < 0
        || this.position.y + this.velocity.y > FRAME_HEIGHT) {
            this.velocity.y = 0
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.x -= this.velocity.x * this.deceleration
        this.velocity.y -= this.velocity.y * this.deceleration

        if(this.velocity.x < +0.001
        && this.velocity.x > -0.001) {
            this.velocity.x = 0
        }
        if(this.velocity.y < +0.001
        && this.velocity.y > -0.001) {
            this.velocity.y = 0
        }
    }
    beHit(projectile) {
        this.isDamaged = 1500
    }
    get color() {
        return "#DEB74A"
    }
    get opacity() {
        if(this.isDamaged > 0
        && Math.floor(Index.model.timer) % 3 == 0) {
            return 0.25
        }
    }
}
