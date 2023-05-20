var filePath;

function closeApp() {
    window.App.closeApp();
}

//html button
function saveFile() {
    //Na teoria são textos
    const contentPlacer = document.querySelector("#content-placer")
    let fileContent = contentPlacer.textContent;

    alert(fileContent);

    window.App.saveFile(filePath, fileContent);
}

document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
})

document.addEventListener('drop', async function openFile(e) {
    filePath = e.dataTransfer.files[0].path;
    const fileContent = await window.App.openFile(filePath);

    let newParagraphs = document.createElement('pre');
    newParagraphs.id = "content-placer";
    newParagraphs.contentEditable = "plaintext-only";

    newParagraphs.textContent = fileContent;

    const contentPlacer = document.querySelector('#content-placer');
    contentPlacer.replaceWith(newParagraphs);
})