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

function openMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display == 'none' ? 'flex' : 'none'
}

async function openFileButton() {
    const newPath = await window.App.openFileDialog();
    openFile(newPath)
}

//auto update rawText
document.addEventListener('input', (_e) => {
    setRawText(getContentPlacer().textContent);
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