var documentParagraphs: any;
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
    alert(paragraphsArray)
    
    let fileContent = '';

    paragraphsArray.forEach((p:any) => {
        fileContent += p.textContent;
    })

    window.App.saveFile(filePath, fileContent);
}

window.addEventListener('input', () => {
    const contentPlacer = document.querySelector('#content-placer') || document.createElement('a');

    console.log(contentPlacer)
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

        let newParagraphs: HTMLElement = document.createElement('span');
        newParagraphs.id = "content-placer"
        for (const line of fileContent.split('\n')) {
            //alert(line);
            const p = document.createElement('p');
            p.contentEditable = "true"
            p.textContent = line;
            newParagraphs.appendChild(p);
        }

        const contentPlacer = document.querySelector('#content-placer') || document.createElement('a');
        contentPlacer.replaceWith(newParagraphs);
    }
}