import React from 'react';
import UserEvent from '@testing-library/user-event';
import { FieldFile, IFieldFileProps, IPopupProps } from './field-file';
import * as compositions from './field-file.composition';
import { DEMO_FILES_DATA } from './demo-data';
import { render, screen } from '@testing-library/react';

const onChange = jest.fn();
const asyncGetDocuments = jest.fn();
const PopupPanel: React.FC<IPopupProps> = ({
  children,
  isOpen,
  handleClose,
}) => <>{children}</>;

const defaultProps: IFieldFileProps = {
  uid: 'uid',
  multiple: false,
  onChange,
  collectionId: 'collectionId',
  documentId: 'documentId',
  fileType: 'image',
  value: DEMO_FILES_DATA,
  fileServerUrl: 'fileserver',
  asyncGetDocuments,
  PopupPanel,
};

describe('field-file', () => {
  beforeEach(() => {
    onChange.mockClear();
    asyncGetDocuments.mockClear();
  });
  test('Renders', () => {
    render(<FieldFile {...defaultProps} />);
  });

  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  describe('shallow renders', () => {
    test('Matches Snapshot', () => {
      render(<FieldFile {...defaultProps} />);
      const tree = screen.debug();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Unit tests', () => {
    describe('Single', () => {
      beforeEach(() => {
        render(<FieldFile {...defaultProps} />);
      });

      test.skip('should pass empty list to item list if there are no files', async () => {
        // await act(async () => {
        //   component.setProps({ value: null });
        //   component.update();
        //   await new Promise((resolve) => setTimeout(resolve));
        // });
        // const itemList = component.find(ItemList);
        // // TODO: For some reason this is failing but correct in debug
        // expect(itemList.props().items).toEqual([]);
      });
      test('should call updatedate with null when we delete the file', async () => {
        const fileDeleteBtn = screen.getByRole('button', { name: /Remove/ });
        // const fileDeleteFn = component
        //   .find(ItemList)
        //   .props()
        //   .overlayButtons.find((f) => f.uid === 'remove').func;
        await UserEvent.click(fileDeleteBtn);
        // act(() => {
        //   fileDeleteFn(DEMO_FILES_DATA[0].uid);
        // });
        expect(onChange).toHaveBeenCalledWith(defaultProps.uid, null);
      });
    });
    describe('Multiple', () => {
      beforeEach(() => {
        render(<FieldFile {...defaultProps} multiple />);
      });

      test.skip('should pass empty list to item list if there are no files', () => {
      // component.setProps({ value: null });
      //   component.update();
      //   const itemList = component.find(ItemList);
      //   expect(itemList.props().items).toEqual([]);
      });
      test('should call updatedata with file removed when we delete the file', async () => {
        const fileDeleteBtn = screen.getByRole('button', { name: /Remove/ });
        await UserEvent.click(fileDeleteBtn);
        // act(() => {
        //   fileDeleteFn(DEMO_FILES_DATA[0].uid);
        // });
        expect(onChange).toHaveBeenCalledWith(
          defaultProps.uid,
          DEMO_FILES_DATA.slice(1)
        );
      });
    });
  });
});
