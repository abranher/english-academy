"use client";

import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import axios from "@/config/axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { CheckCircle, File, Loader2, UploadCloud, XIcon } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Button } from "@/components/shadcn/ui/button";
import { AxiosError } from "axios";
import { formatSize } from "@/libs/format";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface CVProps {
  onSuccess?: () => void; // Callback opcional que se ejecuta cuando la subida es exitosa
}

export function CV({ onSuccess }: CVProps) {
  const userId = useStepTutorStore((state) => state.userId);

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setSelectedFile(acceptedFiles[0]);
    }, []),
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((error) => error.code === "file-too-large")) {
          toast.error("El archivo es demasiado grande (máximo 5MB)");
        } else {
          toast.error("Formato de archivo no permitido");
        }
      });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof selectedFile === "undefined") return;

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.set("file", selectedFile);

      await axios.post(`/api/tutors/files/signup/${userId}/cv`, formData, {
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
      toast.success("¡CV actualizado correctamente!");
      onSuccess?.();
      setSelectedFile(undefined);
      // router.refresh();
    } catch (error) {
      setProgress(0);
      setUploadStatus("select");

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: Record<number, string> = {
          400: "Archivo no válido o tipo no permitido",
          404: "Usuario no encontrado",
          500: "Error del servidor. Por favor intenta nuevamente.",
        };

        toast.error(errorMessages[status || 500] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error no controlado:", error);
      }
    }
  };

  const clearFileInput = () => {
    setSelectedFile(undefined);
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/** upload input */}
          <h2 className="text-sm font-medium  dark:text-zinc-400">
            Currículum:
          </h2>

          {(uploadStatus === "select" || uploadStatus === "uploading") && (
            <section
              {...getRootProps()}
              className="p-1 text-center bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-28 sm:h-24 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-500 dark:border-zinc-700 border-dashed"
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
                Se permiten PNG, JPG, WEBP, PDF (Máx. 5MB).
              </p>
            </section>
          )}

          <Card className="grid grid-cols-8 py-2 border-zinc-500 border-2">
            <div className="col-span-1 flex justify-center items-center">
              <File />
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
                  <XIcon className="cursor-pointer" onClick={clearFileInput} />
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

          <div className="w-full flex">
            <Button
              type="submit"
              disabled={uploadStatus === "uploading" || uploadStatus === "done"}
            >
              {uploadStatus === "select" && <UploadCloud />}

              {uploadStatus === "uploading" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {uploadStatus === "done" && <CheckCircle />}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
