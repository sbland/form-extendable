import { render } from '@testing-library/react';
import React from 'react';
import * as compositions from './field-multi-select.composition';

const defaultProps = {
  //
};

describe('field multi select', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
});
