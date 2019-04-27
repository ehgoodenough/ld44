import Index from "index"

const WHITE = "#FFF"

export default class Projectile {
    constructor(projectile) {
        this.width = 0.25
        this.height = 0.25

        this.position = {
            "x": projectile.position.x,
            "y": projectile.position.y,
        }
        this.velocity = {
            "x": projectile.velocity.x,
            "y": projectile.velocity.y,
        }

        this.color = WHITE
    }
    update(delta) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // TODO: Collision with Entities
        // TODO: Collision with Frame
    }
}
