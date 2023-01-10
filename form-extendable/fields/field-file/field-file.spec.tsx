import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {
  EFileType,
  EFilterType,
} from '@react_db_client/constants.client-types';
import * as compositions from './field-file.composition';
import {
  DEMO_IMAGE_FILES_DATA,
  DEMO_IMAGE_FILES_MANY,
  dummyProps,
} from './demo-data';
import { editValue, editValueMulti } from './test-utils';

// TODO: Something in Search and select causing act error
describe('field-file', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, async () => {
        render(<Composition />);
        if (Composition.waitForReady) await Composition.waitForReady();
      });
    });
  });
  describe('Unit tests', () => {
    describe('Single', () => {
      beforeEach(async () => {
        render(<compositions.BasicFieldFileImages />);
        await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
      });
      test.todo('should call onChange with null when we delete the file');
      test('should call onChange with new file if we select file form list', async () => {
        const formEl: HTMLFormElement = screen.getByRole('form');
        await editValue(DEMO_IMAGE_FILES_DATA[1], formEl, dummyProps);
        await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[1].label);
      });
    });
    describe('Multiple', () => {
      test('should select multiple files from already uploaded list with pre selection', async () => {
        render(<compositions.BasicFieldFileImagesMany />);
        await compositions.BasicFieldFileImagesMany.waitForReady();

        const formEl: HTMLFormElement = screen.getByRole('form');

        const newFiles = [DEMO_IMAGE_FILES_MANY[5], DEMO_IMAGE_FILES_MANY[6]];
        const newItemsWithData = newFiles.map((f) => ({
          ...f,
          data: new File([f.name], f.name, { type: 'image/svg' }),
        }));
        const fileHeading = {
          uid: 'uid',
          type: EFilterType.fileMultiple,
          fileType: EFileType.IMAGE,
        };
        await editValue(newItemsWithData, formEl, fileHeading as any);
        const newItems = [
          ...[...DEMO_IMAGE_FILES_MANY].slice(0, 5),
          ...newFiles,
        ];
        const curState = JSON.parse(
          screen.getByTestId('curState').textContent || '[]'
        );
        expect(curState[0]).toEqual(newItems);
      });
      test('should select multiple files from already uploaded list', async () => {
        render(<compositions.FilesManyForTesting />);
        await compositions.FilesManyForTesting.waitForReady();

        const formEl: HTMLFormElement = screen.getByRole('form');

        const newFiles = [DEMO_IMAGE_FILES_MANY[0], DEMO_IMAGE_FILES_MANY[1]];
        const newItemsWithData = newFiles.map((f) => ({
          ...f,
          data: new File([f.name], f.name, { type: 'image/svg' }),
        }));

        const fileHeading = {
          uid: 'uid',
          type: EFilterType.fileMultiple,
          fileType: EFileType.IMAGE,
        };
        await editValue(newItemsWithData, formEl, fileHeading as any);
        const newItems = [...newFiles];
        const curState = JSON.parse(
          screen.getByTestId('curState').textContent || '[]'
        );
        expect(curState[0]).toEqual(newItems);
      });
      test('should call onChange with null when we delete the file', async () => {
        render(<compositions.BasicFieldFileImagesMany />);
        await compositions.BasicFieldFileImagesMany.waitForReady();
        const fileDeleteBtn = screen.getAllByRole('button', {
          name: /Remove/,
        })[0];
        await UserEvent.click(fileDeleteBtn);
        const newItems = [...DEMO_IMAGE_FILES_MANY].slice(1, 5);
        expect(
          JSON.parse(screen.getByTestId('curState').textContent || '[]')
        ).toEqual([newItems]);
      });

      test('should be able to upload multiple files', async () => {
        render(<compositions.FilesManyForTesting />);
        await compositions.FilesManyForTesting.waitForReady();
        const formEl: HTMLFormElement = screen.getByRole('form');
        const fileHeading = {
          uid: 'uid',
          type: EFilterType.fileMultiple,
          fileType: EFileType.IMAGE,
        };
        const newFiles = [DEMO_IMAGE_FILES_MANY[10], DEMO_IMAGE_FILES_MANY[11]];
        const newItemsWithData = newFiles.map((f) => ({
          ...f,
          data: new File([f.name], f.name, { type: 'image/svg' }),
        }));

        await editValue(newItemsWithData, formEl, fileHeading as any);
        const curState = JSON.parse(
          screen.getByTestId('curState').textContent || '[]'
        );
        expect(curState[0].map((c) => ({ ...c, data: undefined }))).toEqual(
          newFiles
        );
      });
    });
  });
});
