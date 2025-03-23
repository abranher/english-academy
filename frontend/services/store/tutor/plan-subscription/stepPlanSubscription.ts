import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepPlanSubscriptionState {
  step: number;
  totalSteps: number;
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
      step: STEP,
      totalSteps: TOTAL_STEPS,
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setStep: (newStep: number) => set({ step: newStep }),
      resetSteps: () => set({ step: STEP }),
    }),
    {
      name: "step_plan_subscription",
    }
  )
);
