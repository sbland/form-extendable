import { IHeadingCustomType, IObj, THeading } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export const demoCustomTypeHeading: IHeadingCustomType = {
  uid: 'demoField',
  label: 'Custom Field Types',
  type: 'demoFieldType',
  customType: true,
};

export const demoHeadingsData: THeading<any>[] = [
  {
    uid: 'uid',
    label: 'UID',
    type: EFilterType.uid,
  },
  {
    uid: 'name',
    label: 'Text',
    type: EFilterType.text,
    required: true,
  },
  {
    uid: 'button',
    label: 'Button',
    type: EFilterType.button,
    onClick: () => null,
  },
  {
    uid: 'longText',
    label: 'Long Text',
    type: EFilterType.textLong,
  },
  {
    uid: 'date',
    label: 'Date',
    type: EFilterType.date,
  },
  {
    uid: 'number',
    label: 'Number',
    type: EFilterType.number,
  },
  {
    uid: 'numberCapped',
    label: 'Number Capped',
    type: EFilterType.number,
    min: 3,
    max: 8,
    step: 0.1,
    defaultValue: 5,
  },
  {
    uid: 'reference',
    label: 'Reference',
    collection: 'democollection',
    type: EFilterType.reference,
    searchFieldTargetField: 'label',
  },
  {
    uid: 'file',
    label: 'File',
    collectionId: 'democollection',
    documentId: 'docid',
    fileType: 'document',
    type: EFilterType.file,
  },
  {
    uid: 'fileMultiple',
    label: 'File Multiple',
    collectionId: 'democollection',
    documentId: 'docid',
    fileType: 'document',
    type: EFilterType.fileMultiple,
  },
  {
    uid: 'image',
    label: 'Image',
    collectionId: 'collectionId',
    documentId: 'documentId',
    fileType: 'image',
    type: EFilterType.image,
  },
  {
    uid: 'bool',
    label: 'Bool',
    type: EFilterType.bool,
  },
  {
    uid: 'toggle',
    hideLabel: true,
    label: 'Toggle',
    checkboxContent: "Click Me",
    type: EFilterType.toggle,
  },
  {
    uid: 'select',
    label: 'Select',
    type: EFilterType.select,
    options: [
      { uid: 'rep1', label: 'Rep 1' },
      { uid: 'rep2', label: 'Rep 2' },
    ],
  },
  {
    uid: 'selectreadonly',
    label: 'Select Read Only',
    type: EFilterType.select,
    readOnly: true,
    options: [
      { uid: 'rep1', label: 'Rep 1' },
      { uid: 'rep2', label: 'Rep 2' },
    ],
  },
  {
    uid: 'selectSearch',
    label: 'Select Search',
    type: EFilterType.selectSearch,
    searchFieldTargetField: 'label',
    searchFn: async (): Promise<IObj[]> => [
      { uid: 'rep1', label: 'Rep 1' },
      { uid: 'rep2', label: 'Rep 2' },
    ],
  },
  {
    uid: 'selectSearchMulti',
    label: 'Select Search Multi',
    type: EFilterType.selectSearch,
    multiple: true,
    returnFieldOnSelect: 'label',
    searchFieldTargetField: 'label',
    allowEmptySearch: true,
    searchFn: async () => [
      { uid: 'rep1', label: 'Rep 1' },
      { uid: 'rep2', label: 'Rep 2' },
    ],
  },
  {
    uid: 'multiSelect',
    label: 'Multi Select',
    asDropdown: true,
    type: EFilterType.selectMulti,
    options: [
      { uid: 'foo', label: 'Multi Select 1' },
      { uid: 'bar', label: 'Multi Select 2' },
      { uid: 'dee', label: 'Multi Select 3' },
    ],
  },
  {
    uid: 'multiSelectList',
    label: 'Multi Select No Dropdown',
    type: EFilterType.selectMulti,
    asDropdown: false,
    options: [
      { uid: 'foo', label: 'Multi Select noDrop 1' },
      { uid: 'bar', label: 'Multi Select noDrop 2' },
      { uid: 'dee', label: 'Multi Select noDrop 3' },
    ],
  },
  {
    uid: 'multiSelectListShowAll',
    label: 'Multi Select Show All',
    type: EFilterType.selectMulti,
    selectType: 'showall',
    options: [
      { uid: 'foo', label: 'Multi Sel All 1' },
      { uid: 'bar', label: 'Multi Sel All 2' },
      { uid: 'dee', label: 'Multi Sel All 3' },
    ],
  },
  {
    uid: 'embedded',
    label: 'Embedded',
    type: EFilterType.embedded,
    children: [
      { uid: 'embeddedtext', label: 'Embedded Text', type: EFilterType.text },
    ],
  },
  {
    uid: 'embeddedb',
    label: 'Embedded B',
    type: EFilterType.embedded,
    orientation: 'horiz',
    children: [
      { uid: 'embeddedtog1', label: 'Embedded Tog1', type: EFilterType.bool },
      { uid: 'embeddedtog2', label: 'Embedded Tog2', type: EFilterType.bool },
      { uid: 'embeddedtog3', label: 'Embedded Tog3', type: EFilterType.bool },
    ],
  },
  {
    uid: 'dict',
    label: 'Dictionary Field',
    type: EFilterType.dict,
  },
  {
    uid: 'video',
    label: 'Video Field',
    url: 'video_url',
    type: EFilterType.video,
  },
  demoCustomTypeHeading,
];

export const demoHeadingsDataMap: { [uid: string]: THeading<unknown> } =
  demoHeadingsData.reduce((acc, h) => ({ ...acc, [h.uid]: h }), {});

export const demoFormDataMin = {
  name: 'Name 1',
};

export const demoFormData = {
  name: 'Name 1',
  uid: 'name-1',
  number: 1,
  numberCapped: 999999,
  date: '2019-11-02T12:04:44.626+00:00',
  selectreadonly: 'rep1',
  bool: false,
  toggle: true,
  button: null,
  demoField: 'demoField data',
  reference: 'exampleObj',
  dict: { hello: 'world' },
  embedded: null,
  embeddedb: null,
  image: 'example_file.jpg',
  file: 'example_file.jpg',
  fileMultiple: ['example_file.jpg'],
  select: 'example_item',
  selectSearch: 'example_item',
  multiSelect: ['foo', 'bar'],
  selectSearchMulti: ['foo'],
  multiSelectList: ['foo'],
  multiSelectListShowAll: ['foo'],
  video: 'example_video.mov',

  longText: `Long Text spanning multiple lines
  1
  2
  3
  4
  5
  6
  7
  8
  9
  `,
};

export const demoAdditionalData = {
  customFieldStyle: { background: 'grey', padding: '2px' },
};

// type Foo = () =>
