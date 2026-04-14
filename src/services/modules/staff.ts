import api from "../api";

export const staffApi = {
  getAll: () => api.get("/staff"),
  add: (data: any) => api.post("/staff", data),
  update: (id: string, data: any) => api.put(`/staff/${id}`, data),
  delete: (id: string) => api.delete(`/staff/${id}`),
};
