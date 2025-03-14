"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { Image } from "@heroui/react";
import { assetImg } from "@/libs/asset";
import { AxiosError } from "axios";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatSize, truncateString } from "@/libs/format";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
  CheckCircle,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function CourseImageForm({ image }: { image: string | null }) {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");
  const [imageReady, setImageReady] = useState(false);

  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }, []),
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          toast.error("La imagen es demasiado grande (máximo 5MB)");
        } else {
          toast.error("Formato de imagen no permitido");
        }
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>
      axios.post(`/api/courses/files/${courseId}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      }),
    onSuccess: () => {
      setUploadStatus("done");
      toast.success("Imagen actualizada!");
      setSelectedFile(undefined);
      queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
    },
    onError: (error: AxiosError | Error) => {
      setUploadStatus("error");
      setProgress(0);
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al subir la imagen"
          : "Error desconocido";
      toast.error(message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadStatus("uploading");
    const formData = new FormData();
    formData.set("image", selectedFile);
    mutation.mutate(formData);
  };

  const clearFile = () => {
    setSelectedFile(undefined);
    setPreview("");
    setProgress(0);
    setUploadStatus("select");
  };

  useEffect(() => {
    setImageReady(true);
  }, []);

  return (
    <>
      <CardContent>
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/** File upload */}
          {image ? (
            imageReady ? (
              <div className="aspect-video rounded-lg">
                <Image
                  src={assetImg(image)}
                  alt="Imagen del curso"
                  className="rounded-md"
                />
              </div>
            ) : (
              <>
                <Skeleton className="w-full h-full flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Skeleton>
              </>
            )
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

            <Dialog onOpenChange={clearFile}>
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
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4 py-4">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        className="rounded-md border-3 border-gray-500"
                      />
                    ) : (
                      <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        <ImageIcon className="h-9 w-9 text-gray-600" />
                      </div>
                    )}

                    {/* Dropzone */}
                    {(uploadStatus === "select" ||
                      uploadStatus === "uploading") && (
                      <section
                        {...getRootProps()}
                        className="p-3 w-full text-center bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-28 sm:h-24 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-500 dark:border-zinc-700 border-dashed"
                      >
                        <UploadCloud className="w-11 mb-2" />
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
                          Se permiten PNG, JPG, JPEG (Máx. 5MB).
                        </p>
                      </section>
                    )}

                    <Card className="grid grid-cols-8 py-2">
                      <div className="col-span-1 flex justify-center items-center">
                        <ImageIcon />
                      </div>
                      <div className="text-xs col-span-6 flex flex-col justify-center gap-1">
                        <p>
                          {selectedFile
                            ? truncateString(selectedFile.name, "md")
                            : "No hay ningún archivo seleccionado"}
                        </p>
                        <p>{selectedFile && formatSize(selectedFile.size)}</p>
                        <Progress value={progress} className="h-2" />
                      </div>
                      {uploadStatus === "select" && selectedFile && (
                        <div className="col-span-1 flex justify-center items-center">
                          <XIcon
                            className="cursor-pointer"
                            onClick={clearFile}
                          />
                        </div>
                      )}
                      {uploadStatus === "uploading" && (
                        <div className="col-span-1 flex justify-center items-center">
                          {progress}
                        </div>
                      )}
                      {uploadStatus === "done" && (
                        <div className="col-span-1 flex justify-center items-center">
                          <CheckCircle />
                        </div>
                      )}
                    </Card>

                    <div className="space-y-2 text-center">
                      <Button
                        type="submit"
                        disabled={
                          !selectedFile ||
                          mutation.isPending ||
                          uploadStatus === "done"
                        }
                        className="w-full flex gap-2 items-center"
                      >
                        {uploadStatus === "select" && (
                          <>
                            <UploadCloud className="h-5 w-5" />
                            Subir
                          </>
                        )}
                        {mutation.isPending && (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Subiendo...
                          </>
                        )}
                        {uploadStatus === "done" && (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Listo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </article>
        </section>
      </CardContent>
    </>
  );
}
