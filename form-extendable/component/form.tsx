import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import { Emoji } from '@react_db_client/components.emoji';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { TComponentMap, TFormData, THeading } from '@form-extendable/lib';
import { formValidation, IValidationError } from '@form-extendable/utils';

import { FormField as DefaultFormField, IFormFieldProps } from './form-field';
import { FormInputs } from './form-inputs';

export interface IFormSubmit {
  formEditData: TFormData;
  formData: TFormData;
}

export interface IFormProps {
  FormField?: React.FC<IFormFieldProps<any, THeading<any>>>;
  formDataInitial?: TFormData;
  headings: THeading<any>[];
  onSubmit: (submissionData: IFormSubmit) => void;
  onChange?: (field: string, value: any, newFormData: TFormData) => void;
  showEndBtns?: boolean;
  submitBtnText?: React.ReactNode;
  showKey?: boolean;
  orientation?: 'vert' | 'horiz';
  disableAutocomplete?: boolean;
  endButtonRefOverride?: React.RefObject<HTMLElement>;
  errorCallback?: (err: string) => void;
  additionalData?: TFormData;
  componentMap?: TComponentMap;
}

/** Generic Form Component that manages updates and layout
 *
 * The Form component handles general form requirements such as storing
 * edit data, auto generating a layout bassed on provided headers.

 # Headings
 The headings should have the correct headings shape...

 # Mounting the save buttons using a ref:
 If a react ref is provided to `endButtonRefOverride` then the save buttons will be placed in
 the referenced container.

 * On submit signature:
 * ({ formEditData, formData }) => {...}
 *
 * onChange Signature:
 * (field, value, newFormData) => {...}

 * additionalData - additional data to be passed to form field components.
Useful when using a custom field
 * componentMap - a map of field type against react component
 */
export const Form = ({
  FormField,
  formDataInitial,
  headings,
  onSubmit,
  onChange,
  showEndBtns,
  submitBtnText,
  showKey,
  orientation,
  disableAutocomplete,
  endButtonRefOverride,
  errorCallback,
  additionalData,
  componentMap = defaultComponentMap(),
}: IFormProps) => {
  const [formEditData, setFormEditData] = useState({});
  const [endButtonContainerRef, setEndButtonContainerRef] =
    useState<HTMLElement | null>(null);

  const formData = useMemo<TFormData>(
    () => ({ ...cloneDeep(formDataInitial), ...formEditData }),
    [formDataInitial, formEditData]
  );

  const updateFormData = useCallback(
    (field, value) => {
      setFormEditData((prev) => {
        const newFormData = cloneDeep(prev);
        newFormData[field] = value;
        if (onChange) onChange(field, value, newFormData);
        return newFormData;
      });
    },
    [onChange]
  );

  // const handleReset = () => {
  //   setFormEditData({});
  // };

  const handleSubmit = useCallback(() => {
    const passesFormValidation = formValidation(formData, headings);
    if (passesFormValidation === true) onSubmit({ formEditData, formData });
    else if (errorCallback) {
      errorCallback((passesFormValidation as IValidationError).error);
    }
  }, [formData, formEditData, headings, onSubmit, errorCallback]);

  return (
    <form
      aria-label="form" // TODO: Get name from props
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      // Another possible hack to stop autocomplete on chrome
      // autoComplete={disableAutocomplete ? 'chrome-off' : 'on'}
      autoComplete={disableAutocomplete ? 'off' : 'on'}
      className="form sectionWrapper"
    >
      <FormInputs
        headings={headings}
        formData={formData}
        onFormInputChange={updateFormData}
        showKey={showKey}
        orientation={orientation}
        additionalData={additionalData}
        componentMap={componentMap}
        FormField={FormField}
      />
      <section
        ref={(ref) => ref && setEndButtonContainerRef(ref)}
        style={{ width: '100%' }}
      />
      {showEndBtns &&
        endButtonContainerRef &&
        ReactDOM.createPortal(
          <div className="submitBtns">
            {/* TODO: Work out why setting this as a submit button does not work */}
            <button
              type="button"
              className="button-two submitBtn"
              onClick={handleSubmit}
            >
              {submitBtnText || <Emoji emoj="💾" label="Submit" />}
            </button>
            {/* <button type="button" className="button-one" onClick={handleReset}>
              <Emoji emoj="❌" label="Reset" />
            </button> */}
          </div>,
          endButtonRefOverride?.current || endButtonContainerRef
        )}
    </form>
  );
};

Form.propTypes = {
  FormField: PropTypes.elementType,
  /* Initial form mdata */
  formDataInitial: PropTypes.objectOf(PropTypes.any),
  /* Form field headings data */
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  /* Called on form submit */
  onSubmit: PropTypes.func.isRequired,
  /* Called when inputs change */
  onChange: PropTypes.func,
  /* Show save buttons */
  showEndBtns: PropTypes.bool,
  /* Text to display in submit btn */
  submitBtnText: PropTypes.node,
  /* Disable autocomplete for the form */
  disableAutocomplete: PropTypes.bool,
  /* Show info key */
  showKey: PropTypes.bool,
  /* Form orientation (horiz/vert) */
  orientation: PropTypes.oneOf(['horiz', 'vert']),
  /* React reference for button container */
  endButtonRefOverride: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]), // Should be a react reference
  /* Callback on error */
  errorCallback: PropTypes.func,
  /* Additional data to apply to form on save */
  additionalData: PropTypes.shape({}),
  /* Mapping of field type id to React component field component */
  componentMap: PropTypes.objectOf(PropTypes.elementType),
};

Form.defaultProps = {
  FormField: DefaultFormField,
  formDataInitial: {},
  onChange: () => {},
  showEndBtns: true,
  submitBtnText: null,
  showKey: true,
  orientation: 'vert',
  disableAutocomplete: false,
  endButtonRefOverride: null,
  errorCallback: alert,
  additionalData: {},
  componentMap: defaultComponentMap(),
};
