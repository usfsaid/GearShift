// Card with a title bar and an optional action area
export default function Panel({ title, subtitle, extra, children }) {
  return (
    <div className="card mb-3 overflow-hidden">
      <div className="card-header d-flex justify-content-between align-items-center gap-2 py-3">
        <div>
          <h2 className="h6 fw-bold mb-0">{title}</h2>
          {subtitle && <small className="text-secondary">{subtitle}</small>}
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}
