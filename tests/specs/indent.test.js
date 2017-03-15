import { expect} from "chai";
import { getIndentation, getSpaceAtEnd } from "../../../dist/spaceHandlers";

describe("Indentation", () => {
    it("Should count the correct number of indents (double space)", () => {
        let result;
        result = getIndentation("foo", "  ");
        expect(result).to.equal(0);

        result = getIndentation("  foo", "  ");
        expect(result).to.equal(1);

        //one and a half should count as one.
        result = getIndentation("   foo", "  ");
        expect(result).to.equal(1);

        result = getIndentation("    foo", "  ");
        expect(result).to.equal(2);
    });

    it("Should count the correct number of indents (word)", () => {
        // getIndentation(str, indent_str)
        let result;
    result = getIndentation("foo", "word");
    expect(result).to.equal(0);

    result = getIndentation("wordfoo", "word");
    expect(result).to.equal(1);

    //one and a half should count as one.
    result = getIndentation("wordwofoo", "word");
    expect(result).to.equal(1);

    result = getIndentation("wordwordfoo", "word");
    expect(result).to.equal(2);
    });
});

describe("Space at the end", () => {
    it("Should return the correct number of spaces at the end", () => {
        // getSpaceAtEnd(str)
        let result;
        result = getSpaceAtEnd("foo");
        expect(result).to.equal("");

        result = getSpaceAtEnd(" foo");
        expect(result).to.equal("");

        result = getSpaceAtEnd("foo ");
        expect(result).to.equal(" ");

        result = getSpaceAtEnd(" foo ");
        expect(result).to.equal(" ");

        result = getSpaceAtEnd("                foo  ");
        expect(result).to.equal("  ");

        result = getSpaceAtEnd("foo  ");
        expect(result).to.equal("  ");
    });
});