import { THeading } from './IHeading';

export interface IFieldProps<V = unknown, H extends THeading<V> = THeading<V>> {
  heading: H;
  value: V;
  onChange: (v: V | null) => void;
  additionalData: any;
}

export interface IFieldComponentProps<V = unknown>
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    'defaultValue' | 'value' | 'onChange' | 'type'
  > {
  uid: string;
  unit?: string;
  value: V | null;
  onChange: (v: V | null) => void;
  additionalData?: any;
  inputTypeOverride?: '';
  required?: boolean;
  disableAutofill?: boolean;
  defaultValue?: V;
  label: string;
}

export type TFieldReactComponent<V, H extends THeading<V>> = React.FC<
  IFieldComponentProps<V> & H
>;
