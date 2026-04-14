import api from "../api";

export const membersApi = {
  getRequests: () => api.get("/members/requests"),
  approve: (id: string) => api.post(`/members/requests/${id}/approve`),
  reject: (id: string) => api.post(`/members/requests/${id}/reject`),
  getAll: () => api.get("/members"),
};
