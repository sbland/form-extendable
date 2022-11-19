import React from 'react';
import { IPopupProps } from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';
import { IFieldFileProps } from './field-file';

export const DEMO_IMAGE_FILES_DATA: IFile[] = [
  {
    uid: 'a',
    filePath: '',
    label: 'FileA',
    name: 'bit-logo.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'b',
    filePath: 'extensions-icons',
    label: 'FileB',
    name: 'vue_grey.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'c',
    filePath: 'Community/app-components',
    label: 'FileC',
    name: 'card.jpg',
    fileType: EFileType.IMAGE,
  },
];

export const DEMO_FILES_DATA: IFile[] = [
  {
    uid: 'a',
    filePath: '',
    label: 'FileA with a really long name',
    name: 'bit-logo.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'b',
    filePath: 'extensions-icons',
    label: 'FileB',
    name: 'vue_grey.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'c',
    filePath: 'Community/app-components',
    label: 'FileC',
    name: 'card.jpg',
    fileType: EFileType.IMAGE,
  },
];

export const DEMO_FILES_DATA_MANY = Array(100)
  .fill(0)
  .map((_, i) => ({
    uid: `file_${i}`,
    filePath: '',
    label: `FileA with a really long name ${i}`,
    name: 'bit-logo.svg',
    fileType: EFileType.IMAGE,
  }));

export const PopupPanel: React.FC<IPopupProps> = ({
  children,
  isOpen,
  handleClose,
}) => (isOpen ? <>{children}</> : <></>);
const onChange: IFieldFileProps<IFile[] | IFile>['onChange'] = () => {};

export const dummyProps: IFieldFileProps<IFile[] | IFile> = {
  uid: 'uid',
  label: 'File Field',
  type: EFilterType.file,
  multiple: true,
  onChange,
  fileType: EFileType.IMAGE,
  value: DEMO_IMAGE_FILES_DATA,
  fileServerUrl: 'https://static.bit.dev',
  asyncGetFiles: (metaData) => async () => DEMO_IMAGE_FILES_DATA,
  PopupPanel,
  asyncFileUpload: () => async () => {},
};

export const dummyPropsImagesMany: IFieldFileProps<IFile[] | IFile> = {
  ...dummyProps,
  value: DEMO_FILES_DATA_MANY,
  asyncGetFiles: (metaData) => async () => DEMO_FILES_DATA_MANY,
};

export const dummyPropsDocs: IFieldFileProps<IFile[] | IFile> = {
  ...dummyProps,
  fileType: EFileType.DOCUMENT,
  value: DEMO_FILES_DATA,
  asyncGetFiles: (metaData) => async () => DEMO_FILES_DATA,
};

export const dummyPropsDocsMany: IFieldFileProps<IFile[] | IFile> = {
  ...dummyPropsDocs,
  value: DEMO_FILES_DATA_MANY,
  asyncGetFiles: (metaData) => async () => DEMO_FILES_DATA_MANY,
};
