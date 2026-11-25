// Display labels for values that come from the API as codes
export const roleLabels = {
  Admin: "Admin",
  Receptionist: "Receptionist",
  Technician: "Technician",
};

export const specializationLabels = {
  Mechanics: "Mechanics",
  Brakes: "Brakes",
  Electrical: "Electrical",
  Administration: "Administration",
};

export const jobOrderStatusLabels = {
  Open: "Open (inspection)",
  InProgress: "In progress",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export const faultStatusLabels = {
  Pending: "Not started",
  InProgress: "In progress",
  Completed: "Finished",
  Cancelled: "Cancelled",
};

export const severityLabels = {
  Low: "Low",
  Medium: "Medium",
  Critical: "Critical",
};

// Matches JobOrderFaults.ApprovalStatus (0: Pending, 1: Approved, 2: Rejected)
export const approvalLabels = {
  0: "Awaiting customer",
  1: "Approved ✓",
  2: "Rejected ✕",
};

export const accountStatusLabels = {
  active: "Active",
  inactive: "Disabled",
};

export const workStatusLabels = {
  available: "Available",
  busy: "Busy",
};

export const invoiceStatusLabels = {
  Unpaid: "Unpaid",
  PartiallyPaid: "Partially paid",
  Paid: "Paid",
};
