import { Uid } from '@react_db_client/constants.client-types';
import {
  THeading,
  EFormValidationError,
  IFormFieldValidationError,
} from '@form-extendable/lib';

export interface IValidationError {
  message: string;
  // fields?: Uid[];
}

export const formValidation = <D, V>(
  data: D,
  headings: THeading<V>[]
):
  | [false, IValidationError, { [uid: Uid]: IFormFieldValidationError }]
  | [true, null, {}] => {
  if (!data) return [false, { message: 'No data provided' }, {}];
  const headingErrors = headings
    .map((h) => {
      const value = data[h.uid];
      if (
        h.required &&
        (value === null || value === '' || value === undefined)
      ) {
        const error: IFormFieldValidationError = {
          type: EFormValidationError.REQUIRED,
          message: `${h.label} field is required`,
          field: h.uid,
          value: value,
        };
        return [h, error];
      }
      return [h, null];
    })
    .filter(([, e]) => e != null) as [THeading<V>, IFormFieldValidationError][];
  if (headingErrors.length > 0) {
    const message = headingErrors[0][1];
    const headingErrorMap = headingErrors.reduce(
      (acc, [h, e]) => ({ ...acc, [h.uid]: e }),
      {} as { [uid: Uid]: IFormFieldValidationError }
    );

    return [false, message, headingErrorMap];
  }
  return [true, null, {}];
};
