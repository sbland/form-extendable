import React from 'react';
import PropTypes from 'prop-types';
import { MultiSelectDropdown } from '@react_db_client/components.form.form-components.multi-select-dropdown';
import { BubbleSelector } from '@react_db_client/components.form.form-components.bubble-selector';
import {
  IFieldComponentProps,
  IHeadingSelectMulti,
  IOpt,
  TMultiSelectValue,
} from '@form-extendable/lib';

export type TFieldMultiSelect = IFieldComponentProps<TMultiSelectValue> &
  IHeadingSelectMulti;

export const FieldMultiSelect = ({
  uid,
  unit,
  onChange,
  value,
  options,
  required,
  asDropdown,
  selectType,
  inputProps,
}: TFieldMultiSelect) => {
  const currentSelection: (string | number)[] = React.useMemo(() => {
    if (!value) return [];
    if (typeof value === 'string' || typeof value === 'number') return [value];
    if (Array.isArray(value))
      return value
        .map((v: number | string | IOpt) => {
          if (typeof v === 'string' || typeof v === 'number') return v;
          if (typeof v === 'object') return v.uid;
          return null;
        })
        .filter((v) => v) as (string | number)[];
    if (typeof value === 'object' && value.uid) return [value.uid];
    return [] as string[];
  }, [value]);

  const onChangeMiddle = (newVal) => {
    onChange(newVal);
  };

  if (asDropdown && selectType === 'dropdown') {
    return (
      <>
        <MultiSelectDropdown
          activeSelection={currentSelection || []}
          updateActiveSelection={onChangeMiddle}
          options={options}
          selectButtonProps={{
            id: `${uid}-input`,
            'aria-labelledby': `${uid}-label`,
          }}
          // required={required} // TODO: Implement required on multi select dropdown
          {...inputProps}
        />
        {unit && <span>{unit}</span>}
      </>
    );
  }

  if (selectType === 'showall') {
    const va = (Array.isArray(value) ? value : [value]).filter(
      (vi) => vi !== null
    );
    const v =
      typeof va[0] === 'object'
        ? (va as unknown as IOpt[]).map(
            (v: null | IOpt) => v?.label || 'MISSING LABEL'
          )
        : (va as unknown as (string | number)[]);
    return (
      <>
        <BubbleSelector
          activeSelection={v || []}
          updateActiveSelection={onChangeMiddle}
          options={options}
          {...inputProps}
        />
        {unit && <span>{unit}</span>}
      </>
    );
  }
  if (!asDropdown || selectType === 'hideunselected') {
    const va = Array.isArray(value) ? value : [value];
    const v =
      typeof va[0] === 'object'
        ? (va as unknown as IOpt[]).map(
            (v: null | IOpt) => v?.label || 'MISSING LABEL'
          )
        : (va as unknown as (string | number)[]);

    return (
      <>
        <BubbleSelector
          activeSelection={v || []}
          updateActiveSelection={onChangeMiddle}
          options={options}
          isSorted
          {...inputProps}
        />
        {unit && <span>{unit}</span>}
      </>
    );
  }
  return (
    <>
      Invalid select type
      {selectType}
    </>
  );
};

FieldMultiSelect.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ])
  ),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  asDropdown: PropTypes.bool,
  selectType: PropTypes.oneOf(['dropdown', 'showall', 'hideunselected']),
};

FieldMultiSelect.defaultProps = {
  unit: '',
  value: [],
  required: false,
  asDropdown: true,
  selectType: 'dropdown',
} as Partial<React.ComponentProps<typeof FieldMultiSelect>>;
