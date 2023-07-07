import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileManager } from '@react_db_client/components.file-manager';
import { Emoji } from '@react_db_client/components.emoji';
import {
  EFileType,
  FilterObjectClass,
  IFile,
  Uid,
} from '@react_db_client/constants.client-types';
import {
  IFieldComponentProps,
  IHeadingFileMulti,
  IPopupProps,
} from '@form-extendable/lib';
import { FileItem } from './file-list';
import { AddFileButton, AddFileListItem, FileListStyle } from './styles';

export interface IFieldFileMultipleProps
  extends IFieldComponentProps<IFile[], IHeadingFileMulti> {
  fileServerUrl: string;
  asyncGetFiles: (
    metaData?: any
  ) => (filters?: FilterObjectClass[]) => Promise<IFile[]>;
  asyncFileUpload: (
    metaData?: any
  ) => (
    data: File,
    fileType: EFileType,
    callback: () => void,
    fileMetaData: Partial<IFile>
  ) => Promise<void>;
  PopupPanel: React.FC<IPopupProps>;
}

/**
 * Form component file field
 *
 * Value should be either a single or array of file objects
 *
 */
export const FieldFileMultiple: React.FC<IFieldFileMultipleProps> = ({
  uid,
  onChange,
  fileType,
  value: fileList,
  fileServerUrl,
  asyncGetFiles,
  asyncFileUpload,
  metaData,
  // TODO: Add required check
  // required,
  PopupPanel,
}) => {
  if (fileList && !Array.isArray(fileList))
    throw Error(
      `Value must be an array of file type. Got ${fileList} with type ${typeof fileList}`
    );

  const [showFileSelectionPanel, setShowFileSelectionPanel] = useState(false);

  const handleSelected = (fileData: IFile | IFile[] | null) => {
    if (!Array.isArray(fileData))
      throw Error('Must return fileData as array if multiple is true');

    setShowFileSelectionPanel(false);
    const newData = [...(fileList || []), ...(fileData as IFile[])];
    onChange && onChange(newData);
  };

  const handleFileDelete = (fuid) => {
    const newFileList = (fileList as IFile[]).filter((f) => f.uid !== fuid);
    onChange && onChange(newFileList);
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
        onClose={() => setShowFileSelectionPanel(false)}
        title="File Selector"
      >
        <FileManager
          handleSelect={handleSelected}
          fileType={fileType}
          allowMultiple
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
                <Emoji emoj="➕" label="add" />
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
  fileType: PropTypes.oneOf(Object.values(EFileType)).isRequired,
};

const valueValidator = PropTypes.shape(fileValueShape).isRequired;

const valueValidatorFull = PropTypes.oneOfType([
  valueValidator,
  PropTypes.arrayOf(valueValidator).isRequired,
]);

FieldFileMultiple.propTypes = {
  uid: PropTypes.string.isRequired,
  // @ts-ignore
  value: valueValidatorFull,
  onChange: PropTypes.func.isRequired,
  fileType: PropTypes.oneOf(Object.values(EFileType)).isRequired,
  // @ts-ignore
  multiple: PropTypes.bool,
  fileServerUrl: PropTypes.string.isRequired,
  asyncGetFiles: PropTypes.func.isRequired,
  asyncFileUpload: PropTypes.func.isRequired,
  PopupPanel: PropTypes.func.isRequired, // React.FC
};

FieldFileMultiple.defaultProps = {
  value: [],
  multiple: true,
  fileType: EFileType.ANY,
  PopupPanel: (({ children, isOpen }) =>
    isOpen ? children : '') as React.FC<IPopupProps>,
};
