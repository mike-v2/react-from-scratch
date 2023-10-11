const React = {
  createElement,
}

function createElement(type, props, ...children) {
  const element = {
    type,
    props: {
      ...props,
      children
    },
    key: props.key ?? null,
    ref: props.ref ?? null,
  };

  console.log(element);
  return element;
}

const test = <div>hello</div>