import Index from "index"

import Projectile from "models/Projectile.js"

export default class Turret {
    constructor() {
        this.width = 1
        this.height = 1

        this.position = {"x": 16/2, "y": 9/2}
        this.rotation = Math.PI / 2
        this.velocityRotation = 0
        this.targetRotation = 0

        this.stack = 5

        this.timer = 2
        this.shots = 3
        this.isShooting = false
        this.isDoneShooting = false

        this.deceleration = 0.25
    }
    update(delta) {
        if(this.isShooting == false) {
            this.targetRotation = getRotation(this.position, Index.model.game.player.position)
            if(this.rotation < this.targetRotation) {
                this.velocityRotation += (this.targetRotation - this.rotation) / 32
            }
            if(this.rotation > this.targetRotation) {
                this.velocityRotation -= (this.rotation - this.targetRotation) / 32
            }

            this.rotation += this.velocityRotation

            this.velocityRotation -= this.velocityRotation * this.deceleration

            if(this.velocityRotation > +1) {
                this.velocityRotation = +1
            }
            if(this.velocityRotation < -1) {
                this.velocityRotation = -1
            }

            // TODO: Don't spin around when I go clockwise around you.
            // TODO: Don't jitter.
        }

        this.timer -= delta.s
        if(this.timer <= 0) {
            if(this.isShooting == false) {
                this.isShooting = true
                this.timer = 0.5
            } else if(this.shots > 0) {
                this.shots -= 1
                this.timer = 0.125
                Index.model.game.add(new Projectile({
                    "velocity": {
                        "x": Math.cos(this.rotation) * 0.25,
                        "y": Math.sin(this.rotation) * 0.25,
                    },
                    "position": this.position,
                    "affiliation": "baddies",
                }))
            } else if(this.isDoneShooting == false) {
                this.isDoneShooting = true
                this.timer = 0.5
            } else {
                this.isShooting = false
                this.isDoneShooting = false
                this.shots = 3
                this.timer = 2
            }
        }
    }
    get color() {
        if(this.isShooting) {
            if(this.shots > 0
            && this.shots < 3
            && this.timer * 100000 % 2) {
                return "#FFFFFF"
            }
            return "#7B2319"
        }
        return "#A52F22"
    }
}

function getRotation(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}
