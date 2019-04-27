import Index from "index"
import clonedeep from "lodash.clonedeep"

const WHITE = "#FFF"

export default class Projectile {
    constructor(projectile) {
        this.width = 0.5
        this.height = 0.5

        this.position = clonedeep(projectile.position)
        this.velocity = clonedeep(projectile.velocity)

        this.affiliation = projectile.affiliation

        this.color = WHITE
    }
    update(delta) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // TODO: Collision with Entities
        // TODO: Collision with Frame
    }
}
