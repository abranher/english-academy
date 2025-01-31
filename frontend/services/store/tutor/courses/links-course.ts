import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  href: string;
  setLink: (href: string) => void;
}

export const useLinksCourseStore = create<State>()(
  persist(
    (set, get) => ({
      href: "/tutor/courses",

      setLink: (href: string) => {
        set({ href });
      },
    }),
    {
      name: "questions",
    }
  )
);
