import Preact from "preact"
import Yaafloop from "yaafloop"

const Thinktank = {}

Thinktank.loop = new Yaafloop(function(delta) {
    if(Thinktank.model !== undefined) {
        Thinktank.model.update(delta)
    }
    if(Thinktank.view !== undefined) {
        this.view = Preact.render(<Thinktank.view/>, document.body, this.view)
    }
})

export default Thinktank
