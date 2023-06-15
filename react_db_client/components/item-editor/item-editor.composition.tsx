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
import { demoParams, demoData, demoParamsMin } from './demo-data';
import { ExampleGetRefObjectComponent } from '@form-extendable/fields.field-select-reference';

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
  AddNewReferenceComponent: ExampleGetRefObjectComponent,
});

export const BasicItemEditor = () => {
  const [submittedCallbackData, setSubmittedCallbackData] = React.useState<
    typeof demoData | null
  >(null);
  const [savedData, setSavedData] = React.useState<typeof demoData | null>(
    null
  );
  const [error, setError] = React.useState<null | Error>(null);
  return (
    <>
      <FormThemeProvider theme={defaultTheme}>
        <ItemEditor
          id="demo-id"
          inputUid={demoData.uid}
          isNew={false}
          onSubmitCallback={(d) => setSubmittedCallbackData(d)}
          additionalData={{}}
          params={demoParams}
          collection="democollection"
          saveErrorCallback={(e) => {
            setError(e);
          }}
          asyncGetDocument={async () => demoData}
          asyncPutDocument={async (collection, id, d) => {
            setError(null);
            setSubmittedCallbackData(null);
            setSavedData(null);
            if (d.text === 'ERROR') {
              throw new Error('You asked for an error?!');
            }
            setSavedData(d as typeof demoData);
            return { ok: true };
          }}
          asyncPostDocument={async () => ({ ok: true })}
          asyncDeleteDocument={async () => ({ ok: true })}
          componentMap={componentMap}
        />
      </FormThemeProvider>
      {submittedCallbackData && (
        <p data-testid="submittedCallbackData">
          {JSON.stringify(submittedCallbackData || {})}
        </p>
      )}
      {savedData && (
        <p data-testid="savedData">{JSON.stringify(savedData || {})}</p>
      )}
      {error && <p data-testid="error">{String(error) || 'No error'}</p>}
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
  const [submittedCallbackData, setSubmittedCallbackData] = React.useState<
    typeof demoData | null
  >(null);
  const [savedData, setSavedData] = React.useState<typeof demoData | null>(
    null
  );
  const [callCount, setCallCount] = React.useState(0);
  const [error, setError] = React.useState<null | Error>(null);
  return (
    <>
      <FormThemeProvider theme={defaultTheme}>
        <ItemEditor
          id="demo-id"
          inputUid={demoData.uid}
          isNew={false}
          onSubmitCallback={(d) => {
            setSubmittedCallbackData(d);
            setCallCount((prev) => prev + 1);
          }}
          saveErrorCallback={(e) => setError(e)}
          additionalData={{}}
          onCancel={() => {}}
          params={demoParams}
          collection="democollection"
          asyncGetDocument={async () => demoData}
          asyncPutDocument={async (collection, id, data) => {
            console.info(data);
            setError(null);
            setSubmittedCallbackData(null);
            setSavedData(null);
            if (!data.label) throw new Error('Must have label!');
            setSavedData(data as typeof demoData);
            return { ok: true };
          }}
          autosave
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
      {submittedCallbackData && (
        <p data-testid="submittedCallbackData">
          {JSON.stringify(submittedCallbackData || {})}
        </p>
      )}
      {savedData && (
        <p data-testid="savedData">{JSON.stringify(savedData || {})}</p>
      )}
      <p data-testid="callCount">{callCount}</p>
      <p data-testid="error">{String(error) || 'No error'}</p>
    </>
  );
};

BasicItemEditorAutosave.waitForReady = async () => {};

export const TestForm = () => {
  return (
    <FormThemeProvider theme={defaultTheme}>
      <Form
        id="Example form"
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
