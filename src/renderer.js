let contentPlacer = document.querySelector("#content-placer");

const pad = {
    filePath: "",
    _rawText: "",
    editMode: true,

    getRawText: () => {
        return pad._rawText
    },

    setRawText: (rawText) => {
        pad._rawText = rawText;
        render();
    }
}

function render() {
    
    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (pad.editMode) {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = pad.getRawText();
        displayContent.className += 'editing';

        document.getElementById('buttonEdit').className = "boldButton";
        document.getElementById('buttonView').className = "nonBoldButton";

    // if I am entering the view mode
    } else if (pad.editMode == false) {
        
        //keep the rawText up to date!
        let editing = document.querySelector('.editing');
        if (editing) pad._rawText = editing.textContent;
        //else: text was already in view mode!
        //so no needs to sync

        const lines =  pad.getRawText().split('\n');
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

        document.getElementById('buttonEdit').className = "nonBoldButton";
        document.getElementById('buttonView').className = "boldButton";
    }

    contentPlacer.replaceWith(displayContent);
    //I need to sync again beucause the object has changed!
    //If I used a getter to store the content-placer I wouldn't need this
    contentPlacer = document.getElementById('content-placer');
}

//html button
function closeApp() {
    window.App.closeApp();
}

//html button
function saveFile() {
    window.App.saveFile(pad.filePath, pad.getRawText());
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
    
    pad.setRawText(fileContent);
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