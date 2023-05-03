import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld('apiTest', {
//     returnHello: (name: string) => { return ipcRenderer.invoke('returnHello2', name) }
// })

window.onload = () => {
    const exampleButton = document.querySelector('#example')
    if (exampleButton) {
        exampleButton.addEventListener('click', async () => {
            const hello = await ipcRenderer.invoke('returnHello2', 'Lucas');
            alert(hello);
        })
    } else alert("Erro, botão não encontrado")
}