import Preact from "preact"
import Index from "index"

import "views/screens/TitleScreen.view.less"
import Link from "views/Link.view.js"

export default class TitleScreen {
    render() {
        return (
            <div class="TitleScreen">
                <section class="MenuSection">
                    <div class="Title">
                        <h1>Game Title!!</h1>
                        <h2>A subtitle about the game.</h2>
                    </div>
                    <div class="Links">
                        <Link label="Play" sequence="Play"/>
                        <Link label="Options" screen="OptionsScreen"/>
                        <Link label="Feedback" screen="FeedbackScreen"/>
                    </div>
                </section>
                <section class="HeroSection"/>
            </div>
        )
    }
}
