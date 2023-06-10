import React from 'react';
import {
  IFieldComponentProps,
  IHeadingReference,
  IObj,
} from '@form-extendable/lib';
import { FieldSelectSearch } from '@form-extendable/fields.field-select-search';
import {
  EFilterType,
  TAsyncGetDocuments,
} from '@react_db_client/constants.client-types';
import { searchFnReference } from './search-function';

export type TFieldSelectReferenceProps<V extends IObj> = IFieldComponentProps<
  V,
  IHeadingReference<V extends IObj ? V : never>
>;

export interface IFieldSelectReferenceProps<V extends IObj> {
  asyncGetRefObjs: TAsyncGetDocuments<V>;
  AddNewReferenceComponent: React.FC<{
    collection: string;
    onCancel: () => void;
    onSubmit: (data: V) => void;
  }>;
}

export const FieldSelectReference = <V extends IObj>(
  props: TFieldSelectReferenceProps<V> & IFieldSelectReferenceProps<V>
) => {
  const [showAddNew, setShowAddNew] = React.useState(false);
  const onAddNew = (data: V) => {
    props.onChange(data);
    setShowAddNew(false);
  };
  if (props.allowAddNew) {
    return (
      <>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <FieldSelectSearch
            {...props}
            type={EFilterType.selectSearch}
            searchFn={searchFnReference(
              props.asyncGetRefObjs,
              props.collection,
              '_id',
              props.labelField
            )}
            returnFieldOnSelect="_id"
            multiple={false}
            defaultValue={null}
          />
          <button
            style={{ width: '4rem' }}
            onClick={() => setShowAddNew(true)}
            aria-label="Add New"
            className="button-one"
            type="button"
          >
            +
          </button>
        </div>
        {showAddNew && (
          <props.AddNewReferenceComponent
            collection={props.collection}
            onCancel={() => setShowAddNew(false)}
            onSubmit={onAddNew}
          />
        )}
      </>
    );
  }
  return (
    <FieldSelectSearch
      {...props}
      type={EFilterType.selectSearch}
      searchFn={searchFnReference(
        props.asyncGetRefObjs,
        props.collection,
        '_id',
        props.labelField
      )}
      returnFieldOnSelect="_id"
      multiple={false}
      defaultValue={null}
    />
  );
  // TODO: Implement multiple
  // return props.multiple ? (
  //   <FieldSelectSearch
  //     {...props}
  //     type={EFilterType.selectSearch}
  //     searchFn={searchFnReference(
  //       props.asyncGetRefObjs,
  //       props.collection,
  //       '_id',
  //       props.labelField
  //     )}
  //     returnFieldOnSelect="_id"
  //     multiple
  //     defaultValue={undefined}
  //   />
  // ) : (
  //   <FieldSelectSearch
  //     {...props}
  //     type={EFilterType.selectSearch}
  //     searchFn={searchFnReference(
  //       props.asyncGetRefObjs,
  //       props.collection,
  //       '_id',
  //       props.labelField
  //     )}
  //     returnFieldOnSelect="_id"
  //     multiple={false}
  //     defaultValue={null}
  //   />
  // );
};
