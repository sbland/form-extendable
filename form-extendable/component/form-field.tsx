import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';
import { switchF } from '@react_db_client/helpers.func-tools';
import {
  TComponentMap,
  IFieldComponentProps,
  IFieldProps,
  THeading,
  TFieldReactComponent,
} from '@form-extendable/lib';
import {
  defaultComponent,
  defaultComponentMap,
} from '@form-extendable/components.component-map';
import { IFormFieldValidationError } from '@form-extendable/lib';
import { FieldLabel } from './field-label';
import { FormFieldError } from './field-error';

export interface IFormFieldProps<V, H extends THeading<V>>
  extends IFieldProps<V, H> {
  componentMap: TComponentMap;
}

export interface IFormFieldWrapProps {
  children: React.ReactNode;
  uid: Uid;
  type: string;
  hideLabel?: boolean;
  expandInput?: boolean;
  label: string;
  hasChanged?: boolean;
  error?: IFormFieldValidationError;
  required?: boolean;
}

export const FormFieldWrap: React.FC<IFormFieldWrapProps> = ({
  children,
  uid,
  type,
  hideLabel,
  expandInput,
  label,
  hasChanged,
  error,
  required,
}) => {
  const rowClassname = ['form_row', `form_row_heading_id_${uid}`]
    .filter((f) => f)
    .join(' ');
  return (
    <>
      <div className={rowClassname} data-testid={`${type}-${uid}`}>
        <div className="form_row_inner">
          <FieldLabel
            uid={uid}
            label={label}
            hasChanged={hasChanged}
            hidden={hideLabel}
            required={required}
            expandInput={expandInput}
          />
          <FormFieldError error={error} />
        </div>
        <div className="formComponentWrap">{children}</div>
      </div>
    </>
  );
};

/**
 *
 * Form field input props come from ...
 *  - the field heading meta data
 *  - The common form props
 */
export const FormField = <V, H extends THeading<V>>(
  propsIn: IFormFieldProps<V, H>
) => {
  const {
    heading,
    value,
    onChange,
    onBlur,
    additionalData,
    componentMap,
    disableAutoFill,
    error,
  } = propsIn;

  const { label, required, type, uid, hasChanged, hideLabel, expandInput } =
    heading;

  const FormComponent: TFieldReactComponent<V, H> = useMemo(
    () =>
      switchF(
        heading.type,
        componentMap as unknown as Record<
          string | EFilterType,
          () => TFieldReactComponent<V, H>
        >,
        defaultComponent
      ) as unknown as TFieldReactComponent<V, H>,
    [heading.type, componentMap, defaultComponent]
  );

  const props: IFieldComponentProps<V, H> = useMemo(() => {
    const fProps: IFieldComponentProps<V, H> = {
      onChange,
      onBlur,
      value,
      key: `${heading.uid}-sub`,
      additionalData,
      disableAutoFill,
      ...heading,
    };
    return fProps;
  }, [heading, onChange, value, additionalData]);

  return (
    <FormFieldWrap
      uid={uid}
      type={type}
      hideLabel={hideLabel}
      expandInput={expandInput}
      label={label}
      hasChanged={hasChanged}
      error={error}
      required={required}
    >
      <FormComponent
        {...(props as React.ComponentProps<typeof FormComponent>)}
      />
    </FormFieldWrap>
  );
};

FormField.propTypes = {
  heading: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    hasChanged: PropTypes.bool,
    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['true', 'false']),
    ]),
  }).isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  additionalData: PropTypes.shape({}).isRequired,
  componentMap: PropTypes.objectOf(PropTypes.elementType),
};

FormField.defaultProps = {
  value: null,
  componentMap: defaultComponentMap(),
};
