import { getAttributesExist, indexOfElTags, indexOfAttrTags } from "./tagDetection";

export default function separateLineElements(str, config) {
    const attributesExist = getAttributesExist(str, config);

    // Get the element string. E.g. "div" or "p"
    const elementTypeString = getElementString(str, config, attributesExist);

    // Get the attributes string, if one exists. E.g. "href="www.foobar.com, class="vkag" "
    const attributesString = attributesExist ?
        getAttributesString(str, config) :
        null;

    // Get the content. E.g. Hello world!
    const contentString = getContentString(str, config, attributesExist);

    // Break string of attributes into array of attribute objects E.g. [{property: "class", value: "batman"}]
    const attributesArray = attributesExist ?
        getAttributesArray(
            attributesString,
            config.attributes_separator
        ) : [];

    return {
        elementType: elementTypeString,
        attributes: attributesArray,
        content: contentString,
    };
}

export function getElementString(str, config, attributesExist) {
    const elIndices = indexOfElTags(str, config);
    const openIndex = elIndices.open;
    const closeIndex = attributesExist ? elIndices.closeWithAttr : elIndices.closeWithoutAttr;

    // Validate that both tags do exist
    if (openIndex === -1 || closeIndex === -1) { return null; }

    return str.slice(openIndex + config.tags.element.open.length, closeIndex);
}

export function getAttributesString(str, config) {
    const AttrIndices = indexOfAttrTags(str, config);
    const openIndex = AttrIndices.open;
    const closeIndex = AttrIndices.close;

    // Return the string after trimming off any whitespace
    return str
        .slice(
            openIndex + config.tags.attribute.open.length,
            closeIndex)
        .trim();
}

export function getContentString(str, config, attributesExist) {
    const startPoint = attributesExist ?
        indexOfAttrTags(str, config).close + config.tags.attribute.close.length :
        indexOfElTags(str, config).closeWithoutAttr + config.tags.element.closeWithoutAttr.length;

    return str.slice(startPoint);
}

export function getAttributesArray(str, attributes_separator) {
    const arr = [];

    // E.g. [`src="foo"`,`class="bar"`]
    const segments = str.split(attributes_separator);

    segments.forEach((segment) => {
        // E.g [`src`, `"foo"`]
        const keyValuePair = segment.split("=");

        const attributeObject = {};
        attributeObject.property = keyValuePair[0]; // `src`
        attributeObject.value = keyValuePair[1].slice(1, -1); // `foo`

        arr.push(attributeObject);
    });
    return arr;
}