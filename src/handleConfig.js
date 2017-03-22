export default function handleConfig(custom_config = {}) {
    // Get a config object with default values unless overridden by custom values.
    const default_config = {
        elementOpenTag: "",
        elementCloseTagWithAttr: " ",
        elementCloseTagWithoutAttr: "|",

        attributeTagOpen: "",
        attributeTagClose: "|",
        attributesSeparator: ", ",

        indentString: "  ",

        outputContainer: ".container",
        outputFormat: "HTML",
        outputRender: "default",

        preset: "default",
    };

    let preset = {};

    if (custom_config.preset === "smiley") { preset = preset_smiley; }
    if (custom_config.preset === "surprised") { preset = preset_surprised; }
    if (custom_config.preset === "verbose") { preset = preset_verbose; }



    // Create a new empty object,
    // assign the defaults to it,
    // and overide them with custom settings
    return Object.assign({}, default_config, preset, custom_config);
}

const preset_smiley = {
    elementOpenTag: ":-)",
    elementCloseTagWithAttr: " ",
    elementCloseTagWithoutAttr: "(-:",

    attributeTagOpen: "X-D",
    attributeTagClose: "8-P",
};

const preset_surprised = {
    elementOpenTag: "!",
    elementCloseTagWithAttr: "!",
    elementCloseTagWithoutAttr: "!",

    attributeTagOpen: "!",
    attributeTagClose: "!",
};

const preset_verbose = {
    elementOpenTag: "el",
    elementCloseTagWithAttr: "el",
    elementCloseTagWithoutAttr: "el",

    attributeTagOpen: "attr",
    attributeTagClose: "attr",
};