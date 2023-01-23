import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { fillInForm } from '@form-extendable/testing';
import * as compositions from './item-editor.composition';
import { demoData, demoParams } from './demo-data';

describe('Item Editor', () => {
  describe('Compositions', () => {
    Object.entries(compositions)
      .filter(([name, Composition]) => (Composition as any).forTests)
      .forEach(([name, Composition]) => {
        test(name, async () => {
          render(<Composition />);
          // @ts-ignore
          if (Composition.waitForReady) await Composition.waitForReady();
        });
      });
  });
  describe('Functional Tests', () => {
    test('should render item editor', async () => {
      render(<compositions.BasicItemEditor />);
      if (compositions.BasicItemEditor.waitForReady)
        await compositions.BasicItemEditor.waitForReady();
      await screen.findByTestId('rdc-itemEditor');
    });
    test('should be able to fill in form and submit', async () => {
      render(<compositions.BasicItemEditor />);
      if (compositions.BasicItemEditor.waitForReady)
        await compositions.BasicItemEditor.waitForReady();
      const newData = {
        text: 'Example text',
        // number: 1,
        // numberCapped: 999999,
        // date: '2019-11-02',
        // // date: '2019-11-02T12:04:44.626+00:00', //TODO: Check this date input
        // selectreadonly: 'rep1',
        // bool: false,
        // toggle: true,
        // button: null,
        // demoField: 'demoField data',
        // reference: demoRefObjs[0],
        // image: 'example_file.jpg',
        // file: DEMO_FILES_DATA[0],
        // fileMultiple: ['example_file.jpg'],
        // select: 'selectVal1',
        // selectSearch: { uid: 'selectSearchVal1', label: 'Select Search Val 1' },
        // TODO: These should all have multiple
        // multiSelect: ['foo', 'bar'],
        // selectSearchMulti: [{ uid: 'readOnlyMultiVal1', label: 'Read only Multi select value 1' }], // NOT IMPLEMENTED
        // multiSelectList: ['foo', 'bar'],
        // multiSelectListShowAll: ['foo', 'bar'],
        // video: 'example_video.mov',
        // longText: `Long Text spanning multiple lines
        // 1
        // 2
        // 3
        // 4
        // 5
        // 6
        // 7
        // 8
        // 9
        // `,
        // Below field types currently unsupported
        // dict: { hello: 'world' },
        // embedded: null,
        // embeddedb: null,
        // uid: 'name-1',
      };

      const expectedNewDoc = {
        ...demoData,
        ...newData,
        // below fields or modified from raw input above
      };

      const expectedSubmittedDoc = {
        ...newData,
        uid: demoData.uid,
        // below fields or modified from raw input above
      };

      await fillInForm(
        screen.getByRole('form'),
        demoParams as any,
        newData
        // fillInCustomField
      );
      const submitBtn = screen.getByRole('button', { name: /Save Item/ });
      await UserEvent.click(submitBtn);
      const savedData = await screen
        .findByTestId('savedData')
        .then((el) => JSON.parse(el.textContent || '{}'));

      const submitCallbackData = await screen
        .findByTestId('submittedCallbackData')
        .then((el) => JSON.parse(el.textContent || '{}'));
      expect(submitCallbackData).toEqual(expectedNewDoc);

      expect(savedData).toEqual(expectedSubmittedDoc);
    });
    test('should catch errors in saving', async () => {
      const validData = { text: 'ok' };
      const inValidData = { text: 'ERROR' };
      render(<compositions.BasicItemEditor />);
      if (compositions.BasicItemEditor.waitForReady)
        await compositions.BasicItemEditor.waitForReady();

      await fillInForm(
        screen.getByRole('form'),
        demoParams as any,
        inValidData
      );
      const submitBtn = screen.getByRole('button', { name: /Save Item/ });
      await UserEvent.click(submitBtn);
      await waitFor(() =>
        expect(screen.getByTestId('error').textContent).toEqual(
          'Error: You asked for an error?!'
        )
      );

      await fillInForm(screen.getByRole('form'), demoParams as any, validData);
      await UserEvent.click(submitBtn);
      await screen.findByTestId('submittedCallbackData');
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
      // Check multiple errors still caught
      await fillInForm(
        screen.getByRole('form'),
        demoParams as any,
        inValidData
      );
      await UserEvent.click(submitBtn);
      await screen.findByTestId('error');
      expect(
        screen.queryByTestId('submittedCallbackData')
      ).not.toBeInTheDocument();
    });
  });
});
