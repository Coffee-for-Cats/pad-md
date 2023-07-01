const blockElements = {
    // starts with | function that returns an HTML element.
    //               the function argument is the rest of the content.
    '#': (line) => {
        const heading = document.createElement('h1');
        heading.append(line)
        return heading
    },
    '##': (line) => {
        const heading = document.createElement('h2');
        heading.append(line)
        return heading
    },
    '###': (line) => {
        const heading = document.createElement('h3');
        heading.append(line)
        return heading
    },
    '-': (line) => {
        const listItem = document.createElement('li');
        listItem.append(line)
        return listItem;
    }
}

function formatLine(line) {
    const cuttedParagraphArray = line.split(' ');
    // the type of the element is allways defined as the first letters of the paragraph, followed by a space.
    const possibleBlockType = cuttedParagraphArray[0]

    if (Object.keys(blockElements).includes(possibleBlockType)) {
        const cuttedParagraph = cuttedParagraphArray.slice(1).join(' ').trim()

        const formattedText = formatInline(cuttedParagraph)
        return blockElements[possibleBlockType](formattedText)
    } else {
        const p = document.createElement('p');
        p.append(formatInline(line));
        return p;
    }
}

function formatInline(cuttedParagraph) {
    
    const formattedText = document.createElement('span');

    const splitParagraph = cuttedParagraph.split('**')

    formattedText.append(splitParagraph[0])
    for (let i = 1; i < splitParagraph.length; i += 2) {
        const e = document.createElement('b')
        e.textContent = splitParagraph[i];
        formattedText.append(e)
        // end of bold element ('**bold text>>**<<')
        // save the next text fragment too
        formattedText.append(splitParagraph[i + 1])
        // because we are doing 2 itens of the array at a time.
    }

    return formattedText
}