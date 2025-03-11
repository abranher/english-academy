"use client";

import Link from "next/link";

import axios from "@/config/axios";
import { cn } from "@/libs/shadcn/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getLevels } from "../../_services/get-levels";
import { toast } from "sonner";
import { Session } from "next-auth";

import { useInitialTestData } from "@/components/hooks/useInitialTestData";

import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Award, Check, FileQuestion, PercentCircle } from "lucide-react";
import { useEffect } from "react";
import { Level } from "@/types/models/Level";

export function ResultInitialTest({ session }: { session: Session }) {
  const {
    isPending,
    data: levels,
    isError,
  } = useQuery<Level[]>({
    queryKey: ["get_levels_for_initial_test"],
    queryFn: getLevels,
  });

  const {
    exercises,
    correct,
    progress,
    level: assignedLevel,
    levelDescription,
  } = useInitialTestData();

  let filteredLevel: Level | undefined;

  useEffect(() => {
    if (levels) {
      filteredLevel = levels.find((level) => level.levelCode === assignedLevel);
    }
  }, [levels, assignedLevel]);

  const mutation = useMutation({
    mutationFn: (user: { levelId: string }) =>
      axios.post(`/api/students/assign-level/user/${session.user.id}`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  return (
    <>
      <Card className="p-8">
        <div className="mx-auto max-w-lg flex flex-col gap-4">
          <div className="text-5xl">
            <CardTitle>¡Felicidades, {session.user.name}!</CardTitle>
          </div>

          <article className="w-full my-6 flex flex-col gap-4">
            <CardDescription className="flex items-center gap-2 text-xl">
              <FileQuestion />
              Total de preguntas: {exercises.length}
            </CardDescription>

            <CardDescription className="flex items-center gap-2 text-xl">
              <Check />
              Respuestas correctas: {correct}
            </CardDescription>

            <CardDescription className="flex items-center gap-2 text-xl">
              <PercentCircle />
              Porcentaje de aciertos: {`${progress} %`}
            </CardDescription>

            <CardDescription className="flex items-center gap-2 text-xl">
              <Award />
              {levelDescription}
            </CardDescription>
          </article>

          <article>
            <h2 className="font-semibold text-lg">Análisis</h2>
            <p>
              Aunque has respondido algunas preguntas incorrectamente, ¡No te
              desanimes! Cada error es una oportunidad para aprender. Recuerda
              que la práctica hace al maestro.
            </p>
          </article>

          <div className="flex justify-end">
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/student/dashboard"
            >
              Siguiente
            </Link>

            <Button
              onClick={() => {
                mutation.mutate({
                  levelId: filteredLevel,
                });
              }}
            >
              Guardar
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}


"use client";

import Link from "next/link";
import axios from "@/config/axios";
import { cn } from "@/libs/shadcn/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getLevels } from "../../_services/get-levels";
import { toast } from "sonner";
import { Session } from "next-auth";
import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Award, Check, FileQuestion, PercentCircle } from "lucide-react";
import { Level } from "@/types/models/Level";

export function ResultInitialTest({ session }: { session: Session }) {
  // Fetch levels
  const {
    isPending: isLevelsLoading,
    data: levels,
    isError: isLevelsError,
  } = useQuery<Level[]>({
    queryKey: ["get_levels_for_initial_test"],
    queryFn: getLevels,
  });

  // Get test data
  const {
    exercises,
    correct,
    progress,
    level: assignedLevel,
    levelDescription,
  } = useInitialTestData();

  // Find the assigned level
  const filteredLevel = levels?.find((level) => level.levelCode === assignedLevel);

  // Mutation to assign level
  const mutation = useMutation({
    mutationFn: (user: { levelId: string }) =>
      axios.post(`/api/students/assign-level/user/${session.user.id}`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
          500: "Error del servidor",
        };

        toast.error(errorMessages[status || 500] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  // Loading state
  if (isLevelsLoading) {
    return <div>Cargando niveles...</div>;
  }

  // Error state
  if (isLevelsError) {
    return <div>Error al cargar los niveles. Por favor, intenta de nuevo.</div>;
  }

  return (
    <Card className="p-8">
      <div className="mx-auto max-w-lg flex flex-col gap-4">
        {/* Title */}
        <div className="text-5xl">
          <CardTitle>¡Felicidades, {session.user.name}!</CardTitle>
        </div>

        {/* Test Results */}
        <article className="w-full my-6 flex flex-col gap-4">
          <CardDescription className="flex items-center gap-2 text-xl">
            <FileQuestion aria-hidden="true" />
            Total de preguntas: {exercises.length}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <Check aria-hidden="true" />
            Respuestas correctas: {correct}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <PercentCircle aria-hidden="true" />
            Porcentaje de aciertos: {`${progress} %`}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <Award aria-hidden="true" />
            {levelDescription}
          </CardDescription>
        </article>

        {/* Analysis */}
        <article>
          <h2 className="font-semibold text-lg">Análisis</h2>
          <p>
            Aunque has respondido algunas preguntas incorrectamente, ¡No te
            desanimes! Cada error es una oportunidad para aprender. Recuerda
            que la práctica hace al maestro.
          </p>
        </article>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/student/dashboard"
            aria-label="Ir al dashboard"
          >
            Siguiente
          </Link>

          <Button
            onClick={() => {
              if (filteredLevel) {
                mutation.mutate({ levelId: filteredLevel.levelCode });
              } else {
                toast.error("No se pudo determinar el nivel asignado.");
              }
            }}
            disabled={mutation.isPending || !filteredLevel}
            aria-label="Guardar nivel asignado"
          >
            {mutation.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </Card>
  );
}