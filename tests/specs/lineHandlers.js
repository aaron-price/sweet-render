import { expect} from "chai";
import separateLineElements, {
    getElementString,
    getAttributesString,
    getContentString,
    getAttributesArray
} from "../../../dist/lineHandlers";

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

describe("getElementString", () => {
    // getElementString(str, tags, attributesExist)
    let config = {};
    let result;

    it("Should return the correct element type (with attr)", () => {
        config = config1;
        result = getElementString(`@p@ !class="batman"! Hello world!`, config, true);
        expect(result).to.equal("p");
        result = getElementString(`@p@!class="batman"! Hello world!`, config, true);
        expect(result).to.equal("p");

        config = config2;
        result = getElementString(`<p class="batman"> Hello world!`, config, true);
        expect(result).to.equal("p");

        config = config3;
        result = getElementString(`[[div]] {class="batman"} Hello world!`, config, true);
        expect(result).to.equal("div");

        config = config4;
        result = getElementString(`@@div@@ {class="batman"} Hello world!`, config, true);
        expect(result).to.equal("div");
    });

    it("Should return the correct element type (without attr)", () => {
        config = config1;
        result = getElementString(`@p@ Hello world!`, config, false);
        expect(result).to.equal("p");
        result = getElementString(`@p@ Hello world!`, config, false);
        expect(result).to.equal("p");

        config = config2;
        result = getElementString(`<p> Hello world!`, config, false);
        expect(result).to.equal("p");

        config = config3;
        result = getElementString(`[[div]] Hello world!`, config, false);
        expect(result).to.equal("div");

        config = config4;
        result = getElementString(`@@div@@ Hello world!`, config, false);
        expect(result).to.equal("div");
    });
});

describe("getAttrString", () => {
    let config = {};
    let result;

    it("Should return the attributes string", () => {
        config = config1;
        result = getAttributesString(`@p@ ! class="batman"! Hello world!`, config);
        expect(result).to.equal(`class="batman"`);
        result = getAttributesString(`@p@!class="batman"! Hello world!`, config);
        expect(result).to.equal(`class="batman"`);

        config = config2;
        result = getAttributesString(`<p class="batman"> Hello world!`, config);
        expect(result).to.equal(`class="batman"`);

        config = config3;
        result = getAttributesString(`[[div]] {class="batman"} Hello world!`, config);
        expect(result).to.equal(`class="batman"`);

        config = config4;
        result = getAttributesString(`@@div@@ {class="batman"} Hello world!`, config);
        expect(result).to.equal(`class="batman"`);

    });
});

describe("getContentString", () => {
    // getContentString(str, config, attributesExist)
    let config = {};
    let result;

    it("Should return the content string (With Attr)", () => {
        config = config1;
        result = getContentString(`@p@ !class="batman"! Hello world!`, config, true);
        expect(result).to.equal(` Hello world!`);
        result = getContentString(`@p@!class="batman"! Hello world!`, config, true);
        expect(result).to.equal(` Hello world!`);

        config = config2;
        result = getContentString(`<p class="batman"> Hello world!`, config, true);
        expect(result).to.equal(` Hello world!`);

        config = config3;
        result = getContentString(`[[div]] {class="batman"} Hello world!`, config, true);
        expect(result).to.equal(` Hello world!`);

        config = config4;
        result = getContentString(`@@div@@ {class="batman"} Hello world!`, config, true);
        expect(result).to.equal(` Hello world!`);
    });

    it("Should return the content string (Without Attr)", () => {
        config = config1;
        result = getContentString(`@p@ Hello world!`, config, false);
        expect(result).to.equal(` Hello world!`);
        result = getContentString(`@p@ Hello world!`, config, false);
        expect(result).to.equal(` Hello world!`);

        config = config2;
        result = getContentString(`<p> Hello world!`, config, false);
        expect(result).to.equal(` Hello world!`);
        result = getContentString(`<p>Hello world!`, config, false);
        expect(result).to.equal(`Hello world!`);

        config = config3;
        result = getContentString(`[[div]] Hello world!`, config, false);
        expect(result).to.equal(` Hello world!`);

        config = config4;
        result = getContentString(`@@div@@ Hello world!`, config, false);
        expect(result).to.equal(` Hello world!`);
    });

    /*
    TODO test attribute array
    It's not proving to be very testable because of the way template literals, double quotes, and babel, interact.
    */
});

describe("separateLineHandlers", () => {
    // separateLineElements(str, config)
    let config = {};
    let result;
    it("Should return an object with each part of the line as an individual member", () => {
        config = config1;
        result = separateLineElements(`@p@ !class="batman"! Hello world!`, config);
        expect(result).to.contain({
            elementType: "p",
            content: " Hello world!",
        });
        result = separateLineElements(`@p@ Hello world!`, config);
        expect(result).to.contain({
            elementType: "p",
            content: " Hello world!",
        });

        config = config2;
        result = separateLineElements(`<div class="batman"> Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });
        result = separateLineElements(`<div> Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });

        config = config3;
        result = separateLineElements(`[[div]] Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });

        result = separateLineElements(`[[div]] {class="batman"} Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });

        config = config4;
        result = separateLineElements(`@@div@@ {class="batman"} Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });

        result = separateLineElements(`@@div@@ Hello world!`, config);
        expect(result).to.contain({
            elementType: "div",
            content: " Hello world!",
        });

    });
});