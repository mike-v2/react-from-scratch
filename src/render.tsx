import { App } from "./App";
import { createElement } from "./createElement";

export const React = {
  createElement,
  createRoot,
  useState,
}

const ATTRIBUTE_NAME_MAP = {
  htmlFor: 'for',
};

let currentRoot = null;
const hooks = [];
let currentHookIndex = 0;

export function useState(initialValue) {
  const index = currentHookIndex;
  console.log(hooks)
  hooks[index] = hooks[index] || initialValue;

  const setState = newState => {
    console.log(`setting state ${hooks[index]} to: ${newState}`);
    hooks[index] = newState;
    rerender();
  }
  currentHookIndex++;

  return [hooks[index], setState];
}

export function createRoot(domNode: HTMLElement) {
  if (currentRoot) {
    console.warn("create root should only be called once");
  }

  const newRoot = {
    render: (element: ReactElement) => render(element, domNode),
    unmount: () => unmount(domNode)
  }

  currentRoot = newRoot;
  console.log("creating root with element: ", domNode);
  return newRoot;
}

function unmount(domNode: HTMLElement) {
  currentHookIndex = 0;
  domNode.innerHTML = '';
}

function render(element: ReactElement, domNode: HTMLElement) {
  //console.log("rendering element: ", element);

  if (element.type === 'Text') {
    domNode.appendChild(document.createTextNode(String(element.props.value)));
    return;
  }

  // Array.map() will create an array within the children array
  if (Array.isArray(element)) {
    element.forEach(child => render(child, domNode));
    return;
  }

  const newDomNode = document.createElement(element.type);
  // copy props from element to new node
  Object.keys(element.props).filter(key => key !== 'children').forEach(prop => {
    if (prop === 'className') {
      newDomNode.classList.add(element.props[prop]);
    } else {
      const domName = ATTRIBUTE_NAME_MAP[prop] || prop;
      newDomNode[domName] = element.props[prop];
    }
  });
  domNode.appendChild(newDomNode);

  // recurse on children
  element.props.children.forEach(child => render(child, newDomNode));
}

function rerender() {
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot.render(<App />);
  }
}