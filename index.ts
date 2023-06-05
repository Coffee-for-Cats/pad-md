//Ponto de entrada, aqui eu posso fazer as coisas do "backend", acessar o FS, mas não consigo acessar a DOOM.
const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const fs = require('fs/promises');

//Menu.setApplicationMenu(null)

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        frame: false,

        backgroundColor: "#151515",
    })

    win.loadFile(path.join(__dirname, "../src/main.html"));
}

app.on("ready", () => {
    createWindow()
    ipcMain.on('closeApp', closeAppHandler)
    ipcMain.handle('openFile', openFileHandler)
    ipcMain.handle('openFileDialog', openFileDialogHandler)
    ipcMain.handle('saveFile', saveFileHandler)

    macOpenAgain()
})

function closeAppHandler() {
    app.exit();
}

async function openFileDialogHandler(e: any) {
    const paths = await dialog.showOpenDialog({ properties: ['openFile'] })
    return paths.filePaths[0]
}

async function openFileHandler(e: any, filePath: string) {
    const data = await fs.readFile(filePath, 'utf8')

    return data
}

async function saveFileHandler(_e: any, filePath: string, fileContent: string) {
    if (filePath) {
        fs.writeFile(filePath, fileContent);
    }
}

//macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
function macOpenAgain() {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}