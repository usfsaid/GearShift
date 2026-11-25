// component status

export default function StatusBadge({ variant = "secondary", children }) {
  return (
    <span
      className={`badge rounded-pill bg-${variant}-subtle text-${variant}-emphasis`}
    >
      {children}
    </span>
  );
}
