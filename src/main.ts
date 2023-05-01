window.addEventListener('DOMContentLoaded', () => {
    function replaceText(selector: string, text: string) {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    }

    replaceText("p", "Test worked");
})