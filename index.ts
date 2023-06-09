//App entry point. I can do backend things, but I do not have access to the doom.
const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const fs = require('fs/promises');

const openWindows:any = [];

//problably makes the app smaller and lighter, no devtools or debug info!
//Menu.setApplicationMenu(null)

//prevents build startup
if (require('electron-squirrel-startup')) app.quit();

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

    const id = win.webContents.id;
    openWindows[id] = win;
}

app.on("ready", () => {
    createWindow()
    ipcMain.handle('openFile', openFileHandler)
    ipcMain.handle('openFileDialog', openFileDialogHandler)
    ipcMain.handle('saveFile', saveFileHandler)
    ipcMain.handle('saveFileDialog', saveFileDialogHandler)
    ipcMain.on('newPage', createWindow)
    ipcMain.on('pinWindow', pinWindowHandler)

    macOpenAgain()
})

async function openFileDialogHandler(e: any) {
    const paths = await dialog.showOpenDialog({ properties: ['openFile'] })
    return paths.filePaths[0]
}

async function openFileHandler(e: any, filePath: string) {
    if (!filePath) return ""
    const data = await fs.readFile(filePath, 'utf8')

    return data
}

async function saveFileHandler(_e: any, filePath: string, fileContent: string) {
    if (filePath) {
        fs.writeFile(filePath, fileContent);
    }
}

async function saveFileDialogHandler(_e: any) {
    const paths = await dialog.showSaveDialog({});
    let filePath = paths.filePath
    if (filePath && !path.extname(filePath)) {
        filePath += '.md'
    }
    return filePath
}

async function pinWindowHandler(e: any) {
    const id = e.sender.id;
    const win = openWindows[id]

    //switch "alwaysOnTop"
    if (win.isAlwaysOnTop()) win.setAlwaysOnTop(false); else win.setAlwaysOnTop(true)
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