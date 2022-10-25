import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';

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
        value={defaultVal}
        required
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);
