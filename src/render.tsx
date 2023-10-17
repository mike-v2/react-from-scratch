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
  hooks[index] = hooks[index] || initialValue;

  const setState = newState => {
    hooks[index] = newState;
    rerender();
  }
  currentHookIndex++;

  return [hooks[index], setState];
}

export function useEffect(body, dependencies) {
  const index = currentHookIndex;

  const hasChanged = !dependencies || !hooks[index] || dependencies.some((dependency, i) => {
    return hooks[index].dependencies[i] !== dependency;
  });

  if (hasChanged) {
    if (hooks[index]?.return != null) hooks[index].return();

    hooks[index] = {
      return: body(), // call the body function while assigning its return value
      dependencies
    }
  }

  currentHookIndex++;
}

export function createRoot(domNode: HTMLElement) {
  const newRoot = {
    element: null,
    render: (element: ReactElement) => {
      console.log('newRoot element: ', element);
      newRoot.element = element;
      render(element, domNode);
    },
    unmount: () => unmount(domNode)
  }

  currentRoot = newRoot;
  return newRoot;
}

function unmount(domNode: HTMLElement) {
  currentHookIndex = 0;
  domNode.innerHTML = '';
}

function render(element: ReactElement, domNode: HTMLElement) {
  //console.log("rendering element: ", element);

  if (typeof element.type === 'function') {
    render(element.type(element.props), domNode);
    return;
  }

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
      let domName = ATTRIBUTE_NAME_MAP[prop] || prop;
      if (domName.startsWith('on')) domName = domName.toLowerCase();
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
    if (currentRoot.element) {
      console.log("rerendering element: ", currentRoot.element);
      //currentRoot.render(<NewRootElement {...currentRoot.elementProps} />);

      currentRoot.render(currentRoot.element);
    }
  }
}