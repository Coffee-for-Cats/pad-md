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

function pinWindow() {
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