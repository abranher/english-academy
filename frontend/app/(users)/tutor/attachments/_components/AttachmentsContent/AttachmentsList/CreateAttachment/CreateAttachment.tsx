"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { formatSize, truncateString } from "@/libs/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  CheckCircle,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { Progress } from "@/components/shadcn/ui/progress";
import { Input } from "@/components/shadcn/ui/input";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function CreateAttachment({ userId }: { userId: string }) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }, []),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          toast.error("El archivo es demasiado grande (máximo 5MB)");
        } else {
          toast.error("Formato de archivo no permitido");
        }
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>
      axios.post(`/api/attachments/files/user/${userId}/attachment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      }),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        setUploadStatus("done");
        setSelectedFile(undefined);
        queryClient.invalidateQueries({ queryKey: ["get_tutor_attachments"] });
      }
    },
    onError: (error: AxiosError | Error) => {
      setUploadStatus("error");
      setProgress(0);
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al subir el archivo"
          : "Error desconocido";
      toast.error(message);
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo.");
      return;
    }

    setUploadStatus("uploading");
    const formData = new FormData();
    formData.set("attachment", selectedFile);
    formData.set("title", data.title);
    mutation.mutate(formData);
  };

  const { isSubmitting, isValid } = form.formState;

  const clearFile = () => {
    setSelectedFile(undefined);
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <>
      <Dialog onOpenChange={clearFile}>
        <DialogTrigger asChild>
          <Button className="flex gap-3">
            <UploadCloud />
            Subir recurso
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subir recurso</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del recurso</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Ej: Apren..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  <p className="text-xs font-medium mt-2">
                    Se permiten PNG, JPG, JPEG y PDF (Máx. 5MB).
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
                    <XIcon className="cursor-pointer" onClick={clearFile} />
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
                    !isValid ||
                    isSubmitting ||
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
