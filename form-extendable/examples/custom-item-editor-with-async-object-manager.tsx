import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormInputs, FormField, Form } from '@form-extendable/component';
import { THeading } from '@form-extendable/lib';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';
import { useAsyncObjectManager } from '@react_db_client/async-hooks.use-async-object-manager';
import {
  IItemEditorProps,
  groupFields,
} from '@react_db_client/components.item-editor';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { IExampleDoc } from './dummyData';
import {
  apiDeleteDocument,
  apiGetDocument,
  apiPostDocument,
  apiPutDocument,
} from './mockApi';
import { IDocument } from '@react_db_client/constants.client-types';

export const headings: THeading<any>[] = [
  {
    uid: 'label',
    label: 'Label',
    type: EFilterType.text,
    required: true,
    group: 0,
  },
  {
    uid: 'description',
    label: 'Description',
    type: EFilterType.textLong,
    initHeight: 10,
    group: 0,
    scaleToContent: false,
  },
];

export const filterParamsFromData = (params, data) => {
  const out = params
    .filter((i) => data[i.uid] !== undefined)
    .reduce((acc, v) => {
      acc[v.uid] = data[v.uid];
      return acc;
    }, {});
  return out;
};

export interface IExampleEditorProps
  extends Partial<IItemEditorProps<IExampleDoc>> {
  onSubmitCallback?: (data: any) => void;
}

const groupedHeadings = groupFields(headings, 'horiz');

export const ExampleEditor: React.FC<IExampleEditorProps> = ({
  // REACT
  inputUid,
  isNew,
  onSubmitCallback,
  additionalData, // We can pass additional data to the form
}) => {
  const [message, setMessage] = React.useState('');
  // const [error, setError] = React.useState('');

  // const saveErrorCallback = useCallback((error) => {
  //   setError(`Failed to save set: ${error.message}`);
  // }, []);

  const onSavedCallback = React.useCallback(
    (_, __, data: IExampleDoc) => {
      setMessage('Document saved');
    },
    [onSubmitCallback]
  );
  // const onDeleteCallback = React.useCallback(() => {
  //   setMessage('Deleted doc');
  // }, []);

  const {
    updateFormData,
    // deleteObject,
    // loadingData,
    // savingData,
    // deletingData,
    data,
    // uid,
    // hasLoaded,
    // loadError,
    saveData,
    // isNew: isNewCurrent,
  } = useAsyncObjectManager({
    activeUid: inputUid,
    collection: 'exampleCollection',
    isNew: !inputUid || isNew,
    inputAdditionalData: additionalData,
    onSavedCallback,
    // saveErrorCallback,
    // onDeleteCallback,
    loadOnInit: true,
    // reloadOnSave: true,
    asyncGetDocument: apiGetDocument,
    asyncPutDocument: apiPutDocument,
    asyncPostDocument: apiPostDocument,
    asyncDeleteDocument: apiDeleteDocument,
  });

  // const waitingForServerResponse =
  //   (!hasLoaded && !isNewCurrent) || loadingData || savingData || deletingData;

  const handleFormUpdate = React.useCallback((fieldid: Uid, data: any) => {
    console.info(fieldid, data);
    updateFormData(fieldid, data, false);
    // if (!waitingForServerResponse) updateFormData(fieldid, data, !isNewCurrent);
  }, []);

  return (
    <div>
      {/* <form aria-label="form">
        <FormInputs
          id="exampleForm"
          headings={groupFields(headings, 'horiz')}
          formData={data}
          onFormInputChange={handleFormUpdate}
          showKey={false}
          orientation="horiz"
          FormField={FormField}
          componentMap={defaultComponentMap()}
        />
      </form> */}
      <Form
        id="exampleForm"
        headings={groupedHeadings}
        formDataInitial={data}
        onSubmit={saveData}
        onChange={handleFormUpdate}
        showKey={false}
        orientation="horiz"
        FormField={FormField}
        showEndBtns
        componentMap={defaultComponentMap()}
      />
      <div>
        <p>
          <span>Message: </span>
          <span>{message}</span>
        </p>
        {/* <p>
          <span>Waiting for server: </span>
          <span>{waitingForServerResponse ? 'Waiting' : 'Ready'}</span>
        </p>
        <p>
          <span>Has loaded: </span>
          <span>{hasLoaded ? 'yes' : 'no'}</span>
        </p>
        <p>
          <span>Load error: </span>
          <span>{loadError || 'No error'}</span>
        </p> */}
      </div>
    </div>
  );
};

const componentMap = defaultComponentMap();

export const ExampleEditorNew = <ResultType extends IDocument>({
  inputUid,
  isNew,
  onSubmitCallback,
}: IExampleEditorProps) => {
  const [message, setMessage] = React.useState('');

  const onSavedCallback = React.useCallback(
    (uid: Uid, response: any, data: ResultType) => {
      setMessage('Document saved');
      if (onSubmitCallback) onSubmitCallback(data);
    },
    [onSubmitCallback]
  );

  const { saveData, updateFormData, data } = useAsyncObjectManager({
    activeUid: inputUid,
    collection: 'exampleCollection',
    isNew: !inputUid || isNew,
    onSavedCallback,
    loadOnInit: true,
    asyncGetDocument: apiGetDocument,
    asyncPutDocument: apiPutDocument,
    asyncPostDocument: apiPostDocument,
    asyncDeleteDocument: apiDeleteDocument,
  });

  const handleUpdate = useCallback(
    (field, value) => {
      updateFormData(field, value, false);
    },
    []
    // [initialData, updateFormData]
  );

  return (
    <div>
      <div className="itemEditor_wrap" data-testid="rdc-itemEditor">
        <Form
          formDataInitial={data}
          headings={headings}
          onSubmit={saveData}
          onChange={handleUpdate}
          showEndBtns
          // submitBtnText={submitBtnText}
          componentMap={componentMap}
          FormField={FormField}
          // {...formProps}
        />
      </div>
      <p>
        <span>Message: </span>
        <span>{message}</span>
      </p>
    </div>
  );
};
