"use client";

import axios from "@/config/axios";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Image } from "@heroui/react";
import { toast } from "sonner";
import {
  CheckCircle,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { assetImg } from "@/libs/asset";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { truncateString } from "@/libs/format";

export function CourseImageForm({ course }: any) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [imageReady, setImageReady] = useState(false);

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
      formData.set("image", selectedFile);

      await axios.post(`/api/courses/${course.id}/image`, formData, {
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
      toast.success("Imagen actualizada!");
      setSelectedFile(undefined);
      router.refresh();
    } catch (error) {
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
    setImageReady(true);
  }, []);

  return (
    <>
      <CardContent>
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/** File upload */}
          {course.image ? (
            <>
              {imageReady ? (
                <div className="aspect-video rounded-lg">
                  <Image
                    src={assetImg(course.image)}
                    alt={course.title}
                    className="rounded-md"
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

            <Dialog onOpenChange={clearFileInput}>
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
                    {selectedFile ? (
                      <>
                        {selectedFile.type.startsWith("image/") && (
                          <Image
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
                          Se permiten PNG, JPG, JPEG, WEBP (Máx. 5MB).
                        </p>
                      </section>
                    )}

                    <>
                      <Card className="grid grid-cols-8 py-2">
                        <div className="col-span-1 flex justify-center items-center">
                          <ImageIcon />
                        </div>
                        <div className="text-xs col-span-6 flex flex-col justify-center gap-1">
                          <p>
                            {selectedFile
                              ? truncateString(selectedFile.name)
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
                              {progress}
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
                      </Card>
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
