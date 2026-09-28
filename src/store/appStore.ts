import { create } from "zustand";

interface AppState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>(
  (set) => ({
    isSidebarOpen: true,
    isMobileMenuOpen: false,

    toggleSidebar: () =>
      set((state) => ({
        isSidebarOpen:
          !state.isSidebarOpen,
      })),

    setSidebarOpen: (open) =>
      set({
        isSidebarOpen: open,
      }),

    toggleMobileMenu: () =>
      set((state) => ({
        isMobileMenuOpen:
          !state.isMobileMenuOpen,
      })),

    setMobileMenuOpen: (open) =>
      set({
        isMobileMenuOpen: open,
      }),
  }),
);