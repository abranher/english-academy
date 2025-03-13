"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import messages from "@/libs/validations/schemas/messages";
import { getLevels } from "../../../_services/get-levels";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Level } from "@/types/models";
import { toast } from "sonner";

import { CourseLevelSkeleton } from "./CourseLevelSkeleton";
import { LoadingButton } from "@/components/common/LoadingButton";

import { CardContent } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

const FormSchema = z.object({
  levelId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export function CourseLevelForm({ levelId }: { levelId: string | null }) {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    isPending,
    data: levels,
    isError,
  } = useQuery<Level[]>({
    queryKey: ["get_levels"],
    queryFn: getLevels,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      levelId: levelId || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (course: { levelId: string }) =>
      axios.patch(`/api/courses/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Nivel actualizado!");
        queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Curso no encontrado",
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ levelId: data.levelId });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isPending) return <CourseLevelSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los niveles</>;

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel del curso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel apropiado para tu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level: Level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.levelCode + " - " + level.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Elige el nivel adecuado para garantizar que tus estudiantes
                    puedan seguir el ritmo del curso y alcanzar sus objetivos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <LoadingButton
                isLoading={mutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Guardar"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
