import blockFormat from "./blockFormat";
import handleConfig from "./handleConfig";
import { renderHtml, renderReact } from "./handleRendering";

function sweetRender(input, custom_config = {}) {
    // Take input.
    const config = handleConfig(custom_config);
    let arrOfLines = Array.isArray(input) ? input : input.split(/\n/ig);

    // Format it.
    const elementsArray = [];
    arrOfLines.forEach((line) => {
        elementsArray.push(blockFormat(line, config));
    });

    // Now that the elementsArray is full of DOM node objects, render them.
    // As plain HTML.
    if (config.output.format === "HTML") { renderHtml(elementsArray, config.container); }

    // As React
    if (config.output.format !== "HTML") {
        if (config.output.render === "default") {
            // return the function, this package is probably being called inside a component.
            return renderReact(elementsArray, config.container, config.output);
        } else {
            // execute, but don't return because ReactDOM will be rendering it somewhere specified
            renderReact(elementsArray, config.container, config.output);
        }
    }

}

module.exports = { sweetRender };