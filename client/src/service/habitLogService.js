import apiClient from "./apiClient";  

const habitLogService = {
  getHabitLogsByHabitId: (habitId) => apiClient.get(`/habitlogs/${habitId}`),
  getHabitLogsByDate: (habitId) => apiClient.get(`/logs`),
  upsertHabitLog: (habitId, data) => apiClient.post(`/logs/upsert/${habitId}`, data),
  streaksRange: (id) => apiClient.get(`/logs/streak`),
};

export default habitLogService;