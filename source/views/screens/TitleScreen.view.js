import Preact from "preact"
import Index from "index"

import "views/screens/TitleScreen.view.less"
import Link from "views/Link.view.js"
import Game from "views/game/Game.view.js"

export default class TitleScreen {
    render() {
        return (
            <div class="TitleScreen">
                <section class="MenuSection">
                    <div class="Title">
                        <h1>{Index.model.title}</h1>
                        <h2>A game for Ludum Dare 44.</h2>
                    </div>
                    <div class="Links">
                        <Link screen="GameScreen" onClick={this.onClickPlay}>Play</Link>
                        <Link screen="OptionsScreen">Options</Link>
                        <Link url="https://ldjam.com/events/ludum-dare/44/$154164">Feedback</Link>
                    </div>
                </section>
                <section class="HeroSection">
                    <Game game={Index.model.demogame}/>
                </section>
            </div>
        )
    }
    get onClickPlay() {
        return (event) => {
            Index.model.startGame()
            Index.model.audiomix.playMusic("trouble")
        }
    }
}
