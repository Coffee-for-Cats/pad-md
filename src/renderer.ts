const contentPlacer = document.querySelector('#content-placer') || document.createElement('a');

var fileContent: string;

interface Window {
    App: any;
}

function closeApp() {
    //alert("Funcionou o Botão porra");
    window.App.closeApp();
}

window.addEventListener('input', () => {
    fileContent = contentPlacer.textContent || ''
})

function saveFile() {
    alert("file saved!")
    window.App.saveFile(fileContent);
}