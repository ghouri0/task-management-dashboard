# Project Management Dashboard

A responsive Next.js dashboard for project and task management with authentication, analytics, and local mock storage.

## Features

- Login, registration, and password reset forms
- Protected dashboard, projects, and tasks routes
- Project creation, editing, deletion, and status management
- Task creation, editing, deletion, assignment, and status updates
- Analytics cards and progress charts
- Local mock API using browser storage for persistence
- Responsive UI built with Tailwind CSS

## Tech Stack

- React
- Next.js 16
- TypeScript
- Tailwind CSS
- Zustand for auth state
- Zod + React Hook Form for validation

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
npm run start
```

## App Pages

- `/` — Landing page with links to login and register
- `/login` — Login form
- `/register` — Registration form
- `/forgot-password` — Forgot password flow
- `/dashboard` — Analytics overview and project health cards
- `/projects` — Project CRUD management page
- `/tasks` — Task board with assignment and status controls

## Sample Login

Use one of the seeded users below for the first login:

- alex@example.com / password123
- jordan@example.com / password123
- taylor@example.com / password123

## Project Structure

Top-level structure (important files/folders):

- `app/` — Next.js App Router pages and layouts
	- `app/layout.tsx` — Root layout and SSR theme initializer
	- `app/page.tsx` — Landing page
	- `app/dashboard/` — Dashboard route and overview
	- `app/projects/` — Projects page
	- `app/tasks/` — Tasks page
- `components/` — Reusable UI and feature components
	- `components/auth/` — Login/Register/Forgot password forms and layout
	- `components/layout/` — Header, MainShell, and navigation
	- `components/projects/` — `ProjectForm`, `ProjectTable`
	- `components/tasks/` — `TaskForm`, `TaskTable`
	- `components/dashboard/` — `DashboardOverview`
	- `components/ui/` — theme toggle, buttons, and small primitives
- `services/` — Mock data and authentication service logic (`data.service.ts`, `auth.service.ts`)
- `schemas/` — Zod validation schemas for `project` and `task` forms
- `store/` — Zustand stores (e.g., `authStore.ts`)
- `types/` — Shared TypeScript types
- `public/` — Static assets
- `app/globals.css` — Global CSS variables and Tailwind base

## Environment

This project uses client-side mock storage and does not require backend environment variables by default. If you integrate a backend or change auth/storage, add environment variables to a `.env.local` file at the project root. Example placeholders:

```
# .env.local (optional)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXTAUTH_SECRET="your-secret-if-using-nextauth"
```

Be careful never to commit secrets to source control.

## Notes

- Theme: The app implements a light/dark theme using CSS variables in `app/globals.css`. Use the theme toggle in the header to switch themes; the selection is persisted to `localStorage` and applied early to avoid flicker.
- Development: If you change Tailwind or PostCSS config, restart the dev server.
- Seeded users: Use the sample accounts listed above for quick testing.

