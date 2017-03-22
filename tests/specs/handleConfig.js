import { expect} from "chai";
import handleConfig from "../../../src/handleConfig";
const configDefault = {
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

let config1 = {
    elementOpenTag: "@",
    elementCloseTagWithAttr: "@",
    elementCloseTagWithoutAttr: "@",
    attributeTagOpen: "!",
    attributeTagClose: "!",
};

let config2 = {
    elementOpenTag: "<",
    elementCloseTagWithAttr: " ",
    elementCloseTagWithoutAttr: ">",
    attributeTagOpen: "",
    attributeTagClose: ">",
};

let config3 = {
    elementOpenTag: "[[",
    elementCloseTagWithAttr: "]]",
    elementCloseTagWithoutAttr: "]]",
    attributeTagOpen: "{",
    attributeTagClose: "}",
};

let config4 = {
    elementOpenTag: "@@",
    elementCloseTagWithAttr: "@@",
    elementCloseTagWithoutAttr: "@@",
    attributeTagOpen: "{",
    attributeTagClose: "}",
};

describe("handleConfig", () => {
    let result;

    it("Should return the correct configuration object when default", () => {
        result = handleConfig();
        expect(result).to.contain({
            attributesSeparator: ", ",
            indentString: "  ",
            outputContainer: ".container",
        });
        expect(result).to.contain({
            elementOpenTag: "<",
            elementCloseTagWithAttr: " ",
            elementCloseTagWithoutAttr: ">",
        });
        expect(result).to.contain({
            attributeTagOpen: "",
            attributeTagClose: ">",
        });
    });

    it("Should return the correct configuration object when customized", () => {
        result = handleConfig(config1);
        expect(result).to.contain({
            attributesSeparator: ", ",
            indentString: "  ",
            outputContainer: ".container",
        });
        expect(result).to.contain({
            elementOpenTag: "@",
            elementCloseTagWithAttr: "@",
            elementCloseTagWithoutAttr: "@"
        });
        expect(result).to.contain({
            attributeTagOpen: "!",
            attributeTagClose: "!",
        });
    });

});