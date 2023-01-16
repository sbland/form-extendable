import React from 'react';
import { IPopupProps } from '@form-extendable/lib';
import { ItemEditor } from '@react_db_client/components.item-editor';
import { PopupPanelManagedWithContentWrap } from '@react_db_client/components.popup-panel-v2';
import { IDocument } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { GenericCatalogue, IGenericCatalogueProps } from './generic-catalogue';
import {
  demoHeadingsData,
  demoHeadingsDataSimple,
  demoResults,
} from './demo-data';

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
});

const defaultProps: IGenericCatalogueProps<IDocument> = {
  id: 'demo-id',
  itemName: 'Demo Item',
  collection: 'DEMO COLLECTION',
  additionalFilters: [],
  availableFilters: {},
  resultsHeadings: demoHeadingsDataSimple,
  previewHeadings: demoHeadingsDataSimple,
  editorHeadings: demoHeadingsData,
  additionalSaveData: {},
  ItemEditor: ItemEditorPopup,
  notificationDispatch: alert,
  asyncGetDocument: async () => Object.values(demoResults)[0],
  asyncGetDocuments: async () => Object.values(demoResults),
  asyncPutDocument: async () => {
    return { ok: true };
  },
  asyncPostDocument: async () => {
    return { ok: true };
  },
  asyncDeleteDocument: async () => ({ ok: true }),
  asyncCopyDocument: async () => ({ ok: true }),
  componentMap,
  closePopupOnItemSave: true,
  customParsers: {},
  customSort: null,
  errorCallback: () => {},
};

export const WrappedGenericCatalogue = () => (
  <CompositionWrapDefault>
    <GenericCatalogue {...defaultProps} />
  </CompositionWrapDefault>
);
