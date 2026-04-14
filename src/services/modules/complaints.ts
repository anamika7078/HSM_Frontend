import api from "../api";

export const complaintsApi = {
  getAll: () => api.get("/complaints"),
  updateStatus: (id: string, status: string) => api.patch(`/complaints/${id}/status`, { status }),
  getStats: () => api.get("/complaints/stats"),
};
