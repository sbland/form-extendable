import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { filterTypes } from '@react_db_client/constants.client-types';

import { FormField as DefaultFormField } from './form-field';
import { IHeadingEmbedded, TComponentMap, TFormData, THeading } from '@form-extendable/lib';

export interface IFormInputsProps {
  FormField: typeof DefaultFormField;
  headings: THeading<any>[];
  formData: TFormData;
  onFormInputChange: (uid: string, val: any) => void;
  orientation: 'horiz' | 'vert';
  heading?: string;
  isSection?: boolean;
  showKey?: boolean;
  additionalData?: TFormData;
  componentMap: TComponentMap;
  id: string;
}

export const FormInputs = ({
  FormField,
  headings,
  formData,
  onFormInputChange,
  orientation,
  heading: sectionTitle,
  isSection,
  showKey,
  additionalData,
  componentMap,
  id,
}: IFormInputsProps) => {
  const className = [
    'form_inputs',
    'formSection',
    `${orientation}`,
    sectionTitle ? 'hasHeading' : '',
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

        if (heading.type === filterTypes.embedded) {
          return (
            <FormInputs
              key={heading.uid}
              headings={(heading as IHeadingEmbedded<unknown>).children}
              formData={formData}
              onFormInputChange={onFormInputChange}
              orientation={(heading as IHeadingEmbedded<unknown>).orientation}
              heading={(heading as IHeadingEmbedded<unknown>).label}
              additionalData={additionalData}
              componentMap={componentMap}
              FormField={FormField}
              id={heading.uid}
              isSection
            />
          );
        }
        // return <div>{heading.uid}</div>;
        return (
          <FormField
            heading={heading}
            onChange={(newVal) => onFormInputChange(heading.uid, newVal)}
            value={value}
            key={heading.uid}
            additionalData={additionalData}
            componentMap={componentMap}
          />
        );
      }),
    [headings, formData, onFormInputChange, additionalData, componentMap]
  );

  return (
    <section className={className}>
      {!isSection && showKey && <p>* is required. (!) has been modified.</p>}
      <h4 className="formSection_heading">{sectionTitle}</h4>
      {fields}
    </section>
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
  formData: PropTypes.object.isRequired,
  onFormInputChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['horiz', 'vert']),
  heading: PropTypes.string,
  isSection: PropTypes.bool,
  showKey: PropTypes.bool,
  additionalData: PropTypes.shape({}),
  componentMap: PropTypes.objectOf(PropTypes.elementType).isRequired,
  id: PropTypes.any,
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
