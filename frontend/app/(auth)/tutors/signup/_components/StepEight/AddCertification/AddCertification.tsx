"use client";

import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { toast } from "sonner";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { AddCertificationSchema } from "./AddCertificationSchema";

import { CheckCircle, File, Loader2, UploadCloud, XIcon } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { formatSize, truncateString } from "@/libs/format";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface AddCertificationProps {
  onSuccess?: () => void; // Callback opcional que se ejecuta cuando la subida es exitosa
}

export function AddCertification({ onSuccess }: AddCertificationProps) {
  const userId = useStepTutorStore((state) => state.userId);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");

  const form = useForm<z.infer<typeof AddCertificationSchema>>({
    resolver: zodResolver(AddCertificationSchema),
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setSelectedFile(acceptedFiles[0]);
    }, []),
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
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

  async function onSubmit(data: z.infer<typeof AddCertificationSchema>) {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo.");
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", data.name);
      formData.append("issuingOrganization", data.issuingOrganization);

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
      //reset();
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
  }

  const clearFileInput = () => {
    setSelectedFile(undefined);
    setProgress(0);
    setUploadStatus("select");
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <div className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <section className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Ej: Jonh"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issuingOrganization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organismo emisor</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Ej: Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {(uploadStatus === "select" ||
                  uploadStatus === "uploading") && (
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
                      Formatos permitidos: PNG, JPG, JPEG, PDF (Máx. 5MB)
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
                        ? truncateString(selectedFile.name, "lg")
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
                      !isValid ||
                      isSubmitting ||
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
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
