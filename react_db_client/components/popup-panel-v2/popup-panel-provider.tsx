import React from 'react';
import { getRoot } from '@react_db_client/helpers.html-helpers';

export type TPopupId = string | number;

export interface IPopupElementState {
  open?: boolean;
  root: HTMLElement;
  deleteRootOnUnmount?: boolean;
  z: number;
  onCloseCallback: () => void;
  setOpen: (v: boolean, r?: HTMLElement, z?: number) => void;
}

export interface IRegisterPopupArgs {
  id: TPopupId;
  root: string | HTMLElement | undefined;
  deleteRootOnUnmount?: boolean;
  z?: number;
  onCloseCallback?: () => void;
  setOpen: (v: boolean, r?: HTMLElement, z?: number) => void;
}

export type PopupRegister = { [id: TPopupId]: IPopupElementState };

export interface IPopupPanelContext {
  popupCount: number;
  registerPopup: (args: IRegisterPopupArgs) => void;
  deregisterPopup: (id: TPopupId) => void;
  baseZIndex: number;
  checkIsOpen: (id: TPopupId) => boolean;
  openPopup: (id: TPopupId) => void;
  closePopup: (id: TPopupId) => void;
  popupRegister: PopupRegister;
  setPopupRegister: React.Dispatch<React.SetStateAction<PopupRegister>>;
}

export interface IPopupProviderProps {
  initialState?: Partial<IPopupPanelContext>;
  children: React.ReactNode;
}

export const defaultState: IPopupPanelContext = {
  popupCount: 0,
  baseZIndex: 100,
  registerPopup: (args) => {
    throw Error('registerPopup is NOT DEFINED');
  },
  deregisterPopup: (id: TPopupId) => {
    throw Error('deregisterPopup is NOT DEFINED');
  },
  openPopup: (id: TPopupId) => {
    throw Error('openPopup is NOT DEFINED');
  },
  checkIsOpen: (id: TPopupId) => {
    throw Error('checkIsOpen is NOT DEFINED');
  },
  closePopup: (id: TPopupId) => {
    throw Error('closePopup is NOT DEFINED');
  },
  popupRegister: {},
  setPopupRegister: () => {
    throw Error('setPopupRegister is NOT DEFINED');
  },
};

export const PopupPanelContext = React.createContext(defaultState);

const EMPTY_OBJECT = {};

export const openPopupExt = (
  id: TPopupId,
  popupCount,
  popupRegister: PopupRegister,
  setPopupRegister: React.Dispatch<React.SetStateAction<PopupRegister>>
) => {
  // popupCount.current += 1;
  if (popupRegister[id] !== undefined)
    setPopupRegister((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true },
    }));
  else {
    throw new Error(
      `Attempted to open popup that isn't registered! Id is ${id}`
    );
  }
};

export const PopupProvider = ({
  initialState = defaultState,
  children,
}: IPopupProviderProps) => {
  const popupCount = React.useRef(0);
  const popupRegister = React.useRef(
    initialState.popupRegister || EMPTY_OBJECT
  );

  const registerPopup = React.useCallback(
    ({
      id,
      root: popupRoot,
      deleteRootOnUnmount,
      z,
      onCloseCallback,
      setOpen,
    }: IRegisterPopupArgs) => {
      const root = getRoot(popupRoot || String(id), String(id));
      popupRegister.current = {
        ...popupRegister.current,
        [id]: {
          open: false,
          root,
          deleteRootOnUnmount,
          z: z || popupCount?.current,
          onCloseCallback: onCloseCallback || (() => {}),
          setOpen,
        },
      };
    },
    []
  );

  const deregisterPopup = React.useCallback((id: TPopupId) => {
    const registerCopy = { ...popupRegister.current };
    const { deleteRootOnUnmount, root } = registerCopy[id] || {};
    if (deleteRootOnUnmount && root) {
      root.remove();
    }
    delete registerCopy[id];

    popupRegister.current = registerCopy;
  }, []);

  const openPopup = React.useCallback(
    (id: TPopupId) => {
      popupCount.current += 1;
      if (popupRegister.current[id] !== undefined) {
        popupRegister.current = {
          ...popupRegister.current,
          [id]: { ...popupRegister.current[id], open: true },
        };
        const { root, setOpen, z } = popupRegister.current[id];
        setOpen(true, root, z);
      } else {
        throw new Error(
          `Attempted to open popup that isn't registered! Id is ${id}`
        );
      }
    },
    [popupRegister]
  );

  const closePopup = React.useCallback((id: TPopupId) => {
    popupCount.current -= 1;
    if (popupRegister.current[id] !== undefined) {
      popupRegister.current = {
        ...popupRegister.current,
        [id]: { ...popupRegister.current[id], open: false },
      };
      popupRegister.current[id].setOpen(false);

      popupRegister.current[id].onCloseCallback();
    } else {
      throw new Error(
        `Attempted to close popup that isn't registered! Id is ${id}`
      );
    }
  }, []);

  const checkIsOpen = React.useCallback(
    (id: TPopupId) => {
      return popupRegister.current[id]?.open || false;
    },
    [popupRegister]
  );

  const mergedValue: IPopupPanelContext = {
    ...defaultState,
    ...initialState,
    popupCount: popupCount.current,
    openPopup,
    closePopup,
    checkIsOpen,
    registerPopup,
    deregisterPopup,
    popupRegister: popupRegister.current || {},
  };

  return (
    <PopupPanelContext.Provider value={mergedValue}>
      {children}
    </PopupPanelContext.Provider>
  );
};
