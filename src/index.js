import blockFormat from "./blockFormat";
import handleConfig from "./handleConfig";
import { renderHtml, renderReact } from "./handleRendering";

function sweetRender(input, custom_config = {}) {
    // Take input.
    const config = handleConfig(custom_config);
    let arrOfLines = Array.isArray(input) ? input : input.split(/\n/ig);

    // Format input as array of data objects
    const elementsArray = [];
    arrOfLines.forEach((line) => {
        elementsArray.push(blockFormat(line, config));
    });

    // Now that the elementsArray is full of well-organized data objects, render them.
    // As plain HTML.
    if (config.outputFormat === "HTML") { renderHtml(elementsArray, config.outputContainer); }

    // As React
    if (config.outputFormat !== "HTML") {
        if (config.outputRender === "default") {
            // return the function, this package is probably being called inside a component.
            return renderReact(elementsArray, config);
        } else {
            // execute, but don't return because ReactDOM will be rendering it somewhere specified
            renderReact(elementsArray, config);
        }
    }

}

module.exports = { sweetRender };