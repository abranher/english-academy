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

import { Attachment } from "@/types/models";
import { truncateString } from "@/libs/format";

import { Card, CardDescription } from "@/components/shadcn/ui/card";
import { ImageIcon, FileIcon } from "lucide-react"; // Importa FileIcon para archivos no imágenes
import { DeleteAttachment } from "./DeleteAttachment";

export function AttachmentCard({
  attachment,
  userId,
}: {
  attachment: Attachment;
  userId: string;
}) {
  // Función para obtener la extensión del archivo
  const getFileExtension = (url: string) => {
    return url.split('.').pop()?.toLowerCase();
  };

  // Obtener la extensión del archivo
  const fileExtension = getFileExtension(attachment.url);

  // Definir qué icono mostrar
  const isImage = fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg';

  return (
    <>
      <Card className="p-2 w-60 flex flex-col items-center gap-2">
        <section className="p-1 flex justify-between items-center gap-1 w-full">
          <section className="flex items-center gap-2 justify-between">
            {isImage ? (
              <ImageIcon className="text-gray-500" /> // Icono para imágenes
            ) : (
              <FileIcon className="text-gray-500" /> // Icono para archivos no imágenes (PDF, etc.)
            )}
            <CardDescription>
              {truncateString(attachment.title)}
            </CardDescription>
          </section>

          <DeleteAttachment attachment={attachment} userId={userId} />
        </section>
      </Card>
    </>
  );
}