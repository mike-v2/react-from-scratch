type ReactElement = {
  type: string | Function;
  props: Props;
};

type Props = {
  [key: string]: any;
  children: ReactElement[];
};
