import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { EFilterType } from '@react_db_client/constants.client-types';
import { switchF } from '@react_db_client/helpers.func-tools';
import {
  TComponentMap,
  IFieldComponentProps,
  IFieldProps,
  THeading,
  TFieldReactComponent,
} from '@form-extendable/lib';
import { defaultComponent } from '@form-extendable/components.component-map';
import { FieldLabel } from './field-label';

export interface IFormFieldProps<V, H extends THeading<V>>
  extends IFieldProps<V, H> {
  componentMap: TComponentMap;
}

export const FormField = <V, H extends THeading<V>>(
  propsIn: IFormFieldProps<V, H>
) => {
  const { heading, value, onChange, additionalData, componentMap } = propsIn;
  const props: IFieldComponentProps<V> & H = useMemo(() => {
    const fProps: IFieldComponentProps<V> = {
      uid: heading.uid,
      label: heading.label,
      onChange,
      value,
      key: `${heading.uid}-sub`,
      additionalData,
    };
    const mergedProps: IFieldComponentProps<V> & H = {
      ...fProps,
      ...heading,
    };
    return mergedProps;
  }, [heading, onChange, value, additionalData]);
  const { label, required, type, uid, hasChanged, hideLabel } = heading;

  const FormComponent = useMemo(
    () =>
      // switchF<EFilterType | string, ReturnType<TComponentMapComponent<T, H>>>(
      switchF(
        heading.type,
        componentMap as Record<
          string | EFilterType,
          () => TFieldReactComponent<V, THeading<V>>
        >,
        defaultComponent
      ) as TFieldReactComponent<V, H>,
    [heading.type, componentMap, defaultComponent]
  );

  const labelClassName = [
    'form_label',
    `${required ? 'required' : ''}`,
    `${hasChanged ? 'hasChanged' : ''}`,
  ]
    .filter((f) => f)
    .join(' ');
  const rowClassname = ['form_row', `form_row_heading_id_${uid}`]
    .filter((f) => f)
    .join(' ');

  return (
    <div
      className={rowClassname}
      // TODO: Remove this styling
      style={{ border: '1px solid red', padding: '1rem' }}
      key={uid}
      data-testid={`${type}-${uid}`}
    >
      <FieldLabel
        uid={uid}
        label={label}
        inputClassName={labelClassName}
        hasChanged={hasChanged}
        required={required}
        hidden={hideLabel}
      />
      {!hideLabel ? <>{': '}</> : <span />}
      <FormComponent {...props} />
    </div>
  );
};

FormField.propTypes = {
  heading: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    unit: PropTypes.string,
    required: PropTypes.bool,
    hasChanged: PropTypes.bool,
    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['true', 'false']),
    ]),
  }).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  additionalData: PropTypes.shape({}).isRequired,
  componentMap: PropTypes.objectOf(PropTypes.elementType),
};

FormField.defaultProps = {
  value: null,
  componentMap: {},
};
