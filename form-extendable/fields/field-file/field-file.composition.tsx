import React from 'react';
import { screen } from '@testing-library/react';
import {
  WrapFieldComponent,
  FieldCompositionWrapDefault,
} from '@form-extendable/composition-helpers';
import { FieldFile } from './field-file';
import {
  DEMO_FILES_DATA,
  DEMO_FILES_DATA_MANY,
  DEMO_IMAGE_FILES_DATA,
  DEMO_IMAGE_FILES_MANY,
  dummyProps,
  dummyPropsDocs,
  dummyPropsDocsMany,
  dummyPropsImagesMany,
  PopupPanel,
} from './demo-data';
import { FieldFileMultiple } from './field-file-multiple';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';

const useManageDbFiles = (initialFiles) => {
  const [savedFiles, setSavedFiles] = React.useState(initialFiles);
  const [selection, setSelection] = React.useState<IFile[]>([]);
  const handleFileUpload =
    () => async (data: File, fileType: EFileType, callback: () => void) => {
      const fileMetaData: IFile = {
        uid: data.name,
        label: data.name,
        name: data.name,
        filePath: '',
        fileType,
        data,
      };
      setSavedFiles((prev) => [...prev, fileMetaData]);
    };

  const handleSelect = (newData) => setSelection(newData);
  return {
    savedFiles,
    selection,
    handleFileUpload,
    handleSelect,
  };
};

export const BasicFieldFileImages = () => {
  const { savedFiles, selection, handleFileUpload, handleSelect } =
    useManageDbFiles(DEMO_IMAGE_FILES_MANY);

  return (
    <>
      <FieldCompositionWrapDefault height="40rem" width="60rem">
        <WrapFieldComponent>
          <FieldFile
            {...dummyProps}
            onChange={handleSelect}
            asyncFileUpload={handleFileUpload}
            asyncGetFiles={() => async () => savedFiles}
          />
        </WrapFieldComponent>
      </FieldCompositionWrapDefault>
      <p data-testid="curSel">{selection}</p>
    </>
  );
};

BasicFieldFileImages.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
};

export const BasicFieldFileImagesMany = () => {
  const { savedFiles, selection, handleFileUpload, handleSelect } =
    useManageDbFiles(DEMO_IMAGE_FILES_MANY);

  return (
    <>
      <FieldCompositionWrapDefault height="40rem" width="60rem">
        <WrapFieldComponent>
          <FieldFileMultiple
            {...dummyPropsImagesMany(5)}
            onChange={handleSelect}
            asyncFileUpload={handleFileUpload}
            asyncGetFiles={() => async () => savedFiles}
            value={[...DEMO_IMAGE_FILES_MANY].slice(0, 5)}
          />
        </WrapFieldComponent>
      </FieldCompositionWrapDefault>
      <p data-testid="curSel">{selection.map((s) => s.name).join(',')}</p>
    </>
  );
};

BasicFieldFileImagesMany.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_MANY[0].label);
};

export const BasicFieldFileDocs = () => {
  const { savedFiles, selection, handleFileUpload, handleSelect } =
    useManageDbFiles(DEMO_FILES_DATA);

  return (
    <>
      <FieldCompositionWrapDefault height="40rem" width="60rem">
        <WrapFieldComponent>
          <FieldFile
            {...dummyPropsDocs}
            onChange={handleSelect}
            asyncFileUpload={handleFileUpload}
            asyncGetFiles={() => async () => savedFiles}
          />
        </WrapFieldComponent>
      </FieldCompositionWrapDefault>
      <p data-testid="curSel">{selection.map((s) => s.name).join(',')}</p>
    </>
  );
};

BasicFieldFileDocs.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA[0].label);
};

export const BasicFieldFileDocsmany = () => {
  const { savedFiles, selection, handleFileUpload, handleSelect } =
    useManageDbFiles(DEMO_FILES_DATA_MANY);

  return (
    <>
      <FieldCompositionWrapDefault height="40rem" width="60rem">
        <WrapFieldComponent>
          <FieldFileMultiple
            {...dummyPropsDocsMany(50)}
            onChange={handleSelect}
            asyncFileUpload={handleFileUpload}
            asyncGetFiles={() => async () => savedFiles}
          />
        </WrapFieldComponent>
      </FieldCompositionWrapDefault>
      <p data-testid="curSel">{selection.map((s) => s.name).join(',')}</p>
    </>
  );
};

BasicFieldFileDocsmany.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA_MANY[0].label);
};

export const FilesManyForTesting = () => {
  const { savedFiles, selection, handleFileUpload, handleSelect } =
    useManageDbFiles([...DEMO_IMAGE_FILES_MANY].slice(0, 5));

  return (
    <>
      <FieldCompositionWrapDefault height="40rem" width="60rem">
        <WrapFieldComponent>
          <FieldFileMultiple
            uid="uid"
            label="File Field"
            type={EFilterType.fileMultiple}
            fileType={EFileType.IMAGE}
            fileServerUrl="https://static.bit.dev"
            PopupPanel={PopupPanel}
            value={selection}
            multiple
            onChange={handleSelect}
            asyncFileUpload={handleFileUpload}
            asyncGetFiles={() => async () => savedFiles}
          />
        </WrapFieldComponent>
      </FieldCompositionWrapDefault>
      <p>{selection.map((s) => s.name).join(',')}</p>
    </>
  );
};

FilesManyForTesting.waitForReady = async () => {
  // await screen.findAllByAltText(DEMO_IMAGE_FILES_MANY[0].label);
};
