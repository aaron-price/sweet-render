import { getIndentation, getSpaceAtEnd } from "./spaceHandlers";
import separateLineElements from "./lineHandlers";

// Takes a line from the user's input,
// formats it,
// and returns a DOM node to render
function blockFormat(value, config) {
    const elTags = config.tags.element;
    const indents = getIndentation(value, config.indent_str);
    const spaceAtEnd = getSpaceAtEnd(value);

    // Trim off the indents
    let str = value.slice(indents * (config.indent_str.length));

    // Handle blank newlines
    if (!str || str.length === 0) {
        str = elTags.open + "br" + elTags.closeWithoutAttr;
    }
    // Handle text without a tag
    if (str.indexOf(elTags.open) !== 0) {
        str = elTags.open + "span" + elTags.closeWithoutAttr;
    }

    // Takes unformatted string, returns object with {elementType, attributes, content}
    const line = separateLineElements(str + spaceAtEnd, config);

    // Create the DOM node
    let newElement = document.createElement(line.elementType);

    // Add any attributes as necessary
    line.attributes.forEach((attr) => {
        newElement.setAttribute(attr.property, attr.value);
    });

    // Add content as necessary
    let newContent = document.createTextNode(line.content);
    newElement.appendChild(newContent);

    // Return the DOM node.
    return {
        element: newElement,
        indents: indents,
    };
}




export default blockFormat;