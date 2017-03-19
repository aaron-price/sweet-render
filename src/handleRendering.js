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

export function renderAll(elementsArray, configured_container) {
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

export function renderReact(elementsArray, configured_container, ReactArr) {
/*    let React = ReactArr[0];
    let ReactDOM = ReactArr[1];

    function formatReactComponent() {
        let attributes = {};
        e.attributes.forEach((attr) => {
            attributes[attr.property] = attr.value;
        });

        React.createElement(line.elementType, attributes, line.content);
    }

    var inputReact =
        React.createElement('div', {},
            React.createElement('h1', {}, "Contacts"),
            React.createElement('ul', {},
                React.createElement('li', {},
                    React.createElement('h2', {}, "James Nelson"),
                    React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
                ),
                React.createElement('li', {},
                    React.createElement('h2', {}, "Joe Citizen"),
                    React.createElement('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
                )
            )
        );


    let containerParent = buildContainer(configured_container);
    let container = document.createElement("div");
    containerParent.appendChild(container);

    ReactDOM.render(inputReact, container);


    //Pseudocode
    componentsArray = elementsArray.map((el) => {
        return React.createElement(
            el.elementType,
            el.attributes,
            el.content + el.children
        );
    });
*/
}
