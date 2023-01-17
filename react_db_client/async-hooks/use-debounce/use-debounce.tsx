import React from 'react';

export interface IUseDebounceArgs<Fn extends (...args: any) => void> {
  timeout?: number;
  fn: Fn;
  allow?: boolean;
}

export interface IUseDebounceReturn {}

export const useDebounce = <Fn extends (...args: any) => any>({
  timeout = 2000,
  fn,
  allow = true,
}: IUseDebounceArgs<Fn>): Fn => {
  const [callRequested, setCallRequested] = React.useState(false);
  const [args, setArgs] = React.useState<Parameters<Fn>>();

  /** Ping Test */
  React.useEffect(() => {
    if (callRequested && allow && args) {
      const handler = setTimeout(() => {
        fn(...(args as Array<any>));
        setCallRequested(false);
      }, timeout);
      return () => {
        if (handler) clearTimeout(handler);
      };
    }
  }, [allow, args, timeout, callRequested, fn]);

  const call = React.useCallback<Fn>(
    ((...argsIn) => {
      setArgs(argsIn);
      setCallRequested(true);
    }) as Fn,
    []
  );
  return call;
};
