const blockElements = {
    // starts with | function that returns an HTML element.
    //               the function argument is the rest of the content.
    '#': (line) => {
        const heading = document.createElement('h1');
        heading.textContent = line.slice(1).trim();
        return heading
    },
    '##': (line) => {
        const heading = document.createElement('h2');
        heading.textContent = line.slice(2).trim();
        return heading
    },
    '###': (line) => {
        const heading = document.createElement('h3');
        heading.textContent = line.slice(3).trim();
        return heading
    }
}