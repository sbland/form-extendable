import { screen, within } from '@testing-library/react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IHeadingCustomType, THeading } from '@form-extendable/lib';
import {
  getDisplayValue as getSelectDisplayValue,
  THeadingTypes as TSelectHeadingTypes,
} from '@form-extendable/fields.field-select-search';
import {
  getDisplayValue as getSelectMultiDisplayValue,
  THeadingTypes as TSelectMultiHeadingTypes,
} from '@form-extendable/fields.field-multi-select';
import {
  getDisplayValue as getFileDisplayValue,
  THeadingTypes as TFileHeadingTypes,
} from '@form-extendable/fields.field-file';

export type GetCustomFieldDisplayValue<T> = (
  formEl: HTMLFormElement,
  headingData: THeading<T>,
  customFillInField?: GetCustomFieldDisplayValue<T>
) => Promise<any>;

export const getFieldDisplayValue = async <T,>(
  formEl: HTMLFormElement,
  heading: THeading<T>,
  customFillInField?: GetCustomFieldDisplayValue<T>
) => {
  const fieldComponent = screen.getByTestId(`${heading.type}-${heading.uid}`);
  try {
    if (heading.readOnly) {
      const readOnlyValue = within(fieldComponent).getByTestId(
        `${heading.uid}_read-only-value`
      );
      return readOnlyValue.textContent;
    }
    switch (heading.type) {
      case EFilterType.number:
      case EFilterType.date:
      case EFilterType.textLong:
      case EFilterType.text: {
        const fieldInput: HTMLInputElement = within(
          fieldComponent
        ).getByLabelText(heading.label);
        return fieldInput.value;
      }
      case EFilterType.uid:
      case EFilterType.button: {
        return 'UNKNOWN';
        // const fieldBtn: HTMLButtonElement = within(fieldComponent).getByRole('button', {
        //   name: heading.label,
        // });
        // fieldBtn.ariaLabel;
      }
      case EFilterType.toggle:
      case EFilterType.bool: {
        const toggleButton: HTMLInputElement = within(fieldComponent).getByRole(
          'checkbox',
          { name: heading.label }
        );
        return toggleButton.checked;
      }
      case EFilterType.selectMulti:
        return await getSelectMultiDisplayValue(
          formEl,
          heading as TSelectMultiHeadingTypes
        );
      case EFilterType.reference:
      case EFilterType.selectSearch:
        return await getSelectDisplayValue(
          formEl,
          heading as TSelectHeadingTypes
        );
      case EFilterType.select: {
        // TODO: Get this from field select
        return await getSelectDisplayValue(
          formEl,
          heading as TSelectHeadingTypes
        );
      }
      case EFilterType.image:
      case EFilterType.file:
      case EFilterType.fileMultiple: {
        return await getFileDisplayValue(
          formEl,
          heading as TFileHeadingTypes<T>
        );
      }

      case EFilterType.embedded:
      // TODO: Implement embedded type
      case EFilterType.dict:
      // TODO: Implement dict type
      case EFilterType.video:
      // TODO: Implement video type
      // TODO: Implement dict type
      default:
        if (!customFillInField || !(heading as IHeadingCustomType).customType)
          throw Error(`Heading type "${heading.type}" not implemented`);

        return await customFillInField(formEl, heading);
      // if (heading.type === demoCustomTypeHeading.type) {
      //   const fieldInput = within(formEl).getByLabelText(
      //     `${heading.required ? '*' : ''}${heading.label}`
      //   );
      //   await UserEvent.click(fieldInput);
      //   await UserEvent.clear(fieldInput);
      //   await UserEvent.keyboard(`${v}`);
      //   break;
      // } else {
      //   throw Error(`Heading type "${heading.type}" not implemented`);
      // }
    }
  } catch (error) {
    console.info(`Failed to get display value for ${heading.uid}`);
    console.info(heading);
    screen.debug(fieldComponent);
    console.info(error);
    throw error;
  }
};
