import React from 'react';
import PropTypes from 'prop-types';
import {
  IFieldComponentProps,
  IHeadingButton,
  IHeadingCustomType,
  IHeadingSelectSearch,
  IObj,
  TFormData,
  THeading,
} from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
  IFile,
  Uid,
} from '@react_db_client/constants.client-types';

export const demoCustomTypeHeading: IHeadingCustomType<unknown> = {
  uid: 'demoField',
  label: 'Custom Field Types',
  type: 'demoFieldType',
  customType: true,
};

export const buttonHeading: IHeadingButton = {
  uid: 'button',
  label: 'Button',
  type: EFilterType.button,
  onClick: () => null,
};

export const demoNestedHeadings: THeading<any>[] = [
  {
    uid: 'embeddedb',
    label: 'Embedded B',
    type: EFilterType.embedded,
    showTitle: true,
    orientation: 'horiz',
    children: [
      { uid: 'embeddedtog1', label: 'Embedded Tog1', type: EFilterType.bool },
      { uid: 'embeddedtog2', label: 'Embedded Tog2', type: EFilterType.bool },
      { uid: 'embeddedtog3', label: 'Embedded Tog3', type: EFilterType.bool },
    ],
  },
  {
    uid: 'embeddedc',
    label: 'Embedded C',
    type: EFilterType.embedded,
    showTitle: false,
    orientation: 'horiz',
    children: [
      { uid: 'embeddedtog1', label: 'Embedded Tog1', type: EFilterType.bool },
      { uid: 'embeddedtog2', label: 'Embedded Tog2', type: EFilterType.bool },
      { uid: 'embeddedtog3', label: 'Embedded Tog3', type: EFilterType.bool },
    ],
  },
  {
    uid: 'embeddedd',
    label: 'Embedded d',
    type: EFilterType.embedded,
    showTitle: true,
    orientation: 'vert',
    children: [
      { uid: 'embeddedtog1', label: 'Embedded Tog1', type: EFilterType.bool },
      {
        uid: 'multiSelectListShowAll1',
        label: 'Multi Select Show All',
        type: EFilterType.select,
        selectType: 'toggle',
        options: [
          { uid: 'foo', label: 'Multi Sel All 1' },
          { uid: 'bar', label: 'Multi Sel All 2' },
          { uid: 'dee', label: 'Multi Sel All 3' },
        ],
      },
      {
        uid: 'multiSelectListShowAll2',
        label: 'Multi Select Show All',
        type: EFilterType.selectMulti,
        selectType: 'showall',
        options: [
          { uid: 'foo', label: 'Multi Sel All 1 longer label' },
          { uid: 'bar', label: 'Multi Sel All 2' },
          { uid: 'dee', label: 'Multi Sel All 3' },
        ],
      },
    ],
  },

  {
    uid: 'embeddede',
    label: 'Embedded e out',
    type: EFilterType.embedded,
    showTitle: true,
    orientation: 'horiz',
    children: [
      {
        uid: 'embeddede-d',
        label: 'Embedded d',
        type: EFilterType.embedded,
        showTitle: true,
        orientation: 'vert',
        children: [
          {
            uid: 'embeddedtog1',
            label: 'Embedded Tog1',
            type: EFilterType.bool,
          },
          {
            uid: 'multiSelectListShowAll3',
            label: 'Multi Select Show All',
            type: EFilterType.select,
            selectType: 'toggle',
            options: [
              { uid: 'foo', label: 'Multi Sel All 1' },
              { uid: 'bar', label: 'Multi Sel All 2' },
              { uid: 'dee', label: 'Multi Sel All 3' },
            ],
          },
          {
            uid: 'multiSelectListShowAll4',
            label: 'Multi Select Show All with a really really long label',
            type: EFilterType.selectMulti,
            selectType: 'showall',
            options: [
              { uid: 'foo', label: 'Multi Sel All 1 longer label' },
              { uid: 'bar', label: 'Multi Sel All 2' },
              { uid: 'dee', label: 'Multi Sel All 3' },
            ],
          },
        ],
      },
      {
        uid: 'embeddede-f',
        label: 'Embedded d',
        type: EFilterType.embedded,
        showTitle: true,
        orientation: 'vert',
        styleOverrides: { background: 'red', maxWidth: '20rem' },
        children: [
          {
            uid: 'embeddedtog1',
            label: 'Embedded Tog1',
            type: EFilterType.bool,
          },
          {
            uid: 'multiSelectListShowAll5',
            label: 'Multi Select Show All',
            type: EFilterType.select,
            selectType: 'toggle',
            options: [
              { uid: 'foo', label: 'Multi Sel All 1' },
              { uid: 'bar', label: 'Multi Sel All 2' },
              { uid: 'dee', label: 'Multi Sel All 3' },
            ],
          },
          {
            uid: 'multiSelectListShowAll6',
            label: 'Multi Select Show All',
            type: EFilterType.selectMulti,
            selectType: 'showall',
            options: [
              { uid: 'foo', label: 'Multi Sel All 1 longer label' },
              { uid: 'bar', label: 'Multi Sel All 2' },
              { uid: 'dee', label: 'Multi Sel All 3' },
            ],
          },
        ],
      },
    ],
  },
];

