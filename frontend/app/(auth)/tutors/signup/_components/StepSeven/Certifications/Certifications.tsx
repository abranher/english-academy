"use client";

import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { CheckCircle, File, Loader2, UploadCloud, XIcon } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Button } from "@/components/shadcn/ui/button";
import { Label } from "@/components/shadcn/ui/label";
import { Input } from "@/components/shadcn/ui/input";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface CertificationsProps {
  onSuccess?: () => void; // Callback opcional que se ejecuta cuando la subida es exitosa
}

export function Certifications({ onSuccess }: CertificationsProps) {
  const userId = useStepTutorStore((state) => state.userId);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [name, setName] = useState("");
  const [issuingOrganization, setIssuingOrganization] = useState("");
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

    if (!selectedFile || !name || !issuingOrganization) {
      toast.error(
        "Por favor, completa todos los campos y selecciona un archivo."
      );
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", name);
      formData.append("issuingOrganization", issuingOrganization);

      await axios.post(`/api/certifications/${userId}`, formData, {
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
      toast.success("¡Certificación agregada correctamente!");
      setSelectedFile(undefined);
      setName("");
      setIssuingOrganization("");
      onSuccess?.();
    } catch (error) {
      setProgress(0);
      setUploadStatus("select");

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: Record<number, string> = {
          400: "Datos no válidos o archivo incorrecto",
          404: "Recurso no encontrado",
          500: "Error del servidor. Intenta nuevamente.",
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

  const formatSize = (size: number) => {
    return `${(size / 1024).toFixed(2)} KB o ${(size / 1024 / 1024).toFixed(
      2
    )} MB`;
  };

  return (
    <>
      <div className="grid gap-4">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <section className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="p.ej: CELTA"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="issuingOrganization">Organismo emisor</Label>
                  <Input
                    id="issuingOrganization"
                    value={issuingOrganization}
                    onChange={(e) => setIssuingOrganization(e.target.value)}
                    placeholder="p.ej: Cambridge Assessment English"
                    required
                  />
                </div>
              </section>

              {(uploadStatus === "select" || uploadStatus === "uploading") && (
                <label
                  {...getRootProps()}
                  className="p-1 text-center bg-gray-50 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-28 sm:h-24 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-500 dark:border-zinc-700 border-dashed"
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
                    Formatos permitidos: PNG, JPG, WEBP, PDF (Máx. 5MB)
                  </p>
                </label>
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

              <div className="w-full flex">
                <Button
                  type="submit"
                  disabled={
                    uploadStatus === "uploading" || uploadStatus === "done"
                  }
                >
                  {uploadStatus === "select" && <UploadCloud />}

                  {uploadStatus === "uploading" && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {uploadStatus === "done" && <CheckCircle />}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
