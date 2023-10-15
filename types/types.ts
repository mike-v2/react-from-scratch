type Props = {
  [key: string]: any;
  children?: ReactElement[] | string[];
  key?: string | number | null;
  ref?: any;
};

type ReactElement = {
  type: string;
  props: Props;
  key: string | null;
  ref: any;
};