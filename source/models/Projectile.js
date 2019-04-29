import Index from "index"
import clonedeep from "lodash.clonedeep"

const WHITE = "#FFF"

export default class Projectile {
    constructor(projectile) {
        this.size = {}
        this.size.x = 0.5
        this.size.y = 0.5

        this.speed = projectile.speed || 0.5
        this.rotation = projectile.rotation || 0
        this.position = clonedeep(projectile.position)
        this.position.y -= 0.25

        this.velocity = {}
        this.velocity.x = Math.cos(this.rotation) * this.speed
        this.velocity.y = Math.sin(this.rotation) * this.speed

        this.affiliation = projectile.affiliation

        this.color = WHITE
    }
    update(delta) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        const FRAME_WIDTH = 16
        const FRAME_HEIGHT = 9
        if(this.position.x < 0 - this.size.x
        || this.position.y < 0 - this.size.y
        || this.position.x > FRAME_WIDTH + this.size.x
        || this.position.y > FRAME_HEIGHT + this.size.y) {
            Index.model.game.remove(this)
        }

        if(this.affiliation == "baddies") {
            const goodie = Index.model.game.player
            const distance = getDistance(this.position, {
                "x": goodie.position.x,
                "y": goodie.position.y - 0.25 // MAGIC
            })
            if(goodie.isDead != true
            && distance < 0.66) { // MAGIC
                Index.model.game.remove(this)
                if(goodie.isDamaged == 0) {
                    goodie.beHit(this)
                    Index.model.audiomix.playSound("hit" + Math.ceil(Math.random() * 3))
                }
            }
        } else if(this.affiliation == "goodies") {
            Object.values(Index.model.game.baddies).find((baddie) => {
                const distance = getDistance(this.position, {
                    "x": baddie.position.x,
                    "y": baddie.position.y - 0.25 // MAGIC
                })
                if(baddie.isDead != true
                && distance < 0.66) { // MAGIC
                    Index.model.game.remove(this)
                    baddie.beHit(this)
                    Index.model.audiomix.playSound("hit" + Math.ceil(Math.random() * 3))
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
