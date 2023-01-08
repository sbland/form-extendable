import React from 'react';
import { IPopupProps } from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';
import { IFieldFileProps } from './field-file';
import { IFieldFileMultipleProps } from './field-file-multiple';

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

export const DEMO_FILES_DATA_MANY = [
  ...DEMO_FILES_DATA,
  ...Array(100)
    .fill(0)
    .map((_, i) => ({
      uid: `file_${i}`,
      filePath: '',
      label: `FileA with a really long name ${i}`,
      name: 'bit-logo.svg',
      fileType: EFileType.IMAGE,
    })),
];

export const DEMO_IMAGE_FILES_MANY = [
  ...DEMO_IMAGE_FILES_DATA,
  ...Array(100)
    .fill(0)
    .map((_, i) => ({
      uid: `file_${i}`,
      filePath: '',
      label: `FileA with a really long name ${i}`,
      name: `bit-logo_${i}.svg`,
      fileType: EFileType.IMAGE,
    })),
];

export const PopupPanel: React.FC<IPopupProps> = ({
  children,
  isOpen,
  handleClose,
}) => (isOpen ? <>{children}</> : <></>);

const onChange: IFieldFileProps['onChange'] = () => {};
const onChangeMulti: IFieldFileMultipleProps['onChange'] = () => {};

export const dummyProps: IFieldFileProps = {
  uid: 'uid',
  label: 'File Field',
  type: EFilterType.file,
  multiple: false,
  onChange,
  fileType: EFileType.IMAGE,
  value: DEMO_IMAGE_FILES_DATA[0],
  fileServerUrl: 'https://static.bit.dev',
  asyncGetFiles: (metaData) => async () => DEMO_IMAGE_FILES_DATA,
  PopupPanel,
  asyncFileUpload: () => async () => {},
};

export const dummyPropsImagesMany: IFieldFileMultipleProps = {
  ...dummyProps,
  onChange: onChangeMulti,
  type: EFilterType.fileMultiple,
  defaultValue: [],
  multiple: true,
  value: [...DEMO_IMAGE_FILES_MANY].slice(0, 50),
  asyncGetFiles: (metaData) => async () =>
    [...DEMO_IMAGE_FILES_MANY].slice(50, 60),
};

export const dummyPropsDocs: IFieldFileProps = {
  ...dummyProps,
  fileType: EFileType.DOCUMENT,
  value: DEMO_FILES_DATA[0],
  asyncGetFiles: (metaData) => async () => DEMO_FILES_DATA,
};

export const dummyPropsDocsMany: IFieldFileMultipleProps = {
  ...dummyPropsDocs,
  onChange: onChangeMulti,
  type: EFilterType.fileMultiple,
  defaultValue: [],
  multiple: true,
  value: [...DEMO_FILES_DATA_MANY].slice(0, 50),
  asyncGetFiles: (metaData) => async () =>
    [...DEMO_FILES_DATA_MANY].slice(50, 60),
};
