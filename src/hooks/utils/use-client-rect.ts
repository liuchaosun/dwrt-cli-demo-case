import { useCallback, useState } from 'react';

/**
 * ref 的 callback 函数，获取 dom getBoundingClientRect
 */
function useClientRect(): any[] {
  const [rect, setRect] = useState(null);

  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

export default useClientRect;
