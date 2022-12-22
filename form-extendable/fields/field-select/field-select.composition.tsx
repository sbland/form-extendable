import React from 'react';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { EFilterType } from '@react_db_client/constants.client-types';
import { FieldSelect, TFieldSelectProps } from './field-select';
import { defaultVal, demoOptions } from './demo-data';

const onChange = () => {};

const defaultProps: TFieldSelectProps = {
  type: EFilterType.select,
  label: 'Select field',
  uid: 'uid',
  unit: 'unit',
  value: defaultVal,
  options: demoOptions,
  onChange,
};

export const BasicFieldSelect = () => (
  <CompositionWrapDefault height="4rem" width="8rem">
    <FieldSelect {...defaultProps} required />
  </CompositionWrapDefault>
);
