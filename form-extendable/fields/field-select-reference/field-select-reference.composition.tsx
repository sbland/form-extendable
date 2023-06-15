import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IObj } from '@form-extendable/lib';
import {
  FieldSelectReference,
  IFieldSelectReferenceProps,
  TFieldSelectReferenceProps,
} from './field-select-reference';
import { ExampleGetRefObjectComponent } from './example-new-ref-obj-component';
import { defaultVal } from './demo-data';

const onChange = () => {};
const onBlur = () => {};

const asyncGetRefObjs = async () => [];

const defaultProps: TFieldSelectReferenceProps<IObj> &
  IFieldSelectReferenceProps<IObj> = {
  type: EFilterType.reference,
  label: 'Select search field',
  uid: 'demoid',
  unit: 'demounit',
  collection: 'demo',
  onChange,
  onBlur,
  value: defaultVal,
  multiple: false,
  required: false,
  returnFieldOnSelect: 'uid',
  searchFieldTargetField: 'name',
  labelField: 'name',
  asyncGetRefObjs,
  AddNewReferenceComponent: ExampleGetRefObjectComponent,
};

export const BasicFieldSelectReference = () => {
  return <FieldSelectReference {...defaultProps} />;
};
