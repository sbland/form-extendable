import { Uid } from '@react_db_client/constants.client-types';
import { THeading } from './IHeading';

export interface IFieldProps<V, H extends THeading<V> = THeading<V>> {
  heading: H;
  value: V;
  onChange: (v: V | null) => void;
  additionalData: any;
}

export interface IFieldComponentProps<
  V,
  T extends HTMLElement = HTMLInputElement
> {
  uid: Uid;
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
