import React, { useState } from 'react';
import {
  CompositionWrapDefault,
  WrapFieldComponent,
} from '@react_db_client/helpers.composition-wraps';
import { FieldText } from './field-text';

export const BasicFieldText = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <WrapFieldComponent>
      <FieldText
        uid="id"
        unit="UNIT"
        onChange={(v) => alert(`Changed: id, val: ${v}`)}
        value="hello from FieldText"
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
