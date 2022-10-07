import React from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';

import { defaultVal } from './demo-data';
import { FieldDate } from './field-date';
import { EFilterType } from '@react_db_client/constants.client-types';

export const BasicFieldDate = () => (
  <CompositionWrapDefault height="4rem" width="4rem">
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
  </CompositionWrapDefault>
);
