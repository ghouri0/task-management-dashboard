import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-start">
          <section className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-[var(--input)] px-4 py-2 text-xs font-semibold tracking-[0.3em]" style={{ color: 'var(--card-foreground)'}}>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm">PM</span>
              Project Management
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight leading-tight sm:text-5xl" style={{ color: 'var(--card-foreground)'}}>
                Build, track, and complete projects with confidence.
              </h1>
              <p className="max-w-2xl text-base leading-8 sm:text-lg" style={{ color: 'var(--muted-foreground)'}}>
                A responsive dashboard with auth flows, project and task workflows, analytics, and intuitive controls designed to keep your team aligned.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-sm shadow-[var(--primary)/20] transition hover:opacity-95"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--card-foreground)] transition hover:bg-[var(--input)]"
              >
                Register
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
                <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>Fast setup</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)'}}>Start quickly with simple auth and dashboard workflows.</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
                <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>Clear workflows</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)'}}>Manage projects and tasks with intuitive forms and tables.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/5 sm:p-8">
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] font-semibold" style={{ color: 'var(--muted-foreground)'}}>
                  What’s inside
                </p>
                <h2 className="mt-3 text-xl font-semibold" style={{ color: 'var(--card-foreground)'}}>
                  Modern dashboard essentials
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--input)] p-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>Authentication</p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)'}}>Login, register and password recovery flows that feel polished.</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--input)] p-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>Task & project CRUD</p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)'}}>Create, update, and delete tasks and projects with ease.</p>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--input)] p-4">
                  <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)'}}>Analytics</p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)'}}>Track progress with clear stats, health cards, and activity insight.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
