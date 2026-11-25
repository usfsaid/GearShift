export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
      <div>
        <div className="wf-eyebrow">{eyebrow}</div>
        <h1 className="h4 fw-bold mt-1 mb-1">{title}</h1>
        {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}
