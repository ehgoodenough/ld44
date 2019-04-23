import Preact from "preact"
import Mount from "views/Mount.view.js"

function update() {
    this.mount = Preact.render(<Mount/>, document.body, this.mount)
}

export default {update}
