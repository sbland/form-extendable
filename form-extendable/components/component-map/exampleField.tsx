import React from 'react';
import { EFilterType } from '@react_db_client/constants.client-types';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';
import {
  IFieldComponentProps,
  IHeadingOther,
  TComponentMap,
  TFieldReactComponent,
  THeading,
} from '@form-extendable/lib';

export type TOptionsMap<
  KType extends string | number | symbol,
  OutputType
> = Record<KType, KType | (() => OutputType)>;

/**
 *
 * @param {string} c // called case
 * @param {object} obj // Cases
 * @param {function} default // default
 */
export const switchF = <KType extends string | number | symbol, OutputType>(
  c: KType,
  options: TOptionsMap<KType, OutputType>,
  def: null | (() => OutputType) = null
): OutputType => {
  const activeCaseList: (KType | (() => OutputType))[] = Object.keys(options)
    .map((k) => k as KType)
    .filter((key) => {
      if (Array.isArray(key)) {
        return key.indexOf(c) >= 0;
      }
      // if (typeof key === 'function') {
      //   return key(c);
      // }
      return key === c;
    })
    .map((key) => options[key]);
  if (activeCaseList.length === 0 && def) return def();
  const activeCase = activeCaseList[0];
  if (typeof activeCase === 'function') return activeCase();
  if (typeof activeCase === 'string' && options[activeCase as string])
    return options[activeCase as string]();
  throw Error('switch F Failed!');
};

const SelectType = ({ type, setType }) => {
  return (
    <select value={type}>
      {Object.values(EFilterType).map((k) => (
        <option value={k}>k</option>
      ))}
    </select>
  );
};

// const componentMap: TComponentMap = defaultComponentMap();

export enum ETypes {
  FOO = 'FOO',
  BAR = 'BAR',
}



const componentMap: Record<ETypes, () => TFieldReactComponent<any, THeading<any>>> = {
  [ETypes.FOO]: () => (props) => <>foo: {props.label}</>,
  [ETypes.BAR]: () => (props) => <>bar: {props.label}</>,
};

const defaultComponent: () => TFieldReactComponent<string, IHeadingOther<string>> = () => (props) => <>Def: {props.value}</>;

export const ExampleField = () => {
  const [type, setType] = React.useState(ETypes.BAR);

  const FormComponent = switchF<ETypes, TFieldReactComponent<unknown, THeading<unknown>>>(
    type,
    componentMap,
    defaultComponent as () => TFieldReactComponent<unknown, THeading<unknown>>
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
            // unit="UNIT"
            onChange={(v) => alert(`Changed: id, val: ${v}`)}
            value="hello from FieldText"
          />
        </WrapFieldComponent>
      </CompositionWrapDefault>
    </>
  );
};
