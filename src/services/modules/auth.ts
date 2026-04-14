import api from "../api";

export const authApi = {
  login: async (credentials: Record<string, unknown>) => {
    // For demo purposes, we'll mock a successful login if no actual backend is ready
    // return api.post("/auth/login", credentials);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock-jwt-token",
          user: {
            id: "1",
            name: "Admin User",
            email: credentials.email,
            role: "admin",
          },
        });
      }, 1000);
    });
  },
  
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
  
  getProfile: () => api.get("/auth/profile"),
};
