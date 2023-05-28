let contentPlacer = document.querySelector("#content-placer");

const pad = {
    filePath: "",
    rawText: "",
    editMode: true,
}

function render() {
    
    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (pad.editMode) {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = pad.rawText;
    } else {
        //keep the rawText up to date!
        pad.rawText = contentPlacer.textContent;

        const lines =  pad.rawText.split('\n');
        lines.forEach(line => {
            if (line[0] == '#') {
                displayContent.innerHTML += `<h1>${line}</h1>`
            } else {
                displayContent.innerHTML += `<p>${line}</p>`;
            }
        })
    }

    contentPlacer.replaceWith(displayContent);

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

    window.App.saveFile(pad.filePath, fileContent);
}

//prevent default drag over effects
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

//open a file when drag to screen
document.addEventListener('drop', async function openFile(e) {
    pad.filePath = e.dataTransfer.files[0].path;
    const fileContent = await window.App.openFile(pad.filePath);
    
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