import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),

  register: (name: string, email: string, password: string, role: "contributor" | "volunteer") =>
    api.post("/auth/register", { name, email, password, role }),

  me: () => api.get("/auth/me"),
}

export const tasksAPI = {
  create: (title: string, description: string) =>
    api.post("/tasks", { title, description }),

  list: () => api.get("/tasks"),

  getById: (id: string) => api.get(`/tasks/${id}`),

  getMyTasks: () => api.get("/tasks/my-posted-tasks"),

  getApplications: (taskId: string) => api.get(`/tasks/${taskId}/applications`),
}

export const applicationsAPI = {
  create: (taskId: string, message: string) => api.post(`/tasks/${taskId}/apply`, { message }),
}
