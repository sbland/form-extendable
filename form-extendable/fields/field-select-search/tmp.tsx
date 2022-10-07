import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SearchAndSelectDropdown } from '@react_db_client/components.search-and-select-dropdown';
import {
  IFieldComponentProps,
  IHeadingSelectSearch,
  IObj,
} from '@form-extendable/lib';

const parseValMultiple = <V,>(
  val: string | string[] | IObj | IObj[] | V | V[] | null,
  returnFieldOnSelect: string | undefined
): IObj[] | V[] => {
  if (!val) {
    return [];
  }
  const out = Array.isArray(val)
    ? val.map((v) => {
        if (typeof v === 'string' && !returnFieldOnSelect)
          throw Error(
            'Must supply input as object array or a returnFieldOnSelect'
          );
        if (typeof v === 'string' && returnFieldOnSelect) return v as V;
        if (typeof v === 'object' && returnFieldOnSelect)
          return v[returnFieldOnSelect] as V;
        if (typeof v === 'object' && !returnFieldOnSelect) return v as IObj;
      })
    : [val];
  if (returnFieldOnSelect) return out as V[];
  else return out as IObj[];
};

const parseVal = <V,>(
  val: string | string[] | IObj | IObj[] | V | V[] | null,
  returnFieldOnSelect: string | undefined
): string | null => {
  if (!val) {
    return null;
  }
  if (Array.isArray(val))
    throw Error(
      'Multiple values passed to select search without multiple prop set to true'
    );
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && returnFieldOnSelect)
    return val[returnFieldOnSelect]; // TODO: k may not be string here
  if (typeof val === 'object' && !returnFieldOnSelect)
    throw Error(
      'Object passed to select search without returnFieldOnSelect prop'
    );
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  throw Error(
    `Invalid value type passed to field select search: ${typeof val}`
  );
};

// const parseLabels =

export interface IShowMultiSelectionProps<V> {
  values: V[];
  labels: string[];
  keys: string[];
  onSelect: (val: V) => void;
}

// export const ShowMultiSelection = <k,>({
//   values,
//   labelField,
//   onSelect,
// }: IShowMultiSelectionProps<k>) => {
//   return (
//     <div>
//       {values?.map((v: string | IObj | k) => (
//         <button
//           onClick={() => onSelect(v)}
//           key={typeof v === 'object' ? v && (v as IObj).uid : (v as string)}
//         >
//           {parseVal(v, labelField || 'label') || (v as IObj).uid || v}
//           {/* {(labelField && v[labelField]) || v.label || v.uid || v} */}
//         </button>
//       ))}
//     </div>
//   );
// };

export const ShowMultiSelection = <k,>({
  values,
  labels,
  keys,
  onSelect,
}: IShowMultiSelectionProps<k>) => {
  return (
    <div>
      {values?.map((v: k, i) => (
        <button
          onClick={() => onSelect(v)}
          // key={typeof v === 'object' ? v && (v as IObj).uid : (v as string)}]
          key={keys[i]}
        >
          {labels[i]}
          {/* {parseVal(v, labelField || 'label') || (v as IObj).uid || v} */}
          {/* {(labelField && v[labelField]) || v.label || v.uid || v} */}
        </button>
      ))}
    </div>
  );
};

type HasCustomReturnField<V, R extends string | undefined> = R extends string
  ? IObj & { [k: string]: V }
  : IObj;

export type Aor<
  IsArray extends boolean | undefined,
  T
> = IsArray extends true ? T[] : T;

export type TFieldSelectSearchProps<
  V, // Is a custom type where returned object of search satisfies {[id: R ]: V}
  M extends boolean | undefined, // is true if multiple
  R extends string | undefined, // is key or undefined
  O extends HasCustomReturnField<V, R> // This is what is returned by search
> = IHeadingSelectSearch<O, M> & IFieldComponentProps<Aor<M, string> |Aor<M, V> | Aor<M, O>>


type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type ArrType<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ArrType
  : never;

export const FieldSelectSearch = <
  V,
  M extends boolean | undefined,
  R extends string | undefined,
  O extends HasCustomReturnField<V, R>
>({
  uid,
  unit,
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
}: TFieldSelectSearchProps<V, M, R, O>) => {
  const valueProcessed = useMemo(
    () =>
      multiple
        ? parseValMultiple(value, returnFieldOnSelect)
        : parseVal(value, returnFieldOnSelect),
    [multiple, value]
  );

  const handleSelect = useCallback(
    (_, data: IObj & { returnFieldOnSelect: V }) => {
      let newVal: IObj | V = returnFieldOnSelect
        ? data[returnFieldOnSelect]
        : data;
      if (multiple) {
        const newValueArray: string[] | IObj[] | V[] = (
          valueProcessed as any[]
        ).concat(data);
        onChange(newValueArray);
      } else {
        onChange(newVal);
      }
    },
    [multiple, onChange, returnFieldOnSelect]
  );

  const clickSelectedItem = useCallback(
    (selectedItem: ArrElement<typeof valueProcessed>) => {
      type ValArrayT = ArrType<typeof valueProcessed>;
      const newValueArray: ValArrayT = (valueProcessed as ValArrayT).filter(
        (v: ArrElement<typeof valueProcessed>) => {
          if (typeof v === 'string') return v === selectedItem;
          // if (typeof v === 'object' && ! returnFieldOnSelect)  throw Error("Must supply returnFIeldOnSelect ")
          if (typeof v === 'object') {
            // if returnFieldOnSelect then
            if (returnFieldOnSelect) {
              const vk = v as V;
              const selVk = selectedItem as V;
              return vk === selVk;
            } else {
              const vk = v as IObj;
              const selVk = selectedItem as IObj;
              return vk.uid === selVk.uid;
            }
          }
        }
      );
      onChange(newValueArray);
    },
    []
  );

  return (
    <>
      <SearchAndSelectDropdown<IObj & { returnFieldOnSelect: V }>
        searchFunction={searchFn}
        initialValue={multiple ? '' : (valueProcessed as string) || undefined}
        handleSelect={handleSelect}
        searchFieldTargetField={searchFieldTargetField}
        labelField={labelField}
        className={className}
        allowEmptySearch={allowEmptySearch}
        searchFieldPlaceholder={`${value || 'search...'}`}
        required={required}
      />
      {multiple && (
        <ShowMultiSelection<ArrElement<typeof valueProcessed>>
          // onSelect={clickSelectedItem}
          labelField={labelField}
          labels={}
          values={valueProcessed as IObj[] | V[]}
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
