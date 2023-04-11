import React from 'react';
import ReactDOM from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import { Uid } from '@react_db_client/constants.client-types';
import { Emoji } from '@react_db_client/components.emoji';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { TComponentMap, THeading } from '@form-extendable/lib';
import {
  formValidation,
  IValidationError,
  useDebounce,
} from '@form-extendable/utils';

import { FormField as DefaultFormField, IFormFieldProps } from './form-field';
import { FormInputs } from './form-inputs';
import { FormStatus, IFormStatusProps } from './form-status';
import { flattenHeadings } from '@form-extendable/testing';

export interface IFormSubmit<CompleteFormType> {
  formEditData: Partial<CompleteFormType>;
  formData: CompleteFormType;
}

export interface IFormProps<CompleteFormType> {
  id?: Uid;
  FormField?: React.FC<IFormFieldProps<any, THeading<any>>>;
  formDataInitial?: Partial<CompleteFormType>;
  headings: THeading<any>[];
  onSubmit: (submissionData: IFormSubmit<CompleteFormType>) => void;
  onChange?: (
    field: string,
    value: any,
    newFormData: Partial<CompleteFormType>
  ) => void;
  showEndBtns?: boolean;
  submitBtnText?: React.ReactNode;
  showKey?: boolean;
  orientation?: 'vert' | 'horiz';
  disableAutocomplete?: boolean;
  endButtonRefOverride?: HTMLElement;
  errorCallback?: (err: string | Error) => void;
  additionalData?: Partial<CompleteFormType>;
  componentMap?: TComponentMap;
  autosave?: boolean;
  FormStatusComponent?: React.FC<IFormStatusProps>;
  debounceTimeout?: number;
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
export const Form = <CompleteFormType,>({
  id,
  FormField = DefaultFormField,
  formDataInitial = {},
  headings,
  onSubmit,
  onChange = () => {},
  showEndBtns = true,
  submitBtnText = null,
  showKey = true,
  orientation = 'vert',
  disableAutocomplete,
  endButtonRefOverride,
  errorCallback = () => {},
  additionalData = {},
  autosave = false,
  debounceTimeout = 400,
  FormStatusComponent = FormStatus,
  componentMap = defaultComponentMap(),
}: IFormProps<CompleteFormType>) => {
  const [formEditData, setFormEditData] = React.useState<
    Partial<CompleteFormType>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [formDirty, setFormDirty] = React.useState(false);
  const [hasLocalChanges, setHasLocalChanges] = React.useState(false);
  const [validationErrors, setValidationErrors] =
    React.useState<IValidationError | null>(null);
  const [lastChangedFieldValue, setlLastChangedFieldValue] =
    React.useState<[any, any]>();

  const callSubmitDebounced = useDebounce({
    fn: async (submitData: IFormSubmit<CompleteFormType>) =>
      onSubmit(submitData),
    timeout: debounceTimeout,
    callback: async () => {
      setSubmitting(false);
      setFormDirty(false);
    },
    errorCallback,
  });
  const [endButtonContainerRef, setEndButtonContainerRef] =
    React.useState<HTMLElement | null>(null);
  const formData = React.useMemo<CompleteFormType>(
    () => ({ ...cloneDeep(formDataInitial), ...formEditData }),
    [formDataInitial, formEditData]
  );

  const updateFormData = React.useCallback(
    (field, value) => {
      setValidationErrors(null);
      setFormDirty(true);
      setHasLocalChanges(true);
      setlLastChangedFieldValue([field, value]);
      setFormEditData((prev) => {
        const newFormData = cloneDeep(prev);
        newFormData[field] = value;
        return newFormData;
      });
    },
    [onChange, autosave]
  );

  const flattenedHeadings = React.useMemo(
    () => flattenHeadings(headings),
    [headings]
  );

  const handleSubmit = React.useCallback(
    (debounce = true, throwErrors = true) => {
      setValidationErrors(null);
      setSubmitting(true);
      // TODO: We may want to validate after debounce!
      const validationResult = formValidation(formData, flattenedHeadings);
      if (validationResult === true && debounce)
        callSubmitDebounced({ formEditData, formData });
      else if (validationResult === true && !debounce) {
        onSubmit({ formEditData, formData });
        setSubmitting(false);
        setFormDirty(false);
      } else if (errorCallback && throwErrors) {
        errorCallback((validationResult as IValidationError).error);
      } else {
        setValidationErrors(validationResult as IValidationError);
      }
    },
    [
      formData,
      formEditData,
      flattenedHeadings,
      callSubmitDebounced,
      onSubmit,
      errorCallback,
    ]
  );

  React.useEffect(() => {
    if (hasLocalChanges) {
      setHasLocalChanges(false);
      if (onChange && lastChangedFieldValue) {
        const [field, value] = lastChangedFieldValue;
        onChange(field, value, formEditData);
      }
      if (autosave) {
        handleSubmit(true, false);
      }
    }
  }, [
    hasLocalChanges,
    handleSubmit,
    autosave,
    onChange,
    lastChangedFieldValue,
  ]);

  const message =
    (validationErrors && `Form validation error: ${validationErrors.error}`) ||
    (submitting && 'Saving unsaved changes') ||
    ((hasLocalChanges || formDirty) && 'Unsaved changes!') ||
    'All changes are saved';

  return (
    <form
      aria-label="form" // TODO: Get name from props
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(false);
      }}
      // Another possible hack to stop autocomplete on chrome
      // autoComplete={disableAutocomplete ? 'chrome-off' : 'on'}
      autoComplete={disableAutocomplete ? 'off' : 'on'}
      className="form sectionWrapper"
      style={{ flexDirection: 'column' }}
    >
      {(showKey || FormStatusComponent) && (
        <section>
          {showKey && <p>* is required. (!) has been modified.</p>}
          {/* TODO: Move status to end button portal */}
          {FormStatusComponent && <FormStatusComponent message={message} />}
        </section>
      )}
      <FormInputs
        id={id}
        headings={headings}
        formData={formData}
        onFormInputChange={updateFormData}
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
              onClick={() => handleSubmit(false)}
            >
              {submitBtnText || <Emoji emoj="💾" label="Submit" />}
            </button>
            {/* <button type="button" className="button-one" onClick={handleReset}>
              <Emoji emoj="❌" label="Reset" />
            </button> */}
          </div>,
          endButtonRefOverride || endButtonContainerRef
        )}
    </form>
  );
};

