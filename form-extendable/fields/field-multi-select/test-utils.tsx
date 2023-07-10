import React from 'react';
import { screen, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IHeadingSelectMulti, IObj } from '@form-extendable/lib';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';

export type THeadingTypes = IHeadingSelectMulti;

const promiseAllInSeries = async (iterable) => {
  for (const x of iterable) {
    await x();
  }
};

export const editValue = async (
  value: Uid[] | IObj[],
  formEl: HTMLFormElement,
  heading: THeadingTypes
) => {
  const targetSelection = value;
  const targetLabels = targetSelection.map((t: Uid | IObj) =>
    typeof t === 'object'
      ? t.label
      : heading.options.find((o) => o.uid === t)?.label || 'MISSING HEADING'
  );

  const fieldComponent = within(formEl).getByTestId(
    `${heading.type}-${heading.uid}`
  );

  if (
    heading.type === EFilterType.selectMulti &&
    (heading.asDropdown === false || heading.selectType === 'showall')
  ) {
    if (!value) return;
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
          targetLabels.indexOf(optionItem.textContent as string) !== -1;
        if (isSelected !== shouldBeSelected) {
          await UserEvent.click(optionButton);
        }
      })
    );
  } else if (heading.type === EFilterType.selectMulti && heading.asDropdown) {
    const dropDownButton = within(fieldComponent).getByLabelText(heading.label);
    await UserEvent.click(dropDownButton);
    await within(fieldComponent).findByTestId(
      'multiSelectDropdown_list-unselected'
    );
    const [dropDownListSelected, dropDownListUnSelected] =
      within(fieldComponent).getAllByRole('list');
    const curSelectedItems =
      within(dropDownListSelected).queryAllByRole('listitem');
    const curUnSelectedItems = within(dropDownListUnSelected).queryAllByRole(
      'listitem'
    );

    const availableSelectedButtonNames = curSelectedItems.map(
      (el) => el.textContent || ''
    );

    const availableUnSelectedButtonNames = curUnSelectedItems.map(
      (el) => el.textContent || ''
    );

    // Handle currently Selected
    await promiseAllInSeries(
      availableSelectedButtonNames.map((s: string) => async () => {
        const optionItem = within(fieldComponent)
          .getAllByRole('listitem')
          .find((li) => within(li).queryByText(s.trim())) as HTMLElement;
        const optionButton = within(optionItem).getByRole('button');
        const isSelected = true;

        const shouldBeSelected =
          targetLabels.indexOf(optionItem.textContent as string) !== -1;
        if (isSelected !== shouldBeSelected) {
          await UserEvent.click(optionButton);
        }
      })
    );
    // Handle currently Selected
    await promiseAllInSeries(
      availableUnSelectedButtonNames.map((s: string) => async () => {
        const optionItem = within(fieldComponent)
          .getAllByRole('listitem')
          .find((li) => within(li).queryByText(s.trim())) as HTMLElement;
        const optionButton = within(optionItem).getByRole('button');
        const isSelected = false;

        const shouldBeSelected =
          targetLabels.indexOf(optionItem.textContent as string) !== -1;
        if (isSelected !== shouldBeSelected) {
          await UserEvent.click(optionButton);
        }
      })
    );
  } else {
    const fieldInput = within(formEl).getByLabelText(heading.label);

    await promiseAllInSeries(
      targetLabels.map((s) => async () => {
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
    const selectedBtns = within(fieldComponent).getAllByRole('listitem');
    screen.debug(selectedBtns);
    return selectedBtns
      .filter((s) => within(s).queryByTestId('-selected', { exact: false }))
      .map((s) => s.textContent) as string[];
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
