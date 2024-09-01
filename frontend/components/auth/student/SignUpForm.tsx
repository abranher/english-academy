"use client";

import axios from "@/config/axios";
import Link from "next/link";
import web from "@/libs/routes/web";
import { firstSignUpSchema } from "@/libs/validations/schemas/signup/firstSignUp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof firstSignUpSchema>>({
    resolver: zodResolver(firstSignUpSchema),
  });

  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: (user: {
      name: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => axios.post("/api/auth/signup", user),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/student/auth/signin");
      }
    },
    onError: (error) => {
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof firstSignUpSchema>) {
    createUserMutation.mutate({
      name: data.name,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password
    });
  }

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input id="name" placeholder="Max" {...register("name")} />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  placeholder="Robinson"
                  {...register("lastName")}
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
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirma Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
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
            <Link href={web("signin")} className="underline">
              Iniciar sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
