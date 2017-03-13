"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function separateLineElements(str, config) {
    // Get the element tag. E.g. div or p
    var elementTypeString = getElementString(str, config.element_tag);

    // Get the attributes tag. E.g. href="www.foobar.com"
    var attributesString = getElementString(str, config.attributes_tag);

    /* Get the content. E.g. Hello world! */
    var contentStartAt = getContentStartIndex(attributesString, str, config);
    var contentString = str.slice(contentStartAt);

    // Break string of attributes into array of attribute objects E.g. [{property: "class", value: "batman"}]
    var attributesArray = attributesString ? getAttributesArray(attributesString.trim(), config.attributes_separator) : [];

    return {
        elementType: elementTypeString.trim(),
        attributes: attributesArray,
        content: contentString
    };
}

function getElementString(str, tag) {
    // Declare the variables
    var beginsAt = nthIndex(str, tag, 1) + tag.length;
    var endsAt = nthIndex(str, tag, 2);

    // Validate that both opening and closing tags do, in fact, exist
    if (beginsAt === -1 || endsAt === -1) {
        return null;
    }

    // Return only the part of the string we need.
    return str.slice(beginsAt, endsAt);
}

function getContentStartIndex(attributesString, str, config) {
    if (attributesString) {
        var tag = config.attributes_tag;
        return nthIndex(str, tag, 2) + tag.length;
    } else {
        var _tag = config.element_tag;
        return nthIndex(str, _tag, 2) + _tag.length;
    }
}

function getAttributesArray(str, attributes_separator) {
    var arr = [];
    var keysAndValues = str.split(attributes_separator);
    keysAndValues.forEach(function (s) {
        var keyOrValue = s.split("=");
        var attributeObject = {};
        attributeObject.property = keyOrValue[0];
        attributeObject.value = keyOrValue[1].slice(1, -1);

        arr.push(attributeObject);
    });
    return arr;
}

function nthIndex(str, tag, n) {
    var ln = str.length;
    var i = -1;

    while (n-- && i++ < ln) {
        i = str.indexOf(tag, i);
        if (i < 0) {
            break;
        }
    }
    return i;
}

exports.default = separateLineElements;