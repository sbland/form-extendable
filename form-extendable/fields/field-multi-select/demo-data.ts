import { IHeadingSelectMulti } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';
import { TFieldMultiSelect } from './field-multi-select';

export const demoOptions = [
  {
    uid: 'a',
    label: 'A',
  },
  {
    uid: 'b',
    label: 'B',
  },
  {
    uid: 'c',
    label: 'C',
  },
];

export const demoHeading: IHeadingSelectMulti = {
  uid: 'multiSelectListShowAll',
  label: 'Multi Select Show All',
  type: EFilterType.selectMulti,
  selectType: 'showall',
  options: demoOptions,
  required: true,
};

export const props: TFieldMultiSelect = {
  type: EFilterType.selectMulti,
  label: demoHeading.label,
  uid: demoHeading.uid,
  unit: 'unit',
  onChange: () => {},
  options: demoOptions,
  value: [demoOptions[0].uid],
  required: demoHeading.required,
};
