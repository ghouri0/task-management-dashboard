
"use client"

import { useEffect, useState } from "react"
import MainShell from "@/components/layout/MainShell"
import TaskForm from "@/components/tasks/TaskForm"
import TaskTable from "@/components/tasks/TaskTable"
import {
  createTask,
  deleteTask,
  getTasks,
  getUsers,
  updateTask,
} from "@/services/data.service"
import { Task } from "@/types"
import { TaskFormValues } from "@/schemas/task.schema"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([getTasks(), getUsers()]).then(([taskData, userData]) => {
      setTasks(taskData)
      setUsers(userData.map((user) => user.name))
      setLoading(false)
    })
  }, [])

  const refresh = async () => {
    const taskData = await getTasks()
    setTasks(taskData)
  }

  const handleSave = async (values: TaskFormValues) => {
    try {
      setSubmitting(true)
      if (selectedTask) {
        await updateTask(selectedTask.id, values)
      } else {
        await createTask(values)
      }
      await refresh()
      setSelectedTask(null)
      alert("Task saved successfully.")
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error))
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm("Delete this task?")) {
      return
    }
    await deleteTask(taskId)
    await refresh()
  }

  const handleStatusChange = async (
    taskId: string,
    status: Task["status"]
  ) => {
    await updateTask(taskId, { status })
    await refresh()
  }

  return (
    <MainShell
      title="Tasks"
      description="Manage assignments, priorities, and completion status."
    >
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-4">
          <div className="w-full lg:w-1/2 lg:min-h-[36rem] h-full">
            <TaskForm
              onSubmit={handleSave}
              initialValues={selectedTask ?? undefined}
              users={users}
              submitting={submitting}
            />
          </div>
          <div className="hidden lg:block w-full lg:w-1/2 lg:min-h-[36rem] h-full rounded-3xl p-6 shadow-sm flex items-center"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full bg-[var(--input)] px-3 py-2 text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>
                <span>⚡</span>
                <span>Boost task flow</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Keep work moving</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: 'var(--muted-foreground)'}}>
                  Add tasks fast, assign priorities, and review progress without leaving the page. This panel keeps your day organized and your team aligned.
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Prioritize</strong> tasks with clear deadlines and status tags.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Assign</strong> work to team members for faster delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--secondary)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Update</strong> statuses as work progresses to keep stakeholders informed.</span>
                </li>
              </ul>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--input)] p-4 text-sm" style={{ color: 'var(--card-foreground)'}}>
                <p className="font-semibold">Pro tip</p>
                <p className="mt-2" style={{ color: 'var(--muted-foreground)'}}>
                  Use the task board below to quickly edit or mark completed items; your latest changes update in real time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
            <h2 className="text-xl sm:text-2xl font-bold">Task Board</h2>
            <p className="mt-2 text-sm">
              Plan work, change statuses, and keep every assignment visible.
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl p-12 text-center shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
              <div className="inline-block text-4xl mb-4">📄</div>
              <p className="">Loading tasks...</p>
            </div>
          ) : (
            <TaskTable
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </MainShell>
  )
}
