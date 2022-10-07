import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { IFieldComponentProps, IHeadingOther } from '@form-extendable/lib';

export const FieldText: React.FC<
  IFieldComponentProps<string> & IHeadingOther<string>
> = ({
  uid,
  unit,
  onChange,
  type,
  value,
  inputTypeOverride,
  required,
  disableAutofill,
  additionalData,
  ...additionalProps
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const role = disableAutofill ? 'presentation' : undefined;
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
        aria-labelledby={`${uid}-label`}
        value={value || ''}
        // id={uid}  // disabled as entering 'id' caused autofill issues
        // name={uid} // disabled as entering 'name' caused autofill issues
        onChange={(e) => onChange(e.target.value)}
        required={required}
        {...additionalProps}
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
};

FieldText.defaultProps = {
  unit: '',
  value: '',
  required: false,
};
