import React from 'react';

export const useDebounce = ({ timeout = 2000, fn, allow }) => {
  const [callRequested, setCallRequested] = React.useState(false);
  const [args, setArgs] = React.useState([]);

  /** Ping Test */
  React.useEffect(() => {
    if (callRequested && allow) {
      const handler = setTimeout(() => {
        fn(...args);
        setCallRequested(false);
      }, timeout);
      return () => {
        if (handler) clearTimeout(handler);
      };
    }
  }, [allow, args, timeout, callRequested, fn]);

  const call = React.useCallback((...argsIn: any) => {
    setArgs(argsIn);
    setCallRequested(true);
  }, []);
  return call;
};
