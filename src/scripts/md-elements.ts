const blockElements = {
    // starts with | function that returns an HTML element.
    //               the function argument is the parsed content.
    '#': (text: HTMLElement) => {
        return elemFromText('h1', text)
    },
    '##': (text: HTMLElement) => {
        return elemFromText('h2', text)
    },
    '###': (text: HTMLElement) => {
        return elemFromText('h3', text)
    },
    '-': (text: HTMLElement) => {
        return elemFromText('li', text)
    }
}

function formatLine(rawText: string) {
    const wordArray = rawText.split(' ');
    // the type of the element is always defined as the first letters of the paragraph, followed by a space.
    const possibleBlockType = wordArray[0]

    if (possibleBlockType in blockElements) {
        const typelessParagraph = wordArray.slice(1).join(' ').trim()
        const formattedText = formatInline(typelessParagraph)

        return blockElements[
            possibleBlockType as keyof typeof blockElements
        ](formattedText)
    } else {
        const p = document.createElement('p');
        p.append(formatInline(rawText));
        return p;
    }
}

function formatInline(rawText: string) {
    
    const formattedText = document.createElement('span');
    const splitParagraph = rawText.split('**')

    //saves the first "paragraph part" if it is not bold
    formattedText.append(splitParagraph[0])

    for (let i = 1; i < splitParagraph.length; i += 2) {
        const b = document.createElement('b')
        b.textContent = splitParagraph[i];
        formattedText.append(b)
        // end of bold element ('**bold text>>**<<')
        // save the next text fragment too
        if (splitParagraph[i + 1]) formattedText.append(splitParagraph[i + 1])
        // because we are doing 2 itens of the array at a time.
    }

    return formattedText
}

function elemFromText(type: string, text: HTMLElement) {
    const e = document.createElement(type);
    e.append(text)
    return e
}