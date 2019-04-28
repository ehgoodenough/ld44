import Preact from "preact"
import Index from "index"

import "views/game/Game.view.less"
import Entity from "views/game/Entity.view.js"
import Overlay from "views/game/Overlay.view.js"
import World from "views/game/World.view.js"

export default class Game {
    render() {
        return (
            <div class="Game">
                <Overlay/>
                <World/>
                {Object.values(Index.model.game.entities).map((entity) => (
                    <Entity entity={entity}/>
                ))}
            </div>
        )
    }
}
