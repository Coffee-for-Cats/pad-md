const btn = document.querySelector('#btn');
const filePathElement = document.querySelector('#filePath')

//Typescript is scrap, clearly
interface Window {
    electronAPI: any;
}

if (btn) {
    btn.addEventListener('click', async () => {
        const filePath = await window.electronAPI.openFile()
        if (filePathElement) {
            filePathElement.textContent = filePath
        }
    })
}