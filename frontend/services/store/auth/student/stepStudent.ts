import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepStudentState {
  open: boolean;
  step: number;
  totalSteps: number;
  userId: string;
  setOpen: (value: boolean) => void;
  setStep: (newStep: number) => void;
  setUserId: (userId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
}

const STEP = 0;
const TOTAL_STEPS = 7;

export const useStepStudentStore = create<StepStudentState>()(
  persist(
    (set, get) => ({
      open: false,
      userId: "",
      step: STEP,
      totalSteps: TOTAL_STEPS,
      setOpen: (value: boolean) => set({ open: value }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (newStep: number) => set({ step: newStep }),
      setUserId: (userId: string) => set({ userId }),
      resetSteps: () => set({ userId: "", step: 0, open: false }),
    }),
    {
      name: "step_signup_student",
    }
  )
);
