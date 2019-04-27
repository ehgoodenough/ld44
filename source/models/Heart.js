import Index from "index"
import clonedeep from "lodash.clonedeep"

const WHITE = "#FFF"
const FRAME_WIDTH = 16
const FRAME_HEIGHT = 9

export default class Heart {
    constructor(heart) {
        this.width = 0.5
        this.height = 0.5

        this.position = clonedeep(heart.position)

        this.speed = heart.speed || 0.5
        this.deceleration = 0.25
        this.rotation = heart.rotation || Math.random() * (Math.PI * 2)

        this.velocity = {}
        this.velocity.x = Math.cos(this.rotation) * this.speed
        this.velocity.y = Math.sin(this.rotation) * this.speed

        this.color = WHITE
    }
    update(delta) {
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

        if(this.position.x < 0 - this.width
        || this.position.y < 0 - this.height
        || this.position.x > FRAME_WIDTH + this.width
        || this.position.y > FRAME_HEIGHT + this.height) {
            Index.model.game.remove(this)
        }

        const goodie = Index.model.game.player
        const distance = getDistance(this.position, goodie.position)
        if(goodie.isDamaged == 0
        && distance < goodie.width * 0.66) {
            Index.model.game.remove(this)
            goodie.pickupHeart(this)
        }
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

function getDistance(p1, p2) {
    var x = p1.x - p2.x
    var y = p1.y - p2.y
    return getVectorLength(x, y)
}

function getVectorLength(x,y) {
    return Math.sqrt((x * x) + (y * y))
}
