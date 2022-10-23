import { EFilterType } from '@react_db_client/constants.client-types';
import { TFieldNumberProps } from './field-number';

export const defaultVal = 0;

export const defaultProps: TFieldNumberProps = {
  uid: 'foo',
  unit: 'unit',
  min: -1,
  max: 10,
  step: 0.1,
  defaultValue: 3,
  onChange: () => {},
  value: 4,
  type: EFilterType.number,
  label: 'Number field',
};
