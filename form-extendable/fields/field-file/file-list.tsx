import React from 'react';
import { EFileType, IFile, Uid } from '@react_db_client/constants.client-types';
import {
  FileItemBtnWrap,
  FileItemDeleteBtn,
  FileListImageItemStyle,
  FileListItemStyle,
  ImageItemDeleteBtn,
} from './styles';
import { Emoji } from '@react_db_client/components.emoji';

export interface IFileItem {
  fileData: IFile;
  fileType: EFileType;
  fileServerUrl: string;
  deleteFile: (fileId: Uid) => void;
}

export const FileItem = ({
  fileData,
  fileType,
  fileServerUrl,
  deleteFile,
}: IFileItem) => {
  const fullFilePath = `${fileServerUrl}/${[fileData.filePath, fileData.name]
    .filter((f) => f)
    .join('/')}`;
  switch (fileType as EFileType) {
    case EFileType.IMAGE:
      return (
        <FileListImageItemStyle key={fileData.uid}>
          <img src={fullFilePath} alt={fileData.label} role="img" />
          <FileItemBtnWrap>
            <ImageItemDeleteBtn onClick={() => deleteFile(fileData.uid)}>
              <Emoji emoj="🗑️" label="Remove" />
            </ImageItemDeleteBtn>
          </FileItemBtnWrap>
        </FileListImageItemStyle>
      );
    default:
      return (
        <FileListItemStyle key={fileData.uid}>
          <p data-testid={`fileLabel_${fileData.uid}`}>{fileData.label}</p>
          <FileItemBtnWrap>
            <FileItemDeleteBtn onClick={() => deleteFile(fileData.uid)}>
              <Emoji emoj="🗑️" label="Remove" />
            </FileItemDeleteBtn>
          </FileItemBtnWrap>
        </FileListItemStyle>
      );
  }
};

export interface IFilesListProps {
  items: IFile[];
  fileType: EFileType;
  fileServerUrl: string;
  deleteFile: (fileId: Uid) => void;
}
