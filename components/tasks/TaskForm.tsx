"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskPriority, TaskStatus } from "@/types"
import { taskSchema, TaskFormValues } from "@/schemas/task.schema"

export default function TaskForm({
  onSubmit,
  initialValues,
  users,
  submitting,
}: {
  onSubmit: (values: TaskFormValues) => Promise<void>
  initialValues?: Partial<TaskFormValues>
  users: string[]
  submitting: boolean
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      priority: initialValues?.priority ?? "Medium",
      dueDate: initialValues?.dueDate ?? "",
      assignedTo: initialValues?.assignedTo ?? users[0] ?? "",
      status: initialValues?.status ?? "Pending",
    }
  })

  useEffect(() => {
    reset({
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      priority: initialValues?.priority ?? "Medium",
      dueDate: initialValues?.dueDate ?? "",
      assignedTo: initialValues?.assignedTo ?? users[0] ?? "",
      status: initialValues?.status ?? "Pending",
    })
  }, [initialValues, reset, users])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border p-6 sm:p-8 shadow-lg h-full flex flex-col"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)'}}
    >
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--card-foreground)'}}>
        {initialValues?.title ? "Edit Task" : "Create New Task"}
      </h2>

      <div className="space-y-5 flex-1">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
            Task Title
          </label>
          <input
            {...register("title")}
            placeholder="e.g., Design mobile layout"
            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition"
            style={{ borderColor: 'var(--border)'}}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Add task details..."
            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition resize-none"
            style={{ borderColor: 'var(--border)'}}
            rows={3}
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
              Priority
            </label>
            <select
              {...register("priority")}
              className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition cursor-pointer text-sm"
              style={{ borderColor: 'var(--border)'}}
            >
              {(["Low", "Medium", "High"] as TaskPriority[]).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
              Due Date
            </label>
            <input
              {...register("dueDate")}
              type="date"
              className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition text-sm"
              style={{ borderColor: 'var(--border)'}}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
              Assigned To
            </label>
            <select
              {...register("assignedTo")}
              className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition cursor-pointer text-sm"
              style={{ borderColor: 'var(--border)'}}
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition cursor-pointer text-sm"
              style={{ borderColor: 'var(--border)'}}
            >
              {(["Pending", "In Progress", "Completed"] as TaskStatus[]).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-10 inline-flex items-center justify-center bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-xl hover:opacity-95 disabled:bg-[var(--border)] disabled:cursor-not-allowed transition mt-6 px-4 text-sm"
        >
          {submitting ? "Saving..." : initialValues?.title ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  )
}
