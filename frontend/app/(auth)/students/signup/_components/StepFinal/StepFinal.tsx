"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { CardTitle } from "@/components/shadcn/ui/card";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";

export function StepFinal() {
  const resetSteps = useStepStudentStore((state) => state.resetSteps);

  return (
    <>
      <section className="text-xs flex flex-col gap-2">
        <article className="w-full text-center mb-4">
          <CardTitle>¡Registro Completo!</CardTitle>
        </article>
        <article>
          Gracias por registrarte como estudiante. Hemos guardado tus datos con
          éxito.
        </article>
        <article>
          Te agradecemos tu interés en unirte a nuestra comunidad.
        </article>
        <article>¡Estamos emocionados de tenerte con nosotros!</article>

        <article className="w-full flex justify-end mt-5">
          <Link href="/">
            <Button type="button" onClick={resetSteps}>
              Salir
            </Button>
          </Link>
        </article>
      </section>
    </>
  );
}
