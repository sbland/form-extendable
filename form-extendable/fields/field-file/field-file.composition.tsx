import React from 'react';
import { screen } from '@testing-library/react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';
import { FieldFile } from './field-file';
import { DEMO_FILES_DATA, dummyProps } from './demo-data';

export const BasicFieldFile = () => (
  <CompositionWrapDefault height="4rem" width="8rem">
    <WrapFieldComponent>
      <FieldFile
        {...dummyProps}
        asyncGetFiles={dummyProps.asyncGetFiles}
        onChange={dummyProps.onChange}
        asyncFileUpload={dummyProps.asyncFileUpload}
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

BasicFieldFile.waitForReady = async () => {
  await screen.findAllByText(DEMO_FILES_DATA[0].name);
};
