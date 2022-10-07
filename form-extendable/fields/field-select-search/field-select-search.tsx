import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SearchAndSelectDropdown } from '@react_db_client/components.search-and-select-dropdown';
import {
  IFieldComponentProps,
  IHeadingSelectSearch,
  IHeadingSelectSearchMulti,
  IObj,
} from '@form-extendable/lib';
import { parseLabel, parseVal, parseValMultiple } from './utils';
import { ShowMultiSelection } from './multi-selection';
import { FilterObjectClass } from '@react_db_client/constants.client-types';

export type SelectValueType = null | string | IObj;
export type SelectMultiValueType = null | string[] | IObj[];

export type TFieldSelectSearchProps<V> = IFieldComponentProps<
  SelectValueType | V
> &
  IHeadingSelectSearch<IObj & { [k: string]: V }>;

export type IFieldSelectSearchMultiProps<V> = IFieldComponentProps<
  SelectMultiValueType | V[]
> &
  IHeadingSelectSearchMulti<IObj & { [k: string]: V }>;

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type ArrType<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ArrType
  : never;

type AsArr<A> = A extends any[] ? A : never;

type Or<T, A, B> = T extends true ? A : B;
type OrIt<T, Z, A, B> = T extends Z ? A : B;

export const searchFnReference =
  (asyncGetDocuments, collection, schema, sortBy) =>
  async (filters?: FilterObjectClass[]): Promise<IObj[]> => {
    return asyncGetDocuments(collection, filters || [], schema, sortBy);
  };

// TODO: Need to work out how to pass correct
export const FieldSelectSearch: React.FC<
  TFieldSelectSearchProps<any> | IFieldSelectSearchMultiProps<any>
> = <V extends IObj | undefined>({
  uid,
  onChange,
  value,
  multiple,
  required,
  searchFn,
  returnFieldOnSelect, // the field in the data to return
  searchFieldTargetField, // the target field that the search string applies to
  labelField, // The field in the returned data to use as the label
  allowEmptySearch,
  className,
}: TFieldSelectSearchProps<V> | IFieldSelectSearchMultiProps<V>) => {
  type ValInner = OrIt<typeof returnFieldOnSelect, undefined, IObj[], string[]>;
  type Val = Or<typeof multiple, ValInner, string>;
  const valueProcessed: Val = useMemo(
    () =>
      multiple
        ? (parseValMultiple(value, returnFieldOnSelect) as Val)
        : (parseVal(value, returnFieldOnSelect) as Val),
    [multiple, value]
  );

  const handleSelect = useCallback(
    (_, data) => {
      let newVal: IObj | V = returnFieldOnSelect
        ? data[returnFieldOnSelect]
        : data;
      if (multiple) {
        const newValueArray: string[] | IObj[] = (
          valueProcessed as any[]
        ).concat(data);
        onChange(newValueArray);
      } else {
        onChange(newVal);
      }
    },
    [multiple, onChange, returnFieldOnSelect]
  );

  const clickSelectedItem = useCallback((selectedItem: ArrElement<Val>) => {
    type ValArrayT = ArrType<typeof valueProcessed>;
    const newValueArray: ValArrayT = (valueProcessed as any[]).filter(
      (v: ArrElement<typeof valueProcessed>) => {
        if (typeof v === 'string') return v === selectedItem;
        // if (typeof v === 'object' && ! returnFieldOnSelect)  throw Error("Must supply returnFIeldOnSelect ")
        if (typeof v === 'object') {
          // if returnFIeldOnSelect then
          if (returnFieldOnSelect) {
            const vk = v;
            const selVk = selectedItem;
            return vk === selVk;
          } else {
            const vk = v as IObj;
            const selVk = selectedItem as IObj;
            return vk.uid === selVk.uid;
          }
        }
      }
    );
    if (multiple) onChange(newValueArray);
  }, []);

  return (
    <>
      <SearchAndSelectDropdown<IObj>
        searchFunction={searchFn}
        initialValue={multiple ? '' : (valueProcessed as string) || undefined}
        handleSelect={handleSelect}
        searchFieldTargetField={searchFieldTargetField}
        labelField={labelField}
        className={className}
        allowEmptySearch={allowEmptySearch}
        searchFieldPlaceholder={`${value || 'search...'}`}
        required={required}
        id={`${uid}-input`}
      />
      {multiple && (
        <ShowMultiSelection<ArrElement<Val>>
          onSelect={clickSelectedItem}
          labelField={labelField}
          ids={valueProcessed as AsArr<Val>}
          labels={(valueProcessed as AsArr<Val>).map(parseLabel(labelField))}
          keys={(valueProcessed as AsArr<Val>).map(parseLabel(labelField))}
        />
      )}
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
