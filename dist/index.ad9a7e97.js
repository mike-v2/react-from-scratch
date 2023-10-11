const React = {
    createElement,
    createRoot
};
function createElement(type, props, ...children) {
    const element = {
        type,
        props: {
            ...props,
            children
        },
        key: props.key ?? null,
        ref: props.ref ?? null
    };
    console.log(element);
    return element;
}
function createRoot(domNode) {
    console.log("creating root with element: ", domNode);
    return {
        render: (element)=>render(element, domNode),
        unmount: ()=>unmount(domNode)
    };
}
function render(element, domNode) {
    console.log("rendering element: ", element);
    if (typeof element === "string") {
        domNode.appendChild(document.createTextNode(element));
        return;
    }
    const newDomNode = document.createElement(element.type);
    // copy props from element to new node
    Object.keys(element.props).filter((key)=>key !== "children").forEach((prop)=>newDomNode[prop] = element[prop]);
    domNode.appendChild(newDomNode);
    // recurse on children
    element.props.children.forEach((child)=>render(child, newDomNode));
}
function unmount(root) {
    root.innerHTML = "";
}
const test = /*#__PURE__*/ React.createElement("div", {
    __source: {
        fileName: "index.tsx",
        lineNumber: 66,
        columnNumber: 3
    },
    __self: this
}, "parent", /*#__PURE__*/ React.createElement("div", {
    __source: {
        fileName: "index.tsx",
        lineNumber: 68,
        columnNumber: 5
    },
    __self: this
}, "child"));
const root = createRoot(document.getElementById("root"));
root.render(test);

//# sourceMappingURL=index.ad9a7e97.js.map
