import seedrandom from "seedrandom"

const COLORS = [
    "#8287C1 #75696D #463339 #222222 #E0F1E1".split(" "), //blue and gray
    "#5B749E #798A5D #45532D #222222 #DFE8F0".split(" "), //blue and green
    "#AC8A72 #73738F #3C3C61 #222222 #D6BAE2".split(" "), //brown and blue
    "#534873 #798BA1 #3D464F #222222 #E29AA8".split(" "), //purple and blue
    "#5A3F80 #92869E #57395B #222222".split(" "), //purple and purple
    "#46303D #6D5E65 #AFAF93 #222222 #A5787B".split(" "), //maroon and green
    "#E7AC80 #8C715C #471F41 #222222 #EEE2F0".split(" "), //yellow and red
    "#8AAB80 #48402B #2F271C #222222".split(" "), //green and brown
    "#C4F776 #80B080 #425A44 #222222".split(" "), //green and green
]

export default class World {
    constructor(world = {}) {
        this.colors = world.colors || COLORS[world.colorset || 2]

        this.slow = world.slow

        seedrandom(world.seed || "ld44.", {"global": true})

        this.levels = []
        for(let number = 0; number < 3; number += 1) {
            this.levels.push(new Level({
                "color": this.colors[number + 1],
                "number": number,
                "slow": this.slow
            }))
        }
    }
    update(delta) {
        Object.values(this.levels).forEach((level) => {
            if(level.update instanceof Function) {
                level.update(delta)
            }
        })
    }
}

const UNIT = 1
const OFFSET_BETWEEN_LEVELS = UNIT * 0.25
const BUFFER = 1 // 360 - (((2 + 2 + 2) * UNIT) + OFFSET_BETWEEN_LEVELS + OFFSET_BETWEEN_LEVELS)
const OFFSET_WITH_TOP_OF_FRAME = UNIT * 1.25

const FRAME_WIDTH = 16

class Level {
    constructor(level) {
        this.color = level.color
        this.number = level.number
        this.speed = ((this.number * 2) + 3) / (300 + (level.slow ? 300 : 0))

        this.points = new Array()
        while(this.points.length < 21) {
            this.addAnotherPoint()
        }
    }
    addAnotherPoint() {
        if(this.points.length == 0) {
            var y = this.number * 2 * UNIT
            y += OFFSET_WITH_TOP_OF_FRAME
            y += this.number * OFFSET_BETWEEN_LEVELS
            y += BUFFER / 2
            y += UNIT
            this.points.push({
                x: 0, y: y,
                vector: ".",
                lvl: 1,
            })
        } else {
            var prevpoint = this.points[this.points.length - 1]

            var vectors = new Array()
            if(prevpoint.vector[0] == "-") {
                if(prevpoint.lvl < 2) {
                    vectors.push("\\")
                }
                if(prevpoint.lvl > 0) {
                    vectors.push("/")
                }
                if(prevpoint.lvl != 1
                && Math.random() < 0.25) {
                    vectors.push("|")
                }
            }
            if(prevpoint.vector == "/"
            && Math.random() < 0.5) {
                vectors.push("\\")
                if(prevpoint.lvl > 0) {
                    vectors.push("/")
                }
            } if(prevpoint.vector == "\\"
            && Math.random() < 0.5) {
                if(prevpoint.lvl < 2) {
                    vectors.push("\\")
                }
            }
            if(prevpoint.vector[0] != "-"
            || vectors.length == 0) {
                vectors.push("-")
                vectors.push("--")
                if(Math.random() < 0.5) {
                    vectors.push("---")
                }
                if(Math.random() < 0.5) {
                    vectors.push("----")
                }
            }

            var vector = vectors[Math.floor(Math.random() * vectors.length)]

            var lvl = prevpoint.lvl
            var x = prevpoint.x
            var y = prevpoint.y

            if(vector[0] == "-") {
                x += UNIT * vector.length
            } else {
                if(vector == "/") {
                    lvl -= 1
                    y -= UNIT
                } else if(vector == "\\") {
                    lvl += 1
                    y += UNIT
                } else if(vector == "|") {
                    if(lvl == 0) {
                        lvl = 2
                        y += UNIT * 2
                    } else if(lvl == 2) {
                        lvl = 0
                        y -= UNIT * 2
                    }
                    this.points.push({
                        x: x, y: y,
                        vector: vector,
                        lvl: lvl
                    })
                }
                x += UNIT
            }
            this.points.push({
                vector: vector,
                x: x, y: y,
                lvl: lvl
            })
        }
    }
    update(delta) {
        for(var index in this.points) {
            this.points[index].x -= this.speed * delta.f
        }

        if(this.points[1].x < 0) {
            this.points.shift()
        }

        var endpoint = this.points[this.points.length - 2]
        if(endpoint.x < FRAME_WIDTH) {
            this.addAnotherPoint()
        }
    }
    y(x) {
        for(var i = 1; i < this.points.length; i++) {
            var a = this.points[i - 1]
            var b = this.points[i]
            if(a.x <= x && b.x > x) {
                var slope = (b.y - a.y) / (b.x - a.x)
                return slope * (x - a.x) + a.y
            }
        }
    }
    get levelnum() {
        return this.number
    }
}
