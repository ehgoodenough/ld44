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
            "margin-top": (this.props.entity.height || 1) / -2 + "em",
            "margin-left": (this.props.entity.width || 1) / -2 + "em",
            "background-color": this.props.entity.color,
        }
    }
}
