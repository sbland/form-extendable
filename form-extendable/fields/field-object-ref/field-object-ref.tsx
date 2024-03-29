// import React, { useCallback, useMemo } from 'react';
// import PropTypes from 'prop-types';

// import {
//   SearchAndSelectDropdown,
//   IItem,
// } from '@react_db_client/components.search-and-select-dropdown';
// import {
//   IObj,
//   IFieldComponentProps,
//   IHeadingReference,
//   IHeadingReferenceMulti,
// } from '@form-extendable/lib';
// import { FilterObjectClass } from '@react_db_client/constants.client-types';

// // export type TItem = IObj & IItem;
// export interface TItem extends IObj, IItem {}

// const parseVal = (val: TItem | TItem[] | null): TItem[] => {
//   if (!val) {
//     return [];
//   }
//   return Array.isArray(val) ? val : [val];
// };

// const getSearchFieldPlaceholder = (val, field) =>
//   val[0] ? val[0][field] : 'Search...';

// const SelectedItems = ({ items, labelField, handleItemClick }) => (
//   <div className="">
//     {items.map((item) => (
//       <button
//         type="button"
//         className="button-one"
//         onClick={() => handleItemClick(item.uid, item)}
//       >
//         {item[labelField]}
//       </button>
//     ))}
//   </div>
// );

// export type TAsyncGetDocuments<V> = (
//   collection: string,
//   filters: FilterObjectClass[],
//   schema: string,
//   sortBy: string
// ) => Promise<V[]>;

// const searchFn =
//   <V extends TItem>(
//     asyncGetDocuments: TAsyncGetDocuments<V>,
//     collection,
//     schema,
//     sortBy
//   ) =>
//   async (filters?: FilterObjectClass[]): Promise<TItem[]> =>
//     asyncGetDocuments(collection, filters || [], schema, sortBy);

// export interface IFieldObjectRefAdditionalProps<V> {
//   asyncGetDocuments: TAsyncGetDocuments<V>;
// }

// export type TFieldObjectRefProps<V extends TItem> = IFieldComponentProps<
//   V,
//   IHeadingReference<any>
// > &
//   IFieldObjectRefAdditionalProps<V>;

// export type TFieldObjectRefPropsMulti<V extends TItem> =
//   | IFieldComponentProps<any, IHeadingReferenceMulti<V>> &
//       IFieldObjectRefAdditionalProps<V>;

// /**
//  * A form field that deals with object id references
//  *
//  * @deprecated Use FieldSelectSearch and pass in custom searchFn instead
//  */
// export const FieldObjectRef = <V extends TItem>({
//   uid,
//   unit,
//   onChange,
//   value,
//   multiple,
//   collection,
//   required,
//   labelField, // The field in the returned data to use as the label
//   allowEmptySearch,
//   asyncGetDocuments,
// }: TFieldObjectRefProps<V>) => {
//   const valueChecked = useMemo(() => parseVal(value), [value]);
//   const searchFieldPlaceholder = multiple
//     ? 'Choose from dropdown...'
//     : getSearchFieldPlaceholder(valueChecked, labelField);

//   const handleSelect = useCallback(
//     // eslint-disable-next-line no-unused-vars
//     (data) => {
//       const newData = multiple
//         ? [...valueChecked, data].filter(
//             (v, i, self) => self.findIndex((vv) => vv.uid == v.uid) == i
//           )
//         : data;
//       onChange(newData);
//       // if (newVal !== value) onChange(newVal);
//     },
//     [onChange, uid, multiple, valueChecked]
//   );

//   const handleSelectedClick = useCallback(
//     (itemUid) => {
//       const newData = valueChecked.filter((v) => v.uid !== itemUid);
//       onChange(newData);
//     },
//     [onChange, uid, valueChecked]
//   );

//   return (
//     <>
//       <SearchAndSelectDropdown
//         searchFunction={searchFn(
//           asyncGetDocuments,
//           collection,
//           '_id',
//           labelField
//         )}
//         handleSelect={handleSelect}
//         initialValue={valueChecked && valueChecked[0]}
//         // allowMultiple={multiple}
//         searchFieldTargetField={labelField}
//         labelField={labelField}
//         className="formFieldInput"
//         searchFieldPlaceholder={searchFieldPlaceholder}
//         // onChange={(e) => onChange(e.target.value)}
//         required={required}
//         allowEmptySearch={allowEmptySearch}
//       />
//       {/* TODO: Add selected items here if using multiple */}
//       {multiple && (
//         <SelectedItems
//           items={valueChecked}
//           labelField={labelField}
//           handleItemClick={handleSelectedClick}
//         />
//       )}
//       {unit && <span>{unit}</span>}
//     </>
//   );
// };

// const objRefShape = {
//   _id: PropTypes.string.isRequired,
//   uid: PropTypes.string.isRequired,
//   name: PropTypes.string,
//   label: PropTypes.string,
// };

// FieldObjectRef.propTypes = {
//   uid: PropTypes.string.isRequired,
//   unit: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.shape(objRefShape),
//     PropTypes.arrayOf(PropTypes.shape(objRefShape)),
//   ]),
//   onChange: PropTypes.func.isRequired,
//   multiple: PropTypes.bool,
//   required: PropTypes.bool,
//   labelField: PropTypes.string,
//   collection: PropTypes.string.isRequired,
//   allowEmptySearch: PropTypes.bool,
//   /* Async func to get documents for selection
//    * Signature: (collection<string>, filters<Array>, schema<String>, sortBy<String>) => <Array>
//    */
//   asyncGetDocuments: PropTypes.func.isRequired,
// };

// FieldObjectRef.defaultProps = {
//   unit: '',
//   value: null,
//   multiple: false,
//   // defaultVal: null,
//   required: false,
//   labelField: 'label',
//   allowEmptySearch: false,
// };
