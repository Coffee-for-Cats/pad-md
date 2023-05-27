let contentPlacer = document.querySelector("#content-placer");

const pad = {
    filePath: "",
    rawText: "",
    editMode: true,
}

function render() {
    
    let newParagraphs = document.createElement('pre');
    newParagraphs.id = "content-placer";

    if (pad.editMode) {
        console.log('editable');
        newParagraphs.contentEditable = "plaintext-only";
        newParagraphs.textContent = pad.rawText;
    } else {
        newParagraphs.textContent = pad.rawText;
    }

    contentPlacer.replaceWith(newParagraphs);

    //do this every time I replace the element to keep it synced!
    contentPlacer = document.querySelector("#content-placer");
}

//html button
function closeApp() {
    window.App.closeApp();
}

//html button
function saveFile() {
    let fileContent = contentPlacer.textContent;

    window.App.saveFile(filePath, fileContent);
}

//prevent default drag over effects
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

//open a file when drag to screen
document.addEventListener('drop', async function openFile(e) {
    filePath = e.dataTransfer.files[0].path;
    const fileContent = await window.App.openFile(filePath);
    
    pad.rawText = fileContent;
    pad.editMode = true;
    render();
})

//html buttons
//changes the editMode and render the text to screen
function editButton() {
    pad.editMode = true;
    render()
}
function viewButton() {
    pad.editMode = false;
    render()
}