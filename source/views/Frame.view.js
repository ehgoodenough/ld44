import Preact from "preact"

import "views/Frame.view.less"

export default function Frame() {
    return (
        <div class="Frame" id="frame">
            {this.props.children}
        </div>
    )
}
