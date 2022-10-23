import { EFilterType, IFile } from '@react_db_client/constants.client-types';
import { TFieldReactComponent } from './IField';
import {
  IHeadingBool,
  IHeadingButton,
  IHeadingDate,
  IHeadingFile,
  IHeadingNumber,
  IHeadingOther,
  IHeadingReference,
  IHeadingReferenceMulti,
  IHeadingSelect,
  IHeadingSelectMulti,
  IHeadingSelectSearch,
  IHeadingTextArea,
  TMultiSelectValue,
} from './IHeading';

export type TComponentMap = {
  [EFilterType.uid]: () => TFieldReactComponent<string, IHeadingOther<string>>;
  [EFilterType.text]: () => TFieldReactComponent<string, IHeadingOther<string>>;
  [EFilterType.embedded]: () => TFieldReactComponent<null, IHeadingOther<null>>;
  [EFilterType.button]: () => TFieldReactComponent<null, IHeadingButton<null>>;
  [EFilterType.dict]: () => TFieldReactComponent<Object, IHeadingOther<Object>>;
  [EFilterType.video]: () => TFieldReactComponent<
    string,
    IHeadingOther<string>
  >;
  [EFilterType.textLong]: () => TFieldReactComponent<
    string,
    IHeadingTextArea<string>
  >;
  // TODO: Select search multi
  [EFilterType.selectSearch]: () => TFieldReactComponent<
    any,
    IHeadingSelectSearch<any> | IHeadingSelectMulti<any>
  >;
  // TODO: Select search multi
  [EFilterType.reference]: () => TFieldReactComponent<
    any,
    IHeadingReference<any> | IHeadingReferenceMulti<any>
  >;
  [EFilterType.select]: () => TFieldReactComponent<
    string,
    IHeadingSelect<string>
  >;
  [EFilterType.selectMulti]: () => TFieldReactComponent<
    TMultiSelectValue,
    IHeadingSelectMulti<TMultiSelectValue>
  >;
  [EFilterType.file]: () => TFieldReactComponent<IFile, IHeadingFile<IFile>>;
  [EFilterType.fileMultiple]: () => TFieldReactComponent<
    IFile[],
    IHeadingFile<IFile[]>
  >;
  [EFilterType.image]: () => TFieldReactComponent<IFile, IHeadingFile<IFile>>;
  [EFilterType.number]: () => TFieldReactComponent<
    number,
    IHeadingNumber<number>
  >;
  [EFilterType.date]: () => TFieldReactComponent<
    Date | number | string,
    IHeadingDate<Date | number | string>
  >;
  [EFilterType.bool]: () => TFieldReactComponent<
    boolean,
    IHeadingBool<boolean>
  >;
  [EFilterType.toggle]: () => TFieldReactComponent<
    boolean,
    IHeadingBool<boolean>
  >;
};
