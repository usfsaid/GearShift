//component Add

export default function AddButton({ onClick }) {
  return (
    <button type="button" className="btn btn-gold btn-sm" onClick={onClick}>
      Add
    </button>
  );
}
