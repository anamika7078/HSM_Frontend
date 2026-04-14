import api from "../api";

export const billingApi = {
  getBills: () => api.get("/billing/bills"),
  generateBills: (data: Record<string, unknown>) => api.post("/billing/generate", data),
  getStats: () => api.get("/billing/stats"),
  sendReminder: (id: string) => api.post(`/billing/bills/${id}/remind`),
};
