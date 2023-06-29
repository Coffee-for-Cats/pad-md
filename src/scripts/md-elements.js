const blockElements = {
    // starts with | function that returns an HTML element.
    //               the function argument is the rest of the content.
    '#': (line) => {
        const heading = document.createElement('h1');
        heading.textContent = line
        return heading
    },
    '##': (line) => {
        const heading = document.createElement('h2');
        heading.textContent = line
        return heading
    },
    '###': (line) => {
        const heading = document.createElement('h3');
        heading.textContent = line
        return heading
    },
    '-': (line) => {
        const listItem = document.createElement('li');
        listItem.textContent = line
        return listItem;
    }
}

function formatLine(line) {
    const cuttedParagraphArray = line.split(' ');
    // the type of the element is allways defined as the first letters of the paragraph, followed by a space.
    const possibleBlockType = cuttedParagraphArray[0]

    if (Object.keys(blockElements).includes(possibleBlockType)) {
        const cuttedParagraph = cuttedParagraphArray.slice(1).join(' ').trim()
        const formattedElement = blockElements[possibleBlockType](cuttedParagraph)
        console.log(formattedElement)
        return formattedElement
    } else {
        const p = document.createElement('p');
        p.textContent = line;
        return p;
    }
}