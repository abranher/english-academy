import Image from "next/image";
import SignInForm from "./_components/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export default function AdministradorSigninPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="hidden bg-muted lg:block">
            <Image
              src="/hero-student.jpg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover brightness-[0.2] grayscale"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <Card className="mx-auto min-w-96">
            <CardHeader>
              <CardTitle className="text-2xl">Bienvenido Admin</CardTitle>
              <CardDescription>Inicia Sesión en tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
