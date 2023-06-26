import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    openFile: (filePath: string) => { return ipcRenderer.invoke('openFile', filePath) },
    openFileDialog: () => { return ipcRenderer.invoke('openFileDialog') },
    saveFile: (filePath:string, fileContent: string) => {
        ipcRenderer.invoke('saveFile', filePath, fileContent)
    },
    saveFileDialog: () => {return ipcRenderer.invoke('saveFileDialog')},
    //simpler messages that doesn't need to return nothing to the renderer process.
    newPage: () => ipcRenderer.send('newPage'),
    pinWindow: () => ipcRenderer.send('pinWindow'),
})