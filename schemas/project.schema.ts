import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(3, "Project name is required"),
  description: z.string().min(8, "Description should be at least 8 characters"),
  status: z.enum(["Active", "Completed", "Archived"]),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
