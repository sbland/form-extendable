import React from 'react';
import PropTypes from 'prop-types';
import { ToggleBox } from '@react_db_client/components.form.form-components.toggle-box';
import { IFieldComponentProps, IHeadingBool } from '@form-extendable/lib';
import { Checkbox } from './checkbox';

export const FieldBool = ({
  uid,
  label,
  onChange,
  value,
  useToggle,
  checkboxContent,
}: IFieldComponentProps<boolean> & IHeadingBool) =>
  useToggle ? (
    <ToggleBox
      stateIn={value || undefined}
      id={uid}
      text={checkboxContent || ''}
      onChange={(val) => onChange(val)}
      selectButtonProps={{ id: `${uid}-input`, 'aria-label': label }}
    />
  ) : (
    <Checkbox
      uid={uid}
      value={value}
      text={checkboxContent || ''}
      inputProps={{ id: `${uid}-input`, 'aria-label': label }}
      onChange={(e) => onChange(e.target.value || false)}
    />
  );

FieldBool.propTypes = {
  uid: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  useToggle: PropTypes.bool,
};

FieldBool.defaultProps = {
  value: false,
  label: null,
  useToggle: false,
};
