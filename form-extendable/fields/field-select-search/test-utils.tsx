import React from 'react';
import { waitFor, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  IHeadingReference,
  IHeadingSelect,
  IHeadingSelectSearch,
  IHeadingSelectSearchMulti,
  IObj,
} from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export type THeadingTypes =
  | IHeadingSelect
  | IHeadingReference<IObj>
  | IHeadingSelectSearch<IObj>
  | IHeadingSelectSearchMulti<IObj>;

const asArray = <T,>(v: T | T[]): Array<T> => (Array.isArray(v) ? v : [v]);

const promiseAllInSeries = async (iterable) => {
  for (const x of iterable) {
    await x();
  }
};

export const editValue = async (
  value: string | string[] | IObj | IObj[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const targetSelection = asArray(value);

  const fieldInput: HTMLInputElement = within(formEl).getByLabelText(
    heading.label
  );
  const fieldEl = within(formEl).getByTestId(`${heading.type}-${heading.uid}`);

  await promiseAllInSeries(
    targetSelection.map((s) => async () => {
      const label = typeof s === 'string' ? s : s.label;
      await UserEvent.click(fieldInput);
      await UserEvent.clear(fieldInput);
      await UserEvent.keyboard(label);
      await waitFor(() => expect(fieldInput.value).toEqual(label));
      const resultList = await within(fieldEl).findByRole('list');
      const resultIndexToSelect = within(resultList)
        .getAllByRole('listitem')
        .findIndex((l) => l.textContent?.includes(label)); // TODO: What if multple include label

      if (resultIndexToSelect < 0) throw new Error('Search value not found');

      // TODO:
      await promiseAllInSeries(
        Array(resultIndexToSelect + 1)
          .fill(0)
          .map(() => async () => {
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
    throw new Error(`Not Implemented: ${(heading as any).uid}`);
  }
};
