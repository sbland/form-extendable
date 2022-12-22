import { THeading } from './IHeading';

export interface IFieldProps<
  V = unknown,
  H extends THeading<V> = THeading<V>
> {
  heading: H;
  value: V;
  onChange: (v: V | null) => void;
  additionalData: any;
}

export interface IFieldComponentProps<
  V = unknown,
  T extends HTMLElement = HTMLInputElement
> {
  uid: string;
  unit?: string;
  key?: string;
  value: V | null;
  onChange: (v: V | null) => void;
  additionalData?: any;
  inputTypeOverride?: '';
  required?: boolean;
  disableAutofill?: boolean;
  defaultValue?: V;
  label: string;
  className?: string;
  inputProps?: Omit<
    React.HTMLProps<T>,
    'defaultValue' | 'value' | 'onChange' | 'type'
  >;
}

export type TFieldReactComponent<
  V,
  H extends THeading<V>,
  T extends HTMLElement = HTMLInputElement
> = React.FC<IFieldComponentProps<V, T> & H>;
