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
import { ImageIcon, UploadCloud, XIcon } from "lucide-react";
import asset from "@/libs/asset";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Progress } from "@/components/shadcn/ui/progress";

interface ImageFormProps {
  initialData: {
    image: string;
  };
  courseId: string;
}

export default function ImageForm({ course }: any) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(13);

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
    formData.set("image", selectedFile);

    try {
      await axios.post(`/api/courses/${course.courseId}/image`, formData);

      toast.success("Imagen actualizada!");
      setSelectedFile(undefined);
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  const clearFileInput = () => {
    setSelectedFile(undefined);
  };

  return (
    <>
      <CardContent>
        <form onSubmit={onSubmit}>
          <section className="grid grid-cols-1 md:grid-cols-2">
            {/** File upload */}
            {course.image ? (
              <div className="h-[240px] w-[290px] rounded-lg">
                <Image
                  src={asset(course.image)}
                  className="aspect-video"
                  alt={course.title}
                />
              </div>
            ) : (
              <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <ImageIcon className="h-9 w-9 text-gray-600 aspect-video" />
              </div>
            )}

            {/** Description */}
            <article className="px-5 py-2 flex flex-col gap-3">
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex gap-3">
                    <UploadCloud />
                    Subir imagen
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Subir imagen</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {selectedFile ? (
                      <>
                        {selectedFile.type.startsWith("image/") && (
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="rounded-md border-3 border-gray-500"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                          <ImageIcon className="h-9 w-9 text-gray-600" />
                        </div>
                      </>
                    )}
                    {/** upload input */}
                    <label
                      {...getRootProps()}
                      className="p-5 bg-gray-100 text-gray-600 font-semibold text-xs rounded h-32 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-300 border-dashed"
                    >
                      <UploadCloud className="w-11 mb-2" />
                      Subir archivo
                      <input {...getInputProps()} className="hidden" />
                      {isDragActive ? (
                        <p>Suelta los archivos aquí ...</p>
                      ) : (
                        <p>
                          Arrastra y suelta tus archivos aquí o{" "}
                          <span className="font-medium text-blue-600 hover:underline">
                            explora
                          </span>
                        </p>
                      )}
                      <p className="text-xs font-medium mt-2">
                        Se permiten PNG, JPG, WEBP.
                      </p>
                    </label>

                    {selectedFile && (
                      <>
                        <section className="grid grid-cols-8 py-3 rounded-lg text-gray-700 bg-zinc-200 dark:bg-zinc-800">
                          <div className="col-span-1 flex justify-center items-center">
                            <ImageIcon />
                          </div>
                          <div className="text-xs col-span-6 flex flex-col justify-center gap-1">
                            <p>{selectedFile.name}</p>
                            <p>
                              {`${(selectedFile.size / 1024).toFixed(
                                2
                              )} KB o ${(
                                selectedFile.size /
                                1024 /
                                1024
                              ).toFixed(2)} MB`}
                            </p>
                            <Progress value={progress} className="h-2" />
                          </div>
                          <div className="col-span-1 flex justify-center items-center">
                            <XIcon
                              className="cursor-pointer"
                              onClick={clearFileInput}
                            />
                          </div>
                        </section>
                        <Button type="submit">
                          <UploadCloud />
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
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
