import api from "@/api/axiosClient";

export const customerService = {
  getAll: () => api.get("/customers").then((res) => res.data),
};
