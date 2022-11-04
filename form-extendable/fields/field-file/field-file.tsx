// TODO: The types in this file need checking
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Emoji } from '@react_db_client/components.emoji';
import { FileManager } from '@react_db_client/components.file-manager';
import {
  EItemTypes,
  EViewTypes,
  IItemButton,
  IItemImage,
  ItemList,
} from '@react_db_client/components.item-list';
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

export interface IFieldFileProps<V extends IFile | IFile[]>
  extends IFieldComponentProps<V>,
    IHeadingFile<V> {
  fileServerUrl: string;
  asyncGetFiles: (filters?: FilterObjectClass[]) => Promise<IFile[]>;
  asyncFileUpload: (
    data: File,
    fileType: EFileType,
    callback: () => void
  ) => Promise<void>;
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
    []
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

  const filesData: (IItemImage | IItemButton)[] = useMemo(
    () =>
      fileList &&
      (fileList as IFile[])
        .filter((f) => f)
        .map((file) => ({
          uid: file.uid || file.name,
          label: file.name,
          type:
            fileType === EFileType.IMAGE ? EItemTypes.IMAGE : EItemTypes.BUTTON,
          src: `${fileServerUrl}/${file.filePath}`,
        })),
    [fileList, fileType]
  );

  return (
    <>
      <PopupPanel
        isOpen={showFileSelectionPanel}
        handleClose={() => setShowFileSelectionPanel(false)}
        title="File Selector"
      >
        <FileManager
          handleSelect={handleSelected}
          fileType={fileType}
          allowMultiple={multiple}
          asyncGetFiles={asyncGetFiles}
          fileServerUrl={fileServerUrl}
          asyncFileUpload={asyncFileUpload}
        />
      </PopupPanel>
      <div className="FieldFile">
        <div>
          <button
            type="button"
            className="button-one addFileBtn"
            onClick={() => setShowFileSelectionPanel(true)}
          >
            Add File
          </button>
        </div>
        <div style={{ display: 'flex' }}>
          Files:
          <ItemList
            viewType={
              fileType === EFileType.IMAGE ? EViewTypes.GRID : EViewTypes.LIST
            }
            items={filesData}
            overlayButtons={[
              {
                onClick: (fuid: Uid) => handleFileDelete(fuid),
                label: 'Remove',
                icon: <Emoji emoj="🗑️" label="Remove" />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

const fileValueShape = {
  filePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

FieldFile.propTypes = {
  uid: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape(fileValueShape),
    PropTypes.arrayOf(PropTypes.shape(fileValueShape)),
  ]),
  onChange: PropTypes.func.isRequired,
  fileType: PropTypes.oneOf(['image', 'document', 'data', '*']),
  multiple: PropTypes.bool,
  fileServerUrl: PropTypes.string.isRequired,
  asyncGetFiles: PropTypes.func.isRequired,
  asyncFileUpload: PropTypes.func.isRequired,
  PopupPanel: PropTypes.elementType.isRequired,
};

FieldFile.defaultProps = {
  value: [],
  multiple: false,
  fileType: EFileType.ANY,
  PopupPanel: (({ children, isOpen }) =>
    isOpen ? children : '') as React.FC<IPopupProps>,
};