export const demoHeadingsData: THeading<any>[] = [
  {
    uid: 'uid',
    label: 'UID',
    type: EFilterType.uid,
  },
  {
    uid: 'text',
    label: 'Text',
    type: EFilterType.text,
    required: true,
  },
  {
    uid: 'textarea',
    label: 'Text Area',
    type: EFilterType.textLong,
    initHeight: 100,
    initWidth: 100,
  },
  buttonHeading,
  {
    uid: 'longText',
    label: 'Long Text with a long heading... extra text to check',
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
    uid: 'file',
    label: 'File',
    fileType: EFileType.DOCUMENT,
    type: EFilterType.file,
  },
  {
    uid: 'fileMultiple',
    label: 'File Multiple',
    multiple: true,
    fileType: EFileType.DOCUMENT,
    type: EFilterType.fileMultiple,
  },
  {
    uid: 'image',
    label: 'Image',
    fileType: EFileType.IMAGE,
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
    checkboxContent: 'Click Me',
    type: EFilterType.toggle,
  },
  {
    uid: 'reference',
    label: 'Reference',
    collection: 'democollection',
    type: EFilterType.reference,
    searchFieldTargetField: 'label',
    allowAddNew: true,
  },
  {
    uid: 'select',
    label: 'Select',
    type: EFilterType.select,
    options: [
      { uid: 'selectVal1', label: 'Select Val 1' },
      { uid: 'selectVal2', label: 'Select Val 2' },
    ],
  },
  {
    uid: 'selectreadonly',
    label: 'Select Read Only',
    type: EFilterType.select,
    readOnly: true,
    options: [
      { uid: 'selectReadOnlyVal1', label: 'Select read only val 1' },
      { uid: 'selectReadOnlyVal2', label: 'Select read only val 2' },
    ],
  },
  {
    uid: 'selectSearch',
    label: 'Select Search',
    type: EFilterType.selectSearch,
    searchFieldTargetField: 'label',
    searchFn: async (): Promise<IObj[]> => [
      { uid: 'selectSearchVal1', label: 'Select Search Val 1' },
      { uid: 'selectSearchVal2', label: 'Select Search Val 2' },
    ],
  } as IHeadingSelectSearch<IObj>,
  {
    uid: 'selectSearchMulti',
    label: 'Select Search Multi',
    type: EFilterType.selectSearch,
    multiple: true,
    returnFieldOnSelect: 'label',
    searchFieldTargetField: 'label',
    allowEmptySearch: true,
    searchFn: async () => [
      { uid: 'readOnlyMultiVal1', label: 'Read only Multi select value 1' },
      { uid: 'readOnlyMultiVal2', label: 'Read only Multi select value 2' },
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
    showTitle: true,
    children: [
      {
        uid: 'embeddedText',
        label: 'Embedded Text',
        type: EFilterType.text,
        required: true,
      },
    ],
  },
  {
    uid: 'embeddedb',
    label: 'Embedded B',
    type: EFilterType.embedded,
    showTitle: true,
    orientation: 'horiz',
    styleOverrides: { background: 'red', maxWidth: '30rem' },
    children: [
      {
        uid: 'embeddedtog1',
        label: 'Embedded Tog1',
        type: EFilterType.bool,
      },
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
  {
    uid: 'table',
    label: 'Table Field',
    type: EFilterType.table,
    headings: [
      {
        uid: 'uid',
        label: 'UID',
        type: EFilterType.uid,
      },
      {
        uid: 'text',
        label: 'Text',
        type: EFilterType.text,
        required: true,
      },
    ],
  },
  demoCustomTypeHeading,
];

export const headingsFlat = demoHeadingsData.reduce(
  (acc, h) =>
    // eslint-disable-next-line testing-library/no-node-access
    h.type === EFilterType.embedded
      ? [...acc, ...(h as any).children]
      : [...acc, h],
  [] as THeading<any>[]
);

export const demoHeadingsDataMap: { [uid: Uid]: THeading<any> } =
  demoHeadingsData.reduce((acc, h) => ({ ...acc, [h.uid]: h }), {});

export const demoRefObjs: IObj[] = [
  { uid: '1', label: '1' },
  { uid: '2', label: '2' },
  { uid: '3', label: '3' },
];

export const demoFormData: TFormData = {
  text: 'Example text',
  textarea: `Example text spanning many
  many
  many
  lines. Etc...Etc...Etc...`,
  uid: 'name-1',
  number: 1,
  numberCapped: 999999,
  date: '2019-11-02T12:04:44.626+00:00',
  selectreadonly: 'selectReadOnlyVal1',
  bool: false,
  toggle: true,
  button: null,
  demoField: 'demoField data',
  reference: { uid: 'exampleObj', label: 'Example ref obj' },
  dict: { hello: 'world' },
  embeddedText: 'Embedded Text',
  embeddedtog1: true,
  embeddedtog2: false,
  embeddedtog3: true,
  // embedded: null,
  // embeddedb: null,
  image: {
    uid: 'example_image_file',
    label: 'example image label',
    fileType: EFileType.IMAGE,
    filePath: '',
    name: 'bit-logo.svg',
  },
  file: {
    uid: 'example_file',
    label: 'example file label',
    fileType: EFileType.DOCUMENT,
    filePath: 'dir1',
    name: 'example_file.pdf',
  },
  fileMultiple: [
    {
      uid: 'example_file_01',
      label: 'example file 01 label',
      fileType: EFileType.DOCUMENT,
      filePath: 'dir1',
      name: 'example_file.doc',
    },
    {
      uid: 'example_file_02',
      label: 'example file 02 label',
      fileType: EFileType.DOCUMENT,
      filePath: 'dir1',
      name: 'example_file.doc',
    },
  ],
  select: 'selectVal1',
  selectSearch: { uid: 'selectSearchVal1', label: 'Select Search Val 1' },
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
  table: [
    ['foo', 'Foo'],
    ['bar', 'Bar'],
  ],
};

export const demoAdditionalData = {
  customFieldStyle: { background: 'grey', padding: '2px' },
};

// type Foo = () =>

export const CustomFieldType: React.FC<
  IFieldComponentProps<string, IHeadingCustomType<any>>
> = ({ value, label, onChange }) => (
  <div>
    <input
      id="demoField-input"
      value={value || ''}
      placeholder={label}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  </div>
);

CustomFieldType.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

CustomFieldType.defaultProps = {
  value: null,
};

export const DEMO_FILES_DATA: IFile[] = [
  {
    uid: 'a',
    filePath: '',
    label: 'FileA with a really long name',
    name: 'bit-logo.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'b',
    filePath: 'extensions-icons',
    label: 'FileB',
    name: 'vue_grey.svg',
    fileType: EFileType.IMAGE,
  },
  {
    uid: 'c',
    filePath: 'Community/app-components',
    label: 'FileC',
    name: 'card.jpg',
    fileType: EFileType.IMAGE,
  },
];

export const fileOnlyHeadings = demoHeadingsData.filter(
  (h) =>
    [EFilterType.file, EFilterType.fileMultiple, EFilterType.image].indexOf(
      h.type as EFilterType
    ) !== -1
);

export const MIN_FORM_DATA = {
  text: 'Min text input',
  embeddedText: 'Min embedded text input',
};
