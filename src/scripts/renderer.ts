function pinWindow() {
    //actually pins the window
    window.App.pinWindow()
    
    //inverts the tracking variable
    pad.pinned = !pad.pinned

    //do the appearance changes to the app.
    const titleBar = document.querySelector('#title-bar')
    if (pad.pinned) {
        titleBar.classList.add('pinned') //the title bar gets white
        switchObjVisibility('#button-menu')
    } else {
        titleBar.classList.remove('pinned') //the title bar gets black
        switchObjVisibility('#button-menu')
    }

}

declare class marked {
    static parse(_: any): any;
    parse: any;
};

function render(editMode = pad.editorMode) {
    console.log(getRawText())
    // if the editMode is not default, update the tracking variable.
    pad.editorMode = editMode;

    let displayContent = document.createElement('div');
    displayContent.id = "content-placer";
    
    if (pad.editorMode == 'edit') {
        const textarea = document.createElement('textarea');
        textarea.contentEditable = "plaintext-only";
        
        textarea.value = getRawText();
        displayContent.appendChild(textarea)


    } else if (pad.editorMode == 'view') {
        const content = document.createElement('div');
        displayContent.appendChild(content);
        content.innerHTML = marked.parse(getRawText());
    }

    getContentPlacer().replaceWith(displayContent);
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

function openMenu() {
    const menu = document.getElementById('menu');
    menu.focus();
    //alert(document.activeElement.id); 
    //menu.style.display = menu.style.display == 'none' || !menu.style.display ? 'flex' : 'none'
}

async function openFileButton() {
    const newPath = await window.App.openFileDialog();
    openFile(newPath)
}

function newFileButton() {
    saveFile()

    pad.filePath = ""
    pad._rawText = ""
    pad._contentPlacer = null
    
    render();
}

//auto update rawText
document.addEventListener('input', (e: any) => {
    setRawText(getContentPlacer().textContent);
    //autosync
    docModified = true;
})

document.addEventListener('keydown', (e: any) => {
    // console.log(e.keyCode);
    if (e.keyCode == 9) {
        e.preventDefault();
        const start = getContentPlacer().selectionStart || 0;
        const text = getContentPlacer().value;
        getContentPlacer().value =
            text.slice(0, start) + '    ' + text.slice(start);
        getContentPlacer().setSelectionRange(start + 4, start + 4);
    }
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