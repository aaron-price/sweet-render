import blockFormat from "./blockFormat";

function sweet_render(input, custom_config = {}) {
    // Get a config object with default values unless overridden by custom values.
    const default_config = {
        element_tag: "@",
        attributes_tag: "!",
        attributes_separator: ", ",
        indent_str: "  ",
        container: ".container",
    };
    function buildContainer(value) {
        const str = typeof value === "string" ? value : value[0];
        const n = typeof value === "string" ? 0 : value[1];


        if(str.split("")[0] === "."){
            return document.getElementsByClassName(str.slice(1))[n];
        }
        if(str.split("")[0] === "#"){
            return document.getElementById(str.slice(1));
        }
    }

    // Declare some variables
    const config = Object.assign({}, default_config, custom_config);
    let unformattedInputArray = input.split(/\n/ig);

    let containerParent = buildContainer(config.container);
    let container = document.createElement("span");
    containerParent.appendChild(container);

    const elementsArray = [];

    // Individually format each line of the text block, and add to elementsArray.
    unformattedInputArray.forEach((line) => {
        elementsArray.push(blockFormat(line, config))
    });

    // Determine the parent of each line (necessary for nesting elements)
    for (let lineNum = 0; lineNum < elementsArray.length; lineNum += 1) {
        let currentLine = elementsArray[lineNum];

        // Determine the parent line of the current one.
        currentLine.indents > 0 ? findParentElement(lineNum, currentLine) : currentLine.parent = containerParent;

        function findParentElement(lineNum, currentLine) {
            for (let i = lineNum - 1; i > 0; i -= 1) {
                if (elementsArray[i].indents < currentLine.indents) {
                    currentLine.parent = elementsArray[i].element;
                    break;
                }
            }
        }

        currentLine.parent.insertBefore(currentLine.element, null);
    }

}

export default sweet_render;