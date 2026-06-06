"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project, ProjectStatus } from "@/types"
import { projectSchema, ProjectFormValues } from "@/schemas/project.schema"

export default function ProjectForm({
  onSubmit,
  initialValues,
  submitting,
}: {
  onSubmit: (values: ProjectFormValues) => Promise<void>
  initialValues?: Partial<Project>
  submitting: boolean
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      status: initialValues?.status ?? "Active"
    }
  })

  useEffect(() => {
    reset({
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      status: initialValues?.status ?? "Active"
    })
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border p-6 sm:p-8 shadow-lg h-full flex flex-col"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)'}}
    >
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--card-foreground)'}}>
        {initialValues?.id ? "Edit Project" : "Create New Project"}
      </h2>

      <div className="space-y-5 flex-1">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
            Project Name
          </label>
          <input
            {...register("name")}
            placeholder="e.g., Website Redesign"
            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition"
            style={{ borderColor: 'var(--border)'}}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Describe your project initiative..."
            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition resize-none"
            style={{ borderColor: 'var(--border)'}}
            rows={4}
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--input)] text-[var(--card-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 transition cursor-pointer"
            style={{ borderColor: 'var(--border)'}}
          >
            {(["Active", "Completed", "Archived"] as ProjectStatus[]).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-10 inline-flex items-center justify-center bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-xl hover:opacity-95 disabled:bg-[var(--border)] disabled:cursor-not-allowed transition mt-6 px-4 text-sm"
        >
          {submitting ? "Saving..." : initialValues?.id ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  )
}
