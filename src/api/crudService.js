import api from "./axiosClient";

// Standard REST resource: GET/POST /resource, PUT/DELETE /resource/:id
export const createCrudService = (resource) => ({
  getAll: () => api.get(`/${resource}`).then((res) => res.data),

  create: (payload) =>
    api.post(`/${resource}`, payload).then((res) => res.data),

  update: (id, payload) =>
    api.put(`/${resource}/${id}`, payload).then((res) => res.data),

  remove: (id) => api.delete(`/${resource}/${id}`).then((res) => res.data),
});
