import apiClient from "./apiClient";  

export const habitLogService = {
  getHabitLogsByHabitId: (habitId) => apiClient.get(`/logs/habit/${habitId}`),
  getHabitLogsByDate: () => apiClient.get(`/logs`),
  upsertHabitLog: (habitId, data) => apiClient.post(`/logs/upsert/${habitId}`, data),
  streaksRange: (id) => apiClient.get(`/logs/streak`)
};
