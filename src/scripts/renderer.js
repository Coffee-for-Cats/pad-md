function modeToEdit() {
    pad.editorMode = 'edit';
    render('edit');
    //the button will be changed to 'view', because you're already editing it.
    document.getElementById('button-editMode').hidden = true;
    document.getElementById('button-viewMode').hidden = false;
}

function modeToView() {
    pad.editorMode = 'view';
    render('view');
    //the button will be changed to 'edit', because you're already viewing it.
    document.getElementById('button-editMode').hidden = false;
    document.getElementById('button-viewMode').hidden = true;
}

function pinWindow() {
    //actually pins the window
    window.App.pinWindow()
    
    //inverts the tracking variable
    pad.pinned = !pad.pinned

    //do the appearance changes to the app.
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