
"use client"

import { useEffect, useState } from "react"
import MainShell from "@/components/layout/MainShell"
import ProjectForm from "@/components/projects/ProjectForm"
import ProjectTable from "@/components/projects/ProjectTable"
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/services/data.service"
import { Project } from "@/types"
import { ProjectFormValues } from "@/schemas/project.schema"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const refresh = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const handleSave = async (values: ProjectFormValues) => {
    try {
      setSubmitting(true)
      if (selectedProject) {
        await updateProject(selectedProject.id, values)
      } else {
        await createProject(values)
      }
      await refresh()
      setSelectedProject(null)
      alert("Project saved successfully.")
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error))
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Delete this project?")) {
      return
    }
    await deleteProject(projectId)
    await refresh()
  }

  return (
    <MainShell
      title="Projects"
      description="Create, edit and manage your active initiatives."
    >
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-4">
          <div className="w-full lg:w-1/2 lg:min-h-[36rem] h-full">
            <ProjectForm
              onSubmit={handleSave}
              initialValues={selectedProject ?? undefined}
              submitting={submitting}
            />
          </div>
          <div className="hidden lg:block w-full lg:w-1/2 lg:min-h-[36rem] h-full rounded-3xl p-6 shadow-sm flex items-center"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full bg-[var(--input)] px-3 py-2 text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>
                <span>🚀</span>
                <span>Project success</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Build with clarity</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: 'var(--muted-foreground)'}}>
                  Create structured initiatives, monitor progress, and close projects cleanly. The right panel helps you keep goals visible while you manage details.
                </p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Define</strong> project goals before you add tasks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Track</strong> milestones and status for better delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--secondary)]"></span>
                  <span style={{ color: 'var(--card-foreground)'}}><strong>Review</strong> projects regularly to keep scope aligned.</span>
                </li>
              </ul>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--input)] p-4 text-sm" style={{ color: 'var(--card-foreground)'}}>
                <p className="font-semibold">UX note</p>
                <p className="mt-2" style={{ color: 'var(--muted-foreground)'}}>
                  Use this panel for onboarding new project managers, sharing quick process reminders, or highlighting your current workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl p-6 sm:p-8" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
            <h2 className="text-xl sm:text-2xl font-bold">All Projects</h2>
            <p className="mt-2 text-sm">
              Review project details, statuses, and keep your backlog organized.
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl p-12 text-center shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
              <div className="inline-block text-4xl mb-4">📁</div>
              <p className="">Loading projects...</p>
            </div>
          ) : (
            <ProjectTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </MainShell>
  )
}
