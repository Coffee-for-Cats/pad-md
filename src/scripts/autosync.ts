let docModified = false;

const autosyncDelay = 1000;
window.setInterval(syncStep, autosyncDelay)

function syncStep() {
    if (switchCheckbox.checked && docModified && pad.filePath) {
        saveFile()
    }
}
const switchCheckbox = <HTMLInputElement>document.getElementById('autosync-switch')