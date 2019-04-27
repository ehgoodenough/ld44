import Preact from "preact"
import Index from "index"

import "views/screens/GameScreen.view.less"
import Game from "views/game/Game.view.js"
import Link from "views/Link.view.js"

export default class GameScreen {
    render() {
        return (
            <div class="GameScreen" onClick={this.onClick}>
                <PauseMenu/>
                <Game/>
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
            <div class="PauseMenu" onClick={this.onClick} isPaused={Index.model.game.isPaused}>
                <h1>Paused!!!</h1>
                <Link screen="TitleScreen" onClick={this.onClickLink}>
                    <span>Return to Titlescreen?</span>
                    <small>Don't worry, your progress will be saved!</small>
                </Link>
            </div>
        )
    }
    get onClick() {
        return (event) => {
            event.stopPropagation()
        }
    }
    get onClickLink() {
        return (event) => {
            Index.model.game.isPaused = false
        }
    }
}
