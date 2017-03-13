import { getIndentation, getSpaceAtEnd } from "./getIndentation";
import separateLineElements from "./separateLineElements";

function blockFormat(value, config) {
    const element_tag = config.element_tag;
    const indents = getIndentation(value, config.indent_str);

    const spaceAtEnd = getSpaceAtEnd(value);
    let str = value.slice(indents * (config.indent_str.length));

    // Handle blank newlines
    if (!str || str.length === 0) {
        str = element_tag+"br"+element_tag;
    }
    // Handle text without a tag
    if (str.indexOf(element_tag) !== 0) {
        str = element_tag + "span" + element_tag + str;
    }

    const line = separateLineElements(str + spaceAtEnd, config);

    let newElement = document.createElement(line.elementType);

    line.attributes.forEach((attr) => {
        newElement.setAttribute(attr.property, attr.value);
    });

    let newContent = document.createTextNode(line.content);
    newElement.appendChild(newContent);

    return {
        element: newElement,
        indents: indents,
    };
}

export default blockFormat;