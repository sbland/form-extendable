import React from 'react';
import { IObj } from '@form-extendable/lib';

export const ExampleGetRefObjectComponent = ({
  collection,
  onCancel,
  onSubmit,
}: {
  collection: string;
  onCancel: () => void;
  onSubmit: (data: IObj) => void;
}) => {
  const [state, setState] = React.useState<any>(null);

  React.useEffect(() => {
    if(state){
      const stateOut = state;
      setState(null);
      onSubmit(stateOut)
    }
  }, [state, onSubmit])
  return (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: '3rem',
      zIndex: 100,
      background: 'white',
      padding: '0.5rem',
      outline: '1px solid black',
    }}
  >
    <h1>{collection} editor</h1>
    <button onClick={onCancel}>Cancel</button>
    <button
      onClick={() => setState({ uid: 'newObj', label: `New ${collection}` })}
      type="button"
    >
      Submit Add Ref
    </button>
  </div>
)};
