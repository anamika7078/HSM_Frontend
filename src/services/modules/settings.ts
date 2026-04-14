import api from "../api";

export const settingsApi = {
  getSocietyProfile: () => api.get("/settings/society"),
  updateSocietyProfile: (data: any) => api.put("/settings/society", data),
  getPaymentConfig: () => api.get("/settings/payments"),
  updatePaymentConfig: (data: any) => api.put("/settings/payments", data),
};
