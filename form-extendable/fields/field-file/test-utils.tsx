import React from 'react';
import { within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
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

export const editValueMulti = async (
  value: IFile[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  throw new Error('NOT IMPLEMENTED');
};

export const editValueSingle = async (
  value: IFile,
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );

  const selectFileBtn = within(fieldComponent).getByRole('button', {
    name: 'swap',
  });
  await UserEvent.click(selectFileBtn);

  // 1. check if file already exists
  const searchField = within(fieldComponent).getByPlaceholderText('search...');
  await UserEvent.click(searchField);
  await UserEvent.keyboard(value.label);
  //
  const existingFilesList = within(fieldComponent).getAllByRole('list')[0];

  const displayValue =
    heading.fileType === EFileType.IMAGE ? value.name : value.label;

  // TODO: Handle no elements found
  const selectionInExistingList = await within(existingFilesList)
    .findAllByRole('listitem')
    .then((d) =>
      d?.length > 0
        ? d.find((el) => within(el).queryByText(displayValue))
        : null
    );

  if (!selectionInExistingList) {
    throw new Error('NOT IMPLEMENTED');
    // TODO: Upload file;
  }

  if (!selectionInExistingList) {
    // If after uploading we cannot find the file then there was an error
    throw new Error(`Failed to upload file: ${value}`);
  }

  const selectItemBtn = within(selectionInExistingList).getByRole('button');
  await UserEvent.click(selectItemBtn);
  // TODO: Await complete
};

export const editValue = async (
  value: IFile | IFile[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  if (heading.type === EFilterType.fileMultiple || heading.multiple) {
    return editValueMulti(value as IFile[], formEl, heading);
  } else {
    return editValueSingle(value as IFile, formEl, heading);
  }
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
