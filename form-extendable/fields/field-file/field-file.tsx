// TODO: The types in this file need checking
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FileManager } from '@react_db_client/components.file-manager';
import { ItemList } from '@react_db_client/components.item-list';
import {
  IFieldComponentProps,
  IFile,
  IHeadingFile,
  IPopupProps,
} from '@form-extendable/lib';
import { FilterObjectClass } from '@react_db_client/constants.client-types';

export interface IFieldFileProps<V extends IFile | IFile[]>
  extends IFieldComponentProps<V>,
    IHeadingFile<V> {
  fileServerUrl: string;
  asyncGetDocuments: (filters: FilterObjectClass[]) => Promise<IFile[]>;
  PopupPanel: React.FC<IPopupProps>;
}

export type Foo = IFieldFileProps<IFile>['onChange'];

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
  collectionId,
  documentId,
  fileType,
  value,
  fileServerUrl,
  asyncGetDocuments,
  // TODO: Add required check
  // required,
  PopupPanel,
}) => {
  if (
    value &&
    (typeof value !== 'object' || (value[0] && typeof value[0] !== 'object'))
  )
    throw Error(`Value must be file type. Got ${value}`);

  const [fileList, setFileList] = useState<IFile[]>(() =>
    value && Array.isArray(value) ? value : (value && [value]) || []
  );
  const [showFileSelectionPanel, setShowFileSelectionPanel] = useState(false);

  useEffect(() => {
    setFileList(
      value && Array.isArray(value) ? value : (value && [value]) || []
    );
  }, [value]);

  const handleSelected = (file: IFile, fileData: IFile | IFile[]) => {
    const newFileList = multiple
      ? [...fileList, ...(fileData as IFile[])]
      : [fileData as IFile];
    setFileList(newFileList);
    setShowFileSelectionPanel(false);
    const newData = multiple
      ? [...fileList, ...(fileData as IFile[])]
      : (fileData as IFile);
    onChange && onChange(newData as typeof value);
  };

  const handleFileDelete = (fuid) => {
    const newFileList = fileList.filter((f) => f.uid !== fuid);
    setFileList(newFileList);
    const newData = multiple ? newFileList : null;
    onChange && onChange(newData);
  };

  const filesData = useMemo(
    () =>
      fileList &&
      fileList
        .filter((f) => f)
        .map((file) => ({
          uid: file.uid || file.name,
          label: file.name,
          type: fileType === 'image' ? 'image' : 'button',
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
          collectionId={collectionId}
          documentId={documentId}
          fileType={fileType}
          allowMultiple={multiple}
          asyncGetDocuments={asyncGetDocuments}
          fileServerUrl={fileServerUrl}
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
            viewType={fileType === 'image' ? 'grid' : 'list'}
            items={filesData}
            overlayButtons={[
              {
                uid: 'remove',
                func: (fuid) => handleFileDelete(fuid),
                label: 'Remove',
                icon: '🗑️',
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
  collectionId: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  fileType: PropTypes.oneOf(['image', 'document', 'data', '*']),
  multiple: PropTypes.bool,
  fileServerUrl: PropTypes.string.isRequired,
  asyncGetDocuments: PropTypes.func.isRequired,
  PopupPanel: PropTypes.elementType.isRequired,
};

FieldFile.defaultProps = {
  value: [],
  multiple: false,
  fileType: '*',
  PopupPanel: (({ children, isOpen }) =>
    isOpen ? children : '') as React.FC<IPopupProps>,
};
