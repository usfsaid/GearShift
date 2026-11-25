export const fullName = (person) =>
  `${person.firstName} ${person.lastName}`.trim();
export const jobNumber = (jobOrderId) => `JO-${jobOrderId}`;

// Money and dates are always English (en-US)
export const money = (amount) =>
  `${Number(amount).toLocaleString("en-US")} EGP`;

export const date = (value, options = { dateStyle: "medium" }) =>
  new Date(value).toLocaleDateString("en-US", options);
