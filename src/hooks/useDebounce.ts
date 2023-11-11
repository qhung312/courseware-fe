import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

type Callback = () => any;

const useDebounce = (callback: Callback, time: number = 600) => {
  const ref = useRef<Callback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, time);
  }, [time]);

  return debouncedCallback;
};

export default useDebounce;
