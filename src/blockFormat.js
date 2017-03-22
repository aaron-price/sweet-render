import { getIndentation, getSpaceAtEnd } from "./spaceHandlers";
import separateLineElements from "./lineHandlers";

// Takes a line from the user's input,
// formats it,
// and returns a DOM node to render
function blockFormat(value, config) {
    const indents = getIndentation(value, config.indentString);
    const spaceAtEnd = getSpaceAtEnd(value);

    // Trim off the indents
    let str = value.slice(indents * (config.indentString.length));

    // Handle blank newlines
    if (!str || str.length === 0) {
        str = config.elementOpenTag + "br" + config.elementCloseTagWithoutAttr;
    }
    // Handle text without a tag
    if (str.indexOf(config.elementOpenTag) !== 0) {
        str = config.elementOpenTag + "span" + config.elementCloseTagWithoutAttr;
    }

    // Takes unformatted string, returns object with {elementType, attributes, content}
    const line = separateLineElements(str + spaceAtEnd, config);



    // Return the DOM node.
    return {
        // element: newElement,
        element: line,
        indents: indents,
    };
}














export default blockFormat;