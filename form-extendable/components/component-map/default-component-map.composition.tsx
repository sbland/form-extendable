/* eslint react/prop-types: 0 */
import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';
import { switchF } from '@react_db_client/helpers.func-tools';
import {
  TComponentMap,
  TFieldReactComponent,
  THeading,
} from '@form-extendable/lib';
import { defaultComponent, defaultComponentMap } from './default-component-map';

const SelectType = ({ type, setType }) => (
  <select value={type} onChange={(e) => setType(e.target.value)}>
    {Object.values(EFilterType).map((k) => (
      <option value={k}>k</option>
    ))}
  </select>
);

const componentMap: TComponentMap = defaultComponentMap();

export const ExampleField = () => {
  const [type, setType] = React.useState(EFilterType.text);

  const FormComponent: TFieldReactComponent<
    unknown,
    THeading<unknown>
  > = switchF<EFilterType, TFieldReactComponent<unknown, THeading<unknown>>>(
    type,
    componentMap as Record<
      EFilterType,
      () => TFieldReactComponent<unknown, THeading<unknown>>
    >,
    defaultComponent
  );
  return (
    <>
      <SelectType type={type} setType={setType} />
      <CompositionWrapDefault height="4rem" width="16rem">
        <WrapFieldComponent>
          <FormComponent
            uid="id"
            label="Field Text"
            type={EFilterType.text}
            unit="UNIT"
            onChange={(v) => alert(`Changed: id, val: ${v}`)}
            value="hello from FieldText"
          />
        </WrapFieldComponent>
      </CompositionWrapDefault>
    </>
  );
};
