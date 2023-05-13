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
    const documentParagraphs = document.querySelector("#content-placer") || document.createElement('div');
    const paragraphsArray = Array.from(documentParagraphs.children);
    
    let fileContent = '';

    paragraphsArray.forEach((p: any) => {
        fileContent += p.textContent;
        //there will be a last char left in the string.
        fileContent += '\n'
    })
    //remove the last \n character.
    fileContent = fileContent.slice(0, -1)

    window.App.saveFile(filePath, fileContent);
}

//drop file
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

document.addEventListener('drop', (e) => openFile(e))

async function openFile(e: any) {
    if (e.dataTransfer) {
        filePath = e.dataTransfer.files[0].path;
        const fileContent = await window.App.openFile(filePath);
        const textContents = fileContent.split('\n');

        let newParagraphs = document.createElement('pre');
        newParagraphs.id = "content-placer";
        newParagraphs.contentEditable = "true";
        
        for (const line of textContents) {
            const p = document.createElement('p');
            p.textContent = line;
            newParagraphs.appendChild(p);
        }

        console.log(newParagraphs);
        const contentPlacer = document.querySelector('#content-placer') || document.createElement('div');
        contentPlacer.replaceWith(newParagraphs);
    }
}