"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockFormat = require("./blockFormat");

var _blockFormat2 = _interopRequireDefault(_blockFormat);

var _handleConfig = require("./handleConfig");

var _handleConfig2 = _interopRequireDefault(_handleConfig);

var _handleRendering = require("./handleRendering");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sweet_render(input) {
    var custom_config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // Declare some variables
    var config = (0, _handleConfig2.default)(custom_config);
    var arrOfLines = input.split(/\n/ig);

    // Build a container DOM node
    var containerParent = (0, _handleRendering.buildContainer)(config.container);
    var container = document.createElement("span");
    containerParent.appendChild(container);

    // This will hold all other DOM nodes once they're built.
    var elementsArray = [];

    // Individually format each line of the text block, and add to elementsArray.
    arrOfLines.forEach(function (line) {
        elementsArray.push((0, _blockFormat2.default)(line, config));
    });

    // Now that the elementsArray is full of DOM node objects, render them.
    (0, _handleRendering.renderAll)(elementsArray, containerParent);
}

exports.default = sweet_render;