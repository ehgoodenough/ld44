import Preact from "preact"
import Index from "index.js"

import "views/game/Player.view.less"

export default class Player {
    render() {
        return (
            <div class="Player" style={this.style}/>
        )
    }
    get style() {
        return {
            "top": Index.model.game.player.position.y + "em",
            "left": Index.model.game.player.position.x + "em",
        }
    }
}
