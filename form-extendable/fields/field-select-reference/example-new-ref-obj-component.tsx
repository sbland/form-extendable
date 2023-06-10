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
}) => (
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
    <h1>ExampleGetRefObjectComponent</h1>
    <button onClick={onCancel}>Cancel</button>
    <button
      onClick={() => onSubmit({ uid: 'newObj', label: `New ${collection}` })}
      type="button"
    >
      Submit
    </button>
  </div>
);
