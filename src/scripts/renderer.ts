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
    menu.style.display = menu.style.display == 'none' || !menu.style.display ? 'flex' : 'none'

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