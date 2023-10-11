type Props = {
  [key: string]: any;
  children?: ReactElement[];
  key?: string | number | null;
  ref?: any;
};

type ReactElement = {
  type: string;
  props: Props;
  key: string | number | null;
  ref: any;
};


const React = {
  createElement,
  createRoot,
}

function createElement(type: string, props: Props, ...children: ReactElement[]): ReactElement {
  const element = {
    type,
    props: {
      ...props,
      children
    },
    key: props.key ?? null,
    ref: props.ref ?? null,
  };

  console.log(element);
  return element;
}

function createRoot(domNode: HTMLElement) {
  console.log("creating root with element: ", domNode);
  return {
    render: (element: ReactElement) => render(element, domNode),
    unmount: () => unmount(domNode)
  }
}

function render(element: ReactElement, domNode: HTMLElement) {
  console.log("rendering element: ", element);

  if (typeof element === 'string') {
    domNode.appendChild(document.createTextNode(element));
    return;
  }

  const newDomNode = document.createElement(element.type);
  // copy props from element to new node
  Object.keys(element.props).filter(key => key !== 'children').forEach(prop => newDomNode[prop] = element[prop]);
  domNode.appendChild(newDomNode);

  // recurse on children
  element.props.children.forEach(child => render(child, newDomNode));
}

function unmount(root: HTMLElement) {
  root.innerHTML = '';
}

const test =
  <div>
    parent
    <div>
      child
    </div>
  </div>

const root = createRoot(document.getElementById('root'));
root.render(test);