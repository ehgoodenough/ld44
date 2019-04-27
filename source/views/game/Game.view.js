import Preact from "preact"
import Index from "index.js"

import "views/game/Game.view.less"
import Entity from "views/game/Entity.view.js"

export default class Game {
    render() {
        return (
            <div class="Game">
                {Object.values(Index.model.game.entities).map((entity) => (
                    <Entity entity={entity}/>
                ))}
            </div>
        )
    }
}
