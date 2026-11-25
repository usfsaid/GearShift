// The API answers with { code, params }. The UI translates `errors.<code>`.
export const parseApiError = (error) => {
  const data = error?.response?.data;
  if (data?.code) return { code: data.code, params: data.params };
  if (error?.code === "ERR_NETWORK") return { code: "NETWORK_ERROR" };
  return { code: "UNKNOWN" };
};

export const errorMessage = (t, error) =>
  t(`errors.${error?.code || "UNKNOWN"}`, error?.params);
