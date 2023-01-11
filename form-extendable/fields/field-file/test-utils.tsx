import React from 'react';
import { screen, within } from '@testing-library/react';
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

const queryFileAlreadyUploaded = async (
  value: IFile,
  heading: THeadingTypes,
  fileManager: HTMLElement
) => {
  const searchField = within(fileManager).getByPlaceholderText('search...');
  await UserEvent.click(searchField);
  await UserEvent.keyboard(value.label);

  const sasPanels = within(fileManager).getByTestId(
    'rdc-sas-file-manager-existing-files'
  );
  const existingFilesList = within(sasPanels).getByRole('list');

  const displayValue =
    heading.fileType === EFileType.IMAGE ? value.name : value.label;

  return within(existingFilesList).queryByText(displayValue);
};

export const editValueCommon = async (
  value: IFile,
  heading: THeadingTypes,
  fileManager: HTMLElement
) => {
  const selectionInExistingList = await queryFileAlreadyUploaded(
    value,
    heading,
    fileManager
  );

  if (!selectionInExistingList) {
    const selectFilesBtn = within(fileManager).getByLabelText('Select Files');
    if (!value.data)
      throw Error(`Must supply file data! Fieldid: ${heading.uid}`);
    await UserEvent.upload(selectFilesBtn, value.data);
    const uploadBtn = within(fileManager).getByRole('button', {
      name: 'Upload',
    });
    await UserEvent.click(uploadBtn);

    const sasPanels = within(fileManager).getByTestId(
      'rdc-sas-file-manager-existing-files'
    );
    const loadedFilesList = within(sasPanels).getByRole('list');

    await within(loadedFilesList).findByText(value.name);
  }
};

export const selectInUploadedList = async (
  value: IFile,
  fileManager: HTMLElement
) => {
  const sasPanels = within(fileManager).getByTestId(
    'rdc-sas-file-manager-existing-files'
  );
  const loadedFilesList = within(sasPanels).getByRole('list');

  await within(loadedFilesList).findByText(value.label);
  const selectItemBtn = within(loadedFilesList).getByRole('button', {
    name: value.label,
  });
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
  const fileManager = await screen.findByTestId('rdc-file-manager');
  await editValueCommon(value, heading, fileManager);
  await selectInUploadedList(value, fileManager);
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
  const fileManager = await screen.findByTestId('rdc-file-manager');
  await promiseAllInSeries(
    value.map((v) => async () => {
      await editValueCommon(v, heading, fileManager);
    })
  );

  await promiseAllInSeries(
    value.map((v) => async () => {
      await selectInUploadedList(v, fileManager);
    })
  );

  const acceptSelectionBtn = within(fileManager).getByRole('button', {
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
