import LocalStorage from "local-storage-json"

const music = {
    "debris": new Audio(require("music/debris.mp3")),
    "trouble": new Audio(require("music/spacetime.mp3")),
}

const sound = {
    "explosion1": new Audio(require("sounds/explosion1.wav")),
    "explosion2": new Audio(require("sounds/explosion2.wav")),
    "explosion3": new Audio(require("sounds/explosion3.wav")),
    "hit1": new Audio(require("sounds/hit1.wav")),
    "hit2": new Audio(require("sounds/hit2.wav")),
    "hit3": new Audio(require("sounds/hit3.wav")),
    "jump1": new Audio(require("sounds/jump1.wav")),
    "jump2": new Audio(require("sounds/jump2.wav")),
    "jump3": new Audio(require("sounds/jump3.wav")),
    "shoot1": new Audio(require("sounds/shoot1.wav")),
    "shoot2": new Audio(require("sounds/shoot2.wav")),
    "shoot3": new Audio(require("sounds/shoot3.wav")),
    "pickup1": new Audio(require("sounds/pickup1.wav")),
    "pickup2": new Audio(require("sounds/pickup2.wav")),
    "pickup3": new Audio(require("sounds/pickup3.wav")),
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
    playSound(name) {
        sound[name].currentTime = 0
        sound[name].volume = (this.soundVolume / 100) / 2
        sound[name].play()
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
