import { getUsers, addUser, StoredUser } from "@/services/data.service"
import { AuthUser } from "@/types"

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> => {
  const users = await getUsers()
  const user = users.find(
    (candidate: StoredUser) =>
      candidate.email === email &&
      candidate.password === password
  )

  if (!user) {
    throw new Error("Invalid credentials")
  }

  return {
    token: "dummy-jwt-token",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
}

export const registerUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  const users = await getUsers()
  const existing = users.find((user) => user.email === data.email)
  if (existing) {
    throw new Error("Email already registered")
  }

  const nextUser = {
    ...data,
    id: `user-${Date.now()}`,
  }

  await addUser(nextUser)

  return {
    message: "Registration successful",
  }
}

export const forgotPassword = async (email: string) => {
  const users = await getUsers()
  const existing = users.find((user) => user.email === email)
  if (!existing) {
    throw new Error("Email not found")
  }

  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  )
}