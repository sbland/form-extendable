import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
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

const promiseAllInSeries = async (iterable) => {
  for (const x of iterable) {
    await x();
  }
};

const getFileInUploadedList = async (
  value: IFile,
  heading: THeadingTypes,
  fieldComponent: HTMLElement
) => {
  const searchField = within(fieldComponent).getByPlaceholderText('search...');
  await UserEvent.click(searchField);
  await UserEvent.keyboard(value.label);

  const sasPanels = within(fieldComponent)
    .getAllByTestId('styledSelectList')
    .filter(
      (s) => within(s).queryAllByRole('listitem').length > 0
    ) as HTMLUListElement[];
  expect(sasPanels.length).toEqual(1);
  const existingFilesList = within(sasPanels[0]).getByRole('list');

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

  return selectionInExistingList;
};

export const editValueCommon = async (
  value: IFile,
  heading: THeadingTypes,
  fieldComponent: HTMLElement
) => {
  const selectionInExistingList = await getFileInUploadedList(
    value,
    heading,
    fieldComponent
  );

  if (!selectionInExistingList) {
    const selectFilesBtn =
      within(fieldComponent).getByLabelText('Select Files');
    if (!value.data)
      throw Error(`Must supply file data! Fieldid: ${heading.uid}`);
    await UserEvent.upload(selectFilesBtn, value.data);
    const uploadBtn = within(fieldComponent).getByRole('button', {
      name: 'Upload',
    });
    await UserEvent.click(uploadBtn);

    const sasPanels = within(fieldComponent)
      .getAllByTestId('styledSelectList')
      .filter(
        (s) => within(s).queryAllByRole('listitem').length > 0
      ) as HTMLUListElement[];

    expect(sasPanels.length).toEqual(1);

    const loadedFilesList = within(sasPanels[0]).getByRole('list');

    await within(loadedFilesList).findByText(value.name);
    const newItem = within(loadedFilesList)
      .getAllByRole('listitem')
      .find((el) => within(el).queryByText(value.name)) as HTMLUListElement;

    if (!newItem) {
      // If after uploading we cannot find the file then there was an error
      throw new Error(`Failed to upload file: ${value}`);
    }
  }
};

export const selectInUploadedList = async (value, fieldComponent) => {
  const sasPanels = within(fieldComponent)
    .getAllByTestId('styledSelectList')
    .filter(
      (s) => within(s).queryAllByRole('listitem').length > 0
    ) as HTMLUListElement[];

  expect(sasPanels.length).toEqual(1);

  const loadedFilesList = within(sasPanels[0]).getByRole('list');

  await within(loadedFilesList).findByText(value.label);
  const selectionInExistingList = within(loadedFilesList)
    .getAllByRole('listitem')
    .find((el) => within(el).queryByText(value.label)) as HTMLUListElement;

  const selectItemBtn = within(selectionInExistingList).getByRole('button');
  await UserEvent.click(selectItemBtn);
};

export const editValueSingle = async (
  value: IFile,
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );

  const selectFileBtn: HTMLButtonElement = within(fieldComponent).getByRole(
    'button',
    {
      name: 'swap',
    }
  );
  await UserEvent.click(selectFileBtn);
  await editValueCommon(value, heading, fieldComponent);
  await selectInUploadedList(value, fieldComponent);
};

export const editValueMulti = async (
  value: IFile[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );

  const selectFileBtn: HTMLButtonElement = within(fieldComponent).getByRole(
    'button',
    {
      name: 'add',
    }
  );
  await UserEvent.click(selectFileBtn);
  await promiseAllInSeries(
    value.map((v) => async () => {
      await editValueCommon(v, heading, fieldComponent);
    })
  );

  await promiseAllInSeries(
    value.map((v) => async () => {
      await selectInUploadedList(v, fieldComponent);
    })
  );

  const acceptSelectionBtn = within(fieldComponent).getByRole('button', {
    name: /Accept Selection/,
  });
  await UserEvent.click(acceptSelectionBtn);
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
