import { useNotify } from "@/hooks/useActions";
import FormModal from "./FormModal";
import ConfirmModal from "./ConfirmModal";

export default function CrudModals({
  modal,
  entityLabel,
  fields,
  validate,
  toInitial,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const notify = useNotify();
  const { state, close } = modal;
  if (!state) return null;

  if (state.mode === "delete") {
    return (
      //delete
      <ConfirmModal
        message="Do you want to delete this record permanently?"
        onClose={close}
        onConfirm={async () => {
          await onDelete(state.item);
          notify("Deleted successfully");
        }}
      />
    );
  }

  // Edit
  const isEdit = state.mode === "edit";
  return (
    <FormModal
      title={`${isEdit ? "Edit" : "Add"} — ${entityLabel}`}
      fields={fields}
      initialValues={isEdit ? toInitial(state.item) : {}}
      validate={validate}
      onClose={close}
      onSubmit={async (values) => {
        await (isEdit ? onUpdate(state.item, values) : onCreate(values));
        notify(isEdit ? "Saved successfully" : "Created successfully");
      }}
    />
  );
}
