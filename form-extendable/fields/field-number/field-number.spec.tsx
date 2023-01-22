import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
          const input = screen.getByRole<HTMLInputElement>('spinbutton');
          expect(input.value).toEqual(String(val));
        })
      );
      [undefined, null, '', 'jlkjl'].map((val) =>
        test(`should parse input invalid values: ${val}`, () => {
          render(
            <FieldNumber {...defaultProps} value={val as unknown as number} />
          );
          const input = screen.getByRole<HTMLInputElement>('spinbutton');
          expect(input.value).toEqual('');
        })
      );

      ['1', '2', '1.2', '0'].map((val) =>
        test(`should parse input invalid values: ${val}`, () => {
          render(
            <FieldNumber {...defaultProps} value={val as unknown as number} />
          );
          const input = screen.getByRole<HTMLInputElement>('spinbutton');
          expect(input.value).toEqual(val);
        })
      );
    });
    describe('Modifying Input', () => {
      test('should set to empty if value is empty', () => {
        render(<compositions.BasicFieldNumber />);
        const input = screen.getByRole<HTMLInputElement>('spinbutton');
        expect(input.value).toEqual('');
      });
      test('should set to empty if value is empty and defocus', async () => {
        render(<compositions.BasicFieldNumber />);
        const curState = screen.getByTestId('curState');
        expect(curState.textContent).toEqual('[""]');
        const input = screen.getByRole<HTMLInputElement>('spinbutton');
        expect(input.value).toEqual('');
        await UserEvent.click(input);
        expect(input).toHaveFocus();
        await UserEvent.click(document.body);
        expect(input.value).toEqual('');
        expect(curState.textContent).toEqual('[""]');
      });
      test('should set to empty if value is cleared and defocus', async () => {
        render(<compositions.BasicFieldNumberWithValue />);
        const curState = screen.getByTestId('curState');
        expect(curState.textContent).toEqual('[4]');
        const input = screen.getByRole<HTMLInputElement>('spinbutton');
        expect(input.value).toEqual('4');
        await UserEvent.click(input);
        expect(input).toHaveFocus();
        await UserEvent.clear(input);
        expect(input).toHaveFocus();
        await UserEvent.keyboard('[Backspace]');
        expect(input).toHaveFocus();
        await UserEvent.click(document.body);
        expect(input).not.toHaveFocus();
        expect(curState.textContent).toEqual('[3]');
        await waitFor(() => expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual("3"));
        expect(screen.getByRole<HTMLInputElement>('spinbutton').value).toEqual("3");
      });
    });
  });
});
