export default function handleConfig(custom_config = {}) {
    // Get a config object with default values unless overridden by custom values.
    const default_config = {
        tags: {
            element: {
                open: "<",
                closeWithAttr: " ",
                closeWithoutAttr: ">",
            },
            attribute: {
                open: "",
                close: ">",
            },
        },
        attributes_separator: ", ",
        indent_str: "  ",
        container: ".container",
    };

    // Create a new empty object,
    // assign the defaults to it,
    // and overide them with custom settings
    return Object.assign({}, default_config, custom_config);
}