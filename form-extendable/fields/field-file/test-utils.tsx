import React from 'react';
import { within } from '@testing-library/react';
import { IHeadingFile, IHeadingImage } from '@form-extendable/lib';
import { EFilterType, IFile } from '@react_db_client/constants.client-types';

export type THeadingTypes<T> =
  | IHeadingImage<T extends IFile | IFile[] ? T : never>
  | IHeadingFile<T extends IFile | IFile[] ? T : never>;

export const getDisplayValue = async <T,>(
  formEl: HTMLFormElement,
  heading: THeadingTypes<T>
): Promise<string> => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );
  if (
    heading.type === EFilterType.file ||
    heading.type === EFilterType.fileMultiple
  ) {
    const filesList = within(fieldComponent).getByTestId(
      `files-list-${heading.uid}`
    );

    const filesListItems: string[] = within(filesList)
      .getAllByRole('listitem')
      .map((f) => within(f).queryByTestId('fileLabel_', { exact: false }))
      .map((f) => f && f.textContent)
      .filter((f) => f != null) as string[];
    return filesListItems.join(',');
  } else if (heading.type === EFilterType.image) {
    const filesList = within(fieldComponent).getByTestId(
      `files-list-${heading.uid}`
    );
    const filesListItems: HTMLImageElement[] = within(filesList)
      .getAllByRole('listitem')
      .map<HTMLImageElement[]>((f) => within(f).queryAllByRole('img'))
      .map((f) => f && f[0])
      .filter((f) => f != null) as HTMLImageElement[];
    const imgAlts = filesListItems.map((f) => f.alt);
    return imgAlts.join(',');
  } else {
    console.info(heading);
    throw new Error(`Not Implemented: ${heading.uid}`);
  }
};
