import blockFormat from "./blockFormat";
import handleConfig from "./handleConfig";
import { buildContainer, renderAll } from "./handleRendering";

function sweet_render(input, custom_config = {}) {
    // Declare some variables
    const config = handleConfig(custom_config);
    let arrOfLines = input.split(/\n/ig);

    // Build a container DOM node
    let containerParent = buildContainer(config.container);
    let container = document.createElement("span");
    containerParent.appendChild(container);

    // This will hold all other DOM nodes once they're built.
    const elementsArray = [];

    // Individually format each line of the text block, and add to elementsArray.
    arrOfLines.forEach((line) => {
        elementsArray.push(blockFormat(line, config));
    });

    // Now that the elementsArray is full of DOM node objects, render them.
    renderAll(elementsArray, containerParent);
}

export default sweet_render;