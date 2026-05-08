import apiClient from "./apiClient";

export const habitService = {
  getHabits: (id) => apiClient.get(`/gethabit/${id}`),
  getAllHabits: () => apiClient.get("/getallhabit"),
  addHabit: (data) => apiClient.post("/create", data),
  updateHabit: (id, data) => apiClient.put(`/updatehabit/${id}`, data),
  deleteHabit: (id) => apiClient.delete(`/habits/${id}`),
};