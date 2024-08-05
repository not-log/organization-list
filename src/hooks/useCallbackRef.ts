import { useEffect, useMemo, useRef } from "react";

// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-callback-ref/use-callback-ref.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
