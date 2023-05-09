import { contextBridge, ipcRenderer } from 'electron';

var filePath: string;

contextBridge.exposeInMainWorld('App', {
    closeApp: () => { ipcRenderer.send('closeApp'); },
    saveFile: (fileContent: string) => {
        alert(fileContent);
        ipcRenderer.invoke('saveFile', filePath, fileContent);
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
            filePath = e.dataTransfer.files[0].path;
            //eu envio para o Main arbir ele.
            ipcRenderer.send('openFile', filePath)
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