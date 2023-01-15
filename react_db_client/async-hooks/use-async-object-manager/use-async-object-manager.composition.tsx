/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { screen } from '@testing-library/react';

import {
  demoDbData,
  demoLoadedData,
  IDemoDoc,
  inputAdditionalData,
} from './demo-data';

import {
  IUseAsyncObjectManagerArgs,
  IUseAsyncObjectManagerReturn,
  useAsyncObjectManager,
} from './use-async-object-manager';
import cloneDeep from 'lodash/cloneDeep';
import { JSONStringifySorted } from './test-utils';

const sleep = (delay) =>
  new Promise((res: (value?: any) => void) => {
    setTimeout(function () {
      res();
    }, delay);
  });

interface IVizProps
  extends IUseAsyncObjectManagerReturn<IDemoDoc>,
    ReturnType<typeof useDemoDatabase> {}

const Viz = ({
  loadedData,
  saveData,
  updateData,
  updateField,
  resetData,
  reload,
  deleteObject,
  saveResponse,
  deleteResponse,
  loadingData,
  savingData,
  deletingData,
  data,
  uid,
  callCount,
  dbData,
  asyncGetDocument,
  asyncPutDocument,
  asyncPostDocument,
  asyncDeleteDocument,
}: IVizProps) => (
  <div>
    {uid}
    <button type="button" className="button-one" onClick={reload}>
      Reload data
    </button>
    <div>{loadingData ? 'loading data' : 'Loaded data'}</div>
    <div>
      Loaded data:
      <span data-testid="loadedData">{JSONStringifySorted(loadedData)}</span>
    </div>
    <div>
      data:
      <span data-testid="data">{JSONStringifySorted(data)}</span>
    </div>
    <div>
      Callcount: <span data-testid="callcount">{callCount}</span>
    </div>
    <p>
      <label htmlFor="goodbyeInput">Goodbye Input</label>
      <input
        id="goodbyeInput"
        onChange={(e) => updateField('goodbye', e.target.value, false)}
        value={data?.goodbye || ''}
      />
    </p>
    <p>
      <button onClick={() => saveData()}>Save</button>
    </p>

    <div>
      <h1>Db data</h1>
      <p data-testid="dbData">{JSON.stringify(dbData)}</p>
      {/* <p data-testid="dbData">{JSONStringifySorted(dbData)}</p> */}
    </div>
    <div>
      <h1>Db overrides</h1>
      <p>
        <label htmlFor="goodbyeInputDb">Goodbye Input Db</label>
        <input
          id="goodbyeInputDb"
          onChange={(e) => {
            asyncPostDocument('demoCollection', demoLoadedData.uid, {
              ...dbData.demoCollection[demoLoadedData.uid],
              goodbye: e.target.value,
            });
          }}
          value={dbData.demoCollection[demoLoadedData.uid]?.goodbye || ''}
        />
      </p>
    </div>
  </div>
);

const defaultArgs: IUseAsyncObjectManagerArgs<IDemoDoc> = {
  activeUid: demoLoadedData.uid,
  collection: 'demoCollection',
  isNew: false,
  inputAdditionalData,
  schema: 'all',
  loadOnInit: false,
  asyncGetDocument: async () => ({} as any),
  asyncPutDocument: async () => ({ ok: true }),
  asyncPostDocument: async () => ({ ok: true }),
  asyncDeleteDocument: async () => ({ ok: true }),
};

const useDemoDatabase = () => {
  const [data, setData] = React.useState(cloneDeep(demoDbData));
  // console.info(data)
  const asyncGetDocument = async (collection, uid) => {
    console.info("DATA IN CALL", data)
    await sleep(100);
    // console.info(data[collection][uid]);
    return data[collection][uid];
  };
  const asyncPutDocument = async (collection, uid, objData) => {
    await sleep(100);
    setData((prev) => ({
      ...prev,
      [collection]: {
        ...prev[collection],
        [uid]: { ...prev[collection][uid], ...objData },
      },
    }));
    return { ok: true };
  };
  const asyncPostDocument = async (collection, uid, newData) => {
    await sleep(100);
    setData((prev) => ({
      ...prev,
      [collection]: { ...prev[collection], [uid]: newData },
    }));
    return { ok: true };
  };
  const asyncDeleteDocument = async (collection, uid) => {
    await sleep(100);
    setData((prev) => ({
      ...prev,
      [collection]: { ...prev[collection], [uid]: undefined },
    }));
    return { ok: true };
  };

  // console.info(data);

  return {
    dbData: data,
    asyncGetDocument,
    asyncPutDocument,
    asyncPostDocument,
    asyncDeleteDocument,
  };
};

export const AsyncTest = () => {
  const database = useDemoDatabase();
  const asyncOut = useAsyncObjectManager({
    ...defaultArgs,
    ...database,
  });

  return <Viz {...asyncOut} {...database} />;
};

AsyncTest.waitForReady = async () => {};

export const AsyncTestNewObject = () => {
  const database = useDemoDatabase();
  const asyncOut = useAsyncObjectManager({
    ...defaultArgs,
    inputAdditionalData,
    activeUid: undefined,
    ...database,
  });

  return <Viz {...asyncOut} {...database} />;
};

AsyncTestNewObject.waitForReady = async () => {};

export const AsyncTestLoadOnInit = () => {
  const database = useDemoDatabase();
  const asyncOut = useAsyncObjectManager({
    ...defaultArgs,
    ...database,
    loadOnInit: true,
  });
  return <Viz {...asyncOut} {...database} />;
};

AsyncTestLoadOnInit.waitForReady = async () => {
  await screen.findByText('Loaded data');
};
