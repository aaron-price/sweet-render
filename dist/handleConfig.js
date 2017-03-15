"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleConfig;
function handleConfig() {
    var custom_config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // Get a config object with default values unless overridden by custom values.
    var default_config = {
        tags: {
            element: {
                open: "<",
                closeWithAttr: " ",
                closeWithoutAttr: ">"
            },
            attribute: {
                open: "",
                close: ">"
            }
        },
        attributes_separator: ", ",
        indent_str: "  ",
        container: ".container"
    };

    // Create a new empty object,
    // assign the defaults to it,
    // and overide them with custom settings
    return Object.assign({}, default_config, custom_config);
}