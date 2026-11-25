import { useCallback, useState } from "react";

// Open the menu at the pointer position (right-click or the ⋮ button)
export default function useContextMenu() {
  const [menu, setMenu] = useState(null);

  const open = useCallback((event, items) => {
    event.preventDefault();
    event.stopPropagation();
    if (items.length) setMenu({ x: event.clientX, y: event.clientY, items });
  }, []);
  const close = useCallback(() => setMenu(null), []);

  return { menu, open, close };
}
