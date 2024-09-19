import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./_components/SignUpForm";
import HomeLink from "../../_components/HomeLink";
import { Roles } from "@/types/enums/Roles";

export default function TutorSignupPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <HomeLink role={Roles.TUTOR} />
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crear una cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Introduce algunos datos a continuación para crear tu cuenta
              </p>
            </div>
            <SignUpForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              Al hacer clic en continuar, acepta nuestros{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Condiciones de servicio
              </Link>{" "}
              y{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="hidden bg-muted lg:block">
            <Image
              src="/tutor.jpg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover brightness-[0.2] grayscale"
            />
          </div>
        </div>
      </div>
    </>
  );
}
