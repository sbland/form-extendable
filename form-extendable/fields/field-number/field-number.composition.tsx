import React from 'react';
import {
  WrapFieldComponent,
  CompositionWrapDefault,
} from '@form-extendable/composition-helpers';

import { FieldNumber } from './field-number';
import { defaultProps, defaultPropsAdvanced } from './default-val';

export const BasicFieldNumber = () => (
  <CompositionWrapDefault height="4rem" width="10rem">
    <WrapFieldComponent key="numberInputWrap">
      <FieldNumber key="numberInput" {...defaultProps} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

export const BasicFieldNumberWithValue = () => (
  <CompositionWrapDefault height="4rem" width="10rem">
    <WrapFieldComponent key="numberInputWrap">
      <FieldNumber key="numberInput" {...defaultPropsAdvanced} value={4} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
