export function createElement(type: string | Function, props: { [key: string]: any }, ...children: ReactElement[] | string[]): ReactElement {
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
    key: (props && String(props.key)) ?? null,
    ref: (props && props.ref) ?? null,
  };

  return element;
}

function createTextElement(text: string) {
  return {
    type: "Text",
    props: {
      value: text,
      children: []
    }
  }
}