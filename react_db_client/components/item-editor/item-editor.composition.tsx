import React from 'react';
import { Form, FormField } from '@form-extendable/component';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import {
  EFilterType,
  ILabelled,
} from '@react_db_client/constants.client-types';
import { defaultTheme, FormThemeProvider } from '@form-extendable/styles';
import { screen, waitFor } from '@testing-library/react';
import { ItemEditor } from './item-editor';
import { demoParams, demoData } from './demo-data';

const asyncGetFiles = () => async () => {
  return [];
};
const fileServerUrl = '';
const Popup = ({ children, isOpen = true || undefined }) => {
  if (isOpen) return <>{children}</>;
  return <></>;
};

const componentMap = defaultComponentMap({
  asyncGetFiles,
  fileServerUrl,
  PopupPanel: Popup,
});

export const BasicItemEditor = () => {
  const [data, setData] = React.useState(null);
  const [savedData, setSavedData] = React.useState(null);
  return (
    <>
      <FormThemeProvider theme={defaultTheme}>
        <ItemEditor
          id="demo-id"
          inputUid={demoData.uid}
          isNew={false}
          onSubmitCallback={(d) => setData(d)}
          additionalData={{}}
          params={demoParams}
          collection="democollection"
          asyncGetDocument={async () => demoData}
          asyncPutDocument={async (collection, id, data) => {
            setSavedData(data);
            return { ok: true };
          }}
          asyncPostDocument={async () => ({ ok: true })}
          asyncDeleteDocument={async () => ({ ok: true })}
          componentMap={componentMap}
        />
      </FormThemeProvider>
      {data && <p data-testid="data">{JSON.stringify(data || {})}</p>}
      {savedData && (
        <p data-testid="submittedData">{JSON.stringify(savedData || {})}</p>
      )}
    </>
  );
};

BasicItemEditor.forTests = true;

BasicItemEditor.waitForReady = async () => {
  const demoParam = demoParams.find(
    (p) => p.type === EFilterType.text
  ) as ILabelled;
  await waitFor(() =>
    expect(
      (screen.getByLabelText(demoParam.label) as HTMLInputElement).value
    ).toEqual(demoData[demoParam.uid])
  );
};

export const BasicItemEditorAutosave = () => {
  const [data, setData] = React.useState(null);
  const [savedData, setSavedData] = React.useState(null);
  const [callCount, setCallCount] = React.useState(0);
  return (
    <>
      <FormThemeProvider theme={defaultTheme}>
        <ItemEditor
          id="demo-id"
          inputUid={demoData.uid}
          isNew={false}
          // onSubmitCallback={(d) => setData(d)}
          onSubmitCallback={() => setCallCount((prev) => prev + 1)}
          additionalData={{}}
          params={[demoParams[0]]}
          collection="democollection"
          asyncGetDocument={async () => demoData}
          asyncPutDocument={async (collection, id, data) => {
            // setSavedData(data);
            return { ok: true };
          }}
          asyncPostDocument={async () => ({ ok: true })}
          asyncDeleteDocument={async () => ({ ok: true })}
          componentMap={componentMap}
          formProps={{
            errorCallback: console.warn,
            autosave: true,
            debounceTimeout: 1000,
          }}
        />
      </FormThemeProvider>
      {data && <p data-testid="data">{JSON.stringify(data || {})}</p>}
      {savedData && (
        <p data-testid="submittedData">{JSON.stringify(savedData || {})}</p>
      )}
      <p data-testid="callCount">{callCount}</p>
    </>
  );
};

BasicItemEditorAutosave.waitForReady = async () => {};

export const TestForm = () => {
  return (
    <FormThemeProvider theme={defaultTheme}>
      <Form
        formDataInitial={{}}
        headings={demoParams}
        onSubmit={() => {}}
        onChange={() => {}}
        showEndBtns
        submitBtnText="Save Item"
        componentMap={componentMap}
        FormField={FormField}
      />
    </FormThemeProvider>
  );
};
