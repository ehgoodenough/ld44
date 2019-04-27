import Preact from "preact"
import Index from "index.js"

import "views/game/Game.view.less"
import Player from "views/game/Player.view.js"

export default class Game {
    render() {
        return (
            <div class="Game">
                <Player/>
            </div>
        )
    }
}
