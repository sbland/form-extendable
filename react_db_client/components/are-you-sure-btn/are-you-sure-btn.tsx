import React from 'react';
import PropTypes from 'prop-types';
import {
  PopupPanelContext,
  PopupPanel,
  PopupContentWrap,
} from '@react_db_client/components.popup-panel-v2';
import { EPopupRegisterAction } from '@react_db_client/components.popup-panel-v2';

const popupId = 'areYouSureBtn_popupPanel';

export interface IAreYouSureProps {
  btnText: string | React.ReactNode;
  onConfirmed: () => void;
  confirmMessage?: string;
  className?: string;
  disabled?: boolean;
  notes?: string;
}

export const AreYouSureBtn = ({
  btnText,
  onConfirmed,
  confirmMessage,
  className,
  disabled,
  notes,
}: IAreYouSureProps) => {
  const { dispatchPopupRegister } = React.useContext(PopupPanelContext);
  const uniquePanelRef = React.useRef<string>(`${popupId}_${Date.now()}_${Math.random()}`);

  const handleFirstClick = () => {
    dispatchPopupRegister({
      type: EPopupRegisterAction.OPEN_POPUP,
      args: uniquePanelRef.current,
    });
  };

  const handleCancel = () => {
    dispatchPopupRegister({
      type: EPopupRegisterAction.CLOSE_POPUP,
      args: uniquePanelRef.current,
    });
  };

  const handleAccept = () => {
    dispatchPopupRegister({
      type: EPopupRegisterAction.CLOSE_POPUP,
      args: uniquePanelRef.current,
    });
    onConfirmed();
  };

  return (
    <>
      <PopupPanel id={uniquePanelRef.current}>
        <PopupContentWrap
          handleClose={handleCancel}
          id={uniquePanelRef.current}
          title="Are you sure?"
        >
          <div className="areYouSurePanel_wrap">
            <h1>Are You Sure?</h1>
            <div>
              <button
                type="button"
                className="areYouSure_cancelBtn button-one"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="areYouSure_acceptBtn button-two"
                onClick={handleAccept}
              >
                {confirmMessage}
              </button>
            </div>
            {notes && <div>{notes}</div>}
          </div>
        </PopupContentWrap>
      </PopupPanel>
      <button
        disabled={disabled}
        onClick={() => handleFirstClick()}
        type="button"
        className={`areYouSureBtn ${className}`}
      >
        {btnText}
      </button>
    </>
  );
};

AreYouSureBtn.propTypes = {
  onConfirmed: PropTypes.func.isRequired,
  btnText: PropTypes.node.isRequired,
  confirmMessage: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  notes: PropTypes.string,
  PopupPanel: PropTypes.elementType,
};

AreYouSureBtn.defaultProps = {
  className: 'button-one',
  disabled: false,
  notes: '',
  confirmMessage: 'Confirm',
  PopupPanel: ({ children, isOpen }) => (isOpen ? children : ''),
};
