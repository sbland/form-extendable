import React from 'react';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';

import { EFilterType } from '@react_db_client/constants.client-types';
import { FieldMultiSelect, TFieldMultiSelect } from './field-multi-select';
import { demoOptions } from './demo-data';

const props: TFieldMultiSelect = {
  type: EFilterType.selectMulti,
  label: 'Multi select field',
  uid: 'foo',
  unit: 'unit',
  onChange: () => {},
  options: demoOptions,
  value: [demoOptions[0]],
  required: true,
};

export const BasicFieldMultiSelect = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} />
  </CompositionWrapDefault>
);

export const Dropdown = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} asDropdown />
  </CompositionWrapDefault>
);

export const HideUnselected = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} selectType="hideunselected" />
  </CompositionWrapDefault>
);

export const Showall = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <FieldMultiSelect {...props} selectType="showall" />
  </CompositionWrapDefault>
);
