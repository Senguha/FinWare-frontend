import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  login: "",
  id: "",
  is_admin: false,
  created_at: "",
};

export const useAuthStore = create(
  persist((set) => ({
    ...initialState,
    setUser: (user) => set(user),
    resetUser: () => set(initialState),
  }))
);
