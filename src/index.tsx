import "../styles/global.css";
import { React } from "./render";
import { App, SimpleBlogPost } from "./App";

const rootId = document.getElementById("root");
const root = React.createRoot(rootId);

root.render(<App />);
