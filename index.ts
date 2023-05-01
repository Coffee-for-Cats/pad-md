//Ponto de entrada, aqui eu posso fazer as coisas do "backend", acessar o FS, mas não consigo acessar a DOOM.

const path = require('path');
const { app, BrowserWindow } = require('electron');

//just for dev
const electronReload = require("electron-reload");
electronReload(__dirname, {});

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        //com isso, eu consigo fazer coisas do node.js no script do front-end.
        //nodeIntegration: true,
        //allwaysOnTop
        frame: false,
        //transparent: true,
        //backgroundColor: "#303030",
    })

    win.loadFile(path.join(__dirname, "../main.html"));
}

app.whenReady().then(function start() {
    createWindow()
    macOpenAgain()
})

//coisa de gente rica (macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
function macOpenAgain() {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}