import React from 'react';
import { render, screen } from '@testing-library/react';

import * as compositions from './field-text.composition';

const { BasicFieldTextWithLabel } = compositions;

const defaultProps = {
  //
};

describe('field text', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  describe('Select by label', () => {
    test('should be able to select the field input using label name', () => {
      render(<BasicFieldTextWithLabel />);
      const input: HTMLInputElement = screen.getByLabelText("Label")
      expect(input.value).toEqual("hello from FieldText")
    });
  });
});
