import React from 'react';
import { screen, render, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IHeadingNumber, TFormData } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import {
  editValue as editSelectValue,
  THeadingTypes as THeadingTypesSelect,
} from '@form-extendable/fields.field-select-search';

import {
  CustomFieldType,
  demoCustomTypeHeading,
  demoFormData,
  demoFormDataMin,
  demoHeadingsData,
  demoHeadingsDataMap,
} from './dummy-data';
import { Form, IFormProps } from './form';
import * as compositions from './form.composition';

const onSubmit = jest.fn();
const errorCallback = jest.fn();
// TODO: We shouldn't be calling this on init
const asyncGetFiles = jest.fn().mockImplementation(async () => []);
const asyncFileUpload = jest.fn().mockImplementation(async () => {});

beforeEach(() => {
  jest.clearAllMocks();
});

const fileServerUrl = 'FILE_SERVER_URL';

const componentMap = {
  [demoCustomTypeHeading.type]: () => CustomFieldType,
  ...defaultComponentMap({
    asyncGetFiles,
    asyncFileUpload,
    fileServerUrl,
  }),
};

const defaultProps: IFormProps = {
  headings: demoHeadingsData,
  onSubmit,
  componentMap,
  errorCallback,
};

const renderForm = async (props: IFormProps = defaultProps) => {
  const view = render(<Form {...props} />);
  await screen.findByText('* is required. (!) has been modified.');
  return view;
};

const fillInField =
  (formEl): ((args: [k: string, v: any]) => Promise<void>) =>
  async ([k, v]) => {
    const heading = demoHeadingsData.find((h) => h.uid === k);
    if (!heading) throw Error(`Heading not found for ${k}`);
    if (!heading.readOnly)
      try {
        switch (heading.type) {
          case EFilterType.number:
          case EFilterType.date:
          case EFilterType.textLong:
          case EFilterType.text: {
            const fieldInput = within(formEl).getByLabelText(
              `${heading.required ? '*' : ''}${heading.label}`
            );
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
              {
                name: `${heading.required ? '*' : ''}${heading.label}`,
              }
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
          case EFilterType.reference:
          case EFilterType.selectMulti:
          case EFilterType.selectSearch:
          case EFilterType.select: {
            await editSelectValue(v, formEl, heading as THeadingTypesSelect);
            break;
          }
          case EFilterType.embedded:
            // TODO: Implement embedded type
            break;
          case EFilterType.dict:
            // TODO: Implement dict type
            break;
          case EFilterType.video:
            // TODO: Implement video type
            break;
          case EFilterType.image:
          case EFilterType.file:
          case EFilterType.fileMultiple:
            // TODO: Implement dict type
            break;
          default:
            if (heading.type === demoCustomTypeHeading.type) {
              const fieldInput = within(formEl).getByLabelText(
                `${heading.required ? '*' : ''}${heading.label}`
              );
              await UserEvent.click(fieldInput);
              await UserEvent.clear(fieldInput);
              await UserEvent.keyboard(`${v}`);
              break;
            } else {
              throw Error(`Heading type "${heading.type}" not implemented`);
            }
        }
      } catch (error) {
        console.info(`Failed to set value for ${heading.uid}`);
        console.info(heading);
        throw error;
      }
  };

const fillInForm = async (formEl, data: TFormData) => {
  const fns = Object.entries(data).map(
    ([k, v]) =>
      () =>
        fillInField(formEl)([k, v])
  );
  const result = await fns.reduce((prev, fn) => {
    const next = () => prev().then(() => fn());
    return next;
  });
  await result();
};

describe('Form Main Component', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(`${name}`, async () => {
        render(<Composition />);
        if (Composition.waitForReady) await Composition.waitForReady();
      });
    });
  });

  describe('Demo Data', () => {
    test('should have all field types in demo headings', () => {
      expect(new Set(demoHeadingsData.map((h) => h.type))).toEqual(
        new Set<string | EFilterType>(Object.values(EFilterType)).add(
          'demoFieldType'
        )
      );
    });
    test('should have at least a single example field for each heading', () => {
      expect(new Set(Object.keys(demoFormData))).toEqual(
        new Set(demoHeadingsData.map((h) => h.uid)).add('demoField')
      );
    });
  });
  describe('Simple form functionality', () => {
    test('Should call on submit when clicking the save button', async () => {
      await renderForm({
        ...defaultProps,
        formDataInitial: demoFormDataMin,
      });
      const submitBtn = screen.getByRole('button', { name: /Submit/ });
      await UserEvent.click(submitBtn);
      expect(onSubmit).toHaveBeenCalledWith({
        formData: demoFormDataMin,
        formEditData: {},
      });
    });
    test('Should call errorCallback if submit pressed before form complete', async () => {
      await renderForm();
      const submitBtn = screen.getByRole('button', { name: /Submit/ });
      await UserEvent.click(submitBtn);
      expect(errorCallback).toHaveBeenCalledWith(
        'Missing the following fields: name'
      );
    });
    test('Should call on submit with edit data when clicking the save button', async () => {
      await renderForm();

      // Commented values cannot be edited
      const demoData = {
        name: 'Name 2',
        number: 1,
        numberCapped: 999999,
        date: '2019-11-02',
        // // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
        selectreadonly: 'rep1',
        bool: false,
        toggle: true,
        button: null,
        demoField: 'demoField data',
        // reference: 'exampleObj',

        // image: 'example_file.jpg',
        // file: 'example_file.jpg',
        // fileMultiple: ['example_file.jpg'],
        // select: 'example_item',
        // selectSearch: 'example_item',
        // multiSelect: ['foo', 'bar'],
        // selectSearchMulti: ['foo'],
        // multiSelectList: ['foo'],
        multiSelectListShowAll: ['foo'],
        // video: 'example_video.mov',

        longText: `Long Text spanning multiple lines
        1
        2
        3
        4
        5
        6
        7
        8
        9
        `,
        // Below field types currently unsupported
        // dict: { hello: 'world' },
        // embedded: null,
        // embeddedb: null,
        // uid: 'name-1',
      };

      const submitData = {
        ...demoData,
        // below fields or modified from raw input above
        numberCapped: (demoHeadingsDataMap.numberCapped as IHeadingNumber).max,
        selectreadonly: undefined,
        button: undefined,
      };

      await fillInForm(screen.getByRole('form'), demoData);
      const submitBtn = screen.getByRole('button', { name: /Submit/ });
      await UserEvent.click(submitBtn);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        formData: submitData,
        formEditData: submitData,
      });
    });
  });
});
