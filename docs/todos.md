# TODOS:

- Backups para windows
- Luego mostrar cards de planes mensuales o anuales
- Generar subscripcion dependiendo del plan

que necesitamos:

- necesitamos que el admin le llegue una notification donde le diga lo que sucedio

- Mostrar cursos publicados y aprobados
- Mostrar cursos por categoria,
- mostrar cursos por nivel

- Mostrar clase
- Mostrar quiz

# PARA DESPUES:

- Al verificar tutor necesita iniciar sesion nuevamente para poder pedir la data nueva
- Creamos un vista para mostrar todas las notificaciones -> 30 min
- La fecha de nacimiento del perfil, se guarda de una manera en la bd y luego se muestra como de otra
- rejected_at (fecha/hora del rechazo para eliminar en 24h)
- IMPORTANT: -> hacer el componente que crea las certificaciones del tutor igual al createAttachment


"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Attachment, Class } from "@/types/models";
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAttachments } from "../../../_services/get-attachments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ClassAttachmentsFormSkeleton } from "./ClassAttachmentsFormSkeleton";
import { LoadingButton } from "@/components/common/LoadingButton";
import { AttachmentCard } from "./AttachmentCard"; // Importa el componente AttachmentCard

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

export function ClassAttachmentsForm({
  userId,
  lessonClass,
}: {
  userId: string;
  lessonClass: Class;
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
  const attachedAttachmentIds = lessonClass.attachments.map(
    (attachment) => attachment.attachmentId
  );
  const availableAttachments = attachments?.filter(
    (attachment) => !attachedAttachmentIds.includes(attachment.id)
  );

  if (isPending) return <ClassAttachmentsFormSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los recursos</>;

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

        {/* Listar los attachments ya adjuntos */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recursos adjuntos</h3>
          <div className="flex flex-wrap gap-4">
            {lessonClass.attachments.map((classAttachment) => (
              <AttachmentCard
                key={classAttachment.attachmentId}
                attachment={{
                  id: classAttachment.attachmentId,
                  title: classAttachment.attachment.title,
                  url: classAttachment.attachment.url,
                  tutorId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
}