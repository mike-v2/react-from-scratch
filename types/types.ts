type Props = {
  [key: string]: any;
  children: ReactElement[];
};

type ReactElement = {
  type: string;
  props: Props;
};