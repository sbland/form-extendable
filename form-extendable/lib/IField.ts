import { THeading } from './IHeading';

export interface IFieldProps<V extends unknown> {
  heading: THeading<V>;
  value: V;
  onChange: (v: V) => void;
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

export type TFieldComponentPropsAll<V, H extends THeading<V>> = React.FC<
  IFieldComponentProps<V> & H
>;
