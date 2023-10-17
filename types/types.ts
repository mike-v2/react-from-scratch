type Props = {
  [key: string]: any;
  children: ReactElement[];
};

type ReactElement = {
  type: string | Function;
  props: Props;
};