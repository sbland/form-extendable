/* eslint-disable import/prefer-default-export */
/* A react hook async request */
import React from 'react';
import merge from 'lodash/merge';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import {
  IDocument,
  TAsyncDeleteDocument,
  TAsyncGetDocument,
  TAsyncPostDocument,
  TAsyncPutDocument,
  Uid,
} from '@react_db_client/constants.client-types';
import {
  ICallback,
  AsyncRequestError,
} from '@react_db_client/async-hooks.use-async-request';
import { generateUid } from '@react_db_client/helpers.generate-uid';
import cloneDeep from 'lodash/cloneDeep';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import {
  IDeleteResponse,
  ISaveResponse,
} from '@react_db_client/constants.client-types';

export interface IUseAsyncObjectManagerArgs<DocType extends IDocument> {
  activeUid?: null | Uid;
  collection: string;
  isNew?: boolean;
  inputAdditionalData?: null | Partial<DocType>;
  schema?: string | 'all';
  populate?: 'all' | string[];
  loadOnInit?: boolean;
  autoSave?: boolean;
  reloadOnSave?: boolean;
  onSavedCallback?: (uid: Uid, response: any, combinedData: DocType) => void;
  saveErrorCallback?: (
    e: AsyncRequestError
  ) => void /* Returns a AsyncRequestError */;
  onDeleteCallback?: ICallback<IDeleteResponse, [string, Uid]>;
  asyncGetDocument: TAsyncGetDocument<DocType>;
  asyncPutDocument: TAsyncPutDocument<DocType>;
  asyncPostDocument: TAsyncPostDocument<DocType>;
  asyncDeleteDocument: TAsyncDeleteDocument;
}

export interface IUseAsyncObjectManagerReturn<DocType extends IDocument> {
  loadedData?: Partial<DocType>;
  saveData: () => void;
  updateData: (newData: Partial<DocType>, save?: boolean) => void;
  updateField: (
    field: Uid,
    value: any,
    save?: boolean,
    nested?: string
  ) => void;
  resetData: () => void;
  reload: () => void;
  deleteObject: () => void;
  saveResponse?: ISaveResponse;
  deleteResponse?: null | IDeleteResponse;
  loadingData: boolean;
  savingData: boolean;
  deletingData: boolean;
  data: Partial<DocType>;
  savedData?: Partial<DocType>;
  uid: Uid;
  callCount: number;
  hasLoaded: boolean;
  loadError?: AsyncRequestError;
  unsavedChanges: boolean;
  isNew: boolean;
}

