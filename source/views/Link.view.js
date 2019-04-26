import Preact from "preact"
import Index from "index.js"

import "views/Link.view.less"

export default class Link {
    render() {
        return (
            <div class="Link" onClick={this.onClick}>
                {this.props.children}
            </div>
        )
    }
    get onClick() {
        return (event) => {
            if(this.props.screen != undefined) {
                Index.model.screen = this.props.screen
            }
            if(this.props.onClick != undefined
            && this.props.onClick instanceof Function) {
                this.props.onClick(event)
            }
        }
    }
}
