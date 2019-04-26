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
                        onInput={this.onInputMusicVolume}/>
                </div>
                <div class="Option">
                    <label>Sound Volume</label>
                    <input class="Volume" type="range" min="1" max="100"
                        value={Index.model.audio.soundVolume}
                        onInput={this.onInputSoundVolume}
                        onChange={this.onChangeSoundVolume}/>
                </div>
                <Link screen="TitleScreen">Back</Link>
            </div>
        )
    }
    get onInputMusicVolume() {
        return (event) => {
            Index.model.audio.setMusicVolume(event.target.value)
        }
    }
    get onInputSoundVolume() {
        return (event) => {
            Index.model.audio.setSoundVolume(event.target.value)
        }
    }
    get onChangeSoundVolume() {
        return (event) => {
            Index.model.audio.playSound()
        }
    }
}
