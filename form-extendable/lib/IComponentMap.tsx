import { EFilterType } from '@react_db_client/constants.client-types';
import { TFieldComponentPropsAll } from './IField';
import { IFile } from './IFile';
import {
  IHeadingBool,
  IHeadingButton,
  IHeadingCustomType,
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
  THeading,
  TMultiSelectValue,
} from './IHeading';

export type TComponentMapComponent<
  V,
  H extends THeading<V>
> = TFieldComponentPropsAll<V, H>;

// export type TComponentMap = Record<
//   EFilterType & string,
//   TComponentMapComponent<any>
// >;

// export type TComponentMapCustom<K extends string | number | symbol> = Record<
//   K,
//   TComponentMapComponent<never>
// >;

// export type TComponentMapFunc = <K extends never>() =>
//   | TComponentMap
//   | TComponentMapCustom<K>;

export type TComponentMap =
  | {
      [EFilterType.uid]: () => TComponentMapComponent<
        string,
        IHeadingOther<string>
      >;
      [EFilterType.text]: () => TComponentMapComponent<
        string,
        IHeadingOther<string>
      >;
      [EFilterType.embedded]: () => TComponentMapComponent<
        null,
        IHeadingOther<null>
      >;
      [EFilterType.button]: () => TComponentMapComponent<
        null,
        IHeadingButton<null>
      >;
      [EFilterType.dict]: () => TComponentMapComponent<
        Object,
        IHeadingOther<Object>
      >;
      [EFilterType.video]: () => TComponentMapComponent<
        string,
        IHeadingOther<string>
      >;
      [EFilterType.textLong]: () => TComponentMapComponent<
        string,
        IHeadingTextArea<string>
      >;
      // TODO: Select search multi
      [EFilterType.selectSearch]: () => TComponentMapComponent<
        any,
        IHeadingSelectSearch<any> | IHeadingSelectMulti<any>
      >;
      // TODO: Select search multi
      [EFilterType.reference]: () => TComponentMapComponent<
        any,
        IHeadingReference<any> | IHeadingReferenceMulti<any>
      >;
      [EFilterType.select]: () => TComponentMapComponent<
        string,
        IHeadingSelect<string>
      >;
      [EFilterType.selectMulti]: () => TComponentMapComponent<
        TMultiSelectValue,
        IHeadingSelectMulti<TMultiSelectValue>
      >;
      [EFilterType.file]: () => TComponentMapComponent<
        IFile,
        IHeadingFile<IFile>
      >;
      [EFilterType.fileMultiple]: () => TComponentMapComponent<
        IFile[],
        IHeadingFile<IFile[]>
      >;
      [EFilterType.image]: () => TComponentMapComponent<
        IFile,
        IHeadingFile<IFile>
      >;
      [EFilterType.number]: () => TComponentMapComponent<
        number,
        IHeadingNumber<number>
      >;
      [EFilterType.date]: () => TComponentMapComponent<
        Date | number | string,
        IHeadingDate<Date | number | string>
      >;
      [EFilterType.bool]: () => TComponentMapComponent<
        boolean,
        IHeadingBool<boolean>
      >;
      [EFilterType.toggle]: () => TComponentMapComponent<
        boolean,
        IHeadingBool<boolean>
      >;
    };
