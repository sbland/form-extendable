import { IObj } from '@form-extendable/lib';

export const parseValMultiple = <k>(
  val: string | string[] | IObj | IObj[] | k | k[] | null,
  returnFieldOnSelect: string | undefined
): IObj[] | k[] => {
  if (!val) {
    return [];
  }
  const out = Array.isArray(val)
    ? val.map((v) => {
        if (typeof v === 'string' && !returnFieldOnSelect)
          throw Error(
            'Must supply input as object array or a returnFieldOnSelect'
          );
        if (typeof v === 'string' && returnFieldOnSelect) return v as k;
        if (typeof v === 'object' && returnFieldOnSelect)
          return v[returnFieldOnSelect] as k;
        if (typeof v === 'object' && !returnFieldOnSelect) return v as IObj;
      })
    : [val];
  if (returnFieldOnSelect) return out as k[];
  else return out as IObj[];
};

export const parseVal = <V>(
  val: string | string[] | IObj | IObj[] | V | V[] | null,
  returnFieldOnSelect: string | undefined
): string => {
  if (!val) {
    return '';
  }
  if (Array.isArray(val))
    throw Error(
      'Multiple values passed to select search without multiple prop set to true'
    );
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && returnFieldOnSelect)
    return val[returnFieldOnSelect]; // TODO: k may not be string here
  if (typeof val === 'object' && !returnFieldOnSelect)
    throw Error(
      'Object passed to select search without returnFieldOnSelect prop'
    );
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  throw Error(
    `Invalid value type passed to field select search: ${typeof val}`
  );
};

export const parseLabel =
  (labelField?: string) =>
  (val): string => {
    if (!val) {
      return '';
    }
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && labelField) return val[labelField]; // TODO: k may not be string here
    if (typeof val === 'object' && !labelField)
      throw Error('Object passed to select and search without labelField');
    throw Error('Could not create labels');
  };
