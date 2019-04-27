import Preact from "preact"
import Index from "index.js"

import "views/game/Game.view.less"
import Entity from "views/game/Entity.view.js"

export default class Game {
    render() {
        return (
            <div class="Game">
                <Overlay/>
                {Object.values(Index.model.game.entities).map((entity) => (
                    <Entity entity={entity}/>
                ))}
            </div>
        )
    }
}

class Overlay {
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
