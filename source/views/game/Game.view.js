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
                <Overlay game={this.props.game}/>
                <World game={this.props.game}/>
                {Object.values(this.props.game.entities).map((entity) => (
                    <Entity entity={entity}/>
                ))}
            </div>
        )
    }
}
