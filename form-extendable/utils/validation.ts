import { Uid } from '@react_db_client/constants.client-types';
import { TFormData, THeading } from '@form-extendable/lib';

export interface IValidationError {
  error: string;
  fields?: Uid[];
}

export const formValidation = <D, V>(
  data: D,
  headings: THeading<V>[]
): boolean | IValidationError => {
  const requiredHeadings = headings.filter((h) => h.required);
  const missingFields = requiredHeadings.filter(
    (h) => data[h.uid] == null || data[h.uid] === ''
  );
  if (missingFields.length > 0)
    return {
      error: `Missing the following fields: ${missingFields
        .map((h) => h.label)
        .join(', ')}`,
      fields: missingFields.map((h) => h.uid),
    };
  const hasAllRequired = requiredHeadings.every((h) => data[h.uid] != null);
  if (!hasAllRequired) return { error: 'Missing required fields' };
  return data && hasAllRequired;
};
