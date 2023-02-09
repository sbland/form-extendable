import { THeading } from './IHeading';

export interface IFieldProps<V, H extends THeading<V> = THeading<V>> {
  heading: H;
  value: V;
  onChange: (v: V | null) => void;
  additionalData: any;
  disableAutoFill?: boolean;
}

export interface IFieldComponentPropsBase<V> {
  key?: string;
  value: V | null;
  onChange: (v: V | null) => void;
  additionalData?: any;
  inputTypeOverride?: '';
  className?: string;
  disableAutoFill?: boolean;
}

export type IFieldComponentProps <V, H extends THeading<V>> = IFieldComponentPropsBase<V> & H;

export type TFieldReactComponent<V, H extends THeading<V>> = React.FC<
  IFieldComponentProps<V, H>
>;
