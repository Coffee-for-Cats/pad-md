const autosyncDelay = 1000;
let docModified = false;
window.setInterval(syncStep, autosyncDelay)

function syncStep() {
    if (docModified) {
        saveFile()
        console.log('changes saved!');
    }
}