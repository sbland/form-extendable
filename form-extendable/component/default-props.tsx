/* eslint react/prop-types: 0 */
import React from 'react';
import { TAsyncGetDocuments } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { IObj, IPopupProps, THeading } from '@form-extendable/lib';
import {
  CustomFieldType,
  demoCustomTypeHeading,
  demoHeadingsData,
  demoRefObjs,
  DEMO_FILES_DATA,
} from './dummy-data';
import { IFormProps } from './form';
import { FormField } from './form-field';
import { errorCallback, onSubmit } from './dummy-api';

const fileServerUrl = 'https://static.bit.dev';

const asyncGetRefObjs: TAsyncGetDocuments<
  unknown extends IObj ? unknown : IObj
> = async (collection): Promise<IObj[]> => {
  return demoRefObjs;
};

// const SimplePopup: React.FC<IPopupProps> = ({
//   isOpen,
//   handleClose,
//   children,
// }) =>
//   isOpen ? (
//     <>
//       <button type="button" onClick={() => handleClose && handleClose()}>
//         Close
//       </button>
//       {children}
//     </>
//   ) : (
//     <></>
//   );

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

export const getComponentMap = (asyncGetFiles, onUpload) => ({
  [demoCustomTypeHeading.type]: () => CustomFieldType,
  ...defaultComponentMap({
    asyncGetFiles: (metaData) => asyncGetFiles,
    asyncGetRefObjs,
    asyncFileUpload: () => async (data, fileType) => onUpload(data, fileType),
    fileServerUrl,
    PopupPanel: SimplePopup,
  }),
});

const componentMap = getComponentMap(
  async () => DEMO_FILES_DATA,
  () => {}
);

export const defaultProps: IFormProps = {
  FormField,
  headings: demoHeadingsData,
  onSubmit,
  componentMap,
  errorCallback,
};
