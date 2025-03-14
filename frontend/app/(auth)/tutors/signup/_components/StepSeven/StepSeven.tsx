"use client";

import axios from "@/config/axios";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar } from "@heroui/react";
import { toast } from "sonner";

import {
  CheckCircle,
  File,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Button } from "@/components/shadcn/ui/button";
import { AxiosError } from "axios";
import { formatSize, truncateString } from "@/libs/format";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function StepSeven({ onSuccess }: { onSuccess?: () => void }) {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  const formRef = useRef<HTMLFormElement>(null);

  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");

  const handleSubmitPopover = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }, []),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await axios.post(`/api/tutors/files/signup/${userId}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      setUploadStatus("done");
      toast.success("¡Imagen de perfil creada correctamente!");
      onSuccess?.();
      nextStep();
    } catch (error) {
      setUploadStatus("error");
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Error al subir la imagen";
        toast.error(message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(undefined);
    setPreview("");
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Sube tu Imagen de Perfil</CardTitle>
        <CardDescription>
          Es fundamental que subas una imagen de perfil clara y reconocible.
        </CardDescription>
      </section>

      <form ref={formRef} onSubmit={onSubmit}>
        <div className="grid gap-4">
          <h2 className="text-sm font-medium">Imagen de perfil:</h2>

          <div className="flex flex-col items-center gap-4 w-full">
            <section className="flex justify-evenly gap-3">
              <article className="w-full flex justify-center items-center">
                {/* Vista previa */}
                {preview ? (
                  <>
                    <Avatar
                      isBordered
                      className="w-40 h-40"
                      color="default"
                      src={preview}
                    />
                  </>
                ) : (
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-200">
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}
              </article>

              <article className="w-full text-xs">
                <h2 className="text-sm font-medium mb-2">Consejo:</h2>
                <div className="px-5">
                  <ul className="list-disc flex flex-col gap-2">
                    <li>Imagen clara y centrada de tu rostro.</li>
                    <li>
                      Evita fotos en las que solo se vea la mitad de tu cara.
                    </li>
                    <li>Utiliza un fondo sencillo.</li>
                    <li>Sonríe y muestra una expresión amigable.</li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="flex gap-3">
              {/* Dropzone */}
              {(uploadStatus === "select" || uploadStatus === "uploading") && (
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
                </section>
              )}

              <Card className="w-full grid grid-cols-8 py-2 border-zinc-500 border-2">
                <div className="col-span-2 flex justify-center items-center">
                  <File />
                </div>
                <div className="text-xs col-span-4 flex flex-col justify-center gap-1">
                  <p>
                    {selectedFile
                      ? truncateString(selectedFile.name, "xs")
                      : "No hay ningún archivo seleccionado"}
                  </p>
                  <p>{selectedFile && formatSize(selectedFile.size)}</p>
                  <Progress value={progress} className="h-2" />
                </div>
                {uploadStatus === "select" && selectedFile && (
                  <>
                    <div className="col-span-2 flex justify-center items-center">
                      <XIcon className="cursor-pointer" onClick={clearFile} />
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
            </section>
          </div>

          <p className="text-sm">Luego la podrás cambiar desde tu perfil.*</p>

          <div className="space-y-2 text-center">
            <Button
              onClick={handleSubmitPopover}
              disabled={!selectedFile || uploadStatus === "uploading"}
              className="w-full"
            >
              {uploadStatus === "uploading" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Subir"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
