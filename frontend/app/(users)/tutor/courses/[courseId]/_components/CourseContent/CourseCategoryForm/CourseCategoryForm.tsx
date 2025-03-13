"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import messages from "@/libs/validations/schemas/messages";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Category } from "@/types/models";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategories } from "../../../_services/get-categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CourseCategorySkeleton } from "./CourseCategorySkeleton";
import { LoadingButton } from "@/components/common/LoadingButton";

import { CardContent } from "@/components/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

const FormSchema = z.object({
  categoryId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export function CourseCategoryForm({
  categoryId,
}: {
  categoryId: string | null;
}) {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    isPending,
    data: categories,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["get_categories"],
    queryFn: getCategories,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryId: categoryId || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (course: { categoryId: string }) =>
      axios.patch(`/api/courses/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Categoría actualizada!");
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
    mutation.mutate({ categoryId: data.categoryId });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isPending) return <CourseCategorySkeleton />;
  if (isError) return <>Ha ocurrido un error cargando las categorías</>;

  return (
    <>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría del curso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige una categoría para tu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        {categories.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona la categoría que mejor se ajuste al tema general
                    de tu curso.
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
