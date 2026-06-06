export type AuthUser = {
  id: string
  name: string
  email: string
}

export type ProjectStatus =
  | "Active"
  | "Completed"
  | "Archived"

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed"

export type TaskPriority = "Low" | "Medium" | "High"

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  createdAt: string
}

export type Task = {
  id: string
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  assignedTo: string
  status: TaskStatus
  projectId?: string
}
