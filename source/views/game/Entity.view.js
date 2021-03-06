import Preact from "preact"
import Index from "index"

import "views/game/Entity.view.less"

export default class Entity {
    render() {
        return (
            <div class="Entity" style={this.style}>
                <i class={this.props.entity.icon}/>
            </div>
        )
    }
    get style() {
        this.props.entity.anchor = this.props.entity.anchor || {"x": 0.5, "y": 0.5}
        return {
            "z-index": this.props.entity.stack,
            "top": this.props.entity.position.y + "em",
            "left": this.props.entity.position.x + "em",
            "width": (this.props.entity.size.x || 1) + "em",
            "height": (this.props.entity.size.y || 1) + "em",
            "margin-top": ((this.props.entity.size.y || 1) * (-1 * this.props.entity.anchor.y)) + (this.props.entity.shake && this.props.entity.shake.x || 0) + "em",
            "margin-left": ((this.props.entity.size.x || 1) * (-1 * this.props.entity.anchor.x)) + (this.props.entity.shake && this.props.entity.shake.y || 0) + "em",
            "transform": "rotate(" + (this.props.entity.rotation || 0) + "rad)",
            "background-color": !this.props.entity.image && !this.props.entity.icon ? this.props.entity.color : "",
            "color": this.props.entity.color,
            "opacity": this.props.entity.opacity,
            "animation-name": this.props.entity.isDead ? "isDead" : "",
            "background-image": this.props.entity.image ? "url(" + this.props.entity.image + ")" : "",
        }
    }
}
