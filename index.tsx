import './global.css';
import { createRoot, useState } from './render';
import { React } from './render';

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