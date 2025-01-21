import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  userId: null | string;
  setUserId: (id: string) => void;
}

export const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      userId: null,
      setUserId: (id: string) => set({ userId: id }),
    }),
    {
      name: "user",
    }
  )
);
