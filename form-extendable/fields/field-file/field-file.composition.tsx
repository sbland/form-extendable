import React from 'react';
import { screen } from '@testing-library/react';
import {
  WrapFieldComponent,
  CompositionWrapDefault,
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
  <CompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFile {...dummyProps} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

BasicFieldFileImages.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_DATA[0].label);
};

export const BasicFieldFileImagesMany = () => (
  <CompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFileMultiple {...dummyPropsImagesMany} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

BasicFieldFileImagesMany.waitForReady = async () => {
  await screen.findAllByAltText(DEMO_IMAGE_FILES_MANY[0].label);
};

export const BasicFieldFileDocs = () => (
  <CompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFile {...dummyPropsDocs} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

BasicFieldFileDocs.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA[0].label);
};

export const BasicFieldFileDocsmany = () => (
  <CompositionWrapDefault height="40rem" width="60rem">
    <WrapFieldComponent>
      <FieldFileMultiple {...dummyPropsDocsMany} />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

BasicFieldFileDocsmany.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA_MANY[0].label);
};
