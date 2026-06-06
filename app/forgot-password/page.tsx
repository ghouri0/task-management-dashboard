import AuthLayout
from "@/components/auth/AuthLayout"

import ForgotPasswordForm
from "@/components/auth/ForgotPasswordForm"

export default function ForgotPage() {
  return (
    <AuthLayout
      title="Forgot Password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}