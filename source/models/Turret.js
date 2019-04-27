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

        this.group = "baddies"

        this.health = 10
        this.opacity = 1

        this.shake = {"x": 0, "y": 0}
    }
    update(delta) {
        if(this.isDead == true) {
            if(this.opacity > 0) {
                this.opacity -= 0.06 * delta.f
                if(this.opacity < 0) {
                    this.opacity = 0
                }
                this.width += 0.25 * delta.f
                this.height += 0.25 * delta.f
                this.rotation += (Math.PI / 32) * delta.f
            }
            return
        }
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
        }

        this.isDamaged -= delta.ms
        if(this.isDamaged > 0) {
            this.shake.x = Math.random() * 0.1
            this.shake.y = Math.random() * 0.1
        }
        if(this.isDamaged < 0) {
            this.isDamaged = 0
            this.shake.x = 0
            this.shake.y = 0
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
    beHit(projectile) {
        this.isDamaged = 100
        this.health -= 1
        if(this.health <= 0) {
            this.isDead = true
        }
    }
    get color() {
        if(this.isDead != true) {
            if(this.isDamaged > 0) {
                if(Math.floor(Index.model.timer) % 2 == 0) {
                    return "#FFFFFF"
                }
            }
            if(this.isShooting) {
                if(this.shots > 0
                && this.shots < 3) {
                    return "#FFFFFF"
                }
                return "#7B2319"
            }
        }
        return "#A52F22"
    }
}

function getRotation(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}
