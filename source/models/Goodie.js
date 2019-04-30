import Keyb from "keyb"
import Index from "index"

import Projectile from "models/Projectile.js"

const UNIT = 1
const VERTICALITY = 0.33 // 10
const GRAVITY = 0.03
const MAX_GRAVITY = 8
const MAX_FALL_DISTANCE = UNIT * 1.9
const EQUIPMENT_SPEED = 0.9
const MAX_VELOCITY_BEFORE_JUMP = 5 // this is for the mechanic where you can jump when you just leave a cliff.
const FRAME_WIDTH = 16
const FRAME_HEIGHT = 9

export default class Goodie {
    constructor() {
        this.size = {}
        this.size.x = 0.5
        this.size.y = 0.5

        this.direction = "right"

        this.anchor = {"x": 0.5, "y": 1}

        this.color = "#F4F8F0"

        // this.image = require("images/red.cowboy.body.png")

        this.stack = 5

        // this.position = {"x": 16 * 0.25, "y": 9 * 0.5}
        // this.velocity = {"x": 0, "y": 0}
        // this.speed = 0.1

        this.isDamaged = 0
        // this.hearts = 30
        // this.hearts = 10
        this.maxhearts = 18
        this.hearts = this.maxhearts

        // PLATFORMER
        this.levelnum = 0
        this.mode = "parachuting"

        this.position = {"x": 7.75, "y": 0}
        this.velocity = {x: 0, y: 0}
        this.acceleration = {x: 0.075, y: 0.275}
        this.deceleration = 0.25
        this.jumpdist = 0

        this.equipment = {
            "parachutes": 2,
            "ropes": 2,
        }
    }
    update(delta) {
        if(this.isDamaged > 0) {
            this.isDamaged -= delta.ms
            if(this.isDamaged < 0) {
                this.isDamaged = 0
            }
        }
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
                "rotation": this.direction == "right" ? 0 : Math.PI,
                "position": this.position,
                "affiliation": "goodies",
            }))
            Index.model.audiomix.playSound("shoot" + Math.ceil(Math.random() * 3))
        }

        if(this.position.x - Index.model.game.world.levels[this.levelnum].speed > 0) {
            this.position.x -= Index.model.game.world.levels[this.levelnum].speed
        } else if(Index.model.game.world.levels[this.levelnum].y(this.position.x) - this.position.y < -VERTICALITY) {
            this.die()
        }

        const upWasJustPressed = (Keyb.wasJustPressed("<up>") || Keyb.wasJustPressed("W"))
        const downWasJustPressed = (Keyb.wasJustPressed("<down>") || Keyb.wasJustPressed("S"))
        const upIsPressed = (Keyb.isPressed("<up>") || Keyb.isPressed("W"))
        const leftIsPressed = (Keyb.isPressed("<left>") || Keyb.isPressed("A"))
        const rightIsPressed = (Keyb.isPressed("<right>") || Keyb.isPressed("D"))

        // vertical acceleration from inputs
        if(this.equipment.parachutes > 0
        && downWasJustPressed
        && this.mode.match(/jumping|falling|dropping/)) {
            this.equipment.parachutes -= 1
            this.mode = "parachuting"
        }
        if(this.levelnum != 0
        && this.equipment.ropes > 0
        && downWasJustPressed
        && this.mode.match(/jumping|falling|dropping/)) {
            this.equipment.ropes -= 1
            this.mode = "hiking"
            this.levelnum -= 1
        }

        if(this.mode == "on ground" && upIsPressed
        || this.mode == "on ledge" && upWasJustPressed
        || this.mode == "falling" && this.velocity.y < MAX_VELOCITY_BEFORE_JUMP && upWasJustPressed) {
            this.velocity.y = -this.acceleration.y
            this.jumpdist = this.position.y
            this.mode = "jumping"

            Index.model.audiomix.playSound("jump" + Math.ceil(Math.random() * 3))
        }
        if(this.mode.match(/on ledge|on ground/)
        && downWasJustPressed
        && this.levelnum < Index.model.game.world.levels.length - 1) {
            this.jumpdist = this.position.y
            this.mode = "dropping"
            this.levelnum += 1
        }

        // horizontal acceleration from inputs
        if(this.mode != "hiking") {
            if(leftIsPressed) {
                this.direction = "left"
                this.velocity.x = -1 * this.acceleration.x
            }
            if(rightIsPressed) {
                this.direction = "right"
                this.velocity.x = +1 * this.acceleration.x
            }
        }

        // vertical acceleration from gravity
        if(["falling", "jumping", "dropping", "on ledge"].indexOf(this.mode) != -1) {
            this.velocity.y += GRAVITY
            if(this.velocity.y > MAX_GRAVITY) {
                this.velocity.y = MAX_GRAVITY
            }
        } else if(this.mode == "parachuting") {
            this.velocity.y = +EQUIPMENT_SPEED
        } else if(this.mode == "hiking") {
            this.velocity.y = -EQUIPMENT_SPEED
        }

        // query level
        var level = Index.model.game.world.levels[this.levelnum]

        // collision with camera
        if(this.position.x + this.velocity.x < 0
        || this.position.x + this.velocity.x > FRAME_WIDTH) {
            this.velocity.x = 0
        }

        // horizontal collision with level
        if(level.y(this.position.x + this.velocity.x) - this.position.y < -VERTICALITY) {
            this.velocity.x = 0
        }
        if(level.y(this.position.x + this.velocity.x) - this.position.y > +VERTICALITY) {
            if(this.mode == "on ground") {
                this.mode = "falling"
                this.jumpdist = this.position.y
            }
        }

        // vertical collision with level
        if(this.mode == "jumping" || this.mode == "falling" || this.mode == "dropping" || this.mode == "parachuting") {
            if(this.levelnum > 0 && this.position.y < Index.model.game.world.levels[this.levelnum - 1].y(this.position.x + this.velocity.x)) {
                this.levelnum -= 1
            }
        }
        if(this.mode == "hiking"
        && this.position.y - this.size.y < Index.model.game.world.levels[this.levelnum].y(this.position.x + this.velocity.x)) {
            this.mode = "on ledge"
        }
        if(((this.mode == "jumping" && this.velocity.y > 0))
        && this.levelnum > 0 && this.position.y - this.size.y < Index.model.game.world.levels[this.levelnum - 1].y(this.position.x + this.velocity.x)
        && level.y(this.position.x + this.velocity.x) - Index.model.game.world.levels[this.levelnum - 1].y(this.position.x + this.velocity.x) > this.size.y) {
            this.mode = "on ledge"
            this.levelnum -= 1
        }
        if(this.velocity.y > 0
        && this.position.y + this.velocity.y - (this.mode == "on ledge" ? this.size.y : 0) > level.y(this.position.x + this.velocity.x)) {
            this.position.y = level.y(this.position.x + this.velocity.x) + (this.mode == "on ledge" ? this.size.y : 0)
            if(["jumping", "falling", "dropping"].indexOf(this.mode) != -1) {
                if(this.position.y - this.jumpdist >= MAX_FALL_DISTANCE) {
                    // console.log("DIED") // this.stage.mode = "died"
                    // this.die()
                }
            }
            this.velocity.y = 0
            if(this.mode != "on ledge") {
                this.mode = "on ground"
            }
        }

        // translation from velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // translation from level
        if(this.mode == "on ground") {
            this.position.y = level.y(this.position.x)
        }

        // deceleration
        this.velocity.x -= this.velocity.x * this.deceleration
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

        Index.model.audiomix.playSound("explosion" + Math.ceil(Math.random() * 3))
    }
    pickupHeart() {
        this.hearts += 1
        if(this.hearts > this.maxhearts) {
            this.hearts = this.maxhearts
        }
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

// get effect() {
//     if(this.mode == "parachuting") {
//         return {
//             position: {
//                 x: -1 * this.size.x,
//                 y: -1 * (this.size.y + 8),
//             },
//             size.x: this.size.x * 3,
//             size.y: this.size.y,
//             color: "orange",
//         }
//     } else if(this.mode == "hiking") {
//         var distance = this.position.y - Index.model.game.world.levels[this.levelnum].y(this.position.x) - this.size.y
//         return {
//             position: {
//                 x: (this.size.x - 4) * 0.5,
//                 y: -1 * distance,
//             },
//             size.x: 4,
//             size.y: distance,
//             color: "white"
//         }
//     }
// }

// ehgoodenoughs:
// - collision resolution doesn't push against collision
// - velocity is not preserved during acceleration
// - gravity is always applying, even when not necessary
// - vertical collision is ugly code
