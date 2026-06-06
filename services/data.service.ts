import {
  Project,
  Task,
  TaskPriority,
  TaskStatus,
  ProjectStatus,
  AuthUser,
} from "@/types"

export type StoredUser = AuthUser & {
  password: string
}

const USERS_KEY = "pm_users"
const PROJECTS_KEY = "pm_projects"
const TASKS_KEY = "pm_tasks"

const SAMPLE_USERS: StoredUser[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    password: "password123",
  },
  {
    id: "user-2",
    name: "Jordan Lee",
    email: "jordan@example.com",
    password: "password123",
  },
  {
    id: "user-3",
    name: "Taylor Reed",
    email: "taylor@example.com",
    password: "password123",
  },
]

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "Website Redesign",
    description:
      "Refresh the landing page and dashboard styles.",
    status: "Active",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ).toISOString(),
  },
  {
    id: "project-2",
    name: "Onboarding Flow",
    description:
      "Build onboarding screens and workflow for new users.",
    status: "Completed",
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 14
    ).toISOString(),
  },
]

const SAMPLE_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design hero section",
    description:
      "Create a clean hero section that highlights new features.",
    priority: "High",
    dueDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 3
    ).toISOString().split("T")[0],
    assignedTo: "Alex Morgan",
    status: "In Progress",
    projectId: "project-1",
  },
  {
    id: "task-2",
    title: "Set up authentication",
    description:
      "Implement login, register and forgot password flows.",
    priority: "Medium",
    dueDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7
    ).toISOString().split("T")[0],
    assignedTo: "Jordan Lee",
    status: "Pending",
    projectId: "project-1",
  },
  {
    id: "task-3",
    title: "Publish release notes",
    description:
      "Finalize release notes and launch communication.",
    priority: "Low",
    dueDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 2
    ).toISOString().split("T")[0],
    assignedTo: "Taylor Reed",
    status: "Completed",
    projectId: "project-2",
  },
]

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback
  }

  const raw = window.localStorage.getItem(key)
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}

function setStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export async function getUsers(): Promise<StoredUser[]> {
  return new Promise((resolve) => {
    const users = getStorage<StoredUser[]>(USERS_KEY, SAMPLE_USERS as StoredUser[])
    resolve(users)
  })
}

export async function addUser(user: StoredUser): Promise<StoredUser> {
  return new Promise((resolve) => {
    const users = getStorage<StoredUser[]>(USERS_KEY, SAMPLE_USERS as StoredUser[])
    const next = [...users, user]
    setStorage(USERS_KEY, next)
    resolve(user)
  })
}

export async function getProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    resolve(getStorage<Project[]>(PROJECTS_KEY, SAMPLE_PROJECTS))
  })
}

export async function createProject(
  project: Omit<Project, "id" | "createdAt">
): Promise<Project> {
  return new Promise((resolve) => {
    const projects = getStorage<Project[]>(PROJECTS_KEY, SAMPLE_PROJECTS)
    const nextProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    const next = [nextProject, ...projects]
    setStorage(PROJECTS_KEY, next)
    resolve(nextProject)
  })
}

export async function updateProject(
  projectId: string,
  updates: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project> {
  return new Promise((resolve, reject) => {
    const projects = getStorage<Project[]>(PROJECTS_KEY, SAMPLE_PROJECTS)
    const found = projects.find((project) => project.id === projectId)
    if (!found) {
      return reject(new Error("Project not found"))
    }
    const updated = { ...found, ...updates }
    const next = projects.map((project) =>
      project.id === projectId ? updated : project
    )
    setStorage(PROJECTS_KEY, next)
    resolve(updated)
  })
}

export async function deleteProject(projectId: string): Promise<void> {
  return new Promise((resolve) => {
    const projects = getStorage<Project[]>(PROJECTS_KEY, SAMPLE_PROJECTS)
    const next = projects.filter(
      (project) => project.id !== projectId
    )
    setStorage(PROJECTS_KEY, next)
    resolve()
  })
}

export async function getTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    resolve(getStorage<Task[]>(TASKS_KEY, SAMPLE_TASKS))
  })
}

export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
  return new Promise((resolve) => {
    const tasks = getStorage<Task[]>(TASKS_KEY, SAMPLE_TASKS)
    const nextTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
    }
    const next = [nextTask, ...tasks]
    setStorage(TASKS_KEY, next)
    resolve(nextTask)
  })
}

export async function updateTask(
  taskId: string,
  updates: Partial<Omit<Task, "id">>
): Promise<Task> {
  return new Promise((resolve, reject) => {
    const tasks = getStorage<Task[]>(TASKS_KEY, SAMPLE_TASKS)
    const found = tasks.find((task) => task.id === taskId)
    if (!found) {
      return reject(new Error("Task not found"))
    }
    const updated = { ...found, ...updates }
    const next = tasks.map((task) =>
      task.id === taskId ? updated : task
    )
    setStorage(TASKS_KEY, next)
    resolve(updated)
  })
}

export async function deleteTask(taskId: string): Promise<void> {
  return new Promise((resolve) => {
    const tasks = getStorage<Task[]>(TASKS_KEY, SAMPLE_TASKS)
    const next = tasks.filter((task) => task.id !== taskId)
    setStorage(TASKS_KEY, next)
    resolve()
  })
}

export async function getDashboardStats() {
  const projects = getStorage<Project[]>(PROJECTS_KEY, SAMPLE_PROJECTS)
  const tasks = getStorage<Task[]>(TASKS_KEY, SAMPLE_TASKS)

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length
  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length

  const projectStatus = projects.reduce(
    (acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    },
    {} as Record<ProjectStatus, number>
  )

  const taskStatus = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    },
    {} as Record<TaskStatus, number>
  )

  return {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    completedTasks,
    pendingTasks,
    projectStatus,
    taskStatus,
  }
}
