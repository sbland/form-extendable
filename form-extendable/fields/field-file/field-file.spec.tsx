import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { IFile } from '@react_db_client/constants.client-types';
import { FieldFile, IFieldFileProps } from './field-file';
import * as compositions from './field-file.composition';
import { DEMO_FILES_DATA, dummyProps } from './demo-data';

const onChange = jest.fn();
const asyncGetFiles = jest.fn().mockImplementation(async () => DEMO_FILES_DATA);
const asyncFileUpload = jest.fn().mockImplementation(async () => {});

const defaultProps: IFieldFileProps<IFile[] | IFile> = {
  ...dummyProps,
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
        asyncGetFiles={asyncGetFiles}
        asyncFileUpload={asyncFileUpload}
      />
    );
    await screen.findAllByText(DEMO_FILES_DATA[0].name);
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
            asyncGetFiles={asyncGetFiles}
            asyncFileUpload={asyncFileUpload}
          />
        );
        await screen.findAllByText(DEMO_FILES_DATA[0].name);
      });

      test('should call onChange with null when we delete the file', async () => {
        const fileDeleteBtn = screen.getAllByRole('button', {
          name: /Remove/,
        })[0];
        await UserEvent.click(fileDeleteBtn);
        const newItems = DEMO_FILES_DATA.slice(1);
        expect(onChange).toHaveBeenCalledWith(newItems);
      });
    });
  });
});
