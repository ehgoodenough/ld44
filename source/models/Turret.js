import Index from "index"

import Projectile from "models/Projectile.js"

export default class Turret {
    constructor() {
        this.width = 1
        this.height = 1

        this.position = {"x": 8, "y": 1}
        this.rotation = Math.PI / 2
        this.velocityRotation = 0
        this.targetRotation = 0

        this.stack = 5

        this.color = "#A52F22"

        this.timer = 2
        this.shots = 3
        this.isShooting = false
    }
    update(delta) {

        this.targetRotation = getRotation(this.position, Index.model.game.player.position)
        // if(this.rotation < this.targetRotation) {
        //     this.velocityRotation = Math.PI / 16
        // }

        if(this.isShooting == false) {
            // this.rotation += this.velocityRotation
            this.rotation = this.targetRotation
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
            } else {
                this.isShooting = false
                this.shots = 3
                this.timer = 2
            }
        }
    }
}

function getRotation(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}
