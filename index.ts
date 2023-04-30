//Ponto de entrada, aqui eu posso fazer as coisas do "backend", acessar o FS, mas não consigo acessar a DOOM.

const path = require('path');
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.ts")
        },
        //allwaysOnTop
        frame: false,
        transparent: true,
        //backgroundColor: "#303030",
    })

    win.loadFile('./frontend/main.html');
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