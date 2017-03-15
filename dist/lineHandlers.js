"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = separateLineElements;
exports.getElementString = getElementString;
exports.getAttributesString = getAttributesString;
exports.getContentString = getContentString;
exports.getAttributesArray = getAttributesArray;

var _tagDetection = require("./tagDetection");

function separateLineElements(str, config) {
    var attributesExist = (0, _tagDetection.getAttributesExist)(str, config);

    // Get the element string. E.g. "div" or "p"
    var elementTypeString = getElementString(str, config, attributesExist);

    // Get the attributes string, if one exists. E.g. "href="www.foobar.com, class="vkag" "
    var attributesString = attributesExist ? getAttributesString(str, config) : null;

    // Get the content. E.g. Hello world!
    var contentString = getContentString(str, config, attributesExist);

    // Break string of attributes into array of attribute objects E.g. [{property: "class", value: "batman"}]
    var attributesArray = attributesExist ? getAttributesArray(attributesString, config.attributes_separator) : [];

    return {
        elementType: elementTypeString,
        attributes: attributesArray,
        content: contentString
    };
}

function getElementString(str, config, attributesExist) {
    var elIndices = (0, _tagDetection.indexOfElTags)(str, config);
    var openIndex = elIndices.open;
    var closeIndex = attributesExist ? elIndices.closeWithAttr : elIndices.closeWithoutAttr;

    // Validate that both tags do exist
    if (openIndex === -1 || closeIndex === -1) {
        return null;
    }

    return str.slice(openIndex + config.tags.element.open.length, closeIndex);
}

function getAttributesString(str, config) {
    var AttrIndices = (0, _tagDetection.indexOfAttrTags)(str, config);
    var openIndex = AttrIndices.open;
    var closeIndex = AttrIndices.close;

    // Return the string after trimming off any whitespace
    return str.slice(openIndex + config.tags.attribute.open.length, closeIndex).trim();
}

function getContentString(str, config, attributesExist) {
    var startPoint = attributesExist ? (0, _tagDetection.indexOfAttrTags)(str, config).close + config.tags.attribute.close.length : (0, _tagDetection.indexOfElTags)(str, config).closeWithoutAttr + config.tags.element.closeWithoutAttr.length;

    return str.slice(startPoint);
}

function getAttributesArray(str, attributes_separator) {
    var arr = [];

    // E.g. [`src="foo"`,`class="bar"`]
    var segments = str.split(attributes_separator);

    segments.forEach(function (segment) {
        // E.g [`src`, `"foo"`]
        var keyValuePair = segment.split("=");

        var attributeObject = {};
        attributeObject.property = keyValuePair[0]; // `src`
        attributeObject.value = keyValuePair[1].slice(1, -1); // `foo`

        arr.push(attributeObject);
    });
    return arr;
}