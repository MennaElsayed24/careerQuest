import { create } from "zustand";
import type { User } from "../types/user";
import {
  clearCurrentUser,
  getCurrentUser,
  saveCurrentUser,
} from "../services/auth/localAuth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getCurrentUser(),
  isAuthenticated: getCurrentUser() !== null,

  setUser: (user) => {
    saveCurrentUser(user);
    set({
      user,
      isAuthenticated: true,
    });
  },

  clearUser: () => {
    clearCurrentUser();
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));