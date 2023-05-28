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

    console.log(pad.editMode)

    if (pad.editMode) {
        //console.log("editing!")
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = pad.rawText;
    } else if (pad.editMode == false) {
        //console.log("viewing!");
        //keep the rawText up to date!
        pad.rawText = contentPlacer.textContent;

        const lines =  pad.rawText.split('\n');
        lines.forEach(line => {
            console.log(line);
            //the type of the block is defined by the first char in the line.
            const blockType = line[0];

            if (blockType in Object.keys(blockElements)) {
                //if the type exists, call the function from md-elements.
                displayContent.appendChild(blockElements[blockType](line))
                //console.log(blockElements[blockType](lines))
            } else {
                //default paragraph formating
                displayContent.textContent += line;
            }
            //add a linebreak to the end
            displayContent.textContent += '\n';
        })
    }

    
    contentPlacer.replaceWith(displayContent);
    contentPlacer = document.getElementById('content-placer');
    //console.log(contentPlacer);
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