import apiClient from "./apiClient";

export const analyticsService = {
    getAnalytics: () => apiClient.get("/analytics")   
};