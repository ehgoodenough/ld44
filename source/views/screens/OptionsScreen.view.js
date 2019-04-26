import Preact from "preact"
import Index from "index"
import LocalStorage from "local-storage-json"

import "views/screens/OptionsScreen.view.less"
import Link from "views/Link.view.js"

export default class OptionsScreen {
    render() {
        return (
            <div class="OptionsScreen">
                <h1>Options</h1>
                <div class="Option">
                    <label>Music Volume</label>
                    <input class="Volume" type="range" min="1" max="100"
                        value={Index.model.audio.musicVolume}
                        onInput={this.onChangeMusicVolume}/>
                </div>
                <div class="Option">
                    <label>Sound Volume</label>
                    <input class="Volume" type="range" min="1" max="100"
                        value={Index.model.audio.soundVolume}
                        onInput={this.onChangeSoundVolume}/>
                </div>
                <Link screen="TitleScreen">Back</Link>
            </div>
        )
    }
    get onChangeMusicVolume() {
        return (event) => {
            Index.model.audio.setMusicVolume(event.target.value)
        }
    }
    get onChangeSoundVolume() {
        return (event) => {
            Index.model.audio.setSoundVolume(event.target.value)
        }
    }
}
