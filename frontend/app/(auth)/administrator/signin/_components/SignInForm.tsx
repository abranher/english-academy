"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { Roles } from "@/types/enums";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/libs/validations/schemas/signin/signIn";

import SignInButton from "@/components/auth/SignInButton";

import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { AlertCircle, EyeIcon, EyeOff } from "lucide-react";

export function SignInForm() {
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
  const [visiblePassword, setVisiblePassword] = useState(false);

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        type: Roles.ADMIN,
        redirect: false,
      });

      if (response === undefined || response.error) {
        setError(response?.code);
      } else {
        router.push("/admin");
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
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-3">
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

          <div className="relative">
            <span
              className="absolute right-4 top-2 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <EyeIcon /> : <EyeOff />}
            </span>

            <Input
              id="password"
              type={visiblePassword ? "text" : "password"}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <SignInButton isLoading={isLoading} />
      </form>
    </>
  );
}
