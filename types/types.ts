type Props = {
  [key: string]: any;
  children?: ReactElement[];
  key?: string | number | null;
  ref?: any;
};

type ReactElement = {
  type: string | Function;
  props: Props;
  key: string | null;
  ref: any;
  hooks?: [];
};