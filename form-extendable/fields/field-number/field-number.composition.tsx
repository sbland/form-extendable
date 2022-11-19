import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';

import { FieldNumber } from './field-number';
import { defaultProps } from './default-val';

export const BasicFieldNumber = () => (
  <CompositionWrapDefault height="4rem" width="10rem">
    <WrapFieldComponent>
      <FieldNumber {...defaultProps} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);