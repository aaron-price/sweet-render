export function buildContainer(value) {
    const str = typeof value === "string" ? value : value[0];
    const n = typeof value === "string" ? 0 : value[1];


    if (str.split("")[0] === ".") {
        return document.getElementsByClassName(str.slice(1))[n];
    }
    if (str.split("")[0] === "#") {
        return document.getElementById(str.slice(1));
    }
}

export function findParentElement(lineNum, currentLine, elementsArray) {
    for (let i = lineNum; i >= 0; i -= 1) {
        if (elementsArray[i].indents < currentLine.indents) {
            return elementsArray[i];
        }
    }
}

function getChildren(elementsArray, element, index) {
    const childObjs = [];
    for (let i = index + 1; i < elementsArray.length; i += 1) {

        // Don't worry about grandchildren, only record direct children
        if (elementsArray[i].indents === element.indents + 1) {
            childObjs.push(i);
        }
        if (elementsArray[i].indents <= element.indents) {
            break;
        }
    }

    return childObjs;

}

export function renderHtml(elementsArray, configured_container) {
    // Create the DOM nodes
    const nodeArray = [];
    elementsArray.forEach((line) => {
        let newElement = document.createElement(line.element.elementType);

        // Add any attributes as necessary
        line.element.attributes.forEach((attr) => {
            newElement.setAttribute(attr.property, attr.value);
        });

        // Add content as necessary
        let newContent = document.createTextNode(line.element.content);
        newElement.appendChild(newContent);
        newElement.indents = line.indents;

        nodeArray.push(newElement);
    });

    // Build a container DOM node
    let containerParent = buildContainer(configured_container);
    let container = document.createElement("div");
    containerParent.appendChild(container);

    // Handle nesting by assigning children to parents
    for (let lineNum = 0; lineNum < nodeArray.length; lineNum += 1) {
        let currentLine = nodeArray[lineNum];

        // Determine the parent line of the current one.
        currentLine.parent = currentLine.indents > 0 ?
            findParentElement(lineNum, currentLine, nodeArray) :
            containerParent;


        // Render current line inside it's parent
        currentLine.parent.insertBefore(currentLine, null);

    }
}

export function renderReact(elementsArray, configured_container, output) {
    let React = output.format;

    elementsArray.splice(0, 0, {
        element: {
            elementType: "div",
            attributes: [],
            content: "",
        },
        indents: -1,
    });

    const componentsArray = elementsArray.map((el, index) => {
        return {
            type: el.element.elementType,
            attributes: el.element.attributes,
            content: el.element.content,
            childIndices: getChildren(elementsArray, el, index),
            indents: el.indents,
        };
    });
    const componentToRender = buildReactComponent(componentsArray, 0, React);

    if (output.render !== "default") {
        let ReactDOM = output.render;
        let containerParent = buildContainer(configured_container);
        let container = document.createElement("div");
        containerParent.appendChild(container);
        ReactDOM.render(componentToRender, container);
    } else {
        return componentToRender;
    }


}

function buildReactComponent(componentsArray, index, React) {
    let component = componentsArray[index];

    const attributes = {};
    if (component.attributes) {
        component.attributes.forEach((attr) => {
            attributes[attr.property] = attr.value;
        });
    }

    let children = [];
    if (component.childIndices.length > 0) {
        component.childIndices.map((child) => {
            children.push(buildReactComponent(componentsArray, child, React));
        });
    }

    // must not pass content or children into "br" tags.
    const ignore = component.type === "br";
    if (ignore) {
        return React.createElement("br", {});
    }

    return React.createElement(
        component.type,
        attributes,
        component.content,
        ...children
    );
}