import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
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
  const fieldInput: HTMLInputElement = within(formEl).getByLabelText(
    heading.label
  );
  const fieldEl = within(formEl).getByTestId(`${heading.type}-${heading.uid}`);

  await Promise.all(
    selectedArray.map(async (s) => {
      await UserEvent.click(fieldInput);
      await UserEvent.clear(fieldInput);
      await UserEvent.keyboard(s);
      await waitFor(() => expect(fieldInput.value).toEqual(s));
      const resultList = await within(fieldEl).findByRole('list');
      const resultIndexToSelect = within(resultList)
        .getAllByRole('listitem')
        .findIndex((l) => l.textContent?.includes(s));

      if (resultIndexToSelect < 0) throw new Error('Search value not found');

      await Promise.all(
        Array(resultIndexToSelect + 1)
          .fill(0)
          .map(async () => {
            await UserEvent.keyboard('{ArrowDown}');
          })
      );

      await UserEvent.keyboard('{Enter}');
      await waitFor(() => expect(fieldInput.placeholder).toEqual(s));
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
