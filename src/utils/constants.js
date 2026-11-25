export const ROLES = {
  ADMIN: "Admin",
  RECEPTIONIST: "Receptionist",
  TECHNICIAN: "Technician",
};

export const ALL_ROLES = Object.values(ROLES);
export const STAFF_ROLES = [ROLES.ADMIN, ROLES.RECEPTIONIST];

export const JOB_ORDER_STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "InProgress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const FAULT_STATUS = {
  PENDING: "Pending",
  IN_PROGRESS: "InProgress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const SEVERITY = { LOW: "Low", MEDIUM: "Medium", CRITICAL: "Critical" };

// Matches JobOrderFaults.ApprovalStatus (0: Pending, 1: Approved, 2: Rejected)
export const APPROVAL = { PENDING: 0, APPROVED: 1, REJECTED: 2 };

export const PAYMENT_METHODS = ["Cash", "Card", "Transfer"];
export const PAYMENT_TYPES = ["Deposit", "Settlement"];

export const ADMIN_SPECIALIZATION = "Administration";
export const isTechnicalSpecialization = (specialization) =>
  specialization.specializationName !== ADMIN_SPECIALIZATION;

export const isActiveOrder = (order) =>
  [JOB_ORDER_STATUS.OPEN, JOB_ORDER_STATUS.IN_PROGRESS].includes(
    order.orderStatus,
  );
