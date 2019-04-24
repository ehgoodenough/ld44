import "statgrab/do"

import Model from "models/Mount.js"
import View from "views/Mount.view.js"

const Index = {
    "View": View,
    "model": new Model()
}
export default Index

import Preact from "preact"
import Yaafloop from "yaafloop"
Index.loop = new Yaafloop(function(delta) {
    Index.model.update(delta)
    this.view = Preact.render(<Index.View/>, document.body, this.view)
})
