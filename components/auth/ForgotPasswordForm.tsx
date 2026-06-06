"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/schemas/auth.schema"
import { forgotPassword } from "@/services/auth.service"

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      setLoading(true)
      setSubmitError(null)
      await forgotPassword(data.email)
      setSubmitted(true)
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : String(error)
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4" style={{ color: 'var(--card-foreground)'}}>
        <div className="text-4xl mb-4">📧</div>
        <h2 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)'}}>
          Check your email
        </h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)'}}>
          We&apos;ve sent a password reset link to your email address. Check your inbox and spam folder.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 font-medium"
          style={{ color: 'var(--primary)'}}
        >
          ← Back to login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--card-foreground)'}}>
          Email Address
        </label>
        <input
          {...register("email")}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition"
          style={{ backgroundColor: 'var(--input)', color: 'var(--card-foreground)', border: '1px solid var(--border)'}}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>
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
        className="w-full font-semibold py-3 rounded-lg disabled:cursor-not-allowed transition"
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
      >
        {loading ? "Sending reset link..." : "Send Reset Link"}
      </button>

      <div className="text-center text-sm" style={{ color: 'var(--muted-foreground)'}}>
        Remember your password?{" "}
        <Link href="/login" className="font-medium" style={{ color: 'var(--primary)'}}>
          Sign in
        </Link>
      </div>
    </form>
  )
}