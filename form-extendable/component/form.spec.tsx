import React from 'react';
import { screen, render, within, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  IHeadingCustomType,
  IHeadingNumber,
  THeading,
} from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
  IFile,
} from '@react_db_client/constants.client-types';
import {
  fillInForm,
  flattenHeadings,
  getFieldDisplayValue,
} from '@form-extendable/testing';

import {
  demoCustomTypeHeading,
  demoFormData,
  demoHeadingsData,
  demoHeadingsDataMap,
  demoRefObjs,
  DEMO_FILES_DATA,
  headingsFlat,
  MIN_FORM_DATA,
} from './dummy-data';
import * as compositions from './form.composition';
import { errorCallback, getInitialFormData, onSubmit } from './dummy-api';

jest.mock('./dummy-api', () => ({
  onSubmit: jest.fn(),
  errorCallback: jest.fn(),
  getInitialFormData: jest.fn().mockReturnValue({}),
}));

const clickToggleBtn = async (label: string) => {
  const btn = screen.getByRole('button', { name: label });
  await UserEvent.click(btn);
};

beforeEach(() => {
  jest.clearAllMocks();
});

/* Setup image file upload mocking */
const mockImage = {
  src: null,
  onload: () => {},
  onerror: () => {},
  width: 100,
  height: 200,
  hasLoaded: false, // added just for testing
};

declare global {
  /* imagesUploaded set as global so can be accessed in other files */
  var imagesUploaded: (typeof mockImage)[];
}

global.imagesUploaded = [];

beforeEach(() => {
  global.imagesUploaded = [];
  global.URL.createObjectURL = jest.fn().mockImplementation(() => 'testURL');
  // @ts-ignore
  window.Image = function () {
    const image = { ...mockImage };
    global.imagesUploaded.push(image);
    return image;
  };
});
/* === */

const fillInCustomField =
  (formEl: HTMLFormElement, headingsData: THeading<any>[]) =>
  async ([k, v]) => {
    const heading = headingsData.find((h) => h.uid === k);
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
  if ((heading as IHeadingCustomType<string>).customType)
    return demoFormData[heading.uid];
  throw new Error(`Not a custom type: ${heading.uid}`);
};

const setInitialFormData = (formData) => {
  (getInitialFormData as jest.Mock).mockReturnValue(formData);
};

