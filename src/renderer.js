const pad = {
    filePath: "",
    _rawText: "",
    _contentPlacer: null,

    getContentPlacer: () => {
        return this._contentPlacer || document.querySelector("#content-placer");
    },

    getRawText: () => {
        return pad._rawText
    },

    setRawText: (rawText) => {
        pad._rawText = rawText;
    }
}

function render(editMode = 'view') {
    
    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (editMode == 'edit') {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = pad.getRawText();

        document.getElementById('buttonEdit').className = "boldButton";
        document.getElementById('buttonView').className = "nonBoldButton";

    // if I am entering the view mode
    } else if (editMode == 'view') {
        
        const lines = pad.getRawText().split('\n');
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

    pad.getContentPlacer().replaceWith(displayContent);
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
    render();
})

document.addEventListener('input', function update(e) {
    pad.setRawText(pad.getContentPlacer().textContent);
})