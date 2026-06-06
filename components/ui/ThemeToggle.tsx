"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    return (localStorage.getItem("theme") as "light" | "dark") ?? "light"
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-lg hover:opacity-90 transition"
      style={{ backgroundColor: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  )
}
