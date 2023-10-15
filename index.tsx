import { createElement } from './createElement';
import './global.css';
//import { createRoot, useState } from './render';

export const React = {
  createElement,
  createRoot,
  useState,
}

const ATTRIBUTE_NAME_MAP = {
  htmlFor: 'for',
};

let currentRoot = null;
let currentComponent = null;
const states = [];
let currentStateIndex = 0;

export function useState(initialValue) {
  const index = currentStateIndex;
  console.log(states)
  states[index] = states[index] || initialValue;

  const setState = newState => {
    console.log(`setting state ${states[index]} to: ${newState}`);
    states[index] = newState;
    rerender();
  }
  currentStateIndex++;

  return [states[index], setState];
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
  currentStateIndex = 0;
  domNode.innerHTML = '';
}

function render(element: ReactElement, domNode: HTMLElement) {
  if (typeof element.type === 'function') {
    console.log('rendering function: ', element);
  }
  //console.log("rendering element: ", element);

  if (typeof element === 'string' || typeof element === 'number') {
    domNode.appendChild(document.createTextNode(String(element)));
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


export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <section className='container'>
      <button onclick={(e) => setCounter(counter + 1)} ></button>
      <div>{counter}</div>
      {blogPostData.map((post, index) => (
        <div className="article-container" key={index} >
          <BlogPost {...post} />
        </div>
      ))}
    </section>
  )
}

const BlogPost = (props) => {
  return (
    <article>
      <h3>{props.title}</h3>
      <h5>by {props.author}</h5>
      <time dateTime={props.date}>{props.date}</time>
      <p>{props.content}</p>
    </article>
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

const rootId = document.getElementById('root');
const root = createRoot(rootId);
root.render(<App />);