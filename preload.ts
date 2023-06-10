import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    saveFile: (filePath:string, fileContent: string) => {
        ipcRenderer.invoke('saveFile', filePath, fileContent)
    },
    openFile: (filePath: string) => { return ipcRenderer.invoke('openFile', filePath) },
    openFileDialog: () => { return ipcRenderer.invoke('openFileDialog') },
    //simpler messages that doesnt need to return nothing to the renderer process.
    newPage: () => ipcRenderer.send('newPage'),
    pinWindow: () => ipcRenderer.send('pinWindow'),
})