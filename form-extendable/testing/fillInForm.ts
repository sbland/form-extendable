import { within } from '@testing-library/react';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';
import UserEvent from '@testing-library/user-event';
import { TFormData, THeading } from '@form-extendable/lib';
import {
  editValue as editSelectValue,
  THeadingTypes as THeadingTypesSelect,
} from '@form-extendable/fields.field-select-search';
import {
  editValue as editMultiSelectValue,
  THeadingTypes as THeadingTypesMultiSelect,
} from '@form-extendable/fields.field-multi-select';
import {
  editValue as editFileValue,
  THeadingTypes as THeadingTypesFile,
} from '@form-extendable/fields.field-file';

export type FillInFieldFn = (
  formEl: HTMLFormElement,
  headingsData: THeading<any>[],
  customFillInField?: FillInFieldFn,
  debug?: boolean
) => (args: [k: Uid, v: any]) => Promise<void>;

export const fillInField: FillInFieldFn =
  (
    formEl: HTMLFormElement,
    headingsData: THeading<any>[],
    customFillInField?: FillInFieldFn,
    debug: boolean = false
  ) =>
  async ([k, v]) => {
    const heading = headingsData.find((h) => h.uid === k);
    if (!heading) throw Error(`Heading not found for ${k}`);
    if (debug) console.info('form field heading: ', heading);
    if (heading.readOnly) {
      return;
    }

    try {
      switch (heading.type) {
        case EFilterType.number:
        case EFilterType.date:
        case EFilterType.textLong:
        case EFilterType.text: {
          const fieldInput = within(formEl).getByLabelText(heading.label);
          await UserEvent.click(fieldInput);
          await UserEvent.clear(fieldInput);
          await UserEvent.keyboard(`${v}`);
          break;
        }
        case EFilterType.uid:
        case EFilterType.button:
          /* We skip these types */
          break;
        case EFilterType.toggle:
        case EFilterType.bool: {
          const toggleButton: HTMLInputElement = within(formEl).getByRole(
            'checkbox',
            { name: heading.label }
          );
          if ((v && !toggleButton.checked) || (!v && toggleButton.checked))
            await UserEvent.click(toggleButton);
          if (!v && !toggleButton.checked) {
            // Click twice to make sure stored as false not undefined
            await UserEvent.click(toggleButton);
            await UserEvent.click(toggleButton);
          }
          break;
        }
        case EFilterType.selectMulti:
          await editMultiSelectValue(
            v,
            formEl,
            heading as THeadingTypesMultiSelect
          );
          break;
        case EFilterType.reference:
        case EFilterType.selectSearch: {
          // TODO: Improve search selecting
          await editSelectValue(v, formEl, heading as THeadingTypesSelect);
          break;
        }
        case EFilterType.select: {
          await editSelectValue(v, formEl, heading as THeadingTypesSelect);
          break;
        }
        case EFilterType.embedded:
          throw new Error(
            'Headings should be flattened before running fillInForm'
          );
        case EFilterType.dict:
          // TODO: Implement dict type
          break;
        case EFilterType.video:
          // TODO: Implement video type
          break;
        case EFilterType.image:
        case EFilterType.file:
        case EFilterType.fileMultiple:
          await editFileValue(v, formEl, heading as THeadingTypesFile, debug);
          break;
        default:
          if (!customFillInField)
            throw Error(`Heading type "${heading.type}" not implemented`);
          await customFillInField(formEl, headingsData)([k, v]);
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
      console.info(`Failed to set value for ${heading.uid}`);
      console.info(heading);
      throw error;
    }
  };

const promiseAllInSeries = async (iterable) => {
  for (const x of iterable) {
    await x();
  }
};

export const fillInForm = async (
  formEl: HTMLFormElement,
  headings: THeading<any>[],
  data: TFormData,
  customFillInField?: FillInFieldFn,
  debug: boolean = false
) => {
  const fns = Object.entries(data).map(([k, v]) => () => {
    if (debug) console.log(`Filling in field: ${k} with ${JSON.stringify(v)}`);
    return fillInField(formEl, headings, customFillInField, debug)([k, v]);
  });
  await promiseAllInSeries(fns);
};
