import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { IItem, SearchAndSelectDropdown } from '@react_db_client/components.search-and-select-dropdown';
import {
  ToggleBox,
  ToggleBoxRadioGroup,
} from '@react_db_client/components.form.form-components.toggle-box';
import { IFieldComponentProps, IHeadingSelect } from '@form-extendable/lib';

export type TFieldSelectProps = IFieldComponentProps<string> & IHeadingSelect;

export const FieldSelect = ({
  uid,
  unit,
  onChange,
  value,
  options,
  required,
  labelField = 'label',
  selectType,
  defaultValue,
  inputProps,
}: TFieldSelectProps) => {
  const selection =
    (value && options && options.find((o) => o.uid === value)) ||
    (defaultValue && options.find((o) => o.uid === defaultValue));
  const searchFunction = useCallback(async () => options, [options]);
  const valueIsInvalid = value !== null && selection === undefined;

  const selectionValidated = valueIsInvalid
    ? 'Invalid Selection'
    : selection && selection[labelField];
  const handleSelect = useCallback((data: IItem) => {
    onChange(data.uid as string);
  }, [onChange]);

  switch (selectType) {
    case 'dropdown':
      return (
        <>
          <SearchAndSelectDropdown
            searchFunction={searchFunction}
            handleSelect={handleSelect}
            initialValue={selection}
            searchFieldTargetField={labelField}
            labelField={labelField}
            className="formFieldInput"
            searchFieldPlaceholder={selectionValidated || 'search...'}
            // onChange={(e) => onChange(e.target.value)}
            required={required}
            searchDelay={0}
            allowEmptySearch
            aria-labelledby={`${uid}-label`}
            id={`${uid}-input`}
            {...inputProps}
          />
          {unit && <span>{unit}</span>}
        </>
      );
    case 'toggle':
      // TODO: Check input requirements of toggle box radio groups
      return (
        <ToggleBoxRadioGroup
          // TODO: Update toggle box
          selected={options.findIndex((opt) => opt.uid === value) as any}
          allowDeselect
          onChange={(i, v) => onChange(v as string)}
          className="flexHoriz"
        >
          {options.map((opt) => (
            <ToggleBox
              text={opt.label}
              // TODO: Update toggle box
              id={opt.uid as string}
              key={opt.uid}
              onChange={() => {}}
            />
          ))}
        </ToggleBoxRadioGroup>
      );
    default:
      return <div>INVALID SELECT TYPE {selectType} </div>;
  }
};

FieldSelect.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  labelField: PropTypes.string,
  selectType: PropTypes.oneOf(['dropdown', 'toggle']),
  defaultVal: PropTypes.any,
};

FieldSelect.defaultProps = {
  unit: '',
  value: '',
  multiple: false,
  // defaultVal: null,
  required: false,
  labelField: 'label',
  selectType: 'dropdown',
  defaultVal: '',
} as Partial<React.ComponentProps<typeof FieldSelect>>;
