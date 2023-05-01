const btn = document.querySelector('#btn') || document.createElement('button');
const filePathElement = document.querySelector('#filePath')

//Typescript is scrap, clearly
interface Window {
    electronAPI: any;
}

btn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    if (filePathElement) {
        filePathElement.textContent = filePath
    }
})