import api from "../api";

export const noticesApi = {
  getAll: () => api.get("/notices"),
  create: (data: any) => api.post("/notices", data),
  update: (id: string, data: any) => api.put(`/notices/${id}`, data),
  delete: (id: string) => api.delete(`/notices/${id}`),
};
