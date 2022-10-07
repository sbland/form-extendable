import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import {
  FieldSelectSearch,
  TFieldSelectSearchProps,
} from './field-select-search';
import { defaultVal, demoOptions } from './demo-data';
import { EFilterType } from '@react_db_client/constants.client-types';

const onChange = () => {};
const searchFn = async () => demoOptions;

const defaultProps: TFieldSelectSearchProps = {
  type: EFilterType.selectSearch,
  label: 'Select search field',
  uid: 'demoid',
  unit: 'demounit',
  onChange,
  value: defaultVal,
  multiple: false,
  required: false,
  searchFn,
  returnFieldOnSelect: 'uid',
  searchFieldTargetField: 'label',
  labelField: 'label',
};

export const BasicFieldSelectSearch = () => (
  <CompositionWrapDefault height="4rem" width="8rem">
    <FieldSelectSearch {...defaultProps} required />
  </CompositionWrapDefault>
);
