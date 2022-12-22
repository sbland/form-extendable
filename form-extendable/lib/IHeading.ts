import {
  EFileType,
  EFilterType,
  FilterObjectClass,
  IFile,
  Uid,
} from '@react_db_client/constants.client-types';
import { IObj } from './IObj';
import { IOpt } from './IOpt';

/* These are filter types that do not have a type */
export type GenericFilterTypes = EFilterType.bool | EFilterType.button;

export interface IHeading<T, InputType> {
  hideLabel?: boolean;
  label: string;
  required?: boolean;
  uid: string;
  hasChanged?: boolean;
  readOnly?: boolean;
  defaultValue?: T;
  group?: number;
  inputProps?: Omit<
    React.HTMLProps<InputType>,
    'defaultValue' | 'value' | 'onChange' | 'type'
  >;
}

export interface IHeadingNumber extends IHeading<number, HTMLInputElement> {
  type: EFilterType.number;
  min?: number;
  max?: number;
  step?: number;
}

export interface IHeadingDate
  extends IHeading<Date | number | string, HTMLInputElement> {
  type: EFilterType.date;
  min?: number;
  max?: number;
}

export interface IHeadingBool extends IHeading<boolean, HTMLInputElement> {
  type: EFilterType.bool | EFilterType.toggle;
  checkboxContent?: string;
  useToggle?: boolean;
}

export interface IHeadingSelect extends IHeading<Uid, HTMLInputElement> {
  type: EFilterType.select | EFilterType.selectMulti;
  options: {
    uid: Uid;
    label: string;
  }[];
  labelField?: string;
  multiple?: boolean;
  asDropdown?: boolean;
  selectType?: 'showall' | 'dropdown' | 'toggle';
}

export type TMultiSelectValue =
  | IOpt
  | IOpt[]
  | (string | number)
  | (string | number)[];

export interface IHeadingSelectMulti
  extends IHeading<TMultiSelectValue, HTMLInputElement> {
  type: EFilterType.select | EFilterType.selectMulti;
  options: {
    uid: string;
    label: string;
  }[];
  labelField?: string;
  asDropdown?: boolean;
  selectType?: 'showall' | 'hideunselected' | 'dropdown';
}

export interface IHeadingEmbedded extends IHeading<unknown, HTMLInputElement> {
  type: EFilterType.embedded;
  showTitle: boolean;
  orientation?: 'vert' | 'horiz';
  children: THeading<unknown>[];
}

export interface IHeadingSelectSearch<T extends IObj>
  extends IHeading<T, HTMLInputElement> {
  type: EFilterType.selectSearch | EFilterType.reference;
  searchFieldTargetField: string;
  labelField?: string;
  multiple?: false;
  allowEmptySearch?: boolean;
  returnFieldOnSelect?: string;
  searchFn: (filters?: FilterObjectClass[]) => Promise<T[]>;
}

export interface IHeadingSelectSearchMulti<T extends IObj>
  extends IHeading<T, HTMLInputElement> {
  type: EFilterType.selectSearch | EFilterType.reference;
  searchFieldTargetField: string;
  labelField?: string;
  multiple: true;
  allowEmptySearch?: boolean;
  returnFieldOnSelect: string;
  searchFn: (filters?: FilterObjectClass[]) => Promise<T[]>;
}

export interface IHeadingReference<T extends IObj>
  extends Omit<IHeadingSelectSearch<T>, 'searchFn'> {
  collection: string;
}
export interface IHeadingReferenceMulti<T extends IObj>
  extends Omit<IHeadingSelectSearchMulti<T>, 'searchFn'> {
  collection: string;
}

export interface IHeadingFile<T extends IFile | IFile[]>
  extends IHeading<T, HTMLInputElement> {
  type: EFilterType.file | EFilterType.fileMultiple;
  // collectionId: string;
  // documentId: string;
  multiple?: boolean;
  metaData?: any;
  fileType: EFileType;
}

export interface IHeadingImage<T extends IFile | IFile[]>
  extends IHeading<T, HTMLInputElement> {
  type: EFilterType.image;
  // collectionId: string;
  // documentId: string;
  fileType: 'image';
}

export interface IHeadingButton extends IHeading<never, HTMLButtonElement> {
  type: EFilterType.button;
  onClick: () => void;
}

export interface IHeadingTextArea
  extends IHeading<string, HTMLTextAreaElement> {
  type: EFilterType.textLong;
  initHeight?: number;
  scaleToContent?: boolean;
  styleOverrides?: React.CSSProperties;
}

export interface IHeadingVideo extends IHeading<string, HTMLInputElement> {
  type: EFilterType.video;
  url: string;
}
export interface IHeadingText
  extends Omit<IHeading<string, HTMLInputElement>, 'type'> {
  type: EFilterType.text | EFilterType.uid;
}

export interface IHeadingDict
  extends Omit<IHeading<string, HTMLInputElement>, 'type'> {
  type: EFilterType.dict;
}

export interface IHeadingCustomType<T = unknown>
  extends Omit<IHeading<T, HTMLInputElement>, 'type'> {
  type: string;
  customType: true;
}

export type THeading<T> =
  | IHeadingNumber
  | IHeadingTextArea
  | IHeadingDate
  | IHeadingBool
  | IHeadingCustomType<T>
  | IHeadingFile<T extends IFile | IFile[] ? T : never>
  | IHeadingImage<T extends IFile | IFile[] ? T : never>
  | IHeadingSelect
  | IHeadingSelectSearch<T extends IObj ? T : never>
  | IHeadingSelectSearchMulti<T extends IObj ? T : never>
  | IHeadingSelectMulti
  | IHeadingEmbedded
  | IHeadingReference<T extends IObj ? T : never>
  | IHeadingReferenceMulti<T extends IObj ? T : never>
  | IHeadingButton
  | IHeadingVideo
  | IHeadingText
  | IHeadingDict;
