import React from 'react';
import { render } from '@testing-library/react';
import * as compositions from './field-bool.composition';

const defaultProps = {
  //
};

describe('field bool', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition  />);
      });
    });
  });
});
