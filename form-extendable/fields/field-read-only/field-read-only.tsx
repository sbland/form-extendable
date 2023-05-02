import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IFieldComponentProps, THeading, IOpt } from '@form-extendable/lib';

export interface IFieldReadOnlyProps {
  options?: IOpt[];
}

const getSelectValue = (value: string, options: IOpt[]) => {
  const val = options && options.find((o) => (o as IOpt).uid === value);
  return val ? val.label : null;
};

export const FieldReadOnly = <V, H extends THeading<V>>(
  props: IFieldComponentProps<V, H>
) => {
  const { uid, unit, value, type } = props;
  let val: string | null = typeof value === 'string' ? value : null;
  if (!val && typeof value === 'number') val = String(value);
  if (val && type === EFilterType.select)
    val =
      ((props as IFieldReadOnlyProps).options &&
        getSelectValue(val, (props as IFieldReadOnlyProps).options || [])) ||
      '';
  if (type === EFilterType.bool) val = value ? 'Yes' : 'no';
  if (typeof value === 'object') val == 'INVALID';
  return (
    <>
      <span data-testid={`${uid}_read-only-value`}>{val}</span>
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
