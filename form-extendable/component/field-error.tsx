import React from 'react';
import { IFormFieldValidationError } from '@form-extendable/lib';

/* Error component for form field validation errors */

export const FormFieldError: React.FC<{
  error?: IFormFieldValidationError;
}> = ({ error }) =>
  error ? (
    <div className="form_field_error" data-testid="form-field-error">
      {error.message}
    </div>
  ) : (
    <></>
  );
