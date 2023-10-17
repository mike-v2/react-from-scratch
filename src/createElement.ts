type Child = ReactElement | string | number;

export function createElement(type: string | Function, props: { [key: string]: any }, ...children: Child[]): ReactElement {
  // using Array.map() in the JSX will create an array within the children array
  const flatChildren = children.flat();

  console.log(`Received array: ${Array.isArray(children)} children: ${children}  After flatMap array: ${Array.isArray(flatChildren)} flatChildren: ${flatChildren}`)
  const element = {
    type,
    props: {
      ...props,
      children: flatChildren.flatMap(child => (
        typeof child === 'string' || typeof child === 'number' ?
          createTextElement(String(child)) :
          child
      ))
    },
  };

  return element;
}

function createTextElement(text: string): ReactElement {
  return {
    type: "Text",
    props: {
      value: text,
      children: []
    }
  }
}