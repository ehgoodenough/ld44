import Preact from "preact"
import Index from "index"

import "views/screens/TitleScreen.view.less"

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
                        <Link label="Play" screen="GameScreen"/>
                        <Link label="Options" screen="OptionsScreen"/>
                        <Link label="Feedback" screen="FeedbackScreen"/>
                    </div>
                </section>
                <section class="HeroSection"/>
            </div>
        )
    }
}

class Link {
    render() {
        return (
            <div class="Link" onClick={this.onClick}>
                {this.props.label}
            </div>
        )
    }
    get onClick() {
        return (event) => {
            Index.model.screen = this.props.screen
        }
    }
}
