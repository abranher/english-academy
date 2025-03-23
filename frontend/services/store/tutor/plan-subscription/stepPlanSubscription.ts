import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepPlanSubscriptionState {
  open: boolean;
  step: number;
  totalSteps: number;
  setOpen: (value: boolean) => void;
  setStep: (newStep: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
}

const STEP = 1;
const TOTAL_STEPS = 2;

export const useStepPlanSubscriptionStore = create<StepPlanSubscriptionState>()(
  persist(
    (set, get) => ({
      open: false,
      step: STEP,
      totalSteps: TOTAL_STEPS,
      setOpen: (value: boolean) => set({ open: value }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (newStep: number) => set({ step: newStep }),
      resetSteps: () => set({ step: STEP, open: false }),
    }),
    {
      name: "step_plan_subscription",
    }
  )
);
