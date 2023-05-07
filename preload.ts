import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    closeApp: () => {
        //alert("Chegou no preload")
        ipcRenderer.send('closeApp');
    }
})

window.onload = function dropHandler() {
    //Eu não sei por que, mas eu preciso usar isso para o de baixo funcionar.
    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
    })
    document.addEventListener('drop', (e) => {
        if (e.dataTransfer) {
            ipcRenderer.send('openFile', e.dataTransfer.files[0].path)
        }
    })
}