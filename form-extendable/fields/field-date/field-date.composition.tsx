import React from 'react';
import { WrapFieldComponent, CompositionWrapDefault } from '@form-extendable/composition-helpers';

import { EFilterType } from '@react_db_client/constants.client-types';
import { defaultVal } from './demo-data';
import { FieldDate } from './field-date';

export const BasicFieldDate = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
    <WrapFieldComponent>
      <FieldDate
        type={EFilterType.date}
        uid="foo"
        unit="unit"
        label="Date field"
        // defaultValue={defaultVal}
        onChange={() => {}}
        onBlur={() => {}}
        value={defaultVal}
        required
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
