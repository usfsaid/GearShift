import api from "@/api/axiosClient";

export const specializationService = {
  getAll: () => api.get("/specializations").then((res) => res.data),
};
