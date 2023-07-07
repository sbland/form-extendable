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

export type TFieldNumberProps = IFieldComponentProps<
  number | '',
  IHeadingNumber
>;

export const FieldNumber: React.FC<TFieldNumberProps> = ({
  uid,
  type,
  unit,
  min = -999999999999,
  max = 999999999999,
  step,
  defaultValue = '',
  onChange,
  onBlur: onBlurIn,
  value: valueIn,
  required,
  disableAutoFill,
  inputProps,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const value = parseInput(valueIn);
  const [focused, setFocused] = React.useState(false);

  if (type !== 'number') throw Error(`Type must be number. Type is ${type}`);

  const onFocus = () => {
    setFocused(true);
    if ((value === '' || value == null) && parseInput(defaultValue) !== '')
      onChange(defaultValue as '');
    else if (value === '' || value == null) {
      // skip
    } else if (value < min) onChange(min);
    else if (value > max) onChange(max);
    else onChange(value);
    ref.current?.select();
  };

  const onBlur = () => {
    // TODO: can we move this to form validation
    setFocused(false);
    if ((value === '' || value == null) && parseInput(defaultValue) !== '')
      onChange(defaultValue as '');
    else if (value === '' || value == null) {
      // skip
    } else if (value < min) onChange(min);
    else if (value > max) onChange(max);
    onBlurIn();
  };

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onBlur();
    }
  }
  React.useEffect(() => {
    if (focused) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [focused]);

  const onChangeMiddle = (e) => {
    onChange(parseFloat(e.target.value));
  };

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
        autoComplete={disableAutoFill ? 'off' : undefined}
        {...inputProps}
      />
      {unit && <span>{unit}</span>}
    </>
  );
};

FieldNumber.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number]),
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
