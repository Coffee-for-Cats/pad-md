const blockElements = {
    // starts with | function that returns an HTML element.
    //               the function argument is the rest of the content.
    '#': (line) => {
        const heading = document.createElement('h1');
        h1.textContent = line.slice(1);
        return heading
    }
}