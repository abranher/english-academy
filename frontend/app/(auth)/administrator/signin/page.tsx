import { HomeLink } from "@/components/auth/HomeLink";
import { SignInForm } from "./_components/SignInForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export default function AdministradorSigninPage() {
  return (
    <section className="container relative h-[800px] flex flex-col items-center justify-center">
      <HomeLink />

      <article className="lg:p-8">
        <Card className="mx-auto min-w-96">
          <CardHeader>
            <CardTitle className="text-2xl">Bienvenido Admin</CardTitle>
            <CardDescription>Inicia Sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </article>
    </section>
  );
}
