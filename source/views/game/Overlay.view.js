import Preact from "preact"
import Index from "index"

import "views/game/Overlay.view.less"

export default class Overlay {
    render() {
        return (
            <div class="Overlay">
                {this.hearts}
                {this.bloodflash}
            </div>
        )
    }
    get hearts() {
        const hearts = []
        for(let i = 0; i < this.props.game.player.hearts; i += 1) {
            hearts.push(<div class="Heart"/>)
        }
        return (
            <div class="Hearts">
                {hearts}
            </div>
        )
    }
    get bloodflash() {
        if(this.props.game.player.isDead) {
            return
        }
        return (
            <div class="Bloodflash" style={{
                "opacity": Math.max(this.props.game.player.isDamaged - 1000, 0) / 500
            }}/>
        )
    }
}
