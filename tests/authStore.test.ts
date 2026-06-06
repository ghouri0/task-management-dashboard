import { beforeEach, describe, expect, it } from "vitest"
import { useAuthStore } from "../store/authStore"

describe("authStore", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.cookie = ""
    useAuthStore.setState({ user: null, token: null })
  })

  it("logs in and stores token and user data", () => {
    useAuthStore.getState().login({
      user: { id: "user-1", name: "Test User", email: "test@example.com" },
      token: "test-token",
    })

    const state = useAuthStore.getState()
    expect(state.token).toBe("test-token")
    expect(state.user).toEqual({ id: "user-1", name: "Test User", email: "test@example.com" })
    expect(window.localStorage.getItem("pm_token")).toBe("test-token")
    expect(window.localStorage.getItem("pm_user")).toContain("test@example.com")
    expect(document.cookie).toContain("token=test-token")
  })

  it("logs out and clears stored auth data", () => {
    useAuthStore.getState().login({
      user: { id: "user-1", name: "Test User", email: "test@example.com" },
      token: "test-token",
    })

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
    expect(window.localStorage.getItem("pm_token")).toBeNull()
    expect(window.localStorage.getItem("pm_user")).toBeNull()
    expect(document.cookie).not.toContain("token=test-token")
  })
})
