"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { CardTitle } from "@/components/shadcn/ui/card";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";

export function StepFinal() {
  const resetSteps = useStepTutorStore((state) => state.resetSteps);

  return (
    <>
      <section className="text-xs flex flex-col gap-2">
        <article className="w-full text-center mb-4">
          <CardTitle>¡Registro Completo!</CardTitle>
        </article>
        <article>
          Gracias por registrarte como tutor. Hemos guardado tus datos con éxito
          y ahora están en manos de nuestro equipo de administradores. Ellos
          revisarán tu información cuidadosamente para asegurarse de que cumples
          con los requisitos necesarios.
        </article>
        <article>
          Recibirás una notificación por correo electrónico informándote si tu
          registro ha sido aprobado o no. Te agradecemos tu interés en unirte a
          nuestra comunidad y contribuir a la enseñanza del inglés.
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
