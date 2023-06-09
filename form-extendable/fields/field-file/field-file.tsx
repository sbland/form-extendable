// TODO: The types in this file need checking
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileManager } from '@react_db_client/components.file-manager';
import { Emoji } from '@react_db_client/components.emoji';
import {
  EFileType,
  FilterObjectClass,
  IFile,
} from '@react_db_client/constants.client-types';
import {
  IFieldComponentProps,
  IHeadingFile,
  IPopupProps,
} from '@form-extendable/lib';
import { FileItem } from './file-list';
import { AddFileButton, AddFileListItem, FileListStyle } from './styles';

export interface IFieldFileProps
  extends IFieldComponentProps<IFile, IHeadingFile> {
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
export const FieldFile: React.FC<IFieldFileProps> = ({
  uid,
  onChange,
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
  if (value && typeof value !== 'object')
    throw Error(`Value must be file type. Got ${value}`);

  const [showFileSelectionPanel, setShowFileSelectionPanel] = useState(false);

  const handleSelected = (fileData: IFile | IFile[] | null) => {
    setShowFileSelectionPanel(false);
    const newData = fileData as IFile;
    onChange && onChange(newData as typeof value);
  };

  const handleFileDelete = () => {
    const newData = null;
    onChange && onChange(newData);
  };

  const asyncGetFilesSetup = React.useMemo(
    () => asyncGetFiles(metaData),
    [asyncGetFiles, metaData]
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
          // handleSelect={() => {}}
          fileType={fileType}
          asyncGetFiles={asyncGetFilesSetup}
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
                <Emoji emoj="🔄" label="swap" />
              </AddFileButton>
            </AddFileListItem>
            {value && (
              <FileItem
                key={value.uid}
                fileData={value}
                fileType={fileType}
                fileServerUrl={fileServerUrl}
                deleteFile={() => handleFileDelete()}
              />
            )}
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
  value: null,
  multiple: false,
  fileType: EFileType.ANY,
  PopupPanel: (({ children, isOpen }) =>
    isOpen ? children : '') as React.FC<IPopupProps>,
};
