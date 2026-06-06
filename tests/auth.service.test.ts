import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { loginUser, registerUser, forgotPassword } from "../services/auth.service"
import { getUsers } from "../services/data.service"

afterEach(() => {
  window.localStorage.clear()
})

describe("auth.service", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("logs in a valid user", async () => {
    const result = await loginUser("alex@example.com", "password123")
    expect(result.token).toBe("dummy-jwt-token")
    expect(result.user.email).toBe("alex@example.com")
    expect(result.user.name).toBe("Alex Morgan")
  })

  it("throws when credentials are invalid", async () => {
    await expect(loginUser("alex@example.com", "wrong-password")).rejects.toThrow(
      "Invalid credentials"
    )
  })

  it("registers a new user", async () => {
    const response = await registerUser({
      name: "New User",
      email: "newuser@example.com",
      password: "strong-password",
    })

    expect(response).toEqual({ message: "Registration successful" })

    const users = await getUsers()
    expect(users.some((user) => user.email === "newuser@example.com")).toBe(true)
  })

  it("throws when the email is already registered", async () => {
    await expect(
      registerUser({
        name: "Alex Morgan",
        email: "alex@example.com",
        password: "password123",
      })
    ).rejects.toThrow("Email already registered")
  })

  it("resolves forgot password for an existing email", async () => {
    const response = await forgotPassword("alex@example.com")
    expect(response).toEqual({ success: true })
  })

  it("throws when forgot password email is not found", async () => {
    await expect(forgotPassword("missing@example.com")).rejects.toThrow(
      "Email not found"
    )
  })
})
