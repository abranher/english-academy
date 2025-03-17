"use client";

import { useQuery } from "@tanstack/react-query";
import { Attachment } from "@/types/models";
import { getAttachments } from "../../_services/get-attachments";

import { AttachmentsContentSkeleton } from "./AttachmentsContentSkeleton";
import { AttachmentCard } from "./AttachmentCard";
import { CreateAttachment } from "./CreateAttachment";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Input } from "@/components/shadcn/ui/input";
import { FolderOpen } from "lucide-react";

export function AttachmentsContent({ userId }: { userId: string }) {
  const {
    isPending,
    data: attachments,
    isError,
  } = useQuery<Attachment[] | []>({
    queryKey: ["get_tutor_attachments"],
    queryFn: () => getAttachments(userId),
  });

  if (isPending) return <AttachmentsContentSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los cursos</>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Recursos</CardTitle>
        <CardDescription>Listado de recursos subidos.</CardDescription>
      </section>

      <Separator />

      <section className="flex">
        <article className="w-1/2">
          <Input placeholder="Buscar..." />
        </article>
        <article className="w-1/2 flex justify-end">
          <CreateAttachment userId={userId} />
        </article>
      </section>

      <section className="mt-4 flex justify-center sm:justify-start flex-wrap gap-4">
        {attachments.length === 0 ? (
          <CardDescription className="text-lg w-full">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              Aun no tienes recursos.
            </p>
          </CardDescription>
        ) : (
          attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              userId={userId}
            />
          ))
        )}
      </section>
    </>
  );
}
