import React from 'react';
import { screen, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IHeadingSelectMulti } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export type THeadingTypes = IHeadingSelectMulti;

export const editValue = async (
  value: string | string[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const selectedArray = Array.isArray(value) ? value : value?.split(',');
  if (
    heading.type === EFilterType.selectMulti &&
    (heading.asDropdown === false || heading.selectType === 'showall')
  ) {
    if (!value) return;
    const selectedButtonNames = selectedArray.map(
      (uid) => heading.options.find((o) => o.uid === uid)?.label
    );
    await Promise.all(
      selectedButtonNames.map(async (s) => {
        const optionButton = within(formEl).getByRole('button', { name: s });
        await UserEvent.click(optionButton);
      })
    );
  } else if (heading.type === EFilterType.selectMulti && heading.asDropdown) {
    const dropDownButton = within(formEl).getByLabelText(
      `${heading.required ? '*' : ''}${heading.label}`
    );
    await UserEvent.click(dropDownButton);
  } else {
    const fieldInput = within(formEl).getByLabelText(
      `${heading.required ? '*' : ''}${heading.label}`
    );
    await Promise.all(
      selectedArray.map(async (s) => {
        await UserEvent.click(fieldInput);
        await UserEvent.clear(fieldInput);
        await UserEvent.keyboard(s);
        await UserEvent.keyboard('{ArrowDown}');
        await UserEvent.keyboard('{Enter}');
      })
    );
  }
};

export const getDisplayValue = async (
  formEl: HTMLFormElement,
  heading: THeadingTypes
): Promise<string[]> => {
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );
  if (
    heading.type === EFilterType.selectMulti &&
    heading.asDropdown === false &&
    heading.selectType !== 'showall'
  ) {
    const selectedBtns = within(fieldComponent).getAllByRole('button');
    screen.debug(selectedBtns);
    // TODO: Implement this
    return ['UNKNOWN SELECT'];
  } else if (
    heading.type === EFilterType.selectMulti &&
    heading.asDropdown === true
  ) {
    const selectedList = within(fieldComponent).getByRole('list');
    const selectedBtns = within(selectedList).getAllByRole('button');
    return selectedBtns.map((s) => s.textContent) as string[];
  } else {
    console.info(heading);
    throw new Error(`Not Implemented: ${heading.uid}`);
  }
};
