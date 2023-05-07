//Ponto de entrada, aqui eu posso fazer as coisas do "backend", acessar o FS, mas não consigo acessar a DOOM.
import path from 'path';
import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
import fs from 'fs';

//just for dev
import electronReload from "electron-reload";
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

    win.loadFile(path.join(__dirname, "../src/main.html"));
}

app.on("ready", () => {
    createWindow()
    ipcMain.handle('closeApp', ()=> { app.exit() })

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