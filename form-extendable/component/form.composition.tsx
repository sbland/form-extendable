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

const usePropManager = () => {
  const [orientation, setOrientation] = React.useState<'vert' | 'horiz'>(
    'vert'
  );
  const [showKey, setShowKey] = React.useState(false);
  const [autosave, setAutosave] = React.useState(false);
  const [debounceTimeout, setDebounceTimeout] = React.useState(500);
  const [validateOnBlur, setValidateOnBlur] = React.useState(false);
  const [validateOnChange, setValidateOnChange] = React.useState(false);
  const [formDataInitial, setFormDataInitial] = React.useState({});

  return {
    props: {
      orientation,
      showKey,
      autosave,
      debounceTimeout,
      validateOnBlur,
      validateOnChange,
      formDataInitial,
    },
    setProps: {
      setOrientation,
      setShowKey,
      setAutosave,
      setDebounceTimeout,
      setValidateOnBlur,
      setValidateOnChange,
      setFormDataInitial,
    },
  };
};

const PropManager = ({ props, setProps }) => {
  return (
    <div style={{ display: 'flex' }}>
      <button
        onClick={() =>
          setProps.setOrientation((prev) =>
            prev === 'vert' ? 'horiz' : 'vert'
          )
        }
      >
        {props.orientation}
      </button>

      <button onClick={() => setProps.setAutosave((prev) => !prev)}>
        {props.autosave ? 'Autosave' : 'No Autosave'}
      </button>
      <input
        type="number"
        value={props.debounceTimeout}
        onChange={(e) => {
          setProps.setDebounceTimeout(Number(e.target.value));
        }}
      />
      {/* Button to set validateOnBlur */}
      <button
        style={{
          backgroundColor: props.validateOnBlur ? 'green' : 'red',
        }}
        onClick={() => setProps.setValidateOnBlur((prev) => !prev)}
      >
        Validate on Blur
      </button>
      {/* Button to set validateOnChange */}
      <button
        style={{
          backgroundColor: props.validateOnChange ? 'green' : 'red',
        }}
        onClick={() => setProps.setValidateOnChange((prev) => !prev)}
      >
        Validate on Change
      </button>
      {/* Buttons to set and reset formDataInitial */}
      {/* TODO: Need to implement changing form data initial */}
      {/* <button onClick={() => setProps.setFormDataInitial(getInitialFormData(demoFormData))}>
        Set formDataInitial
      </button>
      <button onClick={() => setProps.setFormDataInitial(getInitialFormData({}))}>
        Reset formDataInitial
      </button> */}
    </div>
  );
};

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
  const { componentMap } = useGetComponentMap();
  const { props, setProps } = usePropManager();
  return (
    <div>
      <PropManager props={props} setProps={setProps} />
      <FormStyledExample>
        <Form
          {...defaultProps}
          {...props}
          onSubmit={onSubmit}
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
  const { props, setProps } = usePropManager();
  return (
    <div>
      <PropManager props={props} setProps={setProps} />
      <FormStyledExample>
        <Form
          {...defaultProps}
          {...props}
          headings={demoNestedHeadings}
          onSubmit={onSubmit}
          errorCallback={errorCallback}
        />
      </FormStyledExample>
    </div>
  );
};

BasicForm.waitForReady = async () => {};

export const BasicFormComplete = () => {
  const { props, setProps } = usePropManager();
  return (
    <div>
      <PropManager props={props} setProps={setProps} />
      <FormStyledExample>
        <Form
          {...defaultProps}
          {...props}
          formDataInitial={getInitialFormData(demoFormData)}
          onSubmit={onSubmit}
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
      onFormInputBlur={() => {}}
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

BasicForm.BasicFormFileTypesOnly = async () => {};

export const BasicFormAutosave = () => {
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
          autosave
        />
      </FormStyledExample>
    </div>
  );
};

BasicFormAutosave.waitForReady = async () => {};
