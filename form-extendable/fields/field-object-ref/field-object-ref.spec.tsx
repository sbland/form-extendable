test('Deprected', () => {
  //
 });
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { FieldObjectRef, TFieldObjectRefProps } from './field-object-ref';
// import * as compositions from './field-object-ref.composition';
// import { EFilterType } from '@react_db_client/constants.client-types';

// const onChange = jest.fn();
// const asyncGetDocuments = jest.fn();

// const demoValue = {
//   _id: 'demoitem',
//   uid: 'demoitem',
//   name: 'demoitem',
//   label: 'demoitem',
// };

// const defaultProps: TFieldObjectRefProps = {
//   type: EFilterType.reference,
//   uid: 'demoid',
//   label: 'Object ref field',
//   unit: 'demounit',
//   objectLink: true,
//   onChange,
//   asyncGetDocuments,
//   value: demoValue,
//   multiple: false,
//   required: false,
//   labelField: 'name',
//   collection: 'collection',
// };

// describe('FieldObjectRef', () => {
//   /* SETUP */
//   beforeAll(() => {
//     jest.useFakeTimers();
//   });

//   afterAll(() => {
//     jest.useRealTimers();
//   });
//   beforeEach(() => {
//     onChange.mockClear();
//     asyncGetDocuments.mockClear();
//   });

//   /* Tests */
//   test('Renders', () => {
//     render(<FieldObjectRef {...defaultProps} />);
//   });

//   describe('Compositions', () => {
//     Object.entries(compositions).forEach(([name, Composition]) => {
//       test(name, () => {
//         render(<Composition />);
//       });
//     });
//   });

//   describe('Unit tests', () => {
//     beforeEach(() => {
//       render(<FieldObjectRef {...defaultProps} />);
//     });
//     describe('shows a search select field', () => {
//       test('should show search and select component', () => {
//         expect(screen.getByRole('textbox')).toBeInTheDocument();
//       });
//     });
//     // describe('handles select', () => {
//     //   test('should call update fn when search component returns selection', () => {
//     //     const searchComponent = component.find(SearchAndSelectDropdown);
//     //     const selectedId = 'demoid';
//     //     const selectedData = {};
//     //     searchComponent.props().handleSelect(selectedId, selectedData);
//     //     expect(onChange).toHaveBeenCalledWith(
//     //       defaultProps.uid,
//     //       selectedData
//     //     );
//     //   });
//     // });
//     // describe('Passes props to search and select', () => {
//     //   test('should provide default search function if searchFn override is null', () => {
//     //     const searchAndSelectDropdown = component.find(SearchAndSelectDropdown);
//     //     expect(searchAndSelectDropdown.props()).toMatchSnapshot();
//     //   });
//     // });
//     // describe('Searching', () => {
//     //   test('Entering search input should call async get documents', async () => {
//     //     // TODO: Complete this
//     //     const searchField = component
//     //       .find('input')
//     //       .find('[type="text"]')
//     //       .first();
//     //     act(() => {
//     //       searchField.simulate('focus');
//     //       component.update();
//     //     });
//     //     const searchValue = 'Search Val';
//     //     await act(async () => {
//     //       searchField.simulate('change', { target: { value: searchValue } });
//     //       component.update();
//     //       jest.runOnlyPendingTimers();
//     //       component.update();
//     //       jest.runOnlyPendingTimers();
//     //     });
//     //     const collection = defaultProps.collection;
//     //     const filters = [
//     //       new FilterObjectClass({
//     //         uid: 'search',
//     //         field: defaultProps.labelField,
//     //         value: searchValue,
//     //       }),
//     //     ];
//     //     const schema = '_id';
//     //     const sortBy = defaultProps.labelField;
//     //     expect(asyncGetDocuments).toHaveBeenCalledWith(
//     //       collection,
//     //       filters,
//     //       schema,
//     //       sortBy
//     //     );
//     //   });
//     // });
//   });
// });
