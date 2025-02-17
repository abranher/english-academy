"use client";

import axios from "@/config/axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepSevenSchema } from "./StepSevenSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { toast } from "sonner";

import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import {
  CheckCircle,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Progress } from "@/components/shadcn/ui/progress";

export function StepSeven() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  // drop zone
  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof selectedFile === "undefined") return;

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.set("image", selectedFile);

      await axios.post(`/api/courses/${12}/image`, formData, {
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
      // router.refresh();
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

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Datos Académicos y Tutoría</CardTitle>
        <CardDescription>
          Ingresa tus datos académicos para validar tu rol como tutor.
        </CardDescription>
      </section>

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/** upload input */}
          {(uploadStatus === "select" || uploadStatus === "uploading") && (
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
                Se permiten PNG, JPG, WEBP.
              </p>
            </label>
          )}

          <>
            <Card className="grid grid-cols-8 py-2">
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
              disabled={uploadStatus === "uploading" || uploadStatus === "done"}
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
    </>
  );
}
