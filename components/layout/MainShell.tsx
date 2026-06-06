"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import ThemeToggle from "@/components/ui/ThemeToggle"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/tasks", label: "Tasks" },
]

export default function MainShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-screen">
      <header
        className="border-b sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--sidebar-accent-foreground)'}}>
                  Dashboard
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--card-foreground)'}}>
                  {title}
                </h1>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    router.push("/login")
                  }}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  style={{ backgroundColor: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)'}}>{description}</p>
          </div>
          
          <nav className="flex gap-2 border-t pt-4 overflow-x-auto -mx-4 px-4 sm:border-t-0 sm:pt-0 sm:mx-0 sm:px-0" style={{ borderColor: 'var(--sidebar-border)' }}>
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap px-4 py-3 text-sm font-semibold border-b-2 transition"
                  style={{
                    color: active ? 'var(--primary)' : 'var(--muted-foreground)',
                    borderBottomColor: active ? 'var(--primary)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  )
}
