import { useCallback, useState } from "react";

export function useHover(hoverHandler?: (e: boolean) => void) {
  const [isHovering, setHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    hoverHandler && hoverHandler(true);
    setHover(true);
  }, [hoverHandler]);

  const onMouseLeave = useCallback(() => {
    hoverHandler && hoverHandler(false);
    setHover(false);
  }, [hoverHandler]);

  return { isHovering, onMouseEnter, onMouseLeave };
}
