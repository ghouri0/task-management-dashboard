"use client"

import { Task } from "@/types"

export default function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl p-8 text-center shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
        <div className="text-4xl mb-3">✓</div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No tasks yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-0 sm:rounded-xl sm:overflow-hidden sm:shadow-lg">
      <div className="hidden sm:grid sm:gap-4 sm:px-6 sm:py-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]" style={{ backgroundColor: 'var(--background)', color: 'var(--muted-foreground)'}}>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Task</span>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Assignee</span>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Details</span>
        <span className="sr-only">Actions</span>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--border)'}}>
        {tasks.map((task) => (
          <div key={task.id} className="p-4 sm:p-6 sm:grid sm:gap-4 sm:grid-cols-[1.5fr_1fr_1fr_auto] transition hover:opacity-95" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)'}}>
            <div className="sm:col-span-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: 'var(--card-foreground)'}}>{task.title}</p>
              <p className="mt-1 text-xs sm:text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)'}}>{task.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <span className="sm:hidden text-xs font-semibold" style={{ color: 'var(--muted-foreground)'}}>Assignee:</span>
              <span className="text-xs sm:text-sm" style={{ color: 'var(--muted-foreground)'}}>{task.assignedTo}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
              <span className="inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold leading-none" style={{ backgroundColor: task.status === 'Completed' ? 'rgba(16,185,129,0.12)' : task.status === 'In Progress' ? 'rgba(250,204,21,0.12)' : 'rgba(148,163,184,0.08)', color: 'var(--card-foreground)'}}>
                {task.status}
              </span>
              <span className="inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold leading-none" style={{ backgroundColor: task.priority === 'High' ? 'rgba(239,68,68,0.12)' : task.priority === 'Medium' ? 'rgba(249,115,22,0.12)' : 'rgba(59,130,246,0.12)', color: 'var(--card-foreground)'}}>
                {task.priority}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-3 sm:mt-0">
              <select
                value={task.status}
                onChange={(event) => onStatusChange(task.id, event.target.value as Task["status"]) }
                className="h-10 rounded-xl px-3 text-sm focus:outline-none transition cursor-pointer"
                style={{ backgroundColor: 'var(--input)', color: 'var(--card-foreground)', border: '1px solid var(--border)'}}
              >
                {(["Pending", "In Progress", "Completed"] as Task["status"][]).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="flex-1 sm:flex-none h-10 min-w-[110px] rounded-xl px-4 text-sm font-semibold inline-flex items-center justify-center transition"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="flex-1 sm:flex-none h-10 min-w-[110px] rounded-xl px-4 text-sm font-semibold inline-flex items-center justify-center transition"
                  style={{ backgroundColor: 'var(--destructive)', color: 'var(--card-foreground)'}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
