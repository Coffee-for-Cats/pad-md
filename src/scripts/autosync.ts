const autosyncDelay = 1000;

let docModified = false;

window.setInterval(function syncStep() {
    if (docModified) {
        saveFile()
        console.log('changes saved!');
    }
}, autosyncDelay)