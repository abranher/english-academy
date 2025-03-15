"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { assetVideo } from "@/libs/asset";
import { useDropzone } from "react-dropzone";
import { formatSize, truncateString } from "@/libs/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { CheckCircle, Loader2, UploadCloud, Video, XIcon } from "lucide-react";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export function CourseTrailerForm({ trailer }: { trailer: string | null }) {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");
  const [playerReady, setPlayerReady] = useState(false);

  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }, []),
    accept: { "video/*": [".mp4"] },
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          toast.error("El trailer es demasiado grande (máximo 5MB)");
        } else {
          toast.error("Formato de video no permitido");
        }
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>
      axios.post(`/api/courses/files/${courseId}/trailer`, formData, {
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
      toast.success("Trailer actualizado!");
      setSelectedFile(undefined);
      queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
    },
    onError: (error: AxiosError | Error) => {
      setUploadStatus("error");
      setProgress(0);
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al subir trailer"
          : "Error desconocido";
      toast.error(message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadStatus("uploading");
    const formData = new FormData();
    formData.set("trailer", selectedFile);
    mutation.mutate(formData);
  };

  const clearFile = () => {
    setSelectedFile(undefined);
    setPreview("");
    setProgress(0);
    setUploadStatus("select");
  };

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  return (
    <>
      <CardContent>
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/** File upload */}
          {trailer ? (
            playerReady ? (
              <article className="aspect-video rounded-lg">
                <ReactPlayer
                  controls
                  width={"100%"}
                  height={"100%"}
                  url={assetVideo(trailer)}
                />
              </article>
            ) : (
              <Skeleton className="w-full h-full flex justify-center items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Skeleton>
            )
          ) : (
            <article className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
              <Video className="h-9 w-9 text-gray-600 aspect-video" />
            </article>
          )}

          {/** Description */}
          <article className="px-5 py-2 flex flex-col gap-3">
            <h2 className="font-semibold">Trailer del curso</h2>
            <section className="text-small flex flex-col gap-3">
              <p>
                El video trailer es la primera impresión que tendrán los
                estudiantes sobre tu curso. Debe ser visualmente atractivo y
                captar su atención desde el primer segundo.
              </p>
              <p>
                Recomendamos una duración de entre 30 segundos y 1 minuto y una
                resolución de 1080p (1920x1080 píxeles) para una óptima
                visualización en diferentes dispositivos.
              </p>
            </section>

            <Dialog onOpenChange={clearFile}>
              <DialogTrigger asChild>
                <Button className="flex gap-3">
                  <UploadCloud />
                  Subir trailer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Subir trailer</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                  <section className="grid gap-4 py-4">
                    {preview ? (
                      <ReactPlayer
                        controls
                        width={"100%"}
                        height={"100%"}
                        url={preview}
                      />
                    ) : (
                      <article className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        <Video className="h-9 w-9 text-gray-600" />
                      </article>
                    )}

                    {/** upload input */}
                    {(uploadStatus === "select" ||
                      uploadStatus === "uploading") && (
                      <section
                        {...getRootProps()}
                        className="p-5 text-center bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-28 sm:h-24 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-500 dark:border-zinc-700 border-dashed"
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
                          Formatos permitidos: MP4 (Máx. 50MB).
                        </p>
                      </section>
                    )}

                    <Card className="grid grid-cols-8 py-2">
                      <section className="col-span-1 flex justify-center items-center">
                        <Video />
                      </section>
                      <section className="text-xs col-span-6 flex flex-col justify-center gap-1">
                        <p>
                          {selectedFile
                            ? truncateString(selectedFile.name, "md")
                            : "No hay ningún archivo seleccionado"}
                        </p>
                        <p>{selectedFile && formatSize(selectedFile.size)}</p>
                        <Progress value={progress} className="h-2" />
                      </section>
                      {uploadStatus === "select" && selectedFile && (
                        <section className="col-span-1 flex justify-center items-center">
                          <XIcon
                            className="cursor-pointer"
                            onClick={clearFile}
                          />
                        </section>
                      )}
                      {uploadStatus === "uploading" && (
                        <section className="col-span-1 flex justify-center items-center">
                          {progress}
                        </section>
                      )}
                      {uploadStatus === "done" && (
                        <section className="col-span-1 flex justify-center items-center">
                          <CheckCircle />
                        </section>
                      )}
                    </Card>

                    <article className="space-y-2 text-center">
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
                    </article>
                  </section>
                </form>
              </DialogContent>
            </Dialog>
          </article>
        </section>
      </CardContent>
    </>
  );
}
