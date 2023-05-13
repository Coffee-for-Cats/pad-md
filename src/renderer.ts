const contentPlacer = document.querySelector('#content-placer') || document.createElement('a');

var documentParagraphs: HTMLCollection;
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

    const paragraphsArray = Array.from(documentParagraphs);
    
    let fileContent = '';
    for (const p of paragraphsArray) {
        fileContent += p.textContent;
    }

    window.App.saveFile(filePath, fileContent);
}

window.addEventListener('input', () => {
    documentParagraphs = contentPlacer.children
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

        
        let newParagraphs: Array<HTMLElement> = [];
        for (const line of fileContent.split('\n')) {
            const p = document.createElement('p');
            p.innerHTML = line;
            newParagraphs.push(p);
        }

        contentPlacer.replaceChildren(...newParagraphs);
    }
}