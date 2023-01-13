import { Uid } from '@react_db_client/constants.client-types';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { PopupPanelContext } from './popup-panel-provider';
import {
  PopupPanelClosePanelStyle,
  PopupPanelContentPanelStyle,
  PopupPanelWrapStyle,
} from './style';

export interface PopupPanelProps extends IPopupPanelProps {
  // Kept for back compatability
}

export interface IPopupPanelProps {
  /**
   * a node to be rendered in the special component.
   */
  id: Uid;
  renderWhenClosed?: boolean;
  children: ReactNode;
  popupRoot?: string | HTMLElement;
  deleteRootOnUnmount?: boolean;
  zIndex?: number;
  onClose?: () => void;
}

export interface IPopupPanelRenderProps {
  id: Uid;
  renderWhenClosed?: boolean;
  children: ReactNode;
  popupRoot?: string | HTMLElement;
  deleteRootOnUnmount?: boolean;
  zIndex?: number;
  baseZIndex: number;
  z: number;
  open?: boolean;
  closePopup: (Uid) => void;
  root: HTMLElement;
}

export const PopupPanelRender = ({
  id,
  baseZIndex,
  z,
  open,
  closePopup,
  renderWhenClosed,
  children,
  root,
}: IPopupPanelRenderProps) => {
  return ReactDOM.createPortal(
    <PopupPanelWrapStyle
      data-testid={`popupPanel_${id}`}
      style={{
        zIndex: baseZIndex + z * 10,
        display: open ? 'inherit' : 'none',
      }}
    >
      <PopupPanelClosePanelStyle
        onKeyDown={(e) => e.key === 'Escape' && closePopup(id)}
        onClick={() => closePopup(id)}
        aria-label="Close the popup"
        data-testid={'popupPanel_closeBtn'}
      />
      <PopupPanelContentPanelStyle
        data-testid={'popupPanel_content'}
        isOpen={open || false}
        onKeyDown={(e) => e.key === 'Escape' && closePopup(id)}
      >
        {(renderWhenClosed || open) && children}
      </PopupPanelContentPanelStyle>
    </PopupPanelWrapStyle>,
    root
  );
};

export function PopupPanel({
  id,
  renderWhenClosed,
  children,
  popupRoot,
  deleteRootOnUnmount,
  zIndex,
  onClose,
}: IPopupPanelProps) {
  const { registerPopup, deregisterPopup, baseZIndex, closePopup } =
    React.useContext(PopupPanelContext);

  const [open, setOpen] = React.useState(false);
  const [root, setRoot] = React.useState<HTMLElement | null>(null);
  const [localZ, setLocalZ] = React.useState(-1);

  React.useEffect(() => {
    const setOpenI = (v: boolean, r?: HTMLElement, z?: number) => {
      setOpen(v);
      setRoot(r || null);
      setLocalZ(z || -1);
    };
    registerPopup({
      id,
      root: popupRoot,
      deleteRootOnUnmount,
      z: zIndex,
      onCloseCallback: onClose,
      setOpen: setOpenI,
    });
  }, [id, popupRoot, zIndex, onClose, registerPopup]);

  React.useEffect(() => {
    return function cleanup() {
      deregisterPopup(id);
    };
  }, []);

  const handleClose = React.useCallback(() => {
    closePopup(id);
  }, [id, closePopup]);

  if (!root) return <></>;
  return (
    <PopupPanelRender
      id={id}
      baseZIndex={baseZIndex}
      z={localZ}
      open={open}
      closePopup={handleClose}
      renderWhenClosed={renderWhenClosed}
      children={children}
      root={root}
    />
  );
}
