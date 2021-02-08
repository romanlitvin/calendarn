import { useState, useRef, useEffect, useCallback } from "react";

type TSetStateCallback<T> = (state: T) => void;
type TDispatchState<T> = (prev: T) => T;
type TUseStateCallback<T> = (
  updatedState: T | TDispatchState<T>,
  callback: TSetStateCallback<T>,
) => void;

export default <T>(initialState: T): [T, TUseStateCallback<T>] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<TSetStateCallback<T> | null>(null);

  const setStateCallback: TUseStateCallback<T> = useCallback(
    (updatedState, callback) => {
      callbackRef.current = callback;
      setState(updatedState);
    },
    [],
  );

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
};
