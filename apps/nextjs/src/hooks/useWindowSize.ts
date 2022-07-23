import { useCallback, useEffect, useState } from "react";

type WindowSize = {
  height: number;
  width: number;
};

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({ height: 0, width: 0 });

  const updateSize = useCallback(() => {
    const newSize = { width: window.innerWidth, height: window.innerHeight };
    setSize(newSize);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  return size;
};
