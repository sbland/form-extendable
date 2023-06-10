import React from 'react';
import { render } from '@testing-library/react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { IObj } from '@form-extendable/lib';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import {
  FieldSelectReference,
  IFieldSelectReferenceProps,
  TFieldSelectReferenceProps,
} from './field-select-reference';
import * as compositions from './field-select-reference.composition';
import { defaultVal } from './demo-data';
import { ExampleGetRefObjectComponent } from './example-new-ref-obj-component';

const onChange = jest.fn();
const onBlur = jest.fn();

const asyncGetRefObjs = jest.fn();

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

describe('field-select-search', () => {
  beforeEach(() => {
    onChange.mockClear();
  });
  test('Renders', () => {
    render(
      <CompositionWrapDefault theme={{}}>
        <FieldSelectReference {...defaultProps} />
      </CompositionWrapDefault>
    );
  });

  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
});
