import { THeading } from '@form-extendable/lib';
import {
  EFileType,
  EFilterType,
} from '@react_db_client/constants.client-types';

export const demoParamsMin: THeading<any>[] = [
  {
    uid: 'text',
    label: 'Text',
    type: EFilterType.text,
    required: true,
    group: 0,
  },
  {
    uid: 'textNotRequired',
    label: 'Text Required',
    type: EFilterType.text,
    group: 0,
  },
];

export const demoParams: THeading<any>[] = [
  {
    uid: 'text',
    label: 'Text',
    type: EFilterType.text,
    required: true,
    group: 0,
  },
  {
    uid: 'choice',
    label: 'Choice',
    type: EFilterType.select,
    options: [
      { uid: 'choicea', label: 'Choice A' },
      { uid: 'choiceb', label: 'Choice B' },
    ],
    required: true,
    group: 1,
  },
  {
    uid: 'cost',
    label: 'Cost',
    type: EFilterType.number,
    required: true,
    group: 1,
  },
  {
    uid: 'description',
    label: 'Description',
    type: EFilterType.textLong,
    group: 2,
  },
  {
    uid: 'images',
    label: 'Images',
    multiple: true,
    type: EFilterType.image,
    fileType: EFileType.IMAGE,
    group: 3,
  },
  {
    uid: 'val',
    label: 'Value',
    type: EFilterType.number,
    group: 5,
  },
  {
    uid: 'documentation',
    label: 'Documentation',
    type: EFilterType.fileMultiple,
    fileType: EFileType.DOCUMENT,
    multiple: true,
    group: 6,
  },
  {
    uid: 'thumbnail',
    label: 'Thumbnail',
    type: EFilterType.file,
    fileType: EFileType.IMAGE,
    group: 7,
  },
  {
    uid: 'reference',
    label: 'Reference',
    collection: 'democollection',
    type: EFilterType.reference,
    searchFieldTargetField: 'label',
    allowAddNew: true,
  },
];

export const demoData = {
  uid: 'demoid',
  label: 'Demo Object',
  choice: 'choicea',
  cost: 10,
  text: 'Code',
  description: 'A long description',
  images: [],
  val: 9,
  documentation: [
    {
      filePath: 'doc.pdf',
      name: 'docpdf',
      label: 'docpdf',
      uid: 'docpdfid',
      fileType: EFileType.DOCUMENT,
    },
  ],
  thumbnail: {
    filePath: 'thumbnail.jpg',
    name: 'thumbnail',
    label: 'thumbnail',
    uid: 'thumbnail',
    fileType: EFileType.IMAGE,
  },
};

// filePath: PropTypes.string.isRequired,
// name: PropTypes.string.isRequired,
// label: PropTypes.string.isRequired,
// uid: PropTypes.string.isRequired,
// fileType: PropTypes.oneOf(Object.values(EFileType)).isRequired,
