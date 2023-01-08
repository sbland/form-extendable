import React from 'react';
import { ItemEditor } from '@react_db_client/components.item-editor';
import {
  PopupContentWrap,
  PopupPanel,
  PopupPanelContext,
} from '@react_db_client/components.popup-panel-v2';
import { IDocument } from '@react_db_client/constants.client-types';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { CompositionWrapDefault } from '@form-extendable/composition-helpers';
import { GenericCatalogue, IGenericCatalogueProps } from './generic-catalogue';
import {
  demoHeadingsData,
  demoHeadingsDataSimple,
  demoResults,
} from './demo-data';

// TODO: Get this from react_db_client
const ContainerPopupPanel = ({ id, isOpen, handleClose, title, children }) => {
  const { openPopup, checkIsOpen, closePopup, popupRegister } =
    React.useContext(PopupPanelContext);

  React.useEffect(() => {
    if (!popupRegister[id]) return;
    if (checkIsOpen(id) && !isOpen) {
      closePopup(id);
    }
    if (!checkIsOpen(id) && isOpen) {
      openPopup(id);
    }
  }, [id, isOpen, checkIsOpen, openPopup, closePopup, popupRegister]);

  return (
    <PopupPanel id={id} onClose={handleClose}>
      <PopupContentWrap id={id} title={title}>
        {children}
      </PopupContentWrap>
    </PopupPanel>
  );
};

// Uses React HOC pattern
const PopupPanelConnector = (
  Component,
  alwaysOpen,
  closeProp = 'handleClose',
  propsOverrides = {}
) => {
  return (props) => {
    const propsMerged = { ...props, ...propsOverrides };
    const { isOpen, title, id } = propsMerged;
    const handleClose = props[closeProp];
    return (
      <ContainerPopupPanel
        handleClose={handleClose}
        isOpen={alwaysOpen || isOpen}
        title={title}
        id={id}
      >
        <Component {...props} />
      </ContainerPopupPanel>
    );
  };
};

// const ItemEditorPopup = ItemEditor;
const ItemEditorPopup = PopupPanelConnector(ItemEditor, true, 'onCancel', {
  title: 'Demo Item Editor',
});

const asyncGetFiles = () => async () => {
  return [];
};
const fileServerUrl = '';
const Popup = ({ children, isOpen = true || undefined }) => {
  if (isOpen) return <>{children}</>;
  return <></>;
};
const componentMap = defaultComponentMap({
  asyncGetFiles,
  fileServerUrl,
  PopupPanel: Popup,
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
  asyncPutDocument: async () => console.info('Put doc'),
  asyncPostDocument: async () => console.info('Post doc'),
  asyncDeleteDocument: async () => {},
  asyncCopyDocument: async () => {},
  componentMap,
  closePopupOnItemSave: true,
  // onError: () => {},
};

export const WrappedGenericCatalogue = () => (
  <CompositionWrapDefault>
    <GenericCatalogue {...defaultProps} />
  </CompositionWrapDefault>
);
