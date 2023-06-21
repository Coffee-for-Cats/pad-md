const pad = {
    filePath: "",
    _rawText: "",
    _contentPlacer: null,
    editorMode: "edit",
    pinned: false,

    getContentPlacer: () => {
        return this._contentPlacer || document.querySelector("#content-placer");
    },
    getRawText: () => pad._rawText,
    setRawText: (rawText) => pad._rawText = rawText,

    switchAlwaysOnTop: () => {
        if (pad.pinned) pad.pinned = false; else pad.pinned = true;
    }
}

function switchMode() {
    if (pad.editorMode == 'view') {
        //the text says "edit" and you will want to edit the file
        render('edit')
        document.getElementById('button-switchMode').textContent = '📄 view'
    } else if (pad.editorMode == "edit") {
        //the text says "view" and you will want to view the md.
        render('view')
        document.getElementById('button-switchMode').textContent = '✏️ edit'
    }
}

function render(editMode) {
    if (editMode) { pad.editorMode = editMode }
    
    let displayContent = document.createElement('pre');
    displayContent.id = "content-placer";

    if (pad.editorMode == 'edit') {
        displayContent.contentEditable = "plaintext-only";
        displayContent.textContent = pad.getRawText();
    // if I am entering the view mode
    } else if (pad.editorMode == 'view') {
        
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

async function openFileDialog() {
    const newPath = await window.App.openFileDialog();
    openFile(newPath)
}

async function openFile(filePath) {
    if (filePath) pad.filePath = filePath;
    const fileContent = await window.App.openFile(pad.filePath);

    pad.setRawText(fileContent);
    render();

    //remove open-file button
    document.getElementById('button-open').hidden = true;
    document.getElementById('button-save').hidden = false;
}

//html button
function closeApp() {
    window.close();
}

//html button
function saveFile() {
    window.App.saveFile(pad.filePath, pad.getRawText());
}

//TOOLBAR
function newPage() {
    window.App.newPage();
}

function pinWindow() {
    window.App.pinWindow();
    pad.switchAlwaysOnTop();

    const titleBar = document.querySelector('.title-bar')
    if (pad.pinned) {
        titleBar.classList.add('pinned') //the title bar gets white
        document.getElementById("menu-buttom-white").hidden = true;
        document.getElementById("menu-buttom-black").hidden = false; //the buttom gets black
    } else {
        titleBar.classList.remove('pinned') //the title bar gets black
        document.getElementById("menu-buttom-white").hidden = false; //the buttons gets white
        document.getElementById("menu-buttom-black").hidden = true;
    }

}

//auto update rawText
document.addEventListener('input', (_e) => {
    pad.setRawText(pad.getContentPlacer().textContent);
})

//prevent default drag over effects
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

//open a file when drag to screen
document.addEventListener('drop', (e) => {
    const filePath = e.dataTransfer.files[0].path;
    openFile(filePath);
})