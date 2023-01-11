import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { TComponentMap } from '@form-extendable/lib';
import { IFile } from '@react_db_client/constants.client-types';
import React from 'react';
import { defaultProps, getComponentMap } from './default-props';
import { errorCallback, getInitialFormData, onSubmit } from './dummy-api';
import {
  demoFormData,
  demoNestedHeadings,
  DEMO_FILES_DATA,
  fileOnlyHeadings,
} from './dummy-data';
import { Form } from './form';
import { FormInputs } from './form-inputs';

const FormStyledExample = ({ children }) => (
  <CompositionWrapDefault>{children}</CompositionWrapDefault>
);

let files = [...DEMO_FILES_DATA];

const asyncGetFiles = async () => files;

const useGetComponentMap = () => {
  const handleUpload = (data, fileType) => {
    const fileMetaData: IFile = {
      uid: data.name,
      label: data.name,
      name: data.name,
      filePath: '',
      fileType,
      data,
    };
    const newFiles = [...files, fileMetaData];
    files = newFiles;
  };
  const componentMap = getComponentMap(asyncGetFiles, handleUpload);
  return {
    componentMap,
  };
};

export const BasicForm = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  const { componentMap } = useGetComponentMap();
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          onSubmit={onSubmit}
          orientation={direction}
          componentMap={componentMap}
          errorCallback={errorCallback}
          formDataInitial={getInitialFormData()}
        />
      </FormStyledExample>
    </div>
  );
};

BasicForm.waitForReady = async () => {};

export const BasicFormNested = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          headings={demoNestedHeadings}
          onSubmit={onSubmit}
          orientation={direction}
          errorCallback={errorCallback}
        />
      </FormStyledExample>
    </div>
  );
};

BasicForm.waitForReady = async () => {};

export const BasicFormComplete = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          formDataInitial={getInitialFormData(demoFormData)}
          onSubmit={onSubmit}
          orientation={direction}
          errorCallback={errorCallback}
        />
      </FormStyledExample>
    </div>
  );
};

BasicFormComplete.waitForReady = async () => {};

export const BasicFormInputs = () => (
  <FormStyledExample>
    <FormInputs
      headings={defaultProps.headings}
      formData={{}}
      onFormInputChange={() => {}}
      FormField={defaultProps.FormField}
      componentMap={defaultProps.componentMap as TComponentMap}
      orientation="vert"
    />
  </FormStyledExample>
);

BasicFormInputs.waitForReady = async () => {};

export const BasicFormFileTypesOnly = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  const { componentMap } = useGetComponentMap();
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          headings={fileOnlyHeadings}
          onSubmit={onSubmit}
          orientation={direction}
          componentMap={componentMap}
          errorCallback={errorCallback}
          formDataInitial={getInitialFormData()}
        />
      </FormStyledExample>
    </div>
  );
};

BasicForm.waitForReady = async () => {};
