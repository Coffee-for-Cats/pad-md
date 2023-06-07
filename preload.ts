import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    saveFile: (filePath:string, fileContent: string) => {
        ipcRenderer.invoke('saveFile', filePath, fileContent)
    },
    openFile: (filePath: string) => { return ipcRenderer.invoke('openFile', filePath) },
    openFileDialog: () => { return ipcRenderer.invoke('openFileDialog') },
    newPage: () => ipcRenderer.invoke('newPage')
})