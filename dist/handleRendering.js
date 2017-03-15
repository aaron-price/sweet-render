"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildContainer = buildContainer;
exports.findParentElement = findParentElement;
exports.renderAll = renderAll;
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

function findParentElement(lineNum, currentLine, elementsArray) {
    for (var i = lineNum - 1; i > 0; i -= 1) {
        if (elementsArray[i].indents < currentLine.indents) {
            currentLine.parent = elementsArray[i].element;
            break;
        }
    }
}

function renderAll(elementsArray, containerParent) {
    for (var lineNum = 0; lineNum < elementsArray.length; lineNum += 1) {
        var currentLine = elementsArray[lineNum];

        // Determine the parent line of the current one.
        currentLine.indents > 0 ? findParentElement(lineNum, currentLine, elementsArray) : currentLine.parent = containerParent;

        // Render current line inside it's parent
        currentLine.parent.insertBefore(currentLine.element, null);
    }
}