import api from "../api";

export const flatsApi = {
  getWings: () => api.get("/wings"),
  getFlats: () => api.get("/flats"),
  addWing: (data: any) => api.post("/wings", data),
  addFlat: (data: any) => api.post("/flats", data),
  updateFlat: (id: string, data: any) => api.put(`/flats/${id}`, data),
  deleteFlat: (id: string) => api.delete(`/flats/${id}`),
};
