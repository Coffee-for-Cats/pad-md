var filePath;

//html button
function closeApp() {
    window.App.closeApp();
}

//html button
function saveFile() {
    const paragraphsArray = Array.from(document.querySelector("#content-placer").children);
    
    let fileContent = '';

    paragraphsArray.forEach((p) => {
        fileContent += p.textContent;
        //there will be a last char left in the string.
        fileContent += '\n'
    })
    //remove the last \n character.
    fileContent = fileContent.slice(0, -1)

    window.App.saveFile(filePath, fileContent);
}

//by some reason I need this to work with files
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

document.addEventListener('drop', async function openFile(e) {
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

    const contentPlacer = document.querySelector('#content-placer') || document.createElement('div');
    contentPlacer.replaceWith(newParagraphs);
})

document.addEventListener('paste', function (event) {
    event.preventDefault();
    document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});