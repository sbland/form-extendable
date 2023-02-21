import React from 'react';
import { render } from '@testing-library/react';

import * as compositions from './field-dict.composition';

describe('field text', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
});
