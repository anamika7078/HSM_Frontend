import api from "../api";

export const visitorsApi = {
  getLogs: () => api.get("/visitors/logs"),
  recordEntry: (data: any) => api.post("/visitors/entry", data),
  recordExit: (id: string) => api.post(`/visitors/exit/${id}`),
};
