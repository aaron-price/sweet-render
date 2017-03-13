'use strict';

function getIndentation(str, indent_str) {
    // Split string by the number of characters in the indent_str.
    var splitStr = str.match(new RegExp('.{1,' + indent_str.length + '}', 'g'));
    var indents = 0;

    // Don't worry about blank newlines
    if (!splitStr) {
        return indents;
    }

    for (var s = 0; s < splitStr.length; s += 1) {
        if (splitStr[s] === indent_str) {
            indents += 1;
        } else {
            break;
        }
    }
    return indents;
}

function getSpaceAtEnd(str) {
    var splitStr = str.split("");
    var spaces = "";
    for (var s = splitStr.length - 1; s > 0; s -= 1) {
        if (splitStr[s] === " ") {
            spaces = spaces + " ";
        } else {
            break;
        }
    }
    return spaces;
}

function getSpaceAtBeginning(str) {
    var splitStr = str.match(new RegExp('.{1,' + indent_str.length + '}', 'g'));
    var spaceAtBeginning = 0;

    // Don't worry about blank newlines
    if (!splitStr) {
        return indents;
    }

    for (var s = 0; s < splitStr.length; s += 1) {
        if (splitStr[s] === indent_str) {
            indents += 1;
        } else {
            break;
        }
    }
    return spaceAtBeginning;
}

module.exports = {
    getIndentation: getIndentation,
    getSpaceAtEnd: getSpaceAtEnd
};