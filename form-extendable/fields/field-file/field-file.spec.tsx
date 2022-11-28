import React from 'react';
import { render, screen, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IFile } from '@react_db_client/constants.client-types';
import { FieldFile, IFieldFileProps } from './field-file';
import * as compositions from './field-file.composition';
import {
  DEMO_IMAGE_FILES_DATA,
  DEMO_IMAGE_FILES_MANY,
  dummyProps,
  dummyPropsImagesMany,
} from './demo-data';

const onChange = jest.fn();
const asyncGetFiles = jest
  .fn()
  .mockImplementation(async () => [...DEMO_IMAGE_FILES_MANY].slice(50, 60));
const asyncFileUpload = jest.fn().mockImplementation(async () => {});

const defaultProps: IFieldFileProps<IFile[] | IFile> = {
  ...dummyProps,
  onChange,
  asyncGetFiles,
};

const defaultPropsMultiple: IFieldFileProps<IFile[] | IFile> = {
  ...dummyPropsImagesMany,
  onChange,
  asyncGetFiles,
};

// TODO: Something in Search and select causing act error
describe('field-file', () => {
  beforeEach(() => {
    onChange.mockClear();
    asyncGetFiles.mockClear();
  });
  test('Renders', async () => {
    render(
      <FieldFile
        {...defaultProps}
        onChange={onChange}
        asyncGetFiles={() => async () => DEMO_IMAGE_FILES_DATA}
        asyncFileUpload={() => async () => {}}
      />
    );
    await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
  });

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
        render(
          <FieldFile
            {...defaultProps}
            onChange={onChange}
            asyncGetFiles={() => asyncGetFiles}
            asyncFileUpload={() => asyncFileUpload}
          />
        );
        await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
      });
      test.todo('should call onChange with null when we delete the file');
      test.todo(
        'should call onChange with new file if we select file form list'
      );
    });
    describe('Multiple', () => {
      beforeEach(async () => {
        render(
          <FieldFile
            {...defaultPropsMultiple}
            onChange={onChange}
            asyncGetFiles={() => asyncGetFiles}
            asyncFileUpload={() => asyncFileUpload}
          />
        );
        await screen.findAllByAltText(DEMO_IMAGE_FILES_MANY[0].label);
      });

      test('should call onChange with null when we delete the file', async () => {
        const fileDeleteBtn = screen.getAllByRole('button', {
          name: /Remove/,
        })[0];
        await UserEvent.click(fileDeleteBtn);
        const newItems = [...DEMO_IMAGE_FILES_MANY].slice(1, 50);
        expect(onChange).toHaveBeenCalledWith(newItems);
      });
      test('should be able to select a file from file list', async () => {
        const addFileButton = screen.getByRole('button', { name: '+' });
        await UserEvent.click(addFileButton);
        await screen.findByText('Select File');
        const demoFile = DEMO_IMAGE_FILES_MANY[50];
        await screen.findByText(demoFile.label, { exact: false });
        const fileList = within(
          screen.getAllByTestId('styledSelectList')[0] // TODO: Why do we have multiple?!
        ).getByRole('list');
        const fileItems = within(fileList).getAllByRole('listitem');
        expect(fileItems.length).toBeGreaterThan(0);
        const demoFileButton = within(fileItems[0]).getByRole('button');

        expect(demoFileButton).toBeInTheDocument();
        await UserEvent.click(demoFileButton as HTMLButtonElement);
        const acceptBtn = await screen.getByRole('button', {
          name: /Accept Selection/,
        });
        await UserEvent.click(acceptBtn);

        expect(onChange).toHaveBeenCalledWith([
          ...[...DEMO_IMAGE_FILES_MANY].slice(0, 50),
          demoFile,
        ]);
      });
    });
  });
});
