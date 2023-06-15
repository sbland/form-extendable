import { PopupProvider } from '@react_db_client/components.popup-panel-v2';
import React from 'react';
import { AreYouSureBtn, IAreYouSureProps } from './are-you-sure-btn';

const defaultProps: IAreYouSureProps = {
  onConfirmed: () => alert('confirmed'),
  disabled: false,
  btnText: 'Click me',
};

export const BasicAreYouSureBtn = () => {
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <>
      <PopupProvider>
        {' '}
        <AreYouSureBtn
          {...defaultProps}
          onConfirmed={() => setConfirmed(true)}
        />
      </PopupProvider>
      {confirmed && <p>User confirmed</p>}
    </>
  );
};

export const MultipleAreYouSureBtn = () => {
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <>
      <PopupProvider>
        {' '}
        <AreYouSureBtn
          {...defaultProps}
          notes="This is a note"
          onConfirmed={() => setConfirmed(true)}
        />
        <AreYouSureBtn
          {...defaultProps}
          notes="This is a another note"
          onConfirmed={() => setConfirmed(true)}
        />
      </PopupProvider>
      {confirmed && <p>User confirmed</p>}
    </>
  );
};
