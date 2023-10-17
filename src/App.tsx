import { useState, useEffect } from './hooks';
import { React } from './render';


export function App() {
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    console.log("called at start")
  }, []);

  useEffect(() => {
    console.log('called on counter change');
  }, [counter]);

  return (
    <section className='container'>
      <button onClick={() => setCounter(counter + 1)} ></button>
      <div>{counter}</div>
      {blogPostData.map(post => (
        <BlogPost {...post} />
      ))}
    </section>
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

const BlogPost = (props) => {
  const [hasRead, setHasRead] = useState(false);

  return (
    <article>
      <input type='checkbox' checked={hasRead} onChange={() => setHasRead(!hasRead)} name="hasRead" />
      <label htmlFor='hasRead' >Has Read</label>
      <h3>{props.title}</h3>
      <h5>by {props.author}</h5>
      <time dateTime={props.date}>{props.date}</time>
      <p>{props.content}</p>
    </article>
  )
}
