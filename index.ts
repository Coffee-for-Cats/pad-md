//Ponto de entrada, aqui eu posso fazer as coisas do "backend", acessar o FS, mas não consigo acessar a DOOM.
const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');

//just for dev
const electronReload = require("electron-reload");
electronReload(__dirname, {});

//Menu.setApplicationMenu(null)

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        //nodeIntegration: true,
        //allwaysOnTop
        frame: false,

        backgroundColor: "#151515",
    })

    win.loadFile(path.join(__dirname, "../main.html"));
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()

    if (canceled) {} else return filePaths[0]
}

app.on("ready", () => {
    createWindow()
    ipcMain.handle('openFile', handleFileOpen);

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