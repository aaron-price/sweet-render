"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockFormat = require("./blockFormat");

var _blockFormat2 = _interopRequireDefault(_blockFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sweet_render(input) {
    var custom_config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Get a config object with default values unless overridden by custom values.
    var default_config = {
        element_tag: "@",
        attributes_tag: "!",
        attributes_separator: ", ",
        indent_str: "  ",
        container: ".container"
    };
    function buildContainer(value) {
        var str = typeof value === "string" ? value : value[0];
        var n = typeof value === "string" ? 0 : value[1];

        if (str.split("")[0] === ".") {
            return document.getElementsByClassName(str.slice(1))[n];
        }
        if (str.split("")[0] === "#") {
            return document.getElementById(str.slice(1));
        }
    }

    /*
    buildContainer(".container");
    buildContainer(".container", 3);
    buildContainer("#container");
    */

    // Declare some variables
    var config = Object.assign({}, default_config, custom_config);
    var unformattedInputArray = input.split(/\n/ig);

    var containerParent = buildContainer(config.container);
    var container = document.createElement("span");
    containerParent.appendChild(container);

    var elementsArray = [];

    // Individually format each line of the text block, and add to elementsArray.
    unformattedInputArray.forEach(function (line) {
        elementsArray.push((0, _blockFormat2.default)(line, config));
    });

    // Determine the parent of each line (necessary for nesting elements)
    for (var lineNum = 0; lineNum < elementsArray.length; lineNum += 1) {
        var findParentElement = function findParentElement(lineNum, currentLine) {
            for (var i = lineNum - 1; i > 0; i -= 1) {
                if (elementsArray[i].indents < currentLine.indents) {
                    currentLine.parent = elementsArray[i].element;
                    break;
                }
            }
        };

        var currentLine = elementsArray[lineNum];

        // Determine the parent line of the current one.
        currentLine.indents > 0 ? findParentElement(lineNum, currentLine) : currentLine.parent = containerParent;

        currentLine.parent.insertBefore(currentLine.element, null);
    }
}

exports.default = sweet_render;