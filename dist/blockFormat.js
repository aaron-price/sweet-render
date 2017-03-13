"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIndentation = require("./getIndentation");

var _separateLineElements = require("./separateLineElements");

var _separateLineElements2 = _interopRequireDefault(_separateLineElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blockFormat(value, config) {
    var element_tag = config.element_tag;
    var indents = (0, _getIndentation.getIndentation)(value, config.indent_str);

    var spaceAtEnd = (0, _getIndentation.getSpaceAtEnd)(value);
    var str = value.slice(indents * config.indent_str.length);

    // Handle blank newlines
    if (!str || str.length === 0) {
        str = element_tag + "br" + element_tag;
    }
    // Handle text without a tag
    if (str.indexOf(element_tag) !== 0) {
        str = element_tag + "span" + element_tag + str;
    }

    var line = (0, _separateLineElements2.default)(str + spaceAtEnd, config);

    var newElement = document.createElement(line.elementType);

    line.attributes.forEach(function (attr) {
        newElement.setAttribute(attr.property, attr.value);
    });

    var newContent = document.createTextNode(line.content);
    newElement.appendChild(newContent);

    return {
        element: newElement,
        indents: indents
    };
}

exports.default = blockFormat;