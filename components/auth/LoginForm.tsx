"use client"

import { useState } from "react"
import Link from "next/link"

import {
  useForm
} from "react-hook-form"

import {
  zodResolver
} from "@hookform/resolvers/zod"

import {
  loginSchema,
  LoginFormValues
} from "@/schemas/auth.schema"

import {
  loginUser
} from "@/services/auth.service"

import {
  useRouter
} from "next/navigation"

import {
  useAuthStore
} from "@/store/authStore"

export default function LoginForm() {
  const router = useRouter()

  const login =
    useAuthStore(
      (state) => state.login
    )

  const [loading, setLoading] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } =
    useForm<LoginFormValues>({
      resolver:
        zodResolver(
          loginSchema
        )
    })

  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true)
      setSubmitError(null)

      const response = await loginUser(
        data.email,
        data.password
      )

      login(response)
      router.push("/dashboard")
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : String(error)
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
          Email Address
        </label>
        <input
          placeholder="you@example.com"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition"
          style={{ backgroundColor: 'var(--input)', color: 'var(--card-foreground)', border: '1px solid var(--border)'}}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1.5">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition"
          style={{ backgroundColor: 'var(--input)', color: 'var(--card-foreground)', border: '1px solid var(--border)'}}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1.5">
            {errors.password.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-sm text-red-800">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full font-semibold py-3 rounded-lg disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="space-y-3 text-sm">
        <div className="text-center">
          <Link href="/forgot-password" className="font-medium" style={{ color: 'var(--primary)'}}>
            Forgot your password?
          </Link>
        </div>
        <div className="text-center" style={{ color: 'var(--muted-foreground)'}}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium" style={{ color: 'var(--primary)'}}>
            Create one
          </Link>
        </div>
      </div>
    </form>
  )
}