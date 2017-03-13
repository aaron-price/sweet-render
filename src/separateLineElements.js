function separateLineElements(str, config) {
    // Get the element tag. E.g. div or p
    const elementTypeString = getElementString(str, config.element_tag);

    // Get the attributes tag. E.g. href="www.foobar.com"
    const attributesString = getElementString(str, config.attributes_tag);

    /* Get the content. E.g. Hello world! */
    let contentStartAt = getContentStartIndex(attributesString, str, config);
    const contentString = str.slice(contentStartAt);

    // Break string of attributes into array of attribute objects E.g. [{property: "class", value: "batman"}]
    const attributesArray = attributesString ?
        getAttributesArray(attributesString.trim(),
            config.attributes_separator
        ) :
        [];

    return {
        elementType: elementTypeString.trim(),
        attributes: attributesArray,
        content: contentString
    }
}

function getElementString(str, tag) {
    // Declare the variables
    const beginsAt = nthIndex(str, tag, 1) + tag.length;
    const endsAt = nthIndex(str, tag, 2);

    // Validate that both opening and closing tags do, in fact, exist
    if(beginsAt === -1 || endsAt === -1) {return null;}

    // Return only the part of the string we need.
    return str.slice(beginsAt, endsAt);
}

function getContentStartIndex(attributesString, str, config) {
    if (attributesString) {
        const tag = config.attributes_tag;
        return nthIndex(str, tag, 2) + tag.length;
    } else {
        const tag = config.element_tag;
        return nthIndex(str, tag, 2) + tag.length;
    }
}

function getAttributesArray(str, attributes_separator) {
    const arr = [];
    const keysAndValues = str.split(attributes_separator);

    keysAndValues.forEach((s) => {
        const keyOrValue = s.split("=");
        const attributeObject = {};
        console.log(keyOrValue);
        attributeObject.property = keyOrValue[0];
        attributeObject.value = keyOrValue[1].slice(1, -1);

        arr.push(attributeObject);
    });
    return arr;
}

function nthIndex(str, tag, n){
    let ln = str.length;
    let i = -1;

    while(n-- && i++ < ln){
        i = str.indexOf(tag, i);
        if (i < 0) break;
    }
    return i;
}

export default separateLineElements;