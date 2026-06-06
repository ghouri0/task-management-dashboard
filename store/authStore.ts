import { create } from "zustand"
import { AuthUser } from "@/types"

type AuthState = {
  user: AuthUser | null
  token: string | null
  login: (payload: {
    user: AuthUser
    token: string
  }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: ({ user, token }) => {
    window.localStorage.setItem("pm_token", token)
    window.localStorage.setItem("pm_user", JSON.stringify(user))
    document.cookie = `token=${token}; path=/; max-age=86400`
    set({ user, token })
  },
  logout: () => {
    window.localStorage.removeItem("pm_token")
    window.localStorage.removeItem("pm_user")
    document.cookie = "token=; path=/; max-age=0"
    set({ user: null, token: null })
  },
}))
