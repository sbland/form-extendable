import {
  EFilterType,
  IFile,
  Uid,
} from '@react_db_client/constants.client-types';
import { TFieldReactComponent } from './IField';
import {
  IHeadingBool,
  IHeadingButton,
  IHeadingDate,
  IHeadingDict,
  IHeadingEmbedded,
  IHeadingFile,
  IHeadingFileMulti,
  IHeadingNumber,
  IHeadingReference,
  IHeadingReferenceMulti,
  IHeadingSelect,
  IHeadingSelectMulti,
  IHeadingSelectSearch,
  IHeadingText,
  IHeadingTextArea,
  IHeadingVideo,
  TMultiSelectValue,
} from './IHeading';

export type TComponentMap = {
  [EFilterType.uid]: () => TFieldReactComponent<string, IHeadingText>;
  [EFilterType.text]: () => TFieldReactComponent<string, IHeadingText>;
  [EFilterType.embedded]: () => TFieldReactComponent<null, IHeadingEmbedded>;
  [EFilterType.button]: () => TFieldReactComponent<null, IHeadingButton>;
  [EFilterType.dict]: () => TFieldReactComponent<Object, IHeadingDict>;
  [EFilterType.video]: () => TFieldReactComponent<string, IHeadingVideo>;
  [EFilterType.textLong]: () => TFieldReactComponent<string, IHeadingTextArea>;
  // TODO: Select search multi
  [EFilterType.selectSearch]: () => TFieldReactComponent<
    any,
    IHeadingSelectSearch<any> | IHeadingSelectMulti
  >;
  // TODO: Select search multi
  [EFilterType.reference]: () => TFieldReactComponent<
    any,
    IHeadingReference<any> | IHeadingReferenceMulti<any>
  >;
  [EFilterType.select]: () => TFieldReactComponent<Uid, IHeadingSelect>;
  [EFilterType.selectMulti]: () => TFieldReactComponent<
    TMultiSelectValue,
    IHeadingSelectMulti
  >;
  [EFilterType.file]: () => TFieldReactComponent<IFile, IHeadingFile>;
  [EFilterType.fileMultiple]: () => TFieldReactComponent<
    IFile[],
    IHeadingFileMulti
  >;
  [EFilterType.image]: () => TFieldReactComponent<IFile, IHeadingFile>;
  [EFilterType.number]: () => TFieldReactComponent<number, IHeadingNumber>;
  [EFilterType.date]: () => TFieldReactComponent<
    Date | number | string,
    IHeadingDate
  >;
  [EFilterType.bool]: () => TFieldReactComponent<boolean, IHeadingBool>;
  [EFilterType.toggle]: () => TFieldReactComponent<boolean, IHeadingBool>;
};
