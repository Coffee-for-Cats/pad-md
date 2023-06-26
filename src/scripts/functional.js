//tracking state object
const pad = {
    filePath: "",
    _rawText: "",
    _contentPlacer: null,
    editorMode: "edit",
    pinned: false,
}

function getContentPlacer() {
    return pad._contentPlacer || document.getElementById("content-placer");
}

function getRawText() {
    return pad._rawText
}

function setRawText(rawText) {
    pad._rawText = rawText
}

function render(editMode) {
    if (editMode) { pad.editorMode = editMode }

    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (pad.editorMode == 'edit') {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = getRawText();

    } else if (pad.editorMode == 'view') {
        const lines = getRawText().split('\n');
        lines.forEach(line => {
            //the type of the block is defined by the first "word" in the line.
            const blockType = line.split(' ')[0];
            //blockElements is from md-elements.js
            if (Object.keys(blockElements).includes(blockType)) {
                let formated = blockElements[blockType](line);
                displayContent.appendChild(formated);
            } else {
                const p = document.createElement('p');
                p.textContent = line;
                displayContent.appendChild(p);
            }
        })
    }

    getContentPlacer().replaceWith(displayContent);
}

async function openFile(filePath) {
    if (filePath) pad.filePath = filePath;
    const fileContent = await window.App.openFile(pad.filePath);

    setRawText(fileContent);
    render();
}

async function saveFile() {
    if (pad.filePath) {
        window.App.saveFile(pad.filePath, getRawText());
    } else {
        const newPath = await window.App.saveFileDialog();
        console.log(newPath);
        if (newPath) {
            pad.filePath = newPath;
            window.App.saveFile(pad.filePath, getRawText());
        }
    }
}