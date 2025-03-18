"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Attachment, Class, ClassAttachment } from "@/types/models";
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAttachments } from "../../../_services/get-attachments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ClassAttachmentsFormSkeleton } from "./ClassAttachmentsFormSkeleton";
import { LoadingButton } from "@/components/common/LoadingButton";
import { AttachmentCard } from "./AttachmentCard";

import { CardContent, CardTitle } from "@/components/shadcn/ui/card";
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

export function ClassAttachmentsForm({
  userId,
  lessonClass,
}: {
  userId: string;
  lessonClass: Class & {
    attachments: (ClassAttachment & { attachment: Attachment })[] | [];
  };
}) {
  const queryClient = useQueryClient();
  const { classId, lessonId } = useParams();

  const {
    isPending,
    data: attachments,
    isError,
  } = useQuery<Attachment[]>({
    queryKey: ["get_attachments_form"],
    queryFn: () => getAttachments(userId),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { attachmentId: "" },
  });

  const mutation = useMutation({
    mutationFn: (lessonClass: { attachmentId: string }) =>
      axios.post(
        `/api/classes/${classId}/lesson/${lessonId}/attachment`,
        lessonClass
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ["get_class", classId, lessonId],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Lección no encontrada",
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
    mutation.mutate({ attachmentId: data.attachmentId });
  }

  const { isSubmitting, isValid } = form.formState;

  // Filtrar los attachments que ya están adjuntos a la clase
  const availableAttachments = attachments?.filter(
    (attachment) =>
      !lessonClass.attachments.some(
        (classAttachment) => classAttachment.attachmentId === attachment.id
      )
  );

  if (isPending) return <ClassAttachmentsFormSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los recursos</>;

  return (
    <>
      <CardContent className="w-full">
        {/* Listar los attachments ya adjuntos */}
        <section>
          <article className="mb-4">
            <CardTitle>Recursos adjuntos</CardTitle>
          </article>
          <article className="flex flex-col gap-4">
            {lessonClass.attachments.map((attachment) => (
              <AttachmentCard
                key={attachment.id}
                classAttachment={attachment}
              />
            ))}
          </article>
        </section>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="attachmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adjuntar recurso</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige un recurso para tu clase" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Recursos</SelectLabel>
                        {availableAttachments?.map((attachment) => (
                          <SelectItem key={attachment.id} value={attachment.id}>
                            {attachment.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Selecciona un recurso para adjuntar a la clase.
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
                label="Adjuntar"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
