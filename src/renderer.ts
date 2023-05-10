const contentPlacer = document.querySelector('#content-placer') || document.createElement('a');

var fileContent: string;
var filePath: string;

interface Window {
    App: any;
}

//html button
function closeApp() {
    window.App.closeApp();
}
//html button
function saveFile() {
    window.App.saveFile(filePath, fileContent);
}

window.addEventListener('input', () => {
    fileContent = contentPlacer.textContent || ''
})

document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})
document.addEventListener('drop', (e) => openFile(e))

async function openFile(e: any) {
    if (e.dataTransfer) {
        filePath = e.dataTransfer.files[0].path;
        const fileContent = await window.App.openFile(filePath);
        contentPlacer.textContent = fileContent;
    }
}