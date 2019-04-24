import Preact from "preact"
import Index from "index.js"

import "views/screens/GameScreen.view.less"

export default class GameScreen {
    render() {
        return (
            <div class="GameScreen">
                <Camera>
                    {Index.model.game.world.blocks.map((block) => (
                        <Block block={block}/>
                    ))}
                </Camera>
            </div>
        )
    }
}

class Camera {
    render() {
        return (
            <div class="Camera">
                {this.props.children}
            </div>
        )
    }
}

class Block {
    render() {
        this.props.block.position = this.props.block.position || {}
        this.props.block.position.x = this.props.block.position.x || 0
        this.props.block.position.y = this.props.block.position.y || 0
        this.props.block.position.z = this.props.block.position.z || 0
        this.props.block.size = this.props.block.size || {}
        this.props.block.size.x = this.props.block.size.x || 1
        this.props.block.size.y = this.props.block.size.y || 1
        this.props.block.size.z = this.props.block.size.z || 1
        return (
            <div class="Block" style={{
                "transform": [
                    `translateX(${this.props.block.position.x}em)`,
                    `translateY(${this.props.block.position.y}em)`,
                    `translateZ(${(this.props.block.position.z) - (this.props.block.size.z / 2)}em)`,
                ].join(" ")
            }}>
                <div class="Front Face" style={{
                    "width": this.props.block.size.x + "em",
                    "height": this.props.block.size.y + "em",
                    "transform": `translateZ(${this.props.block.size.z / 2}em)`,
                    "background-color": this.props.block.color || "#C00",
                    "border-color": this.props.block.color || "#C00",
                }}/>
                <div class="Right Face" style={{
                    "width": this.props.block.size.z + "em",
                    "height": this.props.block.size.y + "em",
                    "transform": `rotateY(90deg) translateZ(${this.props.block.size.x - (this.props.block.size.z / 2)}em)`,
                    "background-color": this.props.block.darkerColor || "#0C0",
                    "border-color": this.props.block.darkerColor || "#0C0",
                }}/>
                <div class="Bottom Face" style={{
                    "width": this.props.block.size.x + "em",
                    "height": this.props.block.size.z + "em",
                    "transform": `rotateX(-90deg) translateZ(${this.props.block.size.y - (this.props.block.size.z / 2)}em)`,
                    "background-color": this.props.block.darkererColor || "#00C",
                    "border-color": this.props.block.darkererColor || "#00C",
                }}/>
            </div>
        )
    }
}
