/* eslint react/prop-types: 0 */
import React from 'react';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { IObj, IPopupProps, THeading } from '@form-extendable/lib';
import { demoHeadingsData, demoRefObjs } from './dummy-data';
import { IFormProps, IFormSubmit } from './form';
import {
  EFileType,
  IDocument,
  TAsyncGetDocuments,
} from '@react_db_client/constants.client-types';
import { FormField } from './form-field';

const onSubmit = (submissionData: IFormSubmit) => {};
const errorCallback = (err: string) => {};

const fileServerUrl = 'https://static.bit.dev';
const asyncGetFiles = (metaData) => async () => {
  console.info('Getting files');
  console.info(metaData);
  return [];
};

const asyncGetRefObjs: TAsyncGetDocuments<
  unknown extends IObj ? unknown : IObj
> = async (collection): Promise<IObj[]> => {
  console.info('Getting ref objs', collection);
  return demoRefObjs;
};

const asyncFileUpload =
  (metaData) =>
  async (fileData: File, fileType: EFileType, callback: () => void) => {
    console.info('Uploading Files');
    console.info(metaData);
    console.info(fileData);
  };

const SimplePopup: React.FC<IPopupProps> = ({
  isOpen,
  handleClose,
  children,
}) =>
  isOpen ? (
    <>
      <button type="button" onClick={() => handleClose && handleClose()}>
        Close
      </button>
      {children}
    </>
  ) : (
    <></>
  );

const componentMap = defaultComponentMap({
  asyncGetFiles,
  asyncGetRefObjs,
  asyncFileUpload,
  fileServerUrl,
  PopupPanel: SimplePopup,
});

export const defaultProps: IFormProps = {
  FormField,
  headings: demoHeadingsData as THeading<unknown>[],
  onSubmit,
  componentMap,
  errorCallback,
};
