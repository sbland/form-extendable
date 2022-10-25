import React from 'react';
import { filterTypes } from '@react_db_client/constants.client-types';
import { FieldReadOnly } from './field-read-only';

export const BasicFieldReadOnly = () => (
  <FieldReadOnly
    uid="readonly"
    label="Read Only"
    onChange={() => {}}
    value="hello from FieldReadOnly"
    unit="TEXT"
    type={filterTypes.text}
    options={[]}
  />
);
