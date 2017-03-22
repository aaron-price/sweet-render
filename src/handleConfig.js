export default function handleConfig(custom_config = {}) {
    // Get a config object with default values unless overridden by custom values.
    const default_config = {
        elementOpenTag: "<",
        elementCloseTagWithAttr: " ",
        elementCloseTagWithoutAttr: ">",

        attributeTagOpen: "",
        attributeTagClose: ">",
        attributesSeparator: ", ",

        indentString: "  ",

        outputContainer: ".container",
        outputFormat: "HTML",
        outputRender: "default",
    };

    // Create a new empty object,
    // assign the defaults to it,
    // and overide them with custom settings
    return Object.assign({}, default_config, custom_config);
}

/*
@TODO migrate to this
const default_config = {
    Syntax: {
        indent_str: "  ",
        element: {
             open: "<",
             closeWithAttr: " ",
             closeWithoutAttr: ">",
         },
         attribute: {
             open: "",
             close: ">",
             attributes_separator: ", ",
         },
         content: {
             open: previousClose(),
             close: "\n"
         }
     },
    output: {
        format: "HTML",
        render: "default",
        container: ".container",
    },
    preset: "default"
};

 Add a few default syntaxes. default (lazy html), minimalist, happyface, rocket ships. That sort of thing.
*/