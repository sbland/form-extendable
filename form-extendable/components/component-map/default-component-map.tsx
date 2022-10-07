import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import {
  IFieldComponentProps,
  IFile,
  IPopupProps,
  TComponentMap,
} from '@form-extendable/lib';

import { searchFnReference } from '@form-extendable/fields.field-select-search';
import { FieldText } from '@form-extendable/fields.field-text';
import { FieldTextArea } from '@form-extendable/fields.field-text-area';
import { FieldBool } from '@form-extendable/fields.field-bool';
import { FieldDate } from '@form-extendable/fields.field-date';
import { FieldNumber } from '@form-extendable/fields.field-number';
import { FieldMultiSelect } from '@form-extendable/fields.field-multi-select';
import { FieldSelect } from '@form-extendable/fields.field-select';
import { FieldSelectSearch } from '@form-extendable/fields.field-select-search';
import { FieldFile } from '@form-extendable/fields.field-file';
import { FieldReadOnly } from '@form-extendable/fields.field-read-only';
import { allowReadOnly } from './utils';

const FieldNotImplemented = () => <>NOT IMPLEMENTED</>;

export const failAll = Object.values(EFilterType).reduce(
  (acc, v) => ({ ...acc, [v]: () => FieldNotImplemented }),
  {}
) as TComponentMap;

export interface IDefaultComponentMapProps {
  asyncGetDocuments?: () => Promise<any[]>;
  fileServerUrl?: string;
  PopupPanel?: React.FC<IPopupProps>;
}

export const defaultComponentMap = <V,>({
  asyncGetDocuments = async () => {
    throw Error('Missing asyncGetDocuments prop');
  },
  fileServerUrl = 'MISSING_FILE_SERVER_URL',
  PopupPanel = ({ children }) => <>{children}</>,
}: // additionalComponents:
IDefaultComponentMapProps = {}): TComponentMap => {
  return {
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
          asyncGetDocuments={asyncGetDocuments}
        />
      )),
    [EFilterType.fileMultiple]: () =>
      allowReadOnly((props) => (
        <FieldFile
          {...props}
          onChange={(v) => props.onChange(v as IFile[] | null)}
          PopupPanel={PopupPanel}
          fileServerUrl={fileServerUrl}
          asyncGetDocuments={asyncGetDocuments}
        />
      )),
    [EFilterType.image]: () =>
      allowReadOnly((props) => (
        <FieldFile
          {...props}
          onChange={(v) => props.onChange(v as IFile | null)}
          fileServerUrl={fileServerUrl}
          PopupPanel={PopupPanel}
          asyncGetDocuments={asyncGetDocuments}
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
          <FieldSelectSearch {...props} multiple={true} />
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
              asyncGetDocuments,
              props.collection,
              '_id',
              props.labelField
            )}
            returnFieldOnSelect="_id"
            multiple={true}
            defaultValue={undefined}
          />
        ) : (
          <FieldSelectSearch
            {...props}
            searchFn={searchFnReference(
              asyncGetDocuments,
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
  };
};

export const defaultComponent =
  <T,>() =>
  (props: IFieldComponentProps<T>) =>
    <FieldReadOnly {...props} />;
