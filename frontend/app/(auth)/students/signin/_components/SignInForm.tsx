"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { AlertCircle } from "lucide-react";
import { signInSchema } from "@/libs/validations/schemas/signin/signIn";
import { Roles } from "@/types/enums/Roles";
import SignInButton from "@/components/auth/SignInButton";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const [error, setError] = useState<null | undefined | string>();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        type: Roles.STUDENT,
        redirect: false,
      });

      if (response === undefined || response.error) {
        setError(response?.code);
      } else {
        router.push("/student");
        router.refresh();
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
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
        <SignInButton isLoading={isLoading} />
      </form>
      <div className="mt-4 text-center text-md">
        No tienes una cuenta?{" "}
        <Link href="/students/signup" className="underline">
          Crear cuenta
        </Link>
      </div>
    </>
  );
}
