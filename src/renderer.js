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
    // if I am entering the view mode
    } else if (editMode == 'view') {
        
        const lines = pad.getRawText().split('\n');
        lines.forEach(line => {
            //the type of the block is defined by the first "word" in the line.
            const blockType = line.split(' ')[0];

            if (Object.keys(blockElements).includes(blockType)) {
                //from md-elements.js
                let formater = blockElements[blockType];
                let formated = formater(line);
                displayContent.appendChild(formated);
            } else {
                const p = document.createElement('p');
                p.textContent = line;
                displayContent.appendChild(p);
            }
        })
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

document.addEventListener('input', (_e) => {
    pad.setRawText(pad.getContentPlacer().textContent);
})

let editorMode = 'view'
function switchMode() {
    if (editorMode == 'view') {
        render('view')
        editorMode = 'edit'
        document.getElementById('buttonSwitchMode').textContent = '✏️ edit'
    } else {
        render('edit')
        editorMode = 'view'
        document.getElementById('buttonSwitchMode').textContent = '📄 view'
    }
}