export function createElement(type: string | Function, props: Props, ...children: ReactElement[] | string[]): ReactElement {
  if (typeof type === 'function') {
    return type(props);
  }

  const element = {
    type,
    props: {
      ...props,
      children
    },
    key: (props && String(props.key)) ?? null,
    ref: (props && props.ref) ?? null,
  };

  return element;
}