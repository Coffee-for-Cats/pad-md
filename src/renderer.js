let contentPlacer = document.querySelector("#content-placer");

const pad = {
    //contentPlacer: document.querySelector("#content-placer"),
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

        document.getElementById('buttonEdit').className = "activeBoldButton";
        document.getElementById('buttonView').className = "deactiveBoldButton";

    } else if (pad.editMode == false) {
        //keep the rawText up to date!
        pad.rawText = contentPlacer.textContent;

        const lines =  pad.rawText.split('\n');
        lines.forEach(line => {
            //the type of the block is defined by the first char in the line.
            const blockType = line[0];

            if (Object.keys(blockElements).includes(blockType)) {
                //if the type exists, call the function from md-elements.
                displayContent.appendChild(blockElements[blockType](line))
            } else {
                const p = document.createElement('p');
                p.textContent = line;
                displayContent.appendChild(p);
            }
        })

        document.getElementById('buttonEdit').className = "deactiveBoldButton";
        document.getElementById('buttonView').className = "activeBoldButton";
    }

    contentPlacer.replaceWith(displayContent);
    contentPlacer = document.getElementById('content-placer');
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
    //pad.editMode = true;
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