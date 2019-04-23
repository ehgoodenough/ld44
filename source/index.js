import "statgrab/do"

import Model from "models/Mount.js"
import View from "views/Mount.view.js"

import Preact from "preact"
import Yaafloop from "yaafloop"

const Index = {}
export default Index

Index.Model = Model
Index.View = View

Index.model = new Model()

Index.loop = new Yaafloop(function(delta) {
    Index.model.update(delta)
    Index.view = Preact.render(<Index.View/>, document.body, Index.view)
})
