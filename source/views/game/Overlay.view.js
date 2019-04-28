import Preact from "preact"
import Index from "index"

import "views/game/Overlay.view.less"

export default class Overlay {
    render() {
        return (
            <div class="Overlay">
                <div class="Hearts">
                    {this.hearts}
                </div>
            </div>
        )
    }
    get hearts() {
        const hearts = []
        for(let i = 0; i < Index.model.game.player.hearts; i += 1) {
            hearts.push(<div class="Heart"/>)
        }
        return hearts
    }
}
