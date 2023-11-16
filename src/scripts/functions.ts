interface Window {
    App: any
}
//tracking state object
const pad: {
    filePath: string,
    _contentPlacer: HTMLTextAreaElement,
    _rawText: string,
    editorMode: "view" | "edit",
    pinned: boolean
} = {
    filePath: "",
    _rawText: "",
    _contentPlacer: null,
    editorMode: "view",
    pinned: false,
}

function getContentPlacer(): HTMLTextAreaElement {
    return pad._contentPlacer || <HTMLTextAreaElement>document.getElementById("content-placer");
}

function getRawText() {
    return pad._rawText
}

function setRawText(rawText: string) {
    pad._rawText = rawText
}

async function openFile(filePath: string) {
    if (filePath) pad.filePath = filePath;
    const fileContent = await window.App.openFile(pad.filePath);

    setRawText(fileContent);
    render();
}

async function saveFile() {
    docModified = false;
    if (pad.filePath) {
        window.App.saveFile(pad.filePath, getRawText());
    } else {
        const newPath = await window.App.saveFileDialog();
        if (newPath) {
            pad.filePath = newPath;
            window.App.saveFile(pad.filePath, getRawText());
        }
    }
}