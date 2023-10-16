export function createElement(type: string | Function, props: Props, ...children: ReactElement[]): ReactElement {
  const element = {
    type,
    props: {
      ...props,
      children: children.map(child => (
        typeof child === 'string' || typeof child === 'number' ?
          createTextElement(String(child)) :
          child
      ))
    },
    key: props && props.key ? String(props.key) : null,
    ref: (props && props.ref) ?? null,
  };

  return element;
}

// convert string children to ReactElements so that our entire tree is ReactElements
function createTextElement(text): ReactElement {
  return {
    type: "Text",
    props: {
      value: text,
      children: [],
    },
    key: null,
    ref: null,
  }
}