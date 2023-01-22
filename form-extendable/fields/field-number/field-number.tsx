import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { IFieldComponentProps, IHeadingNumber } from '@form-extendable/lib';

import './style.css';

const parseInput = (value) =>
  value === '' ||
  value === null ||
  value === undefined ||
  Number.isNaN(Number(value))
    ? ''
    : Number(value);

export type TFieldNumberProps = IFieldComponentProps<number, IHeadingNumber>;

export const FieldNumber: React.FC<TFieldNumberProps> = ({
  uid,
  type,
  unit,
  min = -999999999999,
  max = 999999999999,
  step,
  defaultValue = 0,
  onChange,
  value: valueIn,
  required,
  inputProps,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const value = parseInput(valueIn);

  if (type !== 'number') throw Error(`Type must be number. Type is ${type}`);

  const onFocus = () => {
    if (value === '' && parseInput(defaultValue) !== '') onChange(defaultValue);
    else if (value !== '' && value < min) onChange(min);
    else if (value !== '' && value > max) onChange(max);
    ref.current?.select();
  };

  const onBlur = () => {
    if (value === '' && parseInput(defaultValue) !== '') onChange(defaultValue);
    else if (value !== '' && value < min) onChange(min);
    else if (value !== '' && value > max) onChange(max);
  };

  const onChangeMiddle = (e) => onChange(parseFloat(e.target.value));

  return (
    <>
      <input
        type="number"
        className="fieldNumber"
        max={Number(max)}
        min={Number(min)}
        step={Number(step)}
        value={value}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChangeMiddle}
        required={required}
        aria-labelledby={`${uid}-label`}
        id={`${uid}-input`}
        {...inputProps}
      />
      {unit && <span>{unit}</span>}
    </>
  );
};

FieldNumber.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.number,
};

FieldNumber.defaultProps = {
  unit: '',
  value: null,
  min: -99999,
  max: 999999,
  step: 1,
  required: false,
  defaultValue: undefined,
};
