import LocalStorage from "local-storage-json"

export default class Audio {
    constructor() {
        this.musicVolume = LocalStorage.get("musicVolume") || 25
        this.soundVolume = LocalStorage.get("soundVolume") || 50
    }
    setMusicVolume(volume) {
        this.musicVolume = volume
        LocalStorage.set("musicVolume", volume)
    }
    setSoundVolume(volume) {
        this.soundVolume = volume
        LocalStorage.set("soundVolume", volume)
    }
}
