import Preact from "preact"
import Index from "index"

import "views/screens/GameScreen.view.less"
import Link from "views/Link.view.js"

export default class GameScreen {
    render() {
        return (
            <div class="GameScreen" onClick={this.onClick}>
                <PauseMenu/>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            if(Index.model.game.isPaused == true) {
                Index.model.game.isPaused = false
            }
        }
    }
}

class PauseMenu {
    render() {
        return (
            <div class="PauseMenu" isPaused={Index.model.game.isPaused} onClick={this.onClick}>
                <h1>Paused!!!</h1>
                <Link label="Return to Titlescreen?" screen="TitleScreen"/>
                <small>Don't worry, your progress will be saved!</small>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            event.stopPropagation()
        }
    }
}
