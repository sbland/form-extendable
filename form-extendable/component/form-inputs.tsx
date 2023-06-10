import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';
import {
  IHeadingEmbedded,
  TComponentMap,
  THeading,
} from '@form-extendable/lib';
import { FormSection } from '@form-extendable/styles';
import { IFormFieldValidationError } from '@form-extendable/lib';
import { FormField as DefaultFormField, IFormFieldProps } from './form-field';

export interface IFormInputsProps<CompleteFormType> {
  FormField: React.FC<IFormFieldProps<any, THeading<any>>>;
  headings: THeading<any>[];
  formData: CompleteFormType;
  fieldErrors?: { [uid: Uid]: IFormFieldValidationError };
  onFormInputChange: (uid: Uid, val: any) => void;
  onFormInputBlur: (field: Uid) => void;
  orientation: 'horiz' | 'vert';
  heading?: Uid;
  showTitle?: boolean;
  additionalData?: Partial<CompleteFormType>;
  componentMap: TComponentMap;
  styleOverrides?: React.CSSProperties;
  id: Uid;
  disableAutoFill?: boolean;
}

export const FormInputs = <CompleteFormType,>({
  FormField,
  headings,
  formData,
  fieldErrors,
  onFormInputChange,
  onFormInputBlur,
  orientation,
  heading: sectionTitle,
  showTitle,
  additionalData,
  componentMap,
  styleOverrides = {},
  id,
  disableAutoFill,
}: IFormInputsProps<CompleteFormType>) => {
  const className = [
    'form_inputs',
    'formSection',
    `${orientation}`,
    sectionTitle && showTitle ? 'hasHeading' : '',
    `formSection_${id}`,
  ]
    .filter((f) => f)
    .join(' ');

  const fields = useMemo(
    () =>
      headings.map((heading) => {
        const value =
          formData && formData[heading.uid] !== null
            ? formData[heading.uid]
            : heading.defaultValue;

        if (heading.type === EFilterType.embedded) {
          return (
            <FormInputs
              key={heading.uid}
              headings={(heading as IHeadingEmbedded).children}
              formData={formData}
              fieldErrors={fieldErrors}
              onFormInputChange={onFormInputChange}
              onFormInputBlur={onFormInputBlur}
              orientation={(heading as IHeadingEmbedded).orientation}
              heading={(heading as IHeadingEmbedded).label}
              additionalData={additionalData}
              showTitle={(heading as IHeadingEmbedded).showTitle}
              componentMap={componentMap}
              FormField={FormField}
              id={heading.uid}
              styleOverrides={heading.styleOverrides}
              isSection
              disableAutoFill={disableAutoFill}
            />
          );
        }
        return (
          <FormField
            heading={heading}
            onChange={(newVal) => onFormInputChange(heading.uid, newVal)}
            onBlur={() => onFormInputBlur(heading.uid)}
            value={value}
            key={heading.uid}
            additionalData={additionalData}
            componentMap={componentMap}
            disableAutoFill={disableAutoFill}
            error={fieldErrors && fieldErrors[heading.uid]}
          />
        );
      }),
    [
      headings,
      formData,
      onFormInputChange,
      additionalData,
      componentMap,
      FormField,
    ]
  );

  return (
    <FormSection className={className} style={styleOverrides}>
      {showTitle && <h4 className="formSection_heading">{sectionTitle}</h4>}
      {fields}
    </FormSection>
  );
};

FormInputs.propTypes = {
  FormField: PropTypes.func,
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      orientation: PropTypes.oneOf(['horiz', 'vert']),
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      unit: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  formData: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['horiz', 'vert']),
  heading: PropTypes.string,
  isSection: PropTypes.bool,
  showKey: PropTypes.bool,
  additionalData: PropTypes.shape({}),
  componentMap: PropTypes.objectOf(PropTypes.elementType).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormInputs.defaultProps = {
  FormField: DefaultFormField,
  orientation: 'vert',
  heading: '',
  isSection: false,
  showKey: true,
  additionalData: {},
  id: null,
};
