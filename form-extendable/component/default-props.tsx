/* eslint react/prop-types: 0 */
import React from 'react';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { IPopupProps } from '@form-extendable/lib';
import { demoHeadingsData } from './dummy-data';
import { IFormProps } from './form';

const onSubmit = () => {};
const errorCallback = () => {};

const fileServerUrl = 'FILE_SERVER_URL';
const asyncGetFiles = async () => {
  console.info('Getting files');
  return [];
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
  fileServerUrl,
  PopupPanel: SimplePopup,
});

export const defaultProps: IFormProps = {
  headings: demoHeadingsData,
  onSubmit,
  componentMap,
  errorCallback,
};
