import React from 'react';
import { render } from '@testing-library/react';

import { IFieldComponentProps, IHeadingText } from '@form-extendable/lib';
import { FieldReadOnly, IFieldReadOnlyProps } from './field-read-only';
import * as compositions from './field-read-only.composition';
import { EFilterType } from '@react_db_client/constants.client-types';

const defaultProps: IFieldComponentProps<string, IHeadingText> = {
  uid: 'id',
  type: EFilterType.text,
  unit: 'unit',
  value: 'a',
  label: 'read only',
  onChange: () => null,
  onBlur: () => null,
};

describe('FieldReadOnly', () => {
  beforeEach(() => {});
  test('Renders', () => {
    render(<FieldReadOnly {...defaultProps} />);
  });

  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  // describe('shallow renders', () => {
  //   test('Matches Snapshot', () => {
  //     const component = shallow(<FieldReadOnly {...defaultProps} />);
  //     const tree = component.debug();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });
  // describe('Unit tests', () => {
  //   let component;
  //   beforeEach(() => {
  //     component = mount(<FieldReadOnly {...defaultProps} />);
  //   });
  //   test('should show value in span', () => {
  //     expect(component.text()).toEqual(`${defaultProps.value} ${defaultProps.unit}`);
  //   });
  //   test('should show option label if type is select', () => {
  //     const label = 'A';
  //     component = mount(
  //       <FieldReadOnly
  //         {...defaultProps}
  //         type={filterTypes.select}
  //         options={[{ uid: 'a', label }]}
  //       />
  //     );
  //     expect(component.text()).toEqual(`${label} ${defaultProps.unit}`);
  //   });
  // });
});
