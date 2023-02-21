import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import {
  WrapFieldComponent,
  CompositionWrapDefault,
} from '@form-extendable/composition-helpers';
import { FieldDict } from './field-dict';

export const BasicFieldDict = () => {
  return (
    <CompositionWrapDefault height="20rem" width="20rem">
      <WrapFieldComponent>
        <FieldDict
          uid="id"
          label="Field Text"
          type={EFilterType.dict}
          unit="UNIT"
          onChange={(v) => alert(`Changed: id, val: ${v}`)}
          value={{
            example: 'hello',
            nested: {
              foo: 'foo',
              bar: 'bar',
            },
            list: [
              '1',
              '2',
            ]
          }}
        />
      </WrapFieldComponent>
    </CompositionWrapDefault>
  );
};
