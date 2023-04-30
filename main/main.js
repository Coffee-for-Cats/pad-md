window.addEventListener('DOMContentLoaded', () => {
    function replaceText(selector, text) {
        const element = document.querySelector(selector);
        if (element) element.innerText = text;
    }

    replaceText("p", "Test working");
})