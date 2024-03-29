import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import {
  WrapFieldComponent,
  CompositionWrapDefault,
} from '@form-extendable/composition-helpers';
import { FieldText } from './field-text';

export const BasicFieldText = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <WrapFieldComponent>
      <FieldText
        uid="id"
        label="Field Text"
        type={EFilterType.text}
        unit="UNIT"
        onChange={(v) => alert(`Changed: id, val: ${v}`)}
        onBlur={() => {}}
        value="hello from FieldText"
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

export const BasicFieldTextWithLabel = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <label id="id-label" htmlFor="id-input">
      Label
    </label>
    <WrapFieldComponent>
      <FieldText
        uid="id"
        // id="input-id"
        label="Field Text"
        type={EFilterType.text}
        unit="UNIT"
        onChange={(v) => alert(`Changed: id, val: ${v}`)}
        onBlur={() => {}}
        value="hello from FieldText"
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
