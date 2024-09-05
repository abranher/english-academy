"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { AlertCircle } from "lucide-react";
import web from "@/libs/routes/web";
import { z } from "zod";
import { signInSchema } from "@/libs/validations/schemas/signin/signIn";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const [error, setError] = useState(null);

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/student/home");
      router.refresh();
    }
  }

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        No tienes una cuenta?{" "}
        <Link href={web("signup")} className="underline">
          Crear cuenta
        </Link>
      </div>
    </>
  );
}
