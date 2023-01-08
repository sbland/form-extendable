import React from 'react';
import PropTypes from 'prop-types';
import { Uid } from '@react_db_client/constants.client-types';

export interface IFieldLabelProps {
  uid: Uid;
  label: string;
  inputClassName?: string;
  hasChanged?: boolean;
  hidden?: boolean;
}

export const FieldLabel: React.FC<IFieldLabelProps> = ({
  uid,
  label,
  inputClassName,
  hasChanged,
  hidden,
}) => (
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
  hidden: PropTypes.bool,
};

FieldLabel.defaultProps = {
  inputClassName: '',
  hasChanged: false,
  hidden: false,
};
