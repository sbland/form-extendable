import { IObj } from '@form-extendable/lib';

export const parseValMultiple = <V extends IObj>(
  val: string | string[] | V | V[] | null
): V[] => {
  if (!val) {
    return [];
  }
  const out = Array.isArray(val)
    ? val.map((v) => {
        if (typeof v === 'string') return { uid: v, label: v }; // We have to use string as both id and label
        if (typeof v === 'object') return v as V;
      })
    : [val];
  return out as V[];
};

export const parseVal = <V extends IObj>(
  val: string | string[] | V | V[] | null
): V | null => {
  if (!val) {
    return null;
  }
  if (Array.isArray(val))
    throw Error(
      'Multiple values passed to select search without multiple prop set to true'
    );
  if (typeof val === 'string') return { uid: val, label: val } as V;
  if (typeof val === 'object') return val;
  if (typeof val === 'boolean') {
    const boolVal = val ? 'true' : 'false';
    return { uid: boolVal, label: boolVal } as V;
  }
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
