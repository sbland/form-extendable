import React from 'react';
import PropTypes from 'prop-types';

export interface IFieldLabelProps {
  uid: string;
  label: string;
  inputClassName?: string;
  hasChanged?: boolean;
  required?: boolean;
  hidden?: boolean;
}

export const FieldLabel = ({
  uid,
  label,
  inputClassName,
  hasChanged,
  required,
  hidden,
}: IFieldLabelProps) => (
  <div
    className="label_wrap_inner"
    data-testid="labelwrap"
    style={{
      overflow: 'hidden',
      width: hidden ? '0' : 'inherit',
      height: hidden ? '0' : 'inherit',
      display: hidden ? 'none' : 'inline',
    }}
  >
    {required && '*'}
    <label
      className={inputClassName}
      id={`${uid}-label`}
      htmlFor={`${uid}-input`}
    >
      {label || 'MISSING LABEL'}
      {/* Below is a possible hack to stop chrome autofill */}
      {/* {label.split('').join('\u200b')} */}
    </label>
    {hasChanged && '(!)'}
  </div>
);

FieldLabel.propTypes = {
  uid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  hasChanged: PropTypes.bool,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
};

FieldLabel.defaultProps = {
  inputClassName: '',
  hasChanged: false,
  required: false,
  hidden: false,
};
