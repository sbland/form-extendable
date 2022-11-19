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

export interface IHeading<T = unknown> {
  hideLabel?: boolean;
  label: string;
  required?: boolean;
  uid: string;
  hasChanged?: boolean;
  readOnly?: boolean;
  defaultValue?: T;
  group?: number;
}

export interface IHeadingNumber<T extends number | string = number>
  extends IHeading<T> {
  type: EFilterType.number;
  min?: number;
  max?: number;
  step?: number;
}

export interface IHeadingDate<T extends Date | number | string>
  extends IHeading<T> {
  type: EFilterType.date;
  min?: number;
  max?: number;
}

export interface IHeadingBool<T extends boolean = boolean> extends IHeading<T> {
  type: EFilterType.bool | EFilterType.toggle;
  checkboxContent?: string;
  useToggle?: boolean;
}

export interface IHeadingSelect<T extends Uid = Uid> extends IHeading<T> {
  type: EFilterType.select | EFilterType.selectMulti;
  options: {
    uid: Uid;
    label: string;
  }[];
  labelField?: string;
  asDropdown?: boolean;
  selectType?: 'showall' | 'dropdown' | 'toggle';
}

export type TMultiSelectValue =
  | IOpt
  | IOpt[]
  | (string | number)
  | (string | number)[];

export interface IHeadingSelectMulti<
  T extends TMultiSelectValue = TMultiSelectValue
> extends IHeading<T> {
  type: EFilterType.select | EFilterType.selectMulti;
  options: {
    uid: string;
    label: string;
  }[];
  labelField?: string;
  asDropdown?: boolean;
  selectType?: 'showall' | 'hideunselected' | 'dropdown';
}

export interface IHeadingEmbedded<T = unknown> extends IHeading<T> {
  type: EFilterType.embedded;
  showTitle: boolean;
  orientation?: 'vert' | 'horiz';
  children: THeading<unknown>[];
}

export interface IHeadingSelectSearch<T extends IObj> extends IHeading<T> {
  type: EFilterType.selectSearch | EFilterType.reference;
  searchFieldTargetField: string;
  labelField?: string;
  multiple?: false;
  allowEmptySearch?: boolean;
  returnFieldOnSelect?: string;
  searchFn: (filters?: FilterObjectClass[]) => Promise<T[]>;
}

export interface IHeadingSelectSearchMulti<T extends IObj> extends IHeading<T> {
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

export interface IHeadingFile<T extends IFile | IFile[]> extends IHeading<T> {
  type: EFilterType.file | EFilterType.fileMultiple;
  // collectionId: string;
  // documentId: string;
  metaData?: any;
  fileType: EFileType;
}

export interface IHeadingImage<T extends  IFile | IFile[]> extends IHeading<T> {
  type: EFilterType.image;
  // collectionId: string;
  // documentId: string;
  fileType: 'image';
}

export interface IHeadingButton<T = unknown> extends IHeading<T> {
  type: EFilterType.button;
  onClick: () => void;
}

export interface IHeadingTextArea<T extends string = string>
  extends IHeading<T> {
  type: EFilterType.textLong;
  initHeight?: number;
  scaleToContent?: boolean;
  styleOverrides?: React.CSSProperties;
}

export interface IHeadingVideo<T = unknown> extends IHeading<T> {
  type: EFilterType.video;
  url: string;
}

export interface IHeadingCustomType<T = unknown>
  extends Omit<IHeading<T>, 'type'> {
  type: string;
  customType: true;
}

/* These are headings that have not additional props */
export interface IHeadingOther<T = unknown> extends Omit<IHeading<T>, 'type'> {
  type:
    | EFilterType.dict
    | EFilterType.date
    | EFilterType.uid
    | EFilterType.text
    | EFilterType.textLong;
}

export type THeading<T> =
  | IHeadingNumber<T extends number ? T : never>
  | IHeadingDate<T extends Date | string | number ? T : never>
  | IHeadingBool<T extends boolean ? T : never>
  | IHeadingCustomType<T>
  | IHeadingFile<T extends IFile | IFile[] ? T : never>
  | IHeadingImage<T extends  IFile | IFile[] ? T : never>
  | IHeadingSelect<T extends string ? T : never>
  | IHeadingSelectSearch<T extends IObj ? T : never>
  | IHeadingSelectSearchMulti<T extends IObj ? T : never>
  | IHeadingSelectMulti<T extends TMultiSelectValue ? T : never>
  | IHeadingEmbedded<T>
  | IHeadingReference<T extends IObj ? T : never>
  | IHeadingReferenceMulti<T extends IObj ? T : never>
  | IHeadingButton<T>
  | IHeadingVideo<T>
  | IHeadingOther<T>;
