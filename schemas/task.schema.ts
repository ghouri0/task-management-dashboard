import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(3, "Task title is required"),
  description: z.string().min(8, "Description should be at least 8 characters"),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string().min(1, "Please choose a due date"),
  assignedTo: z.string().min(1, "Please assign a user"),
  status: z.enum(["Pending", "In Progress", "Completed"]),
})

export type TaskFormValues = z.infer<typeof taskSchema>
