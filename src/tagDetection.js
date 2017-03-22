// Finds index of each element tag
function indexOfElTags(str, config) {
    const openStr = config.elementOpenTag;
    const closeWithStr = config.elementCloseTagWithAttr;
    const closeWithoutStr = config.elementCloseTagWithoutAttr;

    return {
        elementOpenTag: str.indexOf(openStr),

        // If it's the same as the opening tag, find the 2nd instance, else the 1st.
        elementCloseTagWithAttr: openStr === closeWithStr ?
            nthIndex(str, closeWithStr, 2) :
            nthIndex(str, closeWithStr, 1),

        // If it's the same as the opening tag, find the 2nd instance, else the 1st.
        elementCloseTagWithoutAttr: openStr === closeWithoutStr ?
            nthIndex(str, closeWithoutStr, 2) :
            nthIndex(str, closeWithoutStr, 1),
    };
}

// Finds index of each attribute tag, regardless of whether attributes actually exist
// Another function determines whether they exist.
// When they don't, this will be inaccurate... but unused by line handlers.
function indexOfAttrTags(str, config) {
    // Indices of element tags
    const elTags = indexOfElTags(str, config);

    // Strings of tags
    const attrOpenStr = config.attributeTagOpen;
    const attrCloseStr = config.attributeTagClose;

    // Indices of attribute tags
    const open = str.indexOf(attrOpenStr, elTags.elementCloseTagWithAttr);
    const close = str.indexOf(attrCloseStr, open + 1);

    return { attributeTagOpen: open, attributeTagClose: close };
}

// Determines whether attributes exist.
function getAttributesExist(str, config) {
    // Declare some constants
    const elTags = indexOfElTags(str, config);
    const attrTags = indexOfAttrTags(str, config);
    const openEl = elTags.elementOpenTag;
    const closeElWith = elTags.elementCloseTagWithAttr;
    const closeElWithout = elTags.elementCloseTagWithoutAttr;
    const openAttr = attrTags.attributeTagOpen;
    const closeAttr = attrTags.attributeTagClose;

    // Fixes use cases like: `<a> Foo>` Which should be false
    if (
        closeElWithout !== -1 &&
        closeElWith !== -1 &&
        closeElWithout < closeElWith
    ) { return false; }

    // Attributes exist only if all the following conditions exist
    return (
        openAttr !== -1 &&              // Open attribute tag exists
        closeAttr !== -1 &&             // Closing attribute tag exists
        openEl !== -1 &&                // Open el tag exists
        closeElWith !== -1 &&           // CloseElWith exists

        openAttr < closeAttr &&         // Attribute tag opens before it closes
        closeElWith < closeAttr &&      // Element closes before attributes end
        closeElWith <= openAttr &&      // Element closes before attributes begin, or at the same time.

        // Attributes open no more than 2 chars after element ends
        (2 + closeElWith + config.elementCloseTagWithAttr.length) >= openAttr
    );
}


function getContentString(str, config, attributesExist) {
    const startPoint = attributesExist ?
        indexOfAttrTags(str, config).close :
        indexOfElTags(str, config).elementCloseTagWithoutAttr;

    return str.slice(startPoint);
}

function nthIndex(str, tag, n) {
    let ln = str.length;
    let i = -1;

    while (n-- && i++ < ln) {
        i = str.indexOf(tag, i);
        if (i < 0) { break; }
    }
    return i;
}

module.exports = {
    indexOfElTags,
    indexOfAttrTags,
    getAttributesExist,
};