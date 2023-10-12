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

const ATTRIBUTE_NAME_MAP = {
  htmlFor: 'for',
};


const React = {
  createElement,
  createRoot,
}

function createElement(type: string | Function, props: Props, ...children: ReactElement[]): ReactElement {
  if (typeof type === 'function') {
    return type(props);
  }

  const element = {
    type,
    props: {
      ...props,
      children
    },
    key: props.key ?? null,
    ref: props.ref ?? null,
  };

  console.log('createdElement: ', element);
  return element;
}

function createRoot(domNode: HTMLElement) {
  console.log("creating root with element: ", domNode);
  return {
    render: (element: ReactElement) => render(element, domNode),
  }
}

function render(element: ReactElement, domNode: HTMLElement) {
  console.log("rendering element: ", element);

  if (typeof element === 'string') {
    domNode.appendChild(document.createTextNode(element));
    return;
  }

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

const App = () => {
  return (
    <div className='container'>
      {blogPostData.map((post, index) => (
        <BlogPost {...post} key={index} />
      ))}
    </div>
  )
}

const BlogPost = (props) => {
  console.log("rendering props: ", props);
  return (
    <div>
      <h3>{props.title}</h3>
      <p><em>by {props.author} on {props.date}</em></p>
      <p>{props.content}</p>
    </div>
  )
}

const blogPostData = [
  {
    title: "Demystifying React Hooks",
    author: "Jane Doe",
    date: "October 7, 2023",
    content: "React Hooks were introduced in React 16.8 to allow..."
  },
  {
    title: "Understanding Async/Await in JavaScript",
    author: "John Smith",
    date: "October 14, 2023",
    content: "Async/Await is a modern way to handle asynchronous operations..."
  },
  {
    title: "Exploring the Virtual DOM",
    author: "Alice Johnson",
    date: "October 21, 2023",
    content: "The Virtual DOM is a fundamental concept in React..."
  }
]


const root = createRoot(document.getElementById('root'));
root.render(<App />);