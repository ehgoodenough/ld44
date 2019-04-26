import Preact from "preact"
import Index from "index.js"

import "views/Mount.view.less"
import Frame from "views/Frame.view.js"

import GameScreen from "views/screens/GameScreen.view.js"
import TitleScreen from "views/screens/TitleScreen.view.js"
import GameOverScreen from "views/screens/GameOverScreen.view.js"

export default class Mount {
    render() {
        return (
            <div class="Mount">
                <title>
                    {this.title}
                </title>
                <Frame>
                    {this.screen}
                </Frame>
            </div>
        )
    }
    get title() {
        return Index.model.title
    }
    get screen() {
        if(Index.model.screen == "TitleScreen") {
            return <TitleScreen/>
        }
        if(Index.model.screen == "GameOverScreen") {
            return <GameOverScreen/>
        }
        if(Index.model.screen == "GameScreen") {
            return <GameScreen/>
        }
        if(__STAGE__ == "DEVELOPMENT") {
            throw new Error("Invalid Screen.")
        }
    }
}
