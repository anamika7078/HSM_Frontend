import api from "../api";

export const noticesApi = {
  getAll: () => api.get("/notices"),
  create: (data: Record<string, unknown>) => api.post("/notices", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/notices/${id}`, data),
  delete: (id: string) => api.delete(`/notices/${id}`),
};
