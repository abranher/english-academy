"use client"

import Link from "next/link";
import { signOut } from "next-auth/react";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/libs/shadcn/utils";

export default function InitialTestPage() {
  return (
    <>
      <div className="container relative h-[600px] flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <button onClick={() => signOut()}>Sign Out</button>
          <div className="mx-auto max-w-lg flex flex-col gap-4">
            <div className="text-5xl">
              <h2>¡Bienvenido a Academy!</h2>
            </div>
            <div className="flex flex-col gap-3">
              <p>
                ¡Hola! Antes de que comencemos con tu experiencia en nuestra
                aplicación, nos gustaría conocerte un poco mejor.
              </p>
              <p>
                Para ello, queremos hacerte un pequeño test que nos ayudará a
                entender tu nivel de dominio en el idioma.
              </p>
            </div>
            <div className="flex justify-end">
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/students/initial-test/start"
              >
                Siguiente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
