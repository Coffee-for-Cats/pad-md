import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    closeApp: () => {
        //alert("Chegou no preload")
        ipcRenderer.invoke('closeApp');
    }
})

window.onload = function dropHandler() {
    //Eu não sei por que, mas eu preciso usar isso para o de baixo funcionar.
    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
    })
    document.addEventListener('drop', (_e) => {
        alert("File Dropped!")
    })
}