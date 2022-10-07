import React from 'react';

import { FieldSelect, TFieldSelectProps } from './field-select';
import * as compositions from './field-select.composition';
import { defaultVal, demoOptions } from './demo-data';
import { render, screen } from '@testing-library/react';
import { EFilterType } from '@react_db_client/constants.client-types';

const onChange = jest.fn();

const defaultProps: TFieldSelectProps = {
  type: EFilterType.select,
  label: 'Select field',
  uid: 'uid',
  unit: 'unit',
  value: defaultVal,
  options: demoOptions,
  onChange,
};

describe('Field Select', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  test('Renders', () => {
    render(<FieldSelect {...defaultProps} />);
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
      render(<FieldSelect {...defaultProps} />);
      const tree = screen.debug();
      expect(tree).toMatchSnapshot();
    });
  });
});
