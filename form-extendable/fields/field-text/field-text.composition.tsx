import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';
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
        value="hello from FieldText"
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
