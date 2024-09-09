import { buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/libs/shadcn/utils";
import Link from "next/link";

export default function InitialTestPage() {
  return (
    <>
      <div className="container relative h-[600px] flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto min-w-80">
            <div className="text-4xl">Bienvenido </div>
            <div>
              Antes de comenzar, quisieramos conocer tu dominio en el idioma.
            </div>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/students/initial-test/considerations"
            >
              Empezar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
