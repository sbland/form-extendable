import React from 'react';
import PropTypes from 'prop-types';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IFieldComponentProps, THeading } from '@form-extendable/lib';
import { IOpt } from '@form-extendable/lib';

export interface IFieldReadOnlyProps<V> extends IFieldComponentProps<V> {
  options?: IOpt[];
}

const getSelectValue = (value: string, options: IOpt[]) => {
  const val = options && options.find((o) => (o as IOpt).uid === value);
  return val ? val.label : null;
};

export const FieldReadOnly =<V, > ({
  unit,
  value,
  type,
  options,
}: IFieldReadOnlyProps<V> & Partial<THeading<V>>) => {
  let val: string | null = typeof value === 'string' ? value : null;
  if (val && type === EFilterType.select)
    val = (options && getSelectValue(val, options)) || '';
  if (type === EFilterType.bool) val = value ? 'Yes' : 'no';
  if (typeof value == 'object') val == 'INVALID';
  return (
    <>
      <span>{val}</span>
      <span className="unitSpan">{unit && ` ${unit}`}</span>
    </>
  );
};

// FieldReadOnly.propTypes = {
//   unit: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.bool,
//     PropTypes.object,
//     PropTypes.array,
//   ]),
//   type: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       uid: PropTypes.string,
//       label: PropTypes.string,
//     })
//   ),
// };

// FieldReadOnly.defaultProps = {
//   unit: '',
//   value: '',
//   options: [],
// };

// export default FieldReadOnly;