// Form.propTypes = {
//   FormField: PropTypes.elementType,
//   /* Initial form mdata */
//   formDataInitial: PropTypes.objectOf(PropTypes.any),
//   /* Form field headings data */
//   headings: PropTypes.arrayOf(
//     PropTypes.shape({
//       uid: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   /* Called on form submit */
//   onSubmit: PropTypes.func.isRequired,
//   /* Called when inputs change */
//   onChange: PropTypes.func,
//   /* Show save buttons */
//   showEndBtns: PropTypes.bool,
//   /* Text to display in submit btn */
//   submitBtnText: PropTypes.node,
//   /* Disable autocomplete for the form */
//   disableAutocomplete: PropTypes.bool,
//   /* Show info key */
//   showKey: PropTypes.bool,
//   /* Form orientation (horiz/vert) */
//   orientation: PropTypes.oneOf(['horiz', 'vert']),
//   /* React reference for button container */
//   endButtonRefOverride: PropTypes.oneOfType([
//     // Either a function
//     PropTypes.func,
//     // Or the instance of a DOM native element (see the note about SSR)
//     PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//   ]), // Should be a react reference
//   /* Callback on error */
//   errorCallback: PropTypes.func,
//   /* Additional data to apply to form on save */
//   additionalData: PropTypes.shape({}),
//   /* Mapping of field type id to React component field component */
//   componentMap: PropTypes.objectOf(PropTypes.elementType),
//   FormStatusComponent: PropTypes.elementType,
// };

// Form.defaultProps = {
//   FormField: DefaultFormField,
//   formDataInitial: {} as any,
//   onChange: () => {},
//   showEndBtns: true,
//   submitBtnText: null,
//   showKey: true,
//   orientation: 'vert',
//   disableAutocomplete: false,
//   endButtonRefOverride: null,
//   errorCallback: alert,
//   additionalData: {} as any,
//   componentMap: defaultComponentMap(),
//   FormStatusComponent: FormStatus,
// };
