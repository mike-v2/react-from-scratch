type ReactElement = {
  type: string | Function;
  props: Props;
};

type Props = {
  [key: string]: any;
  children: ReactElement[];
};

type ReactRoot = {
  element: ReactElement | null,
  render: (element: ReactElement) => void,
  unmount: () => void,
}
