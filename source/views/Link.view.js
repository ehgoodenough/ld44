import Preact from "preact"
import Index from "index"

import "views/Link.view.less"

export default class Link {
    render() {
        return (
            <a class="Link" onClick={this.onClick}
                href={this.props.url} target="_blank">
                {this.props.children}
            </a>
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
