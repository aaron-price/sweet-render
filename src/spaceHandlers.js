function getIndentation(str, indentString) {
    // Split string by the number of characters in the indentString.
    const splitStr = str.match(new RegExp(`.{1,${indentString.length}}`, "g"));
    let indents = 0;

    // Don't worry about blank newlines
    if (!splitStr) { return indents; }

    for (let s = 0; s < splitStr.length; s += 1) {
        if (splitStr[s] === indentString) {
            indents += 1;
        } else {
            break;
        }
    }
    return indents;
}

function getSpaceAtEnd(str) {
    const splitStr = str.split("");
    let spaces = "";
    for (let s = splitStr.length - 1; s > 0; s -= 1) {
        if (splitStr[s] === " ") {
            spaces = spaces + " ";
        } else {
            break;
        }
    }
    return spaces;
}

module.exports = {
    getIndentation,
    getSpaceAtEnd,
};