"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { Progress } from "@/components/shadcn/ui/progress";
import { StepOne } from "./StepOne";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { StepFive } from "./StepFive";
import { StepInit } from "./StepInit";
import { StepSix } from "./StepSix";
import { StepSeven } from "./StepSeven";
import { StepFinal } from "./StepFinal";

export default function SignUpForm() {
  const step = useStepTutorStore((state) => state.step);
  const open = useStepTutorStore((state) => state.open);
  const setOpen = useStepTutorStore((state) => state.setOpen);
  const totalSteps = useStepTutorStore((state) => state.totalSteps);

  const progressValue = (step / totalSteps) * 100;

  return (
    <>
      <section className="grid gap-4">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-full" type="submit">
              Crear cuenta
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              {step === 0 ? (
                <AlertDialogTitle>
                  <article className="mb-3 text-center font-medium">
                    ¡Bienvenido a nuestra comunidad de tutores!
                  </article>
                </AlertDialogTitle>
              ) : (
                <AlertDialogTitle>
                  <article className="mb-3 text-center font-medium">
                    Paso {step} de {totalSteps}
                  </article>
                  <Progress value={progressValue} className="mb-6" />
                </AlertDialogTitle>
              )}
              <section>
                {step === 0 && <StepInit />}
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
                {step === 4 && <StepFour />}
                {step === 5 && <StepFive />}
                {step === 6 && <StepSix />}
                {step === 7 && <StepSeven />}
                {step === 8 && <StepFinal />}
              </section>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <div className="mt-4 text-center text-md">
        Ya tienes una cuenta?{" "}
        <Link href="/tutors/signin" className="underline">
          Iniciar sesión
        </Link>
      </div>
    </>
  );
}
