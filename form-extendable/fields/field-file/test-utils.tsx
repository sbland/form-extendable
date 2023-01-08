import React from 'react';
import { within } from '@testing-library/react';
import {
  IHeadingFile,
  IHeadingFileMulti,
  IHeadingImage,
  IHeadingImageMulti,
} from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';

export type THeadingTypes =
  | IHeadingImage
  | IHeadingFile
  | IHeadingImageMulti
  | IHeadingFileMulti;

export const editValue = async (
  value: string | string[] | IFile | IFile[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  throw Error('Not Implemented');
};

export const getDisplayValue = async <T,>(
  formEl: HTMLFormElement,
  heading: THeadingTypes
): Promise<string> => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );
  if (
    (heading.type === EFilterType.file ||
      heading.type === EFilterType.fileMultiple) &&
    heading.fileType !== EFileType.IMAGE
  ) {
    const filesList = within(fieldComponent).getByTestId(
      `files-list-${heading.uid}`
    );

    const filesListItems: string[] = within(filesList)
      .getAllByRole('listitem')
      .map((f) => within(f).queryByTestId('fileLabel_', { exact: false }))
      .map((f) => f && f.textContent)
      .filter((f) => f != null) as string[];
    return filesListItems.filter((f) => f).join(',');
  } else if (
    heading.type === EFilterType.image ||
    heading.fileType === EFileType.IMAGE
  ) {
    const filesList = within(fieldComponent).getByTestId(
      `files-list-${heading.uid}`
    );
    const filesListItems: HTMLImageElement[] = within(filesList)
      .getAllByRole('listitem')
      .map<HTMLImageElement[]>((f) => within(f).queryAllByRole('img'))
      .map((f) => f && f[0])
      .filter((f) => f != null) as HTMLImageElement[];
    const imgAlts = filesListItems.filter((f) => f).map((f) => f.alt);
    return imgAlts.filter((f) => f).join(',');
  } else {
    console.info(heading);
    throw new Error(`Not Implemented: ${heading.uid}`);
  }
};
