import { create } from "zustand";
import type { User } from "../types/user";
import type { AuthSession } from "../services/auth/platziAuth";
import { readAuthSession, clearAuthSession } from "../services/auth/platziAuth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setSession: (session: AuthSession | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearUser: () => void;
}

const initialSession = readAuthSession();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialSession?.user ?? null,
  accessToken: initialSession?.access_token ?? null,
  isAuthenticated: initialSession !== null,
  isLoading: true,

  setSession: (session) => {
    set({
      user: session?.user ?? null,
      accessToken: session?.access_token ?? null,
      isAuthenticated: session !== null,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  clearUser: () => {
    clearAuthSession();
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));