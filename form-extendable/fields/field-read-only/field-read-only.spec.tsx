import React from 'react';
import { render } from '@testing-library/react';

import { IFieldComponentProps } from '@form-extendable/lib';
import { FieldReadOnly } from './field-read-only';
import * as compositions from './field-read-only.composition';

const defaultProps: IFieldComponentProps<string> = {
  uid: 'id',
  unit: 'unit',
  value: 'a',
  label: 'read only',
  onChange: () => null,
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
