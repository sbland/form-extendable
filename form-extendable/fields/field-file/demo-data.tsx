import React from 'react';
import { IPopupProps } from '@form-extendable/lib';
import { IFieldFileProps } from './field-file';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';

export const DEMO_FILES_DATA: IFile[] = [
  {
    uid: 'a',
    filePath: 'files/fileA.jpg',
    label: 'FileA',
    name: 'FileA.jpg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'b',
    filePath: 'files/fileB.jpg',
    label: 'FileA',
    name: 'FileA.jpg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'c',
    filePath: 'files/fileC.jpg',
    label: 'FileA',
    name: 'FileA.jpg',
    fileType: EFileType.IMAGE,
  },
];

export const PopupPanel: React.FC<IPopupProps> = ({
  children,
  isOpen,
  handleClose,
}) => <>{children}</>;
const onChange: IFieldFileProps<IFile[] | IFile>['onChange'] = () => {};

export const dummyProps: IFieldFileProps<IFile[] | IFile> = {
  uid: 'uid',
  label: 'File Field',
  type: EFilterType.file,
  multiple: true,
  onChange,
  fileType: EFileType.IMAGE,
  value: DEMO_FILES_DATA,
  fileServerUrl: 'fileserver',
  asyncGetFiles: async () => DEMO_FILES_DATA,
  PopupPanel,
  asyncFileUpload: async () => {},
};
