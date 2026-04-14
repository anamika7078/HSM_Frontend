import api from "../api";

export const securityApi = {
  getGuards: () => api.get("/security/guards"),
  addGuard: (data: any) => api.post("/security/guards", data),
  updateGuard: (id: string, data: any) => api.put(`/security/guards/${id}`, data),
};
