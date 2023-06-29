//tracking state object
const pad = {
    filePath: "",
    _rawText: "",
    _contentPlacer: null,
    editorMode: "view",
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

function render(editMode = pad.editorMode) {
    // if the editMode is not default, than update the tracking variable.
    pad.editorMode = editMode;

    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (pad.editorMode == 'edit') {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = getRawText();

    } else if (pad.editorMode == 'view') {
        const lines = getRawText().split('\n');
        lines.forEach(line => {
            displayContent.appendChild(formatLine(line))
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

function modeToEdit() {
    pad.editorMode = 'edit';
    render('edit');
    //the button will be changed to 'view', because you're already editing it.
    switchObjVisibility('#switch-edit-view')
}

function modeToView() {
    pad.editorMode = 'view';
    render('view');
    //the button will be changed to 'edit', because you're already viewing it.
    switchObjVisibility('#switch-edit-view')
}