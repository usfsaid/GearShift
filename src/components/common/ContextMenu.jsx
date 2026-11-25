import { useEffect, useRef } from "react";

export default function ContextMenu({ menu, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!menu) return undefined;
    const onPointerDown = (event) =>
      !ref.current?.contains(event.target) && onClose();
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onClose, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [menu, onClose]);

  if (!menu) return null;

  const left = Math.max(8, Math.min(menu.x, window.innerWidth - 210));
  const top = Math.max(
    8,
    Math.min(menu.y, window.innerHeight - menu.items.length * 40 - 20),
  );

  return (
    <div
      ref={ref}
      className="wf-context-menu"
      style={{ left, top }}
      role="menu"
    >
      {menu.items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          className={`dropdown-item rounded ${item.danger ? "text-danger" : ""}`}
          onClick={() => {
            onClose();
            item.onClick();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
