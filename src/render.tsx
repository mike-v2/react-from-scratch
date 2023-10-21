import { createElement } from "./createElement";
import { resetHooks, setRerenderCallback } from "./hooks";

export const React = {
  createElement,
  createRoot,
};

const ATTRIBUTE_NAME_MAP = {
  htmlFor: "for",
};

setRerenderCallback(rerender);
let currentRoot: ReactRoot | null = null;

export function createRoot(domNode: HTMLElement): ReactRoot {
  const newRoot = {
    element: null,
    render: (element: ReactElement) => {
      unmount(domNode);
      newRoot.element = element;
      render(element, domNode);
    },
    unmount: () => unmount(domNode),
  };

  currentRoot = newRoot;
  return newRoot;
}

function unmount(domNode: HTMLElement) {
  resetHooks();
  domNode.innerHTML = "";
}

function render(element: ReactElement, domNode: HTMLElement) {
  if (typeof element.type === "function") {
    render(element.type(element.props), domNode);
    return;
  }

  if (element.type === "PLAIN_TEXT") {
    domNode.appendChild(document.createTextNode(element.props.value));
    return;
  }

  const newDomNode: HTMLElement = document.createElement(element.type);
  // copy props from element to new node
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((prop) => {
      if (prop === "className") {
        newDomNode.classList.add(element.props[prop]);
      } else {
        // try to get HTML name (e.g. htmlFor -> for)
        let domName = ATTRIBUTE_NAME_MAP[prop] || prop;

        // convert event names to lower case
        if (domName.startsWith("on")) domName = domName.toLowerCase();

        newDomNode[domName] = element.props[prop];
      }
    });
  domNode.appendChild(newDomNode);

  console.log("rendered DOM node: ", newDomNode);

  // recurse on children
  element.props.children.forEach((child) => render(child, newDomNode));
}

function rerender() {
  if (currentRoot) {
    currentRoot.unmount();
    if (currentRoot.element) {
      currentRoot.render(currentRoot.element);
    }
  }
}
