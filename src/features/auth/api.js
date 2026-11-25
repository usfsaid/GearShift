import api from "@/api/axiosClient";

export const authService = {
  login: (credentials) =>
    api.post("/auth/login", credentials).then((res) => res.data),
  me: () => api.get("/auth/me").then((res) => res.data),
};
