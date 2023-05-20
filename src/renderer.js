let contentPlacer = document.querySelector("#content-placer")
var filePath;

function closeApp() {
    window.App.closeApp();
}

//html button
function saveFile() {
    let fileContent = contentPlacer.textContent;

    window.App.saveFile(filePath, fileContent);
}

document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

document.addEventListener('drop', async function openFile(e) {
    //gets the filepath from the event (this event is mod by electron)
    filePath = e.dataTransfer.files[0].path;

    //updates the content placer variable.
    contentPlacer = document.querySelector("#content-placer");
    const fileContent = await window.App.openFile(filePath);

    //Creates and appends to a new element
    let newParagraphs = document.createElement('pre');
    newParagraphs.id = "content-placer";
    newParagraphs.contentEditable = "plaintext-only";

    newParagraphs.textContent = fileContent;

    //uses replaceWith to make the transition smoother
    contentPlacer.replaceWith(newParagraphs);
})