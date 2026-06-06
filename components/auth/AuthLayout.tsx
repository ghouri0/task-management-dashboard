"use client"

export default function AuthLayout({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)'}}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--card-foreground)'}}>
            {title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)'}}>
            Manage projects and tasks effortlessly
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl p-8 sm:p-10" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)'}}>
          {children}
        </div>
      </div>
    </div>
  )
}