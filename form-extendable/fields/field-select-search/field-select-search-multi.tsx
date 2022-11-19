import React from 'react';
export const FieldSelectSearchMulti = () => <>NOT IMPLEMENTED</>;

// import React, { useCallback, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import {
//   IItem,
//   ISearchAndSelectDropdownProps,
//   SearchAndSelectDropdown,
// } from '@react_db_client/components.search-and-select-dropdown';
// import {
//   IFieldComponentProps,
//   IHeadingSelectSearch,
//   IHeadingSelectSearchMulti,
//   IObj,
// } from '@form-extendable/lib';
// import { FilterObjectClass } from '@react_db_client/constants.client-types';
// import { parseLabel, parseVal, parseValMultiple } from './utils';
// import { ShowMultiSelection } from './multi-selection';

// export type TFieldSelectSearchProps<V extends IObj> = IFieldComponentProps<V> &
//   IHeadingSelectSearch<V>;

// export type IFieldSelectSearchMultiProps<V extends IObj> = IFieldComponentProps<
//   V[]
// > &
//   IHeadingSelectSearchMulti<V>;

// type AsArr<A> = A extends any[] ? A : never;

// export const searchFnReference =
//   (asyncGetDocuments, collection, schema, sortBy) =>
//   async (filters?: FilterObjectClass[]): Promise<IObj[]> =>
//     asyncGetDocuments(collection, filters || [], schema, sortBy);

// // TODO: Need to work out how to pass correct props
// export const FieldSelectSearch: React.FC<
//   TFieldSelectSearchProps<any> | IFieldSelectSearchMultiProps<any>
// > = <V extends IObj & IItem>({
//   uid,
//   onChange,
//   value,
//   multiple,
//   required,
//   searchFn,
//   // returnFieldOnSelect, // the field in the data to return
//   searchFieldTargetField, // the target field that the search string applies to
//   labelField, // The field in the returned data to use as the label
//   allowEmptySearch,
//   className,
// }: TFieldSelectSearchProps<V> | IFieldSelectSearchMultiProps<V>) => {
//   // type ValInner = OrIt<typeof returnFieldOnSelect, undefined, IObj[], string[]>;
//   // type Val = Or<typeof multiple, V, string>;

//   const valueProcessed: null | V | V[] = useMemo(
//     () => (multiple ? parseValMultiple(value) : parseVal(value)),
//     [multiple, value]
//   );

//   const handleSelect = useCallback(
//     // TODO: For some reason cannot use V here
//     (_, data: any) => {
//       if (multiple) {
//         const newValueArray = (valueProcessed as V[]).concat(
//           data as unknown as V
//         ) || [data];
//         onChange(newValueArray);
//       } else {
//         onChange(data as unknown as V);
//       }
//     },
//     [multiple, onChange, valueProcessed]
//   );

//   const clickSelectedItem = useCallback((selectedItem: V) => {
//     const newValueArray: V[] = (valueProcessed as any[]).filter((v: V) => {
//       if (typeof v === 'string') return v === selectedItem;
//       if (typeof v === 'object') {
//         return v.uid === selectedItem.uid;
//       }
//     });
//     if (multiple) onChange(newValueArray);
//   }, []);

//   return (
//     <>
//       <SearchAndSelectDropdown
//         searchFunction={searchFn}
//         handleSelect={handleSelect}
//         initialValue={
//           multiple ? '' : (valueProcessed as unknown as IItem) || undefined
//         }
//         searchFieldTargetField={searchFieldTargetField}
//         labelField={labelField}
//         className={className}
//         allowEmptySearch={allowEmptySearch}
//         searchFieldPlaceholder={`${value || 'search...'}`}
//         required={required}
//         id={`${uid}-input`}
//       />
//       {multiple && (
//         <ShowMultiSelection<V>
//           onSelect={clickSelectedItem}
//           labelField={labelField}
//           ids={valueProcessed as AsArr<V>}
//           labels={(valueProcessed as AsArr<V>).map(parseLabel(labelField))}
//           keys={(valueProcessed as AsArr<V>).map(parseLabel(labelField))}
//         />
//       )}
//     </>
//   );
// };

// FieldSelectSearch.propTypes = {
//   uid: PropTypes.string.isRequired,
//   unit: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.shape({ uid: PropTypes.string }),
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//         PropTypes.shape({ uid: PropTypes.string }),
//       ])
//     ),
//   ]),
//   // defaultVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
//   multiple: PropTypes.bool,
//   required: PropTypes.bool,
//   searchFn: PropTypes.func.isRequired,
//   returnFieldOnSelect: PropTypes.string,
//   searchFieldTargetField: PropTypes.string.isRequired,
//   labelField: PropTypes.string,
//   allowEmptySearch: PropTypes.bool,
//   className: PropTypes.string,
// };

// FieldSelectSearch.defaultProps = {
//   unit: '',
//   value: null,
//   multiple: false,
//   // defaultVal: null,
//   required: false,
//   returnFieldOnSelect: 'uid',
//   labelField: 'label',
//   allowEmptySearch: false,
//   className: '',
// };
