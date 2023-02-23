import React, { useCallback, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';

import {
  IUseAsyncObjectManagerArgs,
  useAsyncObjectManager,
} from '@react_db_client/async-hooks.use-async-object-manager';
import { AsyncRequestError } from '@react_db_client/async-hooks.use-async-request';
import { Form, FormField, IFormProps } from '@form-extendable/component';
import { TComponentMap, THeading } from '@form-extendable/lib';

import {
  IDocument,
  ILabelled,
  TAsyncDeleteDocument,
  TAsyncGetDocument,
  TAsyncPostDocument,
  TAsyncPutDocument,
  Uid,
} from '@react_db_client/constants.client-types';
import { mapFields } from './field-mapper';

export interface IParam extends ILabelled {}
export type TFieldComponent = unknown;

export interface IItemEditorProps<ResultType extends IDocument> {
  id: Uid;
  inputUid?: Uid | null;
  isNew?: boolean;
  onSubmitCallback: (data: ResultType) => void;
  additionalData?: Partial<ResultType>;
  params: THeading<any>[];
  collection: string;
  asyncGetDocument: TAsyncGetDocument<ResultType>;
  asyncPutDocument: TAsyncPutDocument<ResultType>;
  asyncPostDocument: TAsyncPostDocument<ResultType>;
  asyncDeleteDocument?: TAsyncDeleteDocument;
  componentMap: TComponentMap;
  saveErrorCallback?: (e: AsyncRequestError) => void;
  endButtonRefOverride?: HTMLElement;
  onCancel?: () => void;
  autosave?: boolean;
  submitBtnText?: string;
  formProps?: Partial<IFormProps<ResultType>>;
  groupFieldsOrientation?: 'horiz' | 'vert';
  asyncObjectManagerProps?: Partial<IUseAsyncObjectManagerArgs<ResultType>>;
}

/**
 *  A form component wrapper that manages item state updates and api calls
 */
export const ItemEditor = <ResultType extends IDocument>({
  // REACT
  id,
  inputUid,
  isNew,
  onSubmitCallback,
  additionalData,
  params,
  collection,
  asyncGetDocument,
  asyncPutDocument,
  asyncPostDocument,
  asyncDeleteDocument,
  componentMap,
  saveErrorCallback = () => {},
  autosave,
  submitBtnText = 'Save Item',
  groupFieldsOrientation = 'vert',
  formProps = {},
  asyncObjectManagerProps = {},
  onCancel,
  endButtonRefOverride,
}: IItemEditorProps<ResultType>) => {
  const [endButtonContainerRef, setEndButtonContainerRef] =
    React.useState<HTMLElement | null>(null);
  const [overridenFields, setOverridenFields] = useState<string[]>([]);

  // TODO: on saved callback is calling even if the save failed!!
  const onSavedCallback = React.useCallback(
    (uid: Uid, response: any, data: ResultType) => {
      onSubmitCallback(data);
    },
    [onSubmitCallback]
  );

  const { saveData, updateField, data, uid, savedData } = useAsyncObjectManager(
    {
      activeUid: inputUid,
      collection,
      isNew: !inputUid || isNew,
      inputAdditionalData: additionalData,
      onSavedCallback,
      asyncGetDocument,
      asyncPutDocument,
      asyncPostDocument,
      asyncDeleteDocument,
      // TODO: We should have all delete error callback
      saveErrorCallback,
      ...asyncObjectManagerProps,
    }
  );

  const mappedFields = useMemo(
    () =>
      mapFields(
        params,
        overridenFields,
        groupFieldsOrientation,
        uid,
        collection
      ),
    [params, overridenFields, groupFieldsOrientation, uid, collection]
  );

  const handleUpdate = useCallback(
    (field, value) => {
      if (savedData)
        setOverridenFields((prev) => {
          const hasChanged =
            (value && !savedData) ||
            (value && !savedData[field]) ||
            (value && savedData && value !== savedData[field]) ||
            (!value && savedData[field]);
          const newSet = new Set([...prev, field]);
          if (!hasChanged) newSet.delete(field);
          return Array.from(newSet);
        });
      updateField(field, value);
    },
    [savedData, updateField]
  );

  const classNames = [id].filter((f) => f).join(' ');

  return (
    <div className="itemEditor_wrap" data-testid="rdc-itemEditor">
      <div className={`sectionWrapper ${classNames}`}>
        <Form
          formDataInitial={data}
          headings={mappedFields}
          onSubmit={saveData}
          onChange={handleUpdate}
          showEndBtns={!(autosave || formProps.autosave)}
          submitBtnText={submitBtnText}
          componentMap={componentMap}
          FormField={FormField}
          endButtonRefOverride={endButtonRefOverride}
          autosave={autosave}
          {...(formProps as Partial<IFormProps<ResultType>>)}
        />

        <section
          data-testid="itemEditor-buttonContainerBackup"
          ref={(ref) => ref && setEndButtonContainerRef(ref)}
          style={{ width: '100%' }}
        />
        {(autosave || formProps.autosave) &&
          endButtonContainerRef &&
          onCancel &&
          ReactDOM.createPortal(
            <div className="submitBtns">
              <button
                type="button"
                className="button-two submitBtn"
                onClick={() => onCancel()}
              >
                Close
              </button>
            </div>,
            endButtonRefOverride || endButtonContainerRef
          )}
      </div>
    </div>
  );
};
