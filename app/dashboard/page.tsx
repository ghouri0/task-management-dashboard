
"use client"

import { useState } from "react"
import MainShell from "@/components/layout/MainShell"
import DashboardOverview from "@/components/dashboard/DashboardOverview"

export default function DashboardPage() {
  const [userName] = useState(() => {
    if (typeof window === "undefined") {
      return "Team"
    }

    const stored = window.localStorage.getItem("pm_user")
    if (!stored) {
      return "Team"
    }

    try {
      const user = JSON.parse(stored)
      return user?.name ?? "Team"
    } catch {
      return "Team"
    }
  })

  return (
    <MainShell
      title="Dashboard"
      description="Track summary metrics and active work across projects and tasks."
    >
      <section className="mb-8 rounded-xl p-8 sm:p-10 animate-fade-in-up" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--card-foreground)'}}>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--card-foreground)'}}>
          Welcome back, {userName} 👋
        </h2>
        <p className="mt-3 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--muted-foreground)'}}>
          Your project dashboard centralizes tasks, statuses, and productivity at a glance. Stay organized and keep your team aligned.
        </p>
      </section>

      <DashboardOverview />
    </MainShell>
  )
}
