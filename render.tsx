import { App } from ".";
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
let currentTree = null;
let currentComponent = null;
let hooks = [];
let currentHookIndex = 0;

export function useState(initialValue) {
  console.log('useState called with initialValue = ', initialValue);
  const index = currentHookIndex;
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
    render: (element: ReactElement) => render(domNode, element),
    unmount: () => unmount(domNode)
  }

  currentRoot = newRoot;
  console.log("creating root with element: ", domNode);
  return newRoot;
}

function unmount(domNode: HTMLElement) {
  hooks = [];
  currentHookIndex = 0;
  domNode.innerHTML = '';
}

function render(domNode: HTMLElement, element: ReactElement) {
  currentTree = element;

  //console.log("rendering element: ", element);
  updateDom(domNode, null, element);


  // recurse on children
  //element.props.children.forEach(child => render(child, newDomNode));
}

function createDomElement(element: ReactElement) {
  if (element.type === 'Text') {
    return document.createTextNode(String(element.props.value));
  }

  console.log("creating dom element", element);

  const newDomNode = document.createElement(element.type as string);
  // copy props from element to new node
  Object.keys(element.props).filter(key => key !== 'children').forEach(prop => {
    if (prop === 'className') {
      newDomNode.classList.add(element.props[prop]);
    } else {
      const domName = ATTRIBUTE_NAME_MAP[prop] || prop;
      newDomNode[domName] = element.props[prop];
    }
  });
  return newDomNode;
}

function updateDomProperties(oldProps, newProps) {

}

function updateDom(parentDomNode: HTMLElement, oldElement: ReactElement, newElement: ReactElement, index = 0) {
  if (typeof newElement.type === 'function') {
    console.log('rendering component: ', newElement);
    currentComponent = newElement;
    hooks = [];
    currentComponent.hooks = hooks;
    currentHookIndex = 0;
    newElement.props.children = [newElement.type(newElement.props)];
    //return updateDom(parentDomNode, oldElement, newElement.props.children[0]);
  }

  console.log('rendering element: ', newElement);

  // Array.map() will create an array within the children array
  if (Array.isArray(newElement)) {
    newElement.forEach(child => updateDom(parentDomNode, oldElement, child));
    return;
  }

  // If there's no old node, it's a new addition.
  if (!oldElement) {
    parentDomNode.appendChild(createDomElement(newElement));
  }

  const oldNode = parentDomNode.childNodes[index] as HTMLElement;

  // If there's no new node, it's a deletion.
  if (!newElement) {
    parentDomNode.removeChild(oldNode);
    return;
  }

  // If nodes are of different types, replace the old one.
  if (oldElement && oldElement.type !== newElement.type) {
    parentDomNode.replaceChild(createDomElement(newElement), oldNode);
  }

  // If nodes are of the same type, just update properties.
  if (oldElement && oldElement.type === newElement.type) {
    updateDomProperties(oldElement.props, newElement.props);
  }

  // Process children
  const longerLength = Math.max(
    oldElement && oldElement.props.children.length,
    newElement.props.children.length
  );
  for (let i = 0; i < longerLength; i++) {
    updateDom(
      oldNode,
      oldElement && oldElement.props.children[i],
      newElement.props.children[i],
      i
    );
  }
}

function rerender() {
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot.render(<App />);
  }
}