import React from 'react';
import { WrapFieldComponent, CompositionWrapDefault } from '@form-extendable/composition-helpers';

import { FieldNumber } from './field-number';
import { defaultProps } from './default-val';

export const BasicFieldNumber = () => (
  <CompositionWrapDefault height="4rem" width="10rem">
    <WrapFieldComponent>
      <FieldNumber {...defaultProps} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
