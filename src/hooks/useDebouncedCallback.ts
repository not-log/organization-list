import { useCallback, useEffect, useRef } from "react";

import { useCallbackRef } from "./useCallbackRef";

// https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-debounced-callback/use-debounced-callback.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(debounceTimerRef.current);
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = window.setTimeout(() => handleCallback(...args), delay);
    },
    [handleCallback, delay],
  );

  const cancelDebouncedCallback = useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
  }, []);

  return [debouncedCallback, cancelDebouncedCallback] as const;
}
