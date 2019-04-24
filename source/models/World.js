export default class World {
    constructor(world = {}) {

        this.blocks = []
        for(let x = 0; x < 10; x += 1) {
            for(let y = 0; y < 10; y += 1) {
                this.blocks.push({
                    "position": {
                        "x": x,
                        "y": y,
                        "z": 0 + (Math.random() * 0.0125)
                    }
                })
            }
        }
    }
}
