"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _spaceHandlers = require("./spaceHandlers");

var _lineHandlers = require("./lineHandlers");

var _lineHandlers2 = _interopRequireDefault(_lineHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes a line from the user's input,
// formats it,
// and returns a DOM node to render
function blockFormat(value, config) {
    var elTags = config.tags.element;
    var indents = (0, _spaceHandlers.getIndentation)(value, config.indent_str);
    var spaceAtEnd = (0, _spaceHandlers.getSpaceAtEnd)(value);

    // Trim off the indents
    var str = value.slice(indents * config.indent_str.length);

    // Handle blank newlines
    if (!str || str.length === 0) {
        str = elTags.open + "br" + elTags.closeWithoutAttr;
    }
    // Handle text without a tag
    if (str.indexOf(elTags.open) !== 0) {
        str = elTags.open + "span" + elTags.closeWithoutAttr;
    }

    // Takes unformatted string, returns object with {elementType, attributes, content}
    var line = (0, _lineHandlers2.default)(str + spaceAtEnd, config);

    // Create the DOM node
    var newElement = document.createElement(line.elementType);

    // Add any attributes as necessary
    line.attributes.forEach(function (attr) {
        newElement.setAttribute(attr.property, attr.value);
    });

    // Add content as necessary
    var newContent = document.createTextNode(line.content);
    newElement.appendChild(newContent);

    // Return the DOM node.
    return {
        element: newElement,
        indents: indents
    };
}

exports.default = blockFormat;