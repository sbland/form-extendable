import { defaultComponentMap } from '@form-extendable/components.component-map';
import { ItemEditor } from '@react_db_client/components.item-editor';
import React from 'react';
import {
  ExampleEditor,
  headings,
} from './custom-item-editor-with-async-object-manager';
import * as database from './database';
import { exampleDocuments } from './dummyData';
import {
  apiDeleteDocument,
  apiGetDocument,
  apiPostDocument,
  apiPutDocument,
} from './mockApi';

database.initAll();

export const ItemEditorWithAsyncObjectManager = () => {
  return <ExampleEditor inputUid={exampleDocuments[0].uid} />;
};

export const ExampleItemEditor = () => {
  return (
    <ItemEditor
      id="example"
      onSubmitCallback={() => {}}
      params={headings}
      collection="exampleCollection"
      asyncGetDocument={apiGetDocument}
      asyncPutDocument={apiPutDocument}
      asyncPostDocument={apiPostDocument}
      asyncDeleteDocument={apiDeleteDocument}
      componentMap={defaultComponentMap()}
    />
  );
};
