import Index from "index"
import clonedeep from "lodash.clonedeep"

const WHITE = "#FFF"
const FRAME_WIDTH = 16
const FRAME_HEIGHT = 9

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

        if(this.position.x < 0 - this.width
        || this.position.y < 0 - this.height
        || this.position.x > FRAME_WIDTH + this.width
        || this.position.y > FRAME_HEIGHT + this.height) {
            Index.model.game.remove(this)
        }

        if(this.affiliation == "baddies") {
            const goodie = Index.model.game.player
            const distance = getDistance(this.position, goodie.position)
            if(goodie.isDamaged == 0
            && distance < this.width) {
                Index.model.game.remove(this)
                goodie.beHit(this)
            }
        } else if(this.affiliation == "goodies") {
            Object.values(Index.model.game.baddies).find((baddie) => {
                const distance = getDistance(this.position, baddie.position)
                if(baddie.isDead != true
                && distance < this.width) {
                    Index.model.game.remove(this)
                    baddie.beHit(this)
                }
            })
        }
    }
}

function getDistance(p1, p2) {
    var x = p1.x - p2.x
    var y = p1.y - p2.y
    return getVectorLength(x, y)
}

function getVectorLength(x,y) {
    return Math.sqrt((x * x) + (y * y))
}
