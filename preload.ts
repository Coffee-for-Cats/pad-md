import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    closeApp: () => { ipcRenderer.send('closeApp')},
    saveFile: (filePath:string, fileContent: string) => {
        ipcRenderer.invoke('saveFile', filePath, fileContent)
    },
    openFile: (filePath: string) => { return ipcRenderer.invoke('openFile', filePath) },
    openFileDialog: () => { return ipcRenderer.invoke('openFileDialog') }
})