import React from 'react';
import { screen, render, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  IHeadingCustomType,
  IHeadingNumber,
  THeading,
} from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { fillInForm, getFieldDisplayValue } from '@form-extendable/testing';

import {
  CustomFieldType,
  demoCustomTypeHeading,
  demoFormData,
  demoFormDataMin,
  demoHeadingsData,
  demoHeadingsDataMap,
  headingsFlat,
} from './dummy-data';
import { Form, IFormProps } from './form';
import * as compositions from './form.composition';

const onSubmit = jest.fn();
const errorCallback = jest.fn();
// TODO: We shouldn't be calling this on init
const asyncGetFiles = (metaData) =>
  jest.fn().mockImplementation(async () => []);
const asyncFileUpload = (metaData) =>
  jest.fn().mockImplementation(async () => {});

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

const fillInCustomField =
  (formEl: HTMLFormElement, headingsData: THeading<unknown>[]) =>
  async ([k, v]) => {
    const heading = demoHeadingsData.find((h) => h.uid === k);
    if (!heading) throw Error(`Heading not found for ${k}`);

    if (heading.type === demoCustomTypeHeading.type) {
      const fieldInput = within(formEl).getByLabelText(heading.label);
      await UserEvent.click(fieldInput);
      await UserEvent.clear(fieldInput);
      await UserEvent.keyboard(`${v}`);
    } else {
      throw Error(`Heading type "${heading.type}" not implemented`);
    }
  };

const getCustomFieldDisplayValue = async (
  formEl: HTMLFormElement,
  heading: THeading<any>
) => {
  if ((heading as IHeadingCustomType).customType)
    return demoFormData[heading.uid];
  throw new Error(`Not a custom type: ${heading.uid}`);
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
        new Set(headingsFlat.map((h) => h.uid)).add('demoField')
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
    test('Should show initial data for each field', async () => {
      await renderForm({ ...defaultProps, formDataInitial: demoFormData });

      const formComponent: HTMLFormElement = screen.getByRole('form');
      // Commented values cannot be edited (yet!)
      const displayFieldData = {
        text: demoFormData.text,
        number: '1',
        numberCapped: '999999',
        date: '2019-11-02',
        // // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
        selectreadonly: 'Select read only val 1',
        bool: false,
        toggle: true,
        // button: null,
        demoField: 'demoField data',
        reference: 'Example ref obj',
        image: 'example image label',
        file: 'example file label',
        fileMultiple: 'example file 01 label,example file 02 label',
        select: 'Select Val 1',
        selectSearch: 'Select Search Val 1',
        multiSelect: ['Multi Select 1', 'Multi Select 2'],
        embeddedText: "Embedded Text",
        // selectSearchMulti: ['foo'], // TODO: not implemented
        // multiSelectList: ['foo'],
        // multiSelectListShowAll: ['foo'],
        // video: 'example_video.mov',

        longText: demoFormData.longText,
        // Below field types currently unsupported
        // dict: { hello: 'world' },
        // embedded: null,
        // embeddedb: null,
        // uid: 'name-1',
      };

      for (let index = 0; index < headingsFlat.length; index++) {
        const heading = headingsFlat[index];
        const expectedDisplayValue = displayFieldData[heading.uid];
        if (expectedDisplayValue === undefined) {
          console.warn(`heading not implemented: ${heading.uid}`);
          continue;
        } else {
          const fieldData = demoFormData[heading.uid];
          const fieldDisplayValue = await getFieldDisplayValue(
            formComponent,
            heading,
            getCustomFieldDisplayValue
          );

          expect(fieldDisplayValue).toEqual(expectedDisplayValue);

          // const field = within(formComponent).getByLabelText(heading.label);
          // console.info(
          //   heading.uid,
          //   heading.label,
          //   fieldData,
          //   fieldDisplayValue
          // );
          // TODO: Check value is correct here
        }
      }
    });
    test('Should call errorCallback if submit pressed before form complete', async () => {
      await renderForm();
      const submitBtn = screen.getByRole('button', { name: /Submit/ });
      await UserEvent.click(submitBtn);
      expect(errorCallback).toHaveBeenCalledWith(
        'Missing the following fields: text'
      );
    });
    test('Should call on submit with edit data when clicking the save button', async () => {
      await renderForm();

      // Commented values cannot be edited (yet!)
      const demoData = {
        text: 'Example text',
        number: 1,
        numberCapped: 999999,
        date: '2019-11-02',
        // // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
        selectreadonly: 'rep1',
        // bool: false,
        // toggle: true,
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

      await fillInForm(
        screen.getByRole('form'),
        demoHeadingsData as any,
        demoData,
        fillInCustomField
      );
      const submitBtn = screen.getByRole('button', { name: /Submit/ });
      await UserEvent.click(submitBtn);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        formData: submitData,
        formEditData: submitData,
      });
    });
    test.todo('should call save on debounced change when autosave is on');
  });
});
