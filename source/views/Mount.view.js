import Preact from "preact"
import Thinktank from "library/Thinktank.js"

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
        return Thinktank.model.title
    }
    get screen() {
        if(Thinktank.model.screen == "TitleScreen") {
            return <TitleScreen/>
        }
        if(Thinktank.model.screen == "GameOverScreen") {
            return <GameOverScreen/>
        }
        if(Thinktank.model.screen == "GameScreen") {
            return <GameScreen/>
        }
        if(__STAGE__ == "DEVELOPMENT") {
            throw new Error("Invalid Screen.")
        }
    }
}
