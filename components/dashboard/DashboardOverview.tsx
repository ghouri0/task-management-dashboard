"use client"

import { useEffect, useState } from "react"
import { getDashboardStats, getUsers } from "@/services/data.service"

type Stats = Awaited<ReturnType<typeof getDashboardStats>>

const StatCard = ({ label, value, icon }: { label: string; value: number; icon: string }) => (
  <div className="rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition animate-fade-in-up" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)'}}>{label}</p>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--card-foreground)'}}>{value}</p>
  </div>
)

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [teamSize, setTeamSize] = useState(0)

  useEffect(() => {
    let isMounted = true
    Promise.all([getDashboardStats(), getUsers()]).then(
      ([dashboardStats, users]) => {
        if (!isMounted) return
        setStats(dashboardStats)
        setTeamSize(users.length)
        setLoading(false)
      }
    )
    return () => {
      isMounted = false
    }
  }, [])

  if (loading || !stats) {
    return (
      <div className="rounded-xl p-12 text-center shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
        <div className="inline-block text-4xl mb-4">⏳</div>
        <p style={{ color: 'var(--muted-foreground)'}}>Loading analytics...</p>
      </div>
    )
  }

  const maxTaskCount = Math.max(
    stats.taskStatus["Pending"] ?? 0,
    stats.taskStatus["In Progress"] ?? 0,
    stats.taskStatus["Completed"] ?? 0,
    1
  )

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={stats.totalProjects} icon="📦" />
        <StatCard label="Total Tasks" value={stats.totalTasks} icon="✓" />
        <StatCard label="Completed Tasks" value={stats.completedTasks} icon="🎉" />
        <StatCard label="Pending Tasks" value={stats.pendingTasks} icon="⏳" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="rounded-xl p-6 sm:p-8 shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)'}}>Task Progress</p>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold" style={{ color: 'var(--card-foreground)'}}>Status Distribution</h2>
            </div>
            <span className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}>
              Team {teamSize}
            </span>
          </div>

          <div className="space-y-6">
            {(["Pending", "In Progress", "Completed"] as const).map(
              (status) => {
                const count = stats.taskStatus[status] ?? 0
                const width = Math.round((count / maxTaskCount) * 100)
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium" style={{ color: 'var(--card-foreground)'}}>{status}</span>
                      <span className="font-semibold" style={{ color: 'var(--muted-foreground)'}}>{count}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--input)'}}>
                      <div
                        className={`h-full rounded-full transition-all duration-500`}
                        style={{ width: `${width}%`, backgroundColor: status === 'Completed' ? 'var(--accent)' : status === 'In Progress' ? 'var(--primary)' : 'var(--secondary)'}}
                      />
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </section>

        <section className="rounded-xl p-6 sm:p-8 shadow-lg" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)'}}>Insights</p>
            <h2 className="mt-2 text-xl sm:text-2xl font-bold" style={{ color: 'var(--card-foreground)'}}>Project Health</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.projectStatus).map(
              ([value, count]) => {
                const bg = value === 'Active' ? 'var(--primary)' : value === 'Completed' ? 'var(--accent)' : 'var(--input)'
                const fg = value === 'Active' ? 'var(--primary-foreground)' : value === 'Completed' ? 'var(--accent-foreground)' : 'var(--card-foreground)'
                return (
                  <div key={value} className={`rounded-lg p-4 flex items-center justify-between`} style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>{value}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)'}}>{count} project{count !== 1 ? 's' : ''}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold`} style={{ backgroundColor: bg, color: fg}}>
                      {count}
                    </span>
                  </div>
                )
              }
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
