import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';

import { FieldMultiSelect, TFIeldMultiSelect } from './field-multi-select';
import { demoOptions } from './demo-data';
import { EFilterType } from '@react_db_client/constants.client-types';

const props: TFIeldMultiSelect = {
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
