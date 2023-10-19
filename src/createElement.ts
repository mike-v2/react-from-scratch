type Child = ReactElement | string | number;

export function createElement(
  type: string | Function,
  props: { [key: string]: any },
  ...children: Child[]
): ReactElement {

  // using Array.map() in the JSX will create an array within the children array
  const flatChildren = children.flat();

  const element = {
    type,
    props: {
      ...props,
      children: flatChildren.flatMap((child) =>
        typeof child === "string" || typeof child === "number"
          ? createTextElement(String(child))
          : child,
      ),
    },
  };

  return element;
}

function createTextElement(text: string): ReactElement {
  return {
    type: "PLAIN_TEXT",
    props: {
      value: text,
      children: [],
    },
  };
}
