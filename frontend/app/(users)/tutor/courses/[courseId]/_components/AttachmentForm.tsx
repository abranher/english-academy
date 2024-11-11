"use client";

import NextImage from "next/image";
import axios from "@/config/axios";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Course } from "@/types/models/Course";
import { Attachment } from "@/types/models/Attachment";
import { Image } from "@nextui-org/react";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

export default function AttachmentForm({
  initialData,
  courseId,
}: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const toggleEdit = () => setIsEditing((current) => !current);

  // drop zone

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof selectedFile === "undefined") return;

    const formData = new FormData();
    formData.set("url", selectedFile);

    try {
      await axios.post(`/api/courses/${courseId}/attachments`, formData);
      toast.success("Archivo añadido!");
      toggleEdit();
      setSelectedFile(undefined);
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Archivo adjunto eliminado");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between gap-3 text-lg">
          Archivos adjuntos del curso
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancelar</>}

            {!isEditing && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir un archivo
              </>
            )}
          </Button>
        </CardTitle>
        {!isEditing && (
          <>
            {initialData.attachments.length === 0 && (
              <p className="text-sm mt-2 text-slate-500 italic">
                No hay archivos adjuntos todavía
              </p>
            )}
          </>
        )}
        {initialData.attachments.length > 0 && (
          <div className="space-y-2">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
              >
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
                {deletingId === attachment.id && (
                  <div className="ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {deletingId !== attachment.id && (
                  <button
                    onClick={() => onDelete(attachment.id)}
                    className="ml-auto hover:opacity-75 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && (
          <form onSubmit={onSubmit}>
            <div
              {...getRootProps()}
              className="flex items-center justify-center w-full h-60 bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 cursor-pointer mt-2"
            >
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-4-4h5l5 4zM20 8h-1.5a2.5 2.5 0 00-5 0H6a2.5 2.5 0 00-5 0V6a2.5 2.5 0 005 0h4a2.5 2.5 0 005 0v2m-1.5 6a2.5 2.5 0 00-5 0H6a2.5 2.5 0 00-5 0v2a2.5 2.5 0 005 0h4a2.5 2.5 0 005 0v2"
                  />
                </svg>
                {isDragActive ? (
                  <p className="mt-2 text-sm text-gray-500">
                    Suelta los archivos aquí ...
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-gray-500 px-12">
                    Arrastra y suelta tus archivos aquí o{" "}
                    <span className="font-medium text-blue-600 hover:underline">
                      explora
                    </span>
                  </p>
                )}
              </div>
              <input
                {...getInputProps()}
                className="opacity-0 w-full h-full absolute"
              />
            </div>
            <p className="text-xs mt-4">
              Agregue todo lo que sus estudiantes puedan necesitar para
              completar el curso.
            </p>

            {selectedFile && (
              <>
                <article className="flex items-center space-x-6 p-6">
                  {selectedFile.type.startsWith("image/") && (
                    <Image
                      as={NextImage}
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      width={60}
                      height={88}
                      className="mt-2 rounded-md max-w-full"
                    />
                  )}
                  <div className="min-w-0 relative flex-auto">
                    <p className="text-sm font-bold">
                      Nombre del archivo: {selectedFile.name}
                    </p>
                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                      <div>
                        <dt className="sr-only">Rating</dt>
                        <dd className="px-1.5 ring-1 ring-slate-200 rounded">
                          Tamaño del archivo:{" "}
                          {`${(selectedFile.size / 1024).toFixed(2)} KB o ${(
                            selectedFile.size /
                            1024 /
                            1024
                          ).toFixed(2)} MB`}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>

                <div className="w-full">
                  <div className="justify-end flex px-4">
                    <Button>Subir</Button>
                  </div>
                </div>
              </>
            )}
          </form>
        )}
      </CardContent>
    </>
  );
}
