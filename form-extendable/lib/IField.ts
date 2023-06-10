import { IFormFieldValidationError } from './IErrors';
import { THeading } from './IHeading';

export interface IFieldProps<V, H extends THeading<V> = THeading<V>> {
  heading: H;
  value: V;
  error?: IFormFieldValidationError;
  onChange: (v: V | null) => void;
  onBlur: () => void;
  additionalData: any;
  disableAutoFill?: boolean;
}

export interface IFieldComponentPropsBase<V> {
  key?: string;
  value: V | null;
  onChange: (v: V | null) => void;
  onBlur: () => void;
  additionalData?: any;
  inputTypeOverride?: '';
  className?: string;
  disableAutoFill?: boolean;
}

export type IFieldComponentProps<
  V,
  H extends THeading<V>
> = IFieldComponentPropsBase<V> & H;

export type TFieldReactComponent<V, H extends THeading<V>> = React.FC<
  IFieldComponentProps<V, H>
>;

export interface IFieldStatus {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isRequired: boolean;
  isDisabled: boolean;
}
