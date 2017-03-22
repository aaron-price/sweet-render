import { expect} from "chai";
import tagDetection from "../../../src/tagDetection";

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

describe("Detect Element Tags", () => {
    it("Should find the index of the opening element tag", () => {
        let config = config1;
        let result;
        result = tagDetection.indexOfElTags(`@a@ !class="batman", src="www.aaroncoding.com"! Click me!`, config).elementOpenTag;
        expect(result).to.equal(0);

        result = tagDetection.indexOfElTags(`    @a@ !class="batman", src="www.aaroncoding.com"! Click me!`, config).elementOpenTag;
        expect(result).to.equal(4);
    });

    it("Should find the index of the closing element tag (without attributes)", () => {
        let result;

        // open === close
        let config = config1;
        result = tagDetection.indexOfElTags(`@a@ Foo`, config).elementCloseTagWithoutAttr;
        expect(result).to.equal(2);

        // open !== close
        config = config2;
        result = tagDetection.indexOfElTags(`<a> Foo`, config).elementCloseTagWithoutAttr;
        expect(result).to.equal(2);
    });

    it("Should find the index of the closing element tag (with attributes)", () => {
        let result;

        // open === close
        let config = config1;
        result = tagDetection.indexOfElTags(`@a@!src! Foo`, config).elementCloseTagWithAttr;
        expect(result).to.equal(2);

        // open !== close
        config = config2;
        result = tagDetection.indexOfElTags(`<a href="www.foo.com"> Foo`, config).elementCloseTagWithAttr;
        expect(result).to.equal(2);
    });
});

describe("Detect Attribute Tags", () => {
    it("Should find the opening attribute tag, @el@ !attr!", () => {
        let result;
        let config = config1;

        result = tagDetection.indexOfAttrTags(`@a@!src! Foo`, config).attributeTagOpen;
        expect(result).to.equal(3);

        result = tagDetection.indexOfAttrTags(`@a@ !src! Foo`, config).attributeTagOpen;
        expect(result).to.equal(4);

        result = tagDetection.indexOfAttrTags(`@a@ Foo`, config).attributeTagOpen;
        expect(result).to.equal(-1);
    });

    it("Should find the closing attribute tag, @el@ !attr!", () => {
        let result;
        let config = config1;

        result = tagDetection.indexOfAttrTags(`@a@!src! Foo`, config).attributeTagClose;
        expect(result).to.equal(7);

        result = tagDetection.indexOfAttrTags(`@a@ !src! Foo`, config).attributeTagClose;
        expect(result).to.equal(8);

        result = tagDetection.indexOfAttrTags(`@a@ Foo`, config).attributeTagClose;
        expect(result).to.equal(-1);
    });

    it("Should find the opening attribute tag, <el attr> or <el>", () => {
        let result;
        let config = config2;

        result = tagDetection.indexOfAttrTags(`<a src> Foo`, config).attributeTagOpen;
        expect(result).to.equal(2);
    });

    it("Should find the closing attribute tag, <el attr> or <el>", () => {
        let result;
        let config = config2;

        result = tagDetection.indexOfAttrTags(`<a src> Foo`, config).attributeTagClose;
        expect(result).to.equal(6);

        result = tagDetection.indexOfAttrTags(`<a> Foo`, config).attributeTagClose;
        expect(result).to.equal(-1);
    });

    it("Should determine whether attribute tags exist", () => {
        let result;
        let config = config2;

        result = tagDetection.getAttributesExist(`<a src> Foo`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`<a src="asdf" > Foo`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`<a> Foo`, config);
        expect(result).to.equal(false);

        result = tagDetection.getAttributesExist(`<a> Foo>`, config);
        expect(result).to.equal(false);

        config = config1;
        result = tagDetection.getAttributesExist(`@a@!src! Foo`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`@a@ !src! Foo`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`@a@ ! src ! Foo`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`@a@ Foo! src!`, config);
        expect(result).to.equal(false);

        config = config3;
        result = tagDetection.getAttributesExist(`[[div]] {class="batman"} Hello world!`, config);
        expect(result).to.equal(true);

        result = tagDetection.getAttributesExist(`[[div]]{class="batman"} Hello world!`, config);
        expect(result).to.equal(true);

        config = config4;
        result = tagDetection.getAttributesExist(`@@div@@ {class="batman"} Hello world!`, config);
        expect(result).to.equal(true);
    });
});
