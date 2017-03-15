import { expect} from "chai";
import handleConfig from "../../../dist/handleConfig";
const configDefault = {
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

let config1 = {
    tags: {
        element: {
            open: "@",
            closeWithAttr: "@",
            closeWithoutAttr: "@"
        },
        attribute: {
            open: "!",
            close: "!",
        },
    }
};

let config2 = {
    tags: {
        element: {
            open: "<",
            closeWithAttr: " ",
            closeWithoutAttr: ">"
        },
        attribute: {
            open: "",
            close: ">",
        },
    }
};

let config3 = {
    tags: {
        element: {
            open: "[[",
            closeWithAttr: "]]",
            closeWithoutAttr: "]]"
        },
        attribute: {
            open: "{",
            close: "}",
        },
    }
};

let config4 = {
    tags: {
        element: {
            open: "@@",
            closeWithAttr: "@@",
            closeWithoutAttr: "@@"
        },
        attribute: {
            open: "{",
            close: "}",
        },
    }
};

describe("handleConfig", () => {
    let result;

    it("Should return the correct configuration object when default", () => {
        result = handleConfig();
        expect(result).to.contain({
            attributes_separator: ", ",
            indent_str: "  ",
            container: ".container",
        });
        expect(result.tags.element).to.contain({
            open: "<",
            closeWithAttr: " ",
            closeWithoutAttr: ">",
        });
        expect(result.tags.attribute).to.contain({
            open: "",
            close: ">",
        });
    });

    it("Should return the correct configuration object when customized", () => {
        result = handleConfig(config1);
        expect(result).to.contain({
            attributes_separator: ", ",
            indent_str: "  ",
            container: ".container",
        });
        expect(result.tags.element).to.contain({
            open: "@",
            closeWithAttr: "@",
            closeWithoutAttr: "@"
        });
        expect(result.tags.attribute).to.contain({
            open: "!",
            close: "!",
        });
    });

});