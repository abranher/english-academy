"use client";

import axios from "@/config/axios";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

import { Button } from "@/components/shadcn/ui/button";
import { CardContent } from "@/components/shadcn/ui/card";
import { toast } from "sonner";
import {
  CheckCircle,
  ImageIcon,
  Loader2,
  UploadCloud,
  Video,
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
import { assetVideo } from "@/libs/asset";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function VideoForm({ lesson }: any) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [playerReady, setPlayerReady] = useState(false);

  // drop zone
  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof selectedFile === "undefined") return;

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.set("video", selectedFile);

      await axios.post(`/api/lessons/${lesson.id}/video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );

          setProgress(percentCompleted);
        },
      });

      setUploadStatus("done");
      toast.success("Video actualizado!");
      setSelectedFile(undefined);
      router.refresh();
    } catch (error) {
      console.log(error);
      setProgress(0);
      setUploadStatus("select");
      toast.error("Something wrong");
    }
  };

  const clearFileInput = () => {
    setSelectedFile(undefined);
    setProgress(0);
    setUploadStatus("select");
  };

  const formatSize = (size: number) => {
    return `${(size / 1024).toFixed(2)} KB o ${(size / 1024 / 1024).toFixed(
      2
    )} MB`;
  };

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  return (
    <>
      <CardContent>
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/** File upload */}
          {lesson.video ? (
            <>
              {playerReady ? (
                <div className="aspect-video rounded-lg">
                  <ReactPlayer
                    controls
                    width={"100%"}
                    height={"100%"}
                    url={assetVideo(lesson.video)}
                  />
                </div>
              ) : (
                <>
                  <Skeleton className="w-full h-full flex justify-center items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Skeleton>
                </>
              )}
            </>
          ) : (
            <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
              <Video className="h-9 w-9 text-gray-600 aspect-video" />
            </div>
          )}

          {/** Description */}
          <article className="px-5 py-2 flex flex-col gap-3">
            <h2 className="font-semibold">Video de la clase</h2>
            <div className="text-small flex flex-col gap-3">
              <p>
                Los videos son esenciales para el aprendizaje, ya que combinan
                contenido visual y auditivo que captan la atención y favorecen
                la retención de información.
              </p>
              <p>
                Deben ser dinámicos, bien estructurados y claros, con una
                duración recomendada de 5 a 25 minutos para mantener el interés.
                Además, es crucial que tengan una alta calidad de imagen 1080p
                (1920x1080 píxeles) para una experiencia visual óptima.
              </p>
            </div>

            <Dialog onOpenChange={clearFileInput}>
              <DialogTrigger asChild>
                <Button className="flex gap-3">
                  <UploadCloud />
                  Subir video
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Subir video</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4 py-4">
                    {selectedFile ? (
                      <>
                        {selectedFile.type.startsWith("video/") && (
                          <ReactPlayer
                            controls
                            width={"100%"}
                            height={"100%"}
                            url={URL.createObjectURL(selectedFile)}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                          <Video className="h-9 w-9 text-gray-600" />
                        </div>
                      </>
                    )}
                    {/** upload input */}
                    {(uploadStatus === "select" ||
                      uploadStatus === "uploading") && (
                      <label
                        {...getRootProps()}
                        className="p-5 bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-32 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-300 dark:border-zinc-700 border-dashed"
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
                          Se permiten MP4.
                        </p>
                      </label>
                    )}

                    <>
                      <section className="grid grid-cols-8 py-3 rounded-lg text-gray-700 dark:text-gray-100 bg-zinc-200 dark:bg-zinc-900">
                        <div className="col-span-1 flex justify-center items-center">
                          <ImageIcon />
                        </div>
                        <div className="text-xs col-span-6 flex flex-col justify-center gap-1">
                          <p>
                            {selectedFile
                              ? selectedFile.name
                              : "No hay ningún archivo seleccionado"}
                          </p>
                          <p>{selectedFile && formatSize(selectedFile.size)}</p>
                          <Progress value={progress} className="h-2" />
                        </div>
                        {uploadStatus === "select" && selectedFile && (
                          <>
                            <div className="col-span-1 flex justify-center items-center">
                              <XIcon
                                className="cursor-pointer"
                                onClick={clearFileInput}
                              />
                            </div>
                          </>
                        )}
                        {uploadStatus === "uploading" && (
                          <>
                            <div className="col-span-1 flex justify-center items-center">
                              {`${progress} %`}
                            </div>
                          </>
                        )}
                        {uploadStatus === "done" && (
                          <>
                            <div className="col-span-1 flex justify-center items-center">
                              <CheckCircle />
                            </div>
                          </>
                        )}
                      </section>
                      <Button
                        type="submit"
                        disabled={
                          uploadStatus === "uploading" ||
                          uploadStatus === "done"
                        }
                      >
                        {uploadStatus === "select" && <UploadCloud />}

                        {uploadStatus === "uploading" && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {uploadStatus === "done" && <CheckCircle />}
                      </Button>
                    </>
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
