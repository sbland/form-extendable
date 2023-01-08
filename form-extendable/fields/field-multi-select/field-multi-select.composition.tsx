import React from 'react';
import {
  FieldCompositionWrapDefault,
  WrapFieldComponent,
} from '@form-extendable/composition-helpers';
import { FieldMultiSelect } from './field-multi-select';
import { props } from './demo-data';

export const BasicFieldMultiSelect = () => (
  <FieldCompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} />
  </FieldCompositionWrapDefault>
);

export const Dropdown = () => (
  <FieldCompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} asDropdown />
  </FieldCompositionWrapDefault>
);

export const HideUnselected = () => (
  <FieldCompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} selectType="hideunselected" />
  </FieldCompositionWrapDefault>
);

export const Showall = () => (
  <FieldCompositionWrapDefault height="4rem" width="4rem">
    <WrapFieldComponent debug>
      <FieldMultiSelect {...props} selectType="showall" />
    </WrapFieldComponent>
  </FieldCompositionWrapDefault>
);