describe('Form Main Component', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(`${name}`, async () => {
        render(<Composition />);
        // @ts-ignore
        if (Composition.waitForReady) await Composition.waitForReady();
      });
    });
  });
  describe('Validate Demo Data', () => {
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
    describe('Filling In Form', () => {
      test('Should call on submit when clicking the save button', async () => {
        setInitialFormData(MIN_FORM_DATA);
        render(<compositions.BasicFormComplete />);
        await compositions.BasicFormComplete.waitForReady();

        const submitBtn = screen.getByRole('button', { name: /Submit/ });
        await UserEvent.click(submitBtn);
        expect(onSubmit).toHaveBeenCalledWith({
          formData: MIN_FORM_DATA,
          formEditData: {},
        });
      });
      test('Should show initial data for each field', async () => {
        setInitialFormData(demoFormData);
        render(<compositions.BasicForm />);
        await compositions.BasicForm.waitForReady();

        const formComponent: HTMLFormElement = screen.getByRole('form');
        // Commented values cannot be edited (yet!)
        const displayFieldData = {
          text: demoFormData.text,
          textarea: demoFormData.textarea,
          number: '1',
          numberCapped: '999999',
          date: '2019-11-02',
          // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
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
          embeddedText: 'Embedded Text',
          // selectSearchMulti: ['foo'], // TODO: not implemented
          multiSelectList: ['Multi Select noDrop 1'],
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

            // screen.debug(formComponent);
            try {
              await waitFor(() => {
                expect(fieldDisplayValue).toEqual(expectedDisplayValue);
              });
            } catch (error) {
              const fieldComponent = screen.getByTestId(
                `${heading.type}-${heading.uid}`
              );
              screen.debug(fieldComponent);
              console.error(
                `Error comparing field display value for ${heading.uid}`,
                error
              );
              console.log('expectedDisplayValue', expectedDisplayValue);
              console.log('fieldDisplayValue', fieldDisplayValue);
              throw error;
            }
          }
        }
      });
      test('Should call errorCallback if submit pressed before form complete', async () => {
        setInitialFormData({});
        render(<compositions.BasicFormComplete />);
        await compositions.BasicFormComplete.waitForReady();

        const submitBtn = screen.getByRole('button', { name: /Submit/ });
        await UserEvent.click(submitBtn);
        expect(errorCallback).toHaveBeenCalledWith('Text field is required');
      });
      test('Should call on submit with edit data when clicking the save button after filling in form', async () => {
        setInitialFormData({});
        render(<compositions.BasicForm />);
        await compositions.BasicForm.waitForReady();

        // Commented values cannot be edited (yet!)
        const demoData = {
          ...MIN_FORM_DATA,
          text: 'Example text',
          number: 1,
          numberCapped: 999999,
          date: '2019-11-02',
          // // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
          selectreadonly: 'rep1',
          bool: false,
          toggle: true,
          button: null,
          demoField: 'demoField data',
          reference: demoRefObjs[0],

          // image: 'example_file.jpg',
          file: DEMO_FILES_DATA[0],
          // fileMultiple: ['example_file.jpg'],
          select: 'selectVal1',
          selectSearch: {
            uid: 'selectSearchVal1',
            label: 'Select Search Val 1',
          },
          // TODO: These should all have multiple
          multiSelect: ['foo', 'bar'],
          // selectSearchMulti: [{ uid: 'readOnlyMultiVal1', label: 'Read Multi select value 1' }], // NOT IMPLEMENTED
          multiSelectList: ['foo', 'bar'],
          multiSelectListShowAll: ['foo', 'bar'],
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
          numberCapped: (demoHeadingsDataMap.numberCapped as IHeadingNumber)
            .max,
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
      test('should be able to change multi select multiple times', async () => {
        setInitialFormData({});
        render(<compositions.BasicForm />);
        await compositions.BasicFormComplete.waitForReady();

        // Commented values cannot be edited (yet!)
        const demoData1 = {
          ...MIN_FORM_DATA,
          multiSelectListShowAll: ['foo'],
        };

        await fillInForm(
          screen.getByRole('form'),
          demoHeadingsData as any,
          demoData1,
          fillInCustomField
        );
        const submitBtn = screen.getByRole('button', { name: /Submit/ });
        await UserEvent.click(submitBtn);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          formData: demoData1,
          formEditData: demoData1,
        });
        const demoData2 = {
          ...MIN_FORM_DATA,
          multiSelectListShowAll: ['foo', 'bar'],
        };

        await fillInForm(
          screen.getByRole('form'),
          demoHeadingsData,
          demoData2,
          fillInCustomField
        );
        await UserEvent.click(submitBtn);
        expect(onSubmit).toHaveBeenCalledTimes(2);
        expect(onSubmit).toHaveBeenCalledWith({
          formData: demoData2,
          formEditData: demoData2,
        });
      });
    });
    describe('Autosaving form', () => {
      test('should call save on debounced change when autosave is on', async () => {
        setInitialFormData(MIN_FORM_DATA);
        render(<compositions.BasicFormAutosave />);
        await compositions.BasicFormAutosave.waitForReady();

        const editData = { text: 'hello' };
        expect(onSubmit).not.toHaveBeenCalled();
        await fillInForm(
          screen.getByRole('form'),
          demoHeadingsData,
          editData,
          fillInCustomField
        );
        await screen.findByText('Saving unsaved changes');
        await screen.findByText('All changes are saved');
        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          formData: { ...MIN_FORM_DATA, ...editData },
          formEditData: editData,
        });
      });
      test('should not autosave until min input has been provided', async () => {
        setInitialFormData({});
        render(<compositions.BasicFormAutosave />);
        await compositions.BasicFormAutosave.waitForReady();

        expect(onSubmit).not.toHaveBeenCalled();

        await fillInForm(
          screen.getByRole('form'),
          flattenHeadings(demoHeadingsData),
          // NOTE: Missing required field "text"
          { textarea: 'hello' },
          fillInCustomField
        );
        await screen.findByText(
          'Form validation error: Text field is required'
        );
        expect(onSubmit).not.toHaveBeenCalled();

        await fillInForm(
          screen.getByRole('form'),
          flattenHeadings(demoHeadingsData),
          MIN_FORM_DATA,
          fillInCustomField
        );

        await screen.findByText('Saving unsaved changes');
        await screen.findByText('All changes are saved');

        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });
    describe('Specific Field types', () => {
      describe('File types', () => {
        test('should be able to upload a new file', async () => {
          setInitialFormData({});
          render(<compositions.BasicForm />);
          await compositions.BasicForm.waitForReady();

          const newFile: IFile = {
            uid: 'new-file.pdf',
            filePath: '',
            label: 'new-file.pdf',
            name: 'new-file.pdf',
            fileType: EFileType.DOCUMENT,
            data: new File(['newfile'], 'new-file.pdf', {
              type: 'document/pdf',
            }),
          };

          const demoData1 = {
            ...MIN_FORM_DATA,
            file: newFile,
          };

          await fillInForm(
            screen.getByRole('form'),
            demoHeadingsData as any,
            demoData1,
            fillInCustomField
          );
          const submitBtn = screen.getByRole('button', { name: /Submit/ });
          await UserEvent.click(submitBtn);
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit).toHaveBeenCalledWith({
            formData: demoData1,
            formEditData: demoData1,
          });
        });
        test('should be able to upload multiple files', async () => {
          setInitialFormData({});
          render(<compositions.BasicForm />);
          await compositions.BasicForm.waitForReady();
          const newFiles: IFile[] = [
            {
              uid: 'new-file-a.pdf',
              filePath: '',
              label: 'new-file-a.pdf',
              name: 'new-file-a.pdf',
              fileType: EFileType.DOCUMENT,
              data: new File(['newfile'], 'new-file-a.pdf', {
                type: 'document/pdf',
              }),
            },
            {
              uid: 'new-file-b.pdf',
              filePath: '',
              label: 'new-file-b.pdf',
              name: 'new-file-b.pdf',
              fileType: EFileType.DOCUMENT,
              data: new File(['newfile'], 'new-file-b.pdf', {
                type: 'document/pdf',
              }),
            },
          ];
          // Commented values cannot be edited (yet!)
          const demoData1 = {
            ...MIN_FORM_DATA,
            fileMultiple: newFiles,
          };

          await fillInForm(
            screen.getByRole('form'),
            demoHeadingsData as any,
            demoData1,
            fillInCustomField
          );
          const submitBtn = screen.getByRole('button', { name: /Submit/ });
          await UserEvent.click(submitBtn);
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit).toHaveBeenCalledWith({
            formData: demoData1,
            formEditData: demoData1,
          });
        });

        test('should be able to select an existing file', async () => {
          setInitialFormData({});
          render(<compositions.BasicForm />);
          await compositions.BasicFormComplete.waitForReady();

          const demoData1 = {
            ...MIN_FORM_DATA,
            file: DEMO_FILES_DATA[0],
          };

          await fillInForm(
            screen.getByRole('form'),
            demoHeadingsData as any,
            demoData1,
            fillInCustomField
          );
          const submitBtn = screen.getByRole('button', { name: /Submit/ });
          await UserEvent.click(submitBtn);
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit).toHaveBeenCalledWith({
            formData: demoData1,
            formEditData: demoData1,
          });
        });
        test.todo('should be able to swap a file');
        test.todo('should be able to select multiple files');
      });
      describe('Reference Dropdown', () => {
        test('should be able to add a new reference document and assign to the form', async () => {
          setInitialFormData({});
          render(<compositions.BasicFormAutosave />);
          await compositions.BasicFormAutosave.waitForReady();

          expect(onSubmit).not.toHaveBeenCalled();
          const mainForm = screen.getByRole('form');
          const refRow = within(mainForm).getByTestId('reference-reference');
          const addRefBtn = within(refRow).getByRole('button', {
            name: /Add New/,
          });
          await UserEvent.click(addRefBtn);

          const saveBtn = screen.getByRole('button', {
            name: /Submit Add Ref/,
          });
          await UserEvent.click(saveBtn);
          await waitFor(() =>
            within(refRow).getByPlaceholderText('New democollection')
          );

          await fillInForm(
            screen.getByRole('form'),
            flattenHeadings(demoHeadingsData),
            MIN_FORM_DATA,
            fillInCustomField
          );

          await screen.findByText('Saving unsaved changes');
          await screen.findByText('All changes are saved');

          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit).toHaveBeenCalledWith({
            formData: {
              ...MIN_FORM_DATA,
              reference: {
                uid: 'newObj',
                label: 'New democollection',
              },
            },
            formEditData: {
              ...MIN_FORM_DATA,
              reference: {
                uid: 'newObj',
                label: 'New democollection',
              },
            },
          });
        });
      });
    });
    describe('Form validation', () => {
      test('should show an asterix on the text input label as it is required', async () => {
        setInitialFormData({});
        render(<compositions.BasicForm />);
        await compositions.BasicForm.waitForReady();
        const textInputFieldLabel: HTMLInputElement = screen.getByText('Text');
        expect(
          within(textInputFieldLabel.parentElement as HTMLElement).getByText(
            '*'
          )
        ).toBeInTheDocument();
      });
      test("should highlight required fields that haven't been filled in", async () => {
        setInitialFormData({});
        render(<compositions.BasicForm />);
        await compositions.BasicForm.waitForReady();
        await clickToggleBtn('Validate on Blur');
        const textInputField: HTMLInputElement = screen.getByLabelText('Text');
        expect(textInputField.value).toEqual('');
        // expect(textInputFieldError).not.toBeInTheDocument();
        await UserEvent.click(textInputField);
        await UserEvent.tab();
        // expect(textInputFieldError).toBeInTheDocument();
        // TODO: Implement this
        const textInputFieldLabel: HTMLInputElement = screen.getByText('Text');
        expect(
          within(textInputFieldLabel.parentElement as HTMLElement).getByText(
            '*'
          )
        ).toBeInTheDocument();
        expect(
          within(
            textInputFieldLabel.parentElement?.parentElement
              ?.parentElement as HTMLElement
          ).getByText('Text field is required')
        ).toBeInTheDocument();
      });
      test('should show any form errors at the bottom of the form', async () => {
        setInitialFormData({});
        render(<compositions.BasicForm />);
        await compositions.BasicForm.waitForReady();
        await clickToggleBtn('Validate on Blur');
        // text input is required
        const textInputField: HTMLInputElement = screen.getByLabelText('Text');
        expect(textInputField.value).toEqual('');
        await UserEvent.click(textInputField);
        await UserEvent.tab();
        await screen.findByText(
          'Form validation error: Text field is required'
        );
      });
      test.todo(
        "should highlight fields that don't match the validation rules"
      );
      describe('Custom validation', () => {});
      describe('Field Validation', () => {
        test.todo(
          'should be able to validate a field based on the value of another field'
        );
        test.todo("should be able to validate a field based on it's own value");
        // Additional validation tests should be placed in individual field test
      });
    });
  });
});
