//Aqui eu consigo acessar a doom, e também a variável global "process", com todas as informações do lado do backend.

window.addEventListener('DOMContentLoaded', () => {
    function replaceText(selector: string, text: string) {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    }

    replaceText("p", "Test working");
})