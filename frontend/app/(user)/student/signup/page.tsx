"use client";

import BoxBase from "@/components/common/BoxBase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

type Inputs = {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword)
      return alert("Password do not match");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/signin");
    }
  });

  return (
    <>
      <BoxBase>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Crear cuenta</CardTitle>
            <CardDescription>
              Ingresa tus datos para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Max"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "El nombre es requerido!",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Robinson"
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "El apellido es requerido!",
                      },
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="max12"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "El nombre de usuario es requerido!",
                    },
                  })}
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

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
                <Label htmlFor="password">Contraseña</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirma Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "La confirmación es requerida!",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Ya tienes una cuenta?{" "}
              <Link href="/auth/signin" className="underline">
                Iniciar sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </BoxBase>
    </>
  );
}
