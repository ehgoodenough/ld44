import Keyb from "keyb"
import Index from "index"

import Projectile from "models/Projectile.js"

export default class Player {
    constructor() {
        this.width = 1
        this.height = 1

        this.position = {"x": 16 * 0.25, "y": 9 * 0.5}
        this.velocity = {"x": 0, "y": 0}

        this.stack = 5

        this.speed = 0.1
        this.deceleration = 0.25

        this.isDamaged = 0

        this.hearts = 10
    }
    update(delta) {
        if(this.isDead === true) {
            this.isDeadTimer -= delta.ms
            if(this.isDeadTimer <= 0
            || this.isDeadTimer <= 1500 && Keyb.wasJustPressed("<space>")) {
                Index.model.startGame()
            }
            return
        }
        if(Keyb.wasJustPressed("<space>")) {
            this.hearts -= 1
            if(this.hearts <= 0) {
                this.die()
            }
            Index.model.game.add(new Projectile({
                "rotation": 0,
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
        
        const FRAME_WIDTH = 16
        const FRAME_HEIGHT = 9
        // if(this.position.x + this.velocity.x < 0
        // || this.position.x + this.velocity.x > FRAME_WIDTH) {
        //     this.velocity.x = 0
        // }
        // if(this.position.y + this.velocity.y < 0
        // || this.position.y + this.velocity.y > FRAME_HEIGHT) {
        //     this.velocity.y = 0
        // }

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
        this.hearts -= projectile.hearts || 1

        // TODO: show the hearts being shot out of you

        if(this.hearts <= 0) {
            this.die()
        }
    }
    die() {
        this.isDead = true
        this.isDeadTimer = 2500
    }
    pickupHeart() {
        this.hearts += 1
    }
    get color() {
        return "#DEB74A"
    }
    get opacity() {
        if(this.isDamaged > 0
        && Math.floor(Index.model.timer) % 3 == 0) {
            return 0.25
        } else {
            return 1
        }
    }
}
