import { beforeEach, describe, expect, it } from "vitest"
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/data.service"

describe("data.service project CRUD", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("creates a project and persists it", async () => {
    const project = await createProject({
      name: "Test Project",
      description: "A project created during testing.",
      status: "Active",
    })

    expect(project.id).toMatch(/^project-/)
    expect(project.name).toBe("Test Project")

    const projects = await getProjects()
    expect(projects.some((item) => item.id === project.id)).toBe(true)
  })

  it("updates a project", async () => {
    const project = await createProject({
      name: "Update Project",
      description: "Update this project.",
      status: "Active",
    })

    const updated = await updateProject(project.id, {
      status: "Completed",
    })

    expect(updated.status).toBe("Completed")

    const projects = await getProjects()
    expect(projects.find((item) => item.id === project.id)?.status).toBe(
      "Completed"
    )
  })

  it("deletes a project", async () => {
    const project = await createProject({
      name: "Delete Project",
      description: "Delete this project.",
      status: "Active",
    })

    await deleteProject(project.id)

    const projects = await getProjects()
    expect(projects.some((item) => item.id === project.id)).toBe(false)
  })
})

describe("data.service task CRUD", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("creates a task and persists it", async () => {
    const task = await createTask({
      title: "Test Task",
      description: "A task created during testing.",
      priority: "Low",
      dueDate: "2099-12-31",
      assignedTo: "Alex Morgan",
      status: "Pending",
      projectId: "project-1",
    })

    expect(task.id).toMatch(/^task-/)
    expect(task.title).toBe("Test Task")

    const tasks = await getTasks()
    expect(tasks.some((item) => item.id === task.id)).toBe(true)
  })

  it("updates a task", async () => {
    const task = await createTask({
      title: "Update Task",
      description: "Update this task.",
      priority: "Medium",
      dueDate: "2099-12-31",
      assignedTo: "Jordan Lee",
      status: "Pending",
      projectId: "project-1",
    })

    const updated = await updateTask(task.id, {
      status: "Completed",
    })

    expect(updated.status).toBe("Completed")

    const tasks = await getTasks()
    expect(tasks.find((item) => item.id === task.id)?.status).toBe("Completed")
  })

  it("deletes a task", async () => {
    const task = await createTask({
      title: "Delete Task",
      description: "Delete this task.",
      priority: "High",
      dueDate: "2099-12-31",
      assignedTo: "Taylor Reed",
      status: "Pending",
      projectId: "project-2",
    })

    await deleteTask(task.id)

    const tasks = await getTasks()
    expect(tasks.some((item) => item.id === task.id)).toBe(false)
  })
})
