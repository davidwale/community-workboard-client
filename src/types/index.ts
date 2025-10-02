export interface Task {
    _id: string
    title: string
    description: string
    category: string
    createdBy: {
      name: string
      email: string
    }
    createdAt: string
  }
  
  export interface Application {
    id: string
    taskId: string
    volunteerName: string
    volunteerEmail: string
    message: string
    createdAt: string
    userId: {
      name: string
      email: string
    }
  }
  
  export interface User {
    id: string
    name: string
    email: string
    role: "contributor" | "volunteer"
  }
  