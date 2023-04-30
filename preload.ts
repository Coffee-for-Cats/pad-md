//Aqui eu consigo acessar a doom, e também a variável global "process", com todas as informações do lado do backend.

window.addEventListener('DOMContentLoaded', () => {
    function replaceText(selector, text) {
        const element = document.querySelector(selector);
        if (element) element.innerText = text;
    }

    replaceText("p", "Test working");
})