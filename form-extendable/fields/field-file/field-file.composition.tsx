import React from 'react';
import { screen } from '@testing-library/react';
import {
  WrapFieldComponent,
  FieldCompositionWrapDefault,
} from '@form-extendable/composition-helpers';
import { FieldFile } from './field-file';
import {
  DEMO_FILES_DATA,
  DEMO_FILES_DATA_MANY,
  DEMO_IMAGE_FILES_DATA,
  DEMO_IMAGE_FILES_MANY,
  dummyProps,
  dummyPropsDocs,
  dummyPropsDocsMany,
  dummyPropsImagesMany,
} from './demo-data';
import { FieldFileMultiple } from './field-file-multiple';

export const BasicFieldFileImages = () => (
  <FieldCompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFile {...dummyProps} />
    </WrapFieldComponent>
  </FieldCompositionWrapDefault>
);

BasicFieldFileImages.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
};

export const BasicFieldFileImagesMany = () => (
  <FieldCompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFileMultiple {...dummyPropsImagesMany} />
    </WrapFieldComponent>
  </FieldCompositionWrapDefault>
);

BasicFieldFileImagesMany.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_MANY[0].label);
};

export const BasicFieldFileDocs = () => (
  <FieldCompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFile {...dummyPropsDocs} />
    </WrapFieldComponent>
  </FieldCompositionWrapDefault>
);

BasicFieldFileDocs.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA[0].label);
};

export const BasicFieldFileDocsmany = () => (
  <FieldCompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFileMultiple {...dummyPropsDocsMany} />
    </WrapFieldComponent>
  </FieldCompositionWrapDefault>
);

BasicFieldFileDocsmany.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA_MANY[0].label);
};
