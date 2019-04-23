import Preact from "preact"

import model from "models/.js"
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
        return model.title
    }
    get screen() {
        if(model.screen == "TitleScreen") {
            return <TitleScreen/>
        }
        if(model.screen == "GameOverScreen") {
            return <GameOverScreen/>
        }
        if(model.screen == "GameScreen") {
            return <GameScreen/>
        }
        if(__STAGE__ == "DEVELOPMENT") {
            throw new Error("Invalid Screen.")
        }
    }
}
