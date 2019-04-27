import Preact from "preact"
import Index from "index.js"

import "views/game/Entity.view.less"

export default class Entity {
    render() {
        return (
            <div class="Entity" style={this.style}/>
        )
    }
    get style() {
        return {
            "z-index": this.props.entity.stack,
            "top": this.props.entity.position.y + "em",
            "left": this.props.entity.position.x + "em",
            "width": (this.props.entity.width || 1) + "em",
            "height": (this.props.entity.height || 1) + "em",
            "margin-top": ((this.props.entity.height || 1) / -2) + (this.props.entity.shake && this.props.entity.shake.x || 0) + "em",
            "margin-left": ((this.props.entity.width || 1) / -2) + (this.props.entity.shake && this.props.entity.shake.y || 0) + "em",
            "transform": "rotate(" + (this.props.entity.rotation || 0) + "rad)",
            "background-color": this.props.entity.color,
            "opacity": this.props.entity.opacity,
            "animation-name": this.props.entity.isDead ? "isDead" : "",
        }
    }
}
