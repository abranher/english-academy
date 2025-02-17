import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepTutorState {
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

export const useStepTutorStore = create<StepTutorState>()(
  persist(
    (set, get) => ({
      open: false,
      userId: "",
      step: 0,
      totalSteps: 7,
      setOpen: (value: boolean) => set({ open: value }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (newStep: number) => set({ step: newStep }),
      setUserId: (userId: string) => set({ userId }),
      resetSteps: () => set({ userId: "", step: 1, open: false }),
    }),
    {
      name: "step-signup-tutor",
    }
  )
);
