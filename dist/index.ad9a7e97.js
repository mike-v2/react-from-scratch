const React = {
    createElement
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
const test = /*#__PURE__*/ React.createElement("div", {
    __source: {
        fileName: "index.tsx",
        lineNumber: 20,
        columnNumber: 14
    },
    __self: this
}, "hello");

//# sourceMappingURL=index.ad9a7e97.js.map
