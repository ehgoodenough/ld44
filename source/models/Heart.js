import Index from "index"
import clonedeep from "lodash.clonedeep"

const WHITE = "#FFF"
const GRAVITY = 0.03
const MAX_GRAVITY = 15

export default class Heart {
    constructor(heart) {
        this.size = {}
        this.size.x = 0.5
        this.size.y = 0.5

        this.anchor = {"x": 0.5, "y": 0.75}

        this.position = clonedeep(heart.position)
        this.levelnum = heart.levelnum

        this.speed = heart.speed || 0.25
        this.deceleration = 0.25
        this.rotation = heart.rotation || (Math.PI * -0.5) + ((Math.PI * -1) * Math.random() - (Math.PI * -0.5))

        this.velocity = {}
        this.velocity.x = Math.cos(this.rotation) * this.speed
        this.velocity.y = Math.sin(this.rotation) * this.speed

        this.color = "#F4F8F0"
        this.icon = "fas fa-heart"
    }
    update(delta) {
        const level = Index.model.game.world.levels[this.levelnum]
        this.position.x -= level.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.x -= this.velocity.x * this.deceleration
        // this.velocity.y -= this.velocity.y * this.deceleration

        // if(this.velocity.x < +0.001
        // && this.velocity.x > -0.001) {
        //     this.velocity.x = 0
        // }
        // if(this.velocity.y < +0.001
        // && this.velocity.y > -0.001) {
        //     this.velocity.y = 0
        // }

        if(this.position.y > level.y(this.position.x)) {
            this.position.y = level.y(this.position.x)
            this.hasLanded = true
        }

        this.velocity.y += GRAVITY
        if(this.velocity.y > MAX_GRAVITY) {
            this.velocity.y = MAX_GRAVITY
        }

        const FRAME_WIDTH = 16
        const FRAME_HEIGHT = 9
        if(this.position.x < 0 - this.size.x
        || this.position.y < 0 - this.size.y
        || this.position.x > FRAME_WIDTH + this.size.x
        || this.position.y > FRAME_HEIGHT + this.size.y) {
            Index.model.game.remove(this)
        }

        const goodie = Index.model.game.player
        const distance = getDistance(this.position, goodie.position)
        if(distance < goodie.size.x * 0.66) {
            Index.model.game.remove(this)
            goodie.pickupHeart(this)
            Index.model.audiomix.playSound("pickup" + Math.ceil(Math.random() * 3))
        }
        Object.values(Index.model.game.baddies).find((baddie) => {
            const distance = getDistance(this.position, baddie.position)
            if(baddie.isDead != true
            && distance < this.size.x) {
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
