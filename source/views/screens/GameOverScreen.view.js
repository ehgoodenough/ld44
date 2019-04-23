import Preact from "preact"

import model from "models/.js"

import "views/screens/GameOverScreen.view.less"

export default class GameOverScreen {
    render() {
        return (
            <div class="GameOverScreen">
                Congrats! You win!
            </div>
        )
    }
}
