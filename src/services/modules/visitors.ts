import api from "../api";

export const visitorsApi = {
  getLogs: () => api.get("/visitors/logs"),
  recordEntry: (data: Record<string, unknown>) => api.post("/visitors/entry", data),
  recordExit: (id: string) => api.post(`/visitors/exit/${id}`),
};
