import apiClient from "./apiClient";

export const userService = {
  signUp: (data) => apiClient.post("/signup", data),
  signIn: (data) => apiClient.post("/signin", data),
  getUser: () => apiClient.get(`/user/${id}`),
  signOut: () => apiClient.get("/signout"),
  getAllUsers: () => apiClient.get("/users"),
  deleteUser: (id) => apiClient.delete(`/delete/${id}`),
};

export default userService;
