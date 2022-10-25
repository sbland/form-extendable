import React from 'react';

export interface IShowMultiSelectionProps<V> {
  ids: V[];
  labels: string[];
  labelField?: string;
  keys: string[];
  onSelect: (val: V) => void;
}

export const ShowMultiSelection = <V,>({
  ids,
  labels,
  keys,
  onSelect,
}: IShowMultiSelectionProps<V>) => (
    <div>
      {ids?.map((v: V, i) => (
        <button onClick={() => onSelect(v)} key={keys[i]}>
          {labels[i]}
        </button>
      ))}
    </div>
  );
