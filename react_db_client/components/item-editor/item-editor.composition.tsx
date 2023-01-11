import React from 'react';
import { Form, FormField } from '@form-extendable/component';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { defaultTheme, FormThemeProvider } from '@form-extendable/styles';
import { screen, waitFor } from '@testing-library/react';
import { ItemEditor } from './item-editor';
import { demoParams, demoData } from './demo-data';
import { EFilterType, ILabelled } from '@react_db_client/constants.client-types';

const asyncGetFiles = () => async () => {
  return [];
};
const fileServerUrl = '';
const onSubmitCallback = () => {};
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
  return (
    <>
      <FormThemeProvider theme={defaultTheme}>
        <ItemEditor
          id="demo-id"
          inputUid={demoData.uid}
          isNew={false}
          onSubmitCallback={onSubmitCallback}
          additionalData={{}}
          params={demoParams}
          collection="democollection"
          asyncGetDocument={async () => demoData}
          asyncPutDocument={async (collection, id, data) => setData(data)}
          asyncPostDocument={async () => {}}
          asyncDeleteDocument={async () => {}}
          componentMap={componentMap}
        />
      </FormThemeProvider>
      {data && <p data-testid="submittedData">{JSON.stringify(data || {})}</p>}
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
