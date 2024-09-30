"use client";

import { useDropzone } from "react-dropzone";
import axios from "@/config/axios";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Pencil, PlusCircle, Video } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";
import { generateBackendImageUrl } from "@/libs/utils/http";
import { Chapter } from "@/types/models/Chapter";
import { MuxData } from "@/types/models/MuxData";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

export default function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
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
    formData.set("imageUrl", selectedFile);

    try {
      await axios.post(`/api/courses/${courseId}/image`, formData);

      toast.success("Imagen actualizada!");
      setSelectedFile(undefined);
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle className="flex justify-between gap-3 text-lg">
            Video del capítulo
            <Button onClick={toggleEdit} variant="ghost">
              {isEditing && <>Cancelar</>}

              {!isEditing && !initialData.videoUrl && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Añadir un video
                </>
              )}
              {!isEditing && initialData.videoUrl && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar video
                </>
              )}
            </Button>
          </CardTitle>
          {!isEditing &&
            (!initialData.videoUrl ? (
              <CardDescription className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-6">
                <Video className="h-10 w-10 text-slate-500" />
              </CardDescription>
            ) : (
              <div className="relative aspect-video w-full h-60 mt-2">
                Video subido!
              </div>
            ))}
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
                    <p className="mt-2 text-sm text-gray-500">
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

                  <div className="text-xs text-muted-foreground mt-4">
                    Sube el video de este capítulo
                  </div>

                  <div className="w-full">
                    <div className="justify-end flex px-4">
                      <Button>Subir</Button>
                    </div>
                  </div>
                </>
              )}
              {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                  Los videos pueden tardar unos minutos en procesarse. Actualice
                  la página si el video no aparece.
                </div>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
