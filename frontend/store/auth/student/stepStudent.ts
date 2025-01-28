import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepStudentState {
  step: number;
  totalSteps: number;
  userId: string;
  setStep: (newStep: number) => void;
  setUserId: (userId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useStepStudentStore = create<StepStudentState>()(
  persist(
    (set, get) => ({
      userId: "",
      step: 1,
      totalSteps: 5,
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (newStep: number) => set({ step: newStep }),
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "step-signup-student",
    }
  )
);
