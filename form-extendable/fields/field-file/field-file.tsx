// TODO: The types in this file need checking
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileManager } from '@react_db_client/components.file-manager';
import {
  EFileType,
  FilterObjectClass,
  IFile,
  Uid,
} from '@react_db_client/constants.client-types';
import {
  IFieldComponentProps,
  IHeadingFile,
  IPopupProps,
} from '@form-extendable/lib';
import { FileItem } from './file-list';
import { AddFileButton, AddFileListItem, FileListStyle } from './styles';
import { Emoji } from '@react_db_client/components.emoji';

export interface IFieldFileProps<V extends IFile | IFile[]>
  extends IFieldComponentProps<V>,
    IHeadingFile<V> {
  fileServerUrl: string;
  asyncGetFiles: (
    metaData?: any
  ) => (filters?: FilterObjectClass[]) => Promise<IFile[]>;
  asyncFileUpload: (
    metaData?: any
  ) => (data: File, fileType: EFileType, callback: () => void) => Promise<void>;
  PopupPanel: React.FC<IPopupProps>;
}

const asArray = (value) =>
  Array.isArray(value) ? value : [value].filter((v) => v != null);

/**
 * Form component file field
 *
 * Value should be either a single or array of file objects
 *
 */
export const FieldFile: React.FC<IFieldFileProps<IFile | IFile[]>> = ({
  uid,
  multiple,
  onChange,
  // collectionId,
  // documentId,
  fileType,
  value,
  fileServerUrl,
  asyncGetFiles,
  asyncFileUpload,
  metaData,
  // TODO: Add required check
  // required,
  PopupPanel,
}) => {
  if (
    value &&
    (typeof value !== 'object' || (value[0] && typeof value[0] !== 'object'))
  )
    throw Error(`Value must be file type. Got ${value}`);

  const [fileListRaw, setFileList] = useState<IFile[]>(asArray(value));

  const fileList = React.useMemo(
    () =>
      fileListRaw && Array.isArray(fileListRaw)
        ? fileListRaw
        : (fileListRaw && [fileListRaw]) || [],
    [fileListRaw]
  );
  const [showFileSelectionPanel, setShowFileSelectionPanel] = useState(false);

  const handleSelected = (fileData: IFile | IFile[] | null) => {
    if (multiple && !Array.isArray(fileData))
      throw Error('Must return fileData as array if multiple is true');
    const newFileList: IFile[] = multiple
      ? ([...fileList, ...(fileData as IFile[])] as IFile[])
      : ([fileData as IFile] as IFile[]);
    setFileList(newFileList as IFile[]);
    setShowFileSelectionPanel(false);
    const newData = multiple
      ? [...fileList, ...(fileData as IFile[])]
      : (fileData as IFile);
    onChange && onChange(newData as typeof value);
  };

  const handleFileDelete = (fuid) => {
    const newFileList = (fileList as IFile[]).filter((f) => f.uid !== fuid);
    setFileList(newFileList as IFile[]);
    const newData = multiple ? newFileList : null;
    onChange && onChange(newData);
  };

  const itemsRendered = React.useMemo(
    () =>
      fileList?.map((f) => (
        <FileItem
          key={f.uid}
          fileData={f}
          fileType={fileType}
          fileServerUrl={fileServerUrl}
          deleteFile={(fuid: Uid) => handleFileDelete(fuid)}
        />
      )),
    [fileList, fileType, fileServerUrl]
  );

  return (
    <>
      <PopupPanel
        id={`field-file-popup_${uid}`}
        isOpen={showFileSelectionPanel}
        handleClose={() => setShowFileSelectionPanel(false)}
        title="File Selector"
      >
        <FileManager
          handleSelect={handleSelected}
          fileType={fileType}
          allowMultiple={multiple}
          asyncGetFiles={asyncGetFiles(metaData)}
          fileServerUrl={fileServerUrl}
          asyncFileUpload={asyncFileUpload(metaData)}
        />
      </PopupPanel>
      <div className="FieldFile">
        <div style={{ display: 'flex' }} data-testid={`files-list-${uid}`}>
          <FileListStyle>
            <AddFileListItem>
              <AddFileButton
                type="button"
                className="button-one addFileBtn"
                onClick={() => setShowFileSelectionPanel(true)}
              >
                {multiple ? '+' : <Emoji emoj="🔄" label="swap" />}
              </AddFileButton>
            </AddFileListItem>
            {itemsRendered}
          </FileListStyle>
        </div>
      </div>
    </>
  );
};

const fileValueShape = {
  filePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  fileType: PropTypes.oneOf(Object.values(EFileType)).isRequired,
};

const valueValidator = PropTypes.shape(fileValueShape).isRequired;

const valueValidatorFull = PropTypes.oneOfType([
  valueValidator,
  PropTypes.arrayOf(valueValidator).isRequired,
]);

FieldFile.propTypes = {
  uid: PropTypes.string.isRequired,
  value: valueValidatorFull,
  onChange: PropTypes.func.isRequired,
  fileType: PropTypes.oneOf(Object.values(EFileType)).isRequired,
  multiple: PropTypes.bool,
  fileServerUrl: PropTypes.string.isRequired,
  asyncGetFiles: PropTypes.func.isRequired,
  asyncFileUpload: PropTypes.func.isRequired,
  PopupPanel: PropTypes.func.isRequired, // React.FC
};

FieldFile.defaultProps = {
  value: [],
  multiple: false,
  fileType: EFileType.ANY,
  PopupPanel: (({ children, isOpen }) =>
    isOpen ? children : '') as React.FC<IPopupProps>,
};
