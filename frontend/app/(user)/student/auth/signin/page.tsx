"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { AlertCircle } from "lucide-react";
import BoxBase from "@/components/common/BoxBase";

type Inputs = {
  email: string;
  password: string;
};

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/home");
      router.refresh();
    }
  });

  return (
    <>
      <BoxBase>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingrese su correo electrónico a continuación para iniciar sesión
              en su cuenta{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo es requerido!",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida!",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              No tienes una cuenta?{" "}
              <Link href="/auth/signup" className="underline">
                Crear cuenta
              </Link>
            </div>
          </CardContent>
        </Card>
      </BoxBase>
    </>
  );
}
