import { EFilterType } from '@react_db_client/constants.client-types';
import { switchF } from '@react_db_client/helpers.func-tools';
import { defaultComponent, defaultComponentMap } from './default-component-map';

describe('Default component map', () => {
  test('should be able to extract component from map with switch', () => {
    const FormComponent = switchF(
      EFilterType.text,
      defaultComponentMap(),
      defaultComponent
    );
    expect(FormComponent).toBeTruthy();
  });
});
