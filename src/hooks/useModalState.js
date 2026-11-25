import { useCallback, useState } from "react";

// State For Modal
export default function useModalState(onAdd) {
  const [state, setState] = useState(null);

  //fun Close
  const close = useCallback(() => setState(null), []);

  // fun Add
  const openAdd = useCallback(
    () => (onAdd ? onAdd() : setState({ mode: "add" })),
    [onAdd],
  );

  // fun Edit
  const openEdit = useCallback((item) => setState({ mode: "edit", item }), []);

  // fun Delette
  const openDelete = useCallback(
    (item) => setState({ mode: "delete", item }),
    [],
  );

  //  menu For actions
  const crudActions = (item) => [
    { label: "  Edit", onClick: () => openEdit(item) },
    { label: "  Delete", onClick: () => openDelete(item), danger: true },
  ];

  return { state, close, openAdd, openEdit, openDelete, crudActions };
}
