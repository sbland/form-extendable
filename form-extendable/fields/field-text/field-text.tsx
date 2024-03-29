import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { IFieldComponentProps } from '@form-extendable/lib';
import { IHeadingText } from '@form-extendable/lib';

export const FieldText: React.FC<
  IFieldComponentProps<string, IHeadingText>
> = ({
  uid,
  unit,
  onChange,
  onBlur,
  value,
  inputTypeOverride,
  required,
  disableAutoFill,
  inputProps,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const role = disableAutoFill ? 'presentation' : undefined;
  return (
    <>
      <input
        // Added Role to stop autofill
        // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
        role={role}
        type={inputTypeOverride || 'text'}
        ref={ref}
        id={`${uid}-input`}
        onFocus={() => {
          ref?.current?.select();
        }}
        onBlur={onBlur}
        aria-labelledby={`${uid}-label`}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={disableAutoFill ? "off" : undefined}
        {...inputProps}
      />
      {unit ? <span>{unit}</span> : <span></span>}
    </>
  );
};

FieldText.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disableAutoFill: PropTypes.bool,
};

FieldText.defaultProps = {
  unit: '',
  value: '',
  required: false,
  disableAutoFill: false,
};
