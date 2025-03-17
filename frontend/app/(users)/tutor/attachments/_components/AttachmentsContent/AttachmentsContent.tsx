"use client";

import { useQuery } from "@tanstack/react-query";
import { Attachment } from "@/types/models";
import { getAttachments } from "../../_services/get-attachments";

import { AttachmentsContentSkeleton } from "./AttachmentsContentSkeleton";
import { AttachmentsList } from "./AttachmentsList";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

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

      <AttachmentsList attachments={attachments} userId={userId} />
    </>
  );
}
