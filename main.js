// const Yargs = require("yargs")
// const Chokidar = require("chokidar")
const Electron = require("electron")

let browser = undefined
let directory = "./builds/web"

Electron.app.on("ready", function() {
    browser = new Electron.BrowserWindow({
        "width": 1600, "height": 900,
        "webPreferences": {
            "nodeIntegration": true
        }
    })

    browser.loadFile(directory + "/index.html")

    // if(Yargs.argv.stage === "development") {
    //     browser.webContents.openDevTools()
    //     Chokidar.watch(directory).on("all", function() {
    //         browser.reload()
    //     })
    // }

    browser.on("closed", () => {
        browser = undefined
    })
})

Electron.app.on("window-all-closed", () => {
    Electron.app.quit()
})
