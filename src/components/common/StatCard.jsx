export default function StatCard({ label, value, hint }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="text-secondary small">{label}</div>
        <div className="fs-3 fw-bold">{value}</div>
        {hint && <small className="text-secondary">{hint}</small>}
      </div>
    </div>
  );
}
