import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';

import { EFilterType } from '@react_db_client/constants.client-types';
import { FieldBool } from './field-bool';

export const BasicFieldBool = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <WrapFieldComponent>
      <FieldBool
        type={EFilterType.bool}
        uid="foo"
        onChange={() => {}}
        value
        required
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
