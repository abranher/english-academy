"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/shadcn/ui/button";
import { useStepStudentStore } from "@/store/auth/student/stepStudent";
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

export default function SignUpForm() {
  const [open, setOpen] = useState(false);
  const step = useStepStudentStore((state) => state.step);
  const totalSteps = useStepStudentStore((state) => state.totalSteps);
  const setStep = useStepStudentStore((state) => state.setStep);

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
                {step === 5 && <p>paso 5</p>}
              </section>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <div className="mt-4 text-center text-md">
        Ya tienes una cuenta?{" "}
        <Link href="/students/signin" className="underline">
          Iniciar sesión
        </Link>
      </div>
    </>
  );
}
