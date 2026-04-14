import api from "../api";

export const reportsApi = {
  getOverview: () => api.get("/reports/overview"),
  getFinancials: () => api.get("/reports/financials"),
  getComplaints: () => api.get("/reports/complaints"),
  download: (id: string) => api.get(`/reports/download/${id}`, { responseType: 'blob' }),
};
