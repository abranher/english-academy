"use client";

import NextImage from "next/image";
import axios from "@/config/axios";
import { useRouter } from "next/navigation";

import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/shadcn/ui/button";
import { CardContent } from "@/components/shadcn/ui/card";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";
import { File, ImageIcon } from "lucide-react";
import asset from "@/libs/asset";

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

export default function ImageForm({ course }: any) {
  console.log(course);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

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
      await axios.post(`/api/courses/${course.courseId}/image`, formData);

      toast.success("Imagen actualizada!");
      setSelectedFile(undefined);
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <CardContent>
        <form onSubmit={onSubmit}>
          <section className="flex md:flex-row flex-col items-center gap-3">
            {/** File upload */}
            {course.imageUrl ? (
              <div className="h-[240px] w-[240px] rounded-lg">
                <Image src={asset(course.imageUrl)} alt={course.title} />
              </div>
            ) : (
              <div className="grid h-[240px] w-[240px] place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <ImageIcon className="h-9 w-9 text-gray-500" />
              </div>
            )}

            {/** Description */}
            <article className="p-5 flex flex-col gap-3 w-96">
              <h2 className="font-semibold">Imagen del curso</h2>
              <div className="text-small flex flex-col gap-3">
                <p>
                  Es lo primero que ven los estudiantes. Una imagen atractiva
                  genera curiosidad y ganas de conocer más sobre el curso.
                </p>
                <p>
                  Recomendamos un tamaño de 1024x576 píxeles para una mejor
                  visualización
                </p>
              </div>

              {/** Drop zone */}
              <article
                {...getRootProps()}
                className="flex items-center justify-center w-full h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 cursor-pointer mt-2 p-4"
              >
                <div className="flex flex-col items-center justify-center">
                  <File className="w-7 h-7 text-gray-400" />

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
              </article>
            </article>
          </section>

          {selectedFile && (
            <>
              <article className="flex items-center space-x-6 p-6">
                {selectedFile.type.startsWith("image/") && (
                  <Image
                    as={NextImage}
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    width={100}
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
      </CardContent>
    </>
  );
}
