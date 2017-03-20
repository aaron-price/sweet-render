import blockFormat from "./blockFormat";
import handleConfig from "./handleConfig";
import { renderHtml, renderReact } from "./handleRendering";

function sweetRender(input, custom_config = {}) {
    // Take input
    const config = handleConfig(custom_config);
    let arrOfLines = Array.isArray(input) ? input : input.split(/\n/ig);

    // Format it
    const elementsArray = [];
    arrOfLines.forEach((line) => {
        elementsArray.push(blockFormat(line, config));
    });

    // Now that the elementsArray is full of DOM node objects, render them.
    config.output === "HTML" ?
        renderHtml(elementsArray, config.container) :
        renderReact(elementsArray, config.container, config.output);
}

module.exports = { sweetRender };