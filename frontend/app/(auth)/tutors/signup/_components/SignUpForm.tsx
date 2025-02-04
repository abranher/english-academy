"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";
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

export default function SignUpForm() {
  const step = useStepStudentStore((state) => state.step);
  const open = useStepStudentStore((state) => state.open);
  const setOpen = useStepStudentStore((state) => state.setOpen);
  const totalSteps = useStepStudentStore((state) => state.totalSteps);

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
              <AlertDialogTitle>
                <article className="mb-3 text-center font-medium">
                  Paso {step} de {totalSteps}
                </article>
                <Progress value={progressValue} className="mb-6" />
              </AlertDialogTitle>
              <section>
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
                {step === 4 && <StepFour />}
                {step === 5 && <StepFive />}
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