export const useAsyncObjectManager = <DocType extends IDocument>({
  activeUid,
  collection,
  isNew: isNewIn = false,
  inputAdditionalData = null,
  schema = 'all',
  populate = 'all',
  loadOnInit = true,
  autoSave = false,
  reloadOnSave = false,
  onSavedCallback: onSavedCallbackIn /* Returns a message string */,
  saveErrorCallback /* Returns a AsyncRequestError */,
  onDeleteCallback,
  asyncGetDocument,
  asyncPutDocument,
  asyncPostDocument,
  asyncDeleteDocument,
}: IUseAsyncObjectManagerArgs<DocType>): IUseAsyncObjectManagerReturn<DocType> => {
  const [isNew, setIsNew] = React.useState(!activeUid || isNewIn);
  const [uid] = React.useState(
    isNew || !activeUid ? generateUid(collection, null, null) : activeUid
  );
  const [unsavedChanges, setUnsavedChanges] = React.useState(false); // TODO: Implement this
  const [savingDataState, asyncSaveData] = useAsyncFn(asyncPutDocument, [
    asyncPutDocument,
  ]);
  const [savingNewDataState, asyncSaveNewData] = useAsyncFn(asyncPostDocument, [
    asyncPostDocument,
  ]);
  const [deletingDataState, asyncDeleteData] = useAsyncFn(asyncDeleteDocument);
  const [loadedDataState, callLoadData] = useAsyncFn(
    async () => asyncGetDocument(collection, uid, schema, populate),
    [collection, uid, schema, populate, asyncGetDocument]
  );
  const hasLoaded = React.useRef(false);
  const hasDeleted = React.useRef(false);
  const [shouldSave, setShouldSave] = React.useState(false);
  const [newData, setNewData] = React.useState(loadedDataState.value);
  const [savedData, setSavedData] = React.useState<
    Partial<DocType> | undefined
  >(loadedDataState.value);
  const [combinedData, setCombinedData] = React.useState<Partial<DocType>>({
    ...(loadedDataState.value || ({} as Partial<DocType>)),
    ...inputAdditionalData,
    uid,
  });

  React.useEffect(() => {
    if (loadOnInit && !hasLoaded.current) {
      callLoadData();
    }
  }, [loadOnInit, callLoadData]);

  React.useEffect(() => {
    const error = savingDataState.error || savingNewDataState.error;
    if (error) {
      if (saveErrorCallback)
        saveErrorCallback(
          new AsyncRequestError(
            error?.message || 'Unknown Async Request Error',
            error
          )
        );
    }
  }, [savingDataState, savingNewDataState, saveErrorCallback]);

  React.useEffect(() => {
    if (
      !deletingDataState.loading &&
      hasDeleted.current &&
      deletingDataState.value
    ) {
      // TODO: Check on delete args
      if (onDeleteCallback)
        onDeleteCallback(deletingDataState.value, [collection, uid]);
    }
  }, [deletingDataState, onDeleteCallback, collection, uid]);

  React.useEffect(() => {
    if (
      loadedDataState.value &&
      !loadedDataState.loading &&
      !hasLoaded.current
    ) {
      hasLoaded.current = true;
      setCombinedData({
        ...(loadedDataState.value || ({} as Partial<DocType>)),
        ...inputAdditionalData,
        uid,
      });
    }
  }, [uid, loadedDataState, inputAdditionalData]);

  React.useEffect(() => {
    if (shouldSave) {
      setShouldSave(false);
      const dataToSave: DocType = {
        ...inputAdditionalData,
        ...(newData || ({} as DocType)),
        uid,
      };
      const fullData = { ...combinedData, uid };
      const postCall = isNew ? asyncSaveNewData : asyncSaveData;
      postCall(collection, uid, dataToSave).then((response) => {
        setIsNew(false);
        setUnsavedChanges(false);
        setSavedData(combinedData);
        if (onSavedCallbackIn)
          onSavedCallbackIn(uid, response, fullData as DocType);
        if (reloadOnSave) callLoadData();
      });
    }
  }, [
    uid,
    collection,
    combinedData,
    newData,
    shouldSave,
    reloadOnSave,
    loadedDataState,
    isNew,
    asyncSaveData,
    asyncSaveNewData,
    inputAdditionalData,
  ]);

  const updateField = (field, value, save?: boolean, nested?: string) => {
    // TODO: Is there a more efficient way to update data here
    setNewData((prev) => {
      let dataCopy = cloneDeep(prev);
      if (nested) {
        const nestedLayers = nested.split('.');
        const nestedData = nestedLayers
          .reverse()
          .reduce((acc, v) => ({ [v]: acc }), { [field]: value });
        dataCopy = merge(dataCopy, nestedData);
      } else {
        dataCopy = { ...dataCopy, [field]: value };
      }
      return dataCopy;
    });
    setCombinedData((prev) => {
      let dataCopy = cloneDeep(prev);
      if (nested) {
        const nestedLayers = nested.split('.');
        const nestedData = nestedLayers
          .reverse()
          .reduce((acc, v) => ({ [v]: acc }), { [field]: value });
        dataCopy = merge(dataCopy, nestedData);
      } else {
        dataCopy = { ...dataCopy, [field]: value };
      }
      return dataCopy;
    });
    if (save || autoSave) setShouldSave(true);
  };

  const updateData = (newData: Partial<DocType>, save?) => {
    // TODO: Is there a more efficient way to update data here
    setNewData((prev) => {
      let dataCopy = cloneDeep(prev);
      dataCopy = { ...dataCopy, ...newData };
      return dataCopy;
    });
    setCombinedData((prev) => {
      let dataCopy = cloneDeep(prev);
      dataCopy = { ...dataCopy, ...newData };
      return dataCopy;
    });
    if (save || autoSave) setShouldSave(true);
  };

  const saveData = () => {
    setShouldSave(true);
  };

  const deleteObject = () => {
    hasDeleted.current = true;
    asyncDeleteData(collection, uid);
  };

  const resetData = () => {
    throw new Error('Not Implemented');
  };

  const reload = () => {
    hasLoaded.current = false;
    callLoadData();
  };

  const loadError =
    loadedDataState.error &&
    new AsyncRequestError(loadedDataState.error.message, loadedDataState.error);

  const [callCount, setCallCount] = React.useState(0);
  React.useEffect(() => {
    if (loadedDataState.loading) setCallCount((prev) => prev + 1);
  }, [loadedDataState.loading]);

  return {
    loadedData: loadedDataState.value,
    saveData,
    updateData,
    updateField,
    resetData,
    reload,
    deleteObject,
    saveResponse: savingDataState.value || savingNewDataState.value,
    deleteResponse: deletingDataState.value,
    loadingData: loadedDataState.loading,
    savingData: savingDataState.loading || savingNewDataState.loading,
    deletingData: deletingDataState.loading,
    data: combinedData,
    savedData,
    uid,
    callCount,
    hasLoaded: !loadedDataState.loading && loadedDataState.value != null, // TODO: Implement this properly
    loadError,
    unsavedChanges,
    isNew,
  };
};
