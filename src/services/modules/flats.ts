import api from "../api";

export const flatsApi = {
  getWings: () => api.get("/wings"),
  getFlats: () => api.get("/flats"),
  addWing: (data: Record<string, unknown>) => api.post("/wings", data),
  addFlat: (data: Record<string, unknown>) => api.post("/flats", data),
  updateFlat: (id: string, data: Record<string, unknown>) => api.put(`/flats/${id}`, data),
  deleteFlat: (id: string) => api.delete(`/flats/${id}`),
};
