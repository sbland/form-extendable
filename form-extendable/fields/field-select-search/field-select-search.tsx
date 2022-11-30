import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  IItem,
  SearchAndSelectDropdown,
} from '@react_db_client/components.search-and-select-dropdown';
import {
  IFieldComponentProps,
  IHeadingSelectSearch,
  IHeadingSelectSearchMulti,
  IObj,
} from '@form-extendable/lib';
import { parseVal } from './utils';

export type TFieldSelectSearchProps<V extends IObj> = IFieldComponentProps<V> &
  IHeadingSelectSearch<V>;

export type IFieldSelectSearchMultiProps<V extends IObj> = IFieldComponentProps<
  V[]
> &
  IHeadingSelectSearchMulti<V>;

// TODO: Need to work out how to pass correct props
export const FieldSelectSearch: React.FC<TFieldSelectSearchProps<any>> = <
  V extends IObj & IItem
>({
  uid,
  onChange,
  value,
  required,
  searchFn,
  searchFieldTargetField, // the target field that the search string applies to
  labelField = 'label', // The field in the returned data to use as the label
  allowEmptySearch,
  className,
}: TFieldSelectSearchProps<V>) => {
  // const valueProcessed: null | V | V[] = useMemo(() => {
  //   try {
  //     return parseVal(value);
  //   } catch (error) {
  //     throw new Error(`Failed to parse value for field: ${uid}: ${error}`);
  //   }
  // }, [value]);
  // console.info(value);
  const handleSelect = useCallback(
    (_, data) => {
      onChange(data as V);
    },
    [onChange]
  );

  const valuePlaceholder = useMemo(() => {
    return (value && value[labelField]) || 'search...';
  }, [value, labelField]);

  return (
    <>
      <SearchAndSelectDropdown
        searchFunction={searchFn}
        handleSelect={handleSelect}
        // TODO: Fix initial value
        // initialValue={valueProcessed}
        searchFieldTargetField={searchFieldTargetField}
        labelField={labelField}
        className={className}
        allowEmptySearch={allowEmptySearch}
        searchFieldPlaceholder={valuePlaceholder}
        // required={required}
        id={`${uid}-input`}
      />
    </>
  );
};

FieldSelectSearch.propTypes = {
  uid: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({ uid: PropTypes.string }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({ uid: PropTypes.string }),
      ])
    ),
  ]),
  // defaultVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  searchFn: PropTypes.func.isRequired,
  returnFieldOnSelect: PropTypes.string,
  searchFieldTargetField: PropTypes.string.isRequired,
  labelField: PropTypes.string,
  allowEmptySearch: PropTypes.bool,
  className: PropTypes.string,
};

FieldSelectSearch.defaultProps = {
  unit: '',
  value: null,
  multiple: false,
  // defaultVal: null,
  required: false,
  returnFieldOnSelect: 'uid',
  labelField: 'label',
  allowEmptySearch: false,
  className: '',
};
