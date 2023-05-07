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
        alert("File Dropped!");
        if (e.dataTransfer) {
            console.log(e.dataTransfer.files[0].path)
            ipcRenderer.send('openFile', e.dataTransfer.files[0].path)
        } else {
            alert("You dropped nothing???");
        }
    })
}