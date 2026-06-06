"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema"
import { registerUser } from "@/services/auth.service"

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true)
      await registerUser(data)
      alert("Registration successful. Please login.")
      router.push("/login")
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-3 rounded"
        />
        <p className="text-sm text-rose-600">{errors.name?.message}</p>
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />
        <p className="text-sm text-rose-600">{errors.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-3 rounded"
        />
        <p className="text-sm text-rose-600">{errors.password?.message}</p>
      </div>

      <div>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full border p-3 rounded"
        />
        <p className="text-sm text-rose-600">{errors.confirmPassword?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  )
}