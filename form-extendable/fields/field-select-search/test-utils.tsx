import React from 'react';
import { within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  IHeadingSelect,
  IHeadingSelectSearch,
  IHeadingSelectSearchMulti,
  IObj,
} from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export type THeadingTypes =
  | IHeadingSelect
  | IHeadingSelectSearch<IObj>
  | IHeadingSelectSearchMulti<IObj>;

export const editValue = async (
  value: string | string[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const selectedArray = Array.isArray(value) ? value : value?.split(',');
  const fieldInput = within(formEl).getByLabelText(heading.label);
  await Promise.all(
    selectedArray.map(async (s) => {
      await UserEvent.click(fieldInput);
      await UserEvent.clear(fieldInput);
      await UserEvent.keyboard(s);
      await UserEvent.keyboard('{ArrowDown}');
      // TODO: Wait for list

      await UserEvent.keyboard('{Enter}');
    })
  );
};

export const getDisplayValue = async (
  formEl: HTMLFormElement,
  heading: THeadingTypes
): Promise<string> => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );
  if (
    heading.type === EFilterType.reference ||
    heading.type === EFilterType.select ||
    heading.type === EFilterType.selectSearch
  ) {
    const selectInputField: HTMLInputElement =
      within(fieldComponent).getByRole('textbox');
    return selectInputField.placeholder;
  } else {
    console.info(heading);
    throw new Error(`Not Implemented: ${heading.uid}`);
  }
};
