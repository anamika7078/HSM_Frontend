import api from "../api";

export const securityApi = {
  getGuards: () => api.get("/security/guards"),
  addGuard: (data: Record<string, unknown>) => api.post("/security/guards", data),
  updateGuard: (id: string, data: Record<string, unknown>) => api.put(`/security/guards/${id}`, data),
};
