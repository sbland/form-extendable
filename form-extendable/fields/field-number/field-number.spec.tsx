import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import * as compositions from './field-number.composition';
import { FieldNumber } from './field-number';
import { defaultProps } from './default-val';

describe('field number', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  describe('Unit Tests', () => {
    describe('Parse Input', () => {
      [0, 1, 2].map((val) =>
        test(`should parse input values: ${val}`, () => {
          render(<FieldNumber {...defaultProps} value={val} />);
          const input = screen.getByRole<HTMLInputElement>('textbox');
          expect(input.value).toEqual(val);
        })
      );
      [undefined, null, '', 'jlkjl'].map((val) =>
        test(`should parse input invalid values: ${val}`, () => {
          render(<FieldNumber {...defaultProps} value={val} />);
          const input = screen.getByRole<HTMLInputElement>('textbox');
          expect(input.value).toEqual('');
        })
      );

      ['1', '2', '1.2', '0'].map((val) =>
        test(`should parse input invalid values: ${val}`, () => {
          render(<FieldNumber {...defaultProps} value={val} />);
          const input = screen.getByRole<HTMLInputElement>('textbox');
          expect(input.value).toEqual(Number(val));
        })
      );
    });
    describe('Modifying Input', () => {
      const val = '';
      const getComponent = () =>
        render(<FieldNumber {...defaultProps} value={val} />);
      test('should set to empty if value is empty', () => {
        getComponent();
        const input = screen.getByRole<HTMLInputElement>('textbox');
        expect(input.value).toEqual(Number(val));
      });
      test('should set to empty if value is empty and defocus', async () => {
        getComponent();
        const input = screen.getByRole<HTMLInputElement>('textbox');
        await UserEvent.click(input);
        await UserEvent.click(document.body);
        expect(input.value).toEqual(Number(val));
      });
    });
  });
});
