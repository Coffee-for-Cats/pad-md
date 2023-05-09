import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
    closeApp: () => {
        //alert("Chegou no preload")
        ipcRenderer.send('closeApp');
    }
})

window.onload = function loaded() {
    dropHandler();
}
    
function dropHandler() {
    //Eu não sei por que, mas eu preciso usar isso para o de baixo funcionar.
    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation();
    })

    //quando alguém "dropa" um arquivo na tela...
    document.addEventListener('drop', (e) => {
        if (e.dataTransfer) {
            //eu envio para o Main arbir ele.
            ipcRenderer.send('openFile', e.dataTransfer.files[0].path)
        }
    })
}

//quando o arquivo já foi lido, o index me retorna data.
ipcRenderer.on('fileContent', async function renderMD (_e: any, data) {
    const contentPlacer = document.querySelector('#content-placer')
    if (contentPlacer) {
        contentPlacer.textContent = data;
    }
})