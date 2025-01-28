import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepStudenttate {
  step: number;
  totalSteps: number;
  setStep: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useStepStudentStore = create<StepStudenttate>()(
  persist(
    (set, get) => ({
      step: 1,
      totalSteps: 5,
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: () => {
        return;
      },
    }),
    {
      name: "step-signup-student",
    }
  )
);
