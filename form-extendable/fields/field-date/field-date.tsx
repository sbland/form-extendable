import React from 'react';
import PropTypes from 'prop-types';
import { IFieldComponentProps, IHeadingDate } from '@form-extendable/lib';

export const FieldDate: React.FC<
  IFieldComponentProps<string | number | Date> &
    IHeadingDate<string | number | Date>
> = ({
  uid,
  unit,
  min,
  max,
  onChange,
  // defaultValue,
  value,
  required,
}) => {
  const parsedDate =
    value instanceof Date
      ? value.toISOString().substr(0, 10)
      : (value && new Date(value).toISOString().substr(0, 10)) || '';

  return (
    <>
      <input
        type="date"
        max={max}
        min={min}
        id={`${uid}-input`}
        value={value ? parsedDate : ''}
        onChange={(e) =>
          onChange(new Date(e.target.value).toISOString().substr(0, 10))
        }
        required={required}
      />
      {unit && <span>{unit}</span>}
    </>
  );
};

FieldDate.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

FieldDate.defaultProps = {
  unit: '',
  value: '',
  required: false,
};
