import React from 'react';
import {
  EFileType,
  EFilterType,
  FilterObjectClass,
  IDocument,
  IFile,
  TAsyncGetDocuments,
} from '@react_db_client/constants.client-types';
import {
  IFieldComponentProps,
  IPopupProps,
  TComponentMap,
} from '@form-extendable/lib';

import { FieldText } from '@form-extendable/fields.field-text';
import { FieldTextArea } from '@form-extendable/fields.field-text-area';
import { FieldBool } from '@form-extendable/fields.field-bool';
import { FieldDate } from '@form-extendable/fields.field-date';
import { FieldNumber } from '@form-extendable/fields.field-number';
import { FieldSelect } from '@form-extendable/fields.field-select';
import { FieldMultiSelect } from '@form-extendable/fields.field-multi-select';
import {
  searchFnReference,
  FieldSelectSearch,
  FieldSelectSearchMulti,
} from '@form-extendable/fields.field-select-search';
import { FieldFile } from '@form-extendable/fields.field-file';
import { FieldReadOnly } from '@form-extendable/fields.field-read-only';
import { allowReadOnly } from './utils';
import { IObj } from '@form-extendable/lib';

const FieldNotImplemented = () => <>NOT IMPLEMENTED</>;

export const failAll = Object.values(EFilterType).reduce(
  (acc, v) => ({ ...acc, [v]: () => FieldNotImplemented }),
  {}
) as TComponentMap;

export interface IDefaultComponentMapProps {
  asyncGetFiles: (
    metaData?: any
  ) => (filters?: FilterObjectClass[]) => Promise<IFile[]>;
  asyncGetRefObjs: TAsyncGetDocuments<unknown extends IObj ? unknown : IObj>;
  asyncFileUpload: (
    metaData?: any
  ) => (data: File, fileType: EFileType, callback: () => void) => Promise<void>;
  fileServerUrl: string;
  PopupPanel: React.FC<IPopupProps>;
}

const defaultInputs: IDefaultComponentMapProps = {
  asyncFileUpload: (metaData: any) => async () => {
    throw Error('Missing asyncFileUpload prop');
  },
  asyncGetFiles: (metaData: any) => async () => {
    throw Error('Missing asyncGetFiles prop');
  },
  asyncGetRefObjs: async () => {
    throw Error('Missing asyncGetRefObjs prop');
  },
  fileServerUrl: 'MISSING_FILE_SERVER_URL',
  PopupPanel: ({ children }) => <>{children}</>,
};

export const defaultComponentMap = ({
  asyncFileUpload = defaultInputs.asyncFileUpload,
  asyncGetFiles = defaultInputs.asyncGetFiles,
  asyncGetRefObjs = defaultInputs.asyncGetRefObjs,
  fileServerUrl = defaultInputs.fileServerUrl,
  PopupPanel = defaultInputs.PopupPanel,
}: Partial<IDefaultComponentMapProps> = defaultInputs): TComponentMap => ({
  [EFilterType.uid]: () => allowReadOnly(FieldText),
  [EFilterType.text]: () => allowReadOnly(FieldText),
  [EFilterType.select]: () => allowReadOnly(FieldSelect),
  [EFilterType.selectMulti]: () => allowReadOnly(FieldMultiSelect),
  [EFilterType.file]: () =>
    allowReadOnly((props) => (
      <FieldFile
        {...props}
        onChange={(v) => props.onChange(v as IFile | null)}
        PopupPanel={PopupPanel}
        fileServerUrl={fileServerUrl}
        asyncGetFiles={asyncGetFiles}
        asyncFileUpload={asyncFileUpload}
      />
    )),
  [EFilterType.fileMultiple]: () =>
    allowReadOnly((props) => (
      <FieldFile
        {...props}
        onChange={(v) => props.onChange(v as IFile[] | null)}
        PopupPanel={PopupPanel}
        fileServerUrl={fileServerUrl}
        asyncGetFiles={asyncGetFiles}
        asyncFileUpload={asyncFileUpload}
      />
    )),
  [EFilterType.image]: () =>
    allowReadOnly((props) => (
      <FieldFile
        {...props}
        onChange={(v) => props.onChange(v as IFile | null)}
        fileServerUrl={fileServerUrl}
        PopupPanel={PopupPanel}
        asyncGetFiles={asyncGetFiles}
        asyncFileUpload={asyncFileUpload}
      />
    )),
  [EFilterType.textLong]: () => allowReadOnly(FieldTextArea),
  [EFilterType.number]: () => allowReadOnly(FieldNumber),
  [EFilterType.date]: () => allowReadOnly(FieldDate),
  [EFilterType.bool]: () => allowReadOnly(FieldBool),
  [EFilterType.toggle]: () => allowReadOnly(FieldBool),
  [EFilterType.selectSearch]: () =>
    allowReadOnly((props) =>
      props.multiple ? (
        <FieldSelectSearchMulti {...props} multiple />
      ) : (
        <FieldSelectSearch {...props} multiple={false} />
      )
    ),
  [EFilterType.reference]: () =>
    allowReadOnly((props) =>
      props.multiple ? (
        <FieldSelectSearch
          {...props}
          searchFn={searchFnReference(
            asyncGetRefObjs,
            props.collection,
            '_id',
            props.labelField
          )}
          returnFieldOnSelect="_id"
          multiple
          defaultValue={undefined}
        />
      ) : (
        <FieldSelectSearch
          {...props}
          searchFn={searchFnReference(
            asyncGetRefObjs,
            props.collection,
            '_id',
            props.labelField
          )}
          returnFieldOnSelect="_id"
          multiple={false}
          defaultValue={null}
        />
      )
    ),
  [EFilterType.embedded]: () => allowReadOnly(FieldNotImplemented),
  [EFilterType.button]: () => allowReadOnly(FieldNotImplemented),
  [EFilterType.dict]: () => allowReadOnly(FieldNotImplemented),
  [EFilterType.video]: () => allowReadOnly(FieldNotImplemented),
});

export const defaultComponent =
  <T,>() =>
  (props: IFieldComponentProps<T, any>) =>
    <FieldReadOnly {...props} />;
