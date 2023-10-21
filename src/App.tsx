import { useState, useEffect } from "./hooks";
import { React } from "./render";
// typescript requires extra configuration to import svg the ES6 way
const lightIcon = require('./images/light-icon.svg');
const darkIcon = require('./images/dark-icon.svg');

export function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    //console.log('called every render');
  });

  useEffect(() => {
    //console.log('called on start');
  }, []);

  useEffect(() => {
    //console.log('called on theme change')
    document.body.className = theme;
  }, [theme]);

  return (
    <section className="container">
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <img src={theme === 'light' ? darkIcon : lightIcon} width='30' height='30' />
      </button>
      {blogPostData.map((post) => (
        <BlogPost {...post} />
      ))}
    </section>
  );
}

const blogPostData = [
  {
    title: "Demystifying React Hooks",
    author: "Jane Doe",
    date: "October 7, 2023",
    content: "React Hooks were introduced in React 16.8 to allow...",
  },
  {
    title: "Understanding Async/Await in JavaScript",
    author: "John Smith",
    date: "October 14, 2023",
    content: "Async/Await is a modern way to handle asynchronous operations...",
  },
  {
    title: "Exploring the Virtual DOM",
    author: "Alice Johnson",
    date: "October 21, 2023",
    content: "The Virtual DOM is a fundamental concept in React...",
  },
];

function BlogPost(props) {
  const [hasRead, setHasRead] = useState(false);

  return (
    <article>
      <input
        type="checkbox"
        checked={hasRead}
        onChange={() => setHasRead(!hasRead)}
        name="hasRead"
      />
      <label htmlFor="hasRead">Has Read</label>
      <h3>{props.title}</h3>
      <h5>by {props.author}</h5>
      <time dateTime={props.date}>{props.date}</time>
      <p>{props.content}</p>
    </article>
  );
};

export function SimpleBlogPost() {
  return (
    <article className='container'>
      <header>
        <h1>Recreating React</h1>
        <h5>by Mike</h5>
      </header>
      <p>[content]</p>
    </article>
  );
};
