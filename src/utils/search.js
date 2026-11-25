// Global search: case-insensitive match against every value of a record
export const matchesSearch = (record, term) => {
  const query = term?.trim().toLowerCase();
  return !query || JSON.stringify(record).toLowerCase().includes(query);
};
