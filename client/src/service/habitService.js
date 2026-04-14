import apiClient from "./apiClient";

export const habitService = {
  getHabits: () => apiClient.get("/gethabit/:id"),
  getAllHabits: () => apiClient.get("/getallhabit"),
  addHabit: (data) => apiClient.post("/create", data),
  updateHabit: (id, data) => apiClient.put(`/habits/${id}`, data),
  deleteHabit: (id) => apiClient.delete(`/habits/${id}`),
};