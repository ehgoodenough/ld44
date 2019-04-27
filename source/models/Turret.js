import Index from "index"
import clonedeep from "lodash.clonedeep"

import Projectile from "models/Projectile.js"
import Heart from "models/Heart.js"

export default class Turret {
    constructor(turret) {
        this.width = 1
        this.height = 1

        this.position = clonedeep(turret.position)
        this.rotation = Math.PI / 2
        this.velocityRotation = 0
        this.targetRotation = 0
        this.maxVelocityRotation = 2
        this.minVelocityRotation = 0.001
        this.rotationSpeed = 32

        this.stack = 5

        this.timer = 2
        this.shots = 3
        this.isShooting = false
        this.isDoneShooting = false

        this.deceleration = 0.25

        this.group = "baddies"

        this.maxhealth = 5
        this.health = this.maxhealth
        this.opacity = 1

        this.shake = {"x": 0, "y": 0}
    }
    update(delta) {
        if(this.isDead == true) {
            // if(this.opacity > 0) {
            //     this.opacity -= 0.06 * delta.f
            //     if(this.opacity < 0) {
            //         this.opacity = 0
            //     }
            //     this.width += 0.25 * delta.f
            //     this.height += 0.25 * delta.f
            //     this.rotation += (Math.PI / 32) * delta.f
            // }
            return
        }
        if(this.isShooting == false) {
            this.targetRotation = getRotation(this.position, Index.model.game.player.position)

            let min = Math.min(this.targetRotation, this.rotation)
            let max = Math.max(this.targetRotation, this.rotation)
            let clockwise = max - min
            let counterclockwise = (Math.PI - max) - ((-1 * Math.PI) - min)

            // console.log(
            //     Math.round(clockwise * (180/Math.PI)),
            //     Math.round(counterclockwise * (180/Math.PI)),
            //     (this.rotation * (180/Math.PI)).toFixed(2),
            //     (this.targetRotation * (180/Math.PI)).toFixed(2),
            // )

            if(clockwise < counterclockwise) {
                this.velocityRotation += (this.targetRotation - this.rotation) / this.rotationSpeed
            } else {
                this.velocityRotation -= (this.rotation - this.targetRotation) / this.rotationSpeed
            }

            // let clockwise = Math.min(...[
            //     Math.abs(this.rotation - this.targetRotation),
            //     Math.abs((this.rotation + (Math.PI / 2)) - this.targetRotation),
            // ])
            // let counterclockwise = Math.min(...[
            //     Math.abs(this.targetRotation - this.rotation),
            //     Math.abs(this.targetRotation - (this.rotation + (Math.PI / 2))),
            // ])
            //
            // if(clockwise > counterclockwise) {
            //     this.velocityRotation += (this.targetRotation - this.rotation) / this.rotationSpeed
            // } else {
            //     this.velocityRotation -= (this.rotation - this.targetRotation) / this.rotationSpeed
            // }

            // if(this.rotation < this.targetRotation) {
            //     this.velocityRotation += (this.targetRotation - this.rotation) / this.rotationSpeed
            // }
            // if(this.rotation > this.targetRotation) {
            //     this.velocityRotation -= (this.rotation - this.targetRotation) / this.rotationSpeed
            // }

            // if(Math.abs(this.rotation - this.targetRotation) < Math.PI * 1) {
            //     // do regular tracking
            //     if(this.rotation < this.targetRotation) {
            //         this.velocityRotation += (this.targetRotation - this.rotation) / this.rotationSpeed
            //     } else {
            //         this.velocityRotation -= (this.rotation - this.targetRotation) / this.rotationSpeed
            //     }
            // } else {
            //     let wrappedTargetRotation = 0
            //     // wrap the goal angle
            //     if(this.targetRotation > Math.PI * 1.5) {
            //         wrappedTargetRotation = this.targetRotation - (Math.PI * 2)
            //     } else if (this.targetRotation < Math.PI * 0.5) {
            //         wrappedTargetRotation = this.targetRotation + (Math.PI * 2)
            //     }
            //     // and track the wrapped angle
            //     if(this.rotation < wrappedTargetRotation) {
            //         this.velocityRotation += (this.targetRotation - this.rotation) / this.rotationSpeed
            //     } else {
            //         this.velocityRotation -= (this.rotation - this.targetRotation) / this.rotationSpeed
            //     }
            // }


            this.rotation += this.velocityRotation
            this.velocityRotation -= this.velocityRotation * this.deceleration
            this.velocityRotation = Math.min(Math.max(this.velocityRotation, -1 * this.maxVelocityRotation), +1 * this.maxVelocityRotation)

            if(this.velocityRotation < +1 * this.minVelocityRotation
            && this.velocityRotation > -1 * this.minVelocityRotation) {
                this.velocityRotation = 0
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
                    "rotation": this.rotation,
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
        this.width += 0.1
        this.height += 0.1
        if(this.health <= 0) {
            this.isDead = true

            // TODO: drop new heart container?
            for(let i = 0; i < this.maxhealth; i += 1) {
                Index.model.game.add(new Heart({
                    "position": this.position,
                }))
            }
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
