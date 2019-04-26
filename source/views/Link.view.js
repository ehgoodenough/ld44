import Preact from "preact"
import Index from "index.js"

import "views/Link.view.less"

export default class Link {
    render() {
        return (
            <div class="Link" onClick={this.onClick}>
                {this.props.label}
            </div>
        )
    }
    get onClick() {
        return (event) => {
            if(this.props.screen != undefined) {
                Index.model.screen = this.props.screen
            }
            if(this.props.sequence == "Play") {
                Index.model.screen = "GameScreen"
                Index.model.startGame()
                // OR CONTINUE GAME
                // AND PROMPT IF THEY'LL LOSE PROGRESS
            }
        }
    }
}
