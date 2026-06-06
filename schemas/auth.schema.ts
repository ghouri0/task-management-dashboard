import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be 6 characters")
})

export type LoginFormValues =
  z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z.string().min(3),

    email: z.string().email(),

    password: z.string().min(6),

    confirmPassword: z.string()
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    }
  )

export type RegisterFormValues =
  z.infer<typeof registerSchema>

export const forgotPasswordSchema =
  z.object({
    email: z.string().email()
  })

export type ForgotPasswordValues =
  z.infer<
    typeof forgotPasswordSchema
  >