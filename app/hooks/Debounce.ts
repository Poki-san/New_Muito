import { useEffect, useRef } from "react";

export function useDebounce(
  callback: Function,
  timeout: number = 200,
  deps: Array<any> = []
) {
  const data = useRef({ firstTime: true });
  useEffect(() => {
    const { firstTime, clearFunc } = data.current;

    const handler = setTimeout(() => {
      if (clearFunc && typeof clearFunc === "function") {
        clearFunc();
      }
      data.current.clearFunc = callback();
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [timeout, ...deps]);
}

export default useDebounce;
