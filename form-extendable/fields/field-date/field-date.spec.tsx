import { render } from '@testing-library/react';
import React from 'react';
import * as compositions from './field-date.composition';

const defaultProps = {
  //
};

describe('field date', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
});
