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



    // Return the DOM node.
    return {
        // element: newElement,
        element: line,
        indents: indents,
    };
}














export default blockFormat;