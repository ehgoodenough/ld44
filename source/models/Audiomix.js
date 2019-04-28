import LocalStorage from "local-storage-json"

const music = {
    "debris": new Audio(require("music/debris.mp3")),
    "trouble": new Audio(require("music/spacetime.mp3")),
}

const sound = {
    "clink": new Audio(require("sounds/clink.wav"))
}

export default class Audiomix {
    constructor() {
        this.soundVolume = LocalStorage.get("soundVolume") || 25
        this.musicVolume = LocalStorage.get("musicVolume") || 25
        this.musicPlaying = LocalStorage.get("musicPlaying")
        if(this.musicPlaying == undefined) {
            this.musicPlaying = {"track": "debris", "time": Date.now()}
            LocalStorage.set("musicPlaying", this.musicPlaying)
        }

        this.playMusic("debris")
    }
    playMusic(name) {
        if(this.music !== undefined) {
            this.music.pause()
        }
        this.music = music[name]
        this.music.volume = this.musicVolume / 100
        // if(__STAGE__ === "DEVELOPMENT") {
        //     this.music.currentTime = (Date.now() - this.musicPlaying.time) / 1000
        // }
        this.music.addEventListener("ended", () => {
            LocalStorage.set("musicPlaying", {
                "time": Date.now(),
                "track": "debris"
            })
            this.music.currentTime = 0
            this.music.play()
        })
        this.music.play()
    }
    playSound() {
        sound["clink"].currentTime = 0
        sound["clink"].volume = this.soundVolume / 100
        sound["clink"].play()
    }
    setMusicVolume(volume) {
        this.musicVolume = volume
        this.music.volume = volume / 100
        LocalStorage.set("musicVolume", volume)
    }
    setSoundVolume(volume) {
        this.soundVolume = volume
        LocalStorage.set("soundVolume", volume)
    }
}
