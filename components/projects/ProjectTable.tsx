"use client"

import { Project } from "@/types"

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
}) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl p-8 text-center shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
        <div className="text-4xl mb-3">📋</div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No projects yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-0 sm:rounded-xl sm:overflow-hidden sm:shadow-lg">
      <div className="hidden sm:grid sm:gap-4 sm:px-6 sm:py-4 sm:grid-cols-[1fr_1fr_0.8fr_auto]" style={{ backgroundColor: 'var(--background)', color: 'var(--muted-foreground)'}}>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Project</span>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Status</span>
        <span className="font-semibold text-sm" style={{ color: 'var(--card-foreground)'}}>Created</span>
        <span className="sr-only">Actions</span>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--border)'}}>
        {projects.map((project) => (
          <div key={project.id} className="p-4 sm:p-6 sm:grid sm:gap-4 sm:grid-cols-[1fr_1fr_0.8fr_auto] transition hover:opacity-95" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)'}}>
            <div className="sm:col-span-1">
              <p className="font-semibold text-sm sm:text-base" style={{ color: 'var(--card-foreground)'}}>{project.name}</p>
              <p className="mt-1 text-xs sm:text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)'}}>{project.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <span className="sm:hidden text-xs font-semibold" style={{ color: 'var(--muted-foreground)'}}>Status:</span>
              <span className="inline-flex h-8 items-center rounded-full px-3 text-sm font-semibold leading-none" style={{ backgroundColor: project.status === 'Active' ? 'rgba(59,130,246,0.12)' : project.status === 'Completed' ? 'rgba(16,185,129,0.12)' : 'rgba(148,163,184,0.08)', color: 'var(--card-foreground)'}}>
                {project.status}
              </span>
            </div>

            <div className="hidden sm:block text-sm" style={{ color: 'var(--muted-foreground)'}}>
              {new Date(project.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                type="button"
                onClick={() => onEdit(project)}
                className="flex-1 sm:flex-none h-10 min-w-[110px] rounded-xl px-4 text-sm font-semibold inline-flex items-center justify-center transition"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="flex-1 sm:flex-none h-10 min-w-[110px] rounded-xl px-4 text-sm font-semibold inline-flex items-center justify-center transition"
                style={{ backgroundColor: 'var(--destructive)', color: 'var(--card-foreground)'}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
