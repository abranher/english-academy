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
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  // drop zone

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", acceptedFiles[0]);

    try {
      await axios.post(`/api/courses/${courseId}`, formData);
      toast.success("Descripción del curso actualizada!");
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
          <CardTitle className="flex justify-between gap-3">
            Imagen del curso
            <Button onClick={toggleEdit} variant="ghost">
              {isEditing && <>Cancelar</>}

              {!isEditing && !initialData.imageUrl && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Añadir una imagen
                </>
              )}
              {!isEditing && initialData.imageUrl && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar imagen
                </>
              )}
            </Button>
          </CardTitle>
          {!isEditing &&
            (!initialData.imageUrl ? (
              <CardDescription className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-6">
                <ImageIcon className="h-10 w-10 text-slate-500" />
              </CardDescription>
            ) : (
              <div className="relative aspect-video w-full h-60 mt-2">
                <Image
                  alt="Upload"
                  fill
                  className="object-cover rounded-md"
                  src={initialData.imageUrl}
                />
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
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
