import React from 'react';
import { useDebounce } from './use-debounce';

export const ExampleUseDebounceHookUsage = () => {
  const [state, setState] = React.useState(0);
  const [called, setCalled] = React.useState(false);
  const exampleFn = async (a: number) => {
    setCalled(true);
    setState((prev) => prev + a);
  };
  const call = useDebounce({ fn: exampleFn, timeout: 100 });
  return (
    <div>
      <button onClick={() => call(1)}>Click</button>
      <p data-testid="callcount">
        callCount: <span>{state}</span>
      </p>
      <p data-testid="hasBeenCalled">
        callCount: <span>{called ? 'Called' : 'Not Called'}</span>
      </p>
    </div>
  );
};

ExampleUseDebounceHookUsage.waitForReady = async () => {};
