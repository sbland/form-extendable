import React from 'react';
import { screen, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IHeadingSelectMulti } from '@form-extendable/lib';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';

export type THeadingTypes = IHeadingSelectMulti;

const promiseAllInSeries = async (iterable) => {
  for (const x of iterable) {
    await x();
  }
};

export const editValue = async (
  value: string | Uid[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const selectionArray = Array.isArray(value) ? value : value?.split(',');
  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );

  if (
    heading.type === EFilterType.selectMulti &&
    (heading.asDropdown === false || heading.selectType === 'showall')
  ) {
    if (!value) return;
    const selectedButtonNames: string[] = selectionArray.map(
      (uid) => heading.options.find((o) => o.uid === uid)?.label as string
    );
    const optionListItems: HTMLButtonElement[] =
      within(fieldComponent).getAllByRole('listitem');
    const availableButtonNames = optionListItems.map(
      (el) => el.textContent || ''
    );
    await promiseAllInSeries(
      availableButtonNames.map((s: string) => async () => {
        const optionItem = within(fieldComponent)
          .getAllByRole('listitem')
          .find((li) => within(li).queryByText(s.trim())) as HTMLElement;
        const optionButton = within(optionItem).getByRole('button');
        const isSelected = within(optionItem).queryByTestId(
          'bubbleSelector-item-selected'
        )
          ? true
          : false;

        const shouldBeSelected =
          selectedButtonNames.indexOf(optionItem.textContent as string) !== -1;
        if (isSelected !== shouldBeSelected) {
          await UserEvent.click(optionButton);
        }
      })
    );
  } else if (heading.type === EFilterType.selectMulti && heading.asDropdown) {
    const dropDownButton = within(formEl).getByLabelText(heading.label);
    await UserEvent.click(dropDownButton);
  } else {
    const fieldInput = within(formEl).getByLabelText(heading.label);

    await promiseAllInSeries(
      selectionArray.map((s) => async () => {
        await UserEvent.click(fieldInput);
        await UserEvent.clear(fieldInput);
        await UserEvent.keyboard(String(s));
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
