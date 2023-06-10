import React from 'react';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IObj } from '@form-extendable/lib';
import {
  FieldSelectSearch,
  TFieldSelectSearchProps,
} from './field-select-search';
import { defaultVal, demoOptions } from './demo-data';

const onChange = () => {};
const onBlur = () => {};
const searchFn = async () => demoOptions;

const defaultProps: TFieldSelectSearchProps<IObj> = {
  type: EFilterType.selectSearch,
  label: 'Select search field',
  uid: 'demoid',
  unit: 'demounit',
  onChange,
  onBlur,
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
