import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef } from 'react';

type Callback = () => any;

const useDebounce = (callback: Callback) => {
  const ref = useRef<Callback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 600);
  }, []);

  return debouncedCallback;
};

export default useDebounce;
