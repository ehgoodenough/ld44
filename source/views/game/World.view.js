import Preact from "preact"
import Index from "index"

import "views/game/World.view.less"

const FRAME_WIDTH = 16
const FRAME_HEIGHT = 9
const UNIT = 10

export default class World {
    render() {
        return (
            <svg class="World" style={this.style}
                viewBox={"0 0" + " " + (FRAME_WIDTH * UNIT) + " " + FRAME_HEIGHT * UNIT}>
                <Sun color={Index.model.game.world.colors[4]}/>
                {Object.values(Index.model.game.world.levels).map((level) => (
                    <Level level={level}/>
                ))}
            </svg>
        )
    }
    get style() {
        return {
            "background-color": Index.model.game.world.colors[0],
        }
    }
}

class Sun {
    render() {
        return (
            <circle cx="60" cy="25" r="20" fill={this.props.color}/>
        )
    }
}

class Level {
    render() {
        return (
            <polygon fill={this.fill} points={this.points}/>
        )
    }
    get fill() {
        return this.props.level.color || "#444"
    }
    get points() {
        var points = this.props.level.points.concat([
            {"x": FRAME_WIDTH, "y": FRAME_HEIGHT},
            {"x": 0, "y": FRAME_HEIGHT}
        ])

        return points.map((point) => {
            return (point.x * UNIT) + "," + (point.y * UNIT)
        }).join(" ")
    }
}
