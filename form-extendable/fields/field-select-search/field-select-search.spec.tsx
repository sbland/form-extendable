import React from 'react';
import { render } from '@testing-library/react';

import { EFilterType } from '@react_db_client/constants.client-types';
import {
  FieldSelectSearch,
  TFieldSelectSearchProps,
} from './field-select-search';
import * as compositions from './field-select-search.composition';
import { defaultVal } from './demo-data';
import { IObj } from '@form-extendable/lib';

// jest.mock('@react_db_client/components.search-and-select-dropdown', () =>
//   MockReactC('SearchAndSelectDropdown', ['SearchAndSelectDropdown'])
// );

const onChange = jest.fn();
const searchFn = jest.fn();

const defaultProps: TFieldSelectSearchProps<IObj> = {
  type: EFilterType.selectSearch,
  label: 'Select search field',
  uid: 'demoid',
  unit: 'demounit',
  onChange,
  value: defaultVal,
  multiple: false,
  required: false,
  searchFn,
  returnFieldOnSelect: 'uid',
  searchFieldTargetField: 'name',
  labelField: 'name',
};

describe('field-select-search', () => {
  beforeEach(() => {
    onChange.mockClear();
    searchFn.mockClear();
  });
  test('Renders', () => {
    render(<FieldSelectSearch {...defaultProps} />);
  });

  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  // describe('Snapshots', () => {
  //   test('Matches Snapshot', () => {
  //     const component = mount(<FieldSelectSearch {...defaultProps} />);
  //     const tree = component.debug();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });

  // describe('Unit Tests', () => {
  //   describe('Default', () => {
  //     let component;
  //     beforeEach(() => {
  //       component = mount(<FieldSelectSearch {...defaultProps} />);
  //     });
  //     describe('Searching', () => {
  //       /* Searching handled by search and select dropdown. */
  //       test('should call search function', () => {
  //         const searchAndSelectDropdown = component.find(SearchAndSelectDropdown);
  //         const searchText = 'searchText';
  //         act(() => {
  //           searchAndSelectDropdown.props().searchFunction(searchText);
  //         });
  //         expect(searchFn).toHaveBeenCalledWith(searchText);
  //       });
  //     });
  //     describe('shows a search select field', () => {
  //       test('should show search and select component', () => {
  //         expect(component.find(SearchAndSelectDropdown)).toBeTruthy();
  //       });
  //     });
  //     describe('handles select', () => {
  //       test('should call update fn when search component returns selection', () => {
  //         const searchComponent = component.find(SearchAndSelectDropdown);
  //         const selectedId = 'demoid';
  //         const selectedData = { uid: selectedId };
  //         searchComponent.props().handleSelect(selectedId, selectedData);
  //         expect(onChange).toHaveBeenCalledWith(defaultProps.uid, selectedId);
  //       });
  //     });
  //   });

  //   describe('Multiple', () => {
  //     const firstSelection = { uid: 'demoid1', label: 'Demo Label 1' };
  //     const secondSelection = { uid: 'demoid2', label: 'Demo Label 2' };

  //     test('Display search field', () => {
  //       const component = mount(<FieldSelectSearch {...defaultProps} multiple value={null} />);
  //       const searchComponent = component.find(SearchAndSelectDropdown);
  //       searchComponent.props().handleSelect(firstSelection.uid, firstSelection);
  //       expect(onChange).toHaveBeenCalledWith(defaultProps.uid, [firstSelection]);
  //     });

  //     test('Display current selection labels', () => {
  //       const component = mount(
  //         <FieldSelectSearch {...defaultProps} multiple value={[firstSelection]} />
  //       );
  //       const showMultiSelection = component.find(ShowMultiSelection);
  //       expect(showMultiSelection.props().values).toEqual([firstSelection]);
  //     });

  //     test('Can remove from selection', () => {
  //       const component = mount(
  //         <FieldSelectSearch {...defaultProps} multiple value={[firstSelection, secondSelection]} />
  //       );
  //       const showMultiSelection = component.find(ShowMultiSelection);
  //       const firstSelectionButton = showMultiSelection.find('button').at(0);
  //       act(() => {
  //         firstSelectionButton.simulate('click');
  //       });
  //       expect(onChange).toHaveBeenCalledWith(defaultProps.uid, [secondSelection]);
  //     });
  //   });
  // });
});
