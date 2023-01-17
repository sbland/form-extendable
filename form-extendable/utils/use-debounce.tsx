import React from 'react';
// TODO: Move this to react_db_client
export interface IUseDebounceArgs<Fn extends (...args: any) => Promise<void>> {
  timeout?: number;
  fn: Fn;
  allow?: boolean;
  callback?: Fn;
}

export interface IUseDebounceReturn {}

export const useDebounce = <Fn extends (...args: any) => any>({
  timeout = 2000,
  fn,
  allow = true,
  callback,
}: IUseDebounceArgs<Fn>): Fn => {
  const [callRequested, setCallRequested] = React.useState(false);
  const [args, setArgs] = React.useState<Parameters<Fn>>();

  /** Ping Test */
  React.useEffect(() => {
    if (callRequested && allow && args) {
      const handler = setTimeout(async () => {
        await fn(...(args as Array<any>));
        if (callback) callback(...(args as Array<any>));
        setCallRequested(false);
      }, timeout);
      return () => {
        if (handler) clearTimeout(handler);
      };
    }
  }, [allow, args, timeout, callRequested, fn, callback]);

  const call = React.useCallback<Fn>(
    ((...argsIn) => {
      setArgs(argsIn);
      setCallRequested(true);
    }) as Fn,
    []
  );
  return call;
};
