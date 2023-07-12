import React from 'react';
import { ItemEditor } from '@react_db_client/components.item-editor';
import { PopupPanelManagedWithContentWrap } from '@react_db_client/components.popup-panel-v2';
import { IDocument } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { ExampleGetRefObjectComponent } from '@form-extendable/fields.field-select-reference';
import { GenericCatalogue, IGenericCatalogueProps } from './generic-catalogue';
import {
  demoHeadingsData,
  demoHeadingsDataSimple,
  demoResults,
} from './demo-data';

import {
  asyncGetDocument,
  asyncGetDocuments,
  asyncPutDocument,
  asyncPostDocument,
  asyncDeleteDocument,
  asyncCopyDocument,
} from './mock-api';

const ItemEditorPopup = (
  props: Omit<
    React.ComponentProps<typeof PopupPanelManagedWithContentWrap>,
    'children'
  > &
    React.ComponentProps<typeof ItemEditor>
) => (
  <PopupPanelManagedWithContentWrap {...props} title="Example Editor">
    <ItemEditor {...props} />
  </PopupPanelManagedWithContentWrap>
);

const asyncGetFiles = () => async () => {
  return [];
};
const fileServerUrl = '';

const componentMap = defaultComponentMap({
  asyncGetFiles,
  fileServerUrl,
  PopupPanel: PopupPanelManagedWithContentWrap,
  AddNewReferenceComponent: ExampleGetRefObjectComponent,
});

const defaultProps: IGenericCatalogueProps<IDocument> = {
  id: 'demo-id',
  itemName: 'Demo Item',
  collection: 'democollection',
  additionalFilters: [],
  availableFilters: {},
  resultsHeadings: demoHeadingsDataSimple,
  previewHeadings: demoHeadingsDataSimple,
  editorHeadings: demoHeadingsData,
  additionalSaveData: {},
  ItemEditor: ItemEditorPopup,
  notificationDispatch: alert,
  asyncGetDocument,
  asyncGetDocuments,
  asyncPutDocument,
  asyncPostDocument,
  asyncDeleteDocument,
  asyncCopyDocument,
  componentMap,
  customParsers: {},
  customSort: null,
  errorCallback: () => {},
  itemEditorProps: {
    formProps: {
      autosave: true,
      debounceTimeout: 700,
    },
  },
};

export const WrappedGenericCatalogue = () => (
  <CompositionWrapDefault>
    <GenericCatalogue {...defaultProps} />
  </CompositionWrapDefault>
);

export const WrappedGenericCatalogueManaged = () => {
  const [database, setDatabase] = React.useState({
    [defaultProps.collection]: Object.values(demoResults),
  });
  const [message, setMessage] = React.useState('');

  return (
    <>
      <CompositionWrapDefault>
        <GenericCatalogue
          {...defaultProps}
          notificationDispatch={(message) => setMessage(message)}
          asyncGetDocuments={async (collection) => {
            console.info(database);
            return Object.values(database[collection]) as any;
          }}
          asyncGetDocument={async (collection, id) =>
            database[collection] &&
            database[collection].find((f) => f.uid === id)
          }
          asyncPostDocument={async (collection, id, data) => {
            if (database[collection] && database[collection][id])
              throw new Error('Duplicate item');
            setDatabase((prev: any) => ({
              ...prev,
              [collection]: [...(prev[collection] || []), data],
            }));
            return { ok: true };
          }}
          asyncDeleteDocument={async (collection, id) => {
            setDatabase((prev: any) => {
              const prevCollection = database[collection];
              const updatedCollection = prevCollection.filter(
                (item) => item.uid !== id
              );

              return {
                ...prev,
                [collection]: updatedCollection,
              };
            });
            return { ok: true };
          }}
          asyncPutDocument={async (collection, id, data) => {
            // if (!(database[collection] && database[collection][id]))
            //   throw new Error('Missing item');
            setDatabase((prev: any) => {
              const prevCollection = database[collection];
              const prevItem =
                prevCollection && prevCollection.find((f) => f.uid === id);
              if (!prevItem) throw new Error('Missing Item');
              const updatedCollection = prevCollection.map((item) =>
                item.uid === id ? { ...item, ...data } : item
              );

              return {
                ...prev,
                [collection]: updatedCollection,
              };
            });
            return { ok: true };
          }}
        />
      </CompositionWrapDefault>
      <div>
        <p>
          Message: <span>{message}</span>
        </p>
        <p data-testid="databaseState">{JSON.stringify(database)}</p>
      </div>
    </>
  );
};
