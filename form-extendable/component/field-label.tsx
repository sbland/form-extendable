import React from 'react';
import PropTypes from 'prop-types';
import { Uid } from '@react_db_client/constants.client-types';

export interface IFieldLabelProps {
  uid: Uid;
  label: string;
  inputClassName?: string;
  hasChanged?: boolean;
  hidden?: boolean;
  required?: boolean;
  expandInput?: boolean;
}

export const FieldLabel: React.FC<IFieldLabelProps> = ({
  uid,
  label,
  hasChanged,
  hidden,
  required,
  expandInput,
}) => {
  const labelClassName = [
    `${required ? 'required' : ''}`,
    `${hasChanged ? 'hasChanged' : ''}`,
    `${hidden ? 'hidden' : ''}`,
  ]
    .filter((f) => f)
    .join(' ');
  return (
    <div
      className={`form_label ${labelClassName}`}
      style={{ display: hidden && expandInput ? 'none' : 'inherit' }}
    >
      <div
        className="label_wrap_inner"
        data-testid="labelwrap"
        style={{
          overflow: 'hidden',
          width: hidden ? '0' : 'inherit',
          height: hidden ? '0' : 'inherit',
          display: hidden ? 'none' : 'inherit',
        }}
      >
        {required && (
          <span
            style={{ display: 'inline', width: '1rem' }}
            className="required"
          >
            *
          </span>
        )}
        <label
          className={`form_label-label ${labelClassName}`}
          id={`${uid}-label`}
          htmlFor={`${uid}-input`}
        >
          {label || 'MISSING LABEL'}
          {/* Below is a possible hack to stop chrome autofill */}
          {/* {label.split('').join('\u200b')} */}
        </label>
        {hasChanged && '(!)'}
      </div>
    </div>
  );
};

FieldLabel.propTypes = {
  uid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  hasChanged: PropTypes.bool,
  hidden: PropTypes.bool,
};

FieldLabel.defaultProps = {
  inputClassName: '',
  hasChanged: false,
  hidden: false,
};
